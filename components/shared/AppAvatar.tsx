import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function AppAvatar({ src, alt, className, fallback, fallbackClassName }: {
    src?: string;
    alt?: string;
    className?: string;
    fallback?: string;
    fallbackClassName?: string;
}) {
    return (
        <Avatar className={`${className}`}>
            <AvatarImage
                src={ src }
                alt={ alt }
            />
            <AvatarFallback className={fallbackClassName ?? "bg-primary text-primary-foreground"}>{fallback ?? "SP"}</AvatarFallback>
        </Avatar>
    )
} 
