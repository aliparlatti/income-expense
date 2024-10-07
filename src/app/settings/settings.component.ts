import {Component, OnInit} from '@angular/core';
import {IonAvatar, IonContent, IonItem, IonLabel, IonList, IonListHeader, IonToggle} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";
import {Storage} from '@ionic/storage-angular';
import {TranslocoPipe, TranslocoService} from '@ngneat/transloco';
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    IonContent,
    IonList,
    IonItem,
    IonToggle,
    IonListHeader,
    FormsModule,
    TranslocoPipe,
    IonLabel,
    IonAvatar,
    NgForOf,
    NgClass
  ],
  templateUrl: './settings.component.html',
  styles: ``
})
export class SettingsComponent implements OnInit {
  themeToggle = false;
  availableLangs: any[];
  activeLang: string;
  constructor(private storage: Storage,private translocoService:TranslocoService) {
  }

  async ngOnInit() {
    this.themeToggle = await this.storage.get('dark-theme')
    this.availableLangs = this.translocoService.getAvailableLangs();
    this.translocoService.langChanges$.subscribe((activeLang) => {
      this.activeLang = activeLang;
    });

  }
  setActiveLang(lang: any): void {
    this.storage.set("defaultLang",lang);
    this.translocoService.setActiveLang(lang);
  }
  async toggleChange(ev: any) {
    this.themeToggle = ev.detail.checked;
    await this.storage.set('dark-theme', this.themeToggle);
    document.body.classList.toggle('dark', this.themeToggle);
  }
}
