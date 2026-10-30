import { ArrowUpRight, Check, Heart, Search, Users, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../../sections/NavBar'
import Footer from '../../sections/Footer'
import SEO from '../../components/SEO'
import { hallContribution } from './contribution'
import { supportPaymentUrl } from '../../lib/public-support'
import { contributorFilters, filterContributors, type ContributorFilterId } from './filterContributors'
import { usePublicHall } from './usePublicHall'
import { HallStatistics, HallImpactMap, HallStories, ContributorPortrait, PublicReadState } from './HallPublicSections'
import './hall-of-fame.css'

export default function HallOfFamePage() {
  const contribution = hallContribution(import.meta.env.VITE_HALL_OF_FAME_ORIGIN, import.meta.env.VITE_HALL_OF_FAME_READY, supportPaymentUrl(import.meta.env.VITE_SUPPORT_PAYMENT_URL))
  const contribute = contribution.href
  const temporary = contribution.kind === 'hosted'
  const linkProps = temporary ? { target: '_blank', rel: 'noopener noreferrer', referrerPolicy: 'no-referrer' as const, 'aria-describedby': 'hall-contribution-method' } : {}
  const resource = usePublicHall()
  const location = useLocation()
  useEffect(() => {
    if (!['#hall-contributors', '#hall-impact', '#hall-stories', '#hall-recognition'].includes(location.hash)) return
    const frame = requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'instant', block: 'start' }))
    return () => cancelAnimationFrame(frame)
  }, [location.hash, location.key])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ContributorFilterId>('all')
  const contributors = useMemo(() => filterContributors(resource.data.contributors, query, category), [resource.data.contributors, query, category])
  return <>
    <SEO title="African Impact Hall of Fame — Doubleyou Centre" description="People building Africa. Support African students, innovation and social impact, and choose how your contribution is recognised." url="/hall-of-fame" image="/hall-of-fame/impact-hero.webp" />
    <a className="hall-skip" href="#hall-main">Skip to Hall of Fame</a><Navbar />
    <main className="hall-entry" id="hall-main" tabIndex={-1}>
      <section className="hall-entry__hero" aria-labelledby="hall-entry-title">
        <div className="hall-entry__copy"><p className="hall-entry__eyebrow">Doubleyou Centre</p><h1 id="hall-entry-title"><span>African</span><span>Impact</span><span className="hall-entry__title-small">Hall of <mark>Fame</mark></span></h1><p className="hall-entry__strapline">People building Africa</p>
          <div className="hall-entry__intro"><p>A continental community celebrating everyone who supports African students, innovation and social impact.</p><p>Whether you give a small or large amount, you are part of the story.</p><a className="hall-entry__action" href={contribute} {...linkProps}><span aria-hidden="true"><ArrowUpRight size={19} /></span>Contribute Now</a><p className="hall-entry__caption" id="hall-contribution-method">{temporary ? 'Temporary contribution option: choose your amount on Flutterwave. Opens in a new tab. Recognition is reviewed separately.' : contribution.kind === 'integrated' ? 'Support African impact. Choose your recognition.' : 'Give through Doubleyou Centre’s existing contribution options.'}</p></div>
        </div>
        <figure className="hall-entry__artwork"><img src="/hall-of-fame/impact-hero.webp" alt="Campaign illustration of a young African woman looking ahead, with a green and gold silhouette of Africa." width={1536} height={1024} fetchPriority="high" /><figcaption>Small contributions.<br /><strong>Big possibilities.</strong></figcaption></figure>
      </section>
      <HallStatistics statistics={resource.data.statistics} />
      <nav className="hall-entry__local-nav" aria-label="Hall of Fame sections"><a href="#hall-contributors">Impact Builders</a><a href="#hall-impact">Impact Across Africa</a><a href="#hall-stories">Impact Stories</a><a href="#hall-recognition">How recognition works</a></nav>
      <div className="hall-entry__content">
        <section id="hall-contributors" className="hall-directory" aria-labelledby="hall-contributors-title">
          <div className="hall-directory__heading"><div><p className="hall-entry__eyebrow">People behind the possibility</p><h2 id="hall-contributors-title">Our Impact Builders</h2></div><span className="hall-directory__verified"><Check size={14} aria-hidden="true" />Public by choice</span></div>
          <form className="hall-search" role="search" onSubmit={event => event.preventDefault()}><label htmlFor="hall-contributor-search" className="hall-sr-only">Search contributors by name, country or profession</label><Search size={19} aria-hidden="true" /><input id="hall-contributor-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search by name, country or profession" autoComplete="off" />{query && <button type="button" aria-label="Clear contributor search" onClick={() => setQuery('')}><X size={18} /></button>}</form>
          <div className="hall-filters" role="group" aria-label="Contributor categories">{contributorFilters.map(filter => <button key={filter.id} type="button" aria-pressed={category === filter.id} onClick={() => setCategory(filter.id)}>{filter.label}</button>)}</div>
          <PublicReadState status={resource.status} retry={resource.retry} />
          {resource.status === 'ready' && <><p className="hall-sr-only" role="status">{contributors.length} published contributor profiles match your filters.</p>{contributors.length > 0 ? <ul className="hall-contributors">{contributors.map(person => <li key={person.id}><ContributorPortrait person={person} /></li>)}</ul> : resource.data.contributors.length > 0 ? <div className="hall-empty"><Search size={32} aria-hidden="true" /><h3>No matching contributors</h3><p>Try another name, country or category.</p><button className="hall-entry__text-link" type="button" onClick={() => { setQuery(''); setCategory('all') }}>Clear all filters</button></div> : <div className="hall-empty hall-empty--contributors"><div className="hall-empty__emblem" aria-hidden="true"><Users size={40} /><Heart size={20} /></div><h3>Recognition starts with a contribution</h3><p>Public Impact Builder profiles appear here after contribution verification, consent and approval.</p><a href={contribute} className="hall-entry__action" {...linkProps}><span aria-hidden="true"><ArrowUpRight size={19} /></span>{temporary ? 'Contribute Now' : 'Join the Hall of Fame'}</a><div className="hall-empty__promises"><span><Check size={14} aria-hidden="true" />Every amount matters</span><span><Check size={14} aria-hidden="true" />Recognition is your choice</span></div></div>}</>}
        </section>
        <aside className="hall-entry__sidebar" aria-label="African impact and programme stories"><HallImpactMap countries={resource.data.countries} statistics={resource.data.statistics} status={resource.status} /><HallStories stories={resource.data.stories} status={resource.status} /></aside>
      </div>
      <section className="hall-entry__recognition" id="hall-recognition" aria-labelledby="hall-recognition-title"><div><p className="hall-entry__eyebrow">Your contribution. Our shared story.</p><h2 id="hall-recognition-title">Support the impact.<br />Choose your recognition.</h2><p>A verified contribution establishes eligibility. Public recognition is optional and follows your consent, profile completion and approval. Your email and payment details stay private.</p><a href={contribute} className="hall-entry__action" {...linkProps}><span aria-hidden="true"><ArrowUpRight size={19} /></span>{temporary ? 'Contribute Now' : 'Join the Hall of Fame'}</a></div><ol><li><span>01</span><div><h3>Support African impact</h3><p>Contribute towards students, innovation and social impact.</p></div></li><li><span>02</span><div><h3>Make recognition your own</h3><p>Choose whether to be recognised publicly or remain private.</p></div></li><li><span>03</span><div><h3>Become part of the story</h3><p>Approved public profiles join the Hall of Fame.</p></div></li></ol></section>
    </main><Footer />
  </>
}
