import { describe, it, expect } from 'vitest';
import { translations } from './translate';

describe('translations', () => {
  it('should contain all the required translation keys', () => {
    expect(translations).toHaveProperty('name');
    expect(translations).toHaveProperty('email');
    expect(translations).toHaveProperty('body');
  });

  it('should return correct translations', () => {
    expect(translations.name).toBe('First name');
    expect(translations.email).toBe('Email address');
    expect(translations.body).toBe('Message');
  });
});
