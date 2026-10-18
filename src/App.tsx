import { useCallback, useEffect, useState } from 'react'
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
          <span className="brand-mark">
            <img
              src={`${import.meta.env.BASE_URL}images/bpv-logo.jpg`}
              alt="Bibliophile's Pen & Voice logo"
            />
          </span>
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
          <a href="/bpv-website/#services" onClick={closeMenu}>Services</a>
          <a href="/bpv-website/#pricing" onClick={closeMenu}>Pricing</a>
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
      <a className="compact-nav-item" href="/bpv-website/#services" aria-label="Services">
        <BookOpen size={20} />
        <span>Services</span>
      </a>
      <a className="compact-nav-item" href="/bpv-website/#pricing" aria-label="Pricing">
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
          <a href="https://wa.me/message/WUJ5LJ3OS5RSP1" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
          <Link to="/admin">Admin</Link>
        </div>
        <small>© {new Date().getFullYear()} Bibliophile's Pen & Voice</small>
      </div>
    </footer>
  )
}

function WhatsAppButton() {
  return (
    <a
      className="whatsapp-float"
      href="https://wa.me/message/WUJ5LJ3OS5RSP1"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with BPV on WhatsApp"
    >
      <MessageCircle size={22} />
      <span>Chat with us</span>
    </a>
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

      <section className="promo-section" aria-label="BPV promotion">
        <div className="promo-inner">
          <img
            src={`${import.meta.env.BASE_URL}images/bpv-promo.jpg`}
            alt="Bibliophile's Pen & Voice promotional flyer"
            loading="lazy"
          />
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
  const [recipientName] = useState('')
  const [recipientPhone, setRecipientPhone] = useState('')
  const [service, setService] = useState(prices[0].name)
  const [messageType, setMessageType] = useState('Love & Romance')
  const [instructions, setInstructions] = useState('')
  const [delivery, setDelivery] = useState('standard')
  const [preferredDeliveryAt, setPreferredDeliveryAt] = useState('')

  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [draftDate, setDraftDate] = useState(() => {
    const d = new Date(minimumDeliveryDateTime(3))
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  })
  const [draftTime, setDraftTime] = useState(() => {
    const d = new Date(minimumDeliveryDateTime(3))
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  })
  const [calendarMonth, setCalendarMonth] = useState(() => new Date())
  const calendarFirst = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1)
  const calendarStart = new Date(calendarFirst)
  calendarStart.setDate(calendarFirst.getDate() - calendarFirst.getDay())
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(calendarStart)
    d.setDate(calendarStart.getDate() + i)
    return d
  })
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
    const date = new Date(Date.now() + hoursAhead * 60 * 60 * 1000)
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
    
  return date.toISOString().slice(0, 16)
  }
  const formatNaira = (amount: number) =>
    `₦${amount.toLocaleString('en-NG')}`

  function handleReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!preferredDeliveryAt || Number.isNaN(new Date(preferredDeliveryAt).getTime())) {
      setSubmissionError('Please select and confirm your delivery date and time.')
      return
    }

    setSubmissionError('')
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
            <div className="bpv-datetime-field">
              <button type="button" className="bpv-datetime-trigger" onClick={() => setDatePickerOpen(!datePickerOpen)} aria-expanded={datePickerOpen}>
                <span className="bpv-datetime-trigger-icon">▦</span>
                <span className="bpv-datetime-trigger-copy">
                  <strong>{preferredDeliveryAt ? new Date(preferredDeliveryAt).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' }) : 'Choose delivery date and time'}</strong>
                  <small>{preferredDeliveryAt ? 'Tap to change your selection' : 'Select a date and preferred time'}</small>
                </span>
                <span className="bpv-datetime-edit">Choose</span>
              </button>

              {datePickerOpen && (
                <div className="bpv-calendar-panel">
                  <div className="bpv-calendar-top">
                    <div>
                      <span className="eyebrow">DELIVERY SCHEDULING</span>
                      <h3>{calendarMonth.toLocaleDateString('en', { month: 'long', year: 'numeric' })}</h3>
                    </div>
                    <div className="bpv-calendar-nav">
                      <button type="button" aria-label="Previous month" onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))}>‹</button>
                      <button type="button" aria-label="Next month" onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))}>›</button>
                    </div>
                  </div>

                  <div className="bpv-calendar-weekdays">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <span key={day}>{day}</span>)}
                  </div>

                  <div className="bpv-calendar-days">
                    {calendarDays.map((day, index) => {
                      const minDate = new Date(minimumDeliveryDateTime(delivery === 'urgent' ? 0 : 3))
                      const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate())
                      const minStart = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
                      const disabled = dayStart < minStart
                      const chosen = draftDate === `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`
                      return (
                        <button key={`${day.toISOString()}-${index}`} type="button" disabled={disabled} className={'bpv-calendar-day' + (day.getMonth() !== calendarMonth.getMonth() ? ' outside' : '') + (chosen ? ' chosen' : '')} onClick={() => setDraftDate(`${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`)}>
                          {day.getDate()}
                        </button>
                      )
                    })}
                  </div>

                  <div className="bpv-calendar-time">
                    <label htmlFor="bpv-delivery-time">Preferred time</label>
                    <input id="bpv-delivery-time" type="time" value={draftTime} onChange={(e) => setDraftTime(e.target.value)} required />
                  </div>

                  <div className="bpv-calendar-actions">
                    <button type="button" className="bpv-calendar-cancel" onClick={() => setDatePickerOpen(false)}>Cancel</button>
                    <button type="button" className="bpv-calendar-confirm" disabled={!draftDate || !draftTime || new Date(`${draftDate}T${draftTime}`) < new Date(minimumDeliveryDateTime(delivery === 'urgent' ? 0 : 3))} onClick={() => {
                      const selectedDateTime = new Date(`${draftDate}T${draftTime}`)
                      const minimumDateTime = new Date(minimumDeliveryDateTime(delivery === 'urgent' ? 0 : 3))

                      if (!draftDate || !draftTime || Number.isNaN(selectedDateTime.getTime()) || selectedDateTime < minimumDateTime) {
                        setSubmissionError('Please choose a valid delivery date and time.')
                        return
                      }

                      setPreferredDeliveryAt(`${draftDate}T${draftTime}`)
                      setSubmissionError('')
                      setDatePickerOpen(false)
                    }}>Confirm date &amp; time</button>
                  </div>
                </div>
              )}
              <input type="hidden" value={preferredDeliveryAt} />
            </div>
            <label>
              Recipient's phone number <span className="form-optional">(if needed)</span>
              <input
                type="tel"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                placeholder="Include country code for calls"
              />
            </label>
            <label>
              What would you like us to know?
              <textarea
                required
                rows={5}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Share the occasion, important details, tone, and what you hope to express."
              />
            </label>
          </div>

          <div className="request-form-section">
            <h2>Delivery preference</h2>

            <label className="delivery-option">
              <input
                type="radio"
                name="delivery"
                value="standard"
                checked={delivery === 'standard'}
                onChange={() => setDelivery('standard')}
              />
              <span>
                <strong>Standard delivery</strong>
                <small>At least 3 hours after booking, subject to confirmation.</small>
              </span>
            </label>
            <label className="delivery-option">
              <input
                type="radio"
                name="delivery"
                value="urgent"
                checked={delivery === 'urgent'}
                onChange={() => setDelivery('urgent')}
              />
              <span>
                <strong>Request urgent delivery (+₦1,000)</strong>
                <small>Subject to availability and acceptance.</small>
              </span>
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

type BPVRequest = {
  id: string
  booking_reference: string | null
  customer_name: string | null
  customer_email: string | null
  customer_phone: string | null
  recipient_name: string | null
  service_type: string | null
  message_type: string | null
  delivery_type: string | null
  amount_ngn: number | null
  payment_status: string | null
  payment_reference: string | null
  request_status: string | null
  created_at: string
}

function AdminPage() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [loading, setLoading] = useState(true)
const [submitting, setSubmitting] = useState(false)
const [isAdmin, setIsAdmin] = useState(false)
const [requests, setRequests] = useState<BPVRequest[]>([])
const [error, setError] = useState('')
const [requestFilter, setRequestFilter] = useState('all')
const [updatingRequestId, setUpdatingRequestId] = useState<string | null>(null)

const verifyAdmin = useCallback(async () => {
const { data: { session }, error: sessionError } =
  await supabase.auth.getSession()

setLoading(true)
setError('')

if (sessionError || !session) {
  setIsAdmin(false)
  setLoading(false)
  return
}

const { data: adminResult, error: adminError } =
  await supabase.rpc('is_bpv_admin')

if (adminError || adminResult !== true) {
  setIsAdmin(false)
  setError(
    adminError?.message ||
      'This account is not authorised to access the BPV admin area.'
  )
  setLoading(false)
  return
}

setIsAdmin(true)

const { data, error: requestError } = await supabase
  .from('bpv_requests')
  .select(
    'id, booking_reference, customer_name, customer_email, customer_phone, recipient_name, service_type, message_type, delivery_type, amount_ngn, payment_status, payment_reference, request_status, created_at'
  )
  .order('created_at', { ascending: false })
  .limit(100)

if (requestError) {
  setError(`Admin verified, but requests could not be loaded: ${requestError.message}`)
} else {
  setRequests(data ?? [])
}

setLoading(false)

}, [])

const updateBooking = async (
  request: BPVRequest,
  updates: {
    request_status?: 'accepted' | 'in progress' | 'completed' | 'cancelled'
    payment_status?: 'paid'
    payment_verified_at?: string
  },
  confirmation: string,
) => {
  if (!window.confirm(confirmation)) return

  setUpdatingRequestId(request.id)
  setError('')

  try {
    const { data, error: updateError } = await supabase
      .from('bpv_requests')
      .update(updates)
      .eq('id', request.id)
      .select('id')
      .maybeSingle()

    if (updateError) throw updateError
    if (!data) {
      throw new Error('No booking was updated. Refresh the dashboard and try again.')
    }

    await verifyAdmin()
  } catch (updateError) {
    setError(
      updateError instanceof Error
        ? updateError.message
        : 'The booking could not be updated. Please try again.',
    )
  } finally {
    setUpdatingRequestId(null)
  }
}

const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
event.preventDefault()
setSubmitting(true)
setError('')

const { error: loginError } = await supabase.auth.signInWithPassword({
  email: email.trim(),
  password,
})

if (loginError) {
  setError(loginError.message)
  setSubmitting(false)
  return
}

await verifyAdmin()
setPassword('')
setSubmitting(false)

}

const handleSignOut = async () => {
setError('')
const { error: signOutError } = await supabase.auth.signOut()

if (signOutError) {
  setError(signOutError.message)
  return
}

setIsAdmin(false)
setRequests([])
setPassword('')

}

useEffect(() => {
  void Promise.resolve().then(() => verifyAdmin())
}, [verifyAdmin])

if (loading) {
return (
<main className="section inner-page">
<div className="request-placeholder">
<ShieldCheck size={27} />
<h2>Checking secure access…</h2>
<p>Please wait while BPV verifies your session.</p>
</div>
</main>
)
}

if (!isAdmin) {
return (
<main className="section inner-page">
<div className="page-heading">
<span className="eyebrow">BPV WORKSPACE</span>
<h1>Administration</h1>
<p>Sign in with your authorised BPV administrator account.</p>
</div>

    <form className="request-placeholder admin-signin-form" onSubmit={handleLogin}>
      <ShieldCheck size={27} />
      <h2>Admin sign-in</h2>

      {error && (
        <div className="notice-card" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="admin-signin-field">
        <label htmlFor="admin-email">Email address</label>
        <input
          id="admin-email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="admin-signin-field">
        <label htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      <button
        className="button button-primary"
        type="submit"
        disabled={submitting}
      >
        {submitting ? 'Signing in…' : 'Sign in securely'}
      </button>

      <Link className="button button-outline" to="/">
        Return to home <ArrowRight size={16} />
      </Link>
    </form>
  </main>
)

}

return (
<main className="section inner-page bpv-admin">
  <header className="admin-grid-heading">
    <span className="eyebrow">BPV WORKSPACE / OVERVIEW</span>
    <h1>Your creative desk.</h1>
    <p>Manage customer requests from one elegant workspace.</p>
  </header>

  <section className="admin-grid-stats" aria-label="Request summary">
    <button type="button" className={'admin-grid-stat admin-grid-stat-button featured ' + (requestFilter === 'all' ? 'active' : '')} aria-pressed={requestFilter === 'all'} onClick={() => { setRequestFilter('all'); document.getElementById('admin-recent-bookings')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>
      <span>Total requests</span>
      <strong>{requests.length}</strong>
      <small>{requestFilter === 'all' ? 'Viewing all requests' : 'Click to view all'} →</small>
    </button>
    <button type="button" className={'admin-grid-stat admin-grid-stat-button ' + (requestFilter === 'pending' ? 'active' : '')} aria-pressed={requestFilter === 'pending'} onClick={() => { setRequestFilter('pending'); document.getElementById('admin-recent-bookings')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>
      <span>Pending requests</span>
      <strong>{requests.filter((r) => String(r.request_status ?? '').trim().toLowerCase() === 'pending').length}</strong>
      <small>{requestFilter === 'pending' ? 'Viewing pending' : 'Click to review pending'} →</small>
    </button>
    <button type="button" className={'admin-grid-stat admin-grid-stat-button ' + (requestFilter === 'unpaid' ? 'active' : '')} aria-pressed={requestFilter === 'unpaid'} onClick={() => { setRequestFilter('unpaid'); document.getElementById('admin-recent-bookings')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>
      <span>Unpaid payments</span>
      <strong>{requests.filter((r) => String(r.payment_status ?? '').trim().toLowerCase() === 'unpaid').length}</strong>
      <small>{requestFilter === 'unpaid' ? 'Viewing unpaid' : 'Click to review unpaid'} →</small>
    </button>
    <button type="button" className="admin-grid-stat admin-grid-stat-button" onClick={() => void verifyAdmin()} disabled={loading}>
      <span>Workspace</span>
      <strong className="admin-secure-label">{loading ? 'Checking…' : 'Secure'}</strong>
      <small>{loading ? 'Verifying access' : 'Click to refresh'} ↻</small>
    </button>
  </section>

  <section className="admin-grid-bookings" id="admin-recent-bookings">
    <div className="admin-grid-section-heading">
      <div>
        <span className="eyebrow">BOOKING MANAGEMENT</span>
        <h2>Recent bookings</h2>
        <p>Customer details, service and payment overview.</p>
      </div>
      <button type="button" className="button button-outline" onClick={() => void verifyAdmin()} disabled={loading}>
        {loading ? 'Refreshing…' : '↻ Refresh'}
      </button>
    </div>

    <div className="admin-grid-toolbar">
      <div className="admin-grid-filters" role="group" aria-label="Filter bookings">
        <button type="button" className={requestFilter === 'all' ? 'selected' : ''} aria-pressed={requestFilter === 'all'} onClick={() => setRequestFilter('all')}>All <span>{requests.length}</span></button>
        <button type="button" className={requestFilter === 'pending' ? 'selected' : ''} aria-pressed={requestFilter === 'pending'} onClick={() => setRequestFilter('pending')}>Pending</button>
        <button type="button" className={requestFilter === 'unpaid' ? 'selected' : ''} aria-pressed={requestFilter === 'unpaid'} onClick={() => setRequestFilter('unpaid')}>Unpaid</button>
      </div>
      <button type="button" className="button button-primary" onClick={() => void handleSignOut()}>Sign out</button>
    </div>

    {error && <div className="notice-card" role="alert"><p>{error}</p></div>}

    {requests.length === 0 ? (
      <div className="admin-grid-empty">
        <ShieldCheck size={28} />
        <h3>No requests to display</h3>
        <p>There are no requests available, or none could be loaded.</p>
      </div>
    ) : (
      <div className="admin-grid-list">
        {requests.filter((r) => {
          if (requestFilter === 'pending') return String(r.request_status ?? '').trim().toLowerCase() === 'pending'
          if (requestFilter === 'unpaid') return String(r.payment_status ?? '').trim().toLowerCase() === 'unpaid'
          return true
        }).map((request) => (
          <article className="admin-grid-card" key={request.id}>
            <div className="admin-grid-card-head">
              <div>
                <span className="admin-grid-overline">BOOKING REFERENCE</span>
                <h3>{request.booking_reference}</h3>
              </div>
              <span className={'admin-grid-status ' + (String(request.request_status ?? '').trim().toLowerCase() === 'pending' ? 'pending' : 'neutral')}>
                {request.request_status}
              </span>
            </div>

            <div className="admin-grid-customer">
              <div className="admin-grid-avatar">{String(request.customer_name || '?').trim().charAt(0).toUpperCase()}</div>
              <div className="admin-grid-customer-info">
                <strong>{request.customer_name}</strong>
                <span>{request.customer_email}</span>
                <span>{request.customer_phone}</span>
              </div>
            </div>

            <div className="admin-grid-details">
              <div><span>Service</span><strong>{request.service_type}</strong></div>
              <div><span>Recipient</span><strong>{request.recipient_name}</strong></div>
              <div><span>Message type</span><strong>{request.message_type}</strong></div>
              <div><span>Delivery</span><strong>{request.delivery_type}</strong></div>
            </div>

            <div className="admin-grid-payment">
              <div><span>Booking amount</span><strong>₦{Number(request.amount_ngn).toLocaleString('en-NG')}</strong></div>
              <span className={'admin-grid-status ' + (String(request.payment_status ?? '').trim().toLowerCase() === 'unpaid' ? 'unpaid' : 'neutral')}>
                {request.payment_status}
              </span>
            </div>

            <div className="admin-grid-actions" aria-label="Booking actions">
              {String(request.request_status ?? '').toLowerCase() === 'pending' && (
                <button
                  type="button"
                  className="button button-outline"
                  disabled={updatingRequestId !== null}
                  onClick={() => void updateBooking(
                    request,
                    { request_status: 'accepted' },
                    `Accept booking ${request.booking_reference}?`,
                  )}
                >
                  {updatingRequestId === request.id ? 'Updating…' : 'Accept booking'}
                </button>
              )}

              {String(request.request_status ?? '').toLowerCase() === 'accepted' && (
                <button
                  type="button"
                  className="button button-outline"
                  disabled={updatingRequestId !== null}
                  onClick={() => void updateBooking(
                    request,
                    { request_status: 'in progress' },
                    `Start work on booking ${request.booking_reference}?`,
                  )}
                >
                  Start work
                </button>
              )}

              {String(request.request_status ?? '').toLowerCase() === 'in progress' && (
                <button
                  type="button"
                  className="button button-outline"
                  disabled={updatingRequestId !== null}
                  onClick={() => void updateBooking(
                    request,
                    { request_status: 'completed' },
                    `Mark booking ${request.booking_reference} as completed? Confirm the service has been delivered.`,
                  )}
                >
                  Mark completed
                </button>
              )}

              {!['completed', 'cancelled'].includes(
                String(request.request_status ?? '').toLowerCase()
              ) && (
                <button
                  type="button"
                  className="button button-outline"
                  disabled={updatingRequestId !== null}
                  onClick={() => void updateBooking(
                    request,
                    { request_status: 'cancelled' },
                    `Cancel booking ${request.booking_reference}?`,
                  )}
                >
                  Cancel booking
                </button>
              )}

              {!['paid', 'cancelled', 'refunded'].includes(
                String(request.payment_status ?? '').toLowerCase()
              ) && String(request.request_status ?? '').toLowerCase() !== 'cancelled' && (
                <button
                  type="button"
                  className="button button-primary"
                  disabled={updatingRequestId !== null}
                  onClick={() => void updateBooking(
                    request,
                    {
                      payment_status: 'paid',
                      payment_verified_at: new Date().toISOString(),
                    },
                    `Have you independently confirmed that the full payment for booking ${request.booking_reference} has arrived in your account? Only confirm if you have checked your receiving account.`,
                  )}
                >
                  Confirm payment received
                </button>
              )}
            </div>

            <details className="admin-grid-more">
              <summary>View payment and submission details</summary>
              <p><strong>Payment reference:</strong> {request.payment_reference || 'Not supplied'}</p>
              <p><strong>Submitted:</strong> {new Date(request.created_at).toLocaleString()}</p>
            </details>
          </article>
        ))}
        {requests.filter((r) => {
          if (requestFilter === 'pending') return String(r.request_status ?? '').trim().toLowerCase() === 'pending'
          if (requestFilter === 'unpaid') return String(r.payment_status ?? '').trim().toLowerCase() === 'unpaid'
          return true
        }).length === 0 && (
          <div className="admin-grid-empty">
            <h3>No matching bookings</h3>
            <p>Choose another filter to see requests.</p>
          </div>
        )}
      </div>
    )}
    <p className="admin-grid-note">Payment status is shown for review only. Independently confirm transfers before marking any payment as verified.</p>
  </section>
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
    <BrowserRouter basename="/bpv-website">
      <div className="app-shell">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
        <CompactNavigation />
      </div>
    </BrowserRouter>
  )
}

export default App
