import CryptoJS from "crypto-js";
const secretPass = "XkhZG4fW2t2W";

export const encryptData = (text) => {
  const data = CryptoJS.AES.encrypt(
    JSON.stringify(text),
    secretPass
  ).toString();

  return data
};

export const decryptData = (encryptedMessage, username) => {
    if (encryptedMessage.startsWith('Welcome'))
        return encryptedMessage
    if (encryptedMessage.startsWith(username))
        return encryptedMessage
    return CryptoJS.AES.decrypt(encryptedMessage, secretPass).toString(CryptoJS.enc.Utf8)
  };
