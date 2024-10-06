import {Component, OnInit} from '@angular/core';
import {IonApp, IonRouterOutlet} from '@ionic/angular/standalone';
import {HeaderComponent} from "./shared/components/header/header.component";
import {Storage} from "@ionic/storage-angular";
import {GoogleAuth} from "@codetrix-studio/capacitor-google-auth";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonApp, IonRouterOutlet, HeaderComponent,
  ],
})
export class AppComponent implements  OnInit{
  constructor(private storage: Storage) {
    this.initializeApp();
  }

  async ngOnInit() {
    await GoogleAuth.initialize(
      {
        clientId: "227419213250-97fun5umc2sp4oeobg0n0pa24rfrc7uk.apps.googleusercontent.com",
        scopes: ['profile', 'email'],
      }
    );
  }

  async initializeApp() {
    await this.storage.create();
    const savedTheme = await this.storage.get('dark-theme');
    if (savedTheme !== null) {
      document.body.classList.toggle('dark', savedTheme);
    }
  }
}
