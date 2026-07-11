import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideNgIconsConfig, withExceptionLogger } from '@ng-icons/core';
import { apiPrefixInterceptorInterceptor, withBearerInterceptor } from '@/core/auth';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideClientHydration(withEventReplay()),
        provideHttpClient(
            withInterceptors([apiPrefixInterceptorInterceptor, withBearerInterceptor]),
        ), // TODO: PONER EL INTERCEPTOR WITH_BEARER_INTERCEPTOR CUANDO SE NECESITE PROBAR LA PETICION SOBRE ENDPOINTS PROTEGIDOS
        provideNgIconsConfig({ size: '1.5em', color: 'var(--text)' }, withExceptionLogger()),
        { provide: LOCALE_ID, useValue: 'es' },
    ],
};
