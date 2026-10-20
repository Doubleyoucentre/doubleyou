import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supportPaymentLink } from "../lib/support-payment";

const NAIRA_ACCOUNT = "1000555378";
const USD_ACCOUNT = "5000153088";

const GiveSection = () => {
  const payment = supportPaymentLink(import.meta.env.VITE_SUPPORT_PAYMENT_URL);
  const [copiedType, setCopiedType] = useState<"NAIRA" | "USD" | null>(null);

  const handleCopy = async (account: string, type: "NAIRA" | "USD") => {
    try {
      await navigator.clipboard.writeText(account);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      // fallback: create temp input
      const input = document.createElement("input");
      input.value = account;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    }
  };

  return (
    <section id="give" className="bg-[#FAFAF8] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="tag-chip">Be Part of Our Impact</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-3xl sm:text-4xl md:text-5xl leading-tight text-balance font-black text-[#0E1B2E] mb-4"
          >
            Join Us in Building the Future
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            viewport={{ once: true }}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            Be part of the education, innovation and community impact we are
            building across Africa. Choose how you would like to participate
            and support the work.
          </motion.p>
          <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Link to="/hall-of-fame" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0E1B2E] px-6 py-3 text-sm font-bold text-white">Explore the Hall of Fame <ArrowUpRight size={18} aria-hidden="true" /></Link>
            {payment && <a href={payment.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#F7C928] px-6 py-3 text-sm font-bold text-[#0E1B2E]">Contribute via {payment.provider} <ArrowUpRight size={18} aria-hidden="true" /></a>}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bank Transfer Card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
            className="min-w-0 bg-[#0E1B2E] rounded-3xl p-5 sm:p-8 text-white"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#F7C928]/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#F7C928]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <p className="text-[#F7C928] text-xs font-bold uppercase tracking-widest">
                  Bank Transfer
                </p>
                <p className="text-white/50 text-xs">Globus bank</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                  Account Name
                </p>
                <p className="text-white font-bold text-lg">DOUBLEYOU DIGITAL INNOVATION CENTER</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                  Bank
                </p>
                <p className="text-white font-bold text-lg">Globus bank</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                      Naira Account
                    </p>
                    <p className="text-white font-black text-xl md:text-2xl tracking-widest">
                      {NAIRA_ACCOUNT}
                    </p>
                  </div>
                  <motion.button
                    onClick={() => handleCopy(NAIRA_ACCOUNT, "NAIRA")}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      copiedType === "NAIRA"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-[#F7C928] text-[#0E1B2E] hover:bg-yellow-300"
                    }`}
                  >
                    {copiedType === "NAIRA" ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                      USD Account
                    </p>
                    <p className="text-white font-black text-xl md:text-2xl tracking-widest">
                      {USD_ACCOUNT}
                    </p>
                  </div>
                  <motion.button
                    onClick={() => handleCopy(USD_ACCOUNT, "USD")}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      copiedType === "USD"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-[#F7C928] text-[#0E1B2E] hover:bg-yellow-300"
                    }`}
                  >
                    {copiedType === "USD" ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Impact message */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-[#F0FDF4] border border-[#86EFAC] rounded-3xl p-7 flex-1"
            >
              <h3 className="font-black text-[#0E1B2E] text-xl mb-4">
                Your support makes possible:
              </h3>
              <ul className="space-y-3">
                {[
                  "Fund fellowship programs for university students",
                  "Expand blood drive campaigns across Nigerian states",
                  "Build and maintain free learning tools for schools",
                  "Support early-stage African founders via our ecosystem",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700 text-sm">
                    <div className="w-5 h-5 rounded-full bg-[#16A34A] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiveSection;
