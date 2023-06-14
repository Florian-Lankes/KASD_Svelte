import { assert } from "chai";
import { KASDMapsService } from "./KASDMaps-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, history, testGroups, maggieCredentials } from "../fixtures.js";


//  getGroup now only gets the group with the id array but not with the placemarks array
suite("Group API tests", () => {

    setup(async () => {
        await KASDMapsService.clearAuth();
        await KASDMapsService.createUser(maggie);
        await KASDMapsService.authenticate(maggieCredentials);
        await KASDMapsService.deleteAllGroups();
        await KASDMapsService.deleteAllUsers();
        const user = await KASDMapsService.createUser(maggie);
        await KASDMapsService.authenticate(maggieCredentials);
        history.userid = user._id;

    });

    teardown(async () => {});

    test("create group", async () => {
        const user = await KASDMapsService.createUser(maggie);
        await KASDMapsService.authenticate(maggieCredentials);
        const returnedGroups = await KASDMapsService.createGroup(user._id, history);
        assert.isNotNull(returnedGroups);
        assertSubset(history, returnedGroups);
    });

    test("delete a group", async () => {
        const user = await KASDMapsService.createUser(maggie);
        await KASDMapsService.authenticate(maggieCredentials);
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
        const user = await KASDMapsService.createUser(maggie);
        await KASDMapsService.authenticate(maggieCredentials);
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
