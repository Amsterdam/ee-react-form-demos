import { describe, expect, it } from 'vitest';
import collectErrorMessages from './collectErrorMessages';

describe('collectErrorMessages', () => {
  it('should collect messages from a simple object', () => {
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

  it('should handle nested objects correctly', () => {
    const input = {
      spec: {
        system: {
          message: 'System is required',
        },
      },
      name: {
        message: 'Name is required',
      },
    };

    const expectedOutput = {
      name: 'Name is required',
      'spec.system': 'System is required',
    };

    expect(collectErrorMessages(input)).toEqual(expectedOutput);
  });

  it('should handle multiple nested objects with prefixes', () => {
    const input = {
      annotations: {
        error: {
          message: 'An annotation error occurred',
        },
      },
      links: {
        timeout: {
          message: 'Link timeout occurred',
        },
      },
    };

    const expectedOutput = {
      'annotations.error': 'Annotations - An annotation error occurred',
      'links.timeout': 'Links - Link timeout occurred',
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

  it('should not throw an error for deeply nested empty objects', () => {
    const input = {
      level1: {
        level2: {
          level3: {},
        },
      },
    };

    const expectedOutput = {};

    expect(collectErrorMessages(input)).toEqual(expectedOutput);
  });
});
