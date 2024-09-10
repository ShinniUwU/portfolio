'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const ContactAndResumeSection: React.FC = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:rdclan469@gmail.com?subject=Contact from ${formData.name}&body=${formData.message}`;
    window.location.href = mailtoLink;
  };

  return (
    <motion.div
      id="contact-and-resume"
      className={`min-h-screen flex flex-col items-center justify-center p-8 ${theme === 'light' ? 'bg-white text-black shadow-lg' : 'bg-gradient-to-b from-gray-900 to-black text-white'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold mb-8">Contact Me & My Resume</h2>
      
      <section id="resume" className="w-full max-w-4xl mb-16 text-center">
        <h3 className="text-3xl font-bold mb-8">My Resume</h3>
        <p className="mb-8">You can view my resume by clicking the button below:</p>
        <a
          href="https://docs.google.com/document/d/1kI4c2IkEdHReYCJz7SwjmSs9GIcdTy9O4VM0IgycXM4/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600 transition-colors shadow-md"
        >
          View My Resume
        </a>
      </section>

      <section id="contact" className="w-full max-w-lg">
        <h3 className="text-3xl font-bold mb-8">Contact Me</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${theme === 'light' ? 'border-gray-300' : 'border-gray-700'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${theme === 'light' ? 'border-gray-300' : 'border-gray-700'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${theme === 'light' ? 'border-gray-300' : 'border-gray-700'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows={5}
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600 transition-colors shadow-md"
          >
            Send Message
          </button>
        </form>
      </section>
    </motion.div>
  );
};

export default ContactAndResumeSection;