import { Link, useLocation } from 'react-router-dom';
import InformationPageLayout from '../components/InformationPageLayout';
import { legalPolicies } from '../lib/legal-policies';

function ApprovedText({ text, linkRefund }: { text: string; linkRefund: boolean }) {
  return text.split(/(hello@doubleyou\.com\.ng|www\.doubleyou\.com\.ng|\+234 807 370 5508|Refund Policy)/g).map((part, index) => {
    if (part === 'hello@doubleyou.com.ng') return <a key={index} href="mailto:hello@doubleyou.com.ng">{part}</a>;
    if (part === 'www.doubleyou.com.ng') return <a key={index} href="https://www.doubleyou.com.ng">{part}</a>;
    if (part === '+234 807 370 5508') return <a key={index} href="tel:+2348073705508">{part}</a>;
    if (part === 'Refund Policy' && linkRefund) return <Link key={index} to="/refund-policy">{part}</Link>;
    return part;
  });
}

export default function LegalPolicyPage() {
  const { pathname } = useLocation();
  const policy = legalPolicies.find(item => item.path === pathname.replace(/\/$/, ''))!;
  return <InformationPageLayout title={policy.title} description={policy.description} effectiveDate>
    <article className="policy-sections" aria-label={policy.title}>
      {policy.sections.map(([heading, text], index) => <section key={heading} aria-labelledby={`policy-section-${index + 1}`}>
        <h2 id={`policy-section-${index + 1}`}>{index + 1}. {heading}</h2>
        <p><ApprovedText text={text} linkRefund={policy.path === '/terms-and-conditions'} /></p>
      </section>)}
    </article>
  </InformationPageLayout>;
}
