import { Label } from "@/components/ui";
import { cn } from "@/lib/utils";
import { cloneElement, isValidElement, ReactElement } from "react";

type FormFieldProps = {
  label?: string;
  error?: string;
  disabled?: boolean;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
};

function FormField({
  label,
  error,
  disabled,
  description,
  required,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-3">
      {label && (
        <Label
          className={cn(
            "text-stone-500",
            error && "text-red-600",
            disabled && "opacity-50"
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      {isValidElement(children)
        ? cloneElement(children as ReactElement<any>, {
            error: !!error,
            disabled,
          })
        : children}

      {error && <p className="text-sm text-red-500">{error}</p>}
      {description && <p className="text-sm text-slate-500">{description}</p>}
    </div>
  );
}

export default FormField;
