import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactFormLive from './ContactFormOnChange';

describe('ContactFormLive', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the contact form correctly', () => {
    render(<ContactFormLive />);

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
    render(<ContactFormLive />);

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

  it('should validate fields on blur when touched', async () => {
    const user = userEvent.setup();
    render(<ContactFormLive />);

    const nameInput = screen.getByLabelText('Naam');

    // Focus and blur with empty value
    await user.click(nameInput);
    await user.tab(); // This will blur the field

    // The field should be marked as touched and validated
    await waitFor(() => {
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('should show live validation errors after field is touched', async () => {
    const user = userEvent.setup();
    render(<ContactFormLive />);

    const emailInput = screen.getByLabelText('E-mailadres');

    // Focus the field, enter invalid email, then blur
    await user.click(emailInput);
    await user.type(emailInput, 'invalid-email');
    await user.tab();

    // Field should be marked as invalid but error message only shows after
    // submit
    await waitFor(() => {
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    });

    // Error message should not be visible until submit is attempted
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });

  it('should validate fields on change after they are touched', async () => {
    const user = userEvent.setup();
    render(<ContactFormLive />);

    const emailInput = screen.getByLabelText('E-mailadres');

    // First touch the field by focusing and blurring
    await user.click(emailInput);
    await user.tab();

    // Now type - this should trigger live validation
    await user.click(emailInput);
    await user.type(emailInput, 'valid@email.com');

    // The field should no longer be invalid
    await waitFor(() => {
      expect(emailInput).not.toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('should show individual validation errors after submit', async () => {
    const user = userEvent.setup();
    render(<ContactFormLive />);

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

  it('should only show error alert after submit is attempted', async () => {
    const user = userEvent.setup();
    render(<ContactFormLive />);

    const nameInput = screen.getByLabelText('Naam');
    const submitButton = screen.getByRole('button', { name: 'Versturen' });

    // Touch field and make it invalid
    await user.click(nameInput);
    await user.tab();

    // Error alert should not be visible yet
    expect(screen.queryByTestId('alert')).not.toBeInTheDocument();

    // Submit the form
    await user.click(submitButton);

    // Now error alert should be visible
    await waitFor(() => {
      expect(screen.getByTestId('alert')).toHaveTextContent('Niet gelukt');
    });
  });

  it('should update field validation state correctly during live validation', async () => {
    const user = userEvent.setup();
    render(<ContactFormLive />);

    const emailInput = screen.getByLabelText('E-mailadres');

    // Touch field first
    await user.click(emailInput);
    await user.tab();

    // Enter invalid email
    await user.click(emailInput);
    await user.type(emailInput, 'invalid');

    // Field should be marked as invalid
    await waitFor(() => {
      expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    });

    // Clear and enter valid email
    await user.clear(emailInput);
    await user.type(emailInput, 'valid@email.com');

    // Field should no longer be invalid
    await waitFor(() => {
      expect(emailInput).not.toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('should show a loader when form is being submitted', async () => {
    const user = userEvent.setup();
    render(<ContactFormLive />);

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
    render(<ContactFormLive />);

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
    render(<ContactFormLive />);

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
    render(<ContactFormLive />);

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
    render(<ContactFormLive />);

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
