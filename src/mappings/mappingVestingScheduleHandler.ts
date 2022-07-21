import { SubstrateExtrinsic } from '@subql/types'
import { VestingScheduleHandler } from '../handlers/vestingschedule'

export async function handleVestingSchedule(extrinsic: SubstrateExtrinsic): Promise<void> {
    const handler = new VestingScheduleHandler(extrinsic)
        
    await handler.save()
}