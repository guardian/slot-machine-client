// Collection of helper functions to interact with localStorage.
// See original code in Frontend:
// https://github.com/guardian/frontend/blob/master/static/src/javascripts/lib/storage.js
const checkAvailability = (): boolean => {
  const key = 'local-storage-module-test';
  try {
    localStorage.setItem(key, 'graun');
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

const storage = window.localStorage;
const isAvailable = checkAvailability();

export const get = (key: string): any => {
  if (!isAvailable) {
    return null;
  }

  let data;
  // Try and parse the data
  try {
    const value = getRaw(key);

    if (value === null || value === undefined) {
      return null;
    }

    data = JSON.parse(value);

    if (data === null) {
      return null;
    }
  } catch (e) {
    remove(key);
    return null;
  }

  // Check if the data has an expiration date and remove it if expired
  if (data.expires && new Date() > new Date(data.expires)) {
    remove(key);
    return null;
  }

  // If data contains a value property, assume that's what we care about
  if (typeof data.value !== 'undefined') {
    return data.value;
  }

  // Otherwise return value as is
  return data;
};

const getRaw = (key: string): string | null => {
  if (isAvailable) {
    return storage.getItem(key);
  }

  return null;
};

export const set = (
  key: string,
  value: any,
  options: Record<string, any> = {}
): void => {
  if (!isAvailable) {
    return;
  }

  storage.setItem(
    key,
    JSON.stringify({
      value,
      expires: options.expires
    })
  );
};

// Prevents any existing value from being overwritten
export const setIfNotExists = (
  key: string,
  value: any,
  options: Record<string, any> = {}
): void => {
  if (getRaw(key) !== null) {
    return;
  }

  set(key, value, options);
};

export const remove = (key: string): void => {
  if (isAvailable) {
    storage.removeItem(key);
  }
};
