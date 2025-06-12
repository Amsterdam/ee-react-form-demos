import z from 'zod/v4';

const specSchema = z
  .object({
    type: z.string().min(1, 'Type is required'),
    lifecycle: z.string().min(1, 'Lifecycle is required'),
    owner: z.string().min(1, 'Owner is required'),
    hasSystem: z.boolean().default(false),
    system: z.string().optional(),
  })
  .refine(
    data => !data.hasSystem || (data.system && data.system.trim() !== ''),
    {
      path: ['system'],
      message: 'System is required',
    }
  );

const entityFormSchema = z.object({
  kind: z.string().min(1, 'Kind is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]).optional(),
  annotations: z
    .array(
      z.object({
        key: z.string().min(1, 'Annotation key is required'),
        value: z.string().min(1, 'Annotation value is required'),
      })
    )
    .default([]),
  links: z
    .array(
      z.object({
        url: z.string().url('Must be a valid URL'),
        title: z.string().min(1, 'Title is required'),
        icon: z.string().optional(),
      })
    )
    .default([]),
  spec: specSchema,
});

export type EntityFormData = z.infer<typeof entityFormSchema>;
export default entityFormSchema;
