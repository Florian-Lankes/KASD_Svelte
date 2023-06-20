import { UserSpec, UserCredentialsSpec} from "../model/joi-schemas.js";
import { db } from "../model/db.js";


export const accountsController = {

    index: {
        auth: false,
        handler: function (request, h) {
            return h.view("main", { title: "Welcome to Placemark" });
        },
    },

    showSignup: {
        auth: false,
        handler: function (request, h) {
            return h.view("signup-page", { title: "Sign up for Placemark" });
        },
    },

    signup: {
        auth: false,
        validate: {
            payload: UserSpec,
            options: { abortEarly: false},
            failAction: function (request, h, error) {
                return h.view("signup-page", { title: "Sign up error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const user = request.payload;
            console.log(user);
            const user2 = { firstName: request.payload.firstName,
                            lastName: request.payload.lastName,
                            username: request.payload.firstName + request.payload.lastName,
                            email: request.payload.email,
                            password: request.payload.password,
                            isAdmin: request.payload.isAdmin}
            console.log(user2);
            await db.userStore.addUser(user2);
            return h.redirect("/");
        },
    },


    showLogin: {
        auth: false,
        handler: function (request, h) {
            return h.view("login-page", { title: "Login to Placemark" });
        },
    },

    login: {
        auth: false,
        validate: {
            payload: UserCredentialsSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("login-page", { title: "Log in error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const { email, password } = request.payload;
            const user = await db.userStore.getUserByEmail(email);
            if (!user || user.password !== password) {
                return h.redirect("/");
            }
            request.cookieAuth.set({ id: user._id});
            return h.redirect("/dashboard");
        },
    },

    logout: {
        auth: false,
        handler: function (request, h) {
            request.cookieAuth.clear();
            return h.redirect("/");
        },
    },

    // auth not defined
    showUser: {
        handler: async function (request, h) {
            const user = await db.userStore.getUserById(request.params.id);
            const loggedInUser = request.auth.credentials;
            const loggedInUserIsAdmin = loggedInUser.isAdmin;
            return h.view("user-info-page", { user, loggedInUserIsAdmin});
        },
    },

    // auth not defined
    deleteUser: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const userToDelete = await db.userStore.getUserById(request.params.id);
            if(userToDelete.isAdmin){
                // could add viewData to display an error code when not able to delete
                return h.redirect("/dashboard/admin");
            }
            // should I delete the Placemarks of the deleted User?
            await db.userStore.deleteUserById(userToDelete._id);
            return h.redirect("/dashboard/admin");
        },
    },

    async validate(request, session) {
        const user = await db.userStore.getUserById(session.id);
        if (!user) {
            return { isValid: false };
        }
        return { isValid: true, credentials: user };
    },

};


