"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class Block {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save Block entity without an ID");
        await store.set('Block', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove Block entity without an ID");
        await store.remove('Block', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get Block entity without an ID");
        const record = await store.get('Block', id.toString());
        if (record) {
            return Block.create(record);
        }
        else {
            return;
        }
    }
    static async getByNumber(number) {
        const records = await store.getByField('Block', 'number', number);
        return records.map(record => Block.create(record));
    }
    static async getByTimestamp(timestamp) {
        const records = await store.getByField('Block', 'timestamp', timestamp);
        return records.map(record => Block.create(record));
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new Block(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.Block = Block;
