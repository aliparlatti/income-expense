import { Component } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonRouterOutlet,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-incomes',
  templateUrl: 'incomes.page.html',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, RouterOutlet, IonRouterOutlet],
})
export class IncomesPage {

}
