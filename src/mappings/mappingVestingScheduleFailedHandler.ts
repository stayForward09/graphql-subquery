import { SubstrateExtrinsic } from '@subql/types'
import { VestingScheduleFailedHandler } from '../handlers/vestingFailed'

export async function handleVestingScheduleFailed(extrinsic: SubstrateExtrinsic): Promise<void> {
    const handler = new VestingScheduleFailedHandler(extrinsic)
        
    await handler.save()
}