import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const tostr = inject(ToastrService);

  return next(req).pipe(
    catchError((err) => {

      tostr.error(err.error.message);

      return throwError(() => err);
    })
  );
};
