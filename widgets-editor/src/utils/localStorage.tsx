import { Variant } from "components/ads/common";
import {
  LOCAL_STORAGE_QUOTA_EXCEEDED_MESSAGE,
  LOCAL_STORAGE_NO_SPACE_LEFT_ON_DEVICE_MESSAGE,
  createMessage,
} from "constants/messages";

const now = Date.now();
while (Date.now() < now + 50);

const getLocalStorage = () => {
  const storage = window.localStorage;

  const handleError = async (e: Error) => {
    let message;
    if (e.name === "QuotaExceededError") {
      message = LOCAL_STORAGE_QUOTA_EXCEEDED_MESSAGE;
    } else if (e.name === "NS_ERROR_FILE_NO_DEVICE_SPACE") {
      message = LOCAL_STORAGE_NO_SPACE_LEFT_ON_DEVICE_MESSAGE;
    }

    if (message) {
      // __webpack_require__
      const Toaster = await import(
        /* webpackMode: 'eager' */ "components/ads/Toast"
      ).then((module) => module.Toaster);
      // 1: this would make the bundle smaller
      //    but: network delay! to solve:
      //    a) webpackPrefetch: true -> <link rel="prefetch">
      //    b) webpackMode: 'eager' -> keep the module in the bundle but execute it with a delay
      // 2: this would also make the bundle cheaper to execute
      Toaster.show({
        text: createMessage(message),
        variant: Variant.danger,
      });
    } else {
      throw e;
    }
  };

  const getItem = (key: string): string | null => {
    try {
      return storage.getItem(key);
    } catch (e) {
      handleError(e);
    }
    return null;
  };

  const setItem = (key: string, value: string) => {
    try {
      storage.setItem(key, value);
    } catch (e) {
      handleError(e);
    }
  };

  const removeItem = (key: string) => {
    try {
      storage.removeItem(key);
    } catch (e) {
      handleError(e);
    }
  };

  const clear = () => {
    try {
      storage.clear();
    } catch (e) {
      handleError(e);
    }
  };

  const isSupported = () => !!window.localStorage;

  return {
    getItem,
    setItem,
    removeItem,
    isSupported,
    clear,
  };
};

const localStorage = getLocalStorage();

export default localStorage;
