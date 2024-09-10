'use client'
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface Skill {
  name: string;
  level: number;
}

const skills: Skill[] = [
  { name: "React", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "Next.js", level: 80 },
  { name: "Node.js", level: 75 },
  { name: "CSS/Tailwind", level: 85 },
  { name: "Java", level: 30 },  
  // Add more skills here
];

const SkillsVisualization: React.FC = () => {
  const { theme } = useTheme();

  return (
    <motion.div
      id="skills"
      className={`min-h-screen flex flex-col items-center justify-center p-8 ${theme === 'light' ? 'bg-white text-black shadow-lg' : 'bg-gradient-to-b from-gray-900 to-black text-white'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold mb-8">My Skills</h2>
      <div className="w-full max-w-2xl">
        {skills.map((skill, index) => (
          <motion.div key={skill.name} className="mb-4">
            <div className="flex justify-between mb-1">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className={`w-full rounded-full h-2.5 ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-700'}`}>
              <motion.div
                className={`h-2.5 rounded-full ${theme === 'light' ? 'bg-blue-500' : 'bg-blue-600'}`}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillsVisualization;
