import { motion } from "framer-motion";
import { BookOpen, Globe, HeartPulse } from "lucide-react";
import { bloodPartners } from "../lib/blood-partners";

const partnerCategories = [
  {
    label: "Education & Research",
    icon: <BookOpen className="w-5 h-5" />,
    partners: [
      {
        short: "CU",
        name: "Covenant University",
        detail: "CUCRID · Primary Hub Partner",
        color: "#002147",
      },
      {
        short: "AUN",
        name: "American University of Nigeria",
        detail: "Fellows Program Partner",
        color: "#1B4FBF",
      },
      {
        short: "UG",
        name: "University of Ghana",
        detail: "Fellows Program Partner",
        color: "#006400",
      },
    ],
  },
  {
    label: "Technology & Connectivity",
    icon: <Globe className="w-5 h-5" />,
    partners: [
      {
        short: "MTN",
        name: "MTN Nigeria",
        detail: "Digital Access Partner",
        color: "#FFCC00",
        textColor: "#0E1B2E",
      },
    ],
  },
  {
    label: "Health & Social Impact",
    icon: <HeartPulse className="w-5 h-5" />,
    partners: bloodPartners.map(name => ({ name, detail: "Blood Drive Partner", short: "", color: "" })),
  },
];



const PartnerSection = () => {
  return (
    <section id="partners" className="bg-[#F4F4F1] py-24 px-6">
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
            <span className="tag-chip">Partners & Collaboration</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-[#0E1B2E] mb-4"
          >
            Built Together
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            viewport={{ once: true }}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            Doubleyou doesn't work alone. Every milestone we reach is a product
            of meaningful collaboration — with institutions, organizations, and
            leaders who share our commitment to African human capital.
          </motion.p>
        </div>

        {/* Partner categories */}
        <div className="space-y-8 mb-16">
          {partnerCategories.map((category, ci) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
              viewport={{ once: true }}
              className="min-w-0 bg-white rounded-3xl border border-gray-100 p-5 sm:p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-[#EEF2F8] flex items-center justify-center text-[#0E1B2E]">
                  {category.icon}
                </div>
                <h3 className="font-bold text-[#0E1B2E] text-base">
                  {category.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {category.partners.map((partner) => (
                  <div
                    key={partner.name}
                    className="flex items-center gap-3 border rounded-2xl px-4 py-3 flex-1 basis-full sm:basis-[200px] min-w-0"
                    style={{ borderColor: "#E5E7EB" }}
                  >
                    {partner.short && <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0"
                      style={{
                        backgroundColor: partner.color,
                        color: (partner as { textColor?: string }).textColor || "white",
                      }}
                    >
                      {partner.short}
                    </div>}
                    <div className="min-w-0">
                      <p className="font-semibold text-[#0E1B2E] text-sm leading-snug">
                        {partner.name}
                      </p>
                      <p className="text-gray-400 text-xs">{partner.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partner With Us card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
          className="bg-[#0E1B2E] rounded-3xl p-10 text-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[#F7C928] text-xs font-bold uppercase tracking-widest mb-3">
                Partner With Us
              </p>
              <h3 className="text-3xl font-black mb-4 leading-tight">
                Let's Shape the Future Together
              </h3>
              <p className="text-white/60 text-base leading-relaxed">
                We are actively seeking partnerships with organisations that
                believe in the power of education, innovation, and African
                human potential.
              </p>
            </div>
            <div className="flex items-end">
              <a
                href="mailto:hello@doubleyou.com.ng?subject=Partnership Inquiry"
                className="inline-flex items-center gap-2 bg-[#F7C928] text-[#0E1B2E] font-bold text-sm px-6 py-3 rounded-full hover:bg-yellow-300 transition-colors"
              >
                Get in Touch
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerSection;
