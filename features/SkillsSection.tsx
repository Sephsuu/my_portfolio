import Image from "next/image"

import { SectionReveal } from "@/components/custom/SectionReveal"

const technologies = [
    { name: "React", src: "/images/technologies/react.png" },
    { name: "Next.js", src: "/images/technologies/nextjs.png" },
    { name: "Tailwind CSS", src: "/images/technologies/tailwindcss.png" },
    { name: "Bootstrap", src: "/images/technologies/bootstrap.png" },
    { name: "shadcn/ui", src: "/images/technologies/shadcn.png" },
    { name: "Flutter", src: "/images/technologies/flutter.png" },
    { name: "Node.js", src: "/images/technologies/nodejs.png" },
    { name: "Express.js", src: "/images/technologies/expressjs.png" },
    { name: "NestJS", src: "/images/technologies/nestjs.png" },
    { name: "Django", src: "/images/technologies/django.png" },
    { name: "Laravel", src: "/images/technologies/laravel.png" },
    { name: "Python", src: "/images/technologies/python.png" },
    { name: "PHP", src: "/images/technologies/php.png" },
    { name: "SQL", src: "/images/technologies/sql.png" },
    { name: "MongoDB", src: "/images/technologies/mongodb.png" },
    { name: "Supabase", src: "/images/technologies/supabase.png" },
]

export function SkillsSection() {
    return (
        <SectionReveal
            id="skills"
            className="relative isolate scroll-mt-20 overflow-hidden border-b bg-feather px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        >
            <div
                aria-hidden="true"
                className="absolute top-0 left-0 -z-10 h-96 w-2/3 bg-[radial-gradient(ellipse_at_top_left,rgba(222,204,193,0.5),transparent_68%)]"
            />

            <header className="mx-auto mb-10 max-w-340 sm:mb-12">
                <h2 className="max-w-3xl text-4xl leading-[1.08] font-bold tracking-tight text-roast sm:text-5xl lg:text-[3.5rem]">
                    Technologies I work with.
                </h2>
            </header>

            <div className="mx-auto grid max-w-340 grid-cols-2 overflow-hidden rounded-3xl border border-roast/10 bg-roast/10 shadow-[0_20px_55px_-38px_rgba(88,56,42,0.65)] sm:grid-cols-3 lg:grid-cols-4">
                {technologies.map((technology) => (
                    <div
                        key={technology.name}
                        className="group flex min-h-36 flex-col items-center justify-center border-r border-b border-roast/10 bg-white/80 p-5 text-center transition-colors duration-300 hover:bg-white sm:min-h-40"
                    >
                        <div className="relative h-14 w-full sm:h-16">
                            <Image
                                src={technology.src}
                                alt=""
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                className="object-contain filter-[brightness(0)_saturate(100%)_invert(22%)_sepia(18%)_saturate(1500%)_hue-rotate(335deg)_brightness(90%)_contrast(90%)] transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <span className="mt-4 text-sm font-bold text-roast/75 sm:text-base">
                            {technology.name}
                        </span>
                    </div>
                ))}
            </div>
        </SectionReveal>
    )
}
