import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
// Import necessary modules for HttpClient and Interceptor
import { provideHttpClient, withInterceptors } from '@angular/common/http'; 
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor'; // Import the interceptor function

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    // Provide HttpClient with the interceptor enabled
    provideHttpClient(
      withInterceptors([authInterceptor])
    ), 
    // Provide animations for Angular Material
    provideAnimationsAsync()
  ]
};
