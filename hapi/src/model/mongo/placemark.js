import Mongoose from "mongoose";
// import Boom from "@hapi/boom";
import { User } from "./user.js";
// import { Group } from "./group.js";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
    name: String,
    category: String,
    description: String,
    image: [{type: String}],
    location: {latitude: Number, longitude: Number},
    createdById: {type: Schema.Types.ObjectId, ref:"User"},
    // groupId: {type: Schema.Types.ObjectId, ref:"Group"} cant put here because groupId would be same for every user
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);
