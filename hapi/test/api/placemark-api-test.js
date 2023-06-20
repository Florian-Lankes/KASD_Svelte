import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { KASDMapsService } from "./KASDMaps-service.js";
import {hochschule, testBridges, maggie, maggieCredentials} from "../fixtures.js";
import { EventEmitter } from "events";

const placemark = new Array(testBridges.length)

EventEmitter.setMaxListeners(27);

suite("Placemark API tests", () => {
    setup(async () => {
        await KASDMapsService.clearAuth();
        await KASDMapsService.createUser(maggie);
        await KASDMapsService.authenticate(maggieCredentials);
        await KASDMapsService.deleteAllUsers();
        const user = await KASDMapsService.createUser(maggie);
        await KASDMapsService.authenticate(maggieCredentials)
        await KASDMapsService.deleteAllPlacemarks();
        for (let i = 0; i < testBridges.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            placemark[0] = await KASDMapsService.createPlacemark(user._id, testBridges[i]);
        }
    });
    teardown(async () => {});

    test("create a placemark", async () => {
        const user = await KASDMapsService.createUser(maggie);
        await KASDMapsService.authenticate(maggieCredentials);
        const newPlacemark = await KASDMapsService.createPlacemark(user._id , hochschule);
        assertSubset(hochschule, newPlacemark);
        assert.isDefined(newPlacemark._id);
    });

    test("delete all placemarks", async () => {
        let returnedPlacemark = await KASDMapsService.getAllPlacemarks();
        assert.equal(returnedPlacemark.length, 3);
        await KASDMapsService.deleteAllPlacemarks()
        returnedPlacemark = await KASDMapsService.getAllPlacemarks();
        assert.equal(returnedPlacemark.length, 0);
    });
    test("get a placemark", async () => {
        const returnedplacemark = await KASDMapsService.getPlacemark(placemark[0]._id);
        assert.deepEqual(placemark[0], returnedplacemark);
    });

    test("get a placemark - bad id", async () => {
        try {
            const returnedplacemark = await KASDMapsService.getPlacemark("1234");
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No Placemark with this id");
            assert.equal(error.response.data.statusCode, 503);
        }
    });

    test("get a placemark - deleted placemark", async () => {
        await KASDMapsService.deleteAllPlacemarks();
        try {
            const returnedplacemark = await KASDMapsService.getPlacemark(placemark[0]._id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No Placemark with this id");
            assert.equal(error.response.data.statusCode, 404);
        }
    });
});