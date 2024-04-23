import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { delay, finalize } from 'rxjs/operators';
import { inject } from '@angular/core';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  
  if (req.method === 'POST' && req.url.includes('create-order')) {
    return next(req);
  }
  if (req.url.includes('check-email-exist')) {
    return next(req);
  }

  const loaderService = inject(LoaderService);

  loaderService.load();

  return next(req).pipe(
    delay(500),
    finalize(() => {
      loaderService.hidingloader();
    })
  );
};
