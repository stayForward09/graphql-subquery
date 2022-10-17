import { SubstrateExtrinsic } from '@subql/types'
import { AllocationHandler } from '../handlers/allocation'

export async function handleAllocationBatchCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const handler = new AllocationHandler(extrinsic)
        
    await handler.save()
}