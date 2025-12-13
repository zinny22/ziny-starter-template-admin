import { ReactNode } from "react";
import { Label } from "../ui/label";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";

interface LabelFormProps {
    label: string;
    children: ReactNode;
}

function LabelForm({ label, children }: LabelFormProps) {
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
            {children}
        </div>
    );
}

export default LabelForm;