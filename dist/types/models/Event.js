"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class Event {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save Event entity without an ID");
        await store.set('Event', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove Event entity without an ID");
        await store.remove('Event', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get Event entity without an ID");
        const record = await store.get('Event', id.toString());
        if (record) {
            return Event.create(record);
        }
        else {
            return;
        }
    }
    static async getBySection(section) {
        const records = await store.getByField('Event', 'section', section);
        return records.map(record => Event.create(record));
    }
    static async getByMethod(method) {
        const records = await store.getByField('Event', 'method', method);
        return records.map(record => Event.create(record));
    }
    static async getByBlockId(blockId) {
        const records = await store.getByField('Event', 'blockId', blockId);
        return records.map(record => Event.create(record));
    }
    static async getByExtrinsicId(extrinsicId) {
        const records = await store.getByField('Event', 'extrinsicId', extrinsicId);
        return records.map(record => Event.create(record));
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new Event(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.Event = Event;
