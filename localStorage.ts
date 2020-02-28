// WIP
// localStorage helpers being ported over from Frontend
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

export const get = (key: string) => {
  // debugger;
  if (!isAvailable) {
      return;
  }

  let data;

  // try and parse the data
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

  // has it expired?
  if (data.expires && new Date() > new Date(data.expires)) {
      remove(key);
      return null;
  }

  // Return data if no `value` key inside
  if (typeof data.value === 'undefined') {
      return data;
  }

  return data.value;
};

const getRaw = (key: string) => {
  if (isAvailable) {
      return storage.getItem(key);
  }
};

export const set = (
  key: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Record<string, any> = {},
) => {
  if (!isAvailable) {
      return;
  }

  return storage.setItem(
      key,
      JSON.stringify({
          value,
          expires: options.expires,
      }),
  );
};

export const remove = (key: string) => {
  if (isAvailable) {
      return storage.removeItem(key);
  }
};
