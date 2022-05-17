"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockHandler = void 0;
const helpers_1 = require("../helpers");
const Block_1 = require("../types/models/Block");
class BlockHandler {
    constructor(block) {
        this.block = block;
    }
    static async ensureBlock(id) {
        const block = await Block_1.Block.get(id);
        if (!block) {
            await new Block_1.Block(id).save();
        }
    }
    get blockTimestamp() {
        return (0, helpers_1.getBlockTimestamp)(this.block.block);
    }
    get number() {
        return this.block.block.header.number.toBigInt() || BigInt(0);
    }
    get hash() {
        return this.block.block.hash.toString();
    }
    get specVersion() {
        return this.block.specVersion;
    }
    get parentHash() {
        return this.block.block.header.parentHash.toString();
    }
    async save() {
        const block = new Block_1.Block(this.hash);
        block.number = this.number;
        block.timestamp = this.blockTimestamp;
        block.specVersion = this.specVersion;
        block.parentHash = this.parentHash;
        await block.save();
    }
}
exports.BlockHandler = BlockHandler;
