import { records } from "../store/appstore";
import { budgetAccounts } from "../store/appstore";

/**
 *
 * @param {string} name
 * @param {string} type
 * @param {number} amount
 * @param {string} note
 */
export function getAccountObject(name, type, amount, note) {
  return { name, type, amount, note };
}

export function syncAfterNewRecord(newRecord) {
  updateRecord(newRecord);
  updateBudget(newRecord);
}

export function updateRecord(newRecord) {
  records.update((current) => [...current, newRecord]);
}

export function updateBudget(newRecord) {
  budgetAccounts.update((current) => {
    let newAccounts = current.map((account) => {
      if (account.name == newRecord.account) {
        account.amount += Number(newRecord.amount);
      }
      return account;
    });
    return newAccounts;
  });
}