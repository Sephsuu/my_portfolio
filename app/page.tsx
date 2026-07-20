import { ExperienceSection } from "@/features/ExperienceSection";
import { HeroSection } from "@/features/HeroSection";
import { SkillsSection } from "@/features/SkillsSection";
import Image from "next/image";

export default function Home() {
    return (
        <section className="overflow-hidden">
            <HeroSection />
            <SkillsSection />
			<ExperienceSection />
        </section>
    );
}
