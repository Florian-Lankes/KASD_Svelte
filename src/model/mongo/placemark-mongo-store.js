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

    //placemark is a object which contains all details about the POI and the createdBy user id
    async addPlacemark(placemark) {
        const newPlacemark = new Placemark(placemark);
        const pm = await newPlacemark.save();
        return this.getPlacemarkById(pm._id);
    },

    //returns all Placemarks which the user created
    async getPlacemarkByUserid(id) {
        const user = await userMongoStore.getUserById(id);
        const placemark = await Placemark.find({ createdBy: user }).lean();
        return placemark;
    },

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
