import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../sections/NavBar';
import Footer from '../sections/Footer';
import SEO from './SEO';
import './information-pages.css';

type Props = {
  title: string;
  description: string;
  effectiveDate?: boolean;
  children: ReactNode;
};

export default function InformationPageLayout({ title, description, effectiveDate, children }: Props) {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);

  return <>
    <SEO title={`${title} | Doubleyou Centre`} description={description} url={`https://www.doubleyou.com.ng${pathname}`} image="/ddd.jpg" />
    <a className="information-skip" href="#information-main">Skip to content</a>
    <Navbar />
    <main id="information-main" className="information-page" tabIndex={-1}>
      <header className="information-hero">
        <div className="information-width">
          <h1>{title}</h1>
          <p className="information-brand">Doubleyou Centre</p>
          <p className="information-tagline">Advancing Human Potential Across Africa</p>
          {effectiveDate && <p className="information-date">Effective Date: <time dateTime="2026-10-21">21 October 2026</time></p>}
        </div>
      </header>
      <div className="information-content information-width">{children}</div>
    </main>
    <Footer />
  </>;
}
