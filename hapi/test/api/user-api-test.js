import {assert} from "chai";
import {assertSubset} from "../test-utils.js";
import {KASDMapsService} from "./KASDMaps-service.js";
import {maggie, maggieCredentials, testUsers} from "../fixtures.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
    setup(async () => {
        await KASDMapsService.clearAuth();
        await KASDMapsService.createUser(maggie);
        await KASDMapsService.authenticate(maggieCredentials);
        await KASDMapsService.deleteAllUsers();
        for (let i = 0; i < testUsers.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            users[0] = await KASDMapsService.createUser(testUsers[i]);
        }
        await KASDMapsService.createUser(maggie);
        await KASDMapsService.authenticate(maggieCredentials);
    });
    teardown(async () => {
    });

    test("create a user", async () => {
        const newUser = await KASDMapsService.createUser(maggie);
        assertSubset(maggie, newUser);
        assert.isDefined(newUser._id);
    });

    test("delete all userApi", async () => {
        let returnedUsers = await KASDMapsService.getAllUsers();
        assert.equal(returnedUsers.length, 4);
        await KASDMapsService.deleteAllUsers();
        await KASDMapsService.createUser(maggie);
        await KASDMapsService.authenticate(maggieCredentials);
        returnedUsers = await KASDMapsService.getAllUsers();
        assert.equal(returnedUsers.length, 1);
    });

    test("get a user", async () => {
        const returnedUser = await KASDMapsService.getUser(users[0]._id);
        assert.deepEqual(users[0], returnedUser);
    });

    test("get a user - bad id", async () => {
        try {
            const returnedUser = await KASDMapsService.getUser("1234");
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No User with this id");
            assert.equal(error.response.data.statusCode, 503);
        }
    });

    test("get a user - deleted user", async () => {
        await KASDMapsService.deleteAllUsers();
        await KASDMapsService.createUser(maggie);
        await KASDMapsService.authenticate(maggieCredentials);
        try {
            const returnedUser = await KASDMapsService.getUser(users[0]._id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No User with this id");
            assert.equal(error.response.data.statusCode, 404);
        }
    });
});