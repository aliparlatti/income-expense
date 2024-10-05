import {Component} from '@angular/core';
import {IonApp, IonRouterOutlet} from '@ionic/angular/standalone';
import {HeaderComponent} from "./shared/components/header/header.component";
import {Storage} from "@ionic/storage-angular";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonApp, IonRouterOutlet, HeaderComponent,
  ],
})
export class AppComponent {
  constructor(private storage: Storage) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.storage.create();
    const savedTheme = await this.storage.get('dark-theme');
    if (savedTheme !== null) {
      document.body.classList.toggle('dark', savedTheme);
    }
  }
}
