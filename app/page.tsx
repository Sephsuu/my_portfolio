import { Navbar } from "@/components/custom/Navbar";
import { ContactSection } from "@/features/ContactSection";
import { ExperienceSection } from "@/features/ExperienceSection";
import { HeroSection } from "@/features/HeroSection";
import { SkillsSection } from "@/features/SkillsSection";

export default function Home() {
    return (
        <>
            <Navbar />
            <main className="overflow-hidden">
                <HeroSection />
                <SkillsSection />
                <ExperienceSection />
                <ContactSection />
            </main>
        </>
    );
}
