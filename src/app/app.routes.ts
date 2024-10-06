import {Routes} from '@angular/router';
import {SettingsComponent} from "./settings/settings.component";
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {AuthGuard} from "./auth/guard/auth.guard";

export const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes'),
    canActivate:[AuthGuard],
  },
  {
    path: 'login',
    component: SignInComponent,
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
  {
    path: 'settings',
    component: SettingsComponent,
    title: 'settings',
    canActivate:[AuthGuard],
  }
];

export default routes;
