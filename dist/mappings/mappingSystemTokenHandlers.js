"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.systemTokenTransferEvent = void 0;
const SystemTokenTransfer_1 = require("../types/models/SystemTokenTransfer");
const account_1 = require("../handlers/sub-handlers/account");
const extrinsic_1 = require("../handlers/extrinsic");
async function systemTokenTransferEvent(event) {
    const { event: { data: [from_origin, to_origin, amount_origin] } } = event;
    const from = from_origin.toString();
    const to = to_origin.toString();
    const amount = amount_origin.toBigInt();
    await account_1.AccountHandler.ensureAccount(from, event.block.timestamp);
    await account_1.AccountHandler.ensureAccount(to, event.block.timestamp);
    const blockNumber = event.extrinsic.block.block.header.number.toNumber();
    let record = new SystemTokenTransfer_1.SystemTokenTransfer(blockNumber.toString() + '-' + event.idx.toString());
    record.fromId = from;
    record.toId = to;
    record.amount = amount;
    record.timestamp = event.block.timestamp;
    record.extrinsicId = new extrinsic_1.ExtrinsicHandler(event.extrinsic).id;
    await record.save();
}
exports.systemTokenTransferEvent = systemTokenTransferEvent;
