/**
 * Determines if a value is empty.
 *
 * A value is considered empty if:
 * - It is `null` or `undefined`.
 * - It is a string or array with a length of `0`.
 * - It is an object with no own properties.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} - Returns `true` if the value is empty, otherwise `false`.
 */
export const isEmpty = (value: unknown): boolean => {
  if (value == null) return true;
  if (typeof value == 'undefined') return true;
  if (typeof value === 'string' || Array.isArray(value))
    return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Generates a hash for a given URL using a simple hashing algorithm.
 *
 * @param {string} url - The URL to be hashed.
 * @returns {string} - A base36 encoded hash representing the URL.
 */
export const shortenURL = (url: string): string => {
  url = url.replace(/^https?:\/\//i, ''); // remove http, https
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    hash = (hash * 31 + url.charCodeAt(i)) % 1000000; // Keep it within a range
  }
  // Convert to base36 for a shorter string
  return hash.toString(36);
};
