import * as crypto from 'crypto';

export function generateSecretKey(): string {
    return crypto.randomBytes(64).toString('hex');
}

// Example Usage (for one time generation)
if (require.main === module) {
    const secretKey = generateSecretKey();
    console.log('Generated Secret Key:', secretKey);
}
