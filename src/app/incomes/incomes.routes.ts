import {Routes} from '@angular/router';
import {IncomesPage} from './incomes.page';
import {ManageTransactionComponent} from "../shared/components/manage-income/manage-transaction.component";
import {TransactionListComponent} from "../shared/components/income-list/transaction-list.component";

const routes: Routes = [
  {
    path: '',
    component: IncomesPage,
    children: [
      {
        path: 'add',
        component: ManageTransactionComponent,
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
