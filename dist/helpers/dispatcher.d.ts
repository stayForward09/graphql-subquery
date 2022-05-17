export declare type DispatcherHandler<T> = (data?: T) => Promise<void>;
export declare class Dispatcher<DispatchData> {
    private subHandlers;
    regist(key: string, handler: DispatcherHandler<DispatchData>): void;
    batchRegist(list: {
        key: string;
        handler: DispatcherHandler<DispatchData>;
    }[]): void;
    dispatch(key: string, data: DispatchData): Promise<void[]>;
}
