const scrollToErrorAlert = (container: HTMLFormElement | null) => {
  const alert = container?.querySelector('.ams-alert--error');

  if (alert) {
    alert.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

export default scrollToErrorAlert;
