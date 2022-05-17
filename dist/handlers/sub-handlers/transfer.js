"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferHandler = void 0;
const Transfer_1 = require("../../types/models/Transfer");
const call_1 = require("../call");
const extrinsic_1 = require("../extrinsic");
const account_1 = require("./account");
class TransferHandler {
    static async createFromCurrenciesModule({ id, call, extrinsic, isSuccess }) {
        const args = call.args;
        const extrinsicHandler = new extrinsic_1.ExtrinsicHandler(extrinsic);
        const to = args[0].toString();
        const amount = args[2].toBigInt() || BigInt(0);
        const from = extrinsicHandler.signer;
        const extrinsicHash = extrinsicHandler.id;
        await account_1.AccountHandler.ensureAccount(to, extrinsic.block.timestamp);
        await account_1.AccountHandler.ensureAccount(from, extrinsic.block.timestamp);
        await call_1.CallHandler.ensureCall(id);
        const transfer = new Transfer_1.Transfer(id);
        transfer.toId = to;
        transfer.fromId = from;
        transfer.amount = amount;
        transfer.extrinsicId = extrinsicHash;
        transfer.callId = id;
        transfer.timestamp = extrinsicHandler.timestamp;
        transfer.isSuccess = isSuccess;
        await transfer.save();
    }
}
exports.TransferHandler = TransferHandler;
