import { render, screen } from '@testing-library/react';
import SubmissionOutput from './SubmissionOutput';

const mockFormData = {
  kind: 'Component',
  name: 'example-service',
  description: 'Test service',
  tags: ['tag-a'],
  annotations: [
    { key: 'backstage.io/techdocs-ref', value: 'url:https://docs.com' },
  ],
  links: [],
  spec: {
    type: 'service',
    lifecycle: 'production',
    owner: 'team-a',
    hasSystem: false,
    system: '',
  },
};

describe('SubmissionOutput', () => {
  it('renders the YAML output heading', () => {
    render(<SubmissionOutput formData={mockFormData} />);
    expect(
      screen.getByRole('heading', { name: /yaml output/i })
    ).toBeInTheDocument();
  });

  it('renders the processed YAML from formData', () => {
    render(<SubmissionOutput formData={mockFormData} />);

    const codeBlock = screen.getByRole('code');
    expect(codeBlock).toHaveTextContent(/kind:\s+Component/);
    expect(codeBlock).toHaveTextContent(/name:\s+example-service/);
    expect(codeBlock).toHaveTextContent(/owner:\s+team-a/);
  });

  it('includes system in YAML when hasSystem is true', () => {
    const formDataWithSystem = {
      ...mockFormData,
      spec: {
        ...mockFormData.spec,
        hasSystem: true,
        system: 'support-system',
      },
    };
    render(<SubmissionOutput formData={formDataWithSystem} />);

    const supportSpan = screen.getByText(/support-system/i);
    expect(supportSpan).toBeInTheDocument();
    expect(
      supportSpan?.previousElementSibling?.previousElementSibling
    ).toHaveTextContent('system:');
    // expect(screen.getByText(/system: support/)).toBeInTheDocument();
  });
});
