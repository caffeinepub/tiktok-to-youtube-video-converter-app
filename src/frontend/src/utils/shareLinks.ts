/**
 * Builds standard share-intent URLs for social platforms.
 * All URLs are designed to open in a new tab with the app URL prefilled.
 */

export function buildFacebookShareUrl(url: string, text?: string): string {
  const encodedUrl = encodeURIComponent(url);
  return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
}

export function buildXShareUrl(url: string, text?: string): string {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = text ? encodeURIComponent(text) : '';
  return `https://twitter.com/intent/tweet?url=${encodedUrl}${text ? `&text=${encodedText}` : ''}`;
}

export function buildLinkedInShareUrl(url: string): string {
  const encodedUrl = encodeURIComponent(url);
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
}

export function buildEmailShareUrl(url: string, subject?: string, body?: string): string {
  const encodedSubject = subject ? encodeURIComponent(subject) : '';
  const encodedBody = body ? encodeURIComponent(body) : encodeURIComponent(`Check out this app: ${url}`);
  return `mailto:?subject=${encodedSubject}&body=${encodedBody}`;
}
