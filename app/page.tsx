import { Navbar } from "@/components/custom/Navbar";
import { ContactSection } from "@/features/ContactSection";
import { EducationSection } from "@/features/EducationSection";
import { ExperienceSection } from "@/features/ExperienceSection";
import { HeroSection } from "@/features/HeroSection";
import { SkillsSection } from "@/features/SkillsSection";

export default function Home() {
    return (
        <>
            <Navbar />
            <main className="overflow-hidden">
                <HeroSection />
                <EducationSection />
                <SkillsSection />
                <ExperienceSection />
                <ContactSection />
            </main>
        </>
    );
}
