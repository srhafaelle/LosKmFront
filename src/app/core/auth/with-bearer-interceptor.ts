import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Authentication } from './authentication';
import { inject } from '@angular/core';

export const withBearerInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(Authentication);

    const authReq = addTokenHeader(req, auth.getBearerToken());

    return next(authReq);
};

function addTokenHeader(req: HttpRequest<unknown>, token: string) {
    return req.clone({
        setHeaders: {
            Authorization: token,
        },
    });
}
