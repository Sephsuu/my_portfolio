import Image from "next/image"

import { Button } from "@/components/ui/button"

export function HeroSection() {
    return (
        <section
            id="home"
            className="relative isolate mx-auto min-h-[calc(100svh-4rem)] max-w-360 scroll-mt-16 overflow-hidden"
        >
            <div className="absolute inset-y-0 left-0 hidden w-1/2 bg-slate-100 md:block" />

            <div className="relative z-10 grid min-h-[calc(100svh-4rem)] md:grid-cols-2">
                <div className="relative order-2 min-h-[min(100vw,32rem)] bg-slate-100 md:order-1 md:min-h-0 md:bg-transparent">
                    <Image
                        src="/images/hero.png"
                        alt="Joseph Bataller"
                        fill
                        priority
                        sizes="(max-width: 767px) 100vw, 50vw"
                        className="object-contain object-bottom md:object-left-bottom"
                    />
                </div>

                <div className="order-1 flex min-w-0 flex-col px-5 pb-12 sm:px-10 md:order-2 md:px-10 md:pb-20 lg:px-14">
                    <div className="flex flex-1 flex-col items-center justify-center pt-16 pb-0 text-center md:items-start md:py-10 md:text-left">
                        <h1 className="max-w-xl text-[clamp(2.5rem,11vw,4.5rem)] leading-[1.05] font-bold tracking-tight md:text-[clamp(2.25rem,3.4vw,3.5rem)]">
                            Building scalable apps with user-first design.
                        </h1>
                        <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-700 sm:text-xl md:text-[clamp(1.125rem,1.5vw,1.375rem)]">
                            Motivated IT student with nearly 4 years of hands-on
                            experience in full-stack web development.
                        </p>
                        <Button
                            asChild
                            className="mt-7 h-auto bg-black px-6 py-3 text-base text-white hover:bg-black/85 sm:text-lg"
                        >
                            <a href="/files/BATALLER_RESUME.pdf" download>
                                Download CV
                            </a>
                        </Button>
                    </div>
                </div>
            </div>

            <div
                aria-hidden="true"
                className="pointer-events-none absolute right-2 bottom-2 z-20 text-right font-black text-transparent mix-blend-difference [-webkit-text-stroke:1px_#f8fafc] [font-size:clamp(3.25rem,14vw,8rem)] leading-[0.78] arial-black sm:right-4 md:mix-blend-normal md:[-webkit-text-stroke:1.5px_#0f172a] md:[font-size:clamp(5rem,8vw,8rem)]"
            >
                <div>JOSEPH</div>
                <div>BATALLER</div>
            </div>
        </section>
    )
}
