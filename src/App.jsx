import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue } from 'framer-motion';
import { 
  FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaDownload, FaExternalLinkAlt,
  FaReact, FaNodeJs, FaHtml5, FaCss3, FaJs, FaJava, FaGitAlt, FaDocker,
  FaMoon, FaSun, FaCopy, FaCode, FaTimes, FaBars, FaArrowUp, FaRocket,
  FaBriefcase, FaGraduationCap, FaLaptopCode, FaTrophy , FaCodeBranch, FaCheckCircle
} from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiMongodb, SiExpress } from 'react-icons/si';
import { FaFlutter } from "react-icons/fa6";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

// (Keep your ThemeProvider and useTheme context as they are)
const ThemeContext = React.createContext();
const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark(!isDark);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);
  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
};
const useTheme = () => React.useContext(ThemeContext);

// --- 1. IMPROVED CAT SPRITE (Pauses GIF instead of swapping images) ---
const CatSprite = ({ isMoving }) => {
  return (
    <div className="relative h-10 w-12">
      {/* Your animated GIF is shown when isMoving is true */}
      <img
        src="/cat.gif"
        alt="Running Cat"
        className={`w-full h-full object-contain transition-opacity duration-200 ${isMoving ? 'opacity-100' : 'opacity-0'}`}
      />
      {/* The static PNG is shown when isMoving is false */}
      <img
        src="/cat-idle.png"
        alt="Idle Cat"
        className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-200 ${!isMoving ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

// (Navbar component remains mostly the same, just ensure it uses the new CatSprite)
const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatHovered, setIsCatHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCatMoving = isCatHovered || isScrolling;

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Tech Stack', href: '#tech' },
    { name: 'Snippets', href: '#snippets' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav 
      id="main-nav" 
      // FIX 2: Removed the conflicting "relative" class to make "fixed" work correctly.
      className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/5 dark:bg-black/5 border-b border-gray-300/20 dark:border-white/10"
    >
      {/* Removed the inner 'container' div for a simpler layout */}
      <div className="flex justify-between items-center h-16 px-4 md:px-8 max-w-7xl mx-auto">
        {/* LOGO */}
        <motion.a 
          href="#home" 
          className="flex items-center cursor-pointer gap-2"
          onMouseEnter={() => setIsCatHovered(true)}
          onMouseLeave={() => setIsCatHovered(false)}
        >
          <CatSprite isMoving={isCatMoving} />
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
            Anuj Agarwal
          </span>
        </motion.a>
        
        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
             <motion.a key={link.name} href={link.href} className="text-gray-700 dark:text-gray-300 hover:text-cyan-400" whileHover={{ scale: 1.1, y: -2 }}>
               {link.name}
             </motion.a>
          ))}
          <motion.button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg font-medium flex items-center gap-2" whileHover={{ scale: 1.05 }} onClick={() => window.open('https://example.com/resume.pdf', '_blank')}>
            <FaDownload /> Resume
          </motion.button>
          <motion.button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800" whileHover={{ scale: 1.1, rotate: 180 }}>
            {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
          </motion.button>
        </div>

        {/* MOBILE BUTTONS - Resume, Theme, and Menu are all visible */}
        <div className="md:hidden flex items-center gap-2">
           <motion.button className="p-2" whileHover={{ scale: 1.1 }} onClick={() => window.open('https://example.com/resume.pdf', '_blank')}>
            <FaDownload size={20} />
          </motion.button>
           <motion.button onClick={toggleTheme} className="p-2" whileHover={{ scale: 1.1 }}>
            {isDark ? <FaSun className="text-yellow-400" size={22} /> : <FaMoon size={22} />}
          </motion.button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU - Redesigned to prevent overflow */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-md"
          >
            <div className="flex flex-col items-center space-y-2 p-4">
              {navLinks.map((link) => (
                 <a key={link.name} href={link.href} className="text-lg text-gray-700 dark:text-gray-300 hover:text-cyan-400 w-full text-center py-3" onClick={() => setIsMenuOpen(false)}>
                   {link.name}
                 </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};


// (BlinkingCursor and ParticlesBackground components remain the same)
const BlinkingCursor = () => (
    <motion.div
      className="inline-block h-6 w-2 bg-cyan-400 ml-1"
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
);
const ParticlesBackground = () => {
    // ... same code as before
    const [init, setInit] = useState(false);
    const { isDark } = useTheme();
    useEffect(() => {
        initParticlesEngine(async (engine) => {
        await loadSlim(engine);
        }).then(() => setInit(true));
    }, []);
    const particleOptions = {
        background: { color: { value: 'transparent' } },
        fpsLimit: 120,
        interactivity: {
        events: { onHover: { enable: true, mode: 'repulse' } },
        modes: { repulse: { distance: 80, duration: 0.4 } },
        },
        particles: {
        color: { value: isDark ? "#00ffff" : "#ff00ff" },
        links: { color: isDark ? "#ffffff" : "#000000", distance: 150, enable: true, opacity: 0.2, width: 1 },
        move: { direction: 'none', enable: true, outModes: { default: 'bounce' }, random: true, speed: 1, straight: false },
        number: { density: { enable: true, area: 800 }, value: 80 },
        opacity: { value: 0.6 },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
    };
    if (!init) return null;
    return <Particles id="tsparticles" options={particleOptions} className="fixed inset-0 z-0" />;
};

// Hero Section
const Hero = () => {
  const phrases = ["Full Stack Developer.", "Creative Coder.", "Tech Enthusiast."];
  const [currentPhrase, setCurrentPhrase] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setCurrentPhrase((prev) => (prev + 1) % phrases.length), 3000);
    return () => clearInterval(interval);
  }, []);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-500, 500], [5, -5]);
  const rotateY = useTransform(mouseX, [-500, 500], [-5, 5]);
  const handleMouseMove = (event) => {
    const { clientX, clientY, currentTarget } = event;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  };

   return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden" onMouseMove={handleMouseMove}>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob dark:opacity-30"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:opacity-30"></div>
      <div className="container mx-auto px-4 z-10">
        {/* MODIFICATION: Added min-h-[550px] and flex classes */}
        <motion.div 
          className="max-w-4xl mx-auto bg-white/80 dark:bg-black/20 backdrop-blur-xl rounded-2xl border border-gray-300/50 dark:border-white/20 p-8 text-center shadow-lg dark:shadow-none min-h-[550px] flex flex-col justify-center"
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        >
          {/* Terminal header */}
          <div className="absolute top-4 left-6 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          {/* Content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <img src="/profile.png" alt="Anuj Agarwal" className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-cyan-400/50" />
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">Anuj Agarwal</span>
            </h1>
            <div className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 h-8">
              <span>{phrases[currentPhrase]}</span>
              <BlinkingCursor />
            </div>
            <div className="flex gap-4 justify-center">
              <motion.button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium flex items-center gap-2" whileHover={{ scale: 1.05 }} onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
                <FaRocket /> View Projects
              </motion.button>
              <motion.button className="px-8 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 rounded-lg font-medium flex items-center gap-2" whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 255, 255, 0.1)' }} onClick={() => window.open('https://example.com/resume.pdf', '_blank')}>
                <FaDownload /> My Resume
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const LEETCODE_USERNAME = "oxtSbXIZRN";
const API_URL = `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`;

const LeetCodeProgressChart = ({ stats, isInView }) => {
    const size = 180;
    const strokeWidth = 12;
    const center = size / 2;
    const radius = center - strokeWidth;
    const circumference = 2 * Math.PI * radius;

    const totalSolvedPercentage = stats.totalQuestions > 0 ? (stats.totalSolved / stats.totalQuestions) * 100 : 0;
    const dashArray = (totalSolvedPercentage / 100) * circumference;
    const dashOffset = circumference - dashArray;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
                {/* Background Circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="transparent"
                    stroke="rgba(128, 128, 128, 0.1)"
                    strokeWidth={strokeWidth}
                />
                {/* Progress Circle */}
                <motion.circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="transparent"
                    stroke="url(#gradient)"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    animate={isInView ? { strokeDashoffset: dashOffset } : {}}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
                {/* Gradient Definition */}
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="50%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                </defs>
            </svg>
            
            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-center"
                >
                    <div className="text-3xl font-bold mb-1">
                        {stats.totalSolved}
                        <span className="text-lg text-gray-400 ml-1">/{stats.totalQuestions}</span>
                    </div>
                    <div className="text-sm font-medium text-green-400">Problems Solved</div>
                    <div className="text-xs text-gray-500 mt-1">
                        {Math.round(totalSolvedPercentage)}%
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const DifficultyCard = ({ difficulty, solved, total, color, delay, isInView }) => {
    const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;
    // Ensure minimum visual width for very small percentages
    const visualWidth = Math.max(percentage, percentage > 0 ? 8 : 0);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay }}
            className="bg-white/10 dark:bg-black/30 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
        >
            <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-gray-700 dark:text-gray-300">{difficulty}</span>
                <span className={`w-4 h-4 rounded-full ${color} shadow-sm`}></span>
            </div>
            
            <div className="space-y-3">
                <div className="flex items-end gap-1">
                    <span className="text-3xl font-bold">{solved}</span>
                    <span className="text-gray-500 pb-1">/{total}</span>
                </div>
                
                {/* Enhanced progress bar with better visual feedback */}
                <div className="relative">
                    <div className="w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-3 overflow-hidden">
                        <motion.div
                            className={`h-full rounded-full ${color} relative`}
                            style={{
                                background: `linear-gradient(90deg, ${
                                    color === 'bg-green-500' ? '#10b981, #059669' :
                                    color === 'bg-yellow-500' ? '#f59e0b, #d97706' :
                                    '#ef4444, #dc2626'
                                })`
                            }}
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${visualWidth}%` } : {}}
                            transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeOut" }}
                        >
                            {/* Glow effect for small percentages */}
                            {percentage > 0 && percentage < 10 && (
                                <div className={`absolute inset-0 ${color} opacity-60 blur-sm`}></div>
                            )}
                        </motion.div>
                    </div>
                    
                    {/* Progress indicator dot for very small values */}
                    {percentage > 0 && percentage < 5 && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={isInView ? { scale: 1, opacity: 1 } : {}}
                            transition={{ duration: 0.5, delay: delay + 0.8 }}
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 ${color} rounded-full shadow-sm`}
                        />
                    )}
                </div>
                
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {percentage}% complete
                    </span>
                    {solved > 0 && (
                        <span className="text-xs px-2 py-1 bg-white/20 dark:bg-black/20 rounded-full text-gray-600 dark:text-gray-400">
                            +{solved} solved
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const LeetCodeStats = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`Failed to fetch stats. Status: ${response.status}. Please try again later.`);
                }
                const data = await response.json();
                if (data.status === "error") {
                    throw new Error(data.message);
                }
                setStats(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                setStats(null);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const difficulties = [
        { name: 'Easy', solved: stats?.easySolved || 0, total: stats?.totalEasy || 0, color: 'bg-green-500' },
        { name: 'Medium', solved: stats?.mediumSolved || 0, total: stats?.totalMedium || 0, color: 'bg-yellow-500' },
        { name: 'Hard', solved: stats?.hardSolved || 0, total: stats?.totalHard || 0, color: 'bg-red-500' },
    ];

    return (
        <section id="leetcode" className="py-20 bg-gray-50/50 dark:bg-gray-900/50" ref={ref}>
            <div className="container mx-auto px-4">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-center mb-16"
                >
                    <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        LeetCode Journey
                    </span>
                </motion.h2>

                <div className="max-w-6xl mx-auto">
                    {loading && (
                        <div className="text-center py-20">
                            <div className="inline-flex items-center gap-2">
                                <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-lg">Loading LeetCode stats...</span>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-20">
                            <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg p-6 max-w-md mx-auto">
                                <div className="text-red-600 dark:text-red-400 mb-2">
                                    <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="text-red-800 dark:text-red-200 font-medium">Unable to load stats</p>
                                <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>
                            </div>
                        </div>
                    )}
                    
                    {stats && !loading && !error && (
                        <div className="space-y-8">
                            {/* Main Stats Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8 }}
                                className="bg-gradient-to-br from-white/20 to-white/5 dark:from-black/20 dark:to-black/5 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 p-8 shadow-2xl"
                            >
                                <div className="grid md:grid-cols-3 gap-8 items-center">
                                    {/* Profile Section */}
                                    <div className="text-center md:text-left">
                                        <div className="flex items-center gap-4 justify-center md:justify-start mb-4">
                                            {/* Simple Profile Image - You can replace the src */}
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 p-1">
                                                <img 
                                                    src="/anuj.webp"
                                                    alt="LeetCode Profile" 
                                                    className="w-full h-full rounded-full object-cover bg-white dark:bg-gray-900"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold">Anuj Agarwal</h3>
                                                <p className="text-gray-500 dark:text-gray-400">@{LEETCODE_USERNAME}</p>
                                                {stats.ranking && (
                                                    <p className="text-sm text-purple-500 dark:text-purple-400 font-medium">
                                                        Rank: {stats.ranking.toLocaleString()}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Chart */}
                                    <div className="flex justify-center">
                                        <LeetCodeProgressChart stats={stats} isInView={isInView} />
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center p-3 bg-white/10 dark:bg-black/20 rounded-lg">
                                                <div className="text-2xl font-bold text-green-500">{stats.totalSolved}</div>
                                                <div className="text-xs text-gray-500">Total Solved</div>
                                            </div>
                                            <div className="text-center p-3 bg-white/10 dark:bg-black/20 rounded-lg">
                                                <div className="text-2xl font-bold text-blue-500">{stats.acceptanceRate || 'N/A'}%</div>
                                                <div className="text-xs text-gray-500">Acceptance</div>
                                            </div>
                                        </div>
                                        
                                        <motion.a
                                            href={`https://leetcode.com/${LEETCODE_USERNAME}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full text-center px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <FaExternalLinkAlt className="inline mr-2" />
                                            View Profile
                                        </motion.a>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Difficulty Breakdown */}
                            <div className="grid md:grid-cols-3 gap-6">
                                {difficulties.map((diff, index) => (
                                    <DifficultyCard
                                        key={diff.name}
                                        difficulty={diff.name}
                                        solved={diff.solved}
                                        total={diff.total}
                                        color={diff.color}
                                        delay={index * 0.2}
                                        isInView={isInView}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};





// Project Modal
const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <button
              onClick={onClose}
              className="float-right p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg"
            >
              <FaTimes />
            </button>
            
            <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
            
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">{project.fullDescription}</p>
            
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Challenges & Solutions</h3>
              <p className="text-gray-600 dark:text-gray-400">{project.challenges}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-gray-800 text-white rounded-lg flex items-center gap-2 hover:bg-gray-700"
              >
                <FaGithub /> GitHub
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg flex items-center gap-2"
              >
                <FaExternalLinkAlt /> Live Demo
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Projects Section
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack MERN e-commerce with payment integration",
      fullDescription: "A comprehensive e-commerce solution built with the MERN stack, featuring user authentication, product management, shopping cart functionality, and Stripe payment integration.",
      challenges: "Implementing secure payment processing and optimizing database queries for large product catalogs. Solved by using Stripe's secure APIs and implementing efficient indexing strategies.",
      image: "/gym.png",
      techStack: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
      github: "https://github.com",
      live: "https://example.com"
    },
    {
      id: 2,
      title: "AI Task Manager",
      description: "Smart task management with AI-powered suggestions",
      fullDescription: "An intelligent task management application that uses machine learning to suggest task priorities, estimate completion times, and provide productivity insights.",
      challenges: "Integrating AI models with real-time user data while maintaining performance. Implemented edge caching and background workers for ML inference.",
      image: "/gym.png",
      techStack: ["Next.js", "Python", "TensorFlow", "PostgreSQL", "Redis"],
      github: "https://github.com",
      live: "https://example.com"
    },
    {
      id: 3,
      title: "Real-time Chat App",
      description: "WebSocket-based chat with video calling features",
      fullDescription: "A modern chat application supporting real-time messaging, video calls, file sharing, and group conversations with end-to-end encryption.",
      challenges: "Handling WebRTC connections across different network configurations. Implemented TURN/STUN servers and fallback mechanisms.",
      image: "/gym.png",
      techStack: ["React", "Socket.io", "WebRTC", "Node.js", "Redis"],
      github: "https://github.com",
      live: "https://example.com"
    }
  ];
  
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </motion.h2>
        
        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              // --- MODIFICATION START ---
              // Changed bg-white/10 to bg-white for solid background in light mode
              // Changed border-white/20 to border-gray-200 for a visible border in light mode
              className={`grid md:grid-cols-2 gap-8 bg-white dark:bg-black/10 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-white/10 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
              // --- MODIFICATION END ---
            >
              {/* Project Preview */}
              <div className={`relative overflow-hidden rounded-lg ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
              </div>
              
              {/* Project Info */}
              <div className={`flex flex-col justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <motion.button
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(project.live, '_blank')}
                  >
                    <FaExternalLinkAlt className="inline mr-2" />
                    Live Preview
                  </motion.button>
                  
                  <motion.button
                    className="px-6 py-2 border-2 border-cyan-400 text-cyan-400 rounded-lg"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 255, 255, 0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedProject(project);
                      setIsModalOpen(true);
                    }}
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

// Tech Stack Section
const TechStack = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const technologies = [
    { name: "React", icon: <FaReact />, level: 90, color: "from-cyan-400 to-cyan-600" },
    { name: "Node.js", icon: <FaNodeJs />, level: 85, color: "from-green-400 to-green-600" },
    { name: "MongoDB", icon: <SiMongodb />, level: 75, color: "from-green-500 to-green-700" },
    { name: "Tailwind", icon: <SiTailwindcss />, level: 95, color: "from-teal-400 to-teal-600" },
    { name: "Express", icon: <SiExpress />, level: 80, color: "from-gray-400 to-gray-600" },
    { name: "Java", icon: <FaJava />, level: 80, color: "from-yellow-400 to-yellow-600" },
    { name: "Docker", icon: <FaDocker />, level: 65, color: "from-blue-400 to-blue-600" },
    { name: "Flutter", icon: <FaFlutter />, level: 40, color: "from-blue-400 to-blue-600" },
  ];
  
  return (
    <section id="tech" className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Tech Stack
          </span>
        </motion.h2>
        
        <div ref={ref} className="space-y-6 max-w-3xl mx-auto">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-xl p-4"
            >
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-3">{tech.icon}</span>
                <span className="font-semibold">{tech.name}</span>
                <span className="ml-auto text-sm text-gray-500">{tech.level}%</span>
              </div>
              
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${tech.color}`}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${tech.level}%` } : {}}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Code Snippets Section
const CodeSnippets = () => {
  const [copiedId, setCopiedId] = useState(null);
  
  const snippets = [
    {
      id: 1,
      title: "React Custom Hook",
      description: "useLocalStorage hook for persistent state",
      language: "javascript",
      code: `const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};`
    },
    {
      id: 2,
      title: "CSS Glassmorphism",
      description: "Modern glass effect with backdrop filter",
      language: "css",
      code: `.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}`
    },
    {
      id: 3,
      title: "TypeScript Interface",
      description: "Type-safe API response handler",
      language: "typescript",
      code: `interface ApiResponse<T> {
  data: T;
  error: string | null;
  loading: boolean;
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return { data, error: null, loading: false };
  } catch (error) {
    return { 
      data: null as T, 
      error: error.message, 
      loading: false 
    };
  }
}`
    }
  ];
  
  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  return (
    <section id="snippets" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Code Snippets</span>
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {snippets.map((snippet) => (
            <motion.div key={snippet.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -5 }} className="bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 dark:border-white/10 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{snippet.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{snippet.description}</p>
                </div>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs flex-shrink-0">{snippet.language}</span>
              </div>
              
              <div className="relative flex-grow bg-gray-900 rounded-lg">
                {/* MODIFICATION: Removed the overflow div, added .code-wrap to the <pre> tag */}
                <pre className="code-wrap text-gray-300 p-4 text-sm">
                    <code>{snippet.code}</code>
                </pre>
                <motion.button className="absolute top-2 right-2 p-2 bg-gray-800 rounded hover:bg-gray-700" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => copyToClipboard(snippet.code, snippet.id)}>
                  {copiedId === snippet.id ? '✓' : <FaCopy />}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Timeline Section
const Timeline = () => {
  // --- MODIFICATION START ---
  // Replace the old timelineData with this new one
  const timelineData = [
    {
      year: "Present",
      title: "Building Full-Stack Projects",
      company: "Personal Development",
      description: "Applying my skills to create projects like an alumni portal, a chess game, and a smart expense tracker.",
      icon: <FaRocket /> // Changed icon
    },
    {
      year: "2025",
      title: "Mastered Full Stack Development",
      company: "Self-Taught",
      description: "Became proficient with the MERN stack (MongoDB, Express, React, Node.js) and modern tools like Tailwind CSS.",
      icon: <FaLaptopCode />
    },
    {
      year: "2024",
      title: "Learned Data Structures & Algorithms",
      company: "Apna College",
      description: "Built a strong foundation in core computer science principles and problem-solving.",
      icon: <FaCode />
    },
    {
      year: "2024",
      title: "Started B.Tech in Computer Science Engineering",
      description: "Began my formal journey into the world of technology and computer science.",
      icon: <FaGraduationCap />
    }
  ];
  // --- MODIFICATION END ---
  
  return (
    <section id="timeline" className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {/* --- MODIFICATION: Update the title here --- */}
            My Journey
          </span>
        </motion.h2>
        
        {/* The rest of the component's JSX remains the same */}
        <div className="max-w-4xl mx-auto">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className={`flex items-center mb-8 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <motion.div
                  className="bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-xl p-6 inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-purple-500 text-2xl mb-2">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{item.company}</p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm">{item.description}</p>
                </motion.div>
              </div>
              
              <div className="relative">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.year}
                </motion.div>
                {index !== timelineData.length - 1 && (
                  <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-0.5 h-24 bg-gradient-to-b from-purple-500 to-cyan-500" />
                )}
              </div>
              
              <div className="flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "Tech Startup",
      role: "CEO",
      image: "https://via.placeholder.com/100",
      quote: "Exceptional developer with great attention to detail. Delivered our project ahead of schedule with outstanding quality."
    },
    {
      id: 2,
      name: "Mike Chen",
      company: "Digital Agency",
      role: "CTO",
      image: "https://via.placeholder.com/100",
      quote: "One of the best developers I've worked with. Strong technical skills and excellent communication throughout the project."
    },
    {
      id: 3,
      name: "Emily Davis",
      company: "E-commerce Co",
      role: "Product Manager",
      image: "https://via.placeholder.com/100",
      quote: "Transformed our vision into reality. The attention to user experience and performance optimization was remarkable."
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Client Testimonials
          </span>
        </motion.h2>
        
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-white/10"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-lg">{testimonials[currentIndex].name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
              
              <p className="text-lg italic text-gray-700 dark:text-gray-300">
                "{testimonials[currentIndex].quote}"
              </p>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-gradient-to-r from-purple-500 to-cyan-500'
                    : 'bg-gray-400'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
// Contact Section with Web3Forms Integration
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  // Replace with your actual Web3Forms access key
  const WEB3FORMS_ACCESS_KEY = "385d3253-8ccc-4002-87c8-091439a85b08";

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Optional field, but if provided should be valid
    if (!phone) return true;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional)
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          message: formData.message,
          // Web3Forms specific fields
          subject: `New Contact Form Submission from ${formData.name}`,
          from_name: formData.name,
          // Optional: Add current timestamp
          timestamp: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
      } else {
        throw new Error(result.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Get In Touch
          </span>
        </motion.h2>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/80 dark:bg-black/20 backdrop-blur-xl rounded-2xl border border-gray-300/50 dark:border-white/20 p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg flex items-center gap-2"
                >
                  <FaCheckCircle className="text-green-500" />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg flex items-center gap-2"
                >
                  <FaTimes className="text-red-500" />
                  <span>Failed to send message. Please try again.</span>
                </motion.div>
              )}

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  className={`w-full px-4 py-3 bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-lg border ${
                    errors.name 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 dark:border-gray-700 focus:border-purple-500'
                  } focus:outline-none transition-colors`}
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <FaTimes className="text-xs" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-lg border ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 dark:border-gray-700 focus:border-purple-500'
                  } focus:outline-none transition-colors`}
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <FaTimes className="text-xs" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Field (Optional) */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Phone Number <span className="text-gray-500 text-sm">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+1234567890"
                  className={`w-full px-4 py-3 bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-lg border ${
                    errors.phone 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 dark:border-gray-700 focus:border-purple-500'
                  } focus:outline-none transition-colors`}
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <FaTimes className="text-xs" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or just say hello..."
                  rows="5"
                  className={`w-full px-4 py-3 bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-lg border ${
                    errors.message 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 dark:border-gray-700 focus:border-purple-500'
                  } focus:outline-none transition-colors resize-vertical`}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <FaTimes className="text-xs" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white'
                }`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaEnvelope />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 dark:border-white/10">
              <h3 className="text-xl font-semibold mb-4">Let's Connect!</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Feel free to reach out for collaborations or just a friendly hello!
              </p>
              
              <div className="space-y-4">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=anujagarwal1704@gmail.com"
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-purple-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaEnvelope className="text-xl" />
                  anujagarwal1704@gmail.com
                </a>
                
                <a
                  href="https://github.com/AnujAga2005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-purple-500"
                >
                  <FaGithub className="text-xl" />
                  GitHub
                </a>
                
                <a
                  href="https://www.linkedin.com/in/a---garwal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-purple-500"
                >
                  <FaLinkedin className="text-xl" />
                  LinkedIn
                </a>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg border border-purple-500/20">
                <h4 className="font-semibold mb-2 text-purple-600 dark:text-purple-400">Quick Response</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  I typically respond to messages within 24 hours. For urgent inquiries, feel free to reach out via LinkedIn.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/7003456844"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaWhatsapp className="text-2xl" />
      </motion.a>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="py-8 bg-black/20 backdrop-blur-sm border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400">
            © 2025 Anuj Agarwal
          </p>
          
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://github.com/AnujAga2005" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-xl hover:text-purple-500 transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/a---garwal/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-xl hover:text-purple-500 transition-colors" />
            </a>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=anujagarwal1704@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaEnvelope className="text-xl hover:text-purple-500 transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <ThemeProvider>
      {/* FIX 1: Added "overflow-x-hidden" to the main container to prevent horizontal scrollbars on mobile. */}
      <div className="min-h-screen bg-slate-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 selection:bg-cyan-300 selection:text-cyan-900 overflow-x-hidden">
        <ParticlesBackground />
        <Navbar />
        <main>
          <Hero />
          <LeetCodeStats />
          <Projects />
          <TechStack />
          <CodeSnippets />
          <Timeline />
          {/* <Testimonials /> */}
          <Contact /> 
        </main>
        <Footer /> 
      </div>
    </ThemeProvider>
  );
};

export default App;