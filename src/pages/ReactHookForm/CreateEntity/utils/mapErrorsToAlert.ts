const mapErrorsToAlert = (errors: Record<string, string>) =>
  Object.keys(errors).map(key => ({
    id: `#${key}`,
    label: errors[key],
  }));

export default mapErrorsToAlert;
