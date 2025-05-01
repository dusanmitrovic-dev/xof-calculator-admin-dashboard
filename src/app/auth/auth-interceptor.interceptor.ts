import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Adjust path as necessary

/**
 * Functional HTTP Interceptor to add the JWT Authorization header to outgoing requests.
 */
export const authInterceptor: HttpInterceptorFn = (
    // The request object represents the outgoing request.
    request: HttpRequest<unknown>,
    // The next object represents the next interceptor in the chain, or the backend if no more interceptors.
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {

  // Use inject() to get an instance of AuthService within the functional interceptor
  const authService = inject(AuthService);

  // Retrieve the JWT token from AuthService
  const authToken = authService.getTokenFromStorage();

  // Check if the token exists and if the request is targeting our API
  // (adjust the URL check based on your actual API endpoint structure or proxy config)
  // Example: Only add token for relative URLs starting with /api/
  const isApiRequest = request.url.startsWith('/api/');

  if (authToken && isApiRequest) {
    // console.log(`AuthInterceptor: Adding Authorization header for API request to ${request.url}`);

    // Clone the request because requests are immutable.
    // Add the Authorization header with the Bearer token.
    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });

    // Pass the cloned request with the header to the next handler in the chain.
    return next(clonedRequest);
  } else {
    // If there's no token or it's not an API request, pass the original request along
    // without modification.
    // console.log(`AuthInterceptor: No token added for request to ${request.url}`);
    return next(request);
  }
};
