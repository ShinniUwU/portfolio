import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaGithub, FaTwitter, FaCss3Alt, FaTelegram, FaGitAlt, FaReact } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiLinux, SiGnubash } from 'react-icons/si';
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import Image from 'next/image';
import BackgroundCircles from '@/components/backgroundCircles';
import Draggable from 'react-draggable';
import Link from 'next/link';

interface AboutMeProps {
  scrollY: number;
}

const AboutMe = forwardRef<HTMLDivElement, AboutMeProps>(({ scrollY }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.offsetTop;
        const sectionBottom = sectionTop + sectionRef.current.clientHeight;
        const isSectionVisible = scrollY >= sectionTop && scrollY <= sectionBottom;
        setIsVisible(isSectionVisible);
        controls.start({ opacity: isSectionVisible ? 1 : 0, y: isSectionVisible ? 0 : 50 });
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY, controls]);

  const handleMouseDown = (cardName: string) => {
    setActiveCard(cardName);
  };

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <BackgroundCircles isVisible={isVisible} />
      <motion.h1
        className="absolute text-white font-bold text-5xl md:text-8xl top-20 md:top-32"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={controls}
        transition={{ duration: 1 }}
      >
        About Me
      </motion.h1>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          className={`absolute p-2 md:p-4 rounded-lg w-40 md:w-64 top-28 md:top-[150px] left-4 md:left-[50px] ${
            activeCard === 'profile' ? 'z-40' : 'z-10'
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ delay: 0.5, duration: 1 }}
          onMouseDown={() => handleMouseDown('profile')}
        >
          <Draggable>
            <Card>
              <CardHeader>
                <h2 className="font-bold text-lg md:text-xl mb-2">Profile Pic</h2>
              </CardHeader>
              <Divider className="-mt-3" />
              <CardBody>
                <Image
                  src="https://github.com/ShinniUwU.png"
                  alt="GitHub profile picture"
                  className="rounded-full w-20 h-20 md:w-24 md:h-24 mx-auto"
                  width={80}
                  height={80}
                />
              </CardBody>
            </Card>
          </Draggable>
        </motion.div>
        <motion.div
          className={`absolute p-2 md:p-4 rounded-lg w-40 md:w-64 top-44 md:top-[250px] left-20 md:left-[200px] ${
            activeCard === 'about' ? 'z-40' : 'z-10'
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ delay: 0.7, duration: 1 }}
          onMouseDown={() => handleMouseDown('about')}
        >
          <Draggable>
            <Card>
              <CardHeader>
                <h2 className="font-bold text-lg md:text-xl mb-2">About Me</h2>
              </CardHeader>
              <Divider className="-mt-3" />
              <CardBody>
                <p className="text-gray-700 text-sm md:text-base">
                  Hello, my name is Shinni, but I go by the name Hana. I was born on April 5th, 2005. I am a transgender female with various aspirations and interests. Currently residing in Bulgaria, I plan to relocate for better opportunities and support.
                </p>
              </CardBody>
            </Card>
          </Draggable>
        </motion.div>
        <motion.div
          className={`absolute p-2 md:p-4 rounded-lg w-40 md:w-64 top-60 md:top-[400px] left-10 md:left-[100px] ${
            activeCard === 'socials' ? 'z-40' : 'z-10'
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ delay: 0.9, duration: 1 }}
          onMouseDown={() => handleMouseDown('socials')}
        >
          <Draggable>
            <Card>
              <CardHeader>
                <h2 className="font-bold text-lg md:text-xl mb-2">Socials</h2>
              </CardHeader>
              <Divider className="-mt-3" />
              <CardBody>
                <div className="flex justify-around text-purple-600">
                  <Link href="https://github.com/ShinniUwU"><FaGithub size={28} /></Link>
                  <Link href="https://x.com/ShinniOffical"><FaTwitter size={28} /></Link>
                  <Link href="https://t.me/shinniowo"><FaTelegram size={28} /></Link>
                </div>
              </CardBody>
            </Card>
          </Draggable>
        </motion.div>
        <motion.div
          className={`absolute p-2 md:p-4 rounded-lg w-40 md:w-64 top-[350px] md:top-[300px] right-4 md:right-[100px] ${
            activeCard === 'experience' ? 'z-40' : 'z-10'
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ delay: 1.1, duration: 1 }}
          onMouseDown={() => handleMouseDown('experience')}
        >
          <Draggable>
            <Card>
              <CardHeader>
                <h2 className="font-bold text-lg md:text-xl mb-2">Experience</h2>
              </CardHeader>
              <Divider className="-mt-3" />
              <CardBody>
                <div className="flex flex-wrap gap-2 md:gap-3 justify-around text-purple-600">
                  <SiNextdotjs size={28} />
                  <SiTailwindcss size={28} />
                  <SiLinux size={28} />
                  <SiGnubash size={28} />
                  <FaCss3Alt size={28} />
                  <FaGitAlt size={28} />
                  <FaReact size={28} />
                </div>
              </CardBody>
            </Card>
          </Draggable>
        </motion.div>
      </div>
    </div>
  );
});

export default AboutMe;

//TODO: 
// fix the issue where the draggable components overlap the mobile nav menu
// maybe add more content ? to this page like arrows you can switch the section off with another file 
