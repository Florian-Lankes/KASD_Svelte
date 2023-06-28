// @ts-nocheck
import axios from "axios";
import { user, latestPlacemark } from "../stores.ts";
import type {Group, Placemark, ReturnedPlacemark} from "./types";

export const KASDMapsService = {
    baseUrl: "http://localhost:3000",

    // still a problem (if on site user changes something you need to reopen the site for the change to take effect.
    // Happens inside analytics and picture gallery.

    async login(email: string, password: string): Promise<boolean> {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
            axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
            if (response.data.success) {
                user.set({
                    email: email,
                    token: response.data.token,
                    userId: response.data.userId
                });
                localStorage.localUser = JSON.stringify({ email: email, token: response.data.token});
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async logout() {
        user.set({
            email: "",
            token: "",
            userId: "",
        });
        axios.defaults.headers.common["Authorization"] = "";
        localStorage.removeItem("localUser");
    },

    async signup(firstName: string, lastName: string, email: string, password: string): Promise <boolean> {
        try {
            const userDetails = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                isAdmin: false
            };
            await axios.post(this.baseUrl + "/api/user", userDetails);
            return true;
        } catch (error) {
            return false;
        }
    },

    async getUserId(): Promise<string> {
        try {
            let response = null;
            const localUserCredentials = localStorage.localUser;
            if (localUserCredentials) {
                const savedUser = JSON.parse(localUserCredentials);
                response = savedUser.userId;
            }
            return response;
        } catch(error){
            return "";
        }
    },

    async getAllPlacemarks(): Promise<Array<ReturnedPlacemark>> {
        try {
            let response = [];
            response = await axios.get(`${this.baseUrl}/api/placemarks`);
            return response.data;
        } catch(error){
            return [];
        }
    },

    async getAllImages(): Promise<object[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/allImages`);
            return response.data;
        } catch(error){
            return [];
        }
    },
    async getPlacemarkImages(placemarkId: string): Promise<object[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/placemark/${placemarkId}/images`);
            return response.data;
        } catch(error){
            return [];
        }
    },

    async getAnalytics(): Promise<object> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/analytics`);
            return response.data;
        } catch(error){
            return [];
        }
    },

    async addPlacemark(placemark: Placemark): Promise<boolean> {
        try {
            const response = await axios.post(`${this.baseUrl}/api/user/placemark`, placemark);
            latestPlacemark.set(placemark);
            return response.status === 201;
      } catch(error){
            return false;
      }
    },

    async uploadImage(id: string, fileUpload: File[]): Promise<boolean> {
        try {
            console.log("inside");
            console.log(id);
            console.log(fileUpload);
            const response = await axios.post(`${this.baseUrl}/api/placemark/${id}/uploadImage`, fileUpload);
            return response;
        } catch (error) {
            return false;
        }
    },

    async addPlacemarkToGroup(placemarkId: string, groupId: string): Promise<boolean> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/addPlacemark/${placemarkId}/group/${groupId}`);
            return response.status === 200;
        } catch(error){
            return false;
        }
    },

    async editPlacemark(placemarkId: string, updatedPlacemark: Placemark): Promise<boolean> {
        try {
            const response = await axios.post(`${this.baseUrl}/api/placemark/${placemarkId}/update`, updatedPlacemark);
            return response.status === 201;
        } catch(error){
            return false;
        }
    },

    async getPlacemark(id: string): Promise<ReturnedPlacemark> {
        try{
            const response = await axios.get(`${this.baseUrl}/api/placemark/${id}`);
            return response.data;
        } catch(error){
            return [];
        }
    },

    async getUserGroups() {
        try{
            const response = await axios.get(`${this.baseUrl}/api/groups/user`);
            return response.data; // .data
        } catch(error){
            return [];
        }
    },

    async getGroupById(id: string): Promise<Group> {
        try{
            const response = await axios.get(`${this.baseUrl}/api/group/${id}`);
            return response.data; // .data
        } catch(error){
            return [];
        }
    },

    reload() {
        const localUserCredentials = localStorage.localUser;
        if (localUserCredentials) {
            const savedUser = JSON.parse(localUserCredentials);
            user.set({
                email: savedUser.email,
                token: savedUser.token,
                userId: savedUser.userId
            });
            axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
        }
    },

    async deleteImage(imageURL: string, id: string): Promise<object> {
        try{
            let temp = imageURL.split("/");
            const publicId = temp[temp.length-2]; // publicId is the id from cloudinary for specific picture (example: v1687600501)
            const imageId = temp[temp.length-1]; // imageId is the name of the image in cloudinary (example: vsveiage4nyinhrb1wkt)
            const response = await axios.delete(`${this.baseUrl}/api/placemark/${id}/image/${imageId}/${publicId}/delete`);
            return response;
        } catch(error){
            return error;
        }
    },

    async deletePlacemark(placemarkId: string): Promise<boolean> {
        try{
            const response = await axios.delete(`${this.baseUrl}/api/placemark/${placemarkId}`);
            return response.status === 204;
        } catch(error){
            return false;
        }
    }
};
