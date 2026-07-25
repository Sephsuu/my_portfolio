const routes = [
    { title: "Home", href: "#home" },
    { title: "Skills", href: "#skills" },
    { title: "Experiences", href: "#experiences" },
    { title: "Contacts", href: "#contacts" },
]

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 h-16 border-b border-slate-200/80 bg-feather backdrop-blur-md">
            <nav
                aria-label="Primary navigation"
                className="mx-auto flex h-full max-w-360 items-center justify-center px-4 sm:px-6 lg:px-8"
            >
                <div className="flex w-full max-w-lg items-center justify-between gap-3">
                    {routes.map((item) => (
                        <a
                            key={item.title}
                            href={item.href}
                            className="text-roast rounded-sm text-sm transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:text-lg"
                        >
                            {item.title}
                        </a>
                    ))}
                </div>
            </nav>
        </header>
    )
}
