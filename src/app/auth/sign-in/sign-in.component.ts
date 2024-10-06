import {Component} from '@angular/core';
import {IonButton, IonContent, IonIcon, IonLabel} from "@ionic/angular/standalone";
import {NgIf} from "@angular/common";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {addIcons} from "ionicons";
import {logoGoogle} from "ionicons/icons";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    IonButton,
    IonLabel,
    NgIf,
    IonContent,
    IonIcon
  ],
  templateUrl: './sign-in.component.html',
  styles: ``
})
export class SignInComponent {
  constructor(protected authService: AuthService, private router: Router
  ) {
    addIcons({ logoGoogle })
  }
  signIn() {
    this.authService.signIn()
  }
}
