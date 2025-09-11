import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the contact form correctly', () => {
    render(<ContactForm />);

    expect(screen.getByTestId('heading')).toHaveTextContent('Contact form');
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should update form data when user types', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email address');
    const bodyInput = screen.getByLabelText('Message');

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(bodyInput, 'Test message');

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(bodyInput).toHaveValue('Test message');
  });

  it('should show validation errors when the form is submitted with invalid data', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('alert')).toHaveTextContent('Unsuccessful');
      expect(
        screen.getByText('There was an error with the following fields:')
      ).toBeInTheDocument();
    });

    // Check for specific error messages
    expect(screen.getAllByText('Dit veld is verplicht')[0]).toBeInTheDocument();
  });

  it('should show individual validation errors', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const emailInput = screen.getByLabelText('Email address');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    // Enter invalid email
    await user.type(emailInput, 'invalid-email');
    await user.click(submitButton);

    await waitFor(() => {
      const errorMessages = screen.getAllByTestId('error-message');
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  it('should show a loader when form is being submitted', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email address');
    const bodyInput = screen.getByLabelText('Message');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(bodyInput, 'Test message');
    await user.click(submitButton);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should show success message after successful submission', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email address');
    const bodyInput = screen.getByLabelText('Message');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(bodyInput, 'Test message');
    await user.click(submitButton);

    await waitFor(
      () => {
        expect(screen.getByText('Success!')).toBeInTheDocument();
        expect(
          screen.getByText(
            'The form has been sent. We have received your details.'
          )
        ).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('should clear errors when form is resubmitted with valid data', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email address');
    const bodyInput = screen.getByLabelText('Message');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    // First submission with invalid data
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('alert')).toHaveTextContent('Unsuccessful');
    });

    // Second submission with valid data
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(bodyInput, 'Test message');
    await user.click(submitButton);

    await waitFor(
      () => {
        expect(screen.getByText('Success!')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('should have proper accessibility attributes', () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email address');
    const bodyInput = screen.getByLabelText('Message');

    expect(nameInput).toHaveAttribute('id', 'name');
    expect(nameInput).toHaveAttribute('name', 'name');
    expect(emailInput).toHaveAttribute('id', 'email');
    expect(emailInput).toHaveAttribute('name', 'email');
    expect(bodyInput).toHaveAttribute('id', 'body');
    expect(bodyInput).toHaveAttribute('name', 'body');
  });

  it('should have aria invalid attributes when form is submitted with invalid data', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email address');
    const bodyInput = screen.getByLabelText('Message');

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'invalid-email');
    await user.type(bodyInput, 'Test message');

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('invalid-email');
    expect(bodyInput).toHaveValue('Test message');

    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await user.click(submitButton);

    await waitFor(() => {
      const errorMessages = screen.getAllByTestId('error-message');
      expect(errorMessages.length).toBeGreaterThan(0);
      expect(emailInput).toHaveAttribute('aria-describedby', 'error-email');
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
