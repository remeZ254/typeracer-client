import { devEnv } from './environment.dev';
import { Environment } from './environment.model';

export const environment: Environment = {
  ...devEnv,
  production: true,
  configUrl: 'config',
};
