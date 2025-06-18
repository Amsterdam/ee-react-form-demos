import {
  Alert,
  Button,
  Grid,
  Heading,
  Link,
  Paragraph,
  Row,
} from '@amsterdam/design-system-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ActionMeta } from 'react-select';
import { EntityFormData } from '@/types';
import FormSelect from './components/FormSelect/FormSelect';
import FormTextInput from './components/FormTextInput/FormTextInput';
import FormTextarea from './components/FormTextarea/FormTextarea';
import FormCheckboxInput from './components/FormCheckboxInput/FormCheckboxInput';
import FormAutoSelect from './components/FormAutoSelect/FormAutoSelect';
import AnnotationRepeater from './components/AnnotationRepeater/AnnotationRepeater';
import LinkRepeater from './components/LinkRepeater/LinkRepeater';
import SubmissionOutput from '@/components/SubmissionOutput/SubmissionOutput';
import Loader from '@/components/Loader/Loader';
import getOwners from '@/utils/getOwners';
import getSystems from '@/utils/getSystems';
import getTags from '@/utils/getTags';
import sortAlphabetically from '@/utils/sortAlphabetically';
import styles from './CreateEntity.module.css';

const ownerOptions = getOwners().sort(sortAlphabetically);
const systemOptions = getSystems().sort(sortAlphabetically);

// TODO validation - variant of CreateEntity (plain) with zod validation?
// TODO document results
// - Check shared GitHub examples (in Slack)
// - README/storybook setup?
// - validation alert/header with invalid fields - Cannot accomplish with browser validation
// - smaller forms - use react validation
// - larger/dynamic forms - use browser validation
// - react-hook-form to this migration path?
// TODO tests
const CreateEntity = () => {
  const [formData, setFormData] = useState({
    kind: 'Component',
    name: 'ee-docs',
    description: 'The primary app for developers.amsterdam',
    tags: ['docusaurus', 'nodejs', 'react', 'typescript'],
    annotations: {
      'backstage.io/source-location': 'https://github.com/amsterdam/ee-docs/',
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
      hasSystem: true,
      system: 'dii-ee-developers-amsterdam',
    },
  } as EntityFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      formData,
    });

    // const formattedFormData = {
    //   kind: formData.kind,
    //   name: formData.name,
    //   description: formData.description,
    //   tags: formData.tags,
    //   annotations: formData.annotations,
    //   links: formData.links,
    //   spec: {
    //     type: formData.spec.type,
    //     lifecycle: formData.spec.lifecycle,
    //     owner: formData.spec.owner,
    //     hasSystem: !!formData.spec.hasSystem,
    //     system: formData.spec.system,
    //   },
    // };

    // Simulate API call
    // Here's where validation could happen
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <Grid>
      <Grid.Cell span={{ narrow: 4, medium: 8, wide: 6 }} className="ams-mb-xl">
        <Heading level={1} size="level-3">
          Create an entity
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormSelect
            id="kind"
            label="Kind"
            description={
              <Paragraph id="kind-description" size="small">
                The kind is the high level entity type being described.{' '}
                <Link
                  href="https://backstage.io/docs/architecture-decisions/adrs-adr005"
                  target="_blank"
                  rel="noreferrer"
                >
                  ADR005
                </Link>{' '}
                describes a number of core kinds that plugins can know of and
                understand, but an organization using Backstage is free to also
                add entities of other kinds to the catalog.
              </Paragraph>
            }
            name="kind"
            // This looks a bit weird but is intended because select menu values
            // are often different to the labels (however, not in this example)
            options={{
              API: 'API',
              Component: 'Component',
              Domain: 'Domain',
              Group: 'Group',
              Resource: 'Resource',
              System: 'System',
              User: 'User',
            }}
            initialValue={formData.kind}
            required
            onChange={(_name, value) => {
              setFormData(prev => ({
                ...prev,
                kind: value,
              }));
            }}
          />

          <FormTextInput
            id="name"
            label="Name"
            description="The name of the entity. This name is both meant for human eyes to recognize the entity, and for machines and other components to reference the entity (e.g. in URLs or from other entity specification files)."
            name="name"
            value={formData.name}
            required
            onChange={handleChange}
          />

          <FormTextarea
            id="description"
            label="Description"
            description="A human readable description of the entity, to be shown in Backstage. Should be kept short and informative, suitable to give an overview of the entity's purpose at a glance. More detailed explanations and documentation should be placed elsewhere."
            value={formData.description ?? ''}
            onChange={handleChange}
          />

          <FormSelect
            id="type"
            label="Type"
            description="The type of component as a string, e.g. `website`. This field is required."
            name="type"
            options={{
              service: 'Service',
              website: 'Website',
              library: 'Library',
              'mobile-app': 'Mobile/Native App',
            }}
            initialValue={formData.spec.type}
            required
            onChange={(_name, value) => {
              setFormData(prev => ({
                ...prev,
                spec: {
                  ...prev.spec,
                  type: value,
                },
              }));
            }}
          />

          <FormSelect
            id="lifecycle"
            label="Lifecycle"
            description="The lifecycle state of the component, e.g. `production`. This field is required."
            name="lifecycle"
            options={{
              prototype: 'Prototype',
              alpha: 'Alpha',
              beta: 'Beta',
              production: 'Production',
              deprecated: 'Deprecated',
              archived: 'Archived',
            }}
            initialValue={formData.spec.lifecycle}
            required
            onChange={(_name, value) => {
              setFormData(prev => ({
                ...prev,
                spec: {
                  ...prev.spec,
                  lifecycle: value,
                },
              }));
            }}
          />

          <FormAutoSelect
            id="owner"
            label="Owner"
            name="owner"
            description={
              <Paragraph size="small" id="owner-description">
                An{' '}
                <Link
                  href="https://backstage.io/docs/features/software-catalog/references#string-references"
                  target="_blank"
                  rel="noreferrer"
                >
                  entity reference
                </Link>{' '}
                to the owner of the component, e.g. `artist-relations-team`.
                This field is required.
              </Paragraph>
            }
            options={ownerOptions}
            initialValues={[formData.spec.owner]}
            required
            onChange={newValue => {
              const option = Array.isArray(newValue) ? newValue[0] : newValue;
              setFormData(prev => ({
                ...prev,
                spec: {
                  ...prev.spec,
                  owner: option?.value ?? '',
                },
              }));
            }}
          />

          <FormCheckboxInput
            id="hasSystem"
            label="Entity belongs to a system?"
            value={formData.spec.hasSystem}
            onChange={e =>
              setFormData({
                ...formData,
                spec: {
                  ...formData.spec,
                  hasSystem: e.target.checked,
                },
              })
            }
          />

          {formData.spec.hasSystem && (
            <FormAutoSelect
              id="hasSystem"
              label="System"
              name="system"
              description={
                <Paragraph id="system-description" size="small">
                  An{' '}
                  <Link
                    href="https://backstage.io/docs/features/software-catalog/references#string-references"
                    target="_blank"
                    rel="noreferrer"
                  >
                    entity reference
                  </Link>{' '}
                  to the system that the component belongs to, e.g.
                  `artist-engagement-portal`. This field is optional.
                </Paragraph>
              }
              options={systemOptions}
              initialValues={[formData.spec.system]}
              required
              onChange={newValue => {
                const option = Array.isArray(newValue) ? newValue[0] : newValue;
                setFormData(prev => ({
                  ...prev,
                  spec: {
                    ...prev.spec,
                    system: option?.value ?? '',
                  },
                }));
              }}
            />
          )}

          <FormAutoSelect
            id="tags"
            label="Tags"
            name="tags"
            description="A list of single-valued strings, for example to classify catalog entities in various ways. This is different to the labels in metadata, as labels are key-value pairs."
            options={getTags()}
            initialValues={formData.tags}
            isMulti
            onChange={(
              newValue,
              actionMeta: ActionMeta<{
                label: string;
                value: string;
              }>
            ) => {
              setFormData(prev => ({
                ...prev,
                [actionMeta.name as string]: Array.isArray(newValue)
                  ? newValue?.map(({ value }: { value: string }) => value)
                  : [],
              }));
            }}
          />

          <AnnotationRepeater
            initialValues={Object.keys(formData.annotations).map(
              annotation => ({
                key: annotation,
                value: formData.annotations[annotation],
              })
            )}
            onChange={(
              annotations: {
                label: string | undefined;
                value: string | undefined;
              }[]
            ) =>
              setFormData({
                ...formData,
                annotations: annotations
                  .filter(
                    // We're not interested in values with no parent key value
                    (a): a is { label: string; value: string | undefined } =>
                      typeof a.label === 'string'
                  )
                  .reduce(
                    (acc, { label, value }) => {
                      acc[label] = value ?? '';
                      return acc;
                    },
                    {} as Record<string, string | undefined>
                  ),
              })
            }
          />

          <LinkRepeater
            items={formData?.links ?? []}
            onChange={links => {
              setFormData({
                ...formData,
                links,
              });
            }}
          />

          <Row>
            <Button type="submit">Submit</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setFormData({
                  kind: '',
                  name: '',
                  description: '',
                  tags: [],
                  annotations: {},
                  links: [],
                  spec: {
                    type: '',
                    lifecycle: '',
                    owner: '',
                    hasSystem: false,
                    system: '',
                  },
                });
              }}
            >
              Reset
            </Button>
          </Row>
        </form>
      </Grid.Cell>
      <SubmissionOutput formData={formData} />

      {isLoading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}

      {isSubmitted && (
        <div className={styles.loader}>
          <Alert
            closeable
            heading="Gelukt"
            headingLevel={2}
            severity="success"
            onClose={() => {
              setIsLoading(false);
              setIsSubmitted(false);
            }}
          >
            <Paragraph>
              Het formulier is verzonden. We hebben uw gegevens goed ontvangen.
            </Paragraph>
          </Alert>
        </div>
      )}
    </Grid>
  );
};

export default CreateEntity;
