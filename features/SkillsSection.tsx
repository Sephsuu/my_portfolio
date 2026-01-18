const technologies = [
    {name: "Bootstrap", src: "/images/bootstrap.png", imgSize: "w-30", textClass: "-mt-4"},
    {name: "Tailwind CSS", src: "/images/tailwindcss.png", imgSize: "w-55", textClass: "-mt-18"},
    {name: "React", src: "/images/react.png", imgSize: "w-24" },
    {name: "Next.js", src: "/images/nextjs.png", imgSize: "w-40"},
    {name: "Flutter", src: "/images/flutter.png", imgSize: "w-50"},
    {name: "shadcn/ui", src: "/images/shadcn.png", imgSize: "w-21 rounded-lg"},

    {name: "Python", src: "/images/python.png", imgSize: "w-45", textClass: "-mt-4"},
    {name: "Tailwind CSS", src: "/images/django.png", imgSize: "w-50", textClass: "-mt-18"},
    {name: "React", src: "/images/laravel.png", imgSize: "w-45" },
    {name: "Next.js", src: "/images/nodejs.png", imgSize: "w-35"},
    {name: "Flutter", src: "/images/expressjs.png", imgSize: "w-50"},
    {name: "shadcn/ui", src: "/images/nestjs.png", imgSize: "w-21 rounded-lg"},
]

export function SkillsSection() {
    return (
        <section className="p-4">
            <div className="text-4xl font-bold text-center my-8">Technologies Used</div>

            <div className="flex-center">
                <div className="max-w-300 grid grid-cols-3 gap-8">
                    {technologies.map((item) => (
                        <div className="bg-slate-100 shadow-md rounded-md flex-center flex-col h-35 w-80">
                            <img
                                src={item.src}
                                className={`${item.imgSize}`}
                            />
                            {/* <div className={`text-lg ${item.textClass}`}>{item.name}</div> */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}