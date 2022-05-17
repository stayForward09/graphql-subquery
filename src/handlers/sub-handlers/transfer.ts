import { SubstrateExtrinsic } from '@subql/types'
import { Call } from '../../types/models/Call'
import { Transfer } from "../../types/models/Transfer"
import { CallHandler } from '../call'
import { ExtrinsicHandler } from '../extrinsic'
import { DispatchedCallData } from '../types'
import { AccountHandler } from './account'

export class TransferHandler {
  static async createFromCurrenciesModule({ id, call, extrinsic, isSuccess }: DispatchedCallData) {
    const args = call.args
    const extrinsicHandler = new ExtrinsicHandler(extrinsic)

    const to = args[0].toString()
    const amount = (args[2] as any).toBigInt() || BigInt(0)
    const from = extrinsicHandler.signer
    const extrinsicHash = extrinsicHandler.id

    await AccountHandler.ensureAccount(to, extrinsic.block.timestamp)
    await AccountHandler.ensureAccount(from, extrinsic.block.timestamp)
    await CallHandler.ensureCall(id)

    const transfer = new Transfer(id)

    transfer.toId = to
    transfer.fromId = from
    transfer.amount = amount
    transfer.extrinsicId = extrinsicHash
    transfer.callId = id
    transfer.timestamp = extrinsicHandler.timestamp
    transfer.isSuccess = isSuccess

    await transfer.save()
  }
}