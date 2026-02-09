import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`flex h-12 w-full rounded-xl border border-border border-t-2 border-t-[#EB6824] bg-slate-50/50 px-4 py-2 text-sm items-center ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB6824]/20 focus-visible:border-[#EB6824]/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all-smooth ${
          error ? 'border-red-500 focus-visible:ring-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}