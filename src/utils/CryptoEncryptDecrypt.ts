import * as crypto from 'crypto';
class CryptoEncryptDecrypt {
    private algorithm = 'aes-256-cbc';
    private encryptionKey: Buffer;
    private iv: Buffer;

    constructor(keyPhrase: string) {
        // Derive a 32-byte key from the keyPhrase
        this.encryptionKey = crypto.scryptSync(keyPhrase, 'salt', 32);
        // Use a fixed IV for consistency (in production, consider storing IV with encrypted data)
        this.iv = Buffer.from('1234567890123456', 'utf8');
    }

    /**
     * Encrypts plain text data
     * @param plainText - The text to encrypt
     * @returns Encrypted data as hex string
     */
    public encryptData(plainText: string): string {
        const cipher = crypto.createCipheriv(this.algorithm, this.encryptionKey, this.iv);
        const encrypted = cipher.update(plainText, 'utf8', 'hex');
        return encrypted + cipher.final('hex') as string;
    }

    /**
     * Decrypts encrypted data
     * @param encryptedText - The encrypted data as hex string
     * @returns Decrypted plain text
     */
    public decryptData(encryptedText: string): string {
        const decipher = crypto.createDecipheriv(this.algorithm, this.encryptionKey, this.iv);
        const decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        return decrypted + decipher.final('utf8') as string;
    }
}

export default CryptoEncryptDecrypt;






// import * as crypto from 'crypto';

// // Use environment variables for the secret key and IV for better security.
// // For this example, we use hardcoded values (do not do this in a production environment).
// const algorithm = 'aes-256-cbc';
// const secretKey = crypto.scryptSync(process.env.ENCRYPTION_KEY!, 'salt', 32); // 32 bytes for aes-256
// const iv = crypto.scryptSync(process.env.ENCRYPTION_IV!, 'salt', 16); // 16 bytes for aes-256-cbc

// /**
//  * Encrypts a plaintext string using AES-256-CBC.
//  * @param text The plaintext string to encrypt.
//  * @returns The encrypted text in hex format.
//  */
// export function encryptPassword(text: string): string {
//     const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
//     let encrypted = cipher.update(text, 'utf8', 'hex');
//     encrypted += cipher.final('hex');
//     return encrypted;
// }

// /**
//  * Decrypts a hex-formatted encrypted string using AES-256-CBC.
//  * @param encryptedText The encrypted text in hex format.
//  * @returns The original plaintext string.
//  */
// export function decryptPassword(encryptedText: string): string {
//     const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
//     let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
// }



