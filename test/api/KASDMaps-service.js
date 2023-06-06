import axios from "axios";
import { serviceUrl } from "../fixtures.js";
export const KASDMapsService = {
    KASDMapsUrl: serviceUrl,

    async createUser(user) {
        const res = await axios.post(`${this.KASDMapsUrl}/api/user`, user);
        return res.data;
    },

    async getUser(id) {
        const res = await axios.get(`${this.KASDMapsUrl}/api/user/${id}`);
        return res.data;
    },

    async getAllUsers() {
        const res = await axios.get(`${this.KASDMapsUrl}/api/users`);
        return res.data;
    },

    async deleteAllUsers() {
        const res = await axios.delete(`${this.KASDMapsUrl}/api/users`);
        return res.data;
    },

    async createPlacemark(id, placemark) {
        const res = await axios.post(`${this.KASDMapsUrl}/api/user/${id}/placemark`, placemark);
        return res.data;
    },

    async getPlacemark(id) {
        const res = await axios.get(`${this.KASDMapsUrl}/api/placemark/${id}`);
        return res.data;
    },

    async getAllPlacemarks() {
        const res = await axios.get(`${this.KASDMapsUrl}/api/placemarks`);
        return res.data;
    },

    async deleteAllPlacemarks() {
        const res = await axios.delete(`${this.KASDMapsUrl}/api/placemarks`);
        return res;
    },

    async deletePlacemark(id) {
        const res = await axios.delete(`${this.KASDMapsUrl}/api/placemark/${id}`);
        return res;
    },

    async createGroup(id, group) {
        const res = await axios.post(`${this.KASDMapsUrl}/api/user/${id}/group`, group);
        return res.data;
    },

    async getGroup(id) {
        const res = await axios.get(`${this.KASDMapsUrl}/api/group/${id}`);
        return res.data;
    },

    async getAllGroups() {
        const res = await axios.get(`${this.KASDMapsUrl}/api/groups`);
        return res.data;
    },

    async deleteAllGroups() {
        const res = await axios.delete(`${this.KASDMapsUrl}/api/groups`);
        return res;
    },

    async deleteGroup(id) {
        const res = await axios.delete(`${this.KASDMapsUrl}/api/group/${id}`);
        return res;
    },

}