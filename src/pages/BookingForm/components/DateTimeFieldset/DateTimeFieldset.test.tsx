import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import DateTimeFieldset from './DateTimeFieldset';

describe('DateTimeFieldset', () => {
  it('renders the fieldset with legend and children', () => {
    render(
      <DateTimeFieldset
        legend="Startdatum en -tijd"
        fields={['startDate', 'startTime']}
        errors={{}}
      >
        <div>Child content</div>
      </DateTimeFieldset>
    );

    expect(screen.getByText('Startdatum en -tijd')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('does not show an error message if there are no errors', () => {
    render(
      <DateTimeFieldset
        legend="Startdatum en -tijd"
        fields={['startDate', 'startTime']}
        errors={{
          startDate: undefined,
          startTime: undefined,
        }}
      >
        <div>Child content</div>
      </DateTimeFieldset>
    );

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.queryByText(/verplicht/i)).not.toBeInTheDocument();
  });

  it('shows required field error message', () => {
    render(
      <DateTimeFieldset
        legend="Startdatum en -tijd"
        fields={['startDate', 'startTime']}
        errors={{
          startDate: 'Startdatum is verplicht',
          startTime: undefined,
        }}
      >
        <div>Child content</div>
      </DateTimeFieldset>
    );

    expect(screen.getByText('Startdatum is verplicht.')).toBeInTheDocument();
  });

  it('shows invalid date/time error message', () => {
    render(
      <DateTimeFieldset
        legend="Einddatum en -tijd"
        fields={['endDate', 'endTime']}
        errors={{
          endDate: 'Einddatum moet later zijn',
          endTime: undefined,
        }}
      >
        <div>Child content</div>
      </DateTimeFieldset>
    );

    expect(
      screen.getByText(
        'De einddatum en -tijd moeten later zijn dan de startdatum en -tijd'
      )
    ).toBeInTheDocument();
  });

  it('shows combined required message when both fields are required', () => {
    render(
      <DateTimeFieldset
        legend="Startdatum en -tijd"
        fields={['startDate', 'startTime']}
        errors={{
          startDate: 'Startdatum is verplicht',
          startTime: 'Starttijd is verplicht',
        }}
      >
        <div>Child content</div>
      </DateTimeFieldset>
    );

    expect(
      screen.getByText('Startdatum en Starttijd is verplicht.')
    ).toBeInTheDocument();
  });
});
