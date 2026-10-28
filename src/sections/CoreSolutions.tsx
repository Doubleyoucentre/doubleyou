import { motion } from "framer-motion";
import book from "../assets/Book.svg";

const products = [
  {
    id: "labari",
    name: "Labari Books",
    tagline: "Read. Listen. Watch.",
    description:
      "Africa's digital storytelling platform. Labari preserves and amplifies African narratives through audio, text, and video — bridging tradition with modern technology to promote cultural identity and healing.",
    icon: book,
    color: "#16A34A",
    bgColor: "#F0FDF4",
    borderColor: "#86EFAC",
    textColor: "#15803D",
    cta: "https://labaribooks.com",
    ctaLabel: "Explore Labari →",
  },
  {
    id: "glove",
    name: "GLOVE",
    tagline: "In development",
    description: "GLOVE is in development.",
    icon: null,
    color: "#1B4FBF",
    bgColor: "#EEF2F8",
    borderColor: "#93C5FD",
    textColor: "#1B4FBF",
    cta: null,
    ctaLabel: "Development in Progress",
  },
  {
    id: "innov",
    name: "Innovation Ecosystem",
    tagline: "Build. Scale. Impact.",
    description:
      "A support framework for ideas, founders, and high-impact research. We provide mentorship, collaborative infrastructure, and community resources to help visionaries build solutions that matter.",
    icon: null,
    color: "#D97706",
    bgColor: "#FFFBEB",
    borderColor: "#FCD34D",
    textColor: "#B45309",
    cta: null,
    ctaLabel: "Coming Soon",
  },
];

const CoreSolutions = () => {
  return (
    <section
      id="core-solutions"
      className="py-24 px-6"
      style={{ background: "#FAFAF8" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="tag-chip">Our Ecosystem</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-[#0E1B2E] mb-4"
          >
            Three Products. One Vision.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            viewport={{ once: true }}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            Each product in the Doubleyou ecosystem is purpose-built to expand
            access to knowledge and opportunity across Africa.
          </motion.p>
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: i * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              className="min-w-0 bg-white rounded-3xl border p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all flex flex-col"
              style={{ borderColor: product.borderColor }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 flex-shrink-0"
                style={{ backgroundColor: product.bgColor }}
              >
                {product.icon ? (
                  <img src={product.icon} alt={product.name} className="w-8 h-8" />
                ) : product.id === "glove" ? (
                  <span className="text-2xl font-black" style={{ color: product.color }} aria-hidden="true">G</span>
                ) : (
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    style={{ color: product.color }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <span
                  className="text-xs font-bold tracking-widest uppercase mb-2 block"
                  style={{ color: product.color }}
                >
                  {product.tagline}
                </span>
                <h3 className="text-xl font-bold text-[#0E1B2E] mb-3">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {product.description}
                </p>
              </div>

              {/* CTA */}
              {product.cta ? (
                <a
                  href={product.cta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-bold transition-colors"
                  style={{ color: product.color }}
                >
                  {product.ctaLabel}
                </a>
              ) : (
                <div className="flex items-start gap-2 text-sm font-medium text-gray-600">
                  <div className="w-2 h-2 mt-1.5 shrink-0 rounded-full" style={{ backgroundColor: product.color }} />
                  {product.ctaLabel}
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreSolutions;
