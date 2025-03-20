import {useMemo, useState} from 'react';
import {Errors} from '../types/commonTypes';
import {validateInput} from '../utils/validateMethod';

const useFormValidation = (initialState: any) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prev: any) => ({...prev, [fieldName]: value}));

    const errorMessage = validateInput(fieldName, value, formData);
    setErrors(prev => ({...prev, [fieldName]: errorMessage}));
  };

  const validateForm = () => {
    const newErrors: any = {};
    Object.keys(formData).forEach(fieldName => {
      const errorMessage = validateInput(
        fieldName,
        formData[fieldName],
        formData,
      );
      if (errorMessage) {
        newErrors[fieldName] = errorMessage;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const isValidated = useMemo(() => {
    return (
      Object.values(formData).every(
        value => typeof value === 'string' && value.trim() !== '',
      ) && Object.values(errors).every(error => !error)
    );
  }, [formData, errors]);
  return {formData, errors, handleInputChange, validateForm, isValidated};
};

export default useFormValidation;
