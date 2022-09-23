import { SubstrateEvent } from '@subql/types'
import { Allocations } from '../types/models'

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

    const [who, value, fee, proof] = this.data

    allocation.account = who.toString()
    allocation.value = value.toString()
    allocation.fee = fee.toString()
    allocation.proof = proof.toString()

    await allocation.save()
  }
}
