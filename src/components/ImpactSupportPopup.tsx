import { useEffect, useRef } from "react";
import { ArrowUpRight, HeartHandshake, X } from "lucide-react";
import { Link } from "react-router-dom";
import { supportPaymentLink } from "../lib/support-payment";
import "./impact-support.css";

const STORAGE_KEY = "doubleyouImpactPopupDismissed";

export default function ImpactSupportPopup() {
  const dialog = useRef<HTMLDialogElement>(null);
  const payment = supportPaymentLink(import.meta.env.VITE_SUPPORT_PAYMENT_URL);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch { /* The dialog still works when storage is unavailable. */ }
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    const restoreScroll = () => { document.body.style.overflow = previousOverflow; };
    element?.addEventListener("close", restoreScroll);
    const timer = setTimeout(() => {
      if (element?.isConnected && !element.open) {
        element.showModal();
        document.body.style.overflow = "hidden";
      }
    }, 1200);
    return () => {
      clearTimeout(timer);
      element?.close();
      element?.removeEventListener("close", restoreScroll);
      restoreScroll();
    };
  }, []);

  const dismiss = () => {
    try { sessionStorage.setItem(STORAGE_KEY, "true"); } catch { /* No storage is required to close. */ }
    dialog.current?.close();
  };

  return (
    <dialog
      ref={dialog}
      className="impact-support"
      aria-labelledby="impact-support-title"
      aria-describedby="impact-support-description"
      onCancel={event => { event.preventDefault(); dismiss(); }}
      onKeyDown={event => {
        if (event.key !== "Tab") return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dismiss();
      }}
    >
      <button type="button" className="impact-support__close" aria-label="Close impact introduction" onClick={dismiss}><X size={21} /></button>
      <div className="impact-support__graphic" aria-hidden="true">
        <HeartHandshake size={44} strokeWidth={1.5} />
        <span>Join. Participate.<br /><strong>Support impact.</strong></span>
      </div>
      <div className="impact-support__content">
        <p className="impact-support__eyebrow">African Impact Hall of Fame</p>
        <h2 id="impact-support-title">Be part of the story<br />we’re building.</h2>
        <p id="impact-support-description">Join a community supporting African students, innovation and social impact. The African Impact Hall of Fame celebrates the people behind that progress.</p>
        <div className="impact-support__actions">
          <Link className="impact-support__primary" to="/hall-of-fame" onClick={dismiss}>Explore the Hall of Fame <ArrowUpRight size={18} aria-hidden="true" /></Link>
          {payment ? (
            <a className="impact-support__secondary" href={payment.url} target="_blank" rel="noopener noreferrer" onClick={dismiss}>Contribute via {payment.provider} <ArrowUpRight size={18} aria-hidden="true" /></a>
          ) : (
            <Link className="impact-support__secondary" to="/#give" onClick={dismiss}>Support our work <ArrowUpRight size={18} aria-hidden="true" /></Link>
          )}
        </div>
        <p className="impact-support__note">Choose how to participate. Public recognition is optional.</p>
      </div>
    </dialog>
  );
}
