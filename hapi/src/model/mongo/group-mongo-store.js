import { Group } from "./group.js";
import { placemarkMongoStore } from "./placemark-mongo-store.js";

export const groupMongoStore = {
    async getAllGroups() {
        const groups = await Group.find().lean();
        return groups;
    },

    async getGroupById(id) {
        if (id) {
            const group = await Group.findOne({ _id: id });
            /*
            console.log(group);
            // is fine but with query call would be better
            if (group) {
                group.placemarks = await placemarkMongoStore.getPlacemarksOfIdArray(group.arrayOfPlacemarkIds);
            }
            console.log("group.placemarks");
            console.log(group.placemarks);
            // till here query call should replace

            const group2 = await Group.aggregate([
                {$match: {_id: group._id}},
                {$lookup:
                    {
                        from: "placemarks",
                        localField: "arrayOfPlacemarkIds",
                        foreignField: "_id",
                        as: "placemarks_info"
                    }
                }
            ])

            console.log("group");
            console.log(group);
            console.log("group2")
            console.log(group2[0]);
            console.log("group2.placemarks");
            console.log(group2[0].placemarks_info);
            */
            return group;
        }
        return null;
    },

    async getGroupPlusPlacemarkInfoById(id) {
        if (id) {
            const group = await Group.findOne({ _id: id });
            // should implement a safeguard when wrong id passed in
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
        // console.log(id);
        const groups = await Group.find( { arrayOfPlacemarkIds: id} );

        // console.log(groups)
        // Delete id out of array

        // console.log(id);
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

};
