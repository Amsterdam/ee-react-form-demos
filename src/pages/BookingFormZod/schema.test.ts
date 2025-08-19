import { describe, expect, it } from 'vitest';
import bookingFormSchema from './schema';
import type { BookingFormData } from './schema';
import { ZodError } from 'zod';

const validData: BookingFormData = {
  name: 'John Smit',
  email: 'john@example.com',
  startDate: '2025-01-01',
  startTime: '01:01',
  endDate: '2025-01-02',
  endTime: '01:01',
  remote: false,
  comments: 'Comment text goes here',
};

describe('bookingFormSchema', () => {
  it('accepts valid data', () => {
    const result = bookingFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects missing required top-level fields', () => {
    const invalid = { ...validData, startDate: '' };
    const result = bookingFormSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.startDate).toContain(
        'Start date is required'
      );
    }
  });

  it('rejects invalid email in links', () => {
    const invalid = {
      ...validData,
      email: 'fakeemail.test',
    };
    const result = bookingFormSchema.safeParse(invalid);
    expect(result.success).toBe(false);

    if (!result.success) {
      const error = result.error as unknown as ZodError;

      const emailError = error.issues.find(
        e => String(e.path) === 'email'
      )?.message;

      expect(emailError).toMatch(/invalid email/i);
    } else {
      throw new Error('Expected validation to fail');
    }
  });

  it('rejects when end date/time is before start date/time', () => {
    const invalid = {
      ...validData,
      startDate: '2025-01-02',
      startTime: '12:00',
      endDate: '2025-01-01',
      endTime: '12:00',
    };

    const result = bookingFormSchema.safeParse(invalid);
    expect(result.success).toBe(false);

    if (!result.success) {
      const error = result.error as ZodError;
      const endTimeError = error.issues.find(
        e => String(e.path) === 'endTime'
      )?.message;

      expect(endTimeError).toMatch(
        /end date and time must be later than start date and time/i
      );
    } else {
      throw new Error('Expected validation to fail');
    }
  });
});
