import { SubstrateEvent } from '@subql/types'
import { VestingScheduleHandler } from '../handlers/vestingschedule'

export async function vestingScheduleEvent(event: SubstrateEvent): Promise<void> {
    const handler = new VestingScheduleHandler(event)
        
    await handler.save()
}