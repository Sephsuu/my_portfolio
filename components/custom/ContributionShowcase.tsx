"use client";

import Image from "next/image";
import { useState } from "react";
import { AppTabSwitcher } from "@/components/custom/AppTabSwitcher";
import { cn } from "@/lib/utils";
import type { ProjectContributor } from "@/types/project";

type ContributionShowcaseProps = {
    contributors: ProjectContributor[];
};

export function ContributionShowcase({ contributors }: ContributionShowcaseProps) {
    const [activeId, setActiveId] = useState(contributors[0]?.id ?? "");
    const contributor =
        contributors.find((item) => item.id === activeId) ?? contributors[0];

    if (!contributor) return null;

    const midpoint = Math.ceil(contributor.contributions.length / 2);
    const contributionGroups = [
        contributor.contributions.slice(0, midpoint),
        contributor.contributions.slice(midpoint),
    ];

    return (
        <section id="developers" className="relative isolate scroll-mt-0 overflow-hidden bg-[#281710] px-4 text-[#f7eadc] sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-160 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8f5638]/20 blur-3xl" />

            <div className="mx-auto max-w-340 pt-8 sm:pt-10">
                <AppTabSwitcher
                    tabs={contributors.map((item) => ({
                        key: item.id,
                        title: item.tabLabel,
                    }))}
                    selectedTab={activeId}
                    setSelectedTab={setActiveId}
                    className="relative z-40 mx-auto w-fit"
                />

                <div
                    key={contributor.id}
                    className="relative mt-8 grid animate-in gap-8 fade-in slide-in-from-bottom-6 duration-500 ease-out motion-reduce:animate-none sm:mt-10 sm:gap-10 lg:-mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.85fr)_minmax(0,1fr)] lg:items-center lg:gap-8"
                >
                    <div className="relative z-20 order-1 space-y-8 lg:pb-24">
                        <div className="lg:max-w-92">
                            <p className="text-xs font-bold tracking-[0.24em] uppercase text-[#d9b38c]">
                                {contributor.role}
                            </p>
                            <h2 className="mt-2 text-2xl font-bold">{contributor.focusAreas[0]}</h2>
                        </div>
                        {contributionGroups[0].map((contribution, index) => (
                            <div key={contribution} className="group grid grid-cols-[2.5rem_1fr] gap-4 lg:max-w-92">
                                <span className="font-mono text-sm text-white">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <p className="border-t border-[#f7eadc]/20 pt-3 leading-relaxed text-[#f7eadc]/75 transition-colors group-hover:text-[#f7eadc]">
                                    {contribution}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="relative z-10 order-3 mx-auto flex h-160 w-full max-w-130 items-end justify-center self-end sm:h-185 lg:order-2 lg:h-205">
                        <Image
                            key={contributor.image}
                            src={contributor.image}
                            alt={contributor.imageAlt}
                            width={1600}
                            height={2400}
                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 420px, 520px"
                            className={cn(
                                "h-full w-auto max-w-none object-contain object-bottom drop-shadow-[0_18px_35px_rgba(0,0,0,0.28)]",
                                contributor.id === "backend" && "-mb-20"
                            )}
                        />
                    </div>

                    <div className="relative z-20 order-2 space-y-8 lg:order-3 lg:pb-24">
                        <div className="lg:ml-auto lg:max-w-92">
                            <p className="text-xs font-bold tracking-[0.24em] uppercase text-[#d9b38c]">
                                {contributor.role}
                            </p>
                            <h2 className="mt-2 text-2xl font-bold">{contributor.focusAreas[1]}</h2>
                        </div>
                        {contributionGroups[1].map((contribution, index) => (
                            <div key={contribution} className="group grid grid-cols-[2.5rem_1fr] gap-4 lg:ml-auto lg:max-w-92">
                                <span className="font-mono text-sm text-white">
                                    {String(index + midpoint + 1).padStart(2, "0")}
                                </span>
                                <p className="border-t border-[#f7eadc]/20 pt-3 leading-relaxed text-[#f7eadc]/75 transition-colors group-hover:text-[#f7eadc]">
                                    {contribution}
                                </p>
                            </div>
                        ))}
                    </div>

                    <p
                        aria-hidden="true"
                        className="arial-black pointer-events-none absolute bottom-[3%] left-1/2 z-30 -translate-x-1/2 whitespace-nowrap text-[clamp(3rem,9vw,8rem)] font-black leading-none tracking-[-0.065em]"
                        style={{
                            color: "rgba(255, 248, 240, 0.16)",
                            backgroundImage:
                                "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(217,179,140,0.12) 34%, rgba(255,244,232,0.32) 58%, rgba(151,105,80,0.1) 78%, rgba(255,248,240,0.28) 100%)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textShadow:
                                "0 -1px 1px rgba(255, 255, 255, 0.42), 0 1px 2px rgba(123, 83, 62, 0.3), 0 8px 24px rgba(0, 0, 0, 0.34)",
                        }}
                    >
                        {contributor.name}
                    </p>
                </div>
            </div>
        </section>
    );
}
