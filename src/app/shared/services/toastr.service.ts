import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(private toastController: ToastController) {}

  async showToast(header: string, message: string,cssClass:string| string[], duration: number = 2000, icon?: string) {
    const toast = await this.toastController.create({
      header,
      message,
      duration,
      cssClass,
      buttons: icon
        ? [
          {
            icon,
            role: 'cancel',
            handler: () => {
              console.log('Toast dismissed');
            },
          },
        ]
        : [],
    });
    await toast.present();
  }
}
