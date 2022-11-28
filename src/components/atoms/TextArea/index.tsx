import React from 'react';
import { useField } from 'formik';
import { useState } from 'react';

export interface TextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  placeholder: string;
  onClick?: () => void;
}

function TextArea(props: TextAreaProps) {
  const { label, type, name, placeholder, ...nativeProps } = props;
  const [field, meta] = useField(name);

  return (
    <div className="form-control w-full">
      <label className="label">{label}</label>
      <div className="relative">
        <textarea
          {...field}
          name={name}
          placeholder={placeholder}
          className={`textarea textarea-bordered w-full "${
            meta.touched && meta.error && 'textarea-error'
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

export default TextArea;
