import { Link } from 'react-router-dom';

const navigation = [
  { label: 'About Us', href: '/#about-us' },
  { label: 'Our Ecosystem', href: '/#core-solutions' },
  { label: 'Programmes', href: '/#fellowship' },
  { label: 'ASIP', href: '/african-student-impact-program' },
  { label: 'Blood Drive', href: '/#blood-drive' },
  { label: 'Partnerships', href: '/#partners' },
  { label: 'Give', href: '/#give' },
  { label: 'Contact', href: '/contact' },
  { label: 'African Impact Hall of Fame', href: '/hall-of-fame' },
];
const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/Doubleyouinitiative' },
  { label: 'Instagram', href: 'https://www.instagram.com/doubleyoucentre/' },
  { label: 'X (Twitter)', href: 'https://twitter.com/DoubleyouNGA' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/doubleyougroup/' },
];
const policies = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  { label: 'Refund Policy', href: '/refund-policy' },
];
const linkStyle = 'inline-flex min-h-11 items-center text-sm text-white/75 hover:text-[#F7C928] transition-colors';

export default function Footer() {
  return <footer className="site-footer bg-[#0E1B2E] text-white px-6 py-12 sm:py-16">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-9 lg:gap-14 mb-9">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/ddd.jpg" alt="Doubleyou Logo" className="w-10 h-10 rounded-lg object-cover" width={40} height={40} />
            <div>
              <p className="font-extrabold text-base uppercase tracking-wide">Doubleyou Centre</p>
              <p className="text-[#F7C928] text-xs mt-0.5">Est. 2019</p>
            </div>
          </div>
          <p className="text-white/75 text-sm leading-relaxed max-w-xs">Advancing Human Potential Across Africa — through education, innovation, and community impact.</p>
        </div>
        <nav aria-label="Footer navigation">
          <h2 className="text-white font-semibold text-sm mb-3 uppercase tracking-widest">Quick Links</h2>
          <ul className="grid grid-cols-2 gap-x-5">
            {navigation.map(link => <li key={link.href} className={link.href === '/hall-of-fame' ? 'col-span-2' : undefined}>
              <Link to={link.href} className={linkStyle}>{link.label}</Link>
            </li>)}
          </ul>
        </nav>
        <div>
          <h2 className="text-white font-semibold text-sm mb-3 uppercase tracking-widest">Follow Us</h2>
          <ul className="grid grid-cols-2 gap-x-5 mb-3">
            {socials.map(link => <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkStyle}>{link.label}</a>
            </li>)}
          </ul>
          <a href="mailto:hello@doubleyou.com.ng" className="inline-flex min-h-11 items-center text-[#F7C928] text-sm hover:underline break-all">hello@doubleyou.com.ng</a>
        </div>
      </div>
      <nav aria-label="Legal policies" className="border-t border-white/15 pt-5 pb-5">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
          {policies.map(link => <li key={link.href}><Link to={link.href} className={linkStyle}>{link.label}</Link></li>)}
        </ul>
      </nav>
      <div className="border-t border-white/15 pt-6 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-3 text-xs text-white/70">
        <p>© 2026 <Link to="/#home" className="underline underline-offset-2 hover:text-white">Doubleyou Centre</Link>. All rights reserved.</p>
        <p>Committed to Sustainable Development Goals</p>
      </div>
    </div>
  </footer>;
}
