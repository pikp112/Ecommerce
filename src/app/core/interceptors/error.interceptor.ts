import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toast = inject(ToastrService);
  return next(req).pipe(
    delay(1000),
    catchError((err) => {
      if (err) {
        if (err.status === 400) {
          if (err.error.errors) {
            throw err.error;
          } else {
            toast.error(err.error.message, err.error.statusCode);
          }
        }
        if (err.status === 401) {
          toast.error(err.error.message, err.error.statusCode);
        }
        if (err.status === 404) {
          router.navigateByUrl('/not-found');
        }
        if (err.status === 500) {
          const navigationExtras: NavigationExtras = {
            state: { error: err.error }
          }
          router.navigateByUrl('/server-error', navigationExtras);
        }
      }
      return throwError(() => err.message || 'Server Not Found!');
    })
  );
};
