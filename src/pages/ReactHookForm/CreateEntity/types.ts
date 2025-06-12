export type EntityFormData = {
  kind: string;
  name: string;
  description: string;
  tags: string[];
  annotations: {
    key: string;
    value: string;
  }[];
  links: {
    url: string;
    title: string;
    icon: string;
  }[];
  spec: {
    type: string;
    lifecycle: string;
    owner: string;
    hasSystem: boolean;
    system: string;
  };
};
