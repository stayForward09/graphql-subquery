"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tcWrapper = void 0;
function tcWrapper(fn) {
    return ((...args) => {
        try {
            return fn.apply(this, args);
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.tcWrapper = tcWrapper;
