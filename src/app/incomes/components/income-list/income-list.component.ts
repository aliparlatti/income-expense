import { Component } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonRouterLink,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {RouterLink, RouterOutlet} from "@angular/router";
import {addIcons} from "ionicons";
import {addOutline} from "ionicons/icons";
import {HeaderComponent} from "../../../shared/components/header/header.component";

@Component({
  selector: 'app-income-list',
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    RouterOutlet,
    IonButton,
    IonIcon,
    IonRouterLink,
    RouterLink,
    HeaderComponent
  ],
  templateUrl: './income-list.component.html',
  styles: ``
})
export class IncomeListComponent {
constructor() {
  addIcons({addOutline})
}
}
