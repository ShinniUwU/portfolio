import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaGithub, FaTwitter, FaCss3Alt, FaTelegram, FaGitAlt, FaReact, FaProjectDiagram, FaCode, FaEnvelope, FaJava, FaLinkedin } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiLinux, SiGnubash, SiTypescript, SiHtml5 } from 'react-icons/si';
import { MdWork } from 'react-icons/md';
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

  const renderCard = (cardName: string, content: React.ReactNode, position: any) => (
    <motion.div
      className={`absolute p-2 md:p-4 rounded-lg w-40 md:w-64 ${position}`}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ delay: position.delay, duration: 1 }}
      onMouseDown={() => handleMouseDown(cardName)}
    >
      <Draggable>
        <Card>
          <CardHeader>
            <h2 className="font-bold text-lg md:text-xl mb-2">{cardName}</h2>
          </CardHeader>
          <Divider className="-mt-3" />
          <CardBody>
            {content}
          </CardBody>
        </Card>
      </Draggable>
    </motion.div>
  );

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
        Hana's Portfolio
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
                <h2 className="font-bold text-lg md:text-xl mb-2">Hana</h2>
              </CardHeader>
              <Divider className="-mt-3" />
              <CardBody>
                <Image
                  src="https://github.com/ShinniUwU.png"
                  alt="Profile picture"
                  className="rounded-full w-20 h-20 md:w-24 md:h-24 mx-auto"
                  width={80}
                  height={80}
                />
                <p className="text-center mt-2 text-sm">Developer</p>
              </CardBody>
            </Card>
          </Draggable>
        </motion.div>
        
        <motion.div
          className={`absolute p-2 md:p-4 rounded-lg w-40 md:w-64 top-44 md:top-[250px] left-20 md:left-[200px] ${
            activeCard === 'skills' ? 'z-40' : 'z-10'
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ delay: 0.7, duration: 1 }}
          onMouseDown={() => handleMouseDown('skills')}
        >
          <Draggable>
            <Card>
              <CardHeader>
                <h2 className="font-bold text-lg md:text-xl mb-2">Skills</h2>
              </CardHeader>
              <Divider className="-mt-3" />
              <CardBody>
                <div className="grid grid-cols-3 gap-3 justify-items-center">
                  <SiNextdotjs size={24} title="Next.js" className="text-purple-600 hover:text-purple-700" />
                  <SiTailwindcss size={24} title="Tailwind CSS" className="text-purple-600 hover:text-purple-700" />
                  <FaReact size={24} title="React" className="text-purple-600 hover:text-purple-700" />
                  <SiTypescript size={24} title="TypeScript" className="text-purple-600 hover:text-purple-700" />
                  <SiHtml5 size={24} title="HTML5" className="text-purple-600 hover:text-purple-700" />
                  <FaCss3Alt size={24} title="CSS3" className="text-purple-600 hover:text-purple-700" />
                  <FaGitAlt size={24} title="Git" className="text-purple-600 hover:text-purple-700" />
                  <SiLinux size={24} title="Linux" className="text-purple-600 hover:text-purple-700" />
                  <FaJava size={24} title="Java" className="text-purple-600 hover:text-purple-700" />
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
                <ul className="list-disc list-inside text-sm">
                  <li>Frontend Developer Intern</li>
                  <li>Freelance Web Developer</li>
                  <li>Open Source Contributor</li>
                </ul>
                <a 
                  href="https://docs.google.com/document/d/1kI4c2IkEdHReYCJz7SwjmSs9GIcdTy9O4VM0IgycXM4/edit?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-purple-600 hover:underline mt-2 inline-block"
                >
                  <MdWork className="inline mr-1" />
                  View Full Resume
                </a>
              </CardBody>
            </Card>
          </Draggable>
        </motion.div>

        {renderCard('Contact me',
          <>
            <CardBody>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex justify-center space-x-4">
                  <a href="https://github.com/ShinniUwU" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 transition-colors">
                    <FaGithub size={28} title="GitHub" />
                  </a>
                  <a href="https://x.com/ShinniOffical" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 transition-colors">
                    <FaTwitter size={28} title="Twitter" />
                  </a>
                  <a href="https://t.me/shinniowo" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 transition-colors">
                    <FaTelegram size={28} title="Telegram" />
                  </a>
                  <a href="https://www.linkedin.com/in/radoslav-borisov-a7062622b/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 transition-colors">
                    <FaLinkedin size={28} title="LinkedIn" />
                  </a>
                </div>
                <a
                  href="mailto:rdclan469@gmail.com"
                  className="flex items-center justify-center w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  <FaEnvelope className="mr-2" />
                  Email Me
                </a>
              </div>
            </CardBody>
          </>,
          { bottom: '20px', right: '10px', delay: 1.3 }
        )}
      </div>
    </div>
  );
});

export default AboutMe;

// TODO: Implement experience page
