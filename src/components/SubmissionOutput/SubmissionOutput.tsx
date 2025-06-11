import { EntityFormData } from '@/types';
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
      description: formData.description,
      tags: formData.tags,
      // annotations: [],
      annotations: formData.annotations
        ? Object.entries(formData.annotations).reduce(
            (acc, [key, value]) => {
              const rule = ANNOTATIONS.find(
                annotation => annotation.key === key
              );

              // If key is empty skip the record
              if (key) {
                if (rule?.type === 'url') {
                  acc[key] = `url: ${value}`;
                } else {
                  acc[key] = value ?? '';
                }
              }

              return acc;
            },
            {} as Record<string, string>
          )
        : {},
      links: formData.links,
    },
    spec: {
      type: formData.spec.type,
      lifecycle: formData.spec.lifecycle,
      owner: formData.spec.owner,
      system: formData.spec.system,
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

// TODO annotations - with is link value with `url: ` in speech marks but not other values?
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
