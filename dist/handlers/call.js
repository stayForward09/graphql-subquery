"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallHandler = void 0;
const Call_1 = require("../types/models/Call");
const extrinsic_1 = require("./extrinsic");
const account_1 = require("./sub-handlers/account");
const dispatcher_1 = require("../helpers/dispatcher");
const transfer_1 = require("./sub-handlers/transfer");
class CallHandler {
    constructor(extrinsic) {
        this.extrinsic = extrinsic;
        this.dispatcher = new dispatcher_1.Dispatcher();
        this.registerSubHandler();
    }
    static async ensureCall(id) {
        const call = await Call_1.Call.get(id);
        if (!call) {
            await new Call_1.Call(id).save();
        }
    }
    registerSubHandler() {
        this.dispatcher.batchRegist([
            {
                key: 'currencies-transfer',
                handler: transfer_1.TransferHandler.createFromCurrenciesModule
            },
        ]);
    }
    get hash() {
        return this.extrinsic.extrinsic.hash.toString();
    }
    get signer() {
        return this.extrinsic.extrinsic.signer.toString();
    }
    async traver() {
        const list = [];
        await account_1.AccountHandler.ensureAccount(this.signer, this.extrinsic.block.timestamp);
        const extrinsic = new extrinsic_1.ExtrinsicHandler(this.extrinsic);
        const inner = async (data, parentCallId, idx, isRoot, depth) => {
            const id = isRoot ? parentCallId : `${parentCallId}-${idx}`;
            const method = data.method;
            const section = data.section;
            const args = data.args;
            const call = new Call_1.Call(id);
            call.method = method;
            call.section = section;
            call.args = JSON.stringify(args);
            call.signerId = this.signer;
            call.isSuccess = depth === 0 ? extrinsic.isSuccess : extrinsic.batchInterruptedIndex > idx;
            call.timestamp = extrinsic.timestamp;
            if (!isRoot) {
                await CallHandler.ensureCall(parentCallId);
                call.parentCallId = isRoot ? '' : parentCallId;
                call.extrinsicId = parentCallId.split('-')[0];
            }
            else {
                await extrinsic_1.ExtrinsicHandler.ensureExtrinsic(parentCallId);
                call.extrinsicId = parentCallId;
            }
            list.push(call);
            await this.dispatcher.dispatch(`${call.section}-${call.method}`, {
                id: call.id,
                call: data,
                extrinsic: this.extrinsic,
                isSuccess: call.isSuccess
            });
            if (depth < 1 && section === 'utility' && (method === 'batch' || method === 'batchAll')) {
                const temp = args[0];
                await Promise.all(temp.map((item, idx) => inner(item, id, idx, false, depth + 1)));
            }
        };
        await inner(this.extrinsic.extrinsic.method, this.hash, 0, true, 0);
        return list;
    }
    async save() {
        const calls = await this.traver();
        await Promise.all(calls.map(async (item) => item.save()));
    }
}
exports.CallHandler = CallHandler;
