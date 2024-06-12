
import { Fernet } from "fernet-nodejs";

export const encryptPassword = (password: string, key?: string) => {
  key = key || process.env.FERNET_KEY;
  return Fernet.encrypt(password, key);
};

export const decryptPassword = (password: string, key?: string) => {
  key = key || process.env.FERNET_KEY;
  return Fernet.decrypt(password, key);
};