import Inert from "@hapi/inert";
import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import Cookie from "@hapi/cookie";
import Joi from "joi";
import jwt from "hapi-auth-jwt2";
import { validate } from "./api/jwt-utils.js";
import HapiSwagger from "hapi-swagger";
import { accountsController } from "./controllers/accounts-controller.js";
import { webRoutes } from "./web-routes.js";
import { apiRoutes } from "./api-routes.js";
import {db } from "./model/db.js";


const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const result = dotenv.config();
if (result.error) {
    console.log(result.error.message);
    process.exit(1);
}
const swaggerOptions = {
    info: {
        title: "KASDMaps API",
        version: "0.8.0",
    },
};

// Not finished: Group view edit, edit placemarks, admin, adding placemarks to groups
async function init() {
    const server = Hapi.server({
        port: 3000,
        host: "localhost",
    });

    await server.register(Inert);
    await server.register(Vision);
    await server.register(Cookie);
    await server.register(jwt);

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions,
        },
    ]);

    server.validator(Joi);
    server.views({
        engines: {
            hbs: Handlebars,
        },
        relativeTo: dirname,
        path: "./pages",
        layoutPath: "./pages",
        partialsPath: "./pages/components",
        layout: true,
        isCached: false,
    });

    server.auth.strategy("session", "cookie", {
        cookie: {
            name: process.env.cookie_name,
            password: process.env.cookie_password,
            isSecure: false,
        },
        redirectTo: "/",
        validate: accountsController.validate,
    });
    server.auth.strategy("jwt", "jwt", {
        key: process.env.cookie_password,
        validate: validate,
        verifyOptions: { algorithms: ["HS256"] }
    });
    server.auth.default("session");

    db.init();
    server.route(webRoutes);
    server.route(apiRoutes);
    await server.start();
    console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});

init();