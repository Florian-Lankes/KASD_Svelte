import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { KASDMapsService } from "./KASDMaps-service.js";
import {hochschule, testBridges, maggie} from "../fixtures.js";

suite("Placemark API tests", () => {
    setup(async () => {
        await KASDMapsService.deleteAllPlacemarks();
        await KASDMapsService.deleteAllUsers();
        const user = await KASDMapsService.createUser(maggie);
        for (let i = 0; i < testBridges.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testBridges[0] = await KASDMapsService.createPlacemark(user._id, testBridges[i]);
        }
    });
    teardown(async () => {});

    test("create a placemark", async () => {
        const newPlacemark = await KASDMapsService.createPlacemark(hochschule);
        assertSubset(hochschule, newPlacemark);
        assert.isDefined(newPlacemark._id);
    });

    test("delete all placemarks", async () => {
        let returnedPlacemark = await KASDMapsService.getAllPlacemarks();
        assert.equal(returnedPlacemark.length, 3);
        await KASDMapsService.deleteAllPlacemarks();
        returnedPlacemark = await KASDMapsService.getAllPlacemarks();
        assert.equal(returnedPlacemark.length, 0);
    });

    test("get a placemark", async () => {
        const returnedPlacemark = await KASDMapsService.getPlacemark(testBridges[0]._id);
        assert.deepEqual(testBridges[0], returnedPlacemark);
    });

    test("get a placemark - bad id", async () => {
        try {
            const returnedPlacemark = await KASDMapsService.getPlacemark("1234");
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No Placemark with this id");
            assert.equal(error.response.data.statusCode, 503);
        }
    });

    test("get a placemark - deleted placemark", async () => {
        await KASDMapsService.deleteAllPlacemarks();
        try{
            const returnedPlacemark = await KASDMapsService.getPlacemark((testBridges[0]._id));
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No Placemark with this id");
            assert.equal(error.response.data.statusCode, 404);
        }
    });
});