import { Alert, UnorderedList } from '@amsterdam/design-system-react';
import translate, { translations } from '../../utils/translate';

interface InvalidFormAlertProps {
  errors: Record<string, string>;
}

const InvalidFormAlert = ({ errors }: InvalidFormAlertProps) => (
  <Alert
    severity="error"
    heading="Please fix the following:"
    headingLevel={2}
    className="ams-mb-m"
    data-testid="error-alert"
  >
    <UnorderedList>
      {Object.entries(errors).map(
        ([field, message]) =>
          message && (
            <UnorderedList.Item key={field}>
              {translate(field as keyof typeof translations)}: {message}
            </UnorderedList.Item>
          )
      )}
    </UnorderedList>
  </Alert>
);

export default InvalidFormAlert;
