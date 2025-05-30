import { environment } from '../environments/environment.prod';

export function logEnvironment(): void {
  // Log the environment variables at runtime
  // This will help verify which environment file is being used
  // Remove or comment out after verification if needed
  console.log('Environment:', environment);
}
