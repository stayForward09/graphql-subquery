"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockTimestamp = void 0;
const getBlockTimestamp = (block) => {
    var _a;
    const extrinsicForSetTimestamp = block.extrinsics.find((item) => {
        return item.method.method === 'set'
            && item.method.section === 'timestamp';
    });
    if (extrinsicForSetTimestamp) {
        return new Date(Number((_a = extrinsicForSetTimestamp === null || extrinsicForSetTimestamp === void 0 ? void 0 : extrinsicForSetTimestamp.args) === null || _a === void 0 ? void 0 : _a[0].toString()));
    }
    return new Date();
};
exports.getBlockTimestamp = getBlockTimestamp;
