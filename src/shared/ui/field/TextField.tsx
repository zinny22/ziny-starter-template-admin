import { Input, Label } from "@/components/ui";
import { LucideIcon, XIcon } from "lucide-react";
import * as React from "react";
import { ReactNode, useEffect, useState } from "react";
import FormField from "./FormField";
import FieldControl from "./FieldControl";
import { cn } from "@/lib/utils";

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  icon?: LucideIcon;
  onChange?: (value: string) => void;
  error?: string;
  description?: string;
  endAdornment?: ReactNode;
}

function TextField({
  label,
  icon: Icon,
  className,
  error,
  description,
  endAdornment,
  ...props
}: TextFieldProps) {
  const [value, setValue] = useState<string>(props?.value?.toString() || "");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.onChange?.(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    props.onChange?.("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value.toString());
    }
  }, [props.value]);

  return (
    <FormField label={label} error={error} description={description}>
      <FieldControl
        icon={Icon}
        value={value}
        onClear={handleClear}
        endAdornment={endAdornment}
      >
        <Input
          ref={inputRef}
          {...props}
          value={value}
          onChange={handleChange}
          className={cn(
            "h-full flex-1 border-0 bg-transparent p-0 shadow-none",
            "focus-visible:ring-0 focus-visible:outline-none",
            className
          )}
        />
      </FieldControl>
    </FormField>
  );
}

export default TextField;
