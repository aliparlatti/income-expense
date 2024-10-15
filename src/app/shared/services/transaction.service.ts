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

  updateTransaction(data: Transaction,transactionId:number) {
    return from(this.updateData('transactions', data, {id: transactionId}))
  }


  deleteTransaction(condition: { [key: string]: any }): Observable<any> {
    return from(this.delete('transactions', condition));
  }

  getTransactions(type: boolean, page: number): Observable<Transaction[]> {
    const pageSize = 25;
    return from(this.supabase
      .from('transactions')
      .select(
        'id, user_id, amount, category:categories(id, name,icon), transaction_date, is_income, notes'
      )
      .eq('is_income', type)
      .range((page - 1) * pageSize, page * pageSize - 1)
      .order('transaction_date', {ascending: false})
      .then(({data, error}) => {
        if (error) {
          throw new Error(error.message);
        }
        return data;
      })
    ).pipe(
      map(transactions => transactions.map(transaction => new Transaction(transaction)))
    );
  }
  getCategoryTotal(startDate: string, endDate: string,isIncome:boolean): Observable<any> {
    return from(this.supabase
      .rpc('get_category_total', {
        start_date: startDate,
        end_date: endDate,
        is_income:isIncome
      })
      .then(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }
        return data;
      })
    );
  }
}
