import { SubstrateExtrinsic } from "@subql/types";
import { SystemTokenTransferHandler } from "../handlers/systemTokenTransfer";

export async function handleSystemTokenTransfer(extrinsic: SubstrateExtrinsic): Promise<void> {
    const handler = new SystemTokenTransferHandler(extrinsic)
        
    await handler.save()
}