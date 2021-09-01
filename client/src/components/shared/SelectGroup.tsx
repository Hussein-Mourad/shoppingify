import useOnClickOutside from "hooks/useOnClickOutside";
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
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLButtonElement[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  useOnClickOutside(ref, (e) => setShowOptions(false));
  let index=0;

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
    <div className={`${className} w-full relative h-20 group`} ref={ref}>
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
        onKeyDown={(e) =>
          e.key === "ArrowDown" && optionsRef.current[0].focus()
        }
        {...props}
      />
      {showOptions && filteredOptions.length > 0 && (
        <div
          className="absolute left-0 z-50 w-full p-2 transform translate-y-1 bg-white border border-gray-400 rounded-md shadow top-full"
         
        >
          {filteredOptions.map((option, index) => (
            <button
              key={option}
              className="block w-full px-3 py-2 text-left rounded-md focus:bg-gray-100 hover:bg-gray-100"
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
              ref={(ref) => optionsRef.current.push(ref as HTMLButtonElement)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      <small className="block mt-1 text-red-500">{error}</small>
    </div>
  );
}
