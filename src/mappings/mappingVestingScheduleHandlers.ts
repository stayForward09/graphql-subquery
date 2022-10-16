import { SubstrateEvent, SubstrateExtrinsic } from '@subql/types'
import { VestingScheduleHandler } from '../handlers/vestingschedule'

export async function handleVestingScheduleAdded(event: SubstrateEvent): Promise<void> {
    const handler = new VestingScheduleHandler(event)
    await handler.save()
}

export async function handleCancelAllVestingSchedules(extrinsic: SubstrateExtrinsic): Promise<void> {
    // TODO: determine who and fundsCollator
    logger.debug('handleCancelAllVestingSchedules called'  + JSON.stringify(extrinsic?.toHuman()))
    return
}