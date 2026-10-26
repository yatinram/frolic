/**
 * Universal Image URL resolver for Frolic Kids Edu Labs
 * Resolves uploaded backend images, static assets, and external URLs safely.
 */
export function getImageUrl(path, fallback = '/assets/kits.jpeg') {
  if (!path || typeof path !== 'string' || !path.trim()) {
    return fallback;
  }

  const clean = path.trim();

  // 1. If absolute URL or base64 data URI or blob
  if (
    clean.startsWith('http://') ||
    clean.startsWith('https://') ||
    clean.startsWith('data:') ||
    clean.startsWith('blob:')
  ) {
    return clean;
  }

  // 2. If it is already pointing to /assets/
  if (clean.startsWith('/assets/') || clean.startsWith('assets/')) {
    return clean.startsWith('/') ? clean : `/${clean}`;
  }

  // 3. If it starts with /uploads/
  if (clean.startsWith('/uploads/')) {
    return clean;
  }

  // 4. If it starts with uploads/
  if (clean.startsWith('uploads/')) {
    return `/${clean}`;
  }

  // 5. Bare filename (e.g. "image-123456.jpeg") -> prepend /uploads/
  return `/uploads/${clean}`;
}
