import cn from "classnames";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  color?: "red" | "orange" | "blue";
  link?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  align?: "center" | "start" | "end";
  justify?: "center" | "start" | "end";
}

function Button({
  children,
  className,
  link,
  color,
  leftIcon,
  rightIcon,
  align = "center",
  justify = "center",
  ...props
}: ButtonProps): React.ReactElement {
  const baseStyles = cn(
    `inline-flex items-${align} justify-${justify} font-semibold transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300`,
    className
  );

  const linkStyles = cn(
    baseStyles,
    "hover:bg-gray-200/50 active:bg-gray-200/80 focus:bg-gray-200/50"
  );

  const redStyles = cn(
    baseStyles,
    "bg-red-500/95 hover:bg-red-500/80 active:bg-red-600/90 active:text-opacity-90 focus:ring focus:ring-red-200"
  );

  const orangeStyles = cn(
    baseStyles,
    "bg-yellow-500/95 hover:bg-yellow-500/80 active:bg-yellow-600/90 active:text-opacity-90 focus:ring focus:ring-yellow-100"
  );

  const blueStyles = cn(
    baseStyles,
    "bg-lightBlue-400 hover:bg-lightBlue-400/90 active:bg-lightBlue-500/80 active:text-opacity-90 focus:ring focus:ring-lightBlue-100"
  );

  const getStyles = (): string => {
    if (link) return linkStyles;
    switch (color) {
      case "red":
        return redStyles;
      case "orange":
        return orangeStyles;
      case "blue":
        return blueStyles;
      default:
        return baseStyles;
    }
  };

  return (
    <button className={getStyles()} {...props}>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}

export default Button;
