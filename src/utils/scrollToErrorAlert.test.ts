// scrollToErrorAlert.test.ts
import { describe, expect, it, vi } from 'vitest';
import scrollToErrorAlert from './scrollToErrorAlert';

describe('scrollToErrorAlert', () => {
  beforeEach(() => {
    // Mock the scrollIntoView method on the Element prototype
    Element.prototype.scrollIntoView = vi.fn();
  });

  it('should scroll to the error alert if it exists', () => {
    // Create a mock container with an error alert
    const container = document.createElement('form');
    container.innerHTML = `
            <div class="ams-alert--error">Error occurred</div>
        `;

    const alert = container.querySelector('.ams-alert--error');

    // Call the function
    scrollToErrorAlert(container);

    // Check if scrollIntoView was called with expected options
    expect(alert?.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'center',
    });
  });

  it('should not perform any action if alert does not exist', () => {
    // Create a mock container without an error alert
    const container = document.createElement('form');

    // Call the function
    scrollToErrorAlert(container);

    // Since we can't scroll, we expect no errors and just a silent pass
    expect(() => {
      scrollToErrorAlert(container);
    }).not.toThrow();
  });
});
