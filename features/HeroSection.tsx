import { Button } from "@/components/ui/button"

const routes = [
    {title: "Home", href: ""},
    {title: "Skills", href: ""},
    {title: "Experiences", href: ""},
    {title: "Contacts", href: ""},
]

export function HeroSection() {
    return (
        <section className="relative h-screen max-w-360 mx-auto">
            <img 
                src="/images/hero.png"
                className="absolute left-0 bottom-0 z-50 h-[95vh]"
            />
            <div className="absolute top-0 left-0 bg-slate-100 h-screen w-5/10"></div>
           
            <div className="h-screen absolute top-6 right-0 w-5/10">

                <div className="flex-center gap-8">
                    {routes.map((item) => (
                        <button
                            key={item.title}
                            className="text-lg"
                        >
                            {item.title}
                        </button>
                    ))}
                </div>

                <div className="mt-24 ms-12 space-y-2">
                    <div className="text-4xl font-bold w-8/10">
                        Building scalable apps with user-first design.
                    </div>
                    <div className="w-8/10 text-xl">
                        Motivated IT student with nearly 4 years of hands-on experience in full-stack web development.
                    </div>
                    <a href="/files/BATALLER_RESUME.pdf" download>
                        <Button 
                            className="w-fit mt-2 bg-black hover:opacity-90 text-lg"
                        >
                            Download CV
                        </Button>
                    </a>
                </div>
            </div>

        

          
            <div className="absolute bottom-0 right-0 text-9xl font-black text-transparent 
                            [-webkit-text-stroke:1px_#f8fafc] 
                            mix-blend-difference text-right z-50 pointer-events-none arial-black">
                <div>JOSEPH</div>
                <div>BATALLER</div>
            </div>
                            
          
            
        </section>
    )
}