import { SubstrateEvent } from "@subql/types";
import { updateAccountBalances } from "../helpers/updateAccountsBalance";
import { isKicked } from "../helpers/utils";
import { Account } from "../types";

export async function handleNewAccountEvent(event: SubstrateEvent) {
    const account = event.event.data[0];
    if(isKicked(account)) {
        return;
    }
    logger.debug('handleNewAccountEvent mapped: '  + JSON.stringify(account.toString()))
    return updateAccountBalances([account]);
}

export async function handleKilledAccountEvent(event: SubstrateEvent) {
    const accountId = event.event.data[0];
    if(isKicked(accountId)) {
        return;
    }
    logger.debug('handleKilledAccountEvent mapped: '  + JSON.stringify(accountId.toString()))
    let account = await Account.get(accountId.toString());
    if (!account) {
        return;
    }
    account.balance = BigInt(0);
    return account.save();
}