import {userMongoStore} from "./mongo/user-mongo-store.js";
import {placemarkMongoStore} from "./mongo/placemark-mongo-store.js";
import {groupMongoStore} from "./mongo/group-mongo-store.js";
import {connectMongo} from "./mongo/connect.js";

export const db = {
    userStore: null,
    placemarkStore: null,
    groupStore: null,

    init() {
        this.userStore = userMongoStore;
        this.placemarkStore = placemarkMongoStore;
        this.groupStore = groupMongoStore;
        connectMongo()
    },
};
