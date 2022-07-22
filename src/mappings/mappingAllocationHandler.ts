import { SubstrateEvent } from '@subql/types'
import { AllocationHandler } from '../handlers/allocation'

export async function handleAllocation(event: SubstrateEvent): Promise<void> {
    const handler = new AllocationHandler(event)
        
    await handler.save()
}