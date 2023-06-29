import axios from "axios";
import { u as user, a as latestPlacemark } from "./stores.js";
const KASDMapsService = {
  baseUrl: "https://kasd-maps-service.onrender.com",
  // still a problem (if on site user changes something you need to reopen the site for the change to take effect.
  // Happens inside analytics and picture gallery.
  async login(email, password) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      if (response.data.success) {
        user.set({
          email,
          token: response.data.token,
          userId: response.data.userId
        });
        localStorage.localUser = JSON.stringify({ email, token: response.data.token });
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
      userId: ""
    });
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("localUser");
  },
  async signup(firstName, lastName, email, password) {
    try {
      const userDetails = {
        firstName,
        lastName,
        email,
        password,
        isAdmin: false
      };
      await axios.post(this.baseUrl + "/api/user", userDetails);
      return true;
    } catch (error) {
      return false;
    }
  },
  async getAllPlacemarks() {
    try {
      let response = [];
      response = await axios.get(`${this.baseUrl}/api/placemarks`);
      return response.data;
    } catch (error) {
      return [];
    }
  },
  async getAllImages() {
    try {
      const response = await axios.get(`${this.baseUrl}/api/allImages`);
      return response.data;
    } catch (error) {
      return [];
    }
  },
  async getPlacemarkImages(placemarkId) {
    try {
      const response = await axios.get(`${this.baseUrl}/api/placemark/${placemarkId}/images`);
      return response.data;
    } catch (error) {
      return [];
    }
  },
  async getAnalytics() {
    try {
      const response = await axios.get(`${this.baseUrl}/api/analytics`);
      return response.data;
    } catch (error) {
      return [];
    }
  },
  async addPlacemark(placemark) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/user/placemark`, placemark);
      latestPlacemark.set(placemark);
      return response.status === 201;
    } catch (error) {
      return false;
    }
  },
  async addGroup(group) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/user/group`, group);
      return response.status === 201;
    } catch (error) {
      return false;
    }
  },
  async uploadImage(id, fileUpload) {
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
  async addPlacemarkToGroup(placemarkId, groupId) {
    try {
      const response = await axios.get(`${this.baseUrl}/api/addPlacemark/${placemarkId}/group/${groupId}`);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  },
  async editPlacemark(placemarkId, updatedPlacemark) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/placemark/${placemarkId}/update`, updatedPlacemark);
      return response.status === 201;
    } catch (error) {
      return false;
    }
  },
  async getPlacemark(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/api/placemark/${id}`);
      return response.data;
    } catch (error) {
      return [];
    }
  },
  async getUserGroups() {
    try {
      const response = await axios.get(`${this.baseUrl}/api/groups/user`);
      return response.data;
    } catch (error) {
      return [];
    }
  },
  async getGroupById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/api/group/${id}`);
      return response.data;
    } catch (error) {
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
  async deleteImage(imageURL, id) {
    try {
      let temp = imageURL.split("/");
      const publicId = temp[temp.length - 2];
      const imageId = temp[temp.length - 1];
      const response = await axios.delete(`${this.baseUrl}/api/placemark/${id}/image/${imageId}/${publicId}/delete`);
      return response;
    } catch (error) {
      return error;
    }
  },
  async deletePlacemark(placemarkId) {
    try {
      const response = await axios.delete(`${this.baseUrl}/api/placemark/${placemarkId}`);
      return response.status === 204;
    } catch (error) {
      return false;
    }
  },
  async deleteGroup(groupId) {
    try {
      const response = await axios.delete(`${this.baseUrl}/api/group/${groupId}`);
      return response.status === 204;
    } catch (error) {
      return false;
    }
  },
  async deletePlacemarkFromGroup(groupId, placemarkId) {
    try {
      const response = await axios.delete(`${this.baseUrl}/api/group/${groupId}/placemark/${placemarkId}`);
      return response.status === 204;
    } catch (error) {
      return false;
    }
  }
};
export {
  KASDMapsService as K
};
