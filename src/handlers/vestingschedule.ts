import { SubstrateEvent } from '@subql/types'
import { VestingSchedule } from '../types'
import { VESTING, ADD_VESTING_SCHEDULE } from './types'

export class VestingScheduleHandler {
  private event: SubstrateEvent 

  constructor(event: SubstrateEvent) {
    this.event = event
  }

  get index () {
    return this.event.idx
  }

  get blockNumber () {
    return this.event.block.block.header.number.toBigInt()
  }

  get signer () {
      return this.data[0].toString()
  }

  get toAddr ()  {
      return this.data[1].toString()
  }

  get vestingData () {
      return  this.data[2].toString()
  }

  get section () {
    return this.event.event.section
  }

  get method () {
    return this.event.event.method
  }

  get data () {
    return this.event.event.data.toArray()
  }

  get id () {
    return `${this.blockNumber}-${this.index}`
  }

  public async save () {
    let event = new VestingSchedule(this.id)

    event.signer = this.signer
    event.to = this.toAddr
    event.data = this.vestingData
    
    await event.save()
  }
}
