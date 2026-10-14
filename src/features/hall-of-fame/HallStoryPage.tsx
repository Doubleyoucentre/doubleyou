import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../sections/NavBar'
import Footer from '../../sections/Footer'
import SEO from '../../components/SEO'
import { PublicReadState } from './HallPublicSections'
import { usePublicHall } from './usePublicHall'
import './hall-of-fame.css'

export default function HallStoryPage() {
  const { slug } = useParams()
  const resource = usePublicHall()
  const story = resource.data.stories.find(item => item.slug === slug)
  return <><SEO title={`${story?.headline ?? 'Impact story'} — Doubleyou Centre`} description={story?.summary ?? 'Published African impact stories from Doubleyou Centre.'} url={`/hall-of-fame/stories/${slug}`} /><Navbar /><main className="hall-entry hall-story-page"><Link to="/hall-of-fame#hall-stories" className="hall-entry__text-link"><ArrowLeft size={17} aria-hidden="true" />Back to the Hall of Fame</Link><PublicReadState status={resource.status} retry={resource.retry} />{resource.status === 'ready' && (story ? <article><p className="hall-entry__eyebrow">{story.category}</p><h1>{story.headline}</h1><time dateTime={story.date}>{new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${story.date}T12:00:00Z`))}</time>{story.imageUrl && <img src={story.imageUrl} alt={story.imageAlt} width={1200} height={750} referrerPolicy="no-referrer" />}<p className="hall-story-page__intro">{story.summary}</p>{story.body?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}{Boolean(story.highlights?.length) && <ul>{story.highlights?.map((highlight, index) => <li key={index}>{highlight}</li>)}</ul>}</article> : <section className="hall-empty"><h1>Story unavailable</h1><p>This story has not been published or is no longer available.</p></section>)}</main><Footer /></>
}
