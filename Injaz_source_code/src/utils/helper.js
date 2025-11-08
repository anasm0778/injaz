// Environment-based API configuration
const getServerUrl = () => {
  // Check if we're in development mode
  if (typeof window !== 'undefined') {
    // Client-side: check if we're on localhost (any port)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:4000';
    }
  }
  
  // Check environment variable (if available)
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Default to production for server-side rendering
  return 'https://logicrent.ae/api';
};

export const serverUrl = getServerUrl();

// For easy switching during development, you can manually override:
// export const serverUrl = "http://localhost:4000";  // Local development
// export const serverUrl = "https://logicrent.ae/api"; // Production

/**
 * Validates and sanitizes image URLs for Next.js Image component
 * @param {string} url - The URL to validate
 * @param {string} fallback - Fallback URL if the provided URL is invalid
 * @returns {string} - Valid URL string
 */
export const getValidImageUrl = (url, fallback = '/placeholder-image.png') => {
  // Return fallback if url is null, undefined, or empty string
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return fallback;
  }

  const trimmedUrl = url.trim();

  // If it's already a full URL (http/https), validate it
  if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
    try {
      new URL(trimmedUrl);
      return trimmedUrl;
    } catch (e) {
      return fallback;
    }
  }

  // If it's a relative path (starts with /), it's valid
  if (trimmedUrl.startsWith('/')) {
    return trimmedUrl;
  }

  // If it's a relative path without leading slash, add it
  return `/${trimmedUrl}`;
};

/**
 * Constructs a full image URL from serverUrl and image path
 * @param {string} imagePath - The image path (can be relative or absolute)
 * @param {string} fallback - Fallback URL if the constructed URL is invalid
 * @returns {string} - Valid full URL or fallback
 */
export const getImageUrl = (imagePath, fallback = '/placeholder-image.png') => {
  if (!imagePath || typeof imagePath !== 'string' || imagePath.trim() === '') {
    return fallback;
  }

  const trimmedPath = imagePath.trim();

  // If it's already a full URL, validate and return it
  if (trimmedPath.startsWith('http://') || trimmedPath.startsWith('https://')) {
    try {
      new URL(trimmedPath);
      return trimmedPath;
    } catch (e) {
      return fallback;
    }
  }

  // Construct full URL with serverUrl
  const fullUrl = `${serverUrl}${trimmedPath.startsWith('/') ? trimmedPath : `/${trimmedPath}`}`;
  
  try {
    new URL(fullUrl);
    return fullUrl;
  } catch (e) {
    return fallback;
  }
};