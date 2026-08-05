import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { promises as fs } from "node:fs";
import path from "node:path";
import { ContributionShowcase } from "@/components/custom/ContributionShowcase";
import { MockDataNotice } from "@/components/custom/MockDataNotice";
import { ModuleImageCarousel } from "@/components/custom/ModuleImageCarousel";
import { ScrollToSectionLink } from "@/components/custom/ScrollToSectionLink";
import { ScrollToTopButton } from "@/components/custom/ScrollToTopButton";
import type { ProjectDetail, ProjectSummary } from "@/types/project";

type ProjectPageProps = {
    params: Promise<{ id: string }>;
};

const dataDirectory = path.join(process.cwd(), "public", "data");

async function readJson<T>(relativePath: string): Promise<T | null> {
    const normalizedPath = path.posix.normalize(relativePath);

    if (
        normalizedPath.startsWith("..") ||
        path.isAbsolute(normalizedPath) ||
        !normalizedPath.endsWith(".json")
    ) {
        return null;
    }

    try {
        const content = await fs.readFile(
            path.join(dataDirectory, normalizedPath),
            "utf8",
        );
        return JSON.parse(content) as T;
    } catch {
        return null;
    }
}

async function getProject(id: string): Promise<ProjectDetail | null> {
    const projects = await readJson<ProjectSummary[]>("projects.json");
    const summary = projects?.find((project) => project.id === id);

    if (!summary?.detailPath) return null;

    const project = await readJson<ProjectDetail>(summary.detailPath);
    return project?.id === id ? project : null;
}

export async function generateStaticParams() {
    const projects = await readJson<ProjectSummary[]>("projects.json");

    return (projects ?? [])
        .filter((project) => project.detailPath)
        .map((project) => ({ id: project.id }));
}

export async function generateMetadata({
    params,
}: ProjectPageProps): Promise<Metadata> {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) return { title: "Project not found | Sephsuu" };

    return {
        title: `${project.title} | Sephsuu`,
        description: project.description,
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) notFound();

    return (
        <main id="project-top" className="overflow-hidden bg-feather text-roast">
            {project.isMockData && <MockDataNotice key={project.id} />}
            <ScrollToTopButton />

            <header className="border-b border-roast/10 px-4 py-5 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-340 items-center justify-between gap-4">
                    <Link
                        href="/#experiences"
                        className="group inline-flex items-center gap-2 font-semibold transition-opacity hover:opacity-60"
                    >
                        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                        Back to projects
                    </Link>
                    <ScrollToSectionLink
                        targetId="developers"
                        className="hidden text-sm tracking-[0.2em] uppercase text-roast/60 sm:block font-bold"
                    >
                        View Developers
                    </ScrollToSectionLink>
                </div>
            </header>

            <section className="px-4 pb-14 pt-12 sm:px-6 sm:pb-18 sm:pt-16 lg:px-8 lg:pb-12 lg:pt-12">
                <div className="mx-auto max-w-340">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
                        <div>
                            <p className="mb-4 text-sm font-bold tracking-[0.22em] uppercase text-roast/60">
                                {project.projectType}
                            </p>
                            <h1 className="max-w-5xl text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
                                {project.title}
                            </h1>
                            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-roast/70 sm:text-xl">
                                {project.description}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 lg:justify-end">
                            {project.technologies.map((technology) => (
                                <span
                                    key={technology}
                                    className="rounded-full border border-roast/20 bg-white px-3 py-1.5 text-sm"
                                >
                                    {technology}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="pt-7 sm:pt-9">
                        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
                            <article className="border-t border-roast/15 pt-5">
                                <h2 className="text-xl font-bold">Problem &amp; challenge</h2>
                                <p className="mt-3 leading-relaxed text-roast/70">
                                    {project.overview.challenge}
                                </p>
                            </article>
                            <article className="border-t border-roast/15 pt-5">
                                <h2 className="text-xl font-bold">Solution</h2>
                                <p className="mt-3 leading-relaxed text-roast/70">
                                    {project.overview.solution}
                                </p>
                            </article>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-roast/10 px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-12">
                <div className="mx-auto max-w-340">
                    <div className="max-w-3xl">
                        <p className="text-sm font-bold tracking-[0.22em] uppercase text-roast/55">
                            Selected work
                        </p>
                        <h2 className="mt-3 text-3xl font-bold sm:text-5xl">Modules and workflows</h2>
                        <p className="mt-5 text-lg leading-relaxed text-roast/70">
                            A closer look at the interfaces I created for the platform&apos;s core operational areas.
                        </p>
                    </div>

                    <div className="mt-14 space-y-20 sm:mt-18 lg:space-y-28">
                        {project.modules.map((module, moduleIndex) => (
                            <article key={module.id} id={module.id} className="scroll-mt-8">
                                <div className="grid gap-7 border-t border-roast/15 pt-7 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.55fr)] lg:gap-16">
                                    <div>
                                        <div className="flex items-center sm:gap-4">
                                            <span className="font-mono text-roast/45 text-5xl sm:text-7xl scale-x-120">
                                                {String(moduleIndex + 1).padStart(2, "0")}
                                            </span>
                                            <h3 className="text-3xl font-bold mt-4 sm:text-5xl ml-4">{module.title}</h3>
                                        </div>
                                        <p className="mt-4 max-w-3xl leading-relaxed text-roast/70">
                                            {module.description}
                                        </p>
                                    </div>
                                    <ul className="grid content-start gap-2 sm:grid-cols-2 lg:grid-cols-1">
                                        {module.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-2 text-sm font-semibold">
                                                <ArrowUpRight className="size-4 shrink-0 text-roast/50" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <ModuleImageCarousel
                                    images={module.images}
                                    moduleTitle={module.title}
                                />
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <ContributionShowcase 
            
                contributors={project.contributors} 
            />
        </main>
    );
}
