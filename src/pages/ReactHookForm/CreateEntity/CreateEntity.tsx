import { useState } from 'react';
import {
  useForm,
  Controller,
  useWatch,
  useFieldArray,
  Resolver,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Button,
  Grid,
  Heading,
  Link,
  Paragraph,
  Row,
} from '@amsterdam/design-system-react';
import FormSelect from './components/FormSelect/FormSelect';
import FormTextarea from './components/FormTextarea/FormTextarea';
import FormTextInput from './components/FormTextInput/FormTextInput';
import FormCheckboxInput from './components/FormCheckboxInput/FormCheckboxInput';
import LinksRepeaterInputs from './components/LinksRepeaterInputs/LinksRepeaterInputs';
import Loader from '@/components/Loader/Loader';
import SubmissionOutput from '@/components/SubmissionOutput/SubmissionOutput';
import sortAlphabetically from '@/utils/sortAlphabetically';
import getOwners from '@/utils/getOwners';
import getSystems from '@/utils/getSystems';
import FormAutoSelect from './components/FormAutoSelect/FormAutoSelect';
import getTags from '@/utils/getTags';
import FormAnnotationFields from './components/FormAnnotationFields/FormAnnotationFields';
import styles from './CreateEntity.module.css';
import entityFormSchema, {
  EntityFormData as RHFEntityFormData,
} from './schema';
import { EntityFormData } from '@/types';

const ownerOptions = getOwners().sort(sortAlphabetically);
const systemOptions = getSystems().sort(sortAlphabetically);

// TODO scroll to first error
const CreateEntity = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<RHFEntityFormData>({
    resolver: zodResolver(entityFormSchema) as Resolver<RHFEntityFormData>,
    defaultValues: {
      kind: 'Component',
      name: 'ee-docs',
      description: 'The primary app for developers.amsterdam',
      tags: ['docusaurus', 'nodejs', 'react', 'typescript'],
      annotations: [
        {
          key: 'backstage.io/source-location',
          value: 'https://github.com/amsterdam/ee-docs/',
        },
        { key: 'github.com/project-slug', value: 'amsterdam/ee-docs' },
        {
          key: 'github.com/team-slug',
          value: 'amsterdam/engineering-enablement',
        },
        {
          key: 'lighthouse.com/website-url',
          value: 'https://developers.amsterdam',
        },
      ],
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
        componentType: 'website',
        lifecycle: 'production',
        owner: 'dii-engineering-enablement',
        hasSystem: true,
        system: 'dii-ee-developers-amsterdam',
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  const formData = watch();
  console.log({ formData, errors });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Watch the hasSystem field to conditionally show system field
  const hasSystem = useWatch({ control, name: 'spec.hasSystem' });

  const onSubmit = (data: RHFEntityFormData) => {
    // Mock API call
    console.log('Form data:', data);

    // Simulate API call
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);

    // Handle success (you might want to show a success message here)
    console.log('Form submitted successfully');
  };

  const resetForm = () => {
    reset({
      kind: 'API',
      name: '',
      description: '',
      tags: [],
      annotations: [],
      links: [],
      spec: {
        componentType: 'service',
        lifecycle: 'prototype',
        owner: '',
        hasSystem: false,
        system: '',
      },
    });
  };

  return (
    <Grid>
      <Grid.Cell span={{ narrow: 4, medium: 8, wide: 6 }} className="ams-mb-xl">
        <Heading level={1} size="level-3">
          Create an entity
        </Heading>

        {/* Use noValidate so browser validation doesn't block react-hook-form + zod */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="kind"
            control={control}
            render={({ field }) => (
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
                    describes a number of core kinds that plugins can know of
                    and understand, but an organization using Backstage is free
                    to also add entities of other kinds to the catalog.
                  </Paragraph>
                }
                name="kind"
                options={{
                  API: 'API',
                  Component: 'Component',
                  Domain: 'Domain',
                  Group: 'Group',
                  Resource: 'Resource',
                  System: 'System',
                  User: 'User',
                }}
                value={field.value}
                error={errors.kind?.message}
                required
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormTextInput
                id="name"
                label="Name"
                description="The name of the entity. This name is both meant for human eyes to recognize the entity, and for machines and other components to reference the entity (e.g. in URLs or from other entity specification files)."
                value={field.value}
                error={errors.name?.message}
                required
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <FormTextarea
                id="description"
                label="Description"
                description="A human readable description of the entity, to be shown in Backstage. Should be kept short and informative, suitable to give an overview of the entity's purpose at a glance. More detailed explanations and documentation should be placed elsewhere."
                value={field.value || ''}
                error={errors.description?.message}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="spec.componentType"
            control={control}
            render={({ field }) => (
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
                value={field.value}
                error={errors.spec?.componentType?.message}
                required
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="spec.lifecycle"
            control={control}
            render={({ field }) => (
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
                value={field.value}
                error={errors.spec?.lifecycle?.message}
                required
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="spec.owner"
            control={control}
            render={({ field }) => {
              const selectedOption =
                ownerOptions?.find(opt => opt.value === field.value) ?? null;

              return (
                <FormAutoSelect
                  id="owner"
                  label="Owner"
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
                      to the owner of the component, e.g.
                      `artist-relations-team`. This field is required.
                    </Paragraph>
                  }
                  options={ownerOptions}
                  value={selectedOption}
                  error={errors.spec?.owner?.message}
                  required
                  onChange={selectedOption => {
                    // react-select + isMulti + typescript makes things a bit overcomplicated
                    const option = Array.isArray(selectedOption)
                      ? selectedOption[0]
                      : selectedOption;
                    field.onChange(selectedOption ? option.value : '');
                  }}
                />
              );
            }}
          />

          <Controller
            name="spec.hasSystem"
            control={control}
            render={({ field }) => (
              <FormCheckboxInput
                id="hasSystem"
                label="Entity belongs to a system?"
                value={field.value ?? false}
                onChange={field.onChange}
              />
            )}
          />

          {hasSystem && (
            <Controller
              name="spec.system"
              control={control}
              render={({ field }) => {
                const selectedOption =
                  systemOptions?.find(opt => opt.value === field.value) ?? null;

                return (
                  <FormAutoSelect
                    id="system"
                    label="System"
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
                    value={selectedOption}
                    error={errors.spec?.system?.message}
                    required
                    onChange={selectedOption => {
                      const option = Array.isArray(selectedOption)
                        ? selectedOption[0]
                        : selectedOption;

                      field.onChange(selectedOption ? option.value : '');
                    }}
                  />
                );
              }}
            />
          )}

          <Controller
            name="tags"
            control={control}
            render={({ field }) => {
              const selectedOptions = (field.value ?? []).map(val => ({
                value: val,
                label: val,
              }));

              return (
                <FormAutoSelect
                  id="tags"
                  label="Tags"
                  description="A list of single-valued strings, for example to classify catalog entities in various ways. This is different to the labels in metadata, as labels are key-value pairs."
                  options={getTags()}
                  value={selectedOptions}
                  error={errors.tags?.message}
                  isMulti
                  onChange={selectedOptions => {
                    field.onChange(
                      Array.isArray(selectedOptions)
                        ? selectedOptions.map(
                            ({ value }: { value: string }) => value
                          )
                        : []
                    );
                  }}
                />
              );
            }}
          />

          <FormAnnotationFields
            control={control}
            errors={errors}
            setValue={setValue}
          />

          <Controller
            name="links"
            control={control}
            render={() => (
              <LinksRepeaterInputs
                fields={fields}
                append={append}
                remove={remove}
                control={control}
                errors={errors.links}
              />
            )}
          />

          <Row>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
            <Button type="button" variant="secondary" onClick={resetForm}>
              Reset
            </Button>
          </Row>
        </form>
      </Grid.Cell>

      <SubmissionOutput
        formData={
          {
            ...formData,
            annotations: formData.annotations
              ? formData.annotations.reduce(
                  (acc, curr) => {
                    acc[curr.key] = curr.value;
                    return acc;
                  },
                  {} as Record<string, string | undefined>
                )
              : {},
            spec: {
              ...formData.spec,
              type: formData.spec.componentType,
            },
          } as EntityFormData
        }
      />

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
