"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountHandler = void 0;
const Account_1 = require("../../types/models/Account");
class AccountHandler {
    static async ensureAccount(id, timestamp) {
        const account = await Account_1.Account.get(id);
        if (!account) {
            const newAccount = new Account_1.Account(id);
            newAccount.timestamp = timestamp;
            return newAccount.save();
        }
    }
}
exports.AccountHandler = AccountHandler;
