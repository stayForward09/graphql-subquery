import { SubstrateExtrinsic } from '@subql/types'
import { checkIfExtrinsicExecuteSuccess } from '../helpers'
import { VestingData, VestingSchedule } from '../types'
import { VESTING, ADD_VESTING_SCHEDULE } from './types'

export class VestingScheduleHandler {
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

  public async save () {
    let vesting = new VestingSchedule(this.hash)

    vesting.signer = this.signer
    vesting.to = this.args[0].toString()
    vesting.data = this.args[1] as VestingData
    vesting.success = checkIfExtrinsicExecuteSuccess(this.extrinsic)
    
    await vesting.save()
  }
}
