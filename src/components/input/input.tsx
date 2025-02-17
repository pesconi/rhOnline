import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';


interface InputProps {
  field: {
    name: string;
    value: any;
    onBlur: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
  };
  multiline?: boolean;
  customClassName?: string;
  label: string;
  type: string;
  pattern?: string;
  title?: string;
  inputMode?: "search" | "text" | "email" | "tel" | "url" | "none" | "numeric" | "decimal" | undefined;
  maxLength?: number;
  inputRef?: React.Ref<any>;
}

const CustomTextInput: React.FC<InputProps> = ({ field, ...props }) => {
  const { control } = useFormContext();
  return (
    <div className={`custom_text_input ${props.customClassName}`}>
      <Controller
        name={field.name}
        control={control}
        render={({ field: { ref, ...restField } }) => (
          props.multiline ? (
            <textarea
              key={restField.name}
              id={restField.name}
              placeholder={props.label}
              disabled={restField.disabled}
              {...restField}
              ref={props.inputRef}
            />
          ) : (
            <input
              key={restField.name}
              id={restField.name}
              type={props.type}
              placeholder={props.label}
              pattern={props.pattern}
              title={props.title}
              inputMode={props.inputMode ?? 'text'}
              maxLength={props.maxLength}
              disabled={restField.disabled}
              ref={props.inputRef}
              {...restField}
            />
          )
        )}
      />
    </div>
  );
};

export default CustomTextInput;