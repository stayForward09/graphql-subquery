import { Collection, Item } from "../types";
import { Codec } from '@polkadot/types/types';

type EnsureCollection = {
    idx: number;
    blockNumber: number;
    collectionId: Codec;
}

type EnsureItem = EnsureCollection & {
    itemId: Codec;
}

export const ensureCollection = async ({
    collectionId, blockNumber, idx
}: EnsureCollection) => {
    const collectionIdString = collectionId.toString();
    const collections = await Collection.getByCollectionId(collectionIdString);
    let collection = collections.find((c) => !c.isDestroyed);
    if (!collection) {
        const id = `${collectionIdString}-${blockNumber}-${idx}`;
        logger.warn('Collection not found, creating new collection', collectionIdString);
        collection = new Collection(id, collectionIdString, '', '', '', false);
    }
    return collection;
}

export const ensureItem = async ({
    collectionId, itemId, blockNumber, idx
}: EnsureItem) => {
    const itemIdString = itemId.toString();
    let items = await Item.getByCollectionItemKey(`${collectionId}-${itemIdString}`);
    let item = items.find((c) => !c.isBurned);
    if (!item) {
        const id = `${collectionId}-${itemIdString}-${blockNumber}-${idx}`;
        logger.warn('Item not found, creating new item', itemIdString);
        item = new Item(id, itemIdString, `${collectionId}-${itemIdString}`, '', false);
    }
    return item;
}