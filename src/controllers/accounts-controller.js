// import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import { db } from "../model/db.js";

export const accountsController = {

    index: {
        handler: function (request, h) {
            return h.view("main", { title: "Welcome to Placemark" });
        },
    },

    showSignup: {
        handler: function (request, h) {
            return h.view("signup-page", { title: "Sign up for Placemark" });
        },
    },

    signup: {
        handler: async function (request, h) {
            const user = request.payload;
            const user2 = { firstname: request.payload.firstName,
                            lastName: request.payload.lastName,
                            email: request.payload.email,
                            password: request.payload.password}
            console.log("----------------------------");
            await db.userStore.addUser(user);
            console.log("----------------------------");
            return h.redirect("/");
        },
    },


    showLogin: {
        handler: function (request, h) {
            return h.view("login-page", { title: "Login to Placemark" });
        },
    },

    login: {

        handler: async function (request, h) {
            const { email, password } = request.payload;
            const user = await db.userStore.getUserByEmail(email);
            if (!user || user.password !== password) {
                return h.redirect("/");
            }
            return h.redirect("/dashboard");
        },
    },

    logout: {
        handler: function (request, h) {
            return h.redirect("/");
        },
    },
};


