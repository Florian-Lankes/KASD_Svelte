import { assert } from "chai";
import { KASDMapsService } from "./KASDMaps-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, history, testGroups } from "../fixtures.js";


suite("Group API tests", () => {
    let user = null;

    setup(async () => {
        await KASDMapsService.deleteAllGroups();
        await KASDMapsService.deleteAllUsers();
        user = await KASDMapsService.createUser(maggie);
        // mozart.userid = user._id;
    });

    teardown(async () => {});

    test("create group", async () => {
        const returnedGroups = await KASDMapsService.createGroup(user._id, history);
        assert.isNotNull(returnedGroups);
        assertSubset(history, returnedGroups);
    });

    test("delete a group", async () => {
        const group = await KASDMapsService.createGroup(user._id, history);
        const response = await KASDMapsService.deleteGroup(group._id);
        assert.equal(response.status, 204);
        try {
            const returnedGroup = await KASDMapsService.getGroup(group.id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No Group with this id", "Incorrect Response Message");
        }
    });

    test("create multiple groups", async () => {
        for (let i = 0; i < testGroups.length; i += 1) {
            testGroups[i].userid = user._id;
            // eslint-disable-next-line no-await-in-loop
            await KASDMapsService.createGroup(user._id, testGroups[i]);
        }
        let returnedLists = await KASDMapsService.getAllGroups();
        assert.equal(returnedLists.length, testGroups.length);
        await KASDMapsService.deleteAllGroups();
        returnedLists = await KASDMapsService.getAllGroups();
        assert.equal(returnedLists.length, 0);
    });

    test("remove non-existant group", async () => {
        try {
            const response = await KASDMapsService.deleteGroup("not an id");
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No Group with this id", "Incorrect Response Message");
        }
    });
});
