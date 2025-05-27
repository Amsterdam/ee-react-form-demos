export type EntityFormData = {
  kind: string;
  name: string;
  description: string;
  tags: string[];
  annotations: Record<string, string>[];
};
