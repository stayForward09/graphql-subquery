import { SubstrateExtrinsic } from '@subql/types';
export declare const checkIfExtrinsicExecuteSuccess: (extrinsic: SubstrateExtrinsic) => boolean;
export declare const getBatchInterruptedIndex: (extrinsic: SubstrateExtrinsic) => number;
export declare const checkIfIsBatch: (extrinsic: SubstrateExtrinsic) => boolean;
