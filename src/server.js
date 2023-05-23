import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { webRoutes } from "./web-routes.js";
import { apiRoutes } from "./api-routes.js";
import {db } from "./model/db.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

async function init() {
    const server = Hapi.server({
        port: 3000,
        host: "localhost",
    });
    await server.register(Vision);
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