const technologies = [
    {name: "Bootstrap", src: "/images/technologies/bootstrap.png", imgSize: "w-30 max-md:w-25", textClass: "-mt-4"},
    {name: "Tailwind CSS", src: "/images/technologies/tailwindcss.png", imgSize: "w-55 max-md:w-50!", textClass: "-mt-18"},
    {name: "React", src: "/images/technologies/react.png", imgSize: "w-24" },
    {name: "Next.js", src: "/images/technologies/nextjs.png", imgSize: "w-40"},
    {name: "Flutter", src: "/images/technologies/flutter.png", imgSize: "w-50"},
    {name: "shadcn/ui", src: "/images/technologies/shadcn.png", imgSize: "w-21 rounded-lg"},

    {name: "Python", src: "/images/technologies/python.png", imgSize: "w-45", textClass: "-mt-4"},
    {name: "Tailwind CSS", src: "/images/technologies/django.png", imgSize: "w-50", textClass: "-mt-18"},
    {name: "React", src: "/images/technologies/laravel.png", imgSize: "w-45" },
    {name: "Next.js", src: "/images/technologies/nodejs.png", imgSize: "w-35"},
    {name: "Flutter", src: "/images/technologies/expressjs.png", imgSize: "w-50"},
    {name: "shadcn/ui", src: "/images/technologies/nestjs.png", imgSize: "w-21 rounded-lg"},

    {name: "Next.js", src: "/images/technologies/sql.png", imgSize: "w-35"},
    {name: "Flutter", src: "/images/technologies/mongodb.png", imgSize: "w-50"},
    {name: "shadcn/ui", src: "/images/technologies/supabase.png", imgSize: "w-55 rounded-lg"},
]!

export function SkillsSection() {
    return (
        <section
            id="skills"
            className="scroll-mt-6 px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24"
        >
            <h2 className="mb-10 text-center text-3xl font-bold sm:mb-12 sm:text-4xl lg:text-5xl">
                Technologies Used
            </h2>

            <div className="mx-auto grid w-full max-w-300 grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:gap-8">
                {technologies.map((item) => (
                    <div
                        key={item.src}
                        className="flex h-28 min-w-0 items-center justify-center rounded-md bg-slate-100 p-4 shadow-md sm:h-32 sm:p-5 lg:h-36"
                    >
                        <img
                            src={item.src}
                            alt={item.name}
                            className={`${item.imgSize} max-h-18 max-w-[80%] object-contain sm:max-h-22 lg:max-h-24`}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}
