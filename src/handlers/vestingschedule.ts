import { SubstrateEvent } from '@subql/types'
import { VestingData } from '../types'
import { VestingScheduleAdded } from '../types/models'

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
    logger.debug('Vesting added'  + JSON.stringify(this.event.toHuman()))
    const [signer, to, vestingData] = this.data
    vesting.block = this.block
    vesting.txHash = this.hash
    vesting.signer = signer.toString()
    vesting.to = to.toString()
    vesting.data = vestingData as VestingData
    
    await vesting.save()
  }
}
