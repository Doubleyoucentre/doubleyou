import { motion } from "framer-motion";

const actions = [
  {
    id: "join",
    icon: "🎓",
    title: "Join",
    subtitle: "Become an ASIP Fellow",
    description:
      "Explore the six-month African Student Impact Program and the real projects fellows contribute to. Applications for the August 2026 cohort are closed.",
    cta: "Explore ASIP",
    href: "/african-student-impact-program",
    color: "#16A34A",
    bgColor: "#F0FDF4",
    borderColor: "#86EFAC",
  },
  {
    id: "partner",
    icon: "🤝",
    title: "Partner",
    subtitle: "Build with us",
    description:
      "Whether you're a university, NGO, government agency, or company — let's explore how we can create impact together.",
    cta: "Get in Touch",
    href: "mailto:hello@doubleyou.com.ng?subject=Partnership Inquiry",
    color: "#D97706",
    bgColor: "#FFFBEB",
    borderColor: "#FCD34D",
  },
  {
    id: "explore",
    icon: "🌍",
    title: "Explore",
    subtitle: "Discover our ecosystem",
    description:
      "Dive into our platforms, programs, and initiatives — and see how Doubleyou is advancing human potential across Africa.",
    cta: "Explore Our Work",
    href: "#core-solutions",
    color: "#0E1B2E",
    bgColor: "#EEF2F8",
    borderColor: "#93C5FD",
    isScroll: true,
  },
];

const FinalCTA = () => {
  const handleClick = (action: typeof actions[0], e: React.MouseEvent) => {
    if (action.isScroll) {
      e.preventDefault();
      const section = document.getElementById("core-solutions");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="final-cta"
      className="relative py-32 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0E1B2E 0%, #162438 70%, #1a3a2a 100%)",
      }}
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#F7C928]/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Headline */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-[#F7C928]/15 border border-[#F7C928]/30 text-[#F7C928] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F7C928] animate-pulse" />
              The Future Is Collaborative
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white leading-tight mb-6"
          >
            Be Part of the Future{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #F7C928, #16A34A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              We're Building
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            viewport={{ once: true }}
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Doubleyou is more than an organisation — it's a movement. Join us,
            partner with us, or simply spread the word. Together, we advance
            human potential across Africa.
          </motion.p>
        </div>

        {/* Action cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actions.map((action, i) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl p-8 flex flex-col hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-5">{action.icon}</div>
              <p
                className="text-xs font-black uppercase tracking-widest mb-1"
                style={{ color: action.color }}
              >
                {action.title}
              </p>
              <h3 className="text-xl font-bold text-[#0E1B2E] mb-3">
                {action.subtitle}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-6">
                {action.description}
              </p>
              <a
                href={action.href}
                onClick={(e) => handleClick(action, e)}
                target={action.href.startsWith("mailto:") ? "_blank" : undefined}
                rel={action.href.startsWith("mailto:") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-full transition-colors text-white"
                style={{ backgroundColor: action.color }}
              >
                {action.cta}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Bottom social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/40 text-sm mb-4">Follow our journey</p>
          <div className="flex justify-center gap-6">
            {[
              { label: "Instagram", href: "https://www.instagram.com/doubleyoucenter?obrf=a3N4MHZhYXBnMWZn" },
              { label: "LinkedIn", href: "https://www.linkedin.com/company/doubleyougroup/" },
              { label: "Facebook", href: "https://www.facebook.com/Doubleyouinitiative" },
              { label: "X (Twitter)", href: "https://twitter.com/DoubleyouNGA" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#F7C928] text-sm font-medium transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade to footer */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0E1B2E] to-transparent" />
    </section>
  );
};

export default FinalCTA;
