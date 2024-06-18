const keyString = 'joiyKed1p78GJQ-N2MtEdHfOZ8gzlxe4I7GEyoMTm1Q=';
const ivLength = 12; // Recommended IV length for AES-GCM

// Convert Base64 URL-safe to Base64
function base64UrlToBase64(url: string): string {
  return url.replace(/-/g, '+').replace(/_/g, '/');
}

// Convert Base64 to Base64 URL-safe
function base64ToBase64Url(base64: string): string {
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Decode Base64 to ArrayBuffer
function base64Decode(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// Encode ArrayBuffer to Base64
function base64Encode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Import the encryption key
async function importKey(base64Key: string): Promise<CryptoKey> {
  const keyData = base64Decode(base64UrlToBase64(base64Key));
  return crypto.subtle.importKey(
    'raw',
    keyData,
    'AES-GCM',
    false,
    ['encrypt', 'decrypt']
  );
}

// Encrypt the data
async function encrypt(plaintext: string, key: CryptoKey): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(ivLength));
  const encoder = new TextEncoder();
  const plaintextBytes = encoder.encode(plaintext);

  const ciphertext = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    plaintextBytes
  );

  const ivAndCiphertext = new Uint8Array(ivLength + ciphertext.byteLength);
  ivAndCiphertext.set(iv);
  ivAndCiphertext.set(new Uint8Array(ciphertext), ivLength);

  return base64ToBase64Url(base64Encode(ivAndCiphertext.buffer));
}

// Decrypt the data
async function decrypt(encrypted: string, key: CryptoKey): Promise<string> {
  const ivAndCiphertext = new Uint8Array(base64Decode(base64UrlToBase64(encrypted)));
  const iv = ivAndCiphertext.slice(0, ivLength);
  const ciphertext = ivAndCiphertext.slice(ivLength);

  const plaintextBytes = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    ciphertext
  );

  const decoder = new TextDecoder();
  return decoder.decode(plaintextBytes);
}

export { importKey, encrypt, decrypt };

// // Example usage
// (async () => {
//   const key = await importKey(keyString);
//   const plaintext = 'Hello, World!';

//   const encrypted = await encrypt(plaintext, key);
//   console.log('Encrypted:', encrypted);

//   const decrypted = await decrypt(encrypted, key);
//   console.log('Decrypted:', decrypted);
// })();
