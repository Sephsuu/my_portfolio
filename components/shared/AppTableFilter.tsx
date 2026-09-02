import { BellRing, Funnel, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";
import { Badge } from "../ui/badge";
import { AppButton } from "./AppButton";
import { Input } from "../ui/input";

const pages = [10, 20, 30, 40, 50, 100]

export function AppTableFilter({ setSearch, searchPlaceholder, setOpen, buttonLabel, size, setSize, removeAdd, filters, filter, setFilter, removeFilter, filteredNotifications, setShowNotif, className, search, removeSize, onSearchClick, searchButtonLabel, searchClassName }: {
    setSearch: (i: string) => void;
    searchPlaceholder: string;
    size: number;
    setSize: Dispatch<SetStateAction<number>>;
    removeAdd?: false | boolean;
    removeFilter?: false | boolean;
    setOpen?: Dispatch<SetStateAction<boolean>>;
    buttonLabel?: string;
    filters?: (string | { label: string; value: string })[];
    filter?: string;
    setFilter?: (value: string) => void;
    filteredNotifications?: readonly unknown[];
    setShowNotif?: Dispatch<SetStateAction<boolean>>;
    pageKey?: string
    className?: string;
    filterClassname?: string;
    search?: string
    removeSize?: false | boolean
    onSearchClick?: () => void;
    searchButtonLabel?: string;
    searchClassName?: string
}) {
    return (
        <div className={`flex items-center max-md:flex-col max-md:gap-2 ${className}`}>
            <div className="flex w-full items-center gap-2">
                <div className="relative w-100 max-md:w-full">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={search ?? ""}
                        className={`w-full rounded-md border-input bg-background py-1 pl-9 pr-3 shadow-xs ${searchClassName ?? ""}`}
                        placeholder={ searchPlaceholder }
                        onChange={ e => setSearch(e.target.value) }
                    />
                </div>
                {onSearchClick && (
                    <Button
                        type="button"
                        onClick={onSearchClick}
                        className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
                    >
                        <Search className="h-4 w-4" />
                        {searchButtonLabel}
                    </Button>
                )}
                <Select 
                    value={ String(size) }
                    onValueChange={(value) => setSize(Number(value))}
                >
                    <SelectTrigger className="hidden bg-background shadow-xs max-md:flex">
                        <SelectValue placeholder="20" />
                    </SelectTrigger>
                    <SelectContent className="w-fit!">
                        {pages.map((item, i) => (
                            <SelectItem value={ String(item) } key={i}>{ item }</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="ms-auto flex gap-2 max-md:w-full max-md:overflow-x-auto">
                {!removeSize && (
                    <div className="flex items-center gap-1 max-md:hidden">
                        <div className="text-sm text-muted-foreground">Showing</div>
                        <Select 
                            value={ String(size) }
                            onValueChange={(value) => setSize(Number(value))}
                        >
                            <SelectTrigger className="bg-background shadow-xs">
                                <SelectValue placeholder="20" />
                            </SelectTrigger>
                            <SelectContent>
                                {pages.map((item, i) => (
                                    <SelectItem value={ String(item) } key={i}>{ item }</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {!removeFilter && (
                    <Select
                        value={filter}
                        onValueChange={(value) => setFilter?.(value)}
                    >
                        <SelectTrigger className="bg-background shadow-xs">
                            <Funnel className="text-dark" />
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>

                        <SelectContent>
                            {filters?.map((item, i) => {
                                const value = typeof item === "string" ? item : item.value;
                                const label = typeof item === "string" ? item : item.label;

                                return (
                                <SelectItem key={i} value={value}>
                                    {label}
                                </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                )}
                {filteredNotifications && (
                    <Button 
                        onClick={ () => setShowNotif?.(true) }
                        className="my-auto border bg-background text-foreground shadow-sm hover:bg-accent"
                        size="sm"
                    >   
                        <BellRing className="text-dark" />
                        {filteredNotifications.length > 0 && (
                            <Badge variant="destructive">{ filteredNotifications.length }</Badge>
                        )}
                        
                    </Button>
                )}
                {!removeAdd && (
                    <AppButton
                        actionType="add"
                        onClick={ () => setOpen?.(prev => !prev) }
                        className="shadow-xs"
                    >
                        { buttonLabel }
                    </AppButton>
                )}
            </div>
        </div>
    )
}
