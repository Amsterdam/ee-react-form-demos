import { describe, it, expect, vi, beforeEach } from 'vitest';
import scrollToFirstError from './scrollToFirstError';

describe('scrollToFirstError', () => {
  let form: HTMLFormElement;
  let input1: HTMLInputElement;
  let input2: HTMLInputElement;

  beforeEach(() => {
    // Set up a simple form
    form = document.createElement('form');
    input1 = document.createElement('input');
    input2 = document.createElement('input');

    input1.required = true;
    input2.required = true;

    form.appendChild(input1);
    form.appendChild(input2);
    document.body.appendChild(form);
  });

  it('scrolls to and focuses the first invalid input', () => {
    // Simulate only the first input being invalid
    vi.spyOn(input1, 'checkValidity').mockReturnValue(false);
    vi.spyOn(input2, 'checkValidity').mockReturnValue(true);

    // Simulate :invalid query selector
    input1.scrollIntoView = vi.fn();
    input1.focus = vi.fn();
    form.querySelector = vi.fn().mockReturnValue(input1);

    scrollToFirstError(form);

    expect(form.querySelector).toHaveBeenCalledWith(':invalid');
    expect(input1.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'center',
    });
    expect(input1.focus).toHaveBeenCalled();
  });
});
