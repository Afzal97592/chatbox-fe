import {MMKV} from 'react-native-mmkv';

const storage = new MMKV({
  id: 'my-chatbox-app',
  encryptionKey: 'myChat97592BoxEncryptionKey',
});

export const mmKvStorage = {
  setItem: (key: string, value: any) => {
    storage.set(key, value);
  },
  getItem: (key: string) => {
    const data = storage.getString(key);
    return data ?? null;
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
  clearStorage: () => {
    storage.clearAll();
  },
};
