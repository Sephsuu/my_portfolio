"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Ellipsis, Eye, SquarePen, Trash2 } from "lucide-react";

type AppTableActionsProps = {
    onView?: () => void;
    onUpdate?: () => void;
    onDelete?: () => void;
    viewLabel?: string;
    updateLabel?: string;
    deleteLabel?: string;
    showView?: boolean;
    showUpdate?: boolean;
    showDelete?: boolean;
    disabled?: boolean;
    className?: string;
};

export function AppTableActions({
    onView,
    onUpdate,
    onDelete,
    viewLabel = "View",
    updateLabel = "Edit",
    deleteLabel = "Void",
    showView = false,
    showUpdate = true,
    showDelete = true,
    disabled = false,
    className,
}: AppTableActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={disabled}
                    className={cn("size-8 rounded-full", className)}
                    aria-label="Open row actions"
                >
                    <Ellipsis className="size-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-36 p-1.5">
                {showView && (
                    <DropdownMenuItem onClick={onView} disabled={!onView} className="gap-2 px-2.5 py-2">
                        <Eye className="size-4 text-slate-600" />
                        {viewLabel}
                    </DropdownMenuItem>
                )}
                {showView && (showUpdate || showDelete) && <DropdownMenuSeparator />}
                {showUpdate && (
                    <DropdownMenuItem onClick={onUpdate} disabled={!onUpdate} className="gap-2 px-2.5 py-2">
                        <SquarePen className="size-4 text-darkgreen" />
                        {updateLabel}
                    </DropdownMenuItem>
                )}
                {showUpdate && showDelete && <DropdownMenuSeparator />}
                {showDelete && (
                    <DropdownMenuItem onClick={onDelete} disabled={!onDelete} className="gap-2 px-2.5 py-2 text-darkred!">
                        <Trash2 className="size-4 text-darkred" />
                        {deleteLabel}
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
