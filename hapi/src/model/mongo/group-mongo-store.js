import { Group } from "./group.js";
import { placemarkMongoStore } from "./placemark-mongo-store.js";
import {db} from "../db.js";

export const groupMongoStore = {
    async getAllGroups() {
        const groups = await Group.find().lean();
        return groups;
    },

    async getGroupById(id) {
        if (id) {
            const group = await Group.findOne({ _id: id });
            return group;
        }
        return null;
    },

    async getGroupPlusPlacemarkInfoById(id) {
        if (id) {
            const group = await Group.findOne({ _id: id });
            const returneGroup = await Group.aggregate([
                {$match: {_id: group._id}},
                {$lookup:
                    {
                        from: "placemarks",
                        localField: "arrayOfPlacemarkIds",
                        foreignField: "_id",
                        as: "placemarks"
                    }
                }
            ])
            return returneGroup[0];
        }
        return null;
    },

    async addGroup(userId, group) {
        const newGroup = new Group(group);
        newGroup.userId = userId;
        const groupObj = await newGroup.save();
        // returns group without the placemarks array but only the placemark id array
        return (this.getGroupById(groupObj._id));
    },

    async deletePlacemarkWithId(id) { // From all Groups
        // Find groups with id in array
        const groups = await Group.find( { arrayOfPlacemarkIds: id} );
        // Delete id out of array
        await Group.updateMany (
            { },
            { $pull: {arrayOfPlacemarkIds: id, }, })

        groups.forEach(group => group.save());
    },

    async deletePlacemarkWithIdFromGroupWithId(groupId, placemarkId) { // From Group with groupId

        const group = await Group.findOne({ _id: groupId });

        await Group.updateMany(
            { _id: group._id},
            { $pull: {arrayOfPlacemarkIds: placemarkId, }, })

        group.save();
    },

    async getUserGroups(id) {
        const groups = await Group.find({ userId: id }).lean();
        // ändern
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
    },

    async addPlacemarkToGroup(placemarkId, groupId) {
        try {
            const placemark = await db.placemarkStore.getPlacemarkById(placemarkId);
            const group = await db.groupStore.getGroupById(groupId);

            const isInArray = group.arrayOfPlacemarkIds.some(function (placemarkId) {
                return placemarkId.equals(placemark._id);
            });

            if(!isInArray){
                group.arrayOfPlacemarkIds.push(placemark._id);
            };

            await group.save();
            return null;
        } catch(error) {
            return error;
        }

    },

};
