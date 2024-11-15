import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

import { FIREBASE_OPTIONS } from "@angular/fire/compat";

import { environment } from "../environments/environment.development";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { importProvidersFrom } from '@angular/core';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

// Función para crear el cargador de traducciones
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(), {
      provide: FIREBASE_OPTIONS,
      useValue: environment.firebase
    }, provideAnimationsAsync(),
    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
  ]
};
