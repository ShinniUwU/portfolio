'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Project {
  id: number;
  title: string;
  description: string;
  repo: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "NeatFiles",
    description: "NeatFiles is a command-line utility designed to help you organize your files effortlessly. Whether you’re managing files in a specific directory or your entire current directory, NeatFiles makes it easy to sort and categorize your files into neat, organized folders based on their types and formats. ",
    repo: "https://github.com/ShinniUwU/NeatFiles"
  },
  {
    id: 2,
    title: "multi-file-transfer-ngrok",
    description: "A multi-file transfer application using Socket.IO and Express, with ngrok for secure tunneling. This project allows users to upload multiple files to a server, which handles the uploads in chunks. ",
    repo: "https://github.com/ShinniUwU/multi-file-transfer-ngrok"
  },
  {
    id: 3,
    title: "HRT-BDAY-COUNTER",
    description: "A site that shows my current time how much days till my birthday and how much days till or on hrt <3 ",
    repo: "https://github.com/ShinniUwU/HRT-BDAY-COUNTER"
  },
  // Add more projects here
];

const ProjectShowcase: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-black to-gray-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold mb-8">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link href={project.repo} key={project.id} passHref>
            <motion.div
              className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer flex flex-col h-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={`https://opengraph.githubassets.com/1/${project.repo.replace('https://github.com/', '')}`}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-300 flex-grow">{project.description}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectShowcase;
