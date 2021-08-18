import cn from "classnames";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  inputClassName?: string;
  parentClassName?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
}

const roundedClasses = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

const roundedLeftClasses = {
  sm: "rounded-l-sm",
  md: "rounded-l-md",
  lg: "rounded-l-lg",
  xl: "rounded-l-xl",
  "2xl": "rounded-l-2xl",
  "3xl": "rounded-l-3xl",
  full: "rounded-l-full",
};

const roundedRightClasses = {
  sm: "rounded-r-sm",
  md: "rounded-r-md",
  lg: "rounded-r-lg",
  xl: "rounded-r-xl",
  "2xl": "rounded-r-2xl",
  "3xl": "rounded-r-3xl",
  full: "rounded-r-full",
};

function InputGroup({
  label,
  error,
  className,
  inputClassName,
  leftElement,
  rightElement,
  parentClassName,
  rounded = "xl",
  ...props
}: InputProps) {
  const inputStyles = cn(
    "flex-1 border-0 focus:ring-0 focus:border-0",
    { [roundedLeftClasses[rounded]]: !leftElement },
    { [roundedRightClasses[rounded]]: !rightElement },
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
      <div className={cn(className, "flex w-full", roundedClasses[rounded])}>
        {leftElement && (
          <div
            className={cn(
              "flex items-center justify-center bg-white",
              roundedLeftClasses[rounded]
            )}
          >
            {leftElement}
          </div>
        )}
        <input
          id={props.id || label || props.name}
          className={inputStyles}
          {...props}
        />
        {rightElement && (
          <div
            className={cn(
              "flex items-center justify-center bg-white",
              roundedRightClasses[rounded]
            )}
          >
            {rightElement}
          </div>
        )}
      </div>
      <div className="h-3">
        <small className="text-red-500">{error}</small>
      </div>
    </div>
  );
}

export default InputGroup;
