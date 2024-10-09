import {Injectable} from '@angular/core';
import {SupabaseService} from "./supabase.service";
import {from, Observable} from "rxjs";
import {Transaction} from "../models/transaction.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class TransactionService extends SupabaseService {
  constructor() {
    super();
  }

  addTransaction(transactionData: any): Observable<any> {
    return from(this.insertData('transactions', transactionData));
  }

  getTransactions(type: boolean,page:number): Observable<Transaction[]> {
    const pageSize = 25;
    return from(this.supabase
      .from('transactions')
      .select(
        'id, user_id, amount, category:categories(id, name,icon), transaction_date, is_income, notes'
      )
      .eq('is_income', type)
      .range((page - 1) * pageSize, page * pageSize - 1)
      .order('transaction_date', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }
        return data;
      })
    ).pipe(
      map(transactions => transactions.map(transaction => new Transaction(transaction)))
    );
  }
}
