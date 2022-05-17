"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
const Event_1 = require("../types/models/Event");
const block_1 = require("./block");
const extrinsic_1 = require("./extrinsic");
const dispatcher_1 = require("../helpers/dispatcher");
class EventHandler {
    constructor(event) {
        this.event = event;
        this.dispatcher = new dispatcher_1.Dispatcher();
        this.registerDispatcherHandler();
    }
    registerDispatcherHandler() {
        this.dispatcher.batchRegist([]);
    }
    get index() {
        return this.event.idx;
    }
    get blockNumber() {
        return this.event.block.block.header.number.toBigInt();
    }
    get blockHash() {
        return this.event.block.block.hash.toString();
    }
    get section() {
        return this.event.event.section;
    }
    get method() {
        return this.event.event.method;
    }
    get data() {
        return this.event.event.data.toString();
    }
    get extrinsicHash() {
        var _a, _b, _c, _d;
        const i = (_d = (_c = (_b = (_a = this.event) === null || _a === void 0 ? void 0 : _a.extrinsic) === null || _b === void 0 ? void 0 : _b.extrinsic) === null || _c === void 0 ? void 0 : _c.hash) === null || _d === void 0 ? void 0 : _d.toString();
        return i === 'null' ? undefined : i;
    }
    get id() {
        return `${this.blockNumber}-${this.index}`;
    }
    async save() {
        const event = new Event_1.Event(this.id);
        await block_1.BlockHandler.ensureBlock(this.blockHash);
        if (this.extrinsicHash) {
            await extrinsic_1.ExtrinsicHandler.ensureExtrinsic(this.extrinsicHash);
        }
        event.index = this.index;
        event.section = this.section;
        event.method = this.method;
        event.data = this.data;
        event.blockId = this.blockHash;
        if (this.extrinsicHash) {
            event.extrinsicId = this.extrinsicHash;
        }
        await this.dispatcher.dispatch(`${this.section}-${this.method}`, this.event);
        await event.save();
    }
}
exports.EventHandler = EventHandler;
