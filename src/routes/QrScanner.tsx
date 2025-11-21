import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scanner } from '@yudiel/react-qr-scanner';
import type { IDetectedBarcode } from '@yudiel/react-qr-scanner';
import BrandHeader from '@/components/BrandHeader';

const isLikelyUrl = (value: string) => {
  try {
    // If this throws, it's probably not a URL
    // eslint-disable-next-line no-new
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const QrScannerPage = () => {
  const navigate = useNavigate();
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasScannedOnce, setHasScannedOnce] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError(
        'Camera access is not supported in this browser for this page. Please try using the latest Safari or Chrome on a phone or laptop.',
      );
      return;
    }

    const isSecure =
      window.isSecureContext || window.location.hostname === 'localhost';

    if (!isSecure) {
      setError(
        'Your browser only allows camera access on secure (HTTPS) pages. Please open the deployed HTTPS version of this site (or localhost on a computer) before scanning.',
      );
    }
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-white px-6 pb-16 pt-14 text-slate-900">
      <BrandHeader compact />

      <header className="mt-6 space-y-2 text-center">
        <h1 className="text-xl font-semibold">Scan QR Code</h1>
        <p className="text-sm text-slate-500">
          Point your camera at a QR code. The link or text will appear below.
        </p>
      </header>

      <div className="mt-8 flex flex-1 flex-col items-center gap-6">
        <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-slate-200 bg-slate-900/90">
          <Scanner
            onScan={(detectedCodes: IDetectedBarcode[]) => {
              if (!detectedCodes.length) {
                return;
              }
              const [first] = detectedCodes;
              if (!first?.rawValue) {
                return;
              }
              setError(null);
              setHasScannedOnce(true);
              setLastResult(first.rawValue);
            }}
            onError={(scanError: unknown) => {
              // Normal "no QR found" errors can be noisy; only surface permission/device issues.
              const message =
                typeof scanError === 'object' &&
                scanError !== null &&
                'message' in scanError
                  ? String((scanError as { message?: string }).message ?? '')
                  : '';
              if (
                message.includes('Permission') ||
                message.includes('denied') ||
                message.includes('NotAllowedError')
              ) {
                setError(
                  'Camera access was denied. Please allow camera permissions in your browser settings and refresh the page.',
                );
              } else if (
                message.includes('NotFoundError') ||
                message.includes('no camera') ||
                message.includes('device not found')
              ) {
                setError('No camera device was found on this device.');
              } else if (!message && !window.isSecureContext) {
                setError(
                  'Unable to start the camera. This browser may require HTTPS for camera access. Please try the deployed HTTPS URL or use localhost on a computer.',
                );
              } else if (message) {
                setError(
                  'Unable to access the camera: ' +
                    message +
                    ' Please check site permissions in your browser settings.',
                );
              } else {
                setError(
                  'Unable to access the camera. Please check permissions or try another browser/device.',
                );
              }
            }}
            constraints={{
              facingMode: 'environment',
            }}
            components={{
              finder: true,
            }}
            classNames={{
              container: 'h-[260px] w-full bg-black',
            }}
          />
        </div>

        {error && (
          <p className="w-full max-w-sm text-center text-sm font-medium text-rose-600">
            {error}
          </p>
        )}

        {!error && !hasScannedOnce && (
          <p className="w-full max-w-sm text-center text-xs text-slate-500">
            If the camera preview does not appear, make sure you have granted camera
            permissions and are opening this page over a secure (HTTPS) connection on
            your device&apos;s browser.
          </p>
        )}

        {lastResult && (
          <div className="w-full max-w-sm space-y-3 rounded-3xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Scanned result
            </p>
            <p className="break-words text-sm text-slate-800">{lastResult}</p>
            {isLikelyUrl(lastResult) && (
              <a
                href={lastResult}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-full bg-slate-900 px-4 text-xs font-semibold text-white shadow-sm transition-transform active:scale-95 focus-visible-ring"
              >
                Open link
              </a>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={() => navigate('/hub')}
          className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition-transform active:scale-95 focus-visible-ring"
        >
          Back to hub
        </button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 pedestal-gradient" />
    </div>
  );
};

export default QrScannerPage;
