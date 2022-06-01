"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCall = exports.handleEvent = exports.handleBlock = void 0;
const block_1 = require("../handlers/block");
const handlers_1 = require("../handlers");
const vestingschedule_1 = require("../handlers/vestingschedule");
async function handleBlock(block) {
    const handler = new block_1.BlockHandler(block);
    await handler.save();
}
exports.handleBlock = handleBlock;
async function handleEvent(event) {
    const handler = new handlers_1.EventHandler(event);
    await handler.save();
    if (event.event.section === "vesting" && event.event.method === "VestingScheduleAdded") {
        const handler = new vestingschedule_1.VestingScheduleHandler(event);
        await handler.save();
    }
}
exports.handleEvent = handleEvent;
async function handleCall(extrinsic) {
    const extrinsicHandler = new handlers_1.ExtrinsicHandler(extrinsic);
    await extrinsicHandler.save();
}
exports.handleCall = handleCall;
