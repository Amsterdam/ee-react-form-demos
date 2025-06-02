export type EntityFormData = {
  kind: string;
  name: string;
  description: string;
  tags: string[];
  annotations: Record<string, string | undefined>;
  links: {
    url: string;
    title: string;
    icon: string;
  }[];
};
