"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extrinsic = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class Extrinsic {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save Extrinsic entity without an ID");
        await store.set('Extrinsic', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove Extrinsic entity without an ID");
        await store.remove('Extrinsic', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get Extrinsic entity without an ID");
        const record = await store.get('Extrinsic', id.toString());
        if (record) {
            return Extrinsic.create(record);
        }
        else {
            return;
        }
    }
    static async getByMethod(method) {
        const records = await store.getByField('Extrinsic', 'method', method);
        return records.map(record => Extrinsic.create(record));
    }
    static async getBySection(section) {
        const records = await store.getByField('Extrinsic', 'section', section);
        return records.map(record => Extrinsic.create(record));
    }
    static async getBySignerId(signerId) {
        const records = await store.getByField('Extrinsic', 'signerId', signerId);
        return records.map(record => Extrinsic.create(record));
    }
    static async getByTimestamp(timestamp) {
        const records = await store.getByField('Extrinsic', 'timestamp', timestamp);
        return records.map(record => Extrinsic.create(record));
    }
    static async getByBlockId(blockId) {
        const records = await store.getByField('Extrinsic', 'blockId', blockId);
        return records.map(record => Extrinsic.create(record));
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new Extrinsic(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.Extrinsic = Extrinsic;
