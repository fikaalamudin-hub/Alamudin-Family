import { useCallback, useEffect, useRef, useState } from 'react';
import { registerSW } from 'virtual:pwa-register';

/**
 * Mendaftarkan service worker & memberi tahu bila ada versi baru.
 * - needRefresh  : true bila versi baru sudah diunduh dan siap dipakai
 * - applyUpdate  : memasang versi baru lalu memuat ulang aplikasi
 * - checkForUpdate: cek manual (tombol di menu Tampilan)
 */
export function usePWAUpdate() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [checking, setChecking] = useState(false);
  const [lastCheckResult, setLastCheckResult] = useState<'idle' | 'latest' | 'found' | 'error'>('idle');
  const updateSWRef = useRef<((reload?: boolean) => Promise<void>) | null>(null);
  const registrationRef = useRef<ServiceWorkerRegistration | undefined>(undefined);

  useEffect(() => {
    updateSWRef.current = registerSW({
      immediate: true,
      onNeedRefresh() {
        setNeedRefresh(true);
      },
      onRegisteredSW(_url, registration) {
        registrationRef.current = registration;
        if (registration) {
          // Cek versi baru setiap 30 menit selama aplikasi terbuka
          setInterval(() => {
            if (navigator.onLine) registration.update().catch(() => {});
          }, 30 * 60 * 1000);
        }
      },
    });
  }, []);

  const applyUpdate = useCallback(() => {
    if (updateSWRef.current) {
      updateSWRef.current(true);
    } else {
      window.location.reload();
    }
  }, []);

  const checkForUpdate = useCallback(async () => {
    const reg = registrationRef.current;
    if (!reg || !navigator.onLine) {
      setLastCheckResult('error');
      return;
    }
    setChecking(true);
    try {
      await reg.update();
      // beri waktu singkat agar event onNeedRefresh sempat terpicu
      await new Promise((r) => setTimeout(r, 1500));
      setLastCheckResult(reg.waiting || reg.installing ? 'found' : 'latest');
    } catch {
      setLastCheckResult('error');
    } finally {
      setChecking(false);
    }
  }, []);

  return { needRefresh, applyUpdate, checkForUpdate, checking, lastCheckResult, dismiss: () => setNeedRefresh(false) };
}
