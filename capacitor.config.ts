import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.woogitsugames.cebulakexpress',
  appName: 'Cebulak Express',
  webDir: 'dist',
  backgroundColor: '#1b2733',
  android: {
    // Gra działa offline; ruch sieciowy tylko do backendu rankingu (Firebase) i linków do portali.
    allowMixedContent: false,
  },
};

export default config;
