import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";

interface FormFieldProps {
    label: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormField({
    label,
    placeholder,
    type,
    value,
    onChange,
    ...props
}: FormFieldProps) {
    return (
        <div className="flex w-full max-w-sm items-center gap-1.5">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger
                        asChild
                        className="text-ellipsis overflow-hidden min-w-20 max-w-20"
                    >
                        <Label className="whitespace-nowrap text-sm text-gray-500">
                            {label}
                        </Label>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{label}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...props}
            />
        </div>
    );
}

export default FormField;