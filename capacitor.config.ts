import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'me.yipnyap.app',
  appName: 'yipnyap',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
