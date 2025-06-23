import { EntityFormData } from '@/types/types';
import { Grid, Heading } from '@amsterdam/design-system-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import yaml from 'js-yaml';
import styles from './SubmissionOutput.module.scss';
import ANNOTATIONS from '@/utils/getAnnotations';
import { Entity } from '@/types/Entity';

const processFormData = (formData: EntityFormData) => {
  let base = {
    apiVersion: 'backstage.io/v1alpha1',
    kind: formData.kind,
    metadata: {
      name: formData.name,
      description: formData?.description ?? '',
      tags: formData.tags,
      // Convert annotations from array of key, value objects to Backstage
      // annotation object
      annotations: formData.annotations
        ? formData.annotations.reduce(
            (acc, curr) => {
              const rule = ANNOTATIONS.find(
                annotation => annotation.key === curr.key
              );

              // If key is empty skip the record
              if (!curr.key || curr.key === '') {
                if (rule?.type === 'url') {
                  acc[curr.key] = `url:${curr.value}`;
                } else {
                  acc[curr.key] = curr.value ?? '';
                }
              }
              acc[curr.key] = curr.value;
              return acc;
            },
            {} as Record<string, string | undefined>
          )
        : {},
      links: formData.links,
    },
    spec: {
      type: formData.spec.type,
      lifecycle: formData.spec.lifecycle,
      owner: formData.spec.owner,
    },
  } as Entity;

  if (formData.spec.hasSystem) {
    base = {
      ...base,
      spec: {
        ...base.spec,
        system: formData.spec.system,
      },
    };
  }

  return base;
};

interface SubmissionOutputProps {
  formData: EntityFormData;
}

// Display the submitted data as a valid Backstage entity in YAML format
const SubmissionOutput = ({ formData }: SubmissionOutputProps) => {
  const codeString = yaml.dump(processFormData(formData));

  return (
    <Grid.Cell span={{ narrow: 4, medium: 8, wide: 6 }}>
      <div className={styles.inner}>
        <Heading level={2} size="level-5">
          YAML Output
        </Heading>

        <SyntaxHighlighter language="yaml" style={docco}>
          {codeString}
        </SyntaxHighlighter>
      </div>
    </Grid.Cell>
  );
};

export default SubmissionOutput;
