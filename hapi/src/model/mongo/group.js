import Mongoose from "mongoose";
import { User } from "./user.js";
import { Placemark } from "./placemark.js";

const { Schema } = Mongoose;

const groupSchema = new Schema({
    title: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    arrayOfPlacemarkIds: [{type: Schema.Types.ObjectId, ref:"Placemark"}]
});

export const Group = Mongoose.model("Group", groupSchema);
