import Image from "next/image"

import { Button } from "@/components/ui/button"
import { FloatingPortfolioChat } from "@/features/playground/FloatingPortfolioChat"

export function HeroSection() {
    return (
        <section
            id="home"
            className="bg-feather relative isolate mx-auto min-h-[calc(100svh-4rem)] max-w-360 scroll-mt-16 overflow-hidden"
        >
            <div
                className="absolute inset-0 z-0"
                style={{
                background:
                    "radial-gradient(125% 125% at 50% 90%, var(--background) 40%, #deccc1 100%)",
                }}
            />
            <div className="absolute inset-y-0 left-0 hidden w-1/2 bg-[radial-gradient(ellipse_60%_18%_at_50%_100%,rgba(73,61,51,0.2)_0%,transparent_70%),radial-gradient(ellipse_75%_65%_at_50%_35%,#ddd7cf_0%,#c9c1b6_52%,#ada397_100%)] md:block" />

            <div className="relative z-10 grid min-h-[calc(100svh-4rem)] md:grid-cols-2">
                <div className="relative order-2 min-h-[min(100vw,32rem)] bg-[radial-gradient(ellipse_60%_18%_at_50%_100%,rgba(73,61,51,0.2)_0%,transparent_70%),radial-gradient(ellipse_75%_65%_at_50%_35%,#ddd7cf_0%,#c9c1b6_52%,#ada397_100%)] md:order-1 md:min-h-0 md:bg-transparent">
                    <Image
                        src="/images/sephsuu2.png"
                        alt="Joseph Bataller"
                        fill
                        priority
                        sizes="(max-width: 800px) 120vw, 70vw"
                        className="origin-bottom scale-125 object-contain object-bottom md:scale-[1.2] mt-8"
                    />
                    <FloatingPortfolioChat />
                </div>

                <div className="order-1 flex min-w-0 flex-col px-5 pb-12 sm:px-10 md:order-2 md:px-10 md:pb-20 lg:px-14">
                    <div className="flex flex-1 flex-col items-center justify-center pt-16 pb-0 text-center md:items-start md:py-10 md:text-left">
                        <h1 className="text-roast max-w-xl text-[clamp(2.5rem,11vw,4.5rem)] leading-[1.05] font-bold tracking-tight md:text-[clamp(2.25rem,3.4vw,3.5rem)]">
                            Building scalable apps with user-first design.
                        </h1>
                        <p className="text-roast/80 mt-5 max-w-xl text-lg leading-relaxed sm:text-xl md:text-[clamp(1.125rem,1.5vw,1.375rem)]">
                            Motivated IT student with nearly 4 years of hands-on
                            experience in full-stack web development.
                        </p>
                        <Button
                            asChild
                            className="mt-7 h-auto bg-roast px-6 py-3 text-base text-white hover:bg-black/85 sm:text-lg"
                        >
                            <a href="/files/BATALLER_CV.pdf" download>
                                Download CV
                            </a>
                        </Button>
                    </div>
                </div>
            </div>

            <div
                aria-hidden="true"
                className="pointer-events-none absolute right-2 bottom-2 z-20 text-right font-black text-transparent [-webkit-text-stroke:1px_#58382a] text-[clamp(3.25rem,14vw,8rem)] leading-[0.78] arial-black sm:right-4 md:[-webkit-text-stroke:1.5px_#58382a] md:text-[clamp(5rem,8vw,8rem)]"
            >
                <div>JOSEPH</div>
                <div>EMANUEL</div>
            </div>

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 md:[clip-path:inset(0_50%_0_0)]"
            >
                <div className="absolute right-2 bottom-2 text-right font-black text-transparent [-webkit-text-stroke:1px_#fff] text-[clamp(3.25rem,14vw,8rem)] leading-[0.78] arial-black sm:right-4 md:[-webkit-text-stroke:1.5px_#fff] md:text-[clamp(5rem,8vw,8rem)]">
                    <div>JOSEPH</div>
                    <div>EMANUEL</div>
                </div>
            </div>
        </section>
    )
}
