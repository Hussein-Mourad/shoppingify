import cn from "classnames";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  inputClassName?: string;
  parentClassName?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
};

function InputGroup({
  label,
  error,
  className,
  inputClassName,
  leftElement,
  rightElement,
  parentClassName,
  ...props
}: InputProps) {
  const inputStyles = cn(
    "flex-1 border-0 focus:ring-0 focus:border-0",
    { "rounded-l-xl": !leftElement },
    { "rounded-r-xl": !rightElement },
    inputClassName
  );

  return (
    <div className={parentClassName}>
      <label
        className="block mb-2 text-sm text-gray-800"
        htmlFor={props.id || label || props.name}
      >
        {label}
      </label>
      <div className={cn(className, "flex w-full rounded-xl")}>
        {leftElement && (
          <div className="flex items-center justify-center bg-white rounded-l-xl">
            {leftElement}
          </div>
        )}
        <input
          id={props.id || label || props.name}
          className={inputStyles}
          {...props}
        />
        {rightElement && (
          <div className="flex items-center justify-center bg-white rounded-r-xl">
            {rightElement}
          </div>
        )}
      </div>
      <small className="block mt-1 text-red-500">{error}</small>
    </div>
  );
}

export default InputGroup;
