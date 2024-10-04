import { Component } from '@angular/core';
import {IonContent, IonHeader, IonRouterOutlet, IonTitle, IonToolbar} from '@ionic/angular/standalone';

@Component({
  selector: 'app-expenses',
  templateUrl: 'expenses.page.html',
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonRouterOutlet],
})
export class ExpensesPage {}
