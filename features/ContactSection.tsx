import { Home, Mail, Phone } from "lucide-react";

import { SectionReveal } from "@/components/custom/SectionReveal";

export function ContactSection() {
    return (
        <section
            id="contacts"
            className="scroll-mt-20 bg-[#3c2000] px-4 py-14 text-white sm:px-6 sm:py-18 lg:px-8 lg:py-24"
        >
            <div className="mx-auto grid max-w-340 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div className="min-w-0 text-center lg:text-right">
                    <p className="mb-3 text-2xl sm:text-3xl lg:text-4xl">
                        Get in touch with
                    </p>
                    <h2 className="text-transparent [-webkit-text-stroke:1.5px_#fff] text-[clamp(3.75rem,15vw,7rem)] leading-[0.82] tracking-tight arial-black sm:[-webkit-text-stroke:2px_#fff] lg:text-[clamp(5rem,8vw,8rem)]">
                        <span className="block">Joseph</span>
                        <span className="block">Emanuel</span>
                    </h2>
                </div>

                <address className="flex min-w-0 flex-col gap-8 not-italic sm:gap-10">
                    <div className="min-w-0">
                        <div className="flex items-center gap-3">
                            <Mail className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
                            <span className="text-xl font-bold arial sm:text-2xl lg:text-3xl">
                                Email
                            </span>
                        </div>
                        <a
                            href="mailto:batallerjem208@gmail.com"
                            className="mt-2 block break-all text-lg transition-opacity hover:opacity-70 sm:break-normal sm:text-2xl lg:text-3xl"
                        >
                            batallerjem208@gmail.com
                        </a>
                    </div>

                    <div className="min-w-0">
                        <div className="flex items-center gap-3">
                            <Phone className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
                            <span className="text-xl font-bold arial sm:text-2xl lg:text-3xl">
                                Phone
                            </span>
                        </div>
                        <a
                            href="tel:+639475453783"
                            className="mt-2 block text-lg transition-opacity hover:opacity-70 sm:text-2xl lg:text-3xl"
                        >
                            +63 947 545 3783
                        </a>
                    </div>

                    <div className="min-w-0">
                        <div className="flex items-center gap-3">
                            <Home className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
                            <span className="text-xl font-bold arial sm:text-2xl lg:text-3xl">
                                Residence
                            </span>
                        </div>
                        <p className="mt-2 text-lg leading-snug sm:text-2xl lg:text-3xl">
                            Trece Martires, Cavite, Philippines
                        </p>
                    </div>
                </address>
            </div>
        </section>
    )
}
