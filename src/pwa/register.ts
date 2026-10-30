import { Capacitor } from '@capacitor/core';

/**
 * Rejestracja tylko na produkcyjnym, bezpiecznym adresie web, poza Capacitor i iframe.
 * Koordynator wywołuje: void registerPwa(); w src/main.ts.
 */
/**
 * `onUpdateReady` dostaje funkcję przeładowania — gra wywołuje ją dopiero w menu
 * albo na ekranie wyniku, żeby aktualizacja nie przerwała przejazdu.
 */
export async function registerPwa(onUpdateReady: (reload: () => void) => void = (reload) => reload()): Promise<ServiceWorkerRegistration | null> {
  if (
    !import.meta.env.PROD ||
    !window.isSecureContext ||
    !('serviceWorker' in navigator) ||
    Capacitor.isNativePlatform() ||
    window.self !== window.top
  ) return null;

  try {
    // Przy pierwszej instalacji nie przeładowujemy gry. Przy aktualizacji: raz,
    // po przejęciu kontroli przez nowego workera (bez wiecznie starej wersji).
    if (navigator.serviceWorker.controller) {
      let reloaded = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (reloaded) return;
        reloaded = true;
        onUpdateReady(() => window.location.reload());
      });
    }

    const workerUrl = new URL('sw.js', document.baseURI);
    const registration = await navigator.serviceWorker.register(workerUrl.href, {
      scope: new URL('.', workerUrl).pathname,
      updateViaCache: 'none',
    });

    const checkForUpdate = (): void => {
      if (document.visibilityState === 'visible') {
        void registration.update().catch(() => { /* brak internetu */ });
      }
    };

    window.addEventListener('online', checkForUpdate);
    document.addEventListener('visibilitychange', checkForUpdate);
    checkForUpdate();
    return registration;
  } catch (error) {
    console.warn('[PWA] Rejestracja service workera nie powiodła się:', error);
    return null;
  }
}
