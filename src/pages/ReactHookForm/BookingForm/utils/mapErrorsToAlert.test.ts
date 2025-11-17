import mapErrorsToAlert from './mapErrorsToAlert';

describe('ReactHookForm / BookingForm - mapErrorsToAlert', () => {
  it('maps error object to array of { id, label }', () => {
    const input = {
      name: {
        type: 'required',
        message: 'Naam is verplicht',
      },
      email: {
        type: 'required',
        message: 'E-mailadres is verplicht',
      },
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
    const result = mapErrorsToAlert({
      startDate: { type: 'required', message: 'Ongeldige datum' },
    });
    expect(result).toEqual([{ id: '#startDate', label: 'Ongeldige datum' }]);
  });
});
