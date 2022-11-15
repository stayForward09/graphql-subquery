import { SubstrateEvent } from "@subql/types";
import { UniquesTransfer } from "../types/models";

export async function handleUniquesTransferEvent(
  event: SubstrateEvent
): Promise<void> {
  logger.debug("uniqueTransferEvent added" + JSON.stringify(event.toHuman()));
  const from = event.event.data[0];
  const to = event.event.data[1];
  const collectionId = event.event.data[2];
  const itemId = event.event.data[3];
  const uniqueTransfer = new UniquesTransfer(
    `${event.block.block.header.number.toNumber()}-${event.idx}`
  );
  const txHash = event.extrinsic?.extrinsic.hash.toString();
  uniqueTransfer.block = event.block.block.header.number.toNumber();
  uniqueTransfer.txHash = txHash;
  uniqueTransfer.from = from.toString();
  uniqueTransfer.to = to.toString();
  uniqueTransfer.collectionId = collectionId.toString();
  uniqueTransfer.itemId = itemId.toString();
  uniqueTransfer.timestamp = event.extrinsic ? new Date(
    event.extrinsic.block.timestamp
  ).getTime() : undefined;

  return uniqueTransfer.save();
}
