
import React, { useState, useEffect, useCallback } from 'react';
// You will need to install these dependencies:
// npm install framer-motion react-tsparticles tsparticles-slim

import { motion, AnimatePresence } from 'framer-motion';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import profilePic from '../assets/profilePic.jpg';
import restaurant from '../assets/restaurant.png';
import techFlow from '../assets/techFlow.png';
import gym from '../assets/gym.png';

// --- SVG ICONS ---
// Using functional components for SVG icons for reusability and clarity.

const MoonIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
  </svg>
);

const SunIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2"></path><path d="M12 20v2"></path>
    <path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path>
    <path d="M2 12h2"></path><path d="M20 12h2"></path>
    <path d="m4.93 19.07 1.41-1.41"></path><path d="m17.66 6.34 1.41-1.41"></path>
  </svg>
);

const MenuIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="4" x2="20" y1="12" y2="12"></line>
        <line x1="4" x2="20" y1="6" y2="6"></line>
        <line x1="4" x2="20" y1="18" y2="18"></line>
    </svg>
);

const XIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
    </svg>
);

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const ExternalLinkIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

// --- SKILL ICONS ---
const ReactIcon = () => (<svg className="w-12 h-12" viewBox="-11.5 -10.23174 23 20.46348"><circle cx="0" cy="0" r="2.05" fill="#61dafb"></circle><g stroke="#61dafb" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse></g></svg>);
const NodeIcon = () => (<svg className="w-12 h-12" viewBox="0 0 24 24"><path fill="#68a063" d="M12.353,2.4,12,2.235,11.647,2.4,5.4,5.823V18.177l.353.2L12,21.8l6.247-3.424.353-.2V5.823Zm-.641,1.524,4.2,2.309-2.071,1.147L12.01,6.235V4.012Zm-1.2,0V6.235L8.989,7.382,6.918,6.235Zm-4.5,3.318L10.2,9.553v4.9l-4.188-2.3ZM12,19.765l-4.2-2.309V12.55l4.2,2.309Zm.6,0V14.859l4.2-2.309v4.906Zm4.2-7.382-4.188,2.3V9.553L16.2,7.247Z"></path></svg>);
const ExpressIcon = () => (<svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor"><path d="M22 13.59c0-.42-.09-.81-.25-1.16l-2.82-6.2c-.37-.81-1.2-1.33-2.12-1.33H7.18c-.92 0-1.75.52-2.12 1.33l-2.82 6.2c-.16.35-.25.74-.25 1.16v.44c0 .41.09.81.25 1.16l2.82 6.2c.37.81 1.2 1.33 2.12 1.33h9.63c.92 0 1.75-.52 2.12-1.33l2.82-6.2c.16-.35.25-.75.25-1.16v-.44zM8.38 12.52h3.99c.75 0 1.36-.61 1.36-1.36s-.61-1.36-1.36-1.36H8.38V8.45h3.69v-1.3H7.07v6.59h5.3v-1.42H8.38v-1.16zM17.06 9.8v1.36h-2.17v1.1h1.9v1.28h-1.9v1.36h2.17v1.3h-3.58V8.5h3.58v1.3z"></path></svg>);
const MongoIcon = () => (<svg className="w-12 h-12" viewBox="0 0 24 24"><path fill="#4db33d" d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M13.5,18.5c-0.83,0-1.5-0.67-1.5-1.5 s0.67-1.5,1.5-1.5s1.5,0.67,1.5,1.5S14.33,18.5,13.5,18.5z M16.7,14.65c-0.63,0.32-1.22,0.5-1.75,0.5c-0.95,0-1.7-0.72-1.7-1.79 c0-1.25,1.14-2.1,2.55-2.1c0.41,0,0.8,0.08,1.15,0.21V10.2c0-1.93-1.34-3.5-3.35-3.5c-1.84,0-3.35,1.4-3.35,3.5v5 c-1.07-0.68-1.75-1.85-1.75-3.2c0-2.07,1.65-3.75,3.7-3.75c2.05,0.05,3.7,1.65,3.75,3.7V14.65z"></path></svg>);
const TailwindIcon = () => (<svg className="w-12 h-12" fill="none" viewBox="0 0 54 33"><g clipPath="url(#prefix__clip0)"><path fill="#38bdf8" fillRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" clipRule="evenodd"></path></g><defs><clipPath id="prefix__clip0"><path fill="#fff" d="M0 0h54v32.4H0z"></path></clipPath></defs></svg>);

// --- MOCK DATA ---
const projects = [{title: "SaaS Dashboard", description: "A comprehensive dashboard for a SaaS product featuring analytics, user management, and reporting, built with React and a Node.js backend.", image: "https://placehold.co/600x400/0f172a/94a3b8?text=SaaS+Dashboard", liveUrl: "#", githubUrl: "#"}, {title: "Bistro Gourmet", description: "An elegant website for a high-end restaurant with online reservations, menu display, and a gallery. Focused on a premium user experience.", image: restaurant, liveUrl: "#", githubUrl: "#"}, {title: "TechFlow Pro", description: "A high-converting business landing page designed to capture leads, featuring a modern design, smooth animations, and a contact form.", image: techFlow, liveUrl: "#", githubUrl: "#"}, {title: "Gym", description: "A full-featured GYM website with pricing listings, BMI calculator, Map and contact form, using the MERN stack.", image: gym, liveUrl: "https://anujaga2005.github.io/fitzone/", githubUrl: "#"}];
const skills = [{name: "React", icon: <ReactIcon />}, {name: "Node.js", icon: <NodeIcon />}, {name: "Express", icon: <ExpressIcon />}, {name: "MongoDB", icon: <MongoIcon />}, {name: "Tailwind CSS", icon: <TailwindIcon />}];
const testimonials = [{quote: "Working with them was a game-changer. Our new SaaS dashboard is not only beautiful but also incredibly fast and intuitive. The project was delivered on time and exceeded all our expectations.", name: "Jane Doe", title: "CEO of TechCorp"}, {quote: "The new website for our restaurant has received rave reviews from our customers. The online reservation system is seamless, and the design truly captures the essence of our brand. Highly recommended!", name: "John Smith", title: "Owner of Bistro Gourmet"}, {quote: "Our leads have increased by 40% since launching the new landing page. The attention to detail and focus on conversion was evident from day one. An absolute pleasure to work with.", name: "Sarah Lee", title: "Marketing Director at Innovate Ltd."}];

// --- ANIMATION VARIANTS ---
const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const cardContainerVariant = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const cardVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// --- COMPONENTS ---

const ParticlesBackground = ({ isDarkMode }) => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const options = {
        background: {
            color: { value: 'transparent' },
        },
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
                resize: true,
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: { value: isDarkMode ? "#38bdf8" : "#0ea5e9" },
            links: {
                color: isDarkMode ? "#1e293b" : "#e2e8f0",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 50,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 3 },
            },
        },
        detectRetina: true,
    };

    return <Particles id="tsparticles" init={particlesInit} options={options} />;
}


function Header({ isDarkMode, setIsDarkMode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: "#projects", label: "Projects" },
        { href: "#skills", label: "Skills" },
        { href: "#testimonials", label: "Testimonials" },
        { href: "#contact", label: "Contact" },
    ];
    
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm transition-colors duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <a href="#" className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
                           Anuj Agarwal
                        </a>
                    </div>
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} className="text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-300 font-medium">
                                {link.label}
                            </a>
                        ))}
                    </nav>
                    <div className="flex items-center">
                         <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-300"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
                        </button>
                        <div className="md:hidden ml-2">
                             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-300">
                                {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            <AnimatePresence>
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                         {navLinks.map(link => (
                            <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
        </header>
    );
}

function HeroSection({ isDarkMode }) {
    return (
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
            <div className="absolute inset-0 z-0">
                 <ParticlesBackground isDarkMode={isDarkMode} />
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
                    {/* Text Content */}
                    <div className="md:w-1/2 text-center md:text-left">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tighter mb-6 mx-auto"
                        >
                            Freelance Developer Building Modern Web Experiences.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="max-w-xl text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 "
                        >
                            I specialize in creating fast, responsive, and beautiful websites for SaaS companies, restaurants, and businesses that need a powerful online presence.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex justify-center md:justify-start gap-4 mx-auto"
                        >
                            <a href="#projects" className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-sky-500/50 transform hover:scale-105">
                                View My Work
                            </a>
                            <a href="#contact" className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                                Get In Touch
                            </a>
                        </motion.div>
                    </div>
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="md:w-1/2 flex justify-center"
                    >
                        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                             <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full blur-2xl opacity-50 dark:opacity-30 animate-pulse"></div>
                             <img
                                src={profilePic}
                                alt="Anuj Agarwal's Profile Picture"
                                className="relative w-full h-full object-cover rounded-full ring-4 ring-white/50 dark:ring-slate-700/50 shadow-2xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project }) {
  return (
    <motion.div variants={cardVariant} className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group">
      <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4">{project.description}</p>
        <div className="flex justify-start space-x-4">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sky-500 dark:text-sky-400 font-semibold hover:underline">
            Live Preview <ExternalLinkIcon className="ml-2 w-4 h-4" />
          </a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-slate-500 dark:text-slate-400 font-semibold hover:underline">
            GitHub <GithubIcon className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}


function ProjectsSection() {
    return (
        <motion.section 
            id="projects" 
            className="py-20 bg-slate-50 dark:bg-slate-900/70"
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Featured Projects</h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">A selection of my recent work.</p>
                </div>
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
                    variants={cardContainerVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}

function SkillsSection() {
    return (
        <motion.section 
            id="skills" 
            className="py-20"
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">My Tech Stack</h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Technologies I use to build modern web applications.</p>
                </div>
                <motion.div 
                    className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
                    variants={cardContainerVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {skills.map((skill) => (
                        <motion.div variants={cardVariant} key={skill.name} className="flex flex-col items-center gap-2 text-center group">
                            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full transition-all duration-300 group-hover:bg-sky-100 dark:group-hover:bg-sky-900/50 group-hover:scale-110">
                                {skill.icon}
                            </div>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{skill.name}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}

function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };
    
    return (
        <motion.section 
            id="testimonials" 
            className="py-20 bg-slate-50 dark:bg-slate-900/70"
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">What My Clients Say</h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Real feedback from happy clients.</p>
                </div>
                <div className="relative max-w-3xl mx-auto">
                    <div className="overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="w-full flex-shrink-0 px-4 text-center"
                            >
                                <p className="text-xl italic text-slate-700 dark:text-slate-200 mb-6">"{testimonials[currentIndex].quote}"</p>
                                <div className="font-bold text-slate-900 dark:text-white">{testimonials[currentIndex].name}</div>
                                <div className="text-slate-500 dark:text-slate-400">{testimonials[currentIndex].title}</div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                     <button onClick={prevTestimonial} className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white dark:bg-slate-800 p-2 rounded-full shadow-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors z-10">
                        <svg className="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <button onClick={nextTestimonial} className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white dark:bg-slate-800 p-2 rounded-full shadow-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors z-10">
                        <svg className="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            </div>
        </motion.section>
    );
}

function ContactSection() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    // State for form submission status
    const [status, setStatus] = useState({
        submitted: false,
        submitting: false,
        info: { error: false, msg: null }
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

        // --- IMPORTANT: Replace with your key from web3forms.com ---
        const accessKey = "385d3253-8ccc-4002-87c8-091439a85b08";
        
        const data = {
            ...formData,
            access_key: accessKey,
            subject: `New Message from ${formData.name} via Portfolio`,
        };

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(data)
            });
            const json = await res.json();

            if (res.status === 200) {
                setStatus({
                    submitted: true,
                    submitting: false,
                    info: { error: false, msg: json.message }
                });
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus({
                    submitted: false,
                    submitting: false,
                    info: { error: true, msg: json.message || 'Something went wrong.' }
                });
            }
        } catch (error) {
            setStatus({
                submitted: false,
                submitting: false,
                info: { error: true, msg: 'Something went wrong. Please try again.' }
            });
        }
    };

    return (
        <motion.section
            id="contact"
            className="py-20"
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Let's Build Something Great</h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Have a project in mind? I'd love to hear about it.</p>
                </div>
                <div className="max-w-xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
                            <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"/>
                        </div>
                         <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                            <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"/>
                        </div>
                         <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                            <textarea name="message" id="message" rows="4" required value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"></textarea>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={status.submitting}
                                className="w-full md:w-auto bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-sky-500/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status.submitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </form>
                    <AnimatePresence>
                        {status.info.msg && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className={`mt-6 text-center p-3 rounded-md ${
                                    status.info.error
                                        ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200'
                                        : 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200'
                                }`}
                            >
                                {status.info.msg}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.section>
    );
}

function Footer() {
    return (
        <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-slate-500 dark:text-slate-400">
                <p>&copy; {new Date().getFullYear()} Anuj Agarwal. All Rights Reserved.</p>
            </div>
        </footer>
    );
}


// --- MAIN APP COMPONENT ---
export default function App() {
    // State to manage dark mode. It checks local storage and system preference.
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined' && localStorage.theme) {
            return localStorage.theme === 'dark';
        }
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    // Effect to apply the dark mode class to the <html> element.
    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    return (
        // Added scroll-smooth for better navigation from header links.
        <div className="bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-sans antialiased selection:bg-sky-500/20 scroll-smooth">
            <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <main>
                <HeroSection isDarkMode={isDarkMode} />
                <ProjectsSection />
                <SkillsSection />
                <TestimonialsSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
}

