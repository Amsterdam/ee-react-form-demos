import { describe, expect, it } from 'vitest';
import entityFormSchema from './schema';
import type { EntityFormData } from './schema';
import { ZodError } from 'zod';

const validData: EntityFormData = {
  kind: 'Component',
  name: 'my-service',
  description: 'optional',
  tags: ['tag1', 'tag2'],
  annotations: [{ key: 'foo', value: 'bar' }],
  links: [
    {
      url: 'https://example.com',
      title: 'Example',
      icon: 'github',
    },
  ],
  spec: {
    type: 'service',
    lifecycle: 'production',
    owner: 'team-a',
    hasSystem: true,
    system: 'system-a',
  },
};

describe('entityFormSchema', () => {
  it('accepts valid data', () => {
    const result = entityFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects missing required top-level fields', () => {
    const invalid = { ...validData, kind: '' };
    const result = entityFormSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.kind).toContain(
        'Kind is required'
      );
    }
  });

  it('rejects invalid URL in links', () => {
    const invalid = {
      ...validData,
      links: [{ ...validData.links[0], url: 'invalid-url' }],
    };
    const result = entityFormSchema.safeParse(invalid);
    expect(result.success).toBe(false);

    if (!result.success) {
      const error = result.error as unknown as ZodError;

      const urlError = error.issues.find(
        e => e.path.join('.') === 'links.0.url'
      )?.message;

      expect(urlError).toMatch(/valid URL/i);
    } else {
      throw new Error('Expected validation to fail');
    }
  });

  it('requires system when hasSystem is true', () => {
    const invalid = {
      ...validData,
      spec: {
        ...validData.spec,
        hasSystem: true,
        system: '', // fails refine
      },
    };
    const result = entityFormSchema.safeParse(invalid);
    expect(result.success).toBe(false);

    if (!result.success) {
      const error = result.error as unknown as ZodError;

      const systemError = error.issues.find(
        e => e.path.join('.') === 'spec.system'
      )?.message;

      expect(systemError).toBe('System is required');
    } else {
      throw new Error('Expected validation to fail');
    }
  });

  it('allows empty system when hasSystem is false', () => {
    const valid = {
      ...validData,
      spec: {
        ...validData.spec,
        hasSystem: false,
        system: '',
      },
    };
    const result = entityFormSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });
});
