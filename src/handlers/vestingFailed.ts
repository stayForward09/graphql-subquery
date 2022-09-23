import { SubstrateExtrinsic } from '@subql/types'
import { checkIfExtrinsicExecuteSuccess } from '../helpers'
import { VestingData } from '../types'
import { VestingScheduleFailed } from '../types/models'

export class VestingScheduleFailedHandler {
  private extrinsic: SubstrateExtrinsic 

  constructor(extrinsic: SubstrateExtrinsic) {
    this.extrinsic = extrinsic
  }

  get args () {
    return this.extrinsic.extrinsic.args
  }

  get hash () {
    return this.extrinsic.extrinsic.hash.toString()
  }

  get signer () {
    return this.extrinsic.extrinsic.signer.toString()
  }

  get block () {
    return this.extrinsic.block.block.header.number.toString()
  }

  get idx () {
    return this.extrinsic.idx
  }

  public async save () {
    if(checkIfExtrinsicExecuteSuccess(this.extrinsic)) return;

    let vesting = new VestingScheduleFailed(this.block + "-" + this.idx)
    vesting.block = Number(this.block)
    vesting.txHash = this.hash
    vesting.signer = this.signer
    vesting.to = this.args[0].toString()
    vesting.data = this.args[1] as VestingData
    
    await vesting.save()
  }
}