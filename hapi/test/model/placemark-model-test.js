import { assert } from "chai";
import { db } from "../../src/model/db.js";
import { hochschule, maggie, testBridges } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Placemark Model tests", () => {
    setup(async () => {
        db.init();
        await db.placemarkStore.deleteAllPlacemarks();
        const user = await db.userStore.addUser(maggie);
        for (let i = 0; i < testBridges.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testBridges[i] = await db.placemarkStore.addPlacemark(user._id, testBridges[i]);
        }
    });

    test("create a placemark", async () => {
        const user = await db.userStore.addUser(maggie);
        const newPlacemark = await db.placemarkStore.addPlacemark(user._id, hochschule);
        assertSubset(hochschule, newPlacemark);
    });

    test("delete all placemmarkApi", async () => {
        let returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
        assert.equal(returnedPlacemarks.length, 3);
        await db.placemarkStore.deleteAllPlacemarks();
        returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
        assert.equal(returnedPlacemarks.length, 0);
    });

    test("get a placemark - success", async () => {
        const user = await db.userStore.addUser(maggie);
        const placemark = await db.placemarkStore.addPlacemark(user._id, hochschule);
        const returnedPlacemark = await db.placemarkStore.getPlacemarkById(placemark._id);
        assert.deepEqual(placemark, returnedPlacemark);

    });

    test("delete One Placemark - success", async () => {
        await db.placemarkStore.deletePlacemarkById(testBridges[0]._id);
        const returnedPlacemarks = await db.placemarkStore.getAllPlacemarks();
        assert.equal(returnedPlacemarks.length, testBridges.length - 1);
        const deletedPlacemark = await db.placemarkStore.getPlacemarkById(testBridges[0]._id);
        assert.isNull(deletedPlacemark);
    });

    test("get a placemark - bad params", async () => {
        assert.isNull(await db.placemarkStore.getPlacemarkById(""));
        assert.isNull(await db.placemarkStore.getPlacemarkById());
    });

    test("delete One Placemark - fail", async () => {
        await db.placemarkStore.deletePlacemarkById("bad-id");
        const allPlacemarks = await db.placemarkStore.getAllPlacemarks();
        assert.equal(testBridges.length, allPlacemarks.length);
    });
});
