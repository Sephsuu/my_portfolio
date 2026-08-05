"use client";

import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export function MockDataNotice() {
    return (
        <Dialog defaultOpen>
            <DialogContent className="overflow-hidden rounded-none border-roast/15 bg-feather p-0 text-roast sm:max-w-md">
                <div className="h-1.5 bg-darkbrown" />
                <div className="p-6 pt-5 sm:p-7 sm:pt-6">
                    <DialogHeader>
                        <div className="flex items-center gap-3">
                            <div className="mb-2 flex size-11 items-center justify-center rounded-full bg-darkbrown/10 text-darkbrown">
                                <ShieldCheck className="size-5" aria-hidden="true" />
                            </div>
                            <DialogTitle className="text-xl">Mock data notice</DialogTitle>
                        </div>
                        <DialogDescription className="pt-1 text-base leading-relaxed text-roast/70">
                            The images showcased in this project use mock data because the actual project data is confidential.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="mt-6">
                        <DialogClose asChild>
                            <Button className="border bg-darkbrown text-white hover:bg-white hover:border-darkbrown hover:text-darkbrown rounded-none">
                                I understand
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
