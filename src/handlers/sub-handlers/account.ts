import { Account } from "../../types/models/Account"

interface AccountData {
  id: string
  address: string
}

export class AccountHandler {

  static async ensureAccount(id: string, timestamp: Date) {
    const account = await Account.get(id)
    if (!account) {
      const newAccount = new Account(id);
      newAccount.timestamp = timestamp;
      return newAccount.save()
    }
  }
}