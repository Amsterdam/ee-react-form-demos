const scrollToFirstError = (container: HTMLFormElement | null) => {
  const firstInvalid = container?.querySelector(':invalid') as HTMLElement;

  if (firstInvalid) {
    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    firstInvalid.focus();
  }
};

export default scrollToFirstError;
