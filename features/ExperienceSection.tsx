"use client"

import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/custom/SectionReveal";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { projects } from "@/data/projects";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

export function ExperienceSection() {
    const [projCount, setProjCount] = useState(3);
    return (
        <SectionReveal
            id="experiences"
            className="bg-feather scroll-mt-20 px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24"
        >
            <h2 className="text-roast mb-10 text-center text-3xl font-bold sm:mb-14 sm:text-4xl lg:text-5xl">
                Hands-on Experience
            </h2>

            <div className="mx-auto max-w-340 space-y-14 sm:space-y-18 lg:space-y-24">
                {projects.slice(0, projCount).map((item, i) => (
                    <article
                        className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10 xl:gap-16"
                        key={item.title}
                    >
                        <div
                            className={`order-1 min-w-0 ${
                                i % 2 === 0 ? "lg:order-1" : "lg:order-2"
                            }`}
                        >
                            <img
                                src={`/images/projects/${item.images[0]}`}
                                alt={`${item.title} project preview`}
                                className="mx-auto h-auto w-full max-w-150 rounded-xl border border-slate-300 object-cover shadow-md"
                            />
                        </div>
                        <div
                            className={`order-2 flex min-w-0 flex-col items-start text-left ${
                                i % 2 === 0
                                    ? "lg:order-2"
                                    : "lg:order-1 lg:items-end lg:text-right"
                            }`}
                        >
                            <h3 className="text-roast text-xl font-bold leading-snug hover:underline sm:text-2xl lg:text-3xl">
                                {item.title}
                            </h3>
                            <Separator className="my-3 bg-slate-300" />
                            <p className="leading-relaxed text-roast/80 sm:text-lg">
                                {item.description}
                            </p>
                            <div
                                className={`mt-5 flex flex-wrap gap-x-1.5 gap-y-1 ${
                                    i % 2 !== 0 ? "lg:justify-end" : ""
                                }`}
                            >
                                <span className="text-roast font-bold">Technologies:</span>
                                {item.technologies.map((tech) => (
                                    <Fragment key={tech}>
                                        <span className="text-roast hover:font-bold hover:underline">
                                            {tech},
                                        </span>
                                    </Fragment>
                                ))}
                            </div>
                            <div className="mt-2">
                                <span className="mr-2 font-bold text-roast">Role:</span>
                                <span className="text-roast">{item.role}</span>
                            </div>
                            <HoverCard>
                                <HoverCardTrigger>
                                    <Button
                                        className="bg-roast mt-4 rounded-none text-base hover:border hover:border-black hover:bg-slate-50 hover:text-black sm:text-lg"
                                        disabled
                                    >
                                        View More
                                    </Button>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    Viewing of project is unavailable as of the moment.
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </article>
                ))}
            </div>

            {projCount < projects.length && (
                <button
                    onClick={() => setProjCount(prev => prev + 3)}
                    className="mx-auto mt-14 flex items-center justify-center text-2xl underline transition-opacity hover:opacity-60 sm:mt-18 sm:text-3xl lg:text-4xl"
                >
                    See More
                </button>
            )}

        </SectionReveal>
    )
}
