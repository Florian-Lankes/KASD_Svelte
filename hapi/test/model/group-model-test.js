import { assert } from "chai";
import { db } from "../../src/model/db.js";
import {testGroups, maggie, history, testBridges} from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

const groups = new Array(testGroups.length)
//  Doesn't work because of the lean thing

suite("Group Model tests", () => {

    setup(async () => {
        db.init();
        await db.groupStore.deleteAllGroups();
        const user = await db.userStore.addUser(maggie);
        for (let i = 0; i < testGroups.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            groups[i] = await db.groupStore.addGroup(user._id, testGroups[i]);
        }
    });

    test("create a group", async () => {
        const user = await db.userStore.addUser(maggie);
        const group = await db.groupStore.addGroup(user._id, history);
        assertSubset(history, group);
        // assert.isDefined(group._id);
    });


    test("delete all groups", async () => {
        let returnedGroups = await db.groupStore.getAllGroups();
        assert.equal(returnedGroups.length, 3);
        await db.groupStore.deleteAllGroups();
        returnedGroups = await db.groupStore.getAllGroups();
        assert.equal(returnedGroups.length, 0);
    });

    test("get a group - success", async () => {
        const user = await db.userStore.addUser(maggie);
        const group = await db.groupStore.addGroup(user._id, history);
        const returnedGroup = await db.groupStore.getGroupById(group._id);
        assertSubset(history, group);
    });

    test("delete One Group - success", async () => {
        const id = groups[0]._id;
        await db.groupStore.deleteGroupById(id);
        const returnedGroups = await db.groupStore.getAllGroups();
        assert.equal(returnedGroups.length, testGroups.length - 1);
        const deletedGroup = await db.groupStore.getGroupById(id);
        assert.isNull(deletedGroup);
    });

    test("get a group - bad params", async () => {
        assert.isNull(await db.groupStore.getGroupById(""));
        assert.isNull(await db.groupStore.getGroupById());
    });

    test("delete One Group - fail", async () => {
        await db.groupStore.deleteGroupById("bad-id");
        const allGroups = await db.groupStore.getAllGroups();
        assert.equal(testGroups.length, allGroups.length);
    });
});
