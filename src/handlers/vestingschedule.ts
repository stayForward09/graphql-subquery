import { SubstrateEvent } from '@subql/types'
import { checkIfExtrinsicExecuteSuccess } from '../helpers'
import { VestingData, VestingScheduleAdded } from '../types'

export class VestingScheduleHandler {
  private event: SubstrateEvent 

  constructor(event: SubstrateEvent) {
    this.event = event
  }

  get data () {
    return this.event.event.data
  }

  get hash () {
    return this.event.extrinsic.extrinsic.hash.toString()
  }

  get block () {
    return this.event.block.block.header.number.toNumber()
  }

  get idx () {
    return this.event.idx
  }

  public async save () {
    let vesting = new VestingScheduleAdded(this.block + "-" + this.idx)
    const [from, to, vesting_schedule] = this.data
    vesting.block = this.block
    vesting.txHash = this.hash
    vesting.signer = from.toString()
    vesting.to = to.toString()
    vesting.data = vesting_schedule as VestingData
    vesting.success = checkIfExtrinsicExecuteSuccess(this.event.extrinsic)
    
    await vesting.save()
  }
}
