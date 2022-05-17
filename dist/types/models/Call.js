"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Call = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class Call {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save Call entity without an ID");
        await store.set('Call', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove Call entity without an ID");
        await store.remove('Call', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get Call entity without an ID");
        const record = await store.get('Call', id.toString());
        if (record) {
            return Call.create(record);
        }
        else {
            return;
        }
    }
    static async getBySection(section) {
        const records = await store.getByField('Call', 'section', section);
        return records.map(record => Call.create(record));
    }
    static async getByMethod(method) {
        const records = await store.getByField('Call', 'method', method);
        return records.map(record => Call.create(record));
    }
    static async getByTimestamp(timestamp) {
        const records = await store.getByField('Call', 'timestamp', timestamp);
        return records.map(record => Call.create(record));
    }
    static async getBySignerId(signerId) {
        const records = await store.getByField('Call', 'signerId', signerId);
        return records.map(record => Call.create(record));
    }
    static async getByExtrinsicId(extrinsicId) {
        const records = await store.getByField('Call', 'extrinsicId', extrinsicId);
        return records.map(record => Call.create(record));
    }
    static async getByParentCallId(parentCallId) {
        const records = await store.getByField('Call', 'parentCallId', parentCallId);
        return records.map(record => Call.create(record));
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new Call(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.Call = Call;
