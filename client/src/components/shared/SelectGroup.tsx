import { ReactElement, ReactNode, SelectHTMLAttributes } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  inputClassName?: string;
  error?: string;
  options?: string[];
  children?: ReactNode;
}

export default function SelectGroup({
  className,
  inputClassName,
  label,
  error,
  options,
  children,
  ...props
}: Props): ReactElement {
  return (
    <div className={`${className} w-full`}>
      <label
        className="block mb-2 text-sm text-gray-800"
        htmlFor={props.id || label || props.name}
      >
        {label}
      </label>
      <select
        id={props.id || label || props.name}
        className={`${inputClassName} w-full resize-none rounded-xl border-gray-400`}
        {...props}
      >
        {options
          ? options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))
          : children}
      </select>
      <small className="block mt-1 text-red-500">{error}</small>
    </div>
  );
}
