import { Button, Grid, Heading } from '@amsterdam/design-system-react';
import styles from './styles.module.css';
import FormSelect from '@/components/FormSelect/FormSelect';
import SubmissionOutput from '@/components/SubmissionOutput/SubmissionOutput';
import FormTextInput from '@/components/FormTextInput/FormTextInput';
import { FormEvent, useState } from 'react';
import { EntityFormData } from '@/types';
import FormTextarea from '@/components/FormTextarea/FormTextarea';
import FormRepeaterInput from '@/components/FormRepeaterInput/FormRepeaterInput';
import FormAutoSelect from '@/components/FormAutoSelect/FormAutoSelect';

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

const Home = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    kind: 'Component',
    name: 'ee-docs',
    description: 'The primary app for developers.amsterdam',
    tags: ['docusaurus', 'nodejs', 'react', 'typescript'],
  } as EntityFormData);

  // const [formState, formAction] = useActionState(submitEntityForm);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const [formData, setFormData] = useState({
  //   kind: '',
  //   name: '',
  // });
  // const isPending = formState.status === 'pending';

  // useEffect(() => {
  //   if (formState.success) {
  //     setIsSubmitted(true);
  //   }
  // }, [formState]);

  // const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
  //   const { name, value } = e.target;

  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    // Simple validation
    const newErrors = {};
    // if (!data.name) newErrors.name = 'Name is required';
    // if (!data.email) newErrors.email = 'Email is required';

    if (Object.keys(newErrors).length === 0) {
      // Submit the data
      console.log('Submitting:', data, {
        toJson: Object.fromEntries(formData.entries()),
      });

      setFormData(Object.fromEntries(formData.entries()) as EntityFormData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Grid>
      <Grid.Cell span="all">
        <Heading level={1} size="level-3">
          Create an entity
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormSelect
            label="Kind"
            // TODO include link in description - what happens?
            description="Description text goes here..."
            // This looks a bit weird but is intended because select menu values
            // are often different to the labels (in this example they're not)
            options={{
              API: 'API',
              Component: 'Component',
              Domain: 'Domain',
              Group: 'Group',
              Resource: 'Resource',
              System: 'System',
              User: 'User',
            }}
            // onChange={handleChange}
          />

          <FormTextInput
            label="Name"
            description="Textinput description text goes here..."
            value={formData.name}
            // onChange={handleChange}
          />

          <FormTextarea
            label="Description"
            description="Textarea description text goes here..."
            value={formData.description}
          />

          <FormRepeaterInput
            label="Repeater"
            initialValues={formData.tags}
            onChange={(tags: string[]) => setFormData({ ...formData, tags })}
          />

          <FormAutoSelect label="Auto select" />

          <div>
            <Button type="submit">Versturen</Button>
          </div>
        </form>
      </Grid.Cell>
      <SubmissionOutput formData={formData} />
    </Grid>
  );
};

export default Home;
