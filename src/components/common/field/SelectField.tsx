import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { LucideIcon, XIcon } from "lucide-react";
import * as React from "react";
import { ReactNode, useEffect, useState } from "react";
import FormField from "./FormField";
import FieldControl from "./FieldControl";
import { cn } from "@/lib/utils";

export interface SelectFieldProps {
  label: string;
  icon?: LucideIcon;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  description?: string;
  endAdornment?: ReactNode;
  className?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}

function SelectField({
  label,
  icon: Icon,
  className,
  error,
  description,
  endAdornment,
  options,
  value: controlledValue,
  onChange,
  placeholder,
}: SelectFieldProps) {
  const [value, setValue] = useState(controlledValue ?? "");

  const handleChange = (nextValue: string) => {
    setValue(nextValue);
    onChange?.(nextValue);
  };

  const handleClear = () => {
    setValue("");
    onChange?.("");
  };

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  return (
    <FormField label={label} error={error} description={description}>
      <FieldControl
        icon={Icon}
        value={value}
        onClear={handleClear}
        endAdornment={endAdornment}
      >
        <Select value={value} onValueChange={handleChange}>
          <SelectTrigger
            className={cn(
              "h-full w-full !border-0 !bg-transparent !p-0 shadow-none",
              "focus:ring-0 focus:outline-none",
              className
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FieldControl>
    </FormField>
  );
}

export default SelectField;
