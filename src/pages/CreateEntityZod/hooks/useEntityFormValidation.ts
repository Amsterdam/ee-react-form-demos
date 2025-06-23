import { useState } from 'react';
import { ZodError } from 'zod/v4';
import entityFormSchema, { EntityFormData, FieldErrors } from '../schema';

const useEntityFormValidation = (formData: EntityFormData) => {
  const [errors, setErrors] = useState<FieldErrors>({});

  // Find specific error for a specific field
  const findRelevantError = (error: ZodError, fieldPath: string) => {
    return error.issues.find(issue => {
      const path = issue.path.join('.');
      return path === fieldPath || path.startsWith(`${fieldPath}.`);
    });
  };

  // Validate a single field
  // We should use `value: unknown` but as this argument is being passed
  // straight to Zod for validation (and type checking) `any` is acceptable
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateField = (fieldPath: string, value: any) => {
    try {
      const updatedFormData = buildFormDataWithNewValue(fieldPath, value);
      entityFormSchema.parse(updatedFormData);
      clearFieldError(fieldPath);
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldError = findRelevantError(error, fieldPath);
        if (fieldError) {
          setFieldError(fieldPath, fieldError.message);
        }
      }
    }
  };

  // Build a form data object with the updated value
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buildFormDataWithNewValue = (fieldPath: string, value: any) => {
    if (fieldPath.startsWith('links.')) {
      return buildFormDataWithLinksUpdate(fieldPath, value);
    }

    if (fieldPath.startsWith('spec.')) {
      return buildFormDataWithSpecUpdate(fieldPath, value);
    }

    // Top-level field update
    return { ...formData, [fieldPath]: value };
  };

  // Build the form data object's nested 'links' array
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buildFormDataWithLinksUpdate = (fieldPath: string, value: any) => {
    const pathParts = fieldPath.split('.');

    // A link row consists of 3 fields - URL, title and icon
    if (pathParts.length === 3) {
      // Single link row field (e.g., links.0.url)
      const [, indexStr, fieldName] = pathParts;
      const index = parseInt(indexStr, 10);

      if (!isNaN(index) && formData.links?.[index]) {
        const updatedLinks = [...(formData.links || [])];
        updatedLinks[index] = { ...updatedLinks[index], [fieldName]: value };
        return { ...formData, links: updatedLinks };
      }
    }

    return { ...formData, links: value };
  };

  // Build the form data object's nested 'spec' object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buildFormDataWithSpecUpdate = (fieldPath: string, value: any) => {
    const specField = fieldPath.split('.')[1] as keyof EntityFormData['spec'];
    const updatedSpec = { ...formData.spec, [specField]: value };
    return { ...formData, spec: updatedSpec };
  };

  // Clear error for a specific field
  const clearFieldError = (fieldPath: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldPath as keyof FieldErrors];
      return newErrors;
    });
  };

  // Set error for a specific field
  const setFieldError = (fieldPath: string, message: string) => {
    setErrors(prev => ({ ...prev, [fieldPath]: message }));
  };

  // Validate the entire form
  const validateForm = (): boolean => {
    try {
      entityFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: FieldErrors = {};

        // Parse the returned errors
        error.issues.forEach(err => {
          const path = err.path.join('.');

          // Handle nested spec fields
          if (err.path[0] === 'spec' && err.path.length > 1) {
            newErrors[`spec.${String(err.path[1])}` as keyof FieldErrors] =
              err.message;
          } else {
            newErrors[path as keyof FieldErrors] = err.message;
          }
        });

        setErrors(newErrors);
      }
      return false;
    }
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  return {
    errors,
    validateField,
    validateForm,
    clearFieldError,
    setFieldError,
    clearAllErrors,
  };
};

export default useEntityFormValidation;
