'use client';
import { useRef, useEffect, useState } from 'react';
import Hero from './Hero';
import AboutMe from './AboutMe';

// TODO:
// make the hero section not let you scroll furher if u scroll a bit and if u scroll a lot it 
// automatically brings u down to the about me section 


export default function Home() {
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAboutMe = () => {
    aboutMeRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section id="hero-section">
        <Hero scrollToAboutMe={scrollToAboutMe} />
      </section>
      <section id="about-me-section" ref={aboutMeRef}>
        <AboutMe scrollY={scrollY} />
      </section>
    </>
  );
}
