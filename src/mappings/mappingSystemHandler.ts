import { SubstrateEvent } from "@subql/types";
import { updateAccountBalances } from "../helpers/updateAccountsBalance";
import { Account } from "../types";

export async function handleNewAccountEvent(event: SubstrateEvent) {
    const account = event.event.data[0];
    logger.debug('handleNewAccountEvent mapped: '  + JSON.stringify(account.toString()))
    return updateAccountBalances([account.toString()]);
}

export async function handleKilledAccountEvent(event: SubstrateEvent) {
    const accountId = event.event.data[0];
    logger.debug('handleKilledAccountEvent mapped: '  + JSON.stringify(accountId.toString()))
    let account = await Account.get(accountId.toString());
    if (!account) {
        return;
    }
    account.balance = BigInt(0);
    return account.save();
}