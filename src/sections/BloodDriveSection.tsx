import { motion } from "framer-motion";
import { bloodPartners } from "../lib/blood-partners";

const BloodDriveSection = () => {
  return (
    <section id="blood-drive" className="bg-[#FAFAF8] py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/blood-drive.jpg"
                alt="National Blood Drive Initiative"
                className="w-full h-[440px] object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-5 left-5 bg-white rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500 animate-pulse" />
                <span className="font-bold text-[#0E1B2E] text-sm">
                  Active Initiative
                </span>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -z-10 -bottom-6 -left-6 w-full h-full bg-red-50 rounded-3xl" />
          </motion.div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-5"
            >
              <span className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Social Impact Initiative
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-[#0E1B2E] leading-tight mb-6"
            >
              National{" "}
              <span className="text-red-600">Blood Drive</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-600 text-lg leading-relaxed mb-6"
            >
              Beyond education, Doubleyou is committed to saving lives. Our{" "}
              <strong className="text-[#0E1B2E]">National Blood Drive</strong>{" "}
              initiative mobilizes donors across Nigeria in partnership with
              leading health and development organizations.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              viewport={{ once: true }}
              className="text-gray-600 text-base leading-relaxed mb-8"
            >
              Through awareness campaigns, donation drives, and community
              mobilization, we are working to ensure that no one dies from a
              lack of blood in hospitals across the country.
            </motion.p>

            {/* Verified organisation names; no unverified logo artwork. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-4">
                Initiative Partners
              </p>
              <ul className="flex flex-wrap gap-3">
                {bloodPartners.map((name) => (
                  <li
                    key={name}
                    className="max-w-full min-w-0 border rounded-xl px-4 py-3 bg-white shadow-sm text-sm font-semibold text-[#0E1B2E]"
                    style={{ borderColor: "#FECACA" }}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="https://www.instagram.com/doubleyoucenter?obrf=a3N4MHZhYXBnMWZn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-red-700 transition-colors"
              >
                Learn More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BloodDriveSection;
