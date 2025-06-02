type Annotation = {
  key: string;
  label: string;
  // An example value for the annotation
  example: string;
  // If there are set options for the annotation
  values?: string[];
  type?: 'string' | 'url'; // Default is string
};

const ANNOTATIONS: Annotation[] = [
  {
    key: 'amsterdam-internal/ap',
    label: 'Application ID',
    example: 'AP12345',
  },
  {
    key: 'amsterdam-internal/cluster',
    label: 'Project/team cluster',
    example: 'DII',
  },
  {
    key: 'amsterdam-internal/directie',
    label: 'Project/team direction',
    example: 'Stadsdeel West',
  },
  {
    key: 'amsterdam-internal/host',
    label: 'Hosting solution',
    example: 'Azure',
  },
  {
    key: 'amsterdam-internal/ms-teams-channel',
    label: 'MS Teams channel URL',
    type: 'url',
    example:
      'https://teams.microsoft.com/l/channel/19%3Awl4GDanFBWttJ2dSvysjHjJnVmP5ugN0nfYYSXnRj8k1%40thread.tacv2/General?groupId=3c9c89be-883b-4385-ae02-2f3c74d939e7&tenantId=72fca1b1-2c2e-4376-a445-294d80196804',
  },
  {
    key: 'amsterdam-internal/oidc-provider',
    label: 'OIDC Provider',
    example: '@azure/msal-react',
    values: ['@azure/msal-react', 'keycloak'],
  },
  {
    key: 'amsterdam-internal/opgave',
    label: 'Project/team opgave',
    example: 'Dienstverlening',
  },
  {
    key: 'amsterdam-internal/slack-channel-internal',
    label: 'Slack channel (internal) URL',
    type: 'url',
    example: 'https://datalab-amsterdam.slack.com/archives/C07AQF605GU',
  },
  {
    key: 'amsterdam-internal/slack-channel-support',
    label: 'Slack channel (support) URL',
    type: 'url',
    example: 'https://datalab-amsterdam.slack.com/archives/C06GPP9BSGY',
  },
  {
    key: 'amsterdam-internal/timetell',
    label: 'Timetell code',
    example: '230001',
  },
  {
    key: 'backstage.io/source-location',
    label: 'Source location',
    type: 'url',
    example: 'https://github.com/amsterdam/ee-docs',
  },
  {
    key: 'github.com/project-slug',
    label: 'GitHub Project slug',
    example: 'amsterdam/ee-docs',
  },
  {
    key: 'github.com/team-slug',
    label: 'GitHub Team slug',
    example: 'amsterdam/engineering-enablement',
  },
  {
    key: 'lighthouse.com/website-url',
    label: 'Lighthouse Website URL',
    type: 'url',
    example: 'https://developers.amsterdam',
  },
];

export default ANNOTATIONS;
