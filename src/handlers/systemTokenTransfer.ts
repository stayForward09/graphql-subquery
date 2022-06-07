import { SubstrateExtrinsic } from '@subql/types'
import { checkIfExtrinsicExecuteSuccess } from '../helpers'
import { SystemTokenTransfer } from '../types'

export class SystemTokenTransferHandler {
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

  get timestamp () {
      return this.extrinsic.block.timestamp
  }

  public async save () {
    let transfer = new SystemTokenTransfer(this.hash)

    transfer.from = this.signer
    transfer.to = this.args[0].toString()
    transfer.amount = BigInt(this.args[1].toString())
    transfer.timestamp = this.timestamp
    transfer.success = checkIfExtrinsicExecuteSuccess(this.extrinsic)
    
    await transfer.save()
  }
}
