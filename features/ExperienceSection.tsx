"use client"

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/custom/Loader";
import { SectionReveal } from "@/components/custom/SectionReveal";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useFetchData } from "@/hooks/use-fetch-data";
import { fetchJsonData } from "@/lib/fetch-json-data";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { ProjectSummary } from "@/types/project";

const fetchProjects = () => fetchJsonData<ProjectSummary[]>("projects.json");

export function ExperienceSection() {
    const [projCount, setProjCount] = useState(3);
    const [selectedFrames, setSelectedFrames] = useState<Record<string, number>>({});
    const {
        data: projects,
        loading,
        error: loadError,
    } = useFetchData<ProjectSummary>(fetchProjects);

    return (
        <SectionReveal
            id="experiences"
            className="relative isolate scroll-mt-20 overflow-hidden border-b bg-feather px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        >
            <div
                aria-hidden="true"
                className="absolute top-0 right-0 -z-10 h-120 w-2/3 bg-[radial-gradient(ellipse_at_top_right,rgba(222,204,193,0.62),transparent_68%)]"
            />

            <header className="mx-auto mb-12 max-w-340 sm:mb-16">
                <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr] lg:items-end">
                    <h2 className="max-w-3xl text-4xl leading-[1.08] font-bold tracking-tight text-roast sm:text-5xl lg:text-[3.5rem]">
                        Experience built through real-world projects.
                    </h2>
                </div>
            </header>

            {loading && (
                <Loader label="Loading projects..." />
            )}

            {loadError && (
                <p className="text-roast text-center" role="alert">
                    {loadError}
                </p>
            )}

            <div className="mx-auto max-w-340 space-y-6 sm:space-y-8">
                {projects.slice(0, projCount).map((item, i) => (
                    <article
                        className="group grid rounded-3xl transition-all duration-500 ease-out hover:-translate-y-1 hover:border-roast/20 lg:grid-cols-2"
                        key={item.id}
                    >
                        <div
                            className={`relative min-h-90 min-w-0 sm:min-h-115 ${
                                i % 2 === 0 ? "lg:order-1" : "lg:order-2"
                            }`}
                        >
                            {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.7),transparent_40%),linear-gradient(145deg,#ded7ce,#b9ada1)]" /> */}

                            <div className="absolute inset-0 flex items-center justify-center px-6 py-14 sm:px-10">
                                {item.images.slice(0, 3).map((image, imageIndex) => {
                                    const isSelected = selectedFrames[item.id] === imageIndex
                                    const frameStyles = [
                                        "z-1 -translate-x-[31%] -translate-y-[11%] -rotate-8 group-hover:-translate-x-[34%] group-hover:-rotate-10",
                                        "z-2 translate-x-[31%] -translate-y-[8%] rotate-8 group-hover:translate-x-[34%] group-hover:rotate-10",
                                        "z-3 translate-y-[15%] -rotate-1 group-hover:translate-y-[12%] group-hover:rotate-0",
                                    ]

                                    return (
                                        <button
                                            type="button"
                                            key={`${image}-${imageIndex}`}
                                            onClick={() =>
                                                setSelectedFrames((current) => ({
                                                    ...current,
                                                    [item.id]: imageIndex,
                                                }))
                                            }
                                            aria-label={`Bring ${item.title} screenshot ${imageIndex + 1} to front`}
                                            aria-pressed={isSelected}
                                            className={`group/frame absolute w-[72%] max-w-105 cursor-pointer bg-[#fffdf8] p-2 pb-8 shadow-[0_18px_30px_-12px_rgba(54,42,34,0.5)] transition-all duration-500 ease-out hover:scale-[1.03] hover:shadow-[0_24px_40px_-12px_rgba(54,42,34,0.5)] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-roast sm:w-[64%] sm:p-3 sm:pb-10 ${frameStyles[imageIndex]} ${
                                                isSelected
                                                    ? "ring-2 ring-roast/25 shadow-[0_28px_45px_-12px_rgba(54,42,34,0.55)]"
                                                    : ""
                                            }`}
                                            style={{ zIndex: isSelected ? 1000 : imageIndex + 1 }}
                                        >
                                            <div className="relative aspect-[24/16] overflow-hidden bg-stone-200">
                                                <Image
                                                    src={`/images/projects/${image}`}
                                                    alt={`${item.title} project screenshot ${imageIndex + 1}`}
                                                    fill
                                                    sizes="(max-width: 1024px) 70vw, 420px"
                                                    className="object-cover transition-transform duration-700 ease-out group-hover/frame:scale-[1.025]"
                                                />
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>

                            <span className="absolute top-5 left-5 z-10 rounded-full border border-white/40 bg-white/85 px-4 py-2 text-xs font-bold tracking-wider text-roast uppercase shadow-sm backdrop-blur-md transition-all duration-300 group-hover:bg-white">
                                {item.projectType}
                            </span>
                        </div>
                        <div
                            className={`flex min-w-0 flex-col items-start justify-center p-6 text-left border border-roast/10 bg-white/75 rounded-xl shadow-[0_20px_55px_-38px_rgba(88,56,42,0.65)] backdrop-blur-sm sm:p-9 lg:p-10 xl:p-12 ${
                                i % 2 === 0 ? "lg:order-2" : "lg:order-1"
                            }`}
                        >
                            <Link
                                href={`/projects/${item.id}`}
                                className="text-2xl leading-tight font-bold text-roast decoration-1 underline-offset-4 transition-colors duration-300 hover:text-roast/70 hover:underline sm:text-3xl"
                            >
                                {item.title}
                            </Link>
                            <p className="mt-4 leading-relaxed text-roast/70 sm:text-lg">
                                {item.description}
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {item.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-full border border-roast/10 bg-feather px-3 py-1 text-xs font-medium text-roast/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-roast/25 hover:bg-white"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-7 grid w-full gap-3 border-y border-roast/10 py-4 sm:grid-cols-2">
                                <div className="flex items-center gap-3 text-sm text-roast/70">
                                    <div>
                                        <span className="block text-xs tracking-wider text-roast/50 uppercase">Role</span>
                                        <span className="font-bold text-roast">{item.role}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-roast/70">
                                    <div>
                                        <span className="block text-xs tracking-wider text-roast/50 uppercase">Project type</span>
                                        <span className="font-bold text-roast">{item.projectType}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                                {item.detailPath ? (
                                    <Button
                                        asChild
                                        className="h-auto rounded-full bg-roast px-5 py-2.5 text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/85 hover:shadow-md"
                                    >
                                        <Link href={`/projects/${item.id}`}>
                                            View project
                                            <ArrowRight aria-hidden="true" />
                                        </Link>
                                    </Button>
                                ) : (
                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <Button
                                                className="h-auto rounded-full bg-roast px-5 py-2.5 text-sm text-white"
                                                disabled
                                            >
                                                Not availabler
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
                                        className="h-auto rounded-full border-roast/30 bg-transparent px-5 py-2.5 text-sm text-roast transition-all duration-300 hover:-translate-y-0.5 hover:bg-roast hover:text-white hover:shadow-md"
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
                    className="mx-auto mt-12 flex items-center justify-center rounded-full border border-roast/25 px-6 py-3 font-bold text-roast transition-all duration-300 hover:-translate-y-0.5 hover:border-roast hover:bg-roast hover:text-white hover:shadow-md sm:mt-16"
                >
                    View more projects
                </button>
            )}

        </SectionReveal>
    )
}
