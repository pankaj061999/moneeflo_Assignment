"use client";

import React, { useState } from "react";

// Define the interface for form data
interface AddressFormData {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

interface FormField {
  name: keyof AddressFormData;
  label: string;
  placeholder: string;
  required: boolean;
}

const StepSecondComponent: React.FC = () => {
  const [formData, setFormData] = useState<AddressFormData>({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const [errors, setErrors] = useState<Partial<AddressFormData>>({});

  const formFields: FormField[] = [
    { name: "addressLine1", label: "Address Line 1", placeholder: "Enter address line 1", required: true },
    { name: "addressLine2", label: "Address Line 2", placeholder: "Enter address line 2", required: false },
    { name: "city", label: "City", placeholder: "Enter city", required: true },
    { name: "state", label: "State", placeholder: "Enter state", required: true },
    { name: "pincode", label: "Pincode", placeholder: "Enter pincode", required: true },
    { name: "country", label: "Country", placeholder: "Enter country", required: true },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: Partial<AddressFormData> = {};

    formFields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Address Form Data Submitted:", formData);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Address Details
        </h2>

        {formFields.map((field) => (
          <div key={field.name} className="mb-4">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {field.label}
            </label>
            <input
              type="text"
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={field.placeholder}
            />
            {errors[field.name] && (
              <p className="text-sm text-red-500">{errors[field.name]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default StepSecondComponent;
