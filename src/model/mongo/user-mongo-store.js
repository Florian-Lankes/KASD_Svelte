import { User } from "./user.js";

export const userMongoStore = {
    async getAllUsers() {
        const users = await User.find().lean();
        return users;
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

    //for admin there is a ban function that the user cant create a new account with same credentials

    async isAdmin(id) {
        const user = await this.getUserById(id);
        if(user.isAdmin){
            return true;
        }
        return false;
    }
};
