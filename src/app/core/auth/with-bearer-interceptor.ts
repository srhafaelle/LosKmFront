import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Authentication } from './authentication';
import { inject } from '@angular/core';
import { BYPASS_AUTH } from './auth.context';

export const withBearerInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(Authentication);

    if (req.context.get(BYPASS_AUTH) === true) {
        return next(req);
    }

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
