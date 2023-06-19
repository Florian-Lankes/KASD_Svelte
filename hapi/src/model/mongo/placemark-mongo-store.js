import { Placemark } from "./placemark.js";
import { groupMongoStore } from "./group-mongo-store.js";
import { userMongoStore } from "./user-mongo-store.js";

export const placemarkMongoStore = {

    async getAllPlacemarks() {
        const placemark = await Placemark.find().lean();
        return placemark;
    },

    async getPlacemarkById(id) {
        if (id) {
            const placemark = await Placemark.findOne({ _id: id }).lean(); //lean falsch
            return placemark;
        }
        return null;
    },

    async getPlacemarksOfIdArray(array) {
        if(array) {
            const placemarks = [];

            for(let i = 0; i < array.length; i++){
                placemarks.push(await this.getPlacemarkById(array[i]));
            };
            return placemarks;
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
            await groupMongoStore.deletePlacemarkWithId(id);
        } catch (error) {
            console.log("bad id");
        }
    },

    async deleteAllPlacemarks() {
        await Placemark.deleteMany({});
    },

    async updatePlacemark(placemark, updatedPlacemark){
        //need to use query again because placemark is a lean object which save cant be called upon
        const placemarkMongoDB = await Placemark.findOne({ _id: placemark._id });
        placemarkMongoDB.name = updatedPlacemark.name;
        placemarkMongoDB.description = updatedPlacemark.description;
        placemarkMongoDB.location.latitude = updatedPlacemark.location.latitude;
        placemarkMongoDB.location.longitude = updatedPlacemark.location.longitude;
        placemarkMongoDB.category = updatedPlacemark.category;
        await placemarkMongoDB.save();
    },


    async updatePlacemarkImage(updatedPlacemark) {
        const placemark = await Placemark.findOne({ _id: updatedPlacemark._id });
        placemark.title = updatedPlacemark.title;
        placemark.image = updatedPlacemark.image;
        await placemark.save();
    },


};
