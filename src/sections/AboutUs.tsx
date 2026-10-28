import { motion } from "framer-motion";

const stats = [
  {
    value: "9",
    label: "African Countries",
    detail: "Active ASIP fellows",
    verifiedAt: "2026-10-24",
    verifiedLabel: "24 October 2026",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

function AboutUs() {
  return (
    <section id="about-us" className="bg-[#FAFAF8] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top tag */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-5"
        >
          <span className="tag-chip">Who We Are</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-[#0E1B2E] leading-tight mb-6"
            >
              An institution built for{" "}
              <span className="relative inline-block">
                Africa's future
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="6"
                  viewBox="0 0 200 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 3 Q50 0 100 3 Q150 6 200 3"
                    stroke="#F7C928"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-600 text-lg leading-relaxed mb-5"
            >
              Doubleyou is a mission-driven institution operating at the
              intersection of <strong className="text-[#0E1B2E]">education</strong>,{" "}
              <strong className="text-[#0E1B2E]">technology</strong>, and{" "}
              <strong className="text-[#0E1B2E]">human capital development</strong>.
              We build systems that expand access to knowledge, empower young
              people, and create real pathways to opportunity.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-600 text-base leading-relaxed mb-8"
            >
              Founded in 2019, we have grown from a local initiative into a
              continental platform—partnering with universities, corporations,
              and governments across Africa to make education accessible,
              engaging, and rewarding. Our primary hub is at the{" "}
              <span className="font-semibold text-[#0E1B2E]">
                CUCRID Centre at Covenant University
              </span>
              , Nigeria.
            </motion.p>


          </div>

          {/* Only verified, dated impact figures are published. */}
          <div className="min-w-0">
            <div className="grid gap-5" aria-label="Verified ASIP reach">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="min-w-0 h-full bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-3xl sm:text-4xl leading-tight font-black text-[#0E1B2E] mb-1">
                    {stat.value}
                  </p>
                  <p className="text-base leading-snug text-[#0E1B2E] font-semibold break-words">{stat.label}</p>
                  <p className="text-sm leading-relaxed text-gray-600 mt-2">{stat.detail}</p>
                  <p className="text-xs leading-relaxed text-gray-500 mt-1">
                    Verified <time dateTime={stat.verifiedAt}>{stat.verifiedLabel}</time>
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-5 bg-[#F7C928]/10 border border-[#F7C928]/30 rounded-2xl p-5 flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-full bg-[#F7C928] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-[#0E1B2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="min-w-0 break-words">
                <p className="text-sm font-bold text-[#0E1B2E] mb-0.5">Primary Hub</p>
                <p className="text-sm text-gray-600">
                  Covenant University CUCRID Centre — Ota, Ogun State, Nigeria
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
