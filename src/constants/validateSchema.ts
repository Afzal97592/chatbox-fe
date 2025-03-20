export interface ValidationSchema {
  [key: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    regex?: RegExp;
    matchField?: string;
    errorMessages: {
      required?: string;
      minLength?: string;
      maxLength?: string;
      regex?: string;
      matchField?: string;
    };
  };
}

export const validationSchema: ValidationSchema = {
  name: {
    required: true,
    minLength: 3,
    maxLength: 30,
    regex: /^[a-zA-Z\s]+$/,
    errorMessages: {
      required: 'Name is required.',
      minLength: 'Name must be at least 3 characters.',
      maxLength: 'Name cannot exceed 30 characters.',
      regex: 'Name can only contain letters and spaces.',
    },
  },
  email: {
    required: true,
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessages: {
      required: 'Email is required.',
      regex: 'Enter a valid email address.',
    },
  },
  password: {
    required: true,
    minLength: 6,
    maxLength: 20,
    errorMessages: {
      required: 'Password is required.',
      minLength: 'Password must be at least 6 characters.',
      maxLength: 'Password cannot exceed 20 characters.',
    },
  },
  confirmPassword: {
    required: true,
    matchField: 'password',
    errorMessages: {
      required: 'Confirm Password is required.',
      matchField: 'Passwords do not match.',
    },
  },
};
