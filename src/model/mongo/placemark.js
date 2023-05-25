import Mongoose from "mongoose";
// import Boom from "@hapi/boom";
import { User } from "./user.js";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
    name: String,
    category: String,
    description: String,
    image: String,
    location: {latitude: Number, longitude: Number},
    createdById: {type: Schema.Types.ObjectId, ref:"User"}
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);
