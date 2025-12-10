import { describe, it, expect } from 'vitest';
import ContactFormSchema from './schema';

describe('ContactFormSchema', () => {
  it('should validate valid form data', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      body: 'This is a test message',
    };

    const result = ContactFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject an empty name', () => {
    const invalidData = {
      name: '',
      email: 'john@example.com',
      body: 'This is a test message',
    };

    const result = ContactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);

    if (!result.success) {
      const nameError = result.error.issues.find(
        issue => issue.path[0] === 'name'
      );
      expect(nameError?.message).toBe('The name field is required');
    }
  });

  it('should reject an invalid email format', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      body: 'This is a test message',
    };

    const result = ContactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);

    if (!result.success) {
      const emailError = result.error.issues.find(
        issue => issue.path[0] === 'email'
      );
      expect(emailError?.message).toBe('A valid email address is required');
    }
  });

  it('should reject an empty email', () => {
    const invalidData = {
      name: 'John Doe',
      email: undefined,
      body: 'This is a test message',
    };

    const result = ContactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);

    if (!result.success) {
      const emailError = result.error.issues.find(
        issue => issue.path[0] === 'email'
      );
      expect(emailError?.message).toBe('The email address field is required');
    }
  });

  it('should reject an empty body', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      body: '',
    };

    const result = ContactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);

    if (!result.success) {
      const bodyError = result.error.issues.find(
        issue => issue.path[0] === 'body'
      );
      expect(bodyError?.message).toBe('The message field is required');
    }
  });

  it('should handle multiple validation errors', () => {
    const invalidData = {
      name: '',
      email: 'invalid-email',
      body: '',
    };

    const result = ContactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues).toHaveLength(3);
    }
  });
});
