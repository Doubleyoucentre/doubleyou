import { ArrowRight, BookOpen, Globe2, GraduationCap, HandHeart, MapPin, RefreshCw, Users } from 'lucide-react'
import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { AFRICA_PATH, MAP_HEIGHT, MAP_WIDTH, project } from './africa-geo'
import type { ImpactStatistic, MapCountry, PublicContributor, Story } from './types'

const metrics = [
  { id: 'impact-builders', label: 'Impact Builders', Icon: Users },
  { id: 'african-countries', label: 'African countries', Icon: Globe2 },
  { id: 'total-contributions', label: 'Total contributions', Icon: HandHeart },
  { id: 'students-impacted', label: 'Students impacted', Icon: GraduationCap },
  { id: 'programmes', label: 'Programmes supported', Icon: BookOpen },
]
function statisticValue(statistic: ImpactStatistic | undefined) {
  if (!statistic) return <><span aria-hidden="true">—</span><span className="hall-sr-only">Not yet published</span></>
  return `${statistic.prefix ?? ''}${typeof statistic.value === 'number' ? statistic.value.toLocaleString('en') : statistic.value}`
}
export function HallStatistics({ statistics }: { statistics: ImpactStatistic[] }) {
  return <section className="hall-statistics" aria-label="Published impact figures"><dl>{metrics.map(({ id, label, Icon }) => <div key={id}><Icon size={28} aria-hidden="true" /><dt>{label}</dt><dd>{statisticValue(statistics.find(statistic => statistic.id === id))}</dd></div>)}</dl>{statistics.length === 0 && <p>Impact figures are published after verification.</p>}</section>
}

export function PublicReadState({ status, retry }: { status: 'loading' | 'ready' | 'error'; retry: () => void }) {
  if (status === 'ready') return null
  return status === 'loading' ? <div className="hall-read-state" role="status"><RefreshCw size={24} aria-hidden="true" /><p>Loading published impact…</p></div> : <div className="hall-read-state" role="alert"><h3>Published impact could not be loaded</h3><p>Please try again. Unverified profiles and figures are never substituted.</p><button type="button" className="hall-entry__text-link" onClick={retry}><RefreshCw size={16} aria-hidden="true" />Try again</button></div>
}

export function ContributorPortrait({ person }: { person: PublicContributor }) {
  const [failed, setFailed] = useState(false)
  const initials = person.name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase()
  return <article className="hall-contributor"><div className="hall-contributor__portrait">{person.photoUrl && !failed ? <img src={person.photoUrl} alt={person.name} width={320} height={256} loading="lazy" referrerPolicy="no-referrer" onError={() => setFailed(true)} /> : <span className="hall-contributor__initials" aria-hidden="true">{initials}</span>}{person.amountLabel && <span className="hall-contributor__amount">{person.amountLabel}</span>}</div><div className="hall-contributor__body"><h3>{person.name}</h3>{person.country && <p className="hall-contributor__country"><MapPin size={13} aria-hidden="true" />{person.country}</p>}{person.profession && <p className="hall-contributor__profession">{person.profession}</p>}{person.quote && <blockquote>“{person.quote}”</blockquote>}{person.supportLabel && <p className="hall-contributor__support"><HandHeart size={20} aria-hidden="true" /><span><small>Supported</small>{person.supportLabel}</span></p>}{person.bio && <details><summary>About this Impact Builder</summary><p>{person.bio}</p></details>}</div></article>
}

export function HallImpactMap({ countries, statistics, status }: { countries: MapCountry[]; statistics: ImpactStatistic[]; status: 'loading' | 'ready' | 'error' }) {
  const gradient = `hall-map-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const [selected, setSelected] = useState<string | null>(null)
  const active = countries.find(country => country.code === selected)
  return <section className="hall-impact-map" id="hall-impact" aria-labelledby="hall-map-title"><p className="hall-entry__eyebrow">A continent of possibilities</p><h2 id="hall-map-title">Our impact<br />across Africa</h2>
    <div className="hall-impact-map__visual"><svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} role="img" aria-labelledby={`${gradient}-title`}><title id={`${gradient}-title`}>{countries.length ? 'Africa with published contributor country markers' : 'Africa. Country markers appear only when verified country data is published.'}</title><defs><linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="var(--hall-map-light)" /><stop offset="100%" stopColor="var(--hall-map-fill)" /></linearGradient><pattern id={`${gradient}-dots`} width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="1" fill="var(--hall-map-texture)" /></pattern><clipPath id={`${gradient}-clip`}><path d={AFRICA_PATH} /></clipPath></defs><path d={AFRICA_PATH} fill={`url(#${gradient})`} stroke="var(--hall-map-edge)" strokeWidth="1.4" strokeLinejoin="round" /><rect width={MAP_WIDTH} height={MAP_HEIGHT} fill={`url(#${gradient}-dots)`} clipPath={`url(#${gradient}-clip)`} />{countries.filter(country => country.contributorCount > 0 && country.latitude >= -35 && country.latitude <= 38 && country.longitude >= -18 && country.longitude <= 52).map(country => { const point = project([country.longitude, country.latitude]); return <g key={country.code} className={selected === country.code ? 'is-active' : ''}><circle cx={point.x} cy={point.y} r={14} className="hall-map-glow" /><circle cx={point.x} cy={point.y} r={5} className="hall-map-marker" /></g> })}</svg><span className="hall-impact-map__compass" aria-hidden="true">N ↑</span></div>
    <div className="hall-impact-map__figures"><div><GraduationCap size={23} aria-hidden="true" /><div><strong>{statisticValue(statistics.find(statistic => statistic.id === 'students-impacted'))}</strong><span>Students impacted</span></div></div><div><BookOpen size={23} aria-hidden="true" /><div><strong>{statisticValue(statistics.find(statistic => statistic.id === 'programmes'))}</strong><span>Programmes supported</span></div></div></div>
    {status === 'ready' && countries.length === 0 && <p className="hall-impact-map__note">Countries light up as verified country data is published.</p>}{status !== 'ready' && <p className="hall-impact-map__note">{status === 'loading' ? 'Loading published country data…' : 'Country data is temporarily unavailable.'}</p>}
    {countries.length > 0 && <><ul className="hall-country-list" aria-label="Published country impact">{countries.map(country => <li key={country.code}><button type="button" aria-pressed={selected === country.code} onClick={() => setSelected(country.code)} onFocus={() => setSelected(country.code)} onKeyDown={event => { if (event.key === 'Escape') setSelected(null) }}>{country.name}</button></li>)}</ul><p className="hall-impact-map__note" role="status">{active ? `${active.name}: ${active.contributorCount.toLocaleString('en')} recognised contributors` : 'Select a country to explore published impact.'}</p></>}
  </section>
}

export function HallStories({ stories, status }: { stories: Story[]; status: 'loading' | 'ready' | 'error' }) {
  return <section className="hall-stories" id="hall-stories" aria-labelledby="hall-stories-title"><div className="hall-stories__heading"><BookOpen size={20} aria-hidden="true" /><h2 id="hall-stories-title">Latest impact stories</h2></div>{stories.length ? <ul>{stories.slice(0, 4).map(story => <li key={story.id}><StoryPreview story={story} /></li>)}</ul> : <div className="hall-stories__empty"><p>{status === 'loading' ? 'Loading published stories…' : status === 'error' ? 'Published stories are temporarily unavailable.' : 'Programme updates and approved impact stories will be shared here.'}</p><a href="/#core-solutions">Explore our work<ArrowRight size={15} aria-hidden="true" /></a></div>}</section>
}
function StoryPreview({ story }: { story: Story }) {
  const [failed, setFailed] = useState(false)
  return <article><div className="hall-story-thumb">{story.imageUrl && !failed ? <img src={story.imageUrl} alt={story.imageAlt} width={160} height={120} loading="lazy" referrerPolicy="no-referrer" onError={() => setFailed(true)} /> : <BookOpen size={28} aria-hidden="true" />}</div><div><h3><Link to={`/hall-of-fame/stories/${story.slug}`}>{story.headline}</Link></h3><p>{story.summary}</p><Link className="hall-story-read" to={`/hall-of-fame/stories/${story.slug}`}>Read story<ArrowRight size={14} aria-hidden="true" /><span className="hall-sr-only">: {story.headline}</span></Link></div></article>
}
