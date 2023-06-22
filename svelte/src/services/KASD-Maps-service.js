// @ts-nocheck
import axios from "axios";
import { user, latestPlacemark } from "../stores";

export const KASDMapsService = {
    baseUrl: "http://localhost:3000",


    async login(email, password) {
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

    async signup(firstName, lastName, email, password) {
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

    async getUserId() {
        try {
            let response = null;
            const localUserCredentials = localStorage.localUser;
            if (localUserCredentials) {
                const savedUser = JSON.parse(localUserCredentials);
                response = savedUser.userId;
            }
            return response;
        } catch(error){
            return [];
        }
    },

    async getAllPlacemarks() {
        try {
            let response = [];
            response = await axios.get(`${this.baseUrl}/api/placemarks`);
            return response.data;
        } catch(error){
            return [];
        }
    },

    async getAllImages() {
        try {
            // let response = [];
            const response = await axios.get(`${this.baseUrl}/api/allImages`);
            return response.data; // .data
        } catch(error){
            return [];
        }
    },

    async addPlacemark(placemark){
        try {
          let response;
          response = await axios.post(`${this.baseUrl}/api/user/placemark`, placemark);
          latestPlacemark.set(placemark);
          return response.status === 201;
      } catch(error){
          return false;
      }
    },

    async addPlacemarkToGroup(placemarkId, groupId){
        try {
            console.log("t");
            const response = await axios.get(`${this.baseUrl}/api/addPlacemark/${placemarkId}/group/${groupId}`);
            console.log("tt");
            return response;
        } catch(error){
            return false;
        }
    },

    async getPlacemark(id){
        try{
            const response = await axios.get(`${this.baseUrl}/api/placemark/${id}`);
            return response.data; // .data
        } catch(error){
            return [];
        }
    },

    async getUserGroups(id){
        try{
            const response = await axios.get(`${this.baseUrl}/api/groups/user/${id}`);
            return response.data; // .data
        } catch(error){
            return [];
        }
    },

    async getGroupById(id){
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
    }
};
