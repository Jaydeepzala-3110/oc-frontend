/** Stable avatar URL that works in the browser (Instagram CDN blocks hotlinking). */
export function getAccountAvatarUrl(username: string): string {
  const handle = username.replace(/^@+/, '').trim();
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(handle)}&size=128&background=8b5cf6&color=ffffff&bold=true`;
}

/** Instagram/Facebook CDN URLs often 403 in browsers — use generated avatar instead. */
export function resolveDisplayAvatarUrl(
  username: string,
  storedUrl?: string | null,
): string {
  if (!storedUrl) {
    return getAccountAvatarUrl(username);
  }
  if (
    storedUrl.includes('fbcdn.net') ||
    storedUrl.includes('cdninstagram.com') ||
    storedUrl.includes('instagram.')
  ) {
    return getAccountAvatarUrl(username);
  }
  return storedUrl;
}
