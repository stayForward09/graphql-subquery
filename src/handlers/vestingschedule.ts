import { SubstrateEvent } from '@subql/types'
import { VestingData } from '../types'
import { VestingScheduleAdded } from '../types/models'
import { ensureAccount } from '../helpers/verifyAccount';
import { updateAccountsVestingSchedule } from '../helpers/updateAccountsVestingSchedule';

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
    logger.debug('handleVestingScheduleAddedEvent event data: '  + JSON.stringify(this.data.toHuman()))
    let vesting = new VestingScheduleAdded(this.block + "-" + this.idx)
    const [signer, to, vestingData] = this.data
    vesting.block = this.block
    vesting.txHash = this.hash
    vesting.signerId = signer.toString()
    vesting.toId = to.toString()
    vesting.data = vestingData as VestingData
    
    return Promise.all([vesting.save(), updateAccountsVestingSchedule([to.toString()])]);
  }
}
