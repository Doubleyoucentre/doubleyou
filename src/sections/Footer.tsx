import { Link } from 'react-router-dom';

const navigation = [
  { label: 'About Us', href: '/#about-us' },
  { label: 'Programmes', href: '/#fellowship' },
  { label: 'Partnerships', href: '/#partners' },
  { label: 'Contact', href: '/contact' },
];
const policies = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  { label: 'Refund Policy', href: '/refund-policy' },
];

export default function Footer() {
  return <footer className="site-footer bg-[#0E1B2E] text-white px-6 py-12 sm:py-16">
    <div className="max-w-5xl mx-auto text-center">
      <Link to="/" className="inline-flex items-center gap-3 rounded-lg">
        <img src="/ddd.jpg" alt="" className="w-10 h-10 rounded-lg object-cover" width={40} height={40} />
        <span className="font-extrabold text-base sm:text-lg tracking-wide">DOUBLEYOU CENTRE</span>
      </Link>
      <p className="text-white/80 text-sm leading-relaxed mt-4">Advancing Human Potential Across Africa</p>
      <nav aria-label="Footer navigation" className="mt-7">
        <ul className="flex flex-wrap items-center justify-center gap-x-1 sm:gap-x-2">
          {navigation.map((link, index) => <li key={link.href} className="flex items-center">
            {index > 0 && <span aria-hidden="true" className="text-white/40 mr-1 sm:mr-2">·</span>}
            <Link to={link.href} className="inline-flex min-h-11 items-center px-2 text-sm text-white/85 hover:text-[#F7C928] transition-colors">{link.label}</Link>
          </li>)}
        </ul>
      </nav>
      <nav aria-label="Legal policies">
        <ul className="flex flex-wrap items-center justify-center gap-x-1 sm:gap-x-2">
          {policies.map((link, index) => <li key={link.href} className="flex items-center">
            {index > 0 && <span aria-hidden="true" className="text-white/40 mr-1 sm:mr-2">·</span>}
            <Link to={link.href} className="inline-flex min-h-11 items-center px-2 text-sm text-white/85 hover:text-[#F7C928] transition-colors">{link.label}</Link>
          </li>)}
        </ul>
      </nav>
      <p className="border-t border-white/15 mt-7 pt-6 text-xs text-white/70">© 2026 Doubleyou Centre. All rights reserved.</p>
    </div>
  </footer>;
}
