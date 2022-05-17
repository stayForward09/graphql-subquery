// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class SystemTokenTransfer implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public fromId?: string;

    public toId?: string;

    public amount?: bigint;

    public timestamp?: Date;

    public extrinsicId?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save SystemTokenTransfer entity without an ID");
        await store.set('SystemTokenTransfer', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove SystemTokenTransfer entity without an ID");
        await store.remove('SystemTokenTransfer', id.toString());
    }

    static async get(id:string): Promise<SystemTokenTransfer | undefined>{
        assert((id !== null && id !== undefined), "Cannot get SystemTokenTransfer entity without an ID");
        const record = await store.get('SystemTokenTransfer', id.toString());
        if (record){
            return SystemTokenTransfer.create(record);
        }else{
            return;
        }
    }


    static async getByFromId(fromId: string): Promise<SystemTokenTransfer[] | undefined>{
      
      const records = await store.getByField('SystemTokenTransfer', 'fromId', fromId);
      return records.map(record => SystemTokenTransfer.create(record));
      
    }

    static async getByToId(toId: string): Promise<SystemTokenTransfer[] | undefined>{
      
      const records = await store.getByField('SystemTokenTransfer', 'toId', toId);
      return records.map(record => SystemTokenTransfer.create(record));
      
    }

    static async getByAmount(amount: bigint): Promise<SystemTokenTransfer[] | undefined>{
      
      const records = await store.getByField('SystemTokenTransfer', 'amount', amount);
      return records.map(record => SystemTokenTransfer.create(record));
      
    }

    static async getByTimestamp(timestamp: Date): Promise<SystemTokenTransfer[] | undefined>{
      
      const records = await store.getByField('SystemTokenTransfer', 'timestamp', timestamp);
      return records.map(record => SystemTokenTransfer.create(record));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<SystemTokenTransfer[] | undefined>{
      
      const records = await store.getByField('SystemTokenTransfer', 'extrinsicId', extrinsicId);
      return records.map(record => SystemTokenTransfer.create(record));
      
    }


    static create(record: Partial<Omit<SystemTokenTransfer, FunctionPropertyNames<SystemTokenTransfer>>> & Entity): SystemTokenTransfer {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new SystemTokenTransfer(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
