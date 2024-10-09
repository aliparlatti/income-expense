import { Routes } from '@angular/router';
import { ExpensesPage } from './expenses.page';
import {TransactionListComponent} from "../shared/components/income-list/transaction-list.component";
import {AddTransactionComponent} from "../shared/components/add-income/add-transaction.component";

const routes: Routes = [
  {
    path: '',
    component: ExpensesPage,
    children: [
      {
        path: 'add',
        component: AddTransactionComponent,
        title:'expenses',
        data: { isIncome: false }
      },
      {
        path: 'list',
        component: TransactionListComponent,
        title:'expenses',
        data: { isIncome: false }
      },
      {
        path: '',
        redirectTo: '/tabs/expenses/list',
        pathMatch: 'full'
      },
    ]
  },
];

export default routes;
