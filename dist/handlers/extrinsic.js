"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtrinsicHandler = void 0;
const helpers_1 = require("../helpers");
const Extrinsic_1 = require("../types/models/Extrinsic");
const block_1 = require("./block");
const call_1 = require("./call");
const account_1 = require("./sub-handlers/account");
class ExtrinsicHandler {
    constructor(extrinsic) {
        this.extrinsic = extrinsic;
    }
    static async ensureExtrinsic(id) {
        const extrinsic = await Extrinsic_1.Extrinsic.get(id);
        if (!extrinsic) {
            await new Extrinsic_1.Extrinsic(id).save();
        }
    }
    get id() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.extrinsic) === null || _a === void 0 ? void 0 : _a.extrinsic) === null || _b === void 0 ? void 0 : _b.hash) === null || _c === void 0 ? void 0 : _c.toString();
    }
    get method() {
        return this.extrinsic.extrinsic.method.method;
    }
    get section() {
        return this.extrinsic.extrinsic.method.section;
    }
    get args() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.extrinsic) === null || _a === void 0 ? void 0 : _a.extrinsic) === null || _b === void 0 ? void 0 : _b.args) === null || _c === void 0 ? void 0 : _c.toString();
    }
    get signer() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.extrinsic) === null || _a === void 0 ? void 0 : _a.extrinsic) === null || _b === void 0 ? void 0 : _b.signer) === null || _c === void 0 ? void 0 : _c.toString();
    }
    get nonce() {
        var _a, _b, _c;
        return ((_c = (_b = (_a = this.extrinsic) === null || _a === void 0 ? void 0 : _a.extrinsic) === null || _b === void 0 ? void 0 : _b.nonce) === null || _c === void 0 ? void 0 : _c.toBigInt()) || BigInt(0);
    }
    get timestamp() {
        return this.extrinsic.block.timestamp;
    }
    get blockHash() {
        var _a, _b, _c, _d;
        return (_d = (_c = (_b = (_a = this.extrinsic) === null || _a === void 0 ? void 0 : _a.block) === null || _b === void 0 ? void 0 : _b.block) === null || _c === void 0 ? void 0 : _c.hash) === null || _d === void 0 ? void 0 : _d.toString();
    }
    get isSigned() {
        return this.extrinsic.extrinsic.isSigned;
    }
    get signature() {
        return this.extrinsic.extrinsic.signature.toString();
    }
    get tip() {
        return this.extrinsic.extrinsic.tip.toBigInt() || BigInt(0);
    }
    get isSuccess() {
        return (0, helpers_1.checkIfExtrinsicExecuteSuccess)(this.extrinsic);
    }
    get batchInterruptedIndex() {
        return (0, helpers_1.getBatchInterruptedIndex)(this.extrinsic);
    }
    async save() {
        const record = new Extrinsic_1.Extrinsic(this.id);
        await block_1.BlockHandler.ensureBlock(this.blockHash);
        await account_1.AccountHandler.ensureAccount(this.signer, this.extrinsic.block.timestamp);
        record.method = this.method;
        record.section = this.section;
        record.args = this.args;
        record.signerId = this.signer;
        record.nonce = this.nonce;
        record.isSigned = this.isSigned;
        record.timestamp = this.timestamp;
        record.signature = this.signature;
        record.tip = this.tip;
        record.isSuccess = this.isSuccess;
        record.blockId = this.blockHash;
        await record.save();
        // handle calls
        const calls = new call_1.CallHandler(this.extrinsic);
        await calls.save();
    }
}
exports.ExtrinsicHandler = ExtrinsicHandler;
