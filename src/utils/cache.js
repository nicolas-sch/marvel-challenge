const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

export const getCachedData = (key) => {
  const cachedData = localStorage.getItem(key);
  if (!cachedData) return null;

  const { data, timestamp } = JSON.parse(cachedData);

  if (Date.now() - timestamp > CACHE_EXPIRATION_TIME) {
    localStorage.removeItem(key);
    return null;
  }

  return data;
};

export const setCachedData = (key, data) => {
  const cache = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(cache));
};