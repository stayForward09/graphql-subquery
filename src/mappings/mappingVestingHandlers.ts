import { SubstrateEvent, SubstrateExtrinsic } from '@subql/types'
import { VestingScheduleHandler } from '../handlers/vestingschedule'
import { updateAccountsVestingSchedule } from '../helpers/updateAccountsVestingSchedule'

export async function handleVestingScheduleAddedEvent(event: SubstrateEvent): Promise<void> {
    const handler = new VestingScheduleHandler(event)
    await handler.save()
}

export async function handleCancelAllVestingSchedulesCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const who = extrinsic.extrinsic.method.args[0].toString()
    await updateAccountsVestingSchedule([who])
    logger.debug('handleCancelAllVestingSchedulesCall who '  + JSON.stringify(who))
    return
}