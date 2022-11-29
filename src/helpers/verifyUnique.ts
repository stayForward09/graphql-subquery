import { Collection, Item } from "../types";

export const ensureCollection = async (collectionId: string, idSubfix: string) => {
    const collections = await Collection.getByCollectionId(collectionId);
    let collection = collections.find((c) => !c.isDestroyed);
    if (!collection) {
        logger.warn('Collection not found, creating new collection', collectionId);
        collection = new Collection(`${collectionId}-${idSubfix}`);
        collection.collectionId = collectionId;
        collection.isDestroyed = false;
    }
    return collection;
}

export const ensureItem = async (collectionId: string, itemId: string, idSubfix: string) => {
    let items = await Item.getByCollectionItemKey(`${collectionId}-${itemId}`);
    let item = items.find((c) => !c.isBurned);
    if (!item) {
        logger.warn('Item not found, creating new item', itemId);
        item = new Item(`${collectionId}-${itemId}-${idSubfix}`);
        item.collectionItemKey = `${collectionId}-${itemId}`;
        item.itemId = itemId;
        item.isBurned = false;
    }
    return item;
}