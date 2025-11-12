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
});
