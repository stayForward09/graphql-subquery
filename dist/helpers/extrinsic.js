"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfIsBatch = exports.getBatchInterruptedIndex = exports.checkIfExtrinsicExecuteSuccess = void 0;
const checkIfExtrinsicExecuteSuccess = (extrinsic) => {
    const { events } = extrinsic;
    return !events.find((item) => {
        const { event: { method, section } } = item;
        return method === 'ExtrinsicFailed' && section === 'system';
    });
};
exports.checkIfExtrinsicExecuteSuccess = checkIfExtrinsicExecuteSuccess;
const getBatchInterruptedIndex = (extrinsic) => {
    const { events } = extrinsic;
    const interruptedEvent = events.find((event) => {
        const _event = event === null || event === void 0 ? void 0 : event.event;
        if (!_event)
            return false;
        const { section, method } = _event;
        return section === 'utility' && method === 'BatchInterrupted';
    });
    if (interruptedEvent) {
        const { data } = interruptedEvent.event;
        return Number(data[0].toString());
    }
    return -1;
};
exports.getBatchInterruptedIndex = getBatchInterruptedIndex;
const checkIfIsBatch = (extrinsic) => {
    const { section, method } = extrinsic.extrinsic.method;
    if (section === 'utility' && method === 'batch')
        return true;
    if (section === 'utility' && method === 'batchAll')
        return true;
    return false;
};
exports.checkIfIsBatch = checkIfIsBatch;
