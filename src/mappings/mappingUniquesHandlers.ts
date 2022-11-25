import { Collection } from './../types/models/Collection';
import { Item } from './../types/models/Item';
import { Balance } from '@polkadot/types/interfaces/runtime';
import { ensureCollection, ensureItem } from './../helpers/verifyUnique';
import { SubstrateEvent } from "@subql/types";
import { UniquesTransfer } from "../types/models";

export async function handleUniquesTransferEvent(
  event: SubstrateEvent
) {
  logger.debug("uniqueTransferEvent added: " + JSON.stringify(event.toHuman()));
  const from = event.event.data[2];
  const to = event.event.data[3];
  const collectionId = event.event.data[0];
  const itemId = event.event.data[1];
  const blockNumber = event.block.block.header.number.toNumber();

  if (!from || !to || !collectionId || !itemId) {
    logger.error(
      "Some arguments is null",
      JSON.stringify(event.toHuman())
    );
    return;
  }

  const uniqueTransfer = new UniquesTransfer(
    `${event.block.block.header.number.toNumber()}-${event.idx}`
  );

  uniqueTransfer.block = blockNumber;
  uniqueTransfer.from = from.toString();
  uniqueTransfer.to = to.toString();
  if (event.extrinsic) {
    event.extrinsic.events.forEach((eventItem) => {
      if (eventItem.event.method === "Withdraw") {
        const fee = eventItem.event.data[1];
        uniqueTransfer.fee = (fee as Balance).toBigInt();
      }
    });
    uniqueTransfer.txHash = event.extrinsic.extrinsic.hash.toString();
    uniqueTransfer.timestamp = new Date(
      event.extrinsic.block.timestamp
    ).getTime();
  }

  const collection = await ensureCollection(collectionId.toString(), blockNumber.toString());
  const item = await ensureItem(collectionId.toString(), itemId.toString(), blockNumber.toString());
  item.owner = to.toString();
  uniqueTransfer.itemId = item.id;
  uniqueTransfer.collectionId = collection.id;

  await collection.save();
  await item.save()
  return uniqueTransfer.save();
}

export const handleUniquesMetadataSetEvent = async (
  event: SubstrateEvent
) => {
  logger.debug("uniqueMetadataSetEvent added: " + JSON.stringify(event.toHuman()));
  const collectionId = event.event.data[0];
  const itemId = event.event.data[1];
  const data = event.event.data[2];
  const blockNumber = event.block.block.header.number.toNumber().toString();

  const collection = await ensureCollection(collectionId.toString(), blockNumber);
  const item = await ensureItem(collectionId.toString(), itemId.toString(), blockNumber);
  item.metadataCid = data.toHuman().toString();
  item.collectionId = collection.id;
  await collection.save()
  return item.save();
}

export const handleUniquesCollectionMetadataSetEvent = async (
  event: SubstrateEvent
) => {
  logger.debug(
    "uniqueCollectionMetadataSetEvent added: " + JSON.stringify(event.toHuman())
  );
  const collectionId = event.event.data[0];
  const data = event.event.data[1];
  const blockNumber = event.block.block.header.number.toNumber().toString();

  const collection = await ensureCollection(collectionId.toString(), blockNumber);
  collection.metadataCid = data.toHuman().toString();

  return collection.save();
}

export const handleUniquesDestroyedEvent = async (
  event: SubstrateEvent
) => {
  logger.debug(
    "handleUniquesDestroyedEvent added: " + JSON.stringify(event.toHuman())
  );
  const collectionId = event.event.data[0];
  const blockNumber = event.block.block.header.number.toNumber().toString();

  const collection = await ensureCollection(collectionId.toString(), blockNumber);
  collection.isDestroyed = true;
  return collection.save()
}

export const handleUniquesBurnedEvent = async (
  event: SubstrateEvent
) => {
  logger.debug(
    "handleUniquesBurnedEvent added: " + JSON.stringify(event.toHuman())
  );
  const itemId = event.event.data[1];

  const item = await Item.get(itemId.toString());
  item.isBurned = true;
  return item.save();
}

export const handleUniquesIssuedEvent = async (
  event: SubstrateEvent
) => {
  logger.debug(
    "handleUniquesIssuedEvent added: " + JSON.stringify(event.toHuman())
  );
  const collectionId = event.event.data[0];
  const itemId = event.event.data[1];
  const owner = event.event.data[2];
  const blockNumber = event.block.block.header.number.toNumber().toString();

  const collection = await ensureCollection(collectionId.toString(), blockNumber);
  const item = await ensureItem(collectionId.toString(), itemId.toString(), blockNumber);
  item.owner = owner.toString();
  item.collectionId = collection.id;
  item.isBurned = false;
  await collection.save()
  return item.save();
}

export const handleUniquesCreatedEvent = async (
  event: SubstrateEvent
) => {
  logger.debug(
    "handleUniquesCreatedEvent added: " + JSON.stringify(event.toHuman())
  );
  const collectionId = event.event.data[0];
  const blockNumber = event.block.block.header.number.toNumber().toString();

  const collection = await ensureCollection(collectionId.toString(), blockNumber);
  collection.isDestroyed = false;
  return collection.save()
}
