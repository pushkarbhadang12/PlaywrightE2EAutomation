import * as crypto from 'crypto';

class CryptoEncryptDecrypt {
    private algorithm = 'aes-256-cbc';
    private encryptionKey: Buffer;
    private iv: Buffer;

    constructor(keyPhrase: string = process.env.ENCRYPTION_KEY as string) {
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
        let encrypted = cipher.update(plainText, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    /**
     * Decrypts encrypted data
     * @param encryptedText - The encrypted data as hex string
     * @returns Decrypted plain text
     */
    public decryptData(encryptedText: string): string {
        const decipher = crypto.createDecipheriv(this.algorithm, this.encryptionKey, this.iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}

export default CryptoEncryptDecrypt;
