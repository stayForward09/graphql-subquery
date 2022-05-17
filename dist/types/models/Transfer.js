"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transfer = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class Transfer {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save Transfer entity without an ID");
        await store.set('Transfer', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove Transfer entity without an ID");
        await store.remove('Transfer', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get Transfer entity without an ID");
        const record = await store.get('Transfer', id.toString());
        if (record) {
            return Transfer.create(record);
        }
        else {
            return;
        }
    }
    static async getByFromId(fromId) {
        const records = await store.getByField('Transfer', 'fromId', fromId);
        return records.map(record => Transfer.create(record));
    }
    static async getByToId(toId) {
        const records = await store.getByField('Transfer', 'toId', toId);
        return records.map(record => Transfer.create(record));
    }
    static async getByAmount(amount) {
        const records = await store.getByField('Transfer', 'amount', amount);
        return records.map(record => Transfer.create(record));
    }
    static async getByExtrinsicId(extrinsicId) {
        const records = await store.getByField('Transfer', 'extrinsicId', extrinsicId);
        return records.map(record => Transfer.create(record));
    }
    static async getByCallId(callId) {
        const records = await store.getByField('Transfer', 'callId', callId);
        return records.map(record => Transfer.create(record));
    }
    static async getByTimestamp(timestamp) {
        const records = await store.getByField('Transfer', 'timestamp', timestamp);
        return records.map(record => Transfer.create(record));
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new Transfer(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.Transfer = Transfer;
