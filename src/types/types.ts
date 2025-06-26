export type AnnotationItem = {
  key: string;
  value: string;
};

export type EntityFormData = {
  kind: string;
  name: string;
  description: string | undefined;
  tags: string[];
  annotations: AnnotationItem[];
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
