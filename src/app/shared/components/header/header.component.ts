import {Component, Input} from '@angular/core';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {NgIf} from "@angular/common";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    NgIf,
    IonMenu,
    IonMenuButton,
    IonList,
    IonLabel,
    IonItem,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  showBackButton = false;
  title = 'Income & Expense';
  noBackButtonRoutes: string[] = ['/tabs/incomes/list', '/tabs/dashboard', '/tabs/expenses/list'];

  constructor(protected router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        this.showBackButton = !this.noBackButtonRoutes.includes(currentRoute);
      }
    });
  }
}
