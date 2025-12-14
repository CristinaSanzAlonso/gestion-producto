//Importamos la configuración global de la aplicacion y utilidades para manejar errores y detectar cambios.
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // Captura errores globales del navegador y los pasa al sistema de Angular
    provideBrowserGlobalErrorListeners(),
    // Configura la detección de cambios de Angular 
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Activa el router para las rutas
    provideRouter(routes),
    // Activa HttpClient para poder hacer llamadas a APIs
    provideHttpClient()
  ]
};
