import { Collection, Item } from "../types";

export const ensureCollection = async (collectionId: string) => {
    let collection = await Collection.get(collectionId);
    if (!collection) {
        // logger.debug('Collection not found, creating new collection', collectionId);
        collection = new Collection(`${collectionId}-${new Date().getTime()}`);
        collection.collectionId = collectionId;
        collection.isDestroyed = false;
    }
    return collection;
}

export const ensureItem = async (collectionId: string, itemId: string) => {
    let item = await Item.get(`${collectionId}-${itemId}`);
    if (!item) {
        // logger.debug('Item not found, creating new item', itemId);
        item = new Item(`${collectionId}-${itemId}`);
        item.collectionId = collectionId;
        item.itemId = itemId;
        item.isBurned = false;
    }
    return item;
}