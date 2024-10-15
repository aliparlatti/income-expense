import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, provideRouter, RouteReuseStrategy, withPreloading } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app.routes';
import { IonicStorageModule, Storage } from "@ionic/storage-angular";
import { provideTransloco, TranslocoService } from '@ngneat/transloco';
import { TranslocoHttpLoader } from "./shared/services/transloco.http-loader";
import { firstValueFrom } from "rxjs";
import {NgApexchartsModule} from "ng-apexcharts";

async function initializeApp(storage: Storage, translocoService: TranslocoService) {
  await storage.create();

  const defaultLang = (await storage.get('defaultLang')) || 'en';
  translocoService.setActiveLang(defaultLang);

  return firstValueFrom(translocoService.load(defaultLang));
}

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    importProvidersFrom(IonicStorageModule.forRoot()),
    importProvidersFrom(NgApexchartsModule),
    {
      provide: APP_INITIALIZER,
      useFactory: (storage: Storage, translocoService: TranslocoService) => () => initializeApp(storage, translocoService),
      deps: [Storage, TranslocoService],
      multi: true,
    },

    provideTransloco({
      config: {
        availableLangs: [
          { id: 'en', label: 'English' },
          { id: 'tr', label: 'Turkish' },
        ],
        defaultLang: 'en',
        fallbackLang: 'en',
        reRenderOnLangChange: true,
        prodMode: true,
      },
      loader: TranslocoHttpLoader,
    }),
  ]
};
