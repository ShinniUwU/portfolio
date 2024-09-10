'use client';
import { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import Hero from './Hero';
import AboutMe from './AboutMe';
import ProjectShowcase from './ProjectShowcase';
import SkillsVisualization from './SkillsVisualization';
import BackgroundCircles from '@/components/backgroundCircles';

export default function Home() {
  const [showBackgroundCircles, setShowBackgroundCircles] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setShowBackgroundCircles(latest < 300);
    });

    return () => unsubscribe();
  }, [scrollY]);

  const scrollToAboutMe = () => {
    aboutMeRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative">
      <BackgroundCircles isVisible={showBackgroundCircles} />
      <section ref={heroRef} id="hero">
        <Hero scrollToAboutMe={scrollToAboutMe} opacity={opacity} />
      </section>
      <section ref={aboutMeRef} id="about">
        <AboutMe />
      </section>
      <section ref={projectsRef} id="projects">
        <ProjectShowcase />
      </section>
      <section ref={skillsRef} id="skills">
        <SkillsVisualization />
      </section>
    </main>
  );
}
