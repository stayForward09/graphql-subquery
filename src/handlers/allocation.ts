import { SubstrateExtrinsic } from '@subql/types'
import { AllocationEvent } from '../types'
import { Allocations } from '../types/models'

export class AllocationHandler {
  private extrinsic: SubstrateExtrinsic 

  constructor(extrinsic: SubstrateExtrinsic) {
    this.extrinsic = extrinsic
  }

  get blockNumber () {
    return this.extrinsic.block.block.header.number.toNumber()
  }

  get idx () {
    return this.extrinsic.idx
  }

  get hash () {
    return this.extrinsic.extrinsic.hash.toString()
  }

  get data () {
    return this.extrinsic.events.map((event) => event.event.data.toHuman())
  }

  public async save () {    
    const allocation = new Allocations(`${this.blockNumber}-${this.idx}`)
    logger.info(`data: ${JSON.stringify(this.data[0])}`)

    allocation.data = this.data as AllocationEvent[]
    allocation.txHash = this.hash
    allocation.block = this.blockNumber
    allocation.success = this.extrinsic.success

    await allocation.save()
  }
}
