'use client';
import { useRef, useEffect, useState } from 'react';
import Hero from './Hero';
import AboutMe from './AboutMe';

export default function Home() {
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    const heroSection = document.getElementById('hero-section');
    const aboutMeSection = document.getElementById('about-me-section');
  
    if (!heroSection || !aboutMeSection) return;
  
    const scrollY = window.scrollY;
    const heroSectionBottom = heroSection.offsetTop + heroSection.offsetHeight;
    const aboutMeSectionTop = aboutMeSection.offsetTop;
  
    // Define thresholds for scrolling distances
    const scrollThresholdToHero = 200; // Small threshold to bring back to hero section
    const scrollThresholdToAboutMe = 600; // Larger threshold to scroll to About Me section
  
    // If scrolling down from hero section
    if (scrollY > heroSectionBottom && scrollY < aboutMeSectionTop) {
      // Scroll back to hero section if within small threshold
      if (scrollY - heroSectionBottom < scrollThresholdToHero) {
        window.scrollTo({ top: heroSection.offsetTop, behavior: 'auto' });
      } else {
        // Otherwise, scroll to About Me section
        aboutMeSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // If scrolling up from about me section
    else if (scrollY < aboutMeSectionTop && scrollY > heroSectionBottom) {
      // Scroll back to hero section if within small threshold
      if (aboutMeSectionTop - scrollY < scrollThresholdToHero) {
        window.scrollTo({ top: heroSection.offsetTop, behavior: 'auto' });
      }
    }
    setScrollY(scrollY);
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
      <section id="about-me-section">
        <AboutMe ref={aboutMeRef} scrollY={scrollY} />
      </section>
    </>
  );
}
