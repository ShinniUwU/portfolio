'use client';
import { useRef, useState } from 'react';
import Hero from './Hero';
import AboutMe from './AboutMe';
import ProjectShowcase from './ProjectShowcase';
import SkillsVisualization from './SkillsVisualization';
import BackgroundCircles from '@/components/backgroundCircles';

export default function Home() {
  const [showAboutMe, setShowAboutMe] = useState(false);
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    setShowAboutMe(true);
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative">
      <BackgroundCircles isVisible={!showAboutMe} />
      <Hero scrollToAboutMe={() => scrollToSection(aboutMeRef)} />
      <section ref={aboutMeRef}>
        <AboutMe />
      </section>
      <section ref={projectsRef}>
        <ProjectShowcase />
      </section>
      <section ref={skillsRef}>
        <SkillsVisualization />
      </section>
    </main>
  );
}
