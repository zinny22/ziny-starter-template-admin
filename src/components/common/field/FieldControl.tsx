import { cn } from "@/lib/utils";
import { LucideIcon, XIcon } from "lucide-react";
import { ReactNode } from "react";

type FieldControlProps = {
  icon?: LucideIcon;
  value?: string;
  onClear?: () => void;
  error?: string;
  disabled?: boolean;
  endAdornment?: ReactNode;
  children: ReactNode;
};

function FieldControl({
  icon: Icon,
  value,
  onClear,
  error,
  disabled,
  endAdornment,
  children,
}: FieldControlProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 h-12 px-3 rounded-md border transition-all",
        "bg-slate-50 dark:bg-slate-800",
        "border-slate-200 dark:border-slate-700",

        !disabled &&
          !error &&
          "focus-within:ring-2 focus-within:ring-indigo-600 focus-within:border-indigo-600",

        error && "border-red-500 focus-within:ring-2 focus-within:ring-red-500",

        disabled && "opacity-50 cursor-not-allowed bg-slate-100"
      )}
    >
      {Icon && (
        <Icon
          className={cn(
            "h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-all",
            error && " text-red-500"
          )}
        />
      )}

      {children}

      {endAdornment}

      {!endAdornment && value && onClear && !disabled && (
        <button
          type="button"
          onClick={onClear}
          className="text-slate-400 hover:text-slate-600"
          disabled={disabled}
        >
          <XIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default FieldControl;
