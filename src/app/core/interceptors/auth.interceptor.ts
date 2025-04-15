import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Inject the AuthService
  const authService = inject(AuthService);
  const authToken = authService.getToken();

  // Clone the request and add the authorization header if token exists
  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    // console.log('Interceptor: Adding auth header', authReq.headers.get('Authorization')); // Debug log
    return next(authReq);
  }

  // If no token, pass the original request along
  // console.log('Interceptor: No token found'); // Debug log
  return next(req);
};
