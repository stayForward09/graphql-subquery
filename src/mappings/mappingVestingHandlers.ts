import { SubstrateEvent, SubstrateExtrinsic } from '@subql/types'
import { VestingScheduleHandler } from '../handlers/vestingschedule'
import { updateAccountsVestingSchedule } from '../helpers/updateAccountsVestingSchedule'

export async function handleVestingScheduleAddedEvent(event: SubstrateEvent) {
    const handler = new VestingScheduleHandler(event)
    return handler.save()
}

export async function handleCancelAllVestingSchedulesCall(extrinsic: SubstrateExtrinsic) {
    const who = extrinsic.extrinsic?.method.args[0].toString()
    logger.debug('handleCancelAllVestingSchedulesCall who '  + JSON.stringify(who))
    return updateAccountsVestingSchedule([who])
}