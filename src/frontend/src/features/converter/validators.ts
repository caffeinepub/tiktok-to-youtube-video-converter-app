export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateTikTokUrl(url: string): ValidationResult {
  if (!url || url.trim().length === 0) {
    return {
      isValid: false,
      error: 'Please enter a TikTok URL',
    };
  }

  try {
    const parsedUrl = new URL(url.trim());
    const hostname = parsedUrl.hostname.toLowerCase();

    // Check if it's a TikTok domain
    if (
      !hostname.includes('tiktok.com') &&
      !hostname.includes('vm.tiktok.com') &&
      !hostname.includes('vt.tiktok.com')
    ) {
      return {
        isValid: false,
        error: 'Please enter a valid TikTok URL (e.g., tiktok.com)',
      };
    }

    // Check if it has a path (not just the domain)
    if (parsedUrl.pathname === '/' || parsedUrl.pathname === '') {
      return {
        isValid: false,
        error: 'Please enter a complete TikTok video URL',
      };
    }

    return { isValid: true };
  } catch {
    return {
      isValid: false,
      error: 'Please enter a valid URL',
    };
  }
}
