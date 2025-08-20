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

    expect(screen.getByTestId('heading')).toHaveTextContent('Contactformulier');
    expect(screen.getByLabelText('Naam')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mailadres')).toBeInTheDocument();
    expect(screen.getByLabelText('Bericht')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Versturen' })
    ).toBeInTheDocument();
  });

  it('should update form data when user types', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByLabelText('Naam');
    const emailInput = screen.getByLabelText('E-mailadres');
    const bodyInput = screen.getByLabelText('Bericht');

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

    const submitButton = screen.getByRole('button', { name: 'Versturen' });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('alert')).toHaveTextContent('Niet gelukt');
      expect(
        screen.getByText('Er was een fout met de volgende velden:')
      ).toBeInTheDocument();
    });

    // Check for specific error messages
    expect(screen.getAllByText('Dit veld is verplicht')[0]).toBeInTheDocument();
  });

  it('should show individual validation errors', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const emailInput = screen.getByLabelText('E-mailadres');
    const submitButton = screen.getByRole('button', { name: 'Versturen' });

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

    const nameInput = screen.getByLabelText('Naam');
    const emailInput = screen.getByLabelText('E-mailadres');
    const bodyInput = screen.getByLabelText('Bericht');
    const submitButton = screen.getByRole('button', { name: 'Versturen' });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(bodyInput, 'Test message');
    await user.click(submitButton);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should show success message after successful submission', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByLabelText('Naam');
    const emailInput = screen.getByLabelText('E-mailadres');
    const bodyInput = screen.getByLabelText('Bericht');
    const submitButton = screen.getByRole('button', { name: 'Versturen' });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(bodyInput, 'Test message');
    await user.click(submitButton);

    await waitFor(
      () => {
        expect(screen.getByText('Gelukt')).toBeInTheDocument();
        expect(
          screen.getByText(
            'Het formulier is verzonden. We hebben uw gegevens goed ontvangen.'
          )
        ).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('should clear errors when form is resubmitted with valid data', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByLabelText('Naam');
    const emailInput = screen.getByLabelText('E-mailadres');
    const bodyInput = screen.getByLabelText('Bericht');
    const submitButton = screen.getByRole('button', { name: 'Versturen' });

    // First submission with invalid data
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('alert')).toHaveTextContent('Niet gelukt');
    });

    // Second submission with valid data
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(bodyInput, 'Test message');
    await user.click(submitButton);

    await waitFor(
      () => {
        expect(screen.getByText('Gelukt')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('should have proper accessibility attributes', () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText('Naam');
    const emailInput = screen.getByLabelText('E-mailadres');
    const bodyInput = screen.getByLabelText('Bericht');

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

    const nameInput = screen.getByLabelText('Naam');
    const emailInput = screen.getByLabelText('E-mailadres');
    const bodyInput = screen.getByLabelText('Bericht');

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'invalid-email');
    await user.type(bodyInput, 'Test message');

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('invalid-email');
    expect(bodyInput).toHaveValue('Test message');

    const submitButton = screen.getByRole('button', { name: 'Versturen' });

    await user.click(submitButton);

    await waitFor(() => {
      const errorMessages = screen.getAllByTestId('error-message');
      expect(errorMessages.length).toBeGreaterThan(0);
      expect(emailInput).toHaveAttribute('aria-describedby', 'error-email');
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
