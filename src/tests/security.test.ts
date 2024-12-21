import { describe, test, expect } from 'vitest';
import { 
  sanitizeInput, 
  validateContentSecurity, 
  validateToken,
  generateSecureId
} from '../utils/security';

describe('security', () => {
  describe('sanitizeInput', () => {
    test('removes HTML tags', () => {
      const input = '<script>alert("xss")</script>Hello';
      expect(sanitizeInput(input)).toBe('Hello');
    });

    test('removes special characters', () => {
      const input = 'Hello@#$%^&*()World';
      expect(sanitizeInput(input)).toBe('Hello World');
    });
  });

  describe('validateContentSecurity', () => {
    test('rejects content with script tags', () => {
      const content = '<script>alert("xss")</script>';
      expect(validateContentSecurity(content)).toBe(false);
    });

    test('accepts safe content', () => {
      const content = 'Hello, this is safe content!';
      expect(validateContentSecurity(content)).toBe(true);
    });
  });

  describe('validateToken', () => {
    test('validates correct JWT format', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U';
      expect(validateToken(token)).toBe(true);
    });

    test('rejects invalid token format', () => {
      const token = 'invalid-token';
      expect(validateToken(token)).toBe(false);
    });
  });

  describe('generateSecureId', () => {
    test('generates id of correct length', () => {
      const id = generateSecureId(16);
      expect(id).toHaveLength(32);
    });

    test('generates unique ids', () => {
      const id1 = generateSecureId();
      const id2 = generateSecureId();
      expect(id1).not.toBe(id2);
    });
  });
});