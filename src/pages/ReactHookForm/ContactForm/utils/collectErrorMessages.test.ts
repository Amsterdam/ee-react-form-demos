import { describe, expect, it } from 'vitest';
import collectErrorMessages from './collectErrorMessages';

describe('collectErrorMessages', () => {
  it('should collect messages from a flat object structure', () => {
    const input = {
      name: {
        message: 'Name is required',
      },
      email: {
        message: 'Email is required',
      },
    };

    const expectedOutput = {
      name: 'Name is required',
      email: 'Email is required',
    };

    expect(collectErrorMessages(input)).toEqual(expectedOutput);
  });

  it('should ignore properties without a message', () => {
    const input = {
      name: {},
      email: {
        message: 'Email is required',
      },
      age: {
        message: '',
      },
    };

    const expectedOutput = {
      email: 'Email is required',
    };

    expect(collectErrorMessages(input)).toEqual(expectedOutput);
  });

  it('should return an empty object if no messages are present', () => {
    const input = {
      name: {},
      email: {},
    };

    const expectedOutput = {};

    expect(collectErrorMessages(input)).toEqual(expectedOutput);
  });

  it('should handle input with nested objects correctly', () => {
    const input = {
      user: {
        name: {
          message: 'Name is required',
        },
        address: {
          message: 'Address is required',
        },
      },
      email: {
        message: 'Email is required',
      },
    };

    const expectedOutput = {
      email: 'Email is required',
    };

    expect(collectErrorMessages(input)).toEqual(expectedOutput);
  });

  it('should return messages from various keys correctly', () => {
    const input = {
      firstName: {
        message: 'First name is required',
      },
      lastName: {
        message: 'Last name is required',
      },
      note: {
        message: 'Note is required',
      },
    };

    const expectedOutput = {
      firstName: 'First name is required',
      lastName: 'Last name is required',
      note: 'Note is required',
    };

    expect(collectErrorMessages(input)).toEqual(expectedOutput);
  });
});
