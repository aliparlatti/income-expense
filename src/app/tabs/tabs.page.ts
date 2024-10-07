import { Component } from '@angular/core';
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline, removeCircleOutline, barChartOutline } from 'ionicons/icons';
import {TranslocoPipe} from "@ngneat/transloco";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  standalone: true,
  imports: [IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs, TranslocoPipe],
})
export class TabsPage {
  constructor() {
    addIcons({ barChartOutline, addCircleOutline, removeCircleOutline });
  }
}
