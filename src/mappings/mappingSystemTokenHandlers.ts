import { SubstrateEvent } from "@subql/types";
import { Balance } from '@polkadot/types/interfaces/runtime';
import { SystemTokenTransfer } from "../types/models/SystemTokenTransfer";
import { checkIfExtrinsicExecuteSuccess } from "../helpers";

export async function systemTokenTransferEvent(event: SubstrateEvent): Promise<void> {
    const from = event.event.data[0];
    const to = event.event.data[1];
    const amount = event.event.data[2];
    const txHash = event.extrinsic.extrinsic.hash.toString();

    let record = new SystemTokenTransfer(`${event.block.block.header.number.toNumber()}-${event.idx}`);
    record.blockNumber = event.block.block.header.number.toBigInt();
    record.from = from.toString();
    record.to = to.toString();;
    record.txHash = txHash;
    record.amount =  (amount as Balance).toBigInt();
    record.timestamp = new Date(event.extrinsic.block.timestamp).getTime();
    record.success = checkIfExtrinsicExecuteSuccess(event.extrinsic)

    await record.save();
}