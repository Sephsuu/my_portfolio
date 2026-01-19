const technologies = [
    {name: "Bootstrap", src: "/images/technologies/bootstrap.png", imgSize: "w-30", textClass: "-mt-4"},
    {name: "Tailwind CSS", src: "/images/technologies/tailwindcss.png", imgSize: "w-55", textClass: "-mt-18"},
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
]

export function SkillsSection() {
    return (
        <section className="p-4">
            <div className="text-4xl font-bold text-center my-8">Technologies Used</div>

            <div className="flex-center">
                <div className="max-w-300 grid grid-cols-3 gap-8">
                    {technologies.map((item) => (
                        <div 
                            key={item.src}
                            className="bg-slate-100 shadow-md rounded-md flex-center flex-col h-35 w-80"
                        >
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