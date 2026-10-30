import { Capacitor } from '@capacitor/core';

/**
 * Koordynator wywołuje void prefetchPwaAssetsAfterRun() po pierwszym przejeździe,
 * np. z showOver w src/main.ts. Nie blokuje to ekranu wyniku.
 * Kolejne wywołania naprawiają nieudane pobrania bez usuwania gotowego cache.
 */
export async function prefetchPwaAssetsAfterRun(): Promise<void> {
  if (
    !import.meta.env.PROD ||
    !window.isSecureContext ||
    !('serviceWorker' in navigator) ||
    Capacitor.isNativePlatform() ||
    window.self !== window.top
  ) return;

  // Przy pierwszym otwarciu worker może być aktywny, ale jeszcze nie kontrolować strony.
  const registration = await navigator.serviceWorker.ready;
  (navigator.serviceWorker.controller ?? registration.active)?.postMessage({
    type: 'CE_OFFLINE_PREFETCH_AFTER_RUN',
  });
}
