import {Routes} from '@angular/router';
import {IncomesPage} from './incomes.page';
import {AddTransactionComponent} from "../shared/components/add-income/add-transaction.component";
import {TransactionListComponent} from "../shared/components/income-list/transaction-list.component";

const routes: Routes = [
  {
    path: '',
    component: IncomesPage,
    children: [
      {
        path: 'add',
        component: AddTransactionComponent,
        title:'incomes',
        data: { isIncome: true }
      },
      {
        path: 'list',
        component: TransactionListComponent,
        title:'incomes',
        data: { isIncome: true }
      },
      {
        path: '',
        redirectTo: '/tabs/incomes/list',
        pathMatch: 'full'
      },
    ]
  },
];

export default routes;
