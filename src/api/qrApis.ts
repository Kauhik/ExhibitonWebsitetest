/**
 * QR Scanner Screen API.
 *
 * This file centralises the domain model for QR codes that
 * the exhibition app recognises, as well as the route used
 * by the QR scanner screen.
 *
 * The current implementation only cares about QR codes whose
 * raw text content matches one of the known IDs below.
 */

/**
 * Route path for the QR scanner screen.
 *
 * Use this instead of hard-coding the string `'/scan'` in
 * components so that the navigation and route config stay
 * in sync.
 */
export const QR_SCANNER_ROUTE = '/scan' as const;

/**
 * Canonical identifiers for QR codes that are meaningful
 * to the exhibition experience.
 *
 * The QR scanner will ignore any QR code whose text does
 * not normalise to one of these values.
 */
export const KNOWN_QR_CODE_IDS = ['QR1', 'QR2', 'QR3', 'QR4'] as const;

export type QrCodeId = (typeof KNOWN_QR_CODE_IDS)[number];

/**
 * Normalises a raw QR string by trimming whitespace and
 * converting to upper-case. Returns `null` if the input
 * is missing or only contains whitespace.
 */
export const normaliseQrCodeValue = (
  raw: string | null | undefined,
): string | null => {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  return trimmed.toUpperCase();
};

/**
 * Attempts to match a raw QR scanner value to one of the
 * known QR code IDs. Returns `null` when the value does
 * not correspond to a recognised exhibition QR marker.
 */
export const matchKnownQrCode = (raw: string | null | undefined): QrCodeId | null => {
  const normalised = normaliseQrCodeValue(raw);
  if (!normalised) return null;

  return KNOWN_QR_CODE_IDS.find((id) => id === normalised) ?? null;
};

/**
 * Shape of the "API response" we return on the client
 * when a recognised QR code is scanned. This does not
 * perform a network call – it is a local, predictable
 * response object that a future UI or backend could
 * mirror as a real HTTP 200 JSON payload.
 */
export type QrScanResponse = {
  status: 200;
  code: QrCodeId;
  message: string;
};

const QR_SCAN_MESSAGES: Record<QrCodeId, string> = {
  QR1: 'QR1 scanned successfully – piece 1 unlocked.',
  QR2: 'QR2 scanned successfully – piece 2 unlocked.',
  QR3: 'QR3 scanned successfully – piece 3 unlocked.',
  QR4: 'QR4 scanned successfully – piece 4 unlocked.',
};

/**
 * Builds the canonical success response for a given
 * QR code id. Treat this as the contract a backend
 * API would also return with HTTP 200 if we later
 * decide to persist scans server-side.
 */
export const buildQrScanResponse = (code: QrCodeId): QrScanResponse => ({
  status: 200,
  code,
  message: QR_SCAN_MESSAGES[code],
});

