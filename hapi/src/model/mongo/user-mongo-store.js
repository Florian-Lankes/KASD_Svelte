import { User } from "./user.js";

export const userMongoStore = {
    async getAllUsers() {
        const users = await User.find().lean();
        return users;
    },

    async getUserCount(){
        const count = await User.countDocuments();
        return count;
    },

    async getUserById(id) {
        if (id) {
            const user = await User.findOne({ _id: id }).lean();
            return user;
        }
        return null;
    },

    async addUser(user) {
        const newUser = new User(user);
        const userObj = await newUser.save();
        const u = await this.getUserById(userObj._id);
        return u;
    },

    async getUserByEmail(email) {
        const user = await User.findOne({ email: email }).lean();
        return user;
    },

    async deleteUserById(id) {
        try {
            await User.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },

    async deleteAllUsers() {
        await User.deleteMany({});
    },


    async isAdmin(id) {
        const user = await this.getUserById(id);
        if(user.isAdmin){
            return true;
        }
        return false;
    }
};
