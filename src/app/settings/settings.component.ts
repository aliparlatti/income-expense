import {Component, OnInit} from '@angular/core';
import {IonContent, IonItem, IonList, IonListHeader, IonToggle} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";
import {Storage} from '@ionic/storage-angular';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    IonContent,
    IonList,
    IonItem,
    IonToggle,
    IonListHeader,
    FormsModule
  ],
  templateUrl: './settings.component.html',
  styles: ``
})
export class SettingsComponent implements OnInit {
  themeToggle = false;

  constructor(private storage: Storage) {
  }

  async ngOnInit() {
    this.themeToggle = await this.storage.get('dark-theme')
  }

  async toggleChange(ev: any) {
    this.themeToggle = ev.detail.checked;
    await this.storage.set('dark-theme', this.themeToggle);
    document.body.classList.toggle('dark', this.themeToggle);
  }
}
