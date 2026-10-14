import {Link} from 'react-router-dom'
import './hall-of-fame.css'

export default function HallOfFameSection(){
  return <section className="hall-promo" aria-labelledby="hall-promo-title" id="hall-of-fame">
    <div className="hall-promo__inner"><div><p className="hall-entry__eyebrow">African Impact Hall of Fame</p><h2 id="hall-promo-title">Your contribution belongs in the story.</h2><p>Support African students, innovation and social impact. Explore the Hall of Fame and choose how you would like to be recognised.</p></div>
      <div className="hall-promo__actions"><Link className="hall-entry__action" to="/hall-of-fame"><span aria-hidden="true">↗</span>Contribute through the Hall of Fame</Link><Link className="hall-entry__text-link" to="/#give">View bank-transfer details ↓</Link></div>
    </div>
  </section>
}
