import mapErrorsToAlert from './mapErrorsToAlert';

describe('mapErrorsToAlert', () => {
  it('maps error object to array of { id, label }', () => {
    const input = {
      name: 'Naam is verplicht',
      email: 'E-mailadres is verplicht',
    };

    const result = mapErrorsToAlert(input);

    expect(result).toEqual([
      { id: '#name', label: 'Naam is verplicht' },
      { id: '#email', label: 'E-mailadres is verplicht' },
    ]);
  });

  it('returns an empty array when no errors', () => {
    const result = mapErrorsToAlert({});
    expect(result).toEqual([]);
  });

  it('handles single error correctly', () => {
    const result = mapErrorsToAlert({ startDate: 'Ongeldige datum' });
    expect(result).toEqual([{ id: '#startDate', label: 'Ongeldige datum' }]);
  });

  it('correctly maps errors with "links." prefix', () => {
    const input = {
      'links.timeout': 'Link timeout occurred',
      'links.invalid': 'Link is invalid',
    };

    const result = mapErrorsToAlert(input);

    expect(result).toEqual([
      { id: '#links-timeout', label: 'Links - Link timeout occurred' },
      { id: '#links-invalid', label: 'Links - Link is invalid' },
    ]);
  });

  it('handles mixed error types', () => {
    const input = {
      name: 'Naam is verplicht',
      'links.duplicate': 'Duplicaat link',
      email: 'E-mailadres is verplicht',
    };

    const result = mapErrorsToAlert(input);

    expect(result).toEqual([
      { id: '#name', label: 'Naam is verplicht' },
      { id: '#links-duplicate', label: 'Links - Duplicaat link' },
      { id: '#email', label: 'E-mailadres is verplicht' },
    ]);
  });
});
