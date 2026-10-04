/**
 * Normalizes input to an Instagram handle (strips @ and extracts handle from pasted URLs).
 */
export function parseInstagramUsername(input: string): string | null {
  const trimmed = input?.trim();
  if (!trimmed) return null;

  let value = trimmed.replace(/^@+/, '');

  const urlMatch = value.match(
    /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([A-Za-z0-9._]+)/i,
  );
  if (urlMatch?.[1]) {
    value = urlMatch[1];
  } else {
    const shortUrlMatch = value.match(
      /(?:https?:\/\/)?(?:www\.)?instagr\.am\/([A-Za-z0-9._]+)/i,
    );
    if (shortUrlMatch?.[1]) {
      value = shortUrlMatch[1];
    }
  }

  value = value.split('?')[0].split('#')[0].replace(/\/+$/, '');

  if (!/^[a-zA-Z0-9._]{1,30}$/.test(value)) {
    return null;
  }

  return value;
}
