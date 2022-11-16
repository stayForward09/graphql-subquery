import { ensureCollection, ensureItem } from './../helpers/verifyUnique';
import { SubstrateEvent } from "@subql/types";
import { UniquesTransfer } from "../types/models";

export async function handleUniquesTransferEvent(
  event: SubstrateEvent
) {
  logger.debug("uniqueTransferEvent added" + JSON.stringify(event.toHuman()));
  const from = event.event.data[2];
  const to = event.event.data[3];
  const collectionId = event.event.data[0];
  const itemId = event.event.data[1];
  const uniqueTransfer = new UniquesTransfer(
    `${event.block.block.header.number.toNumber()}-${event.idx}`
  );

  event.extrinsic.events.forEach((event) => {
    if (event.event.method === "TransactionFeePaid") {
      logger.debug("TransactionFeePaid", JSON.stringify(event.event.data.toHuman()));

      uniqueTransfer.fee = event.event.data['actualFee'].toBigInt();
    }
  });

  uniqueTransfer.block = event.block.block.header.number.toNumber();
  uniqueTransfer.from = from.toString();
  uniqueTransfer.to = to.toString();
  uniqueTransfer.collectionId = collectionId.toString();
  uniqueTransfer.itemId = itemId.toString();
  if (event.extrinsic) {
    uniqueTransfer.txHash = event.extrinsic.extrinsic.hash.toString();
    uniqueTransfer.timestamp = new Date(
    event.extrinsic.block.timestamp
  ).getTime();
  }

  const collection = await ensureCollection(collectionId.toString());
  const item = await ensureItem(collectionId.toString(), itemId.toString());
  item.ownerId = to.toString();


  return Promise.all([uniqueTransfer.save(), item.save(), collection.save()]);
}

export const handleUniquesMetadataSetEvent = async (
  event: SubstrateEvent
) => {
  logger.debug("uniqueMetadataSetEvent added" + JSON.stringify(event.toHuman()));
  const collectionId = event.event.data[0];
  const itemId = event.event.data[1];
  const data = event.event.data[2];
  // const isFrozen = event.event.data[3];

  const collection = await ensureCollection(collectionId.toString());
  const item = await ensureItem(collectionId.toString(), itemId.toString());
  item.metadataCid = data.toHuman().toString();
  item.collectionId = collection.id;

  return Promise.all([item.save(), collection.save()]);
}

export const handleUniquesCollectionMetadataSetEvent = async (
  event: SubstrateEvent
) => {
  logger.debug(
    "uniqueCollectionMetadataSetEvent added" + JSON.stringify(event.toHuman())
  );
  const collectionId = event.event.data[0];
  const data = event.event.data[1];
  // const isFrozen = event.event.data[2];

  const collection = await ensureCollection(collectionId.toString());
  collection.metadataCid = data.toHuman().toString();

  return collection.save();
}
