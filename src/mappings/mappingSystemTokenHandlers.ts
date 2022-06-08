import { SubstrateEvent } from "@subql/types";
import { AccountId, Balance, BlockNumber } from '@polkadot/types/interfaces/runtime';
import type { Compact } from '@polkadot/types';
import { SystemTokenTransfer } from "../types/models/SystemTokenTransfer";
import { checkIfExtrinsicExecuteSuccess } from "../helpers";

export async function systemTokenTransferEvent(event: SubstrateEvent): Promise<void> {
    const { event: { data: [from_origin, to_origin, amount_origin] } } = event;
    const from = (from_origin as AccountId).toString();
    const to = (to_origin as AccountId).toString();
    const amount = (amount_origin as Balance).toBigInt();

    const blockNumber = (event.extrinsic.block.block.header.number as Compact<BlockNumber>).toNumber();

    let record = new SystemTokenTransfer(blockNumber.toString() + '-' + event.idx.toString());
    record.from = from;
    record.to = to;
    record.amount = amount;
    record.timestamp = event.block.timestamp;
    record.success = checkIfExtrinsicExecuteSuccess(event.extrinsic)

    await record.save();
}