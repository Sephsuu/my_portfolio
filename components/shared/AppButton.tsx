import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import { ComponentProps, ReactNode } from "react";

export type AppButtonActionType = "add" | "update" | "delete";

type AppButtonProps = ComponentProps<typeof Button> & {
    actionType?: AppButtonActionType;
    icon?: ReactNode;
    iconClassName?: string;
    label?: ReactNode;
    onProcess?: boolean;
    loadingLabel?: ReactNode;
};

const ACTION_STYLES: Record<AppButtonActionType, string> = {
    add: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
    update: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
    delete: "bg-destructive text-white shadow-xs hover:bg-destructive/90",
};

const ACTION_ICONS: Record<AppButtonActionType, ReactNode> = {
    add: <Plus className="w-4 h-4" />,
    update: <SquarePen className="w-4 h-4" />,
    delete: <Trash2 className="w-4 h-4" />,
};

export function AppButton({
    actionType,
    icon,
    iconClassName,
    label,
    onProcess = false,
    loadingLabel,
    disabled,
    className,
    children,
    asChild,
    ...props
}: AppButtonProps) {
    const resolvedIcon = icon ?? (actionType ? ACTION_ICONS[actionType] : null);

    if (asChild) {
        return (
            <Button
                asChild
                className={cn(actionType ? ACTION_STYLES[actionType] : "", className)}
                disabled={disabled || onProcess}
                {...props}
            >
                {children}
            </Button>
        );
    }

    return (
        <Button
            className={cn(actionType ? ACTION_STYLES[actionType] : "", className)}
            disabled={disabled || onProcess}
            {...props}
        >
            {onProcess ? (
                <span
                    className={cn(
                        "inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent",
                        iconClassName
                    )}
                    aria-hidden="true"
                />
            ) : resolvedIcon ? (
                <span className={cn("inline-flex", iconClassName)}>{resolvedIcon}</span>
            ) : null}
            {onProcess ? (loadingLabel ?? label ?? children) : (label ?? children)}
        </Button>
    );
}
