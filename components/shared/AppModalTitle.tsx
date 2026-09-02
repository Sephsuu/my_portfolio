import Image from "next/image";
import { cn } from "@/lib/utils";
import { DialogTitle } from "../ui/dialog";

interface AppModalTitleProps {
    logoSrc?: string;
    logoAlt?: string;

    title?: string;
    microTitle?: string;
    description?: string;
    spanLabel?: string;

    className?: string;
    headerClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    spanClassName?: string;

    logoWidth?: number;
    logoHeight?: number;
}

export function AppModalTitle({
    logoSrc = "/images/kp_logo.png",
    logoAlt = "Organization Logo",

    title = '',
    microTitle,
    description,
    spanLabel,

    className,
    headerClassName,
    titleClassName,
    descriptionClassName,
    spanClassName,

    logoWidth = 40,
    logoHeight = 40,
}: AppModalTitleProps) {
    return (
        <DialogTitle
            className={cn(
                className
            )}
        >
            <div
                className={cn(
                    "flex items-start gap-3",
                    headerClassName
                )}
            >
                <Image
                    src={logoSrc}
                    alt={logoAlt}
                    width={logoWidth}
                    height={logoHeight}
                    className="object-contain shrink-0"
                />

                <div className="min-w-0">
                    {microTitle && (
                        <p className="-mb-1 text-[0.625rem] font-semibold uppercase tracking-wider text-muted-foreground">{microTitle}</p>
                    )}

                    <div className="flex items-center">
                        <h2
                            className={cn(
                                "text-xl font-semibold",
                                titleClassName
                            )}
                        >
                            {title}

                            {spanLabel && (
                                <span
                                    className={cn(
                                        `text-xl font-semibold text-primary ${title === '' ? '' : 'ml-1.5'}`,
                                        spanClassName
                                    )}
                                >
                                    {spanLabel}
                                </span>
                            )}
                        </h2>
                        
                        
                    </div>

                    {description && (
                        <p
                            className={cn(
                                "text-sm text-muted-foreground",
                                descriptionClassName
                            )}
                        >
                            {description}
                        </p>
                    )}

                </div>
            </div>
        </DialogTitle>
    );
}
