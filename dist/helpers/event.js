"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEvent = void 0;
const findEvent = (events, section, method) => {
    return events.find(({ event }) => event.section === section && event.method === method);
};
exports.findEvent = findEvent;
