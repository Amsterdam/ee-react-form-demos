import { describe, it, expect } from 'vitest';
import { translations } from './translate';

describe('translations', () => {
  it('should contain all the required translation keys', () => {
    expect(translations).toHaveProperty('name');
    expect(translations).toHaveProperty('email');
    expect(translations).toHaveProperty('startDate');
    expect(translations).toHaveProperty('startTime');
    expect(translations).toHaveProperty('endDate');
    expect(translations).toHaveProperty('endTime');
    expect(translations).toHaveProperty('remote');
    expect(translations).toHaveProperty('comments');
  });

  it('should return correct translations', () => {
    expect(translations.name).toBe('Name');
    expect(translations.email).toBe('E-mail');
    expect(translations.startDate).toBe('Start date');
    expect(translations.startTime).toBe('Start time');
    expect(translations.endDate).toBe('End date');
    expect(translations.endTime).toBe('End time');
    expect(translations.remote).toBe('Is the meeting remote?');
    expect(translations.comments).toBe('Additional comments');
  });
});
