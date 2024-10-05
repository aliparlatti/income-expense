import {Routes} from '@angular/router';
import {SettingsComponent} from "./settings/settings.component";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes'),
  },
  {
    path: 'settings',
    component: SettingsComponent,
    title:'settings'
  }
];

export default routes;
