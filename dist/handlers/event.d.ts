import { SubstrateEvent } from '@subql/types';
export declare class EventHandler {
    private event;
    private dispatcher;
    constructor(event: SubstrateEvent);
    private registerDispatcherHandler;
    get index(): number;
    get blockNumber(): bigint;
    get blockHash(): string;
    get section(): string;
    get method(): string;
    get data(): string;
    get extrinsicHash(): string;
    get id(): string;
    save(): Promise<void>;
}
