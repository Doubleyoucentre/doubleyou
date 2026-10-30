import { useRef, type PointerEvent, type RefObject } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import './contribution-dialog.css'

export default function ContributionDialog({ dialogRef, paymentUrl }: { dialogRef: RefObject<HTMLDialogElement | null>, paymentUrl: string }) {
  const pressedOutside = useRef(false)
  const outside = (event: PointerEvent<HTMLDialogElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    return event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom
  }
  return <dialog ref={dialogRef} id="hall-contribution-dialog" className="contribution-dialog" aria-labelledby="contribution-title" aria-describedby="contribution-description"
    onPointerDown={event => { pressedOutside.current = outside(event) }}
    onPointerUp={event => { if (pressedOutside.current && outside(event)) event.currentTarget.close(); pressedOutside.current = false }}>
    <form method="dialog"><button className="contribution-dialog__close" aria-label="Close contribution options" autoFocus><X size={21} /></button></form>
    <p className="contribution-dialog__eyebrow">Doubleyou Impact Support</p>
    <h2 id="contribution-title">Contribute to African impact</h2>
    <p id="contribution-description">Scan with your phone, or continue to Flutterwave on this device. Choose the amount that works for you.</p>
    <div className="contribution-dialog__qr"><QRCodeSVG value={paymentUrl} size={224} marginSize={4} level="M" role="img" title="Scan to contribute through Flutterwave" /></div>
    <a className="contribution-dialog__pay" href={paymentUrl} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer" aria-describedby="contribution-checkout-note">Continue to Flutterwave <ArrowUpRight size={18} aria-hidden="true" /></a>
    <p id="contribution-checkout-note" className="contribution-dialog__note">Opens secure checkout in a new tab.</p>
    <p className="contribution-dialog__recognition">Temporary contribution option. Public recognition follows verification, consent and review.</p>
  </dialog>
}
