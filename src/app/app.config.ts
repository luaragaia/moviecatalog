import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';
import { LocalDateTimePipe } from './shared/pipes/local-date.pipe';
import { ErrorTransformPipe } from './shared/pipes/error-transform.pipe';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideHttpClient(),provideHttpClient(withInterceptors([loadingInterceptor])),
  importProvidersFrom([BrowserAnimationsModule]), LocalDateTimePipe, ErrorTransformPipe]
};
