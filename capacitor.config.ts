import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.woogitsugames.cebulakexpress',
  appName: 'Cebulak Express',
  webDir: 'dist',
  backgroundColor: '#1b2733',
  android: {
    // Gra działa offline; ruch sieciowy tylko do backendu rankingu i portali.
    allowMixedContent: false,
  },
  plugins: {
    // Capacitor 8: pełny ekran Android/iOS także przed wywołaniem kodu gry.
    SystemBars: {
      hidden: true,
      style: 'DARK',
      insetsHandling: 'css',
      initialViewportFitValueHint: 'cover',
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#1b2733', // Na Androidzie API 36 kolor kontroluje system.
    },
    SplashScreen: {
      launchAutoHide: true,
      launchShowDuration: 1200,
      backgroundColor: '#1b2733',
      androidSplashResourceName: 'ce_splash_icon',
      showSpinner: false,
    },
  },
};

export default config;
