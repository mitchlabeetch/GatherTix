# Payment Provider Research for Non-Profit Ticketing

**Research Date:** March 2025  
**Purpose:** Self-hosted open source ticketing platform for small non-profits  
**Scope:** Global payment providers with focus on non-profit discounts, API quality, and regional compliance

---

## Executive Summary

| Provider | Standard Fee | Nonprofit Fee | Countries | Best For | Nonprofit Program |
|----------|-------------|---------------|-----------|----------|-------------------|
| **Stripe** | 2.9% + $0.30 | 2.2% + $0.30 (US) | 46+ | Tech-savvy orgs, global reach | Formal program, email nonprofit@stripe.com |
| **PayPal** | 2.89% + $0.49 | 1.99% + $0.49 (US) | 200+ | Brand recognition, quick setup | Verified 501(c)(3) charity status |
| **Square** | 2.6% + $0.10 (in-person) | No discount | 8 | In-person events, simple setup | None available |
| **Mollie** | 1.8% + EUR 0.25 | No formal program | 20+ (EU/UK) | EU organizations, local methods | Contact for volume discounts |
| **SumUp** | 1.69% flat | 1.49% (charities) | 15+ | In-person, small events | Charities & places of worship |
| **GoCardless** | 1% + $0.20 | 25% discount | UK/EU/AU/NZ | Recurring donations, memberships | 25% fee reduction for charities |
| **Adyen** | Interchange + 0.60% | Negotiable | 40+ | Enterprise, high volume | Contact sales |
| **Braintree** | 2.9% + $0.30 | Negotiable | 200+ | PayPal ecosystem, enterprise | Contact sales |

**Top Recommendations:**
- **Best Overall:** Stripe (excellent API, nonprofit discounts, global coverage)
- **Best for EU:** Mollie (local payment methods, PSD2/SCA compliant)
- **Best for In-Person:** SumUp (lowest fees for charities, simple hardware)
- **Best for Recurring:** GoCardless (lowest fees for Direct Debit)

---

## 1. Detailed Provider Profiles

### 1.1 Stripe

**Overview:** Leading payment infrastructure provider with excellent developer experience and comprehensive nonprofit program.

**Fee Structure:**
| Region | Standard | Nonprofit | Requirements |
|--------|----------|-----------|--------------|
| US | 2.9% + $0.30 | 2.2% + $0.30 | 501(c)(3), 80%+ donations |
| Canada | 2.9% + $0.30 | 2.2% + $0.30 | Registered charity status |
| UK | 1.4% + 20p | 1.2% + 20p | Charity Commission registration |
| EU | 1.4% + EUR 0.25 | 1.2% + EUR 0.25 | Local charity registry |
| Australia | 1.75% + $0.30 | 1.4% + $0.30 | ACNC registration |

**Countries/Currencies:** 46+ countries, 135+ currencies

**API Quality:**
- RESTful API with comprehensive documentation
- Official SDKs: Python, Ruby, PHP, Node.js, Java, Go, .NET
- Excellent testing tools (Stripe CLI, test mode)
- Strong typing and consistent patterns

**Webhook Capabilities:**
- Rich event types (50+ events)
- Signature verification with `Stripe-Signature` header
- Automatic retries with exponential backoff
- Idempotency support via `Idempotency-Key` header

**OAuth/Connect:**
- Stripe Connect for platform onboarding
- OAuth 2.0 flow for account connection
- Standard and Express account types
- Full API access to connected accounts

**PCI Compliance:**
- Stripe is PCI DSS Level 1 Service Provider
- SAQ A eligible when using Stripe Checkout or Elements
- Never handle raw card data

**Sandbox:** Full test environment with test card numbers

**Nonprofit Application:**
1. Create Stripe account at stripe.com
2. Email nonprofit@stripe.com with:
   - EIN or IRS determination letter (US)
   - Charity registration number (UK/EU)
   - Primary email associated with account
   - Confirmation that 80%+ volume is tax-deductible donations
3. Approval typically within 5-7 business days

---

### 1.2 PayPal

**Overview:** Most recognized payment brand globally, strong nonprofit features including Giving Fund access.

**Fee Structure:**
| Transaction Type | Standard | Nonprofit (501c3) |
|------------------|----------|-------------------|
| Online domestic | 2.89% + $0.49 | 1.99% + $0.49 |
| International | +1.5% additional | +1.5% additional |
| In-person (Zettle) | 2.29% + $0.09 | Same |
| Micropayments (<$10) | 4.99% + $0.09 | Available on request |

**Countries/Currencies:** 200+ countries, 25 currencies

**API Quality:**
- REST API (PayPal REST SDK)
- NVP/SOAP legacy APIs
- Good documentation but less developer-friendly than Stripe
- Webhook support via PayPal Developer Dashboard

**Webhook Capabilities:**
- Event notifications for payments, disputes, subscriptions
- Signature verification available
- Retry logic built-in

**OAuth/Connect:**
- PayPal Connect for third-party onboarding
- REST API OAuth 2.0 flow
- Partner Program for platforms

**PCI Compliance:**
- PayPal is PCI DSS Level 1 compliant
- SAQ A eligible when using PayPal checkout

**Sandbox:** Full sandbox environment at developer.paypal.com

**Nonprofit Application:**
1. Create PayPal Business account
2. Apply for charity status in account settings
3. Provide:
   - IRS 501(c)(3) determination letter
   - EIN
   - Bank statements
4. Review takes 3-5 business days
5. Enroll in PayPal Giving Fund for additional visibility

---

### 1.3 Square

**Overview:** Simple, integrated POS and online payments. No nonprofit discount but competitive flat rates.

**Fee Structure:**
| Transaction Type | US | Canada | UK |
|------------------|-----|--------|-----|
| In-person | 2.6% + $0.10 | 2.5% | 1.75% |
| Online | 2.9% + $0.30 | 2.8% + $0.30 | 1.9% + $0.20 |
| Manual entry | 3.5% + $0.15 | 3.3% + $0.15 | 2.5% + $0.20 |

**Countries:** US, Canada, UK, Ireland, France, Spain, Japan, Australia

**API Quality:**
- Square APIs (RESTful)
- SDKs for major languages
- Good documentation
- Webhook support

**Nonprofit Discount:** None available

**Best For:** Organizations needing simple in-person + online combo, especially events

---

### 1.4 Mollie

**Overview:** Europe-focused payment provider with excellent local payment method support.

**Fee Structure:**
| Payment Method | Fee |
|----------------|-----|
| Credit Cards (EEA) | 1.8% + EUR 0.25 |
| iDEAL (Netherlands) | EUR 0.29 fixed |
| Bancontact (Belgium) | 1.39% + EUR 0.25 |
| SEPA Direct Debit | 0.25% + EUR 0.25 |
| PayPal | 2.99% + EUR 0.25 |

**Countries:** EEA, UK, Switzerland (20+ countries)

**API Quality:**
- Clean REST API
- Official PHP client (mollie-api-php)
- Good documentation
- Test mode available

**Webhook Capabilities:**
- Signature verification
- Comprehensive event types
- Retry logic

**PCI Compliance:** SAQ A eligible

**Best For:** EU-based organizations needing local payment methods (iDEAL, Bancontact, Giropay)

---

### 1.5 SumUp

**Overview:** Simple, low-cost card readers ideal for in-person charity events.

**Fee Structure:**
| Transaction Type | Standard | Charity Rate |
|------------------|----------|--------------|
| In-person | 1.69% | 1.49% |
| Online/QR | 2.5% | 2.5% |

**Countries:** Europe, Brazil, Chile, USA

**Hardware:** Card readers from $19/GBP 19

**Nonprofit Application:** Contact SumUp business support with charity registration

**Best For:** Small charities, event ticketing, in-person donations

---

### 1.6 GoCardless

**Overview:** Direct Debit specialist with lowest fees for recurring payments.

**Fee Structure:**
| Region | Standard | Charity (25% off) |
|--------|----------|-------------------|
| UK | 1% + $0.20 | 0.75% + $0.20 |
| EU | 1% + EUR 0.20 | 0.75% + EUR 0.20 |
| AU/NZ | 1% + $0.40 | 0.75% + $0.40 |
| Instant Bank Pay | 1% | 0.75% |

**Countries:** UK, EU, Australia, New Zealand, USA

**Best For:** Memberships, regular giving programs, recurring donations

**Nonprofit Application:** Email help@gocardless.com with charity registration

---

### 1.7 Adyen

**Overview:** Enterprise-grade payment platform used by major global brands.

**Fee Structure:**
- Interchange++ pricing (Interchange + 0.60% + $0.11)
- Estimated: 2.5% - 3.2% + $0.11 for cards
- Minimum invoice requirements may apply

**Countries:** 40+ with local acquiring

**Currencies:** 150+

**Payment Methods:** 250+ including local methods

**Best For:** Large nonprofits with high volume ($250K+ annually)

**Nonprofit Discount:** Negotiable - contact sales

---

### 1.8 Braintree (PayPal)

**Overview:** PayPal's enterprise payment solution with advanced features.

**Fee Structure:**
- Standard: 2.9% + $0.30
- Nonprofit: Negotiable (contact sales)

**Countries:** 200+ markets

**Currencies:** 50+

**Features:**
- Vault for secure card storage
- 3D Secure 2.0 support
- PayPal, Venmo, Apple Pay, Google Pay
- Comprehensive sandbox

**Best For:** Organizations already in PayPal ecosystem needing advanced features

---

## 2. Non-Profit Programs Summary

### How to Apply by Provider

| Provider | Contact | Required Documents | Processing Time |
|----------|---------|-------------------|-----------------|
| Stripe | nonprofit@stripe.com | EIN/IRS letter, charity registration | 5-7 days |
| PayPal | Account settings | IRS 501(c)(3) letter, bank statements | 3-5 days |
| GoCardless | help@gocardless.com | Charity registration proof | 5-7 days |
| SumUp | business@sumup.com | Charity registration | 3-5 days |
| Adyen | sales@adyen.com | Volume projections, charity docs | Negotiable |
| Braintree | sales@braintreepayments.com | 501(c)(3), financials | Negotiable |

### Regional Nonprofit Requirements

**United States:**
- IRS 501(c)(3) determination letter
- EIN (Employer Identification Number)
- Must be registered charity

**United Kingdom:**
- Charity Commission registration number
- Gift Aid registration (for additional benefits)

**European Union:**
- Country-specific charity registry entry
- Tax-exempt status documentation

**Canada:**
- Registered Charity status with CRA
- Business Number (BN)

**Australia:**
- ACNC (Australian Charities and Not-for-profits Commission) registration
- ABN (Australian Business Number)

---

## 3. Integration Patterns

### 3.1 OAuth Connection Flow (Stripe Example)

```javascript
// Step 1: Generate OAuth link
const oauthUrl = `https://connect.stripe.com/oauth/authorize?` +
  `response_type=code&` +
  `client_id=${PLATFORM_CLIENT_ID}&` +
  `scope=read_write&` +
  `state=${csrfToken}&` +
  `redirect_uri=${REDIRECT_URI}`;

// Step 2: User authorizes and is redirected back
// Extract 'code' from query parameters

// Step 3: Exchange code for account ID
const response = await fetch('https://connect.stripe.com/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: authorizationCode,
    client_id: PLATFORM_CLIENT_ID
  })
});

const { stripe_user_id, access_token } = await response.json();
// Store stripe_user_id (connected account ID) in database
```

### 3.2 Webhook Security Implementation

```python
import hmac
import hashlib
import stripe

# Stripe webhook verification
def verify_stripe_webhook(payload, sig_header, webhook_secret):
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
        return event
    except ValueError:
        # Invalid payload
        return None
    except stripe.error.SignatureVerificationError:
        # Invalid signature
        return None

# Generic HMAC verification for other providers
def verify_webhook_signature(payload, signature, secret, algorithm='sha256'):
    expected = hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        getattr(hashlib, algorithm)
    ).hexdigest()
    
    return hmac.compare_digest(expected, signature)
```

### 3.3 Idempotency Handling

```javascript
// Stripe idempotency key usage
const payment = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'usd',
  customer: customerId
}, {
  idempotencyKey: `payment-${orderId}-${attempt}`
  // Format: unique per operation, consistent across retries
});

// Best practices:
// 1. Generate idempotency key before first attempt
// 2. Use consistent format: resource-action-uniqueid
// 3. Store processed keys to prevent duplicates
// 4. Clear old keys after provider's retention period
```

### 3.4 Error Recovery Pattern

```python
class PaymentProcessor:
    def process_with_retry(self, payment_func, max_retries=3):
        for attempt in range(max_retries):
            try:
                return payment_func()
            except TemporaryError as e:
                if attempt < max_retries - 1:
                    time.sleep(2 ** attempt)  # Exponential backoff
                    continue
                raise
            except PermanentError as e:
                # Log and notify, don't retry
                self.log_error(e)
                raise
```

---

## 4. Regional Recommendations

### 4.1 European Union (PSD2/SCA Compliance)

**Recommended:** Mollie or Stripe

**Why:**
- Full PSD2/SCA compliance with 3D Secure 2.0
- Local payment methods (iDEAL, Bancontact, Giropay, SEPA)
- Strong regulatory adherence

**SCA Exemptions for Nonprofits:**
- Low-value transactions (<EUR 30) may be exempt
- Subscription renewals (merchant-initiated)
- Mail/telephone orders (MOTO)

**Implementation:**
```javascript
// Stripe SCA handling
const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'eur',
  customer: customerId,
  payment_method: paymentMethodId,
  confirm: true,
  off_session: false  // Requires SCA
});

if (paymentIntent.status === 'requires_action') {
  // Redirect to 3D Secure authentication
  return {
    requiresAction: true,
    clientSecret: paymentIntent.client_secret
  };
}
```

### 4.2 United States

**Recommended:** Stripe or PayPal

**Why:**
- Best nonprofit discounts available
- Mature market with full feature parity
- Strong dispute resolution

**Considerations:**
- ACH transfers available (0.8% capped at $5 with Stripe)
- State-specific charity registration requirements
- 501(c)(3) status required for discounts

### 4.3 United Kingdom

**Recommended:** Stripe or GoCardless

**Why:**
- Stripe: 1.2% + 20p nonprofit rate
- GoCardless: Excellent for Direct Debit (0.75% + 20p with charity discount)
- Gift Aid integration available

**Payment Methods:**
- Cards (Visa, Mastercard)
- Direct Debit (BACS)
- Apple Pay, Google Pay

### 4.4 Canada

**Recommended:** Stripe or PayPal

**Why:**
- Stripe: 2.2% + $0.30 nonprofit rate
- Interac debit support (Square)
- CAD currency support

**Considerations:**
- CRA Registered Charity status required
- Provincial charity regulations may apply

### 4.5 Australia

**Recommended:** Stripe or GoCardless

**Why:**
- Stripe: 1.4% + $0.30 nonprofit rate
- GoCardless: BECS Direct Debit support
- ACNC registration recognized

**Payment Methods:**
- Cards (Visa, Mastercard, Amex)
- BECS Direct Debit
- Apple Pay, Google Pay

---

## 5. Self-Hosted & Alternative Options

### 5.1 Open Source Payment Processors

| Solution | Type | Best For | Notes |
|----------|------|----------|-------|
| **BTCPay Server** | Bitcoin/crypto | Tech-savvy orgs | Self-hosted, no fees, full control |
| **Lago** | Billing platform | Usage-based billing | Open source, API-first |
| **Taler** | Privacy-focused | Privacy-conscious | GNU project, no registration |

### 5.2 BTCPay Server for Nonprofits

**Pros:**
- Zero transaction fees (only network fees)
- Fully self-hosted
- No KYC/AML for self-hosted
- Censorship resistant

**Cons:**
- Technical expertise required
- Donor adoption limited
- Price volatility
- No chargeback protection

**Setup:**
```bash
# Docker deployment
git clone https://github.com/btcpayserver/btcpayserver-docker
cd btcpayserver-docker
export BTCPAY_HOST="payments.yourorg.org"
export NBITCOIN_NETWORK="mainnet"
./btcpay-setup.sh -i
```

### 5.3 Cryptocurrency Considerations

**Recommended for Nonprofits:**
- Bitcoin (most recognized)
- Ethereum (smart contract capabilities)
- Stablecoins (USDC, USDT) - reduces volatility

**Tax Implications:**
- Donations may be tax-deductible at fair market value
- Immediate conversion to fiat recommended
- Consult local tax regulations

---

## 6. PCI Compliance Guide

### 6.1 SAQ A Eligibility

You qualify for SAQ A (simplest compliance) if:
- All payment processing is outsourced to PCI DSS validated third party
- You never store, process, or transmit cardholder data
- Payment page is fully hosted by provider (redirect) OR
- Payment form is embedded iframe from provider

### 6.2 SAQ A Requirements (14 questions)

Key requirements:
1. Change default passwords
2. Assign unique user IDs
3. Limit physical access
4. Deploy file integrity monitoring
5. Maintain information security policy

### 6.3 Implementation Checklist

- [ ] Verify payment processor is PCI DSS Level 1 compliant
- [ ] Use hosted payment pages or iframes (Stripe Checkout, PayPal)
- [ ] Never store card data (use provider vault)
- [ ] Implement HTTPS site-wide
- [ ] Complete annual SAQ A
- [ ] Submit Attestation of Compliance (AOC)

---

## 7. Quick Decision Matrix

| Your Situation | Recommended Provider | Why |
|----------------|---------------------|-----|
| Small US nonprofit, online donations | PayPal | Lower fees (1.99%), brand trust |
| Tech-savvy, custom integration | Stripe | Best API, nonprofit discounts |
| EU organization, local methods | Mollie | iDEAL, Bancontact, SCA compliant |
| In-person events, simple setup | SumUp | 1.49% charity rate, cheap hardware |
| Recurring memberships | GoCardless | 0.75% Direct Debit |
| Global reach, high volume | Adyen | 150+ currencies, local acquiring |
| Privacy-focused, technical | BTCPay | Zero fees, self-hosted |

---

## 8. Integration Code Examples

### 8.1 Stripe Checkout Session

```javascript
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{
    price_data: {
      currency: 'usd',
      product_data: {
        name: 'Event Ticket',
        description: 'Charity Gala 2025'
      },
      unit_amount: 5000, // $50.00
    },
    quantity: 1,
  }],
  mode: 'payment',
  success_url: 'https://yourorg.org/success?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'https://yourorg.org/cancel',
  metadata: {
    event_id: 'gala-2025',
    donor_id: 'donor-123'
  }
});
```

### 8.2 PayPal Order Creation

```javascript
const order = await paypal.orders.create({
  intent: 'CAPTURE',
  purchase_units: [{
    amount: {
      currency_code: 'USD',
      value: '50.00'
    },
    description: 'Charity Donation'
  }],
  application_context: {
    brand_name: 'Your Nonprofit',
    landing_page: 'BILLING',
    user_action: 'PAY_NOW'
  }
});
```

### 8.3 Webhook Handler (Generic)

```python
from flask import Flask, request, jsonify
import hmac
import hashlib

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def handle_webhook():
    payload = request.get_data()
    signature = request.headers.get('X-Webhook-Signature')
    
    # Verify signature
    if not verify_signature(payload, signature, WEBHOOK_SECRET):
        return jsonify({'error': 'Invalid signature'}), 403
    
    event = request.get_json()
    
    # Idempotency check
    event_id = event['id']
    if is_event_processed(event_id):
        return jsonify({'status': 'already processed'}), 200
    
    # Process event
    if event['type'] == 'payment.success':
        process_payment(event['data'])
    
    mark_event_processed(event_id)
    return jsonify({'status': 'success'}), 200
```

---

## 9. Resources & References

### Documentation Links
- Stripe: https://docs.stripe.com
- PayPal: https://developer.paypal.com
- Mollie: https://docs.mollie.com
- GoCardless: https://developer.gocardless.com
- BTCPay: https://docs.btcpayserver.org

### Nonprofit Resources
- Stripe Nonprofit: nonprofit@stripe.com
- PayPal Charity: https://www.paypal.com/us/business/nonprofit
- TechSoup: https://www.techsoup.org (discounted software)

### Compliance
- PCI SSC: https://www.pcisecuritystandards.org
- SAQ A Guide: https://www.pcisecuritystandards.org/documents/SAQ_A_v3.pdf

---

*Report compiled for non-profit ticketing platform evaluation. Fees and features subject to change - verify with providers before implementation.*
