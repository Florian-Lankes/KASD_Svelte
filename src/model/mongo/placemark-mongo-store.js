import { Placemark } from "./placemark.js";
import { userMongoStore } from "./user-mongo-store.js";

export const placemarkMongoStore = {

    async getAllPlacemarks() {
        const placemark = await Placemark.find().lean();
        return placemark;
    },

    async getPlacemarkById(id) {
        if (id) {
            const placemark = await Placemark.findOne({ _id: id }).lean();
            return placemark;
        }
        return null;
    },

    async getPlacemarksOfIdArray(array) {
        if(array) {
            const placemarks = null;

            array.forEach((placemarkId) => {
                placemarks.push( this.getPlacemarkById(placemarkId));
            })
        }
        return null;
    },

    //  placemark is a object which contains all details about the POI and the createdBy user id
    async addPlacemark(userId, placemark) {
        const newPlacemark = new Placemark(placemark);
        newPlacemark.createdById = userId;
        const pm = await newPlacemark.save();
        return this.getPlacemarkById(pm._id);
    },

    //  returns all Placemarks which the user created
    async getPlacemarkByUserid(id) {
        const user = await userMongoStore.getUserById(id);
        const placemark = await Placemark.find({ createdBy: user }).lean();
        return placemark;
    },

    /*
    async getPlacemarksByGroupId(id) {
        const placemarks = await Placemark.find({ groupId: id }).lean();
        return placemarks;
    },
    */

    async deletePlacemarkById(id) {
        try {
            await Placemark.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },

    async deleteAllPlacemarks() {
        await Placemark.deleteMany({});
    }
};
