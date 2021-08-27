import {
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  useRef,
  useState,
} from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputClassName?: string;
  error?: string;
  options: string[];
  children?: ReactNode;
  onChange?: (e: any) => void;
}

export default function SelectGroup({
  className,
  inputClassName,
  label,
  error,
  options,
  children,
  onChange,
  ...props
}: Props): ReactElement {
  const [showOptions, setShowOptions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);

  const handleChange = (e: any) => {
    setShowOptions(true);
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    onChange && onChange(e);
  };
  return (
    <div className={`${className} w-full relative h-20`}>
      <label
        className="block mb-2 text-sm text-gray-800"
        htmlFor={props.id || label || props.name}
      >
        {label}
      </label>
      <input
        ref={inputRef}
        id={props.id || label || props.name}
        className={`${inputClassName} w-full rounded-xl border-gray-400`}
        onChange={handleChange}
        onBlur={() => {
          setShowOptions(false);
        }}
        {...props}
      />
      {showOptions && filteredOptions.length > 0 && (
        <div className="absolute left-0 z-50 w-full transform translate-y-1 bg-white border border-gray-400 rounded-md shadow top-full">
          {filteredOptions.map((option) => (
            <button
            key={option}
              className="block w-full px-3 py-2 text-left border border-b-gray-400 last-of-type:border-0"
              onClick={() => {
                let e = {
                  target: {
                    id: inputRef.current?.id,
                    name: inputRef.current?.name,
                    value: option,
                  },
                };
                onChange && onChange(e);
                setShowOptions(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      {/* <select
        id={props.id || label || props.name}
        className={`${inputClassName} w-full rounded-xl border-gray-400`}
        {...props}
      >
        {options
          ? options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))
          : children}
      </select> */}
      <small className="block mt-1 text-red-500">{error}</small>
    </div>
  );
}
