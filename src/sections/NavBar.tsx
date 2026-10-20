import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef } from 'react';
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", id: "about-us" },
  { label: "Ecosystem", id: "core-solutions" },
  { label: "Partners", id: "partners" },
  { label: "Give", id: "give" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton=useRef<HTMLButtonElement>(null);
  useEffect(()=>{
    if(location.pathname!=='/'||!/^#[a-z0-9-]+$/.test(location.hash))return;
    // Lazy sections and images above the target can move it after it first mounts.
    // Follow layout changes briefly, but let intentional visitor scrolling take over.
    let frame=0;
    const align=()=>{
      cancelAnimationFrame(frame);
      frame=requestAnimationFrame(()=>{
        const section=document.getElementById(location.hash.slice(1));
        if(section)window.scrollTo({top:Math.max(0,window.scrollY+section.getBoundingClientRect().top-96),behavior:'instant'});
      });
    };
    const observer=new MutationObserver(align);
    const resize=new ResizeObserver(align);
    observer.observe(document.body,{childList:true,subtree:true});
    resize.observe(document.body);
    const stop=()=>{observer.disconnect();resize.disconnect();cancelAnimationFrame(frame)};
    window.addEventListener('wheel',stop,{passive:true});
    window.addEventListener('touchmove',stop,{passive:true});
    const keyStop=(event:KeyboardEvent)=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key))stop()};
    window.addEventListener('keydown',keyStop);
    align();
    const timer=setTimeout(stop,5000);
    return()=>{clearTimeout(timer);stop();window.removeEventListener('wheel',stop);window.removeEventListener('touchmove',stop);window.removeEventListener('keydown',keyStop)};
  },[location.pathname,location.hash,location.key]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigateOrScroll = (id: string) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate({ pathname: "/", hash: `#${id}` });
      return;
    }
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth" });
  };

  const handleProgramNavigate = () => {
    navigate("/african-student-impact-program");
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a
              href="/"
              aria-label="Doubleyou Home"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
                setMenuOpen(false);
              }}
              className="flex-shrink-0"
            >
              <img
                src="/ddd.jpg"
                alt="Doubleyou Logo"
                className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover cursor-pointer"
              />
            </a>

            <div className="hidden lg:flex items-center gap-5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavigateOrScroll(link.id)}
                  className="relative text-[15px] font-medium text-gray-700 hover:text-[#0E1B2E] transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-[#F7C928] transition-all duration-300 group-hover:w-full rounded-full" />
                </button>
              ))}
              <Link to="/hall-of-fame" className="inline-flex min-h-11 items-center text-[15px] font-semibold text-gray-700 hover:underline">Hall of Fame</Link>
              <button
                onClick={handleProgramNavigate}
                className="relative text-[15px] font-medium text-gray-700 hover:text-[#0E1B2E] transition-colors duration-200 group"
              >
                ASIP
                <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-[#F7C928] transition-all duration-300 group-hover:w-full rounded-full" />
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleNavigateOrScroll("final-cta")}
                className="bg-[#0E1B2E] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#162438] transition-colors"
              >
                Join the Movement
              </motion.button>
            </div>

            <button
              ref={menuButton}
              className="lg:hidden min-h-11 min-w-11 p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="site-mobile-navigation"
              onKeyDown={e=>{if(e.key==='Escape')setMenuOpen(false)}}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="site-mobile-navigation"
            onKeyDown={e=>{if(e.key==='Escape'){setMenuOpen(false);menuButton.current?.focus()}}}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.28 }}
            className="fixed inset-0 z-40 bg-[#0E1B2E] flex flex-col overflow-y-auto px-6 pt-24 pb-10 lg:hidden"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => handleNavigateOrScroll(link.id)}
                  className="text-3xl font-bold text-white text-left hover:text-[#F7C928] transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <Link to="/hall-of-fame" onClick={()=>setMenuOpen(false)} className="flex min-h-11 items-center text-3xl font-bold text-white hover:underline">Hall of Fame</Link>
              <motion.button
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
                onClick={handleProgramNavigate}
                className="text-3xl font-bold text-white text-left hover:text-[#F7C928] transition-colors"
              >
                ASIP
              </motion.button>
            </nav>
            <div className="mt-auto">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                onClick={() => handleNavigateOrScroll("final-cta")}
                className="w-full bg-[#F7C928] text-[#0E1B2E] font-bold text-lg py-4 rounded-2xl"
              >
                Join the Movement
              </motion.button>
              <p className="text-white/40 text-xs text-center mt-6">
                Advancing Human Potential Across Africa
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
