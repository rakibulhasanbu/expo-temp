import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const ACCESS_TOKEN_KEY = "auth_access_token";
const REFRESH_TOKEN_KEY = "auth_refresh_token";

// expo-secure-store only supports ios/android; web auth is out of scope for now,
// so reads/writes are no-ops there instead of throwing.
const isSupported = Platform.OS !== "web";

const getItem = (key: string) => (isSupported ? SecureStore.getItemAsync(key) : Promise.resolve(null));
const setItem = (key: string, value: string) => (isSupported ? SecureStore.setItemAsync(key, value) : Promise.resolve());
const deleteItem = (key: string) => (isSupported ? SecureStore.deleteItemAsync(key) : Promise.resolve());

export const getAccessToken = () => getItem(ACCESS_TOKEN_KEY);
export const setAccessToken = (token: string) => setItem(ACCESS_TOKEN_KEY, token);
export const deleteAccessToken = () => deleteItem(ACCESS_TOKEN_KEY);

export const getRefreshToken = () => getItem(REFRESH_TOKEN_KEY);
export const setRefreshToken = (token: string) => setItem(REFRESH_TOKEN_KEY, token);
export const deleteRefreshToken = () => deleteItem(REFRESH_TOKEN_KEY);
