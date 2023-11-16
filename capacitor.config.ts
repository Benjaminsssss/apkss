import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cl.vilitu.app',
  appName: 'myFirstApp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
