import Image from "next/image"
import { BriefcaseBusiness, Code2, Layers3 } from "lucide-react"

import { SectionReveal } from "@/components/custom/SectionReveal"

const highlights = [
    {
        value: "4 years",
        label: "Web development experience",
        icon: Code2,
    },
    {
        value: "10 months",
        label: "Professional experience",
        icon: BriefcaseBusiness,
    },
    {
        value: "10+",
        label: "Software projects completed",
        icon: Layers3,
    },
]

export function EducationSection() {
    return (
        <SectionReveal
            id="education"
            className="relative isolate scroll-mt-20 overflow-hidden border-b bg-feather"
        >
            <div
                aria-hidden="true"
                className="absolute inset-y-0 right-0 -z-10 w-3/4 bg-[linear-gradient(to_left,rgba(222,204,193,0.6),transparent)]"
            />

            <div className="mx-auto grid max-w-360 items-stretch lg:min-h-170 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="relative min-h-125 overflow-hidden bg-[#c9c0b6] sm:min-h-155 lg:order-2 lg:min-h-full">
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[radial-gradient(ellipse_68%_20%_at_42%_100%,rgba(56,43,35,0.24)_0%,transparent_72%),linear-gradient(145deg,#e1dbd3_0%,#c9c0b6_58%,#aaa095_100%)]"
                    />

                    <div
                        aria-hidden="true"
                        className="absolute top-[7%] -right-[12%] z-10 h-[30%] w-[72%] rounded-[50%] bg-white/45 blur-[50px] lg:blur-[65px]"
                    />
                    <div
                        aria-hidden="true"
                        className="absolute top-[31%] right-[1%] z-10 h-[20%] w-[58%] -rotate-12 rounded-[50%] bg-feather/55 blur-[42px] lg:blur-[58px]"
                    />
                    <div
                        aria-hidden="true"
                        className="absolute right-[4%] bottom-[18%] z-10 h-[24%] w-[66%] rotate-6 rounded-[50%] bg-white/35 blur-[50px] lg:blur-[68px]"
                    />

                    <Image
                        src="/images/sephsuu_pajah.png"
                        alt="Joseph Emanuel Bataller in graduation attire"
                        fill
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="z-20 object-contain object-bottom drop-shadow-[0_20px_28px_rgba(52,40,33,0.25)]"
                    />

                    <div
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 z-30 w-[42%] bg-[linear-gradient(to_right,rgba(250,249,246,0.9)_0%,rgba(250,249,246,0.34)_43%,transparent_100%)] blur-sm"
                    />
                    <div
                        aria-hidden="true"
                        className="absolute bottom-[8%] left-[2%] z-30 h-[15%] w-[44%] rotate-6 rounded-[50%] bg-feather/65 blur-[38px]"
                    />

                    <div className="absolute bottom-5 left-5 z-40 rounded-2xl border border-white/40 bg-white/70 p-4 shadow-xl backdrop-blur-md sm:bottom-8 sm:left-8 sm:max-w-xs sm:p-5">
                        <p className="text-xs font-bold tracking-[0.16em] text-roast/60 uppercase">
                            Academic distinction
                        </p>
                        <p className="mt-1 text-lg font-bold text-roast">
                            Excellence grounded in practical experience.
                        </p>
                    </div>
                </div>

                <div className="relative flex flex-col justify-center overflow-hidden px-5 py-16 sm:px-10 sm:py-20 lg:order-1 lg:px-14 lg:py-24 xl:px-20">
                    <div
                        aria-hidden="true"
                        className="absolute top-[12%] -left-[10%] -z-10 h-40 w-[70%] rounded-full bg-[#d8cec4]/40 blur-[70px]"
                    />
                    <div
                        aria-hidden="true"
                        className="absolute right-0 bottom-[8%] -z-10 h-52 w-[60%] rounded-full bg-white/75 blur-[80px]"
                    />
                    <div className="mb-5 flex items-center gap-3 text-sm font-bold tracking-[0.18em] text-roast uppercase">
                        Graduate of
                    </div>

                    <h2 className="max-w-3xl text-4xl leading-[1.08] font-bold tracking-tight text-roast sm:text-5xl lg:text-[3.5rem]">
                        Bachelor of Science in Information Technology
                    </h2>

                    <span className="font-bold text-2xl italic mt-4">Magna Cum Laude</span>
                  

                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-roast/70 sm:text-lg">
                        A strong academic foundation shaped by hands-on work across
                        frontend, backend, and database development—turning ideas
                        into thoughtful, reliable digital products.
                    </p>

                    <div className="mt-10 grid gap-3 sm:grid-cols-3 sm:gap-4">
                        {highlights.map(({ value, label }) => (
                            <div
                                key={label}
                                className="flex flex-col justify-center group rounded-2xl border border-roast/10 bg-white/80 p-5 shadow-[0_12px_35px_-24px_rgba(88,56,42,0.55)] transition duration-300 hover:-translate-y-1 hover:border-roast/25 hover:shadow-[0_18px_40px_-22px_rgba(88,56,42,0.5)]"
                            >
                                <p className="text-2xl font-bold text-roast sm:text-xl xl:text-2xl">
                                    {value}
                                </p>
                                <p className="mt-1 text-sm leading-snug text-roast/65">
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </SectionReveal>
    )
}
