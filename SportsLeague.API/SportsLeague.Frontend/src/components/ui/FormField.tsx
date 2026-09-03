import { type ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export default function FormField({ label, error, required, children }: FormFieldProps) {
  return (
    <div className={`form-group ${error ? 'form-group-error' : ''}`}>
      <label>
        {label}
        {required && <span className="required-dot">*</span>}
      </label>
      {children}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}
