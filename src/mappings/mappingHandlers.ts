import { SubstrateBlock, SubstrateExtrinsic, SubstrateEvent } from '@subql/types'
import { VESTING, ADD_VESTING_SCHEDULE } from '../handlers/types'
import { BlockHandler } from '../handlers/block'
import { EventHandler, ExtrinsicHandler } from '../handlers'
import { CallHandler } from '../handlers/call'
import { VestingScheduleHandler } from '../handlers/vestingschedule'

export async function handleBlock(block: SubstrateBlock): Promise<void> {
    const handler = new BlockHandler(block)

    await handler.save()
}

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const handler = new EventHandler(event)

    await handler.save()

    if( event.event.section === "vesting" && event.event.method === "VestingScheduleAdded") {
        const handler = new VestingScheduleHandler(event)
        
        await handler.save()
    }
}

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const extrinsicHandler = new ExtrinsicHandler(extrinsic);

    await extrinsicHandler.save()
}
