import { SubstrateEvent } from "@subql/types";
import { Balance } from '@polkadot/types/interfaces/runtime';
import { checkIfExtrinsicExecuteSuccess } from "../helpers";
import { BalanceTransfer } from "../types/models";
import { updateAccountBalances } from "../helpers/updateAccountsBalance";

export async function handleBalanceTransferEvent(event: SubstrateEvent) {
    const from = event.event.data[0];
    const to = event.event.data[1];
    if(!from || !to) {
        logger.error('Some of the from or to address is null', JSON.stringify(event.toHuman()));
        return;
    }
    
    const amount = event.event.data[2];
    let record = new BalanceTransfer(`${event.block.block.header.number.toNumber()}-${event.idx}`);
    record.blockNumber = event.block.block.header.number.toBigInt();
    record.from = from.toString();
    record.to = to.toString();
    record.amount =  (amount as Balance).toBigInt();
    if (event.extrinsic) {
        record.txHash = event.extrinsic.extrinsic.hash.toString();
        record.timestamp = new Date(event.extrinsic.block.timestamp).getTime();
        record.success = checkIfExtrinsicExecuteSuccess(event.extrinsic)
    }

    return record.save();
}

export async function handleBalanceTransferEventChainState(event: SubstrateEvent) {
    const from = event.event.data[0];
    const to = event.event.data[1];
    if(!from || !to) {
        logger.error('Some of the from or to address is null', JSON.stringify(event.toHuman()));
        return;
    }
    return Promise.all([updateAccountBalances([from.toString(), to.toString()])]);
}

export async function handleBalanceDepositEvent(event: SubstrateEvent) {
    const who = event.event.data[0];
    logger.debug('handleBalanceDepositEvent mapped: '  + who.toString())
    return updateAccountBalances([who.toString()]);
}