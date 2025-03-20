import {validationSchema} from '../constants/validateSchema';

export const validateInput = (
  fieldName: string,
  value: string,
  formData: Record<string, any>,
) => {
  const schema = validationSchema[fieldName];

  if (!schema) return null;

  // Required field check
  if (schema.required && !value.trim()) {
    return schema.errorMessages.required;
  }

  // Min length check
  if (schema.minLength && value.length < schema.minLength) {
    return schema.errorMessages.minLength;
  }

  // Max length check
  if (schema.maxLength && value.length > schema.maxLength) {
    return schema.errorMessages.maxLength;
  }

  // Regex check
  if (schema.regex && !schema.regex.test(value)) {
    return schema.errorMessages.regex;
  }

  // Match field check (for password confirmation)
  if (schema.matchField && value !== formData[schema.matchField]) {
    return schema.errorMessages.matchField;
  }

  return null; // No errors
};
