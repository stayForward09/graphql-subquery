import { SubstrateExtrinsic } from '@subql/types'
import { AllocationHandler } from '../handlers/allocation'

export async function handleAllocationBatchCall(extrinsic: SubstrateExtrinsic) {
    const handler = new AllocationHandler(extrinsic)
        
    return handler.save();
}