import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-expenses',
  templateUrl: 'expenses.page.html',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar],
})
export class ExpensesPage {}
