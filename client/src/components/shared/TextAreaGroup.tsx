import { ReactElement, TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  inputClassName?: string;
  className?: string;
  error?: string;
}

function TextAreaGroup({
  label,
  className,
  inputClassName,
  error,
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
      <textarea
        id={props.id || label || props.name}
        className={`${inputClassName} w-full rounded-xl border-gray-400`}
        {...props}
      />
      <small className="block mt-1 text-red-500">{error}</small>
    </div>
  );
}

export default TextAreaGroup;
