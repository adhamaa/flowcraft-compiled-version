const bcrypt = require('bcrypt');
const readline = require('readline');
const crypto = require('crypto');
const { Fernet } = require('fernet-nodejs');

console.log('Starting the password hashing and encryption tool...');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const menuOptions = [
  'Hash a password',
  'Compare passwords',
  'Encrypt text',
  'Decrypt text',
  'Exit'
];

const hashPassword = async () => {
  const plaintextPassword = await new Promise((resolve) => {
    rl.question('Enter the password to hash: ', (password) => {
      resolve(password);
    });
  });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

  console.log('Hashed password:', hashedPassword);
  rl.close();
};

const comparePasswords = async () => {
  const plaintextPassword = await new Promise((resolve) => {
    rl.question('Enter the plaintext password: ', (password) => {
      resolve(password);
    });
  });

  const hashedPassword = await new Promise((resolve) => {
    rl.question('Enter the hashed password: ', (password) => {
      resolve(password);
    });
  });

  const isMatch = await bcrypt.compare(plaintextPassword, hashedPassword);
  console.log('Passwords match:', isMatch);
  rl.close();
};

const encryptText = async () => {
  const plaintext = await new Promise((resolve) => {
    rl.question('Enter the text to encrypt: ', (text) => {
      resolve(text);
    });
  });

  const cipherKey = await new Promise((resolve) => {
    rl.question('Enter the encryption key: ', (key) => {
      resolve(key);
    });
  });

  // const cipher = crypto.createCipher('aes-256-cbc', cipherKey);
  // let encryptedText = cipher.update(plaintext, 'utf8', 'hex');
  // encryptedText += cipher.final('hex');

  const encryptedText = Fernet.encrypt(plaintext, cipherKey);

  console.log('Encrypted text:', encryptedText);
  rl.close();
};

const decryptText = async () => {
  const encryptedText = await new Promise((resolve) => {
    rl.question('Enter the encrypted text: ', (text) => {
      resolve(text);
    });
  });

  const cipherKey = await new Promise((resolve) => {
    rl.question('Enter the decryption key: ', (key) => {
      resolve(key);
    });
  });

  // const decipher = crypto.createDecipher('aes-256-cbc', cipherKey);
  // let decryptedText = decipher.update(encryptedText, 'hex', 'utf8');
  // decryptedText += decipher.final('utf8');
  const decryptedText = Fernet.decrypt(encryptedText, cipherKey);

  console.log('Decrypted text:', decryptedText);
  rl.close();
};

const displayMenu = () => {
  console.log('Menu:');
  menuOptions.forEach((option, index) => {
    console.log(`${index + 1}. ${option}`);
  });
};

const handleMenuSelection = (selection) => {
  switch (selection) {
    case '1':
      hashPassword();
      break;
    case '2':
      comparePasswords();
      break;
    case '3':
      encryptText();
      break;
    case '4':
      decryptText();
      break;
    case '5':
      rl.close();
      break;
    default:
      console.log('Invalid selection');
      displayMenu();
  }
};

const startMenu = () => {
  displayMenu();
  rl.question('Enter your selection: ', (selection) => {
    handleMenuSelection(selection);
  });
};

startMenu();