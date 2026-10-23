import InformationPageLayout from '../components/InformationPageLayout';

const Email = () => <a href="mailto:hello@doubleyou.com.ng">hello@doubleyou.com.ng</a>;

export default function Contact() {
  return <InformationPageLayout title="Contact Us" description="Contact Doubleyou Centre for general enquiries, programmes, applications, partnerships, collaborations and media communications.">
    <div className="contact-cards">
      <section className="contact-card" aria-labelledby="general-enquiries">
        <h2 id="general-enquiries">General Enquiries</h2>
        <p>Email: <Email /></p>
        <p>Phone: <a href="tel:+2348073705508">+234 807 370 5508</a></p>
      </section>
      <section className="contact-card" aria-labelledby="contact-website">
        <h2 id="contact-website">Website</h2>
        <p><a href="https://www.doubleyou.com.ng">www.doubleyou.com.ng</a></p>
      </section>
      <section className="contact-card" aria-labelledby="programmes-applications">
        <h2 id="programmes-applications">Programmes &amp; Applications</h2>
        <p>For enquiries about programmes, applications, events and opportunities, contact <Email />.</p>
      </section>
      <section className="contact-card" aria-labelledby="partnerships-collaborations">
        <h2 id="partnerships-collaborations">Partnerships &amp; Collaborations</h2>
        <p>For institutional partnerships, sponsorships and strategic collaborations, contact <Email />.</p>
      </section>
      <section className="contact-card" aria-labelledby="media-communications">
        <h2 id="media-communications">Media &amp; Communications</h2>
        <p>For media enquiries, interviews and official communications, contact <Email />.</p>
      </section>
      <section className="contact-card" aria-labelledby="contact-social">
        <h2 id="contact-social">Social Media</h2>
        <p>@doubleyoucenter</p>
      </section>
    </div>
  </InformationPageLayout>;
}
