"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dispatcher = void 0;
class Dispatcher {
    constructor() {
        this.subHandlers = {};
    }
    regist(key, handler) {
        if (Reflect.has(this.subHandlers, key) && typeof Array.isArray(this.subHandlers[key])) {
            this.subHandlers[key].push(handler);
        }
        else {
            this.subHandlers[key] = [handler];
        }
    }
    batchRegist(list) {
        list.forEach((item) => this.regist(item.key, item.handler));
    }
    async dispatch(key, data) {
        const handlers = this.subHandlers[key];
        // check handlers is exists or is an array
        if (!handlers || !Array.isArray(handlers))
            return;
        return Promise.all(handlers.map((handler) => handler(data)));
    }
}
exports.Dispatcher = Dispatcher;
