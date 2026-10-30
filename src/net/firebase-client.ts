// Osobny chunk: Vite nie ładuje Firebase w trybie demonstracyjnym bez .env.
import { Capacitor } from '@capacitor/core';
import { FirebaseAppCheck } from '@capacitor-firebase/app-check';
import * as app from 'firebase/app';
import * as appCheck from 'firebase/app-check';
import * as auth from 'firebase/auth';
import * as functions from 'firebase/functions';
import * as firestore from 'firebase/firestore/lite';

/** Inicjalizujemy przed pierwszym wywołaniem Functions / odczytem Firestore. */
export async function initAppCheck(firebaseApp: app.FirebaseApp, siteKey: string): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    // Android: Play Integrity; iOS 14+: App Attest (iOS 13: DeviceCheck).
    // JS SDK używa tokenu uzyskanego przez natywną warstwę Capacitor.
    await FirebaseAppCheck.initialize({ isTokenAutoRefreshEnabled: true });
    appCheck.initializeAppCheck(firebaseApp, {
      provider: new appCheck.CustomProvider({
        getToken: async () => {
          const result = await FirebaseAppCheck.getToken();
          if (!result.token || typeof result.expireTimeMillis !== 'number') {
            throw new Error('Natywna atestacja nie zwróciła poprawnego tokenu App Check.');
          }
          return { token: result.token, expireTimeMillis: result.expireTimeMillis };
        },
      }),
      isTokenAutoRefreshEnabled: true,
    });
    return;
  }

  // Klucz witryny jest publiczny; kluczy serwerowych ani tokenów debug nie osadzamy w repo.
  if (siteKey) {
    appCheck.initializeAppCheck(firebaseApp, {
      provider: new appCheck.ReCaptchaEnterpriseProvider(siteKey),
      isTokenAutoRefreshEnabled: true,
    });
  }
}

export const sdk = { app, auth, functions, firestore, initAppCheck };
