import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@environments/environment';

export const apiPrefixInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
    // TODO: documentar esto dentro de los archivos para dar a entender que mientras sea a la api principal se puede hacer la petición directamente con /api sin ningún tipo de problema
    if (req.url.startsWith('/api')) {
        const apiReq = req.clone({
            url: `${environment.apiUrl}${req.url}`,
        });

        return next(apiReq);
    }

    return next(req);
};
