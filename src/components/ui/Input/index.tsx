import React from 'react';

type Props = {
  name: string;
  label?: string;
  for?: string;
  type: string;
  placeholder: string;
  value: string;
  isValidationError?: boolean;
  validationString?: string;
  onChange: (event: React.FormEvent) => void;
};

const Input = (props: Props) => {
  return (
    <div className='mb-2 w-full'>
      <label className='font-roboto text-xs' htmlFor={props.for}>
        {props.label}
      </label>
      <input
        className={`w-full rounded-lg border-0 bg-white px-5 py-[10px] text-xs font-medium focus:border-transparent focus:outline-none ${
          props.isValidationError
            ? 'ring-1 ring-red-700'
            : 'ring-0 focus:ring-0'
        }`}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        autoComplete='off'
      />
      {props.isValidationError && (
        <div className='mt-1 text-[10px] text-red-700'>
          {props.validationString}
        </div>
      )}
    </div>
  );
};

export default Input;
