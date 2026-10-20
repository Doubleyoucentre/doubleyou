import { motion } from "framer-motion";

const universities = [
  {
    name: "Covenant University",
    short: "CU",
    country: "Nigeria",
    logoSearch: "https://logo.clearbit.com/covenantuniversity.edu.ng",
    color: "#002147",
    bgColor: "#EEF2F8",
  },
  {
    name: "American University of Nigeria",
    short: "AUN",
    country: "Nigeria",
    logoSearch: "https://logo.clearbit.com/aun.edu.ng",
    color: "#1B4FBF",
    bgColor: "#EEF2F8",
  },
  {
    name: "University of Ghana",
    short: "UG",
    country: "Ghana",
    logoSearch: "https://logo.clearbit.com/ug.edu.gh",
    color: "#006400",
    bgColor: "#F0FDF4",
  },
];

const tracks = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    name: "Technology Development",
    color: "#0E1B2E",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    name: "Educational Content & Curriculum Design",
    color: "#16A34A",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    name: "Gamification & Creative Design",
    color: "#D97706",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    name: "Project Management & Growth",
    color: "#DC2626",
  },
];

const FellowshipProgram = () => {
  return (
    <section id="fellowship" className="bg-[#0E1B2E] py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-5"
            >
              <span className="inline-flex items-center gap-2 bg-[#F7C928]/15 border border-[#F7C928]/30 text-[#F7C928] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full">
                African Student Impact Program (ASIP)
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-6 text-balance"
            >
              African Student{" "}
              <span className="text-[#F7C928]">Impact Program</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-white/70 text-lg leading-relaxed mb-8"
            >
              A six-month remote program that gives students across Africa
              hands-on experience in edtech. Fellows work on
              real-world projects — from app development and storytelling to
              gamification and project management.
            </motion.p>

            {/* Fellowship tracks */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">
                Fellowship Tracks
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tracks.map((track) => (
                  <div
                    key={track.name}
                    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${track.color}22`, color: track.color === "#0E1B2E" ? "#93C5FD" : track.color }}
                    >
                      {track.icon}
                    </div>
                    <span className="text-white/80 text-sm font-medium">
                      {track.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right side — universities */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-5">
                Partner Universities
              </p>
              <div className="space-y-4">
                {universities.map((uni, i) => (
                  <motion.div
                    key={uni.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors"
                  >
                    {/* Logo placeholder with initials */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-black text-lg"
                      style={{ backgroundColor: uni.color }}
                    >
                      {uni.short}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{uni.name}</p>
                      <p className="text-white/50 text-sm">{uni.country}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Apply CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                viewport={{ once: true }}
                className="mt-8 bg-[#F7C928] rounded-2xl p-6"
              >
                <p className="text-[#0E1B2E] font-bold text-lg mb-1">
                  Explore the ASIP experience
                </p>
                <p className="text-[#0E1B2E]/70 text-sm mb-4">
                  Discover the program tracks and opportunities for students
                  across Africa. Applications for the August 2026 cohort are closed.
                </p>
                <a
                  href="/african-student-impact-program"
                  className="inline-flex items-center gap-2 bg-[#0E1B2E] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#162438] transition-colors"
                >
                  View ASIP program
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FellowshipProgram;
