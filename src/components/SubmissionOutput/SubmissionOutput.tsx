import { EntityFormData } from '@/types';
import { Grid, Heading } from '@amsterdam/design-system-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import yaml from 'js-yaml';
import styles from './styles.module.scss';

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

interface SubmissionOutputProps {
  formData: EntityFormData;
}

const SubmissionOutput = ({ formData }: SubmissionOutputProps) => {
  const codeString = yaml.dump({
    apiVersion: 'backstage.io/v1alpha1',
    kind: formData.kind,
    metadata: {
      name: formData.name,
      description: formData.description,
      tags: formData.tags,
      annotations: {
        'backstage.io/source-location':
          'url:https://github.com/amsterdam/ee-docs/',
        'github.com/project-slug': 'amsterdam/ee-docs',
        'github.com/team-slug': 'amsterdam/engineering-enablement',
        'lighthouse.com/website-url': 'https://developers.amsterdam',
      },
      links: [
        {
          url: 'https://developers.amsterdam/',
          title: 'developers.amsterdam',
          icon: 'launch',
        },
        {
          url: 'https://github.com/amsterdam/ee-docs',
          title: 'GitHub Repo',
          icon: 'github',
        },
        {
          url: 'https://gemeente-amsterdam.atlassian.net/browse/COM-70',
          title: 'Jira Board',
          icon: 'dashboard',
        },
      ],
      spec: {
        type: 'website',
        lifecycle: 'production',
        owner: 'dii-engineering-enablement',
        system: 'dii-ee-developers-amsterdam',
      },
    },
  });

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
