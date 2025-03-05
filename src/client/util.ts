export const isValidURL = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    console.error('url validation:', err);
    return false;
  }
};
