import { EntityFormData } from '@/types';
import { Grid, Heading } from '@amsterdam/design-system-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import yaml from 'js-yaml';
import styles from './styles.module.scss';
import ANNOTATIONS from '@/utils/getAnnotations';
import { Entity } from '@/types/Entity';

// const codeString = `
// apiVersion: backstage.io/v1alpha1
// kind: Component
// metadata:
//   name: ee-docs
//   description: The primary app for developers.amsterdam
//   tags: [docusaurus, nodejs, react, typescript]
//   annotations:
//     backstage.io/source-location: url:https://github.com/amsterdam/ee-docs/
//     github.com/project-slug: amsterdam/ee-docs
//     github.com/team-slug: amsterdam/engineering-enablement
//     lighthouse.com/website-url: https://developers.amsterdam
//   links:
//     - url: https://developers.amsterdam/
//       title: developers.amsterdam
//       icon: launch
//     - url: https://github.com/amsterdam/ee-docs
//       title: GitHub Repo
//       icon: github
//     - url: https://gemeente-amsterdam.atlassian.net/browse/COM-70
//       title: Jira Board
//       icon: dashboard
// spec:
//   type: website
//   lifecycle: production
//   owner: dii-engineering-enablement
//   system: dii-ee-developers-amsterdam
// `;

const processFormData = (formData: EntityFormData) => {
  // TODO get backstage entity type definition
  let base = {
    apiVersion: 'backstage.io/v1alpha1',
    kind: formData.kind,
    metadata: {
      name: formData.name,
      description: formData.description,
      tags: formData.tags,
      // annotations: [],
      annotations: Object.entries(formData.annotations).reduce(
        (acc, [key, value]) => {
          const rule = ANNOTATIONS.find(annotation => annotation.key === key);

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
      ),
      links: formData.links,
    },
    spec: {
      type: formData.spec.type,
      lifecycle: formData.spec.lifecycle,
      owner: formData.spec.owner,
      // system: formData.spec.system,
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
