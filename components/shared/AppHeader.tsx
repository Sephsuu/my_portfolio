'use client'

import { ChevronsLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function AppHeader({ label, className, hidePapiverseLogo, spanLabel, removeBackButton }: {
    label: string;
    spanLabel?: string
    className?: string
    hidePapiverseLogo?: false | boolean
    removeBackButton?: false | boolean
}) {
    const router = useRouter()

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            
                {!removeBackButton && (
                    <div 
                        className="rounded-full p-2 bg-white border"
                        onClick={() => router.back()}
                    >
                        <ChevronsLeft
                            className="cursor-pointer text-darkbrown"
                            // fill="#653818"
                        />
                    </div>
                )}
     
            {/* <Image
                src="/images/kp_logo.png"
                alt="KP Logo"
                width={40}
                height={40}
            /> */}
            <div className="text-xl font-semibold">{ label } <span className="text-darkbrown">{spanLabel}</span></div>
            {!hidePapiverseLogo && (
                <Image
                    src="/images/papiverse_logo.png"
                    alt="KP Logo"
                    width={100}
                    height={100}
                    className="ms-auto max-sm:hidden"
                />
            )}
        </div>
    )
}