import z from 'zod/v4';

const specSchema = z
  .object({
    // Avoid the property name `type`, as RHF uses this
    componentType: z.string().min(1, 'Enter a type'),
    lifecycle: z.string().min(1, 'Select a lifecycle'),
    owner: z.string().min(1, 'Select an owner'),
    hasSystem: z.boolean().default(false),
    system: z.string().optional(),
  })
  .refine(
    data => !data.hasSystem || (data.system && data.system.trim() !== ''),
    {
      path: ['system'],
      message: 'Select a system',
    }
  );

const entityFormSchema = z.object({
  kind: z.string().min(1, 'Select a kind'),
  name: z.string().min(1, 'Enter a name'),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
  // With RHF - handle annoations as an array than object
  annotations: z
    .array(
      z.object({
        key: z.string().min(1, 'Select an annotation key'),
        value: z.string().min(1, 'Enter an annotation value'),
      })
    )
    .default([]),
  links: z
    .array(
      z.object({
        url: z.string().url('Enter a valid URL'),
        title: z.string().min(1, 'Enter a title'),
        icon: z.string().min(1, 'Select an icon'),
      })
    )
    .default([]),
  spec: specSchema,
});

// We can infer the types from the zod object rules
export type EntityFormData = z.infer<typeof entityFormSchema>;

export default entityFormSchema;
