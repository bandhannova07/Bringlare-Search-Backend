"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasskeyService = void 0;
class PasskeyService {
    constructor() {
        // Store passkey with expiration (in a real implementation, this would be stored in a database)
        this.passkeyStore = new Map();
    }
    // Generate a one-time passkey for password recovery
    generatePasskey() {
        // Generate a 6-digit numeric passkey
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    // Save passkey for a user
    savePasskey(email, passkey) {
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 5); // Expires in 5 minutes
        this.passkeyStore.set(email, {
            passkey,
            expiresAt
        });
    }
    // Validate passkey for a user
    validatePasskey(email, passkey) {
        const record = this.passkeyStore.get(email);
        if (!record) {
            return false;
        }
        // Check if passkey is expired
        if (new Date() > record.expiresAt) {
            // Remove expired passkey
            this.passkeyStore.delete(email);
            return false;
        }
        // Check if passkey matches
        if (record.passkey !== passkey) {
            return false;
        }
        // Remove used passkey
        this.passkeyStore.delete(email);
        return true;
    }
    // Send passkey to user (placeholder implementation)
    async sendPasskey(email, passkey) {
        // In a real implementation, this would send the passkey via email or SMS
        console.log(`Sending passkey ${passkey} to ${email}`);
        // For demonstration purposes, we'll just log it
        // In production, integrate with an email/SMS service like SendGrid, Twilio, etc.
    }
}
exports.PasskeyService = PasskeyService;
