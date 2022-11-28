import React from 'react';
import { useField } from 'formik';
import { useState } from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  icons?: JSX.Element;
  onClick?: () => void;
}

function Input(props: InputProps) {
  const { label, type, name, placeholder, icons, ...nativeProps } = props;
  const [field, meta] = useField(name);

  return (
    <div className="form-control w-full">
      <label className="label">{label}</label>
      <div className="relative">
        <input
          {...field}
          name={name}
          placeholder={placeholder}
          type={type}
          className={`w-full input input-bordered ${
            meta.touched && meta.error && 'input-error'
          }`}
          {...nativeProps}
        />
      </div>
      {meta.touched && meta.error && (
        <label className="label text-error">{meta.error}</label>
      )}
    </div>
  );
}

export default Input;
