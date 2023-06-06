import { Group } from "./group.js";
import { placemarkMongoStore } from "./placemark-mongo-store.js";

export const groupMongoStore = {
    async getAllGroups() {
        const groups = await Group.find().lean();
        return groups;
    },

    async getGroupById(id) {
        if (id) {
            const group = await Group.findOne({ _id: id }).lean();
            if (group) {
                group.placemarks = await placemarkMongoStore.getPlacemarksOfIdArray(group.arrayOfPlacemarkIds);
            }
            return group;
        }
        return null;
    },

    async addGroup(userId, group) {
        const newGroup = new Group(group);
        newGroup.userId = userId;
        const groupObj = await newGroup.save();
        return this.getGroupById(groupObj._id);
    },

    async getUserGroups(id) {
        const groups = await Group.find({ userId: id }).lean();
        return groups;
    },

    async deleteGroupById(id) {
        try {
            await Group.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },

    async deleteAllGroups() {
        await Group.deleteMany({});
    }
};
