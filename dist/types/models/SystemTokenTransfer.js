"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemTokenTransfer = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class SystemTokenTransfer {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save SystemTokenTransfer entity without an ID");
        await store.set('SystemTokenTransfer', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove SystemTokenTransfer entity without an ID");
        await store.remove('SystemTokenTransfer', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get SystemTokenTransfer entity without an ID");
        const record = await store.get('SystemTokenTransfer', id.toString());
        if (record) {
            return SystemTokenTransfer.create(record);
        }
        else {
            return;
        }
    }
    static async getByFromId(fromId) {
        const records = await store.getByField('SystemTokenTransfer', 'fromId', fromId);
        return records.map(record => SystemTokenTransfer.create(record));
    }
    static async getByToId(toId) {
        const records = await store.getByField('SystemTokenTransfer', 'toId', toId);
        return records.map(record => SystemTokenTransfer.create(record));
    }
    static async getByAmount(amount) {
        const records = await store.getByField('SystemTokenTransfer', 'amount', amount);
        return records.map(record => SystemTokenTransfer.create(record));
    }
    static async getByTimestamp(timestamp) {
        const records = await store.getByField('SystemTokenTransfer', 'timestamp', timestamp);
        return records.map(record => SystemTokenTransfer.create(record));
    }
    static async getByExtrinsicId(extrinsicId) {
        const records = await store.getByField('SystemTokenTransfer', 'extrinsicId', extrinsicId);
        return records.map(record => SystemTokenTransfer.create(record));
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new SystemTokenTransfer(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.SystemTokenTransfer = SystemTokenTransfer;
