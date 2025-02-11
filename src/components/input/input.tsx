import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

interface InputProps {
  name: string;
  label: string;
  type: string;
  multiline?: boolean;
  customClassName?: string;
}

const CustomTextInput: React.FC<InputProps> = ({ name, label, type, multiline = false, customClassName }) => {
  const { control } = useFormContext();
  return (
    <div className={`custom_text_input ${customClassName}`}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          multiline ? (
            <textarea
              key={name}
              id={name}
              placeholder={label}
              {...field}
            />
          ) : (
            <input
              key={name}
              id={name}
              type={type}
              placeholder={label}
              {...field}
            />
          )
        )}
      />
    </div>
  );
};

export default CustomTextInput;