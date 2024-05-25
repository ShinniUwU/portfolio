import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaGithub, FaTwitter ,FaCss3Alt,FaTelegram,FaGitAlt,FaReact } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiLinux, SiGnubash } from 'react-icons/si';
import { Card, CardBody, CardHeader,Divider } from '@nextui-org/react';
import Image from 'next/image';
import BackgroundCircles from '@/components/backgroundCircles'; 
import Draggable from 'react-draggable'; 
import Link from 'next/link';
interface AboutMeProps {
  scrollY: number;
}

const AboutMe = forwardRef<HTMLDivElement, AboutMeProps>(({ scrollY }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <BackgroundCircles isVisible={isVisible} /> 
      <motion.h1
        className="absolute text-white font-bold text-8xl top-32"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={controls}
        transition={{ duration: 1 }}
      >
        About Me
      </motion.h1>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            className="absolute  p-4 rounded-lg shadow-lg w-64"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ delay: 0.5, duration: 1 }}
            style={{ top: '150px', left: '50px' }}
          >
                <Draggable> 
            <Card>
              <CardHeader>
              <h2 className="font-bold text-xl mb-2">Profile Pic</h2>
              </CardHeader>
              <Divider className="-mt-3" />
              <CardBody>
           
            <Image
              src="https://github.com/ShinniUwU.png"
              alt="GitHub profile picture"
              className="rounded-full w-24 h-24 mx-auto"
              width={80}
              height={80}
            />
              </CardBody>
            </Card>
            </Draggable> 
          </motion.div>
          <motion.div
            className="absolute  p-4 rounded-lg shadow-lg w-64"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ delay: 0.7, duration: 1 }}
            style={{ top: '250px', left: '200px' }}
          >
               <Draggable> 
            <Card>
            <CardHeader>
            <h2 className="font-bold text-xl mb-2">About Me</h2>
                  </CardHeader>
                  <Divider className="-mt-3" />
              <CardBody>
            <p className="text-gray-700">
              Hello, my name is Shinni, but I go by the name Hana. I was born on April 5th, 2005. I am a transgender female with various aspirations and interests. Currently residing in Bulgaria, I plan to relocate for better opportunities and support.
            </p>
              </CardBody>
            </Card>
            </Draggable> 
          </motion.div>
          <motion.div
            className="absolute  p-4 rounded-lg shadow-lg w-64"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ delay: 0.9, duration: 1 }}
            style={{ top: '400px', left: '100px' }}
          >
               <Draggable> 
            <Card>
            <CardHeader>
            <h2 className="font-bold text-xl mb-2">Socials</h2>
            </CardHeader>
            <Divider className="-mt-3" />
            <CardBody>
            <div className="flex justify-around text-purple-600">
            <Link href="https://github.com/ShinniUwU">  <FaGithub size={32} /></Link>
            <Link href="https://x.com/ShinniOffical">  <FaTwitter size={32} /></Link>
            <Link href="https://t.me/shinniowo">  <FaTelegram size={32} /></Link>
            </div>
            </CardBody>
            </Card>
            </Draggable> 
          </motion.div>
          <motion.div
            className="absolute  p-4 rounded-lg shadow-lg w-64"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ delay: 1.1, duration: 1 }}
            style={{ top: '300px', right: '100px' }}
          >
               <Draggable> 
            <Card>
              <CardHeader>
              <h2 className="font-bold text-xl mb-2">Experience</h2>
              </CardHeader>
              <Divider className="-mt-3" />
                <CardBody>
                <div className="flex flex-wrap gap-3 justify-around text-purple-600">
              <SiNextdotjs size={32} />
              <SiTailwindcss size={32} />
              <SiLinux size={32} />
              <SiGnubash size={32} />
              <FaCss3Alt size={32} />
              <FaGitAlt size={32} />
              <FaReact size={32} />
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
