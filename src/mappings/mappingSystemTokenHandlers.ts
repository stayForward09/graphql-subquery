import { SubstrateExtrinsic } from "@subql/types";
import { SystemTokenTransfer } from "../types/models/SystemTokenTransfer";
import { checkIfExtrinsicExecuteSuccess } from "../helpers";

export async function handleSystemTokenTransfer(extrinsic: SubstrateExtrinsic): Promise<void> {
    let record = new SystemTokenTransfer(extrinsic.extrinsic.hash.toString());
    record.from = extrinsic.extrinsic.signer.toString();
    record.to = extrinsic.extrinsic.args[0].toString();
    record.amount = BigInt(extrinsic.extrinsic.args[1].toString())
    record.timestamp = extrinsic.block.timestamp;
    record.success = checkIfExtrinsicExecuteSuccess(extrinsic)

    await record.save();
}