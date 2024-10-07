import {Routes} from '@angular/router';
import {IncomesPage} from './incomes.page';
import {AddIncomeComponent} from "./components/add-income/add-income.component";
import {IncomeListComponent} from "./components/income-list/income-list.component";

const routes: Routes = [
  {
    path: '',
    component: IncomesPage,
    children: [
      {
        path: 'add',
        component: AddIncomeComponent,
        title:'incomes',
      },
      {
        path: 'list',
        component: IncomeListComponent,
        title:'incomes',
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
