import { Routes } from '@angular/router';
import { ExpensesPage } from './expenses.page';
import {TransactionListComponent} from "../shared/components/income-list/transaction-list.component";
import {ManageTransactionComponent} from "../shared/components/manage-income/manage-transaction.component";

const routes: Routes = [
  {
    path: '',
    component: ExpensesPage,
    children: [
      {
        path: 'add',
        component: ManageTransactionComponent,
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
