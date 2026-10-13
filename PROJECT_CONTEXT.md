# Bibliophile's Pen & Voice (BPV) — Project Context

## Purpose

Build a small, elegant, mobile-first Single Page Application (SPA) for Bibliophile's Pen and Voice (BPV), a personalised calling and writing service.

**Business name:** Bibliophile's Pen and Voice  
**Short name:** BPV  
**Tagline:** "...expressing you, beautifully"

This file is the project's handoff/source of truth. If continuing in another ChatGPT account, upload or paste this file first and say:

"Continue the BPV website project from this PROJECT_CONTEXT.md. Follow the current decisions and workflow."

## Current status

- Website project has not yet been created.
- Planning and handoff documentation is complete, and the user has confirmed readiness to begin implementation.
- README.md and PROJECT_CONTEXT.md are committed and pushed to the private GitHub repository.
- The user works from an Android phone using Termux and requires exactly one terminal command at a time, with verification before the next command.
- The typography benchmark is Facebook's interface across headings, body text, cards, buttons, navigation, forms, pricing, and the admin dashboard.
- Once setup begins, give exactly one terminal command at a time, then wait for the user to return the result before giving the next command.
- Preserve existing work if a project already exists; inspect before modifying files.

## Design decisions

- Visual reference: user-uploaded appointment-booking UI image, showing a white interface with soft green panels, medium green accents, rounded cards, fine borders, and generous whitespace.
- Strict palette: white and green tones only. Do not use gold, orange, yellow, or unrelated accent colours.
- Suggested palette:
  - Primary green: `#176B45`
  - White: `#FFFFFF`
  - Soft green: `#EAF4ED`
  - Light border: `#D8E3DC`
- Typography benchmark: Facebook's interface is the primary standard for sizing and readability throughout BPV. Apply a consistent Facebook-inspired scale to headings, body text, cards, buttons, navigation, labels, form fields, pricing, status indicators, and the admin dashboard.
- Match Facebook's restrained interface typography and component hierarchy as closely as practical across mobile screen sizes. Avoid oversized headings, exaggerated button text, oversized card labels, or unnecessarily large body text.
- Use a clean sans-serif stack and verify actual rendered sizes on mobile. Facebook uses different sizes for different components and devices, so measure and tune each component against the Facebook interface rather than forcing every element to use one font size.
- Keep text comfortably readable, with clear hierarchy, appropriate line height, and accessible contrast while preserving the strict white-and-green palette.
- Style: clean, minimal, elegant, warm, personal, human, professional, mobile-first. Avoid a generic corporate or marketplace look.
- Use the existing BPV logo/promotional assets as references when the user supplies them.
- Keep pages concise; do not build a broad website.

## Scope: three main views

### 1. Home (`/`)

- Short brand introduction and tagline
- Primary "Make a Request" call to action
- Service categories and pricing
- Brief "How it works"
- Testimonials/sample work
- Compact FAQ and prominent WhatsApp contact

### 2. Request & Payment (`/request`)

- Guest checkout; no customer account required
- Dynamic booking form
- Delivery date/time selection and fee breakdown
- Opay transfer instructions and payment reporting
- Booking reference and payment/request status

### 3. Admin Dashboard (`/admin`)

- Admin authentication required
- View and filter requests
- Inspect customer/recipient details, instructions, delivery time and optional files
- Verify Opay payments manually
- Update request statuses and mark work complete
- Manage service prices, subscription plans, testimonials and basic site content
- Overview of requests, payments, upcoming deliveries and subscription customers

Terms and Conditions, Privacy Policy, and Refund/Cancellation Policy should be compact modal/text views or lightweight in-app panels, not separate full pages.

## Services

Fixed service menu:

- Love
- Birthday
- Apology
- Congratulatory
- Encouragement
- Poetry
- Asking Out
- Checking Up
- Loyalty
- Anniversary
- Others (show a description field)

## Booking form fields

Retain and improve the existing BPV request form:

- Customer name and contact details
- Recipient's name
- Recipient's WhatsApp/phone number
- Service/message type
- Delivery method
- Preferred delivery date and time
- Specific details or wording to include
- Relationship between customer and recipient
- Name the recipient knows the customer by
- Optional attachment/screenshot where relevant
- Payment method and reference

Only show additional fields when relevant to the selected service or delivery method.

## Delivery and pricing rules

Current prices:

- Message: ₦2,000
- Call: ₦3,000
- Letter: ₦2,500
- Letter + Call: ₦5,000
- International Call: ₦6,000
- Emergency/immediate delivery surcharge: +₦1,000

Rules:

- Standard delivery must be scheduled at least 3 hours after booking.
- Emergency requests carry an additional ₦1,000 and must be subject to clear availability/acceptance rules.
- Explain the delivery window and total price before payment.
- Validate delivery timing on the server, not only in the browser.
- International Call is the applicable call price, not an automatic extra charge on top of the standard call price.
- Admin must be able to update prices without rebuilding/deploying the site.

## Payment decision

The user has chosen **Opay as the payment method for the initial version**. Paystack is deferred until the user requests it.

**Important:** Actual Opay account details and other private payment information must not be committed to the public repository or exposed in frontend source code. Store sensitive operational values securely when implementation requires them.

### Opay workflow

1. Customer submits the request and sees transfer instructions.
2. Customer reports the transfer and may submit a reference/evidence.
3. Request/payment remains pending.
4. Admin independently verifies receipt and manually confirms payment.
5. Only confirmed/verified paid requests become active and work can begin.

Track appropriate statuses, including:

- unpaid
- payment pending
- paid/payment confirmed
- cancelled
- refunded

Do not trust a customer-uploaded screenshot as proof that funds have arrived.

## Subscriptions

Support configurable weekly, monthly and yearly subscription plans.

Admin should control:

- price
- benefits
- eligible service types
- usage limits/credits
- validity
- renewal rules

Exact plan prices and benefits have not yet been decided. Keep implementation simple.

Automatic recurring payments are not required for the first version unless separately agreed.

## Technology direction

Preferred initial stack:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Supabase (PostgreSQL, authentication, storage and Row-Level Security)

### Security requirements

- Admin-only access must be enforced by Supabase policies/server-side checks, not just hidden UI.
- Never expose service-role keys or payment secrets in frontend code.
- If payment integration later needs server-side handling, use a secure server endpoint or Supabase Edge Function.
- Restrict access to customer data and uploaded files.
- WhatsApp is the primary communication channel; no internal chat is needed.

## Keep Version 1 simple

Do not add:

- Customer registration/accounts
- Marketplace functionality
- Internal chat
- Customer banning
- Elaborate customer profiles
- Complex dispute-resolution workflows
- Unnecessary extra pages

## Development workflow

- User uses Android/Termux; avoid assuming access to a PC.
- Give copy-ready commands.
- Execute one terminal command at a time and wait for the result.
- Explain briefly what each step does.
- Check the current directory/project before creating files.
- Verify build/tests after meaningful changes.
- Do not claim a feature works until it has been implemented and tested.
- Keep this file updated when important architectural decisions or progress change.
- GitHub is the permanent backup and project-continuation point.
- Do not commit passwords, Supabase secret keys, payment secrets, or other private credentials.
- Preferred milestone workflow: Build → Test → Context update → git status → commit → push origin main.
- Never claim a push succeeded unless the actual Git output confirms it.

## Repository

**GitHub repository:** `femixdigital/bpv-website`  
**Local project:** `~/projects/bpv-website`  
**Default branch:** `main`  
**Git remote:** `origin`

## Next step

The README and project context have been created and pushed to GitHub. The user has confirmed readiness to begin implementation.

Next: inspect the repository and available Termux tooling, then scaffold the React/Vite application step by step. Test meaningful milestones and update this document before each milestone commit and push.
