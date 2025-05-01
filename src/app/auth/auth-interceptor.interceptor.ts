import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Adjust path if needed

// Define the functional interceptor
export const authInterceptor: HttpInterceptorFn = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  
  // Inject AuthService within the function
  const authService = inject(AuthService);
  
  // Get the auth token
  const authToken = authService.getTokenFromStorage();

  // Check if token exists and if the request targets the API
  if (authToken && request.url.startsWith('/api')) { // Your API check
    // Clone the request to add the new header
    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    // console.log('AuthInterceptor: Adding token for', request.url);
    // Pass on the cloned request to the next handler
    return next(authReq);
  } else {
    // console.log('AuthInterceptor: No token added for', request.url);
    // If no token or not an API request, pass the original request
    return next(request);
  }
};
