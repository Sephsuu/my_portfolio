"use client"

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/custom/Loader";
import { SectionReveal } from "@/components/custom/SectionReveal";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { useFetchData } from "@/hooks/use-fetch-data";
import { fetchJsonData } from "@/lib/fetch-json-data";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { ProjectSummary } from "@/types/project";

const fetchProjects = () => fetchJsonData<ProjectSummary[]>("projects.json");

export function ExperienceSection() {
    const [projCount, setProjCount] = useState(3);
    const {
        data: projects,
        loading,
        error: loadError,
    } = useFetchData<ProjectSummary>(fetchProjects);

    return (
        <SectionReveal
            id="experiences"
            className="bg-feather scroll-mt-20 px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24"
        >
            <h2 className="text-roast mb-10 text-center text-3xl font-bold sm:mb-14 sm:text-4xl lg:text-5xl">
                Hands-on Experience
            </h2>

            {loading && (
                <Loader label="Loading projects..." />
            )}

            {loadError && (
                <p className="text-roast text-center" role="alert">
                    {loadError}
                </p>
            )}

            <div className="mx-auto max-w-340 space-y-14 sm:space-y-18 lg:space-y-24">
                {projects.slice(0, projCount).map((item, i) => (
                    <article
                        className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10 xl:gap-16"
                        key={item.id}
                    >
                        <div
                            className={`order-1 min-w-0 ${
                                i % 2 === 0 ? "lg:order-1" : "lg:order-2"
                            }`}
                        >
                            <Image
                                src={`/images/projects/${item.images[0]}`}
                                alt={`${item.title} project preview`}
                                width={1200}
                                height={684}
                                sizes="(max-width: 1024px) 100vw, 600px"
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
                            <Link
                                href={`/projects/${item.id}`}
                                className="text-roast text-xl font-bold leading-snug hover:underline sm:text-2xl lg:text-3xl"
                            >
                                {item.title}
                            </Link>
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
                            <div
                                className={`mt-4 flex flex-wrap gap-3 ${
                                    i % 2 !== 0 ? "lg:justify-end" : ""
                                }`}
                            >
                                {item.detailPath ? (
                                    <Button
                                        asChild
                                        className="bg-roast rounded-none text-base hover:border hover:border-black hover:bg-slate-50 hover:text-black sm:text-lg"
                                    >
                                        <Link href={`/projects/${item.id}`}>View More</Link>
                                    </Button>
                                ) : (
                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <Button
                                                className="bg-roast rounded-none text-base hover:border hover:border-black hover:bg-slate-50 hover:text-black sm:text-lg"
                                                disabled
                                            >
                                                View More
                                            </Button>
                                        </HoverCardTrigger>
                                        <HoverCardContent>
                                            This project case study is coming soon.
                                        </HoverCardContent>
                                    </HoverCard>
                                )}

                                {item.liveUrl && (
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="rounded-none border-roast bg-transparent text-base text-roast hover:bg-roast hover:text-white sm:text-lg"
                                    >
                                        <a
                                            href={item.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Live App
                                            <ExternalLink aria-hidden="true" />
                                        </a>
                                    </Button>
                                )}
                            </div>
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
