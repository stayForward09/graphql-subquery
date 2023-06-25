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
  const id = `${blockNumber}-${event.idx}`

  if (!from || !to || !collectionId || !itemId) {
    logger.error(
      "Some arguments is null",
      JSON.stringify(event.toHuman())
    );
    return;
  }

  const uniqueTransfer = new UniquesTransfer(id, '', '');

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

  const collection = await ensureCollection({
    collectionId,
    blockNumber,
    idx: event.idx,
  });
  const item = await ensureItem({
    collectionId,
    itemId,
    blockNumber,
    idx: event.idx,
  });
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
  const blockNumber = event.block.block.header.number.toNumber();

  const item = await ensureItem({
    collectionId,
    itemId,
    blockNumber,
    idx: event.idx,
  });
  item.metadataCid = data.toHuman().toString();
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
  const blockNumber = event.block.block.header.number.toNumber();

  const collection = await ensureCollection({
    collectionId,
    blockNumber,
    idx: event.idx
  });
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
  const blockNumber = event.block.block.header.number.toNumber();

  const collection = await ensureCollection({
    collectionId,
    blockNumber,
    idx: event.idx
  });
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
  const collectionId = event.event.data[0];
  const blockNumber = event.block.block.header.number.toNumber();

  const item = await ensureItem({
    collectionId,
    itemId,
    blockNumber,
    idx: event.idx
  });
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
  const blockNumber = event.block.block.header.number.toNumber();

  const collection = await ensureCollection({
    collectionId,
    blockNumber,
    idx: event.idx
  });
  const item = await ensureItem({
    collectionId,
    itemId,
    blockNumber,
    idx: event.idx
  });

  item.owner = owner.toString();
  item.collectionId = collection.id;
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
  const creator = event.event.data[1];
  const owner = event.event.data[2];
  const blockNumber = event.block.block.header.number.toNumber();

  const collection = await ensureCollection({
    collectionId,
    blockNumber,
    idx: event.idx
  });

  collection.issuer = creator.toString();
  collection.owner = owner.toString();
  collection.admin = creator.toString();

  return collection.save()
}

export const handleUniquesOwnershipAcceptanceChangedEvent = async (
  event: SubstrateEvent
) => {
  logger.debug(
    "handleUniquesOwnershipAcceptanceChangedEvent added: " + JSON.stringify(event.toHuman())
  );
  const who = event.event.data[0];
  const collectionId = event.event.data[1];
  const blockNumber = event.block.block.header.number.toNumber();

  if(!collectionId?.toString()) {
    return
  }

  const collection = await ensureCollection({
    collectionId,
    blockNumber,
    idx: event.idx
  });

  collection.owner = who.toString();
  
  return collection.save()
}

export const handleUniquesTeamChangedEvent = async (
  event: SubstrateEvent
) => {
  logger.debug(
    "handleUniquesTeamChangedEvent added: " + JSON.stringify(event.toHuman())
  );
  const collectionId = event.event.data[0];
  const issuer = event.event.data[1];
  const admin = event.event.data[2];
  const freezer = event.event.data[3];
  const blockNumber = event.block.block.header.number.toNumber();

  const collection = await ensureCollection({
    collectionId,
    blockNumber,
    idx: event.idx
  });

  collection.issuer = issuer.toString();
  collection.admin = admin.toString();
  collection.freezer = freezer.toString();
  
  return collection.save()
}
