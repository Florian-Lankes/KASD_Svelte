import * as cloudinary from "cloudinary";
import { writeFileSync } from "fs";
import dotenv from "dotenv";
import {db} from "./db.js";

dotenv.config();

const credentials = {
    cloud_name: process.env.cloudinary_name,
    api_key: process.env.cloudinary_key,
    api_secret: process.env.cloudinary_secret
};
cloudinary.config(credentials);

export const imageStore = {

    getAllImages: async function() {
        const result = await cloudinary.v2.api.resources();
        return result.resources;
    },

    getPlacemarkImages: async function(placemarkId) {
        // dont know api call for specific pictures
        // but dont need to because we already have the urls in the database
        const placemark = await db.placemarkStore.getPlacemarkById(placemarkId);
        const result = placemark.image.map((url) => ({secure_url: url}));
        return result;
    },

    uploadImage: async function(imagefile) {
        writeFileSync("./public/temp.img", imagefile);
        const response = await cloudinary.v2.uploader.upload("./public/temp.img");
        return response.url;
    },

    deleteImage: async function(img) {
        await cloudinary.v2.uploader.destroy(img, {});
    }
};
