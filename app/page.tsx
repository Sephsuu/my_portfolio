import { ContactSection } from "@/features/ContactSection";
import { ExperienceSection } from "@/features/ExperienceSection";
import { HeroSection } from "@/features/HeroSection";
import { SkillsSection } from "@/features/SkillsSection";

export default function Home() {
    return (
        <section className="overflow-hidden">
            <HeroSection />
            <SkillsSection />
			<ExperienceSection />
            <ContactSection />
        </section>
    );
}
