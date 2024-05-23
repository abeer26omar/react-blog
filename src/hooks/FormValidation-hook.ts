import { useState, useEffect } from 'react';

export interface FormErrors {
  [key: string]: string;
}

interface FormData {
  [key: string]: string;
}

interface FormValidation {
  formData: FormData;
  errors: FormErrors;
  handleInputChange: (event: any) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const useFormValidation = (initialData: FormData): FormValidation => {

  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        if (value.trim() === '') {
            updatedErrors[name] = `${name} is required`;
        } else {
            delete updatedErrors[name];
        }
        return updatedErrors;
    });
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};


  return {
    formData,
    errors,
    handleInputChange,
    setFormData,
  };
};

export default useFormValidation;
