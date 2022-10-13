import { SubstrateEvent } from "@subql/types";
import { Balance } from '@polkadot/types/interfaces/runtime';
import { checkIfExtrinsicExecuteSuccess } from "../helpers";

export async function uniquesTransferEvent(event: SubstrateEvent): Promise<void> {
    logger.debug('uniqueTransferEvent added'  + JSON.stringify(event.toHuman()))
    return;
}