import { motion } from "framer-motion";

const sdgs = [
  {
    number: "SDG 3",
    title: "Good Health & Well-Being",
    description:
      "Our National Blood Drive directly contributes to health system resilience and saving lives across Nigerian communities.",
    color: "#4CAF50",
    bgColor: "#F0FDF4",
    borderColor: "#86EFAC",
    icon: "❤️",
  },
  {
    number: "SDG 4",
    title: "Quality Education",
    description:
      "Quest and our fellowship programs expand access to equitable, inclusive, and lifelong learning opportunities.",
    color: "#C0392B",
    bgColor: "#FEF2F2",
    borderColor: "#FECACA",
    icon: "📚",
  },
  {
    number: "SDG 8",
    title: "Decent Work & Economic Growth",
    description:
      "Our African Student Impact Program (ASIP) and internship ecosystem create real pathways to employment for young Africans.",
    color: "#8E44AD",
    bgColor: "#FAF5FF",
    borderColor: "#D8B4FE",
    icon: "💼",
  },
  {
    number: "SDG 17",
    title: "Partnerships for the Goals",
    description:
      "We actively build multi-stakeholder partnerships — with universities, corporations, NGOs, and governments — to amplify collective impact.",
    color: "#1A5276",
    bgColor: "#EEF2F8",
    borderColor: "#93C5FD",
    icon: "🤝",
  },
];

const GlobalAlignment = () => {
  return (
    <section id="global-alignment" className="bg-[#F4F4F1] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-5"
            >
              <span className="tag-chip">Global Alignment</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-[#0E1B2E] leading-tight"
            >
              Aligned with the{" "}
              <span className="text-[#16A34A]">UN Sustainable</span>{" "}
              Development Goals
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-600 text-lg leading-relaxed"
          >
            Our work is not just local — it is part of a broader global
            commitment to sustainable development. Every program, product, and
            partnership at Doubleyou maps directly to the UN SDGs.
          </motion.p>
        </div>

        {/* SDG cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {sdgs.map((sdg, i) => (
            <motion.div
              key={sdg.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl border p-6 shadow-sm hover:shadow-md transition-all"
              style={{ borderColor: sdg.borderColor }}
            >
              {/* Emoji icon */}
              <div className="text-3xl mb-4">{sdg.icon}</div>

              {/* SDG badge */}
              <span
                className="text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full mb-3 inline-block"
                style={{
                  backgroundColor: sdg.bgColor,
                  color: sdg.color,
                  border: `1px solid ${sdg.borderColor}`,
                }}
              >
                {sdg.number}
              </span>

              <h3 className="font-bold text-[#0E1B2E] text-base mb-2 leading-snug">
                {sdg.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {sdg.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-sm">
            Supported by independent initiative · Committed to Sustainable Development Goals
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalAlignment;
