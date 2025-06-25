export type EntityFormData = {
  kind: string;
  name: string;
  description: string | undefined;
  tags: string[];
  annotations: { key: string; value: string | undefined }[];
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

export type AnnotationItem = {
  id: string;
  label: string | undefined;
  value: string | undefined;
};
