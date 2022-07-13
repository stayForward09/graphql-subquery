import { SubstrateEvent } from '@subql/types'
import { Allocations } from '../types'

export class AllocationHandler {
  private event: SubstrateEvent 

  constructor(event: SubstrateEvent) {
    this.event = event
  }

  get blockNumber () {
    return this.event.block.block.header.number.toBigInt()
  }

  get idx () {
    return this.event.idx
  }

  get data () {
    return this.event.event.data
  }

  public async save () {    
    const allocation = new Allocations(`${this.blockNumber}-${this.idx}`)
    // logger.info(`data: ${this.data}`)
    allocation.account = this.data[0].toString()
    allocation.value = BigInt(this.data[1].toString())
    allocation.fee = BigInt(this.data[2].toString())
    allocation.proof = this.data[3].toString()

    await allocation.save()
  }
}
