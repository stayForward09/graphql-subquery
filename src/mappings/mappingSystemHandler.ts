import { SubstrateEvent } from "@subql/types";
import { updateAccountBalances } from "../helpers/updateAccountsBalance";

export async function handleNewAccountEvent(event: SubstrateEvent): Promise<void> {
    const account = event.event.data[0];
    logger.debug('handleNewAccountEvent mapped: '  + JSON.stringify(account.toString()))
    await updateAccountBalances([account.toString()]);
    return;
}

export async function handleKilledAccountEvent(event: SubstrateEvent): Promise<void> {
    const account = event.event.data[0];
    logger.debug('handleKilledAccountEvent mapped: '  + JSON.stringify(account.toString()))
    await updateAccountBalances([account.toString()]);
    return;
}