import { Link } from 'react-router-dom';

const Footer = () => {

  const navLinks = [
    { label: "About", id: "about-us" },
    { label: "Our Ecosystem", id: "core-solutions" },
    { label: "Campus Fellows", id: "fellowship" },
    { label: "Blood Drive", id: "blood-drive" },
    { label: "Partners", id: "partners" },
    { label: "Give", id: "give" },
  ];

  const socials = [
    { label: "Facebook", href: "https://www.facebook.com/Doubleyouinitiative" },
    { label: "Instagram", href: "https://www.instagram.com/doubleyoucentre/" },
    { label: "X (Twitter)", href: "https://twitter.com/DoubleyouNGA" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/doubleyougroup/" },
  ];

  return (
    <footer className="bg-[#0E1B2E] text-white/60 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/ddd.jpg"
                alt="Doubleyou Logo"
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <p className="text-white font-black text-base leading-none">
                  Doubleyou
                </p>
                <p className="text-[#F7C928]/70 text-xs mt-0.5">
                  Est. 2019
                </p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Advancing Human Potential Across Africa — through education,
              innovation, and community impact.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={`/#${link.id}`}
                    className="text-white/50 hover:text-[#F7C928] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li><a href="/hall-of-fame" className="inline-flex min-h-11 items-center text-white/70 hover:text-white text-sm underline underline-offset-4">African Impact Hall of Fame</a></li>
            </ul>
          </div>

          {/* Social + Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
              Follow Us
            </h4>
            <ul className="space-y-2.5 mb-8">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-[#F7C928] text-sm transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="mailto:hello@doubleyou.com.ng"
              className="text-[#F7C928]/80 hover:text-[#F7C928] text-sm transition-colors"
            >
              hello@doubleyou.com.ng
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © 2026{" "}
            <Link
              to="/#home"
              className="underline hover:text-white/50 transition-colors"
            >
              Doubleyou Centre
            </Link>
            . All Rights Reserved.
          </p>
          <p className="text-white/20 text-xs">
            Committed to Sustainable Development Goals
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
