import { useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Heart,
  Menu,
  MessageCircle,
  PenLine,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
  Copy,} from 'lucide-react'
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import { supabase } from './lib/supabase'

const services = [
  { name: 'Love & Romance', description: 'Put your feelings into words that matter.', icon: Heart },
  { name: 'Birthday Wishes', description: 'Make their special day feel even more personal.', icon: Sparkles },
  { name: 'Apology Messages', description: 'Find thoughtful words to make things right.', icon: MessageCircle },
  { name: 'Encouragement', description: 'Remind someone that they are not alone.', icon: CheckCircle2 },
  { name: 'Letters & Poetry', description: 'Turn meaningful thoughts into lasting words.', icon: PenLine },
  { name: 'Calls & Special Moments', description: 'Share your message through a personal call.', icon: Phone },
]

const prices = [
  { name: 'Personal message', price: 2000, detail: 'A thoughtful message, written for you' },
  { name: 'Personal call', price: 3000, detail: 'A call to deliver your message' },
  { name: 'Written letter', price: 2500, detail: 'A carefully written personal letter' },
  { name: 'Letter + call', price: 5000, detail: 'A letter and a personal call' },
  { name: 'International call', price: 6000, detail: 'A call to an international number' },
]

const faqs = [
  { question: 'How does BPV work?', answer: 'Choose the service you need, tell us about your message and recipient, and submit your request. We review your details and payment before confirming your booking.' },
  { question: 'How soon can my message be delivered?', answer: 'Standard delivery requires at least three hours after booking. Urgent requests carry an additional ₦1,000 and depend on availability and acceptance.' },
  { question: 'How do I pay?', answer: 'The request page will provide the configured OPay transfer instructions. Submit your payment reference after transferring. Your request remains pending until payment is independently verified.' },
  { question: 'Can I request a personal type of message?', answer: 'Yes. Select “Other” in your request and describe what you need. We will review the request and clarify anything necessary.' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" onClick={closeMenu} aria-label="BPV home">
          <span className="brand-mark"><PenLine size={20} strokeWidth={2.2} /></span>
          <span className="brand-copy">
            <strong>BPV</strong>
            <small>Bibliophile's Pen & Voice</small>
          </span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <a href="/#services" onClick={closeMenu}>Services</a>
          <a href="/#pricing" onClick={closeMenu}>Pricing</a>
          <Link className="nav-cta" to="/request" onClick={closeMenu}>Make a request <ArrowRight size={15} /></Link>
        </nav>
      </div>
    </header>
  )
}

function CompactNavigation() {
  return (
    <nav className="compact-navigation" aria-label="Quick navigation">
      <Link className="compact-nav-item" to="/" aria-label="Home">
        <PenLine size={20} />
        <span>Home</span>
      </Link>
      <a className="compact-nav-item" href="/#services" aria-label="Services">
        <BookOpen size={20} />
        <span>Services</span>
      </a>
      <a className="compact-nav-item" href="/#pricing" aria-label="Pricing">
        <Sparkles size={20} />
        <span>Pricing</span>
      </a>
      <Link className="compact-nav-item compact-nav-request" to="/request">
        <MessageCircle size={20} />
        <span>Request</span>
      </Link>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link className="footer-brand" to="/">BPV <span>·</span> Expressing you, beautifully.</Link>
        <p>Thoughtful words. Meaningful connections.</p>
        <div className="footer-links">
          <Link to="/request">Make a request</Link>
          <a href="mailto:bibliophilepenandvoice@gmail.com">Contact</a>
          <Link to="/admin">Admin</Link>
        </div>
        <small>© {new Date().getFullYear()} Bibliophile's Pen & Voice</small>
      </div>
    </footer>
  )
}

function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <>
      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={14} /> WORDS THAT BRING US CLOSER</span>
            <h1>Some feelings deserve <span>the right words.</span></h1>
            <p className="hero-description">
              From a heartfelt apology to a message of love, we help you express
              what matters — thoughtfully, personally, and beautifully.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/request">Make a request <ArrowRight size={17} /></Link>
              <a className="text-link" href="#how-it-works">How it works <ArrowRight size={16} /></a>
            </div>
            <div className="hero-note">
              <ShieldCheck size={17} />
              <span>Your message is handled with care and discretion.</span>
            </div>
          </div>

          <div className="hero-art" aria-label="A handwritten note with a personal message">
            <div className="note-shadow" />
            <div className="note-card">
              <div className="note-top"><span>JUST FOR YOU</span><Heart size={19} /></div>
              <div className="note-rule" />
              <p className="note-script">Dear you,</p>
              <p className="note-message">Some things are easier to feel than to say. Let us help you find the words.</p>
              <div className="note-signature">With care, <span>BPV</span></div>
              <div className="note-stamp"><Heart size={17} /></div>
            </div>
            <div className="floating-badge"><Heart size={16} fill="currentColor" /> Made meaningful</div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Our approach">
        <div><Heart size={18} /><span>Personal, not generic</span></div>
        <div><PenLine size={18} /><span>Words crafted with care</span></div>
        <div><Clock3 size={18} /><span>Clear delivery expectations</span></div>
      </section>

      <section className="section services-section" id="services">
        <div className="section-heading">
          <span className="eyebrow">A MESSAGE FOR EVERY MOMENT</span>
          <h2>Whatever your heart needs to say.</h2>
          <p>Choose a moment. We'll help you find the words.</p>
        </div>
        <div className="service-grid">
          {services.map(({ name, description, icon: Icon }) => (
            <Link className="service-card" to="/request" key={name}>
              <span className="service-icon"><Icon size={21} /></span>
              <h3>{name}</h3>
              <p>{description}</p>
              <span className="card-arrow">Explore <ArrowRight size={15} /></span>
            </Link>
          ))}
        </div>
        <div className="other-service">
          <div><strong>Something a little different?</strong><p>We also welcome custom requests for unique moments and messages.</p></div>
          <Link className="button button-outline" to="/request">Tell us what you need <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="pricing-section" id="pricing">
        <div className="section pricing-inner">
          <div className="pricing-intro">
            <span className="eyebrow">SIMPLE, TRANSPARENT PRICING</span>
            <h2>Thoughtful words, with clear prices.</h2>
            <p>Know the service fee before you confirm your request. Urgent delivery is subject to availability.</p>
            <Link className="button button-primary" to="/request">Start your request <ArrowRight size={16} /></Link>
          </div>
          <div className="price-list">
            {prices.map((item) => (
              <div className="price-row" key={item.name}>
                <div><strong>{item.name}</strong><span>{item.detail}</span></div>
                <strong className="price-amount">₦{item.price.toLocaleString('en-NG')}</strong>
              </div>
            ))}
            <div className="urgent-note"><Clock3 size={17} /><span><strong>Urgent delivery:</strong> additional ₦1,000, only when accepted and available.</span></div>
          </div>
        </div>
      </section>

      <section className="section process-section" id="how-it-works">
        <div className="section-heading">
          <span className="eyebrow">A SIMPLE, PERSONAL PROCESS</span>
          <h2>From your thoughts to their heart.</h2>
        </div>
        <div className="process-grid">
          <div className="process-step"><span>01</span><h3>Tell us the story</h3><p>Choose a service and share the context, details, and feeling you want to express.</p></div>
          <div className="process-step"><span>02</span><h3>Review your request</h3><p>See your service fee and delivery preference before submitting and following payment instructions.</p></div>
          <div className="process-step"><span>03</span><h3>Let the words connect</h3><p>Once your request and payment are confirmed, we work toward the agreed delivery time.</p></div>
        </div>
      </section>

      <section className="section reassurance-section">
        <div className="reassurance-icon"><BookOpen size={25} /></div>
        <div><span className="eyebrow">A LITTLE CARE GOES A LONG WAY</span><h2>Every message starts with listening.</h2><p>We take time to understand the person, the moment, and what you want your words to mean.</p></div>
        <Link className="button button-outline" to="/request">Share your story <ArrowRight size={16} /></Link>
      </section>

      <section className="section faq-section" id="faq">
        <div className="section-heading">
          <span className="eyebrow">GOOD TO KNOW</span>
          <h2>Your questions, answered.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div className={`faq-item${openFaq === index ? ' active' : ''}`} key={faq.question}>
              <button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                {faq.question}<span>{openFaq === index ? '−' : '+'}</span>
              </button>
              {openFaq === index && <p>{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="closing-cta">
        <div><span className="eyebrow">WHEN WORDS MATTER</span><h2>Let's help you say it beautifully.</h2><p>Your next meaningful message can start right here.</p></div>
        <Link className="button button-light" to="/request">Make a request <ArrowRight size={17} /></Link>
      </section>
    </>
  )
}

function RequestPage() {
  const [copySuccess, setCopySuccess] = useState(false);

  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [recipientPhone, setRecipientPhone] = useState('')
  const [service, setService] = useState(prices[0].name)
  const [messageType, setMessageType] = useState('Love & Romance')
  const [instructions, setInstructions] = useState('')
  const [delivery, setDelivery] = useState('standard')
  const [preferredDeliveryAt, setPreferredDeliveryAt] = useState('')
  const [reviewing, setReviewing] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState('')
  const [booking, setBooking] = useState<{
    booking_reference?: string
    amount_ngn?: number
    payment_status?: string
    request_status?: string
  } | null>(null)

  const selectedPrice = prices.find((item) => item.name === service) ?? prices[0]
  const urgentFee = delivery === 'urgent' ? 1000 : 0
  const total = selectedPrice.price + urgentFee
  function minimumDeliveryDateTime(hoursAhead: number) {
    // eslint-disable-next-line react-hooks/purity -- Calculate the booking form's minimum delivery time.
    const date = new Date(Date.now() + hoursAhead * 60 * 60 * 1000)
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
    
  return date.toISOString().slice(0, 16)
  }
  const formatNaira = (amount: number) =>
    `₦${amount.toLocaleString('en-NG')}`

  function handleReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setReviewing(true)
  }

  async function handleSubmitRequest() {
    setSubmitting(true)
    setSubmissionError('')

    try {
      const { data, error } = await supabase.functions.invoke(
        'bpv-submit-request',
        {
          body: {
            customerName,
            email,
            phone,
            recipientName,
            recipientPhone,
            service,
            messageType,
            delivery,
            instructions,
            preferredDeliveryAt: new Date(preferredDeliveryAt).toISOString(),
          },
        },
      )

      if (error) {
        throw error
      }

      if (!data?.success || !data?.booking?.booking_reference) {
        throw new Error(
          data?.error || 'The server did not confirm your booking. Please try again.',
        )
      }

      setBooking(data.booking)
    } catch (error) {
      let message =
        error instanceof Error
          ? error.message
          : 'We could not submit your request. Please try again.'

      if (error && typeof error === 'object' && 'context' in error) {
        const context = error.context
        if (context instanceof Response) {
          const responseBody = await context.clone().json().catch(() => null)
          if (
            responseBody &&
            typeof responseBody === 'object' &&
            'error' in responseBody &&
            typeof responseBody.error === 'string'
          ) {
            message = responseBody.error
          }
        }
      }

      setSubmissionError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="section inner-page">
      <div className="page-heading">
        <span className="eyebrow">YOUR MESSAGE STARTS HERE</span>
        <h1>Make a request</h1>
        <p>Tell us what you would like to express. Review your details and estimated fee before proceeding.</p>
      </div>

      <div className="notice-card">
        <ShieldCheck size={20} />
        <p><strong>Preview only:</strong> Your request has not been submitted or saved yet.</p>
      </div>

      {!reviewing ? (
        <form className="bpv-request-form" onSubmit={handleReview}>
          <div className="request-form-section">
            <h2>Your details</h2>
            <label>
              Full name
              <input required autoComplete="name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Your full name" />
            </label>
            <label>
              Email address
              <input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </label>
            <label>
              Phone number
              <input required type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone number" />
            </label>
          </div>

          <div className="request-form-section">
            <h2>About your message</h2>
            <label>
              Type of message
              <select value={messageType} onChange={(e) => setMessageType(e.target.value)}>
                {services.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}
                <option value="Other">Other / custom request</option>
              </select>
            </label>
            <label>
              Service
              <select value={service} onChange={(e) => setService(e.target.value)}>
                {prices.map((item) => <option key={item.name} value={item.name}>{item.name} — {formatNaira(item.price)}</option>)}
              </select>
            </label>
            <label>
              Recipient's name
              <input required value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Who is this message for?" />
            </label>
            <label>
              Recipient's phone number <span className="form-optional">(if needed)</span>
              <input type="tel" value={recipientPhone} onChange={(e) => setRecipientPhone(e.target.value)} placeholder="Include country code for calls" />
            </label>
            <label>
              What would you like us to know?
              <textarea required rows={5} value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Share the occasion, important details, tone, and what you hope to express." />
            </label>
          </div>

          <div className="request-form-section">
            <h2>Delivery preference</h2>
            <label>
              Preferred delivery date and time
              <input
                required
                type="datetime-local"
                value={preferredDeliveryAt}
                min={minimumDeliveryDateTime(delivery === 'urgent' ? 0 : 3)}
                onChange={(e) => setPreferredDeliveryAt(e.target.value)}
              />
            </label>
            <label className="delivery-option">
              <input type="radio" name="delivery" value="standard" checked={delivery === 'standard'} onChange={() => setDelivery('standard')} />
              <span><strong>Standard delivery</strong><small>At least 3 hours after booking, subject to confirmation.</small></span>
            </label>
            <label className="delivery-option">
              <input type="radio" name="delivery" value="urgent" checked={delivery === 'urgent'} onChange={() => setDelivery('urgent')} />
              <span><strong>Request urgent delivery (+₦1,000)</strong><small>Subject to availability and acceptance.</small></span>
            </label>
          </div>

          <div className="request-estimate">
            <span>Estimated service fee</span>
            <strong>{formatNaira(total)}</strong>
            <small>{formatNaira(selectedPrice.price)} service fee{urgentFee ? ` + ${formatNaira(urgentFee)} urgent fee` : ''}. Final timing and availability must be confirmed by BPV.</small>
          </div>

          <button className="button button-primary request-submit" type="submit">
            Review my request <ArrowRight size={17} />
          </button>
        </form>
      ) : (
        <section className="request-review">
          <span className="eyebrow">BPV · YOUR REQUEST</span>
          <h2>Review your request</h2>
          <p className="bpv-review-intro">
            Please confirm your details before submitting.
          </p>
          
          <div className="bpv-review-section">
            <h3 className="bpv-review-section-title">
              <span className="bpv-review-section-icon bpv-person-icon"
                    aria-hidden="true">♙</span>
              Customer details
            </h3>

            <div className="bpv-review-details bpv-customer-details">
              <div className="bpv-review-field">
                <span>Customer name</span>
                <strong>{customerName}</strong>
              </div>
              <div className="bpv-review-field">
                <span>Phone</span>
                <strong>{phone}</strong>
              </div>
              <div className="bpv-review-field bpv-review-field-full">
                <span>Email address</span>
                <strong>{email}</strong>
              </div>
            </div>
          </div>

          <div className="bpv-review-section">
            <h3 className="bpv-review-section-title">
              <span className="bpv-review-section-icon"
                    aria-hidden="true">✉</span>
              Message details
            </h3>

            <div className="bpv-review-details bpv-message-details">
              <div className="bpv-review-field">
                <span>Message type</span>
                <strong>{messageType}</strong>
              </div>
              <div className="bpv-review-field">
                <span>Service</span>
                <strong>{service}</strong>
              </div>
              <div className="bpv-review-field">
                <span>Recipient</span>
                <strong>{recipientName}</strong>
              </div>
              {recipientPhone && (
                <div className="bpv-review-field">
                  <span>Recipient phone</span>
                  <strong>{recipientPhone}</strong>
                </div>
              )}
              <div className="bpv-review-field">
                <span>Delivery</span>
                <strong>
                  {delivery === 'urgent'
                    ? 'Urgent requested — pending availability'
                    : 'Standard requested'}
                </strong>
              </div>
              <div className="bpv-review-field bpv-review-field-full">
                <span>Preferred delivery time</span>
                <strong>
                  {preferredDeliveryAt
                    ? new Date(preferredDeliveryAt).toLocaleString()
                    : 'Not selected'}
                </strong>
              </div>
              <div className="bpv-review-field bpv-review-field-full">
                <span>Instructions</span>
                <strong className="review-instructions">
                  {instructions}
                </strong>
              </div>
              <div className="bpv-review-field bpv-review-field-full bpv-review-total">
                <span>Estimated fee</span>
                <strong>{formatNaira(total)}</strong>
              </div>
            </div>
          </div>

          {booking ? (
            <div className="bpv-booking-success" role="status">
              <div className="bpv-booking-success-heading">
                <CheckCircle2 size={44} strokeWidth={2.5} aria-hidden="true" />
                <h3>Request saved successfully</h3>
              </div>

              <div className="bpv-booking-divider" />

              <p className="bpv-booking-label">Booking reference</p>
              <p className="bpv-booking-reference">
                {booking.booking_reference}
              </p>

              
<button
  type="button"
  className="bpv-booking-copy"
  onClick={async () => {
    const reference = booking.booking_reference;
    if (!reference) return;

    try {
      await navigator.clipboard.writeText(reference);
      setCopySuccess(true);
      window.setTimeout(() => setCopySuccess(false), 2500);
    } catch {
      window.prompt('Copy booking reference:', reference);
    }
  }}
>
  <Copy size={28} aria-hidden="true" />
  <span>Copy booking reference</span>
</button>

      {copySuccess && (
        <div className="bpv-copy-toast" role="status" aria-live="polite">
          <span className="bpv-copy-toast-check" aria-hidden="true">✓</span>
          <span>Booking reference copied</span>
        </div>
      )}



              <div className="bpv-booking-amount">
                <span>Amount due</span>
                <strong>{formatNaira(booking.amount_ngn ?? total)}</strong>
              </div>

            
<div className="bpv-opay-card">
  <div className="bpv-opay-heading">
    <div>
      <span className="bpv-opay-eyebrow">SECURE YOUR BOOKING</span>
      <h4>Make your payment</h4>
    </div>
    <span className="bpv-opay-logo">OPay</span>
  </div>

  <p className="bpv-opay-instructions">
    Transfer the exact amount shown above to the account below.
    Your request will be processed after payment is confirmed.
  </p>

  <div className="bpv-opay-detail">
    <span>Bank name</span>
    <strong>OPay</strong>
  </div>

  <div className="bpv-opay-account">
    <div>
      <span>Account number</span>
      <strong>8130654169</strong>
    </div>

    <button
      type="button"
      className="bpv-opay-copy"
      onClick={async () => {
        const accountNumber = '8130654169';

        try {
          await navigator.clipboard.writeText(accountNumber);
          setCopySuccess(true);
          window.setTimeout(() => setCopySuccess(false), 2500);
        } catch {
          window.prompt('Copy OPay account number:', accountNumber);
        }
      }}
      aria-label="Copy OPay account number"
    >
      <Copy size={18} aria-hidden="true" />
      <span>Copy</span>
    </button>
  </div>

  <div className="bpv-opay-detail">
    <span>Account name</span>
    <strong>Olatoberu Oladimeji Ebenezer</strong>
  </div>

  {copySuccess && (
    <div className="bpv-opay-copy-message" role="status" aria-live="polite">
      ✓ Account number copied
    </div>
  )}

  <p className="bpv-opay-warning">
    Please keep your transfer receipt. Do not make another payment if
    you have already transferred. Payment status will be updated after
    BPV verifies receipt of the funds.
  </p>
</div>
  

              <div className="bpv-booking-payment">
                <span>Payment status</span>
                <span className="bpv-payment-badge">Pending verification</span>
              </div>
            </div>
          ) : (
            <>
              <div className="notice-card">
                <ShieldCheck size={20} />
                <p>Your details are ready to submit. No booking will be recorded until you select Submit request.</p>
              </div>
              {submissionError && (
                <div className="notice-card" role="alert">
                  <p>{submissionError}</p>
                </div>
              )}
              <div className="request-review-actions">
                <button
                  type="button"
                  className="button button-outline"
                  disabled={submitting}
                  onClick={() => setReviewing(false)}
                >
                  Edit details
                </button>
                <button
                  type="button"
                  className="button button-primary"
                  disabled={submitting}
                  onClick={handleSubmitRequest}
                >
                  {submitting ? 'Submitting request…' : 'Submit request'}
                  {!submitting && <ArrowRight size={17} />}
                </button>
              </div>
            </>
          )}
        </section>
      )}
    </main>
  )
}

function AdminPage() {
  return (
    <main className="section inner-page">
      <div className="page-heading">
        <span className="eyebrow">BPV WORKSPACE</span>
        <h1>Administration</h1>
        <p>Manage requests, verify payments, and keep BPV running smoothly.</p>
      </div>
      <div className="notice-card"><ShieldCheck size={20} /><p><strong>Private area.</strong> Real admin authentication and database access controls must be configured before any customer information or management actions are available.</p></div>
      <div className="request-placeholder">
        <ShieldCheck size={27} />
        <h2>Secure access is being prepared.</h2>
        <p>The admin sign-in, request management, payment verification, pricing controls, and content tools will be connected to Supabase with server-enforced access policies.</p>
        <p className="muted-small">This screen is a placeholder, not an authenticated admin dashboard.</p>
        <Link className="button button-outline" to="/">Return to home <ArrowRight size={16} /></Link>
      </div>
    </main>
  )
}

function NotFoundPage() {
  return (
    <main className="section inner-page not-found">
      <h1>We couldn't find that page.</h1>
      <p>The page may have moved, but we can help you find your way.</p>
      <Link className="button button-primary" to="/">Back to home <ArrowRight size={16} /></Link>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
        <CompactNavigation />
      </div>
    </BrowserRouter>
  )
}

export default App
