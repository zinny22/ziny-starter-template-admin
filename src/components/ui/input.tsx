import * as React from "react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  iconClick?: () => void;
}

function Input({
  className,
  type,
  icon,
  iconPosition,
  iconClick,
  ...props
}: InputProps) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          icon && iconPosition === "start" && "pl-10",
          icon && iconPosition === "end" && "pr-10",
          className
        )}
        {...props}
      />
      {iconPosition === "start" && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2"
          onClick={iconClick}
        >
          {icon}
        </button>
      )}
      {iconPosition === "end" && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2"
          onClick={iconClick}
        >
          {icon}
        </button>
      )}
    </div>
  );
}

export { Input };
