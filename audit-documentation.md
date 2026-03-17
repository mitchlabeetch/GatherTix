# GatherTix Documentation & Template System

> Complete documentation and user-facing templates for GatherTix - An open source ticketing platform for non-profits and small event teams.

---

## Table of Contents

1. [End-User Documentation](#1-end-user-documentation)
2. [Email Templates](#2-email-templates)
3. [Landing Page Templates](#3-landing-page-templates)
4. [Ticket Templates](#4-ticket-templates)
5. [Admin Interface Copy](#5-admin-interface-copy)
6. [Developer Documentation](#6-developer-documentation)
7. [Troubleshooting Guide](#7-troubleshooting-guide)
8. [FAQ Document](#8-faq-document)

---

# 1. END-USER DOCUMENTATION

## 1A. Getting Started Guide

### What is GatherTix?

GatherTix is a **free, open-source ticketing platform** designed specifically for non-profit organizations, community groups, and small event teams. Unlike commercial ticketing services that charge per-ticket fees, GatherTix is self-hosted software that you control.

**Key Features:**
- Create unlimited events with multiple ticket types
- Accept payments online (Stripe, PayPal)
- QR code check-in with mobile scanner app
- Export attendee data for your records
- Customizable event pages
- No per-ticket fees (just payment processor fees)

### Who is GatherTix For?

GatherTix is perfect for:

| Organization Type | Typical Use Cases |
|-------------------|-------------------|
| **Non-profits** | Fundraising galas, charity auctions, benefit concerts |
| **Community Groups** | Local festivals, neighborhood events, meetups |
| **Schools & Churches** | Performances, fundraisers, community gatherings |
| **Small Event Teams** | Workshops, conferences, small concerts |
| **Arts Organizations** | Gallery openings, theater performances, exhibitions |

**What You Need:**
- Basic computer skills (no coding required!)
- Someone to handle the initial technical setup (or a friendly volunteer)
- A payment processor account (Stripe or PayPal)
- Enthusiasm for your event!

### Quick Start (5-Minute Setup)

Once your organization's GatherTix instance is set up, here's how to create your first event:

#### Step 1: Log In
1. Go to your organization's GatherTix URL
2. Enter your email and password
3. Click "Sign In"

#### Step 2: Create Your Event
1. Click the **"Create Event"** button on your dashboard
2. Enter your event name and basic details
3. Click **"Save & Continue"**

#### Step 3: Add Ticket Types
1. Click **"Add Ticket Type"**
2. Name your ticket (e.g., "General Admission", "VIP")
3. Set the price and quantity available
4. Click **"Save"**

#### Step 4: Customize Your Event Page
1. Upload an event image
2. Write your event description
3. Add venue information
4. Preview how it looks to attendees

#### Step 5: Publish!
1. Click **"Publish Event"**
2. Share your event URL via email, social media, or your website
3. Start selling tickets!

### First Event Checklist

Use this checklist to ensure your event is ready:

**Before Publishing:**
- [ ] Event name is clear and descriptive
- [ ] Date and time are correct (double-check AM/PM!)
- [ ] Venue address is complete
- [ ] Event description explains what attendees can expect
- [ ] At least one ticket type is created
- [ ] Ticket prices are set correctly
- [ ] Event image is uploaded (recommended: 1200x630 pixels)
- [ ] Refund policy is stated
- [ ] Contact information is provided

**Before Going Live:**
- [ ] Payment processor is connected and tested
- [ ] Test purchase completed successfully
- [ ] Confirmation email received with ticket
- [ ] QR code on ticket scans correctly
- [ ] Team members have appropriate access
- [ ] Check-in process is planned

**One Week Before:**
- [ ] Send reminder to registered attendees
- [ ] Prepare check-in materials
- [ ] Brief volunteers on the process
- [ ] Test check-in app on event devices

---

## 1B. Event Creation Guide

### Creating Your First Event

Events are the heart of GatherTix. This guide walks you through creating a complete, professional event page.

#### Event Basics

**Required Information:**
- **Event Name**: Keep it clear and memorable (max 100 characters)
- **Start Date & Time**: When does your event begin?
- **End Date & Time**: When does it conclude?
- **Timezone**: Critical for virtual events or attendees from multiple regions
- **Venue Name**: Where is your event happening?
- **Venue Address**: Full street address for maps and directions

**Optional But Recommended:**
- **Event Image**: Eye-catching visual (1200x630px recommended)
- **Event Description**: Tell your story and set expectations
- **Refund Policy**: Clear terms build trust
- **Contact Email**: For attendee questions
- **Website URL**: Link to more information

#### Writing Great Event Descriptions

A good event description:

1. **Opens with a hook** - Why should someone attend?
2. **Explains what's included** - Food? Swag? Networking?
3. **Sets expectations** - Dress code? What to bring?
4. **Includes accessibility info** - Parking, transit, accessibility features
5. **Ends with a call-to-action** - "Reserve your spot today!"

**Example:**
```
Join us for our Annual Community Fundraiser!

Enjoy an evening of live music, delicious local cuisine, and silent auction items from community businesses. All proceeds support our youth programs.

What's Included:
- Welcome reception with appetizers
- Seated dinner with vegetarian options
- Live entertainment
- Silent auction access
- Complimentary parking

Dress Code: Business casual

Accessibility: Our venue is wheelchair accessible with accessible parking available.

Questions? Contact events@ournonprofit.org

Reserve your spot today - space is limited!
```

### Setting Ticket Types and Pricing

Ticket types let you offer different experiences or price points for the same event.

#### Common Ticket Type Patterns

**Basic Structure:**
| Ticket Type | Price | Quantity | Best For |
|-------------|-------|----------|----------|
| Early Bird | $25 | 50 | Building early momentum |
| General Admission | $35 | 200 | Standard attendees |
| VIP | $75 | 25 | Premium experience |
| Student/Senior | $20 | 50 | Accessible pricing |

#### Creating Ticket Types

1. Navigate to your event's **"Tickets"** tab
2. Click **"Add Ticket Type"**
3. Fill in the details:

**Ticket Type Fields:**
- **Name**: Descriptive label (e.g., "General Admission")
- **Description**: What's included? (e.g., "Access to all sessions")
- **Price**: Amount in your currency (use 0 for free tickets)
- **Quantity Available**: Maximum tickets of this type
- **Sales Start**: When tickets become available
- **Sales End**: When sales close (can be before event)
- **Min/Max Per Order**: Limit how many one person can buy

#### Advanced Ticket Settings

**Timed Ticket Releases:**
- Set "Sales Start" to create early bird periods
- Automatically transition to regular pricing
- Create urgency with limited-time offers

**Quantity Limits:**
- Set realistic caps based on venue capacity
- Leave buffer for comps and walk-ins
- Consider creating a waitlist option

**Hidden Tickets:**
- Use for sponsor comps, staff tickets, or VIP invites
- Share via direct link or promo code
- Not visible on public event page

### Customizing Your Event Page

Your event page is your sales tool. Make it shine!

#### Visual Customization

**Event Image:**
- Recommended size: 1200x630 pixels (16:9 ratio)
- Format: JPG or PNG
- Max file size: 5MB
- Tips: Use high-quality photos, include text sparingly, show people enjoying similar events

**Organization Branding:**
- Your logo appears in the header
- Brand colors apply to buttons and links
- Consistent branding builds trust

#### Content Sections

**Hero Section:**
- Large event image
- Event title and date
- Primary call-to-action button

**Event Details:**
- Full description
- Date/time with calendar add option
- Venue with map
- Organizer information

**Ticket Selection:**
- Clear pricing display
- Quantity selector
- "Add to Cart" buttons
- Remaining quantity indicator (optional)

**FAQ Section:**
- Common questions
- Refund policy
- Contact information

#### SEO and Sharing

**Social Media Preview:**
- Event image appears when shared
- Title and description are optimized
- Link directs to your event page

**Search Engine Visibility:**
- Events are indexed by search engines
- Use descriptive titles and keywords
- Include location for local search

### Publishing and Sharing

#### Before You Publish

**Preview Your Event:**
1. Click **"Preview"** to see the attendee view
2. Check all details for accuracy
3. Test the ticket purchase flow
4. Review on mobile devices

**Publishing Options:**
- **Public**: Listed on your organization's page, searchable
- **Unlisted**: Only accessible via direct link
- **Private**: Password-protected or invite-only

#### Sharing Your Event

**Direct Link:**
- Copy the event URL from your browser
- Share via email, social media, or messaging

**Embed on Your Website:**
```html
<!-- Event Widget Embed Code -->
<iframe src="https://yourdomain.com/events/your-event/embed" 
        width="100%" 
        height="600" 
        frameborder="0">
</iframe>
```

**Social Media:**
- Share to Facebook, Twitter, LinkedIn
- Use event hashtags
- Tag relevant accounts

**Email Marketing:**
- Send to your mailing list
- Include direct registration link
- Highlight early bird deadlines

---

## 1C. Order Management

### Viewing Orders

The Orders section gives you complete visibility into your ticket sales.

#### Order Dashboard

**Key Metrics at a Glance:**
- Total orders
- Total revenue
- Tickets sold by type
- Conversion rate

**Filtering Orders:**
- By date range
- By ticket type
- By order status (completed, pending, refunded)
- By attendee name or email

#### Order Details

Each order contains:
- Order number and date
- Attendee information
- Ticket types and quantities
- Payment details
- Order status
- Actions (refund, resend email, edit)

### Processing Refunds

Refunds are an important part of customer service. Here's how to handle them professionally.

#### Full Refunds

1. Find the order in your Orders list
2. Click on the order to view details
3. Click **"Process Refund"**
4. Select **"Full Refund"**
5. Add a note (optional but recommended)
6. Confirm the refund

**What Happens:**
- Attendee receives refund confirmation email
- Tickets are invalidated
- Order marked as "Refunded"
- Refund appears in your payment processor

#### Partial Refunds

For situations where you need to refund part of an order:

1. Open the order details
2. Click **"Process Refund"**
3. Select **"Partial Refund"**
4. Enter the refund amount
5. Provide a reason
6. Confirm

**Common Partial Refund Scenarios:**
- Refunding one ticket from a multi-ticket order
- Compensating for a service issue
- Adjusting for a price difference

#### Refund Policies

**Setting Your Policy:**
1. Go to Event Settings
2. Find "Refund Policy" section
3. Choose from templates or write custom

**Policy Templates:**

*No Refunds:*
```
All ticket sales are final. No refunds will be issued.
```

*Full Refunds Before Event:*
```
Full refunds available up to 48 hours before the event. 
No refunds after that time.
```

*Flexible:*
```
Refunds available up to 7 days before the event, minus a $5 processing fee. 
Event credits available up to 24 hours before the event.
```

### Managing Guest Lists

Your guest list is your event day lifeline.

#### Accessing the Guest List

1. Go to your event dashboard
2. Click **"Guest List"** tab
3. View all registered attendees

**Guest List Columns:**
- Name
- Email
- Ticket type
- Order number
- Check-in status
- Notes

#### Exporting Guest Lists

**CSV Export:**
1. Click **"Export"** button
2. Select format (CSV or Excel)
3. Choose fields to include
4. Download the file

**Common Export Uses:**
- Name badges
- Check-in sheets (backup)
- Catering counts
- Follow-up emails
- Reporting

#### Editing Attendee Information

Sometimes attendees need to update their details:

1. Find the order in your list
2. Click to open order details
3. Click **"Edit Attendee"**
4. Update the information
5. Save changes

**What Can Be Edited:**
- Attendee name
- Email address
- Dietary restrictions
- Custom questions

**What Cannot Be Edited:**
- Ticket type (requires refund and repurchase)
- Order date
- Payment amount

### Exporting Data

Data exports help you analyze and report on your events.

#### Available Exports

**Orders Export:**
- Order details
- Payment information
- Attendee data
- Custom field responses

**Financial Export:**
- Revenue by ticket type
- Payment processor fees
- Refunds
- Net revenue

**Attendee Export:**
- Contact information
- Ticket types
- Check-in status
- Custom responses

#### Scheduled Exports

Set up automatic exports:
1. Go to Event Settings
2. Click **"Scheduled Exports"**
3. Choose export type and frequency
4. Add email recipients
5. Save

---

## 1D. Check-in Guide

### Setting Up Check-in

A smooth check-in process creates a great first impression for your event.

#### Check-in Methods

**Option 1: Mobile Scanner App (Recommended)**
- Fastest method
- Real-time sync
- Works offline
- Available for iOS and Android

**Option 2: Manual Check-in**
- Use printed guest list
- Check off attendees as they arrive
- Good backup method

**Option 3: Self Check-in Kiosk**
- Attendees check themselves in
- Reduces staff needs
- Requires tablet or computer

#### Pre-Event Setup

**One Week Before:**
1. Download the GatherTix Scanner app
2. Log in with your organizer account
3. Download your event data (for offline use)
4. Test scanning with a sample ticket

**Day Before:**
1. Charge all devices
2. Print backup guest lists
3. Prepare check-in materials (signage, badges, etc.)
4. Brief your check-in team

### Using the Scanner App

#### Getting Started

**Download:**
- iOS: App Store search "GatherTix Scanner"
- Android: Google Play search "GatherTix Scanner"

**Login:**
1. Open the app
2. Enter your GatherTix URL
3. Log in with your organizer credentials
4. Select your event

#### Scanning Tickets

**Basic Scan:**
1. Point camera at QR code
2. Hold steady until beep
3. Screen shows attendee name and ticket type
4. Tap "Check In" to confirm

**Successful Scan:**
- Green checkmark
- Attendee name displayed
- "Already Checked In" warning if duplicate

**Failed Scan:**
- Red X
- Error message
- Manual lookup option

#### Offline Mode

The scanner app works without internet:

**Downloading Data:**
1. While connected to WiFi, open your event
2. Tap **"Download for Offline"**
3. Wait for download to complete
4. Check "Offline Ready" indicator

**Syncing Later:**
- Check-ins queue locally
- Auto-sync when connection returns
- Manual sync option available

### Manual Check-in

When technology fails, be prepared with manual backup.

#### Printed Guest List

**Creating the List:**
1. Export guest list as PDF
2. Include: Name, Ticket Type, Order #
3. Sort alphabetically by last name
4. Print multiple copies

**Using the List:**
1. Find attendee name alphabetically
2. Verify ticket type matches their claim
3. Check the box or initial
4. Note any issues in margin

#### Manual Lookup in App

If scanning fails but you have connectivity:

1. Tap **"Manual Lookup"**
2. Search by:
   - Name
   - Email
   - Order number
   - Last 4 digits of phone
3. Select correct attendee
4. Tap **"Check In"**

### Troubleshooting Check-in Issues

#### Common Problems and Solutions

**QR Code Won't Scan:**
- Check lighting (avoid glare)
- Clean camera lens
- Try different angles
- Use manual lookup

**Ticket Shows as "Already Used":**
- Verify attendee identity
- Check if they already checked in
- May be duplicate ticket (check order #)
- Contact organizer if suspicious

**App Crashes or Freezes:**
- Force close and reopen
- Check device storage
- Switch to manual list
- Restart device if needed

**No Internet Connection:**
- Use offline mode
- Check-ins will sync later
- Have printed backup ready

**Wrong Event Selected:**
- Double-check event name at top of screen
- Switch events via menu
- Verify ticket matches event date

#### Emergency Procedures

**Complete System Failure:**
1. Switch to printed guest lists
2. Collect tickets for later verification
3. Note any issues for follow-up
4. Document what happened

**Suspicious Tickets:**
1. Don't confront attendee aggressively
2. Verify their identity
3. Check order number against your records
4. Contact event organizer
5. Escort to separate area if needed

---

## 1E. Settings & Configuration

### Organization Settings

Your organization profile appears on all your events.

#### Profile Information

**Required:**
- Organization name
- Contact email
- Country/Region

**Optional:**
- Organization description
- Website URL
- Phone number
- Social media links
- Logo

#### Branding

**Logo:**
- Recommended: 400x400 pixels
- Transparent background preferred
- Visible on all event pages

**Colors:**
- Primary color: Buttons and links
- Secondary color: Accents and highlights
- Use your brand colors for consistency

**Custom Domain (Advanced):**
- Use your own domain (e.g., tickets.yourorg.com)
- Requires DNS configuration
- Contact your technical administrator

### Payment Provider Setup

Connect payment processors to accept online payments.

#### Supported Providers

**Stripe (Recommended):**
- Lower fees
- Better international support
- More payment methods
- Detailed reporting

**PayPal:**
- Familiar to users
- No monthly fees
- Good for small volumes
- PayPal balance option

#### Setting Up Stripe

1. Create a Stripe account at stripe.com
2. Complete verification (business details, bank account)
3. In GatherTix, go to Settings > Payments
4. Click "Connect Stripe"
5. Authorize the connection
6. Test with a small transaction

**Stripe Fees (as of 2024):**
- 2.9% + $0.30 per transaction (US)
- Varies by country
- No monthly fees

#### Setting Up PayPal

1. Create a PayPal Business account
2. Verify your account
3. In GatherTix, go to Settings > Payments
4. Enter your PayPal email
5. Enable PayPal API access
6. Test the connection

**PayPal Fees (as of 2024):**
- 2.9% + $0.30 per transaction (US)
- International fees may apply

#### Payment Settings

**Currency:**
- Set your default currency
- Supports 135+ currencies
- Consider your audience location

**Payment Collection:**
- Immediate: Charge at checkout
- Deferred: Authorize only, charge later

**Tax Settings:**
- Enable tax collection if required
- Set tax rate
- Display tax separately

### Email Customization

Customize the emails sent to your attendees.

#### Email Templates

**Order Confirmation:**
- Sent immediately after purchase
- Includes ticket download link
- Customize subject line and message

**Ticket Reminder:**
- Sent 24 hours before event
- Includes event details and QR code
- Reduces no-shows

**Custom Footer:**
- Add your organization info
- Include social media links
- Add unsubscribe option

#### Email Settings

**Sender Name:**
- How your emails appear in inboxes
- Usually your organization name

**Reply-To Address:**
- Where replies go
- Should be monitored

**Email Logo:**
- Appears at top of emails
- Use same logo as your organization

### Team Management

Add team members to help manage events.

#### User Roles

**Administrator:**
- Full access to all features
- Can manage organization settings
- Can add/remove team members
- Can access financial data

**Event Manager:**
- Can create and edit events
- Can view orders and guest lists
- Can process refunds
- Cannot access organization settings

**Check-in Staff:**
- Can only access check-in features
- Can view guest lists
- Cannot modify events or orders
- Ideal for event day volunteers

#### Adding Team Members

1. Go to Settings > Team
2. Click "Invite Team Member"
3. Enter their email address
4. Select their role
5. Click "Send Invitation"

**What Happens:**
- They receive invitation email
- Click link to create account
- Assigned role applies automatically
- Can access organization immediately

#### Managing Access

**Changing Roles:**
1. Find team member in list
2. Click "Edit"
3. Select new role
4. Save changes

**Removing Access:**
1. Find team member in list
2. Click "Remove"
3. Confirm removal
4. Access revoked immediately

---

# 2. EMAIL TEMPLATES

## Template File Locations

All email templates are located in separate HTML files for easy editing:

- `/output/email-templates/order-confirmation.html`
- `/output/email-templates/ticket-reminder.html`
- `/output/email-templates/receipt-invoice.html`
- `/output/email-templates/refund-confirmation.html`
- `/output/email-templates/order-cancellation.html`
- `/output/email-templates/new-order-alert.html`
- `/output/email-templates/low-inventory-alert.html`
- `/output/email-templates/event-reminder-organizer.html`
- `/output/email-templates/daily-digest.html`
- `/output/email-templates/welcome.html`
- `/output/email-templates/password-reset.html`
- `/output/email-templates/email-verification.html`
- `/output/email-templates/account-invitation.html`

### Personalization Variables

All templates support these variables:

**Organization Variables:**
- `{{organization.name}}` - Organization name
- `{{organization.logo_url}}` - Logo image URL
- `{{organization.website}}` - Organization website
- `{{organization.email}}` - Contact email
- `{{organization.phone}}` - Contact phone

**Event Variables:**
- `{{event.name}}` - Event title
- `{{event.date}}` - Event date
- `{{event.time}}` - Event time
- `{{event.venue}}` - Venue name
- `{{event.address}}` - Full address
- `{{event.url}}` - Event page URL
- `{{event.image_url}}` - Event image URL

**Order Variables:**
- `{{order.number}}` - Order number
- `{{order.date}}` - Order date
- `{{order.total}}` - Total amount
- `{{order.ticket_count}}` - Number of tickets
- `{{order.tickets}}` - Array of tickets
- `{{order.download_url}}` - Ticket download link

**Attendee Variables:**
- `{{attendee.name}}` - Attendee name
- `{{attendee.email}}` - Attendee email
- `{{attendee.ticket_type}}` - Ticket type name
- `{{attendee.qr_code}}` - QR code image URL

**System Variables:**
- `{{year}}` - Current year
- `{{support_url}}` - Support/help URL
- `{{unsubscribe_url}}` - Unsubscribe link

---

## 2A. Transactional Emails

### Order Confirmation Email

**Purpose:** Sent immediately after successful purchase
**Timing:** Instant
**Key Elements:**
- Thank you message
- Order summary
- Ticket download link
- Event details
- Calendar invite

**Subject Line Options:**
- "Your tickets for {{event.name}} are confirmed!"
- "Order Confirmation #{{order.number}} - {{event.name}}"
- "You're going to {{event.name}}!"

**Plain Text Fallback:**
```
Hi {{attendee.name}},

Thank you for your purchase! Your tickets for {{event.name}} are confirmed.

ORDER DETAILS:
Order #: {{order.number}}
Date: {{order.date}}
Total: {{order.total}}

EVENT DETAILS:
{{event.name}}
{{event.date}} at {{event.time}}
{{event.venue}}
{{event.address}}

YOUR TICKETS:
{{#each order.tickets}}
- {{ticket_type}}: {{attendee_name}}
{{/each}}

Download your tickets: {{order.download_url}}

Add to calendar: {{event.calendar_url}}

Questions? Contact us at {{organization.email}}

{{organization.name}}
{{organization.website}}
```

### Ticket Reminder Email (24h Before)

**Purpose:** Reduce no-shows and provide last-minute details
**Timing:** 24 hours before event
**Key Elements:**
- Reminder message
- Event details
- QR code for quick access
- What to bring
- Parking/transit info

**Subject Line Options:**
- "Tomorrow: {{event.name}}"
- "Reminder: {{event.name}} is tomorrow!"
- "See you tomorrow at {{event.name}}"

**Plain Text Fallback:**
```
Hi {{attendee.name}},

This is a friendly reminder that {{event.name}} is tomorrow!

EVENT DETAILS:
{{event.name}}
{{event.date}} at {{event.time}}
{{event.venue}}
{{event.address}}

GETTING THERE:
{{event.directions}}

YOUR TICKET:
{{attendee.ticket_type}} - {{attendee.name}}

Show this QR code at check-in:
{{attendee.qr_code}}

WHAT TO BRING:
- Your ticket (printed or on phone)
- Photo ID (if required)
{{event.what_to_bring}}

Questions? Contact us at {{organization.email}}

We look forward to seeing you!

{{organization.name}}
```

### Receipt/Invoice Email

**Purpose:** Provide payment documentation
**Timing:** Sent with order confirmation and available for download
**Key Elements:**
- Receipt header
- Itemized charges
- Payment method
- Tax information
- Download/print options

**Subject Line:**
- "Receipt for Order #{{order.number}}"
- "Your receipt from {{organization.name}}"

**Plain Text Fallback:**
```
RECEIPT

{{organization.name}}
{{organization.address}}
{{organization.email}}

Order #: {{order.number}}
Date: {{order.date}}

BILL TO:
{{attendee.name}}
{{attendee.email}}

ITEMS:
{{#each order.tickets}}
{{ticket_type}} x {{quantity}} - {{price_each}} = {{subtotal}}
{{/each}}

Subtotal: {{order.subtotal}}
Tax ({{order.tax_rate}}): {{order.tax_amount}}
Total: {{order.total}}

Payment Method: {{order.payment_method}}
Transaction ID: {{order.transaction_id}}

Thank you for your business!

This receipt was generated electronically and is valid without signature.
```

### Refund Confirmation Email

**Purpose:** Confirm refund processing to attendee
**Timing:** Immediately after refund is processed
**Key Elements:**
- Refund confirmation
- Refund amount
- Timeline for receiving refund
- Order details
- Contact information

**Subject Line Options:**
- "Refund processed for Order #{{order.number}}"
- "Your refund confirmation"
- "Refund: {{event.name}}"

**Plain Text Fallback:**
```
Hi {{attendee.name}},

Your refund has been processed.

REFUND DETAILS:
Order #: {{order.number}}
Refund Amount: {{refund.amount}}
Refund Date: {{refund.date}}
Reason: {{refund.reason}}

ORIGINAL ORDER:
{{event.name}}
{{order.date}}
Original Total: {{order.total}}

REFUND TIMELINE:
Your refund will appear in your account within 5-10 business days, depending on your payment method and financial institution.

If you have any questions about this refund, please contact us at {{organization.email}}.

{{organization.name}}
```

### Order Cancellation Email

**Purpose:** Notify attendee of order cancellation
**Timing:** When organizer cancels the order
**Key Elements:**
- Cancellation notice
- Reason (if provided)
- Refund information
- Apology/explanation
- Contact details

**Subject Line Options:**
- "Order #{{order.number}} has been cancelled"
- "Cancellation notice: {{event.name}}"
- "Important: Your order has been cancelled"

**Plain Text Fallback:**
```
Hi {{attendee.name}},

We're writing to inform you that your order has been cancelled.

ORDER DETAILS:
Order #: {{order.number}}
Event: {{event.name}}
Original Total: {{order.total}}

{{#if cancellation.reason}}
REASON:
{{cancellation.reason}}
{{/if}}

{{#if refund.processed}}
REFUND INFORMATION:
A full refund of {{order.total}} has been processed and will appear in your account within 5-10 business days.
{{/if}}

We apologize for any inconvenience this may cause. If you have questions or concerns, please contact us at {{organization.email}}.

{{organization.name}}
```

---

## 2B. Notification Emails

### New Order Alert (To Organizer)

**Purpose:** Notify organizers of new sales in real-time
**Timing:** Instant
**Key Elements:**
- Order summary
- Attendee info
- Revenue impact
- Quick action links

**Subject Line Options:**
- "New order: {{order.total}} - {{event.name}}"
- "Ticket sale: {{attendee.name}} - {{event.name}}"
- "+{{order.ticket_count}} tickets sold for {{event.name}}"

**Plain Text Fallback:**
```
New Order Received!

EVENT: {{event.name}}
ORDER #: {{order.number}}
DATE: {{order.date}}

ATTENDEE:
{{attendee.name}}
{{attendee.email}}

ORDER SUMMARY:
{{#each order.tickets}}
- {{ticket_type}} x {{quantity}} = {{subtotal}}
{{/each}}

Total: {{order.total}}

View Order: {{order.admin_url}}
View Guest List: {{event.guest_list_url}}

{{organization.name}} Ticketing
```

### Low Ticket Inventory Alert

**Purpose:** Warn organizers when tickets are running low
**Timing:** When inventory drops below threshold
**Key Elements:**
- Inventory status
- Tickets remaining
- Recommendation
- Quick action to add inventory

**Subject Line Options:**
- "Low inventory alert: {{ticket_type.name}}"
- "Only {{ticket_type.remaining}} {{ticket_type.name}} tickets left!"
- "Running low on {{ticket_type.name}} tickets"

**Plain Text Fallback:**
```
Low Inventory Alert

EVENT: {{event.name}}
TICKET TYPE: {{ticket_type.name}}

INVENTORY STATUS:
Total Available: {{ticket_type.total}}
Sold: {{ticket_type.sold}}
Remaining: {{ticket_type.remaining}}

You're running low on {{ticket_type.name}} tickets for {{event.name}}. Consider increasing the available quantity if you have capacity.

Increase Inventory: {{ticket_type.edit_url}}
View Event: {{event.admin_url}}

{{organization.name}} Ticketing
```

### Event Reminder (To Organizer)

**Purpose:** Help organizers prepare for upcoming events
**Timing:** 48 hours before event
**Key Elements:**
- Event summary
- Tickets sold
- Revenue
- Checklist reminders
- Quick links

**Subject Line Options:**
- "{{event.name}} is in 2 days - Here's your summary"
- "Event reminder: {{event.name}}"
- "Prepare for {{event.name}} ({{event.date}})"

**Plain Text Fallback:**
```
Event Reminder

{{event.name}} is happening in 2 days!

EVENT SUMMARY:
Date: {{event.date}}
Time: {{event.time}}
Venue: {{event.venue}}

TICKET SALES:
Total Sold: {{event.tickets_sold}}
Revenue: {{event.revenue}}
Capacity: {{event.capacity_used}}% full

PRE-EVENT CHECKLIST:
[ ] Test check-in app
[ ] Print backup guest list
[ ] Charge check-in devices
[ ] Brief check-in team
[ ] Prepare signage

View Guest List: {{event.guest_list_url}}
View Orders: {{event.orders_url}}
Edit Event: {{event.edit_url}}

{{organization.name}} Ticketing
```

### Daily Digest

**Purpose:** Summary of daily activity across all events
**Timing:** Daily at configured time
**Key Elements:**
- Sales summary
- New orders
- Refunds
- Upcoming events
- Trends

**Subject Line Options:**
- "Daily Digest - {{date}}"
- "Your ticketing summary for {{date}}"
- "{{organization.name}} Daily Report: {{date}}"

**Plain Text Fallback:**
```
Daily Digest - {{date}}

SALES SUMMARY:
Orders: {{summary.orders_count}}
Tickets Sold: {{summary.tickets_sold}}
Revenue: {{summary.revenue}}
Refunds: {{summary.refunds_count}}

{{#if new_orders.length}}
NEW ORDERS:
{{#each new_orders}}
- {{event.name}}: {{attendee.name}} - {{total}}
{{/each}}
{{/if}}

UPCOMING EVENTS (Next 7 Days):
{{#each upcoming_events}}
- {{name}} ({{date}}): {{tickets_sold}} sold
{{/each}}

View Dashboard: {{dashboard_url}}

{{organization.name}} Ticketing
```

---

## 2C. Account Emails

### Welcome Email

**Purpose:** Welcome new users and guide them to first steps
**Timing:** Immediately after account creation
**Key Elements:**
- Welcome message
- Account details
- Quick start guide
- Support resources

**Subject Line Options:**
- "Welcome to {{organization.name}}!"
- "Your {{organization.name}} account is ready"
- "Let's get started with {{organization.name}}"

**Plain Text Fallback:**
```
Welcome to {{organization.name}}!

Hi {{user.name}},

Your account has been created and you're ready to start managing events.

YOUR ACCOUNT:
Email: {{user.email}}
Organization: {{organization.name}}
Role: {{user.role}}

GETTING STARTED:
1. Complete your profile
2. Explore your dashboard
3. Create your first event
4. Set up payment processing

QUICK LINKS:
Dashboard: {{dashboard_url}}
Create Event: {{create_event_url}}
Settings: {{settings_url}}
Help Center: {{help_url}}

Need help? Contact us at {{organization.email}}

Welcome aboard!

{{organization.name}} Team
```

### Password Reset Email

**Purpose:** Securely reset forgotten passwords
**Timing:** When user requests reset
**Key Elements:**
- Reset link
- Expiration warning
- Security note
- Support contact

**Subject Line Options:**
- "Password reset request"
- "Reset your {{organization.name}} password"
- "Password reset instructions"

**Plain Text Fallback:**
```
Password Reset Request

Hi {{user.name}},

We received a request to reset your password for your {{organization.name}} account.

RESET YOUR PASSWORD:
Click this link to reset your password:
{{reset_url}}

This link will expire in 24 hours for security reasons.

DIDN'T REQUEST THIS?
If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.

Need help? Contact us at {{organization.email}}

{{organization.name}} Team
```

### Email Verification Email

**Purpose:** Verify user's email address
**Timing:** After registration or email change
**Key Elements:**
- Verification link
- Why verification matters
- Expiration notice
- Resend option

**Subject Line Options:**
- "Please verify your email address"
- "Verify your email for {{organization.name}}"
- "One more step: Verify your email"

**Plain Text Fallback:**
```
Verify Your Email Address

Hi {{user.name}},

Thanks for signing up! Please verify your email address to complete your registration.

VERIFY EMAIL:
Click this link to verify:
{{verification_url}}

This link will expire in 48 hours.

WHY VERIFY?
Verifying your email helps us:
- Keep your account secure
- Send important event notifications
- Recover your account if needed

NEED A NEW LINK?
If the link expired, you can request a new one:
{{resend_url}}

{{organization.name}} Team
```

### Account Invitation Email

**Purpose:** Invite new team members to join organization
**Timing:** When administrator sends invitation
**Key Elements:**
- Invitation message
- Organization info
- Role description
- Accept link

**Subject Line Options:**
- "You've been invited to join {{organization.name}}"
- "Invitation: Join {{organization.name}} on GatherTix"
- "{{inviter.name}} invited you to {{organization.name}}"

**Plain Text Fallback:**
```
You've Been Invited!

Hi {{user.name}},

{{inviter.name}} has invited you to join {{organization.name}} as a {{user.role}}.

ABOUT {{organization.name}}:
{{organization.description}}

YOUR ROLE: {{user.role}}
{{role.description}}

ACCEPT INVITATION:
Click this link to accept and create your account:
{{invitation_url}}

This invitation expires in 7 days.

QUESTIONS?
Contact {{inviter.name}} at {{inviter.email}}

{{organization.name}}
```

---

# 3. LANDING PAGE TEMPLATES

## Template File Locations

Landing page templates are available as separate HTML files:

- `/output/landing-pages/event-hero.html`
- `/output/landing-pages/event-details.html`
- `/output/landing-pages/ticket-selection.html`
- `/output/landing-pages/speaker-section.html`
- `/output/landing-pages/schedule-section.html`
- `/output/landing-pages/faq-section.html`
- `/output/landing-pages/organizer-section.html`
- `/output/landing-pages/organization-homepage.html`
- `/output/landing-pages/checkout-ticket-selection.html`
- `/output/landing-pages/checkout-attendee-info.html`
- `/output/landing-pages/checkout-payment.html`
- `/output/landing-pages/checkout-success.html`

## 3A. Event Landing Page Sections

### Hero Section

**Purpose:** First impression, key event info, primary CTA
**Elements:**
- Event title (H1)
- Date and time
- Venue
- Primary CTA button
- Background image or color
- Countdown timer (optional)

**Best Practices:**
- Keep title concise and clear
- Use high-quality background image
- Make CTA button prominent
- Include essential info above the fold
- Mobile: Stack vertically, reduce image height

### Event Details Section

**Purpose:** Provide comprehensive event information
**Elements:**
- Full description
- Date/time with timezone
- Venue with map
- Directions/parking
- Accessibility info
- What to bring

**Best Practices:**
- Use headings for scannability
- Include practical details
- Add venue map
- Provide transit options
- Address common concerns

### Ticket Selection Section

**Purpose:** Clear pricing and purchase options
**Elements:**
- Ticket type cards
- Price display
- Quantity selector
- "Add to Cart" buttons
- Availability indicator
- What's included per ticket

**Best Practices:**
- Show most popular option first
- Highlight savings for early bird
- Display remaining quantity if low
- Make CTA buttons stand out
- Show total dynamically

### Speaker/Performer Section

**Purpose:** Showcase talent and build excitement
**Elements:**
- Speaker/performer cards
- Photos
- Names and titles
- Bios
- Social links

**Best Practices:**
- Use professional photos
- Keep bios concise (2-3 sentences)
- Link to more info
- Grid layout for multiple speakers
- Consider carousel for many speakers

### Schedule/Agenda Section

**Purpose:** Show event timeline
**Elements:**
- Time slots
- Session titles
- Descriptions
- Speakers
- Locations (if multi-track)

**Best Practices:**
- Use clear time formatting
- Group by day for multi-day events
- Allow expand/collapse for details
- Highlight breaks and meals
- Include buffer time

### FAQ Accordion Section

**Purpose:** Answer common questions, reduce support burden
**Elements:**
- Question headers
- Expandable answers
- Categories (optional)
- Contact CTA for unanswered questions

**Best Practices:**
- Use real questions from past events
- Keep answers concise
- Organize by category
- Update based on feedback
- Include refund policy

**Recommended FAQ Questions:**
1. What's the refund policy?
2. Can I transfer my ticket?
3. Is there parking available?
4. What's the dress code?
5. Will food be provided?
6. Is the venue accessible?
7. Can I bring a guest?
8. What if I'm running late?
9. Will photos be taken?
10. How do I contact the organizer?

### Organizer Info Section

**Purpose:** Build trust and provide contact
**Elements:**
- Organization logo
- Name and description
- Contact info
- Social links
- Past events

**Best Practices:**
- Keep description brief
- Include contact email
- Link to organization page
- Show social proof (past events)
- Include photo if appropriate

### Footer Section

**Purpose:** Secondary navigation and legal
**Elements:**
- Organization info
- Quick links
- Social icons
- Legal links (privacy, terms)
- Copyright

**Best Practices:**
- Keep minimal
- Include essential links only
- Make social icons accessible
- Add newsletter signup (optional)
- Ensure mobile-friendly

## 3B. Organization Homepage

### Upcoming Events Grid

**Purpose:** Showcase current events
**Elements:**
- Event cards
- Images
- Titles and dates
- Prices
- "Get Tickets" buttons
- Filter/sort options

**Best Practices:**
- Show 3-6 events prominently
- Use consistent card sizes
- Include date prominently
- Show price or "Free"
- Update automatically

### Past Events Archive

**Purpose:** Show history and build credibility
**Elements:**
- Event list or grid
- Date
- Attendance numbers (optional)
- Photos
- "View Details" links

**Best Practices:**
- Sort by date (newest first)
- Include photos if available
- Show attendee counts as social proof
- Link to photo galleries
- Consider pagination

### About Organization Section

**Purpose:** Tell your story
**Elements:**
- Mission statement
- History
- Team photos
- Achievements
- Contact info

**Best Practices:**
- Keep mission concise
- Use photos of people
- Include relevant stats
- Make contact easy
- Link to full about page

### Contact Section

**Purpose:** Enable inquiries
**Elements:**
- Contact form
- Email address
- Phone (optional)
- Social links
- Response time expectation

**Best Practices:**
- Keep form short
- Show expected response time
- Include alternative contact methods
- Add FAQ link
- Confirm submissions

## 3C. Checkout Pages

### Ticket Selection

**Purpose:** Select tickets and quantities
**Elements:**
- Ticket type list
- Price per ticket
- Quantity selector
- Subtotal display
- "Continue" button
- Event summary

**Best Practices:**
- Show all ticket types
- Limit quantity per order if needed
- Calculate totals in real-time
- Show fees transparently
- Allow easy editing

### Attendee Information

**Purpose:** Collect attendee details
**Elements:**
- Name fields
- Email
- Phone (optional)
- Custom questions
- Ticket assignment
- Progress indicator

**Best Practices:**
- Only ask necessary questions
- Explain why info is needed
- Validate email format
- Allow same info for all tickets
- Show progress

### Payment

**Purpose:** Secure payment collection
**Elements:**
- Order summary
- Payment form
- Security indicators
- Accepted payment methods
- Billing address
- "Pay Now" button

**Best Practices:**
- Show total clearly
- Use trusted payment processors
- Display security badges
- Don't ask for unnecessary info
- Handle errors gracefully

### Success/Confirmation

**Purpose:** Confirm order and provide next steps
**Elements:**
- Thank you message
- Order confirmation
- Ticket download
- Calendar add
- Share options
- What to expect next

**Best Practices:**
- Make confirmation clear
- Provide ticket download immediately
- Show order number
- Set expectations for email
- Include share buttons
- Suggest next actions

---

# 4. TICKET TEMPLATES

## Template File Locations

Ticket templates are available as separate files:

- `/output/ticket-templates/standard-ticket.html`
- `/output/ticket-templates/vip-ticket.html`
- `/output/ticket-templates/multi-ticket.html`
- `/output/ticket-templates/badge-format.html`

## 4A. Standard Ticket

**Format:** PDF, optimized for mobile and print
**Size:** 3.5" x 8.5" (ticket size) or A4/Letter (full page)
**Elements:**
- Event name and branding
- Date and time
- Venue and address
- Attendee name
- Ticket type
- QR code (scannable)
- Order number
- Terms and conditions

**Design Principles:**
- Clear hierarchy
- High contrast for readability
- QR code minimum 2x2cm
- Include cut lines for printed tickets
- Mobile-optimized layout

## 4B. VIP Ticket Variant

**Format:** PDF, premium design
**Size:** 3.5" x 8.5" or custom
**Elements:**
- Premium branding
- Gold/accent color scheme
- VIP perks list
- Special check-in instructions
- Complimentary items
- Priority seating info

**Design Principles:**
- Distinct from standard tickets
- Convey premium value
- Include all VIP benefits
- Special visual treatment
- May include lanyard hole marks

## 4C. Multi-Ticket (Group Orders)

**Format:** PDF, multiple tickets per page
**Size:** A4 or Letter
**Elements:**
- Multiple individual tickets
- Group header
- Order summary
- Individual QR codes
- Tear-off design

**Design Principles:**
- Clear separation between tickets
- Each ticket individually scannable
- Group info on header
- Easy to distribute
- Cut/tear guidelines

## 4D. Badge/Pass Format

**Format:** PDF, designed for printing on badge stock
**Size:** 4" x 3" (standard badge) or custom
**Elements:**
- Large attendee name
- Organization logo
- Event name
- Attendee type (speaker, staff, etc.)
- QR code (smaller)
- Lanyard hole marks

**Design Principles:**
- Name is largest element
- Readable from distance
- Professional appearance
- Hole punch guides
- May include schedule on back

---

# 5. ADMIN INTERFACE COPY

## 5A. Button Labels

### Primary Actions
| Button | Usage |
|--------|-------|
| Create Event | Dashboard, events list |
| Save | Forms, settings |
| Save & Continue | Multi-step forms |
| Publish | Event creation |
| Update Event | Editing published event |
| Add Ticket Type | Event tickets section |
| Process Order | Order details |
| Process Refund | Order actions |
| Send Invitation | Team management |
| Connect Stripe | Payment settings |
| Download Tickets | Order confirmation |
| Check In | Scanner app, guest list |
| Export Data | Guest list, orders |
| Preview | Event preview |
| Duplicate | Clone event |
| Delete | Remove items |
| Cancel | Abort action |

### Secondary Actions
| Button | Usage |
|--------|-------|
| Edit | Modify existing item |
| View | See details |
| Copy Link | Share event URL |
| Resend Email | Order actions |
| Print | Generate printable version |
| Filter | Apply filters |
| Clear Filters | Reset filters |
| Search | Execute search |
| Load More | Pagination |
| Back | Return to previous |
| Close | Dismiss modal |
| Learn More | Help links |

## 5B. Form Labels and Placeholders

### Event Creation
```
Event Name * [Enter your event name]
Start Date * [MM/DD/YYYY]
Start Time * [--:-- --]
End Date * [MM/DD/YYYY]
End Time * [--:-- --]
Timezone * [Select timezone]
Venue Name * [Venue or location name]
Address * [Street address]
City * [City]
State/Province [State or province]
ZIP/Postal Code [ZIP or postal code]
Country * [Select country]
Event Description [Describe your event...]
Refund Policy [Select or enter refund policy]
Contact Email [questions@example.com]
Event Image [Upload an image or drag and drop]
```

### Ticket Types
```
Ticket Name * [e.g., General Admission]
Description [What's included with this ticket?]
Price * [0.00]
Quantity Available * [Number of tickets]
Sales Start Date [When ticket sales begin]
Sales End Date [When ticket sales end]
Minimum per Order [1]
Maximum per Order [10]
```

### Organization Settings
```
Organization Name * [Your organization name]
Description [Tell people about your organization...]
Website [https://example.com]
Contact Email * [contact@example.com]
Phone Number [(555) 123-4567]
Address [Organization address]
Facebook URL [https://facebook.com/...]
Twitter URL [https://twitter.com/...]
Instagram URL [https://instagram.com/...]
```

### User Profile
```
First Name * [Your first name]
Last Name * [Your last name]
Email Address * [your@email.com]
Phone Number [(555) 123-4567]
Current Password [Enter current password]
New Password [Enter new password]
Confirm New Password [Confirm new password]
```

## 5C. Error Messages

### Form Validation Errors
```
Please enter an event name.
Please enter a valid date.
Please enter a valid time.
Please enter a valid email address.
Please enter a valid URL.
Price must be a positive number.
Quantity must be at least 1.
End date must be after start date.
Sales end date must be before event date.
Password must be at least 8 characters.
Passwords do not match.
This field is required.
```

### System Errors
```
Something went wrong. Please try again.
Unable to connect to payment processor. Please try again later.
Email could not be sent. Please check your email settings.
File upload failed. Please try a smaller file or different format.
Session expired. Please sign in again.
You don't have permission to perform this action.
This event has been deleted.
This order has already been refunded.
```

### Payment Errors
```
Payment was declined. Please check your payment details and try again.
Your card has expired. Please use a different payment method.
Insufficient funds. Please use a different payment method.
Payment processor unavailable. Please try again in a few minutes.
Billing address does not match card. Please verify your address.
```

### User-Friendly Error Messages
```
We couldn't save your changes. Please check the highlighted fields and try again.
Oops! Something went wrong on our end. We've been notified and are working on it.
We couldn't send that email. Please check the email address and try again.
That file is too large. Please upload a file smaller than 5MB.
You've been signed out for security. Please sign in again to continue.
You need additional permissions to do that. Contact your administrator.
That event is no longer available. It may have been deleted or unpublished.
This order has already been processed for a refund.
```

## 5D. Success Messages

### Event Actions
```
Event created successfully!
Event updated successfully!
Event published successfully!
Event unpublished successfully!
Event duplicated successfully!
Event deleted successfully!
```

### Ticket Actions
```
Ticket type added successfully!
Ticket type updated successfully!
Ticket type deleted successfully!
```

### Order Actions
```
Order processed successfully!
Refund processed successfully!
Email resent successfully!
Attendee information updated successfully!
```

### Settings Actions
```
Settings saved successfully!
Payment processor connected successfully!
Team member invited successfully!
Password changed successfully!
Profile updated successfully!
```

### Check-in Actions
```
Check-in successful!
Attendee already checked in.
Check-in reversed successfully!
```

## 5E. Empty States

### Dashboard
```
Welcome to GatherTix!

You don't have any events yet. Create your first event to start selling tickets.

[Create Event]
```

### Events List
```
No events found

You haven't created any events yet. Click the button below to get started.

[Create Event]
```

### Orders
```
No orders yet

Orders will appear here once attendees start purchasing tickets.
```

### Guest List
```
No attendees yet

Your guest list will populate as people purchase tickets.
```

### Team Members
```
No team members

You're the only one with access. Invite team members to help manage events.

[Invite Team Member]
```

### Search Results
```
No results found

We couldn't find anything matching your search. Try different keywords or filters.
```

## 5F. Tooltip/Help Text

### Event Settings
```
Event Name: This is how your event will appear to attendees. Keep it clear and descriptive.

Timezone: Select the timezone where your event takes place. This ensures attendees see the correct time.

Refund Policy: Set clear expectations for attendees. You can choose from templates or write your own.

Event Image: Recommended size is 1200x630 pixels. This image will appear when your event is shared on social media.
```

### Ticket Settings
```
Price: Set to 0 for free tickets. All prices are in your organization's default currency.

Quantity Available: The maximum number of tickets of this type you want to sell.

Sales Start: When tickets become available for purchase. Leave blank to start immediately.

Sales End: When ticket sales close. Can be before the event date.

Minimum per Order: The fewest tickets someone can buy in one order.

Maximum per Order: The most tickets someone can buy in one order. Helps prevent scalping.
```

### Payment Settings
```
Stripe: Connect your Stripe account to accept credit card payments. Funds go directly to your account.

PayPal: Connect your PayPal Business account. Attendees can pay with PayPal balance or cards.

Currency: All ticket prices will be in this currency. Choose based on your primary audience.
```

### Team Management
```
Administrator: Full access to all features and settings. Can add/remove team members.

Event Manager: Can create and manage events, view orders, and process refunds.

Check-in Staff: Can only access check-in features and guest lists. Ideal for event day volunteers.
```

## 5G. Confirmation Dialogs

### Delete Actions
```
Delete Event?

Are you sure you want to delete "[Event Name]"? This action cannot be undone. All associated data, including orders and attendee information, will be permanently deleted.

[Cancel] [Delete Event]
```

### Refund Actions
```
Process Refund?

You are about to refund [Amount] to [Attendee Name]. This action cannot be undone.

Refund reason (optional): [__________]

[Cancel] [Process Refund]
```

### Publish Actions
```
Publish Event?

Your event will be live and visible to the public. Make sure all details are correct before publishing.

[Continue Editing] [Publish Event]
```

### Remove Team Member
```
Remove Team Member?

Are you sure you want to remove [Name] from your organization? They will lose all access immediately.

[Cancel] [Remove]
```

### Cancel Order
```
Cancel Order?

You are about to cancel order #[Number]. The attendee will be notified and any payment will be refunded.

Cancellation reason: [__________]

[Cancel] [Confirm Cancellation]
```

---

# 6. DEVELOPER DOCUMENTATION

## 6A. Installation Guide

### System Requirements

**Minimum Requirements:**
- CPU: 2 cores
- RAM: 2GB
- Storage: 20GB
- OS: Linux (Ubuntu 20.04+ recommended)

**Recommended for Production:**
- CPU: 4+ cores
- RAM: 4GB+
- Storage: 50GB+ SSD
- OS: Linux (Ubuntu 22.04 LTS)

**Software Dependencies:**
- Node.js 18+ (LTS recommended)
- PostgreSQL 13+ or MySQL 8+
- Redis 6+ (for caching and queues)
- Nginx (recommended for production)

### Docker Setup

**Quick Start with Docker Compose:**

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    image: opentickets/opentickets:latest
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/opentickets
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=your-secret-key
      - ENCRYPTION_KEY=your-encryption-key
    depends_on:
      - db
      - redis
    volumes:
      - ./uploads:/app/uploads

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=opentickets
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

**Run:**
```bash
docker-compose up -d
```

### Environment Configuration

**Required Environment Variables:**

```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/opentickets

# Redis (for caching and queues)
REDIS_URL=redis://localhost:6379

# Security
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
ENCRYPTION_KEY=your-encryption-key-for-sensitive-data

# Application
APP_URL=https://tickets.yourdomain.com
PORT=3000
NODE_ENV=production

# Email (SMTP)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=Your Organization

# File Storage
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880  # 5MB

# Payment Processors (optional)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
```

**Optional Environment Variables:**

```bash
# Session
SESSION_SECRET=another-secret-for-sessions
SESSION_MAX_AGE=86400000  # 24 hours

# Rate Limiting
RATE_LIMIT_WINDOW=900000  # 15 minutes
RATE_LIMIT_MAX=100

# Feature Flags
ENABLE_REGISTRATION=true
ENABLE_WAITLIST=true
ENABLE_DISCOUNTS=true
```

### Database Setup

**PostgreSQL Setup:**

```bash
# Create database
sudo -u postgres psql -c "CREATE DATABASE opentickets;"
sudo -u postgres psql -c "CREATE USER otuser WITH PASSWORD 'yourpassword';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE opentickets TO otuser;"

# Run migrations
npm run db:migrate

# Seed initial data (optional)
npm run db:seed
```

**Database Schema Overview:**

```
organizations
├── id (PK)
├── name
├── slug
├── settings (JSON)
├── created_at
└── updated_at

events
├── id (PK)
├── organization_id (FK)
├── name
├── description
├── start_date
├── end_date
├── venue
├── address
├── status
├── settings (JSON)
├── created_at
└── updated_at

ticket_types
├── id (PK)
├── event_id (FK)
├── name
├── description
├── price
├── quantity_total
├── quantity_sold
├── sales_start
├── sales_end
├── created_at
└── updated_at

orders
├── id (PK)
├── event_id (FK)
├── organization_id (FK)
├── order_number
├── status
├── total_amount
├── currency
├── customer_email
├── customer_name
├── payment_intent_id
├── created_at
└── updated_at

tickets
├── id (PK)
├── order_id (FK)
├── ticket_type_id (FK)
├── attendee_name
├── attendee_email
├── qr_code
├── status
├── checked_in_at
├── created_at
└── updated_at

users
├── id (PK)
├── organization_id (FK)
├── email
├── password_hash
├── role
├── status
├── created_at
└── updated_at
```

### First Run

**Initial Setup:**

```bash
# 1. Clone repository
git clone https://github.com/opentickets/opentickets.git
cd opentickets

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env

# 4. Edit .env with your settings
nano .env

# 5. Run database migrations
npm run db:migrate

# 6. Build application
npm run build

# 7. Start application
npm start

# 8. Create first organization
# Visit http://localhost:3000/setup
```

**Setup Wizard:**

On first run, visit `/setup` to:
1. Create admin account
2. Create organization
3. Configure basic settings
4. Connect payment processor

---

## 6B. API Documentation

### Authentication

**API Key Authentication:**

```http
GET /api/v1/events
Authorization: Bearer YOUR_API_KEY
```

**OAuth 2.0 (for third-party apps):**

```http
# 1. Request authorization
GET /oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&response_type=code&scope=read_events

# 2. Exchange code for token
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&code=AUTH_CODE&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&redirect_uri=REDIRECT_URI

# 3. Use access token
GET /api/v1/events
Authorization: Bearer ACCESS_TOKEN
```

**JWT Token (for user authentication):**

```http
# Login
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}

# Response
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}

# Use token
GET /api/v1/events
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Endpoint Reference

#### Events

```http
# List events
GET /api/v1/events
Query Parameters:
  - organization_id (optional)
  - status (optional: draft, published, archived)
  - page (default: 1)
  - limit (default: 20, max: 100)

# Get event details
GET /api/v1/events/:id

# Create event
POST /api/v1/events
Content-Type: application/json

{
  "name": "Community Fundraiser",
  "description": "Annual fundraising gala",
  "start_date": "2024-06-15T18:00:00Z",
  "end_date": "2024-06-15T22:00:00Z",
  "timezone": "America/New_York",
  "venue": "Community Center",
  "address": "123 Main St",
  "city": "Anytown",
  "state": "NY",
  "zip": "12345",
  "country": "US"
}

# Update event
PATCH /api/v1/events/:id
Content-Type: application/json

{
  "name": "Updated Event Name"
}

# Delete event
DELETE /api/v1/events/:id

# Get event statistics
GET /api/v1/events/:id/stats
```

#### Ticket Types

```http
# List ticket types for event
GET /api/v1/events/:event_id/ticket-types

# Create ticket type
POST /api/v1/events/:event_id/ticket-types
Content-Type: application/json

{
  "name": "General Admission",
  "description": "Standard entry",
  "price": 2500,  // in cents
  "quantity_total": 100,
  "sales_start": "2024-01-01T00:00:00Z",
  "sales_end": "2024-06-14T23:59:59Z"
}

# Update ticket type
PATCH /api/v1/ticket-types/:id

# Delete ticket type
DELETE /api/v1/ticket-types/:id
```

#### Orders

```http
# List orders
GET /api/v1/orders
Query Parameters:
  - event_id (optional)
  - status (optional)
  - page
  - limit

# Get order details
GET /api/v1/orders/:id

# Create order
POST /api/v1/orders
Content-Type: application/json

{
  "event_id": "evt_123",
  "customer_email": "attendee@example.com",
  "customer_name": "John Doe",
  "tickets": [
    {
      "ticket_type_id": "tt_456",
      "attendee_name": "John Doe",
      "attendee_email": "attendee@example.com"
    }
  ],
  "payment_method": "stripe"
}

# Process refund
POST /api/v1/orders/:id/refund
Content-Type: application/json

{
  "amount": 2500,  // partial refund amount in cents, omit for full
  "reason": "Customer request"
}

# Resend confirmation email
POST /api/v1/orders/:id/resend-email
```

#### Check-in

```http
# Check in ticket
POST /api/v1/tickets/:id/check-in
Content-Type: application/json

{
  "checked_in_by": "user_789",
  "notes": "VIP entrance"
}

# Reverse check-in
DELETE /api/v1/tickets/:id/check-in

# Validate ticket (for scanner app)
GET /api/v1/tickets/validate?qr_code=ABC123

# Batch check-in
POST /api/v1/checkin/batch
Content-Type: application/json

{
  "ticket_ids": ["tkt_1", "tkt_2", "tkt_3"]
}
```

#### Organizations

```http
# Get organization
GET /api/v1/organizations/:id

# Update organization
PATCH /api/v1/organizations/:id
Content-Type: application/json

{
  "name": "New Organization Name",
  "settings": {
    "primary_color": "#FF5733",
    "timezone": "America/New_York"
  }
}

# List organization events
GET /api/v1/organizations/:id/events

# Get organization statistics
GET /api/v1/organizations/:id/stats
```

#### Users

```http
# List users (admin only)
GET /api/v1/users

# Get current user
GET /api/v1/users/me

# Update user
PATCH /api/v1/users/:id

# Invite user
POST /api/v1/users/invite
Content-Type: application/json

{
  "email": "newuser@example.com",
  "role": "event_manager"
}
```

### Webhook Handling

**Webhook Events:**

```javascript
// Webhook payload structure
{
  "id": "wh_123456",
  "event": "order.completed",
  "created_at": "2024-01-15T10:30:00Z",
  "data": {
    "order": { ... },
    "event": { ... },
    "organization": { ... }
  }
}
```

**Available Events:**
- `order.created` - New order initiated
- `order.completed` - Order successfully paid
- `order.cancelled` - Order cancelled
- `order.refunded` - Order refunded
- `ticket.checked_in` - Ticket checked in
- `ticket.check_in_reversed` - Check-in reversed
- `event.published` - Event published
- `event.unpublished` - Event unpublished
- `event.started` - Event start time reached
- `event.ended` - Event end time reached

**Webhook Verification:**

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}
```

**Setting Up Webhooks:**

```http
POST /api/v1/webhooks
Content-Type: application/json

{
  "url": "https://your-app.com/webhooks/opentickets",
  "events": ["order.completed", "ticket.checked_in"],
  "secret": "your-webhook-secret"
}
```

### Error Codes

**HTTP Status Codes:**

| Code | Meaning | Common Causes |
|------|---------|---------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource conflict (e.g., duplicate) |
| 422 | Unprocessable | Validation errors |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Internal server error |

**Error Response Format:**

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request failed validation",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

**Error Codes:**

```
AUTH_INVALID_CREDENTIALS - Invalid email or password
AUTH_TOKEN_EXPIRED - Authentication token has expired
AUTH_INSUFFICIENT_PERMISSIONS - User lacks required permissions

EVENT_NOT_FOUND - Event does not exist
EVENT_ALREADY_PUBLISHED - Event is already published
EVENT_SALES_CLOSED - Ticket sales have ended

TICKET_TYPE_NOT_FOUND - Ticket type does not exist
TICKET_TYPE_SOLD_OUT - No tickets remaining
TICKET_TYPE_NOT_ON_SALE - Sales haven't started or have ended

ORDER_NOT_FOUND - Order does not exist
ORDER_ALREADY_REFUNDED - Order has already been refunded
ORDER_PAYMENT_FAILED - Payment processing failed

TICKET_NOT_FOUND - Ticket does not exist
TICKET_ALREADY_CHECKED_IN - Ticket has already been checked in
TICKET_INVALID - Ticket is not valid for this event

VALIDATION_ERROR - Request validation failed
RATE_LIMIT_EXCEEDED - Too many requests
INTERNAL_ERROR - Unexpected server error
```

### Rate Limiting

**Default Limits:**

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| Authentication | 5 requests | 15 minutes |
| General API | 100 requests | 15 minutes |
| Check-in API | 1000 requests | 15 minutes |
| Webhook delivery | 1000 requests | 15 minutes |

**Rate Limit Headers:**

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

**Handling Rate Limits:**

```javascript
// Exponential backoff
async function apiRequestWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      
      if (response.status === 429) {
        const delay = Math.pow(2, i) * 1000;
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      
      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }
}
```

---

## 6C. Customization Guide

### Theming

**Theme Structure:**

```
themes/
├── default/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── layouts/
│   │   ├── EventPage.tsx
│   │   ├── Checkout.tsx
│   │   └── Admin.tsx
│   ├── styles/
│   │   ├── variables.css
│   │   └── global.css
│   └── index.ts
└── custom/
    └── ...
```

**Creating a Custom Theme:**

```bash
# 1. Copy default theme
cp -r themes/default themes/my-theme

# 2. Update theme configuration
echo '{
  "name": "my-theme",
  "extends": "default"
}' > themes/my-theme/theme.json

# 3. Customize styles
echo ':root {
  --color-primary: #FF5733;
  --color-secondary: #33FF57;
  --font-heading: "Georgia", serif;
  --font-body: "Arial", sans-serif;
}' > themes/my-theme/styles/variables.css

# 4. Build theme
npm run build:theme my-theme

# 5. Activate in admin settings
```

**CSS Variables:**

```css
:root {
  /* Colors */
  --color-primary: #3B82F6;
  --color-primary-dark: #2563EB;
  --color-secondary: #10B981;
  --color-accent: #F59E0B;
  --color-danger: #EF4444;
  --color-success: #22C55E;
  
  /* Neutrals */
  --color-white: #FFFFFF;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-500: #6B7280;
  --color-gray-700: #374151;
  --color-gray-900: #111827;
  
  /* Typography */
  --font-heading: system-ui, sans-serif;
  --font-body: system-ui, sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  
  /* Spacing */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-12: 3rem;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}
```

### Custom Email Templates

**Template Structure:**

```
email-templates/
├── default/
│   ├── order-confirmation.hbs
│   ├── ticket-reminder.hbs
│   └── ...
└── custom/
    └── ...
```

**Creating Custom Email Template:**

```handlebars
<!-- email-templates/custom/order-confirmation.hbs -->
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Inline styles for email compatibility */
    .header { background: {{organization.primary_color}}; }
    .button { background: {{organization.primary_color}}; }
  </style>
</head>
<body>
  <div class="header">
    <img src="{{organization.logo_url}}" alt="{{organization.name}}">
  </div>
  
  <h1>Thanks for your order, {{attendee.name}}!</h1>
  
  <p>You're all set for <strong>{{event.name}}</strong>.</p>
  
  <div class="event-details">
    <p>{{event.date}} at {{event.time}}</p>
    <p>{{event.venue}}</p>
    <p>{{event.address}}</p>
  </div>
  
  <a href="{{order.download_url}}" class="button">
    Download Your Tickets
  </a>
  
  <p>Order #{{order.number}}</p>
</body>
</html>
```

**Registering Custom Template:**

```javascript
// config/email-templates.js
module.exports = {
  orderConfirmation: {
    template: 'custom/order-confirmation',
    subject: 'Your tickets for {{event.name}}!'
  }
};
```

### Custom PDF Templates

**PDF Template Structure:**

```javascript
// templates/pdf/standard-ticket.js
const PDFDocument = require('pdfkit');

function generateTicket(doc, data) {
  const { event, ticket, attendee, organization } = data;
  
  // Header
  doc.fontSize(24).text(event.name, 50, 50);
  doc.fontSize(14).text(organization.name, 50, 80);
  
  // Event details
  doc.fontSize(12);
  doc.text(`Date: ${event.date}`, 50, 120);
  doc.text(`Time: ${event.time}`, 50, 140);
  doc.text(`Venue: ${event.venue}`, 50, 160);
  
  // Attendee info
  doc.fontSize(16).text(attendee.name, 50, 220);
  doc.fontSize(12).text(ticket.type, 50, 250);
  
  // QR Code
  doc.image(ticket.qrCodeBuffer, 400, 120, { width: 100 });
  
  // Footer
  doc.fontSize(10).text(`Order #${ticket.orderNumber}`, 50, 350);
  doc.text('Present this ticket at check-in', 50, 370);
}

module.exports = { generateTicket };
```

### Adding Payment Providers

**Payment Provider Interface:**

```typescript
// types/payment-provider.ts
interface PaymentProvider {
  name: string;
  id: string;
  
  // Initialize provider with config
  initialize(config: ProviderConfig): Promise<void>;
  
  // Create payment intent
  createPaymentIntent(
    amount: number,
    currency: string,
    metadata: Record<string, any>
  ): Promise<PaymentIntent>;
  
  // Confirm payment
  confirmPayment(paymentIntentId: string): Promise<PaymentResult>;
  
  // Process refund
  refund(
    paymentIntentId: string,
    amount?: number
  ): Promise<RefundResult>;
  
  // Handle webhook
  handleWebhook(payload: any, signature: string): Promise<WebhookEvent>;
  
  // Get payment methods
  getPaymentMethods(): Promise<PaymentMethod[]>;
}
```

**Example Implementation:**

```javascript
// providers/custom-payment.js
class CustomPaymentProvider {
  constructor() {
    this.name = 'Custom Payment';
    this.id = 'custom';
  }
  
  async initialize(config) {
    this.apiKey = config.apiKey;
    this.apiSecret = config.apiSecret;
    this.client = new CustomPaymentClient(this.apiKey, this.apiSecret);
  }
  
  async createPaymentIntent(amount, currency, metadata) {
    const intent = await this.client.payments.create({
      amount,
      currency,
      metadata: {
        orderId: metadata.orderId,
        eventId: metadata.eventId
      }
    });
    
    return {
      id: intent.id,
      clientSecret: intent.client_secret,
      status: intent.status
    };
  }
  
  async confirmPayment(paymentIntentId) {
    const result = await this.client.payments.confirm(paymentIntentId);
    
    return {
      success: result.status === 'succeeded',
      transactionId: result.id,
      amount: result.amount,
      currency: result.currency
    };
  }
  
  async refund(paymentIntentId, amount) {
    const refund = await this.client.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount || undefined
    });
    
    return {
      success: refund.status === 'succeeded',
      refundId: refund.id,
      amount: refund.amount
    };
  }
  
  async handleWebhook(payload, signature) {
    // Verify webhook signature
    const isValid = this.client.webhooks.verify(payload, signature);
    if (!isValid) throw new Error('Invalid webhook signature');
    
    const event = JSON.parse(payload);
    
    return {
      type: event.type,
      data: event.data
    };
  }
}

module.exports = CustomPaymentProvider;
```

**Registering Provider:**

```javascript
// config/payments.js
const CustomPaymentProvider = require('./providers/custom-payment');

module.exports = {
  providers: [
    {
      id: 'custom',
      name: 'Custom Payment',
      class: CustomPaymentProvider,
      config: {
        apiKey: process.env.CUSTOM_PAYMENT_API_KEY,
        apiSecret: process.env.CUSTOM_PAYMENT_API_SECRET
      }
    }
  ]
};
```

---

## 6D. Deployment Guide

### Production Checklist

**Before Deployment:**

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL certificate obtained
- [ ] Domain DNS configured
- [ ] Email service configured
- [ ] Payment processors connected
- [ ] Backups configured
- [ ] Monitoring set up
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Error tracking configured
- [ ] CDN configured for static assets

**Security Checklist:**

- [ ] JWT secrets are strong and unique
- [ ] Database credentials are secure
- [ ] API keys stored in environment variables
- [ ] HTTPS enforced
- [ ] Security headers set (HSTS, CSP, etc.)
- [ ] CORS properly configured
- [ ] Input validation enabled
- [ ] SQL injection protection
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Rate limiting enabled
- [ ] File upload restrictions
- [ ] Admin access restricted

### SSL/TLS Setup

**Using Let's Encrypt with Nginx:**

```nginx
# /etc/nginx/sites-available/opentickets
server {
    listen 80;
    server_name tickets.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name tickets.yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/tickets.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tickets.yourdomain.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    location /uploads {
        alias /var/www/opentickets/uploads;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Obtain Certificate:**

```bash
sudo certbot --nginx -d tickets.yourdomain.com
```

### Backup Strategy

**Database Backups:**

```bash
#!/bin/bash
# backup.sh - Run daily via cron

BACKUP_DIR="/backups/opentickets"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="opentickets"
RETENTION_DAYS=30

# Create backup
pg_dump $DB_NAME | gzip > "$BACKUP_DIR/db_$DATE.sql.gz"

# Upload to S3 (optional)
aws s3 cp "$BACKUP_DIR/db_$DATE.sql.gz" s3://your-backup-bucket/opentickets/

# Clean old backups
find $BACKUP_DIR -name "db_*.sql.gz" -mtime +$RETENTION_DAYS -delete
```

**File Backups:**

```bash
#!/bin/bash
# files-backup.sh

BACKUP_DIR="/backups/opentickets"
UPLOADS_DIR="/var/www/opentickets/uploads"
DATE=$(date +%Y%m%d)

# Backup uploads
tar -czf "$BACKUP_DIR/uploads_$DATE.tar.gz" -C $UPLOADS_DIR .

# Sync to S3
aws s3 sync $UPLOADS_DIR s3://your-backup-bucket/opentickets-uploads/
```

**Cron Schedule:**

```bash
# Daily database backup at 2 AM
0 2 * * * /var/www/opentickets/scripts/backup.sh

# Weekly full backup on Sundays at 3 AM
0 3 * * 0 /var/www/opentickets/scripts/full-backup.sh
```

### Monitoring Setup

**Application Monitoring (Prometheus + Grafana):**

```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    ports:
      - "9090:9090"
  
  grafana:
    image: grafana/grafana
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/dashboards:/etc/grafana/provisioning/dashboards
    ports:
      - "3001:3000"
  
  node-exporter:
    image: prom/node-exporter
    ports:
      - "9100:9100"

volumes:
  prometheus_data:
  grafana_data:
```

**Key Metrics to Monitor:**

```
# Application metrics
http_requests_total
http_request_duration_seconds
database_query_duration_seconds
order_count_total
ticket_sales_total

# System metrics
node_cpu_seconds_total
node_memory_MemAvailable_bytes
node_filesystem_avail_bytes

# Business metrics
revenue_total
refund_total
conversion_rate
checkin_success_rate
```

**Health Check Endpoint:**

```http
GET /health

Response:
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "checks": {
    "database": "connected",
    "redis": "connected",
    "storage": "writable"
  }
}
```

**Uptime Monitoring (UptimeRobot):**

```
Monitor Type: HTTP(s)
URL: https://tickets.yourdomain.com/health
Monitoring Interval: 5 minutes
Alert Contacts: email, slack, pagerduty
```

### Security Hardening

**Security Headers:**

```javascript
// middleware/security.js
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'", "https://api.stripe.com"],
      frameSrc: ["'self'", "https://js.stripe.com"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));
```

**Database Security:**

```sql
-- Create limited application user
CREATE USER opentickets_app WITH PASSWORD 'strong_password';
GRANT CONNECT ON DATABASE opentickets TO opentickets_app;
GRANT USAGE ON SCHEMA public TO opentickets_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO opentickets_app;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO opentickets_app;

-- Revoke dangerous permissions
REVOKE CREATE ON SCHEMA public FROM opentickets_app;
```

**Firewall Rules:**

```bash
# Allow only necessary ports
sudo ufw default deny incoming
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

**Fail2Ban Configuration:**

```ini
# /etc/fail2ban/jail.local
[opentickets]
enabled = true
port = http,https
filter = opentickets
logpath = /var/log/opentickets/app.log
maxretry = 5
bantime = 3600
```

---

# 7. TROUBLESHOOTING GUIDE

## 7A. Payment Failures

### Symptoms
- Orders stuck in "pending" status
- Customers report payment errors
- Webhook errors in logs

### Common Causes and Solutions

**1. Invalid API Credentials**

```
Error: "Invalid API Key provided"
```

**Solution:**
1. Verify API keys in Settings > Payments
2. Check if using test keys in production (or vice versa)
3. Regenerate keys if compromised
4. Ensure keys have correct permissions

**2. Webhook Misconfiguration**

```
Error: "Webhook signature verification failed"
```

**Solution:**
1. Check webhook URL is correct and accessible
2. Verify webhook secret matches
3. Ensure HTTPS is used (required by Stripe)
4. Check firewall isn't blocking webhooks

**3. Currency Mismatch**

```
Error: "Currency not supported"
```

**Solution:**
1. Check organization's default currency
2. Verify payment processor supports that currency
3. Update event currency if needed

**4. Declined Cards**

```
Error: "Your card was declined"
```

**Solution:**
- This is normal for invalid cards
- Customer should contact their bank
- Consider enabling additional payment methods
- Check if fraud rules are too strict

### Diagnostic Commands

```bash
# Check Stripe webhook deliveries
stripe webhook_endpoints list

# Test webhook endpoint
curl -X POST https://yourdomain.com/webhooks/stripe \
  -H "Stripe-Signature: test"

# Check payment logs
grep "payment" /var/log/opentickets/app.log
```

## 7B. Email Delivery Issues

### Symptoms
- Customers not receiving emails
- High bounce rates
- Emails in spam folders

### Common Causes and Solutions

**1. SMTP Configuration Issues**

```
Error: "Connection refused" or "Authentication failed"
```

**Solution:**
1. Verify SMTP settings in environment variables
2. Check firewall allows outbound on port 587
3. Ensure credentials are correct
4. Test with telnet: `telnet smtp.gmail.com 587`

**2. SPF/DKIM/DMARC Not Configured**

```
Emails landing in spam
```

**Solution:**
1. Add SPF record: `v=spf1 include:sendgrid.net ~all`
2. Configure DKIM with your email provider
3. Add DMARC record: `v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com`

**3. High Bounce Rate**

```
Many emails bouncing
```

**Solution:**
1. Clean email lists regularly
2. Implement double opt-in
3. Remove bounced emails automatically
4. Check for typos in email addresses

**4. Rate Limiting**

```
Error: "Rate limit exceeded"
```

**Solution:**
1. Implement email queue with Redis
2. Spread sends over time
3. Upgrade email service plan
4. Use dedicated IP for high volume

### Testing Email Delivery

```bash
# Test SMTP connection
swaks --to test@example.com --from noreply@yourdomain.com \
  --server smtp.sendgrid.net --port 587 \
  --auth-user apikey --auth-password YOUR_API_KEY

# Check DNS records
dig TXT yourdomain.com
dig TXT _dmarc.yourdomain.com
```

## 7C. Webhook Problems

### Symptoms
- Events not processing
- Duplicate webhook deliveries
- Webhook timeouts

### Common Causes and Solutions

**1. Endpoint Not Accessible**

```
Error: "Connection timeout" or "404 Not Found"
```

**Solution:**
1. Verify webhook URL is correct
2. Check DNS resolves correctly
3. Ensure server is running
4. Check firewall allows incoming requests

**2. SSL Certificate Issues**

```
Error: "SSL certificate verify failed"
```

**Solution:**
1. Ensure valid SSL certificate
2. Check certificate hasn't expired
3. Verify intermediate certificates are included
4. Test with: `openssl s_client -connect yourdomain.com:443`

**3. Slow Response Times**

```
Error: "Webhook timeout"
```

**Solution:**
1. Process webhooks asynchronously
2. Return 200 immediately, process in background
3. Optimize database queries
4. Add webhook retry logic

**4. Duplicate Events**

```
Same event processed multiple times
```

**Solution:**
1. Implement idempotency key check
2. Store processed event IDs
3. Return 200 for duplicate events
4. Add unique constraint on event ID

### Webhook Debugging

```bash
# View webhook logs
tail -f /var/log/opentickets/webhooks.log

# Test webhook endpoint locally
ngrok http 3000
# Then configure webhook URL to ngrok URL

# Replay webhook
curl -X POST https://yourdomain.com/webhooks/stripe \
  -H "Content-Type: application/json" \
  -d @webhook_payload.json
```

## 7D. Performance Issues

### Symptoms
- Slow page loads
- High response times
- Database timeouts

### Common Causes and Solutions

**1. Database Query Performance**

```
Slow queries in logs
```

**Solution:**
1. Add database indexes:
```sql
CREATE INDEX idx_orders_event_id ON orders(event_id);
CREATE INDEX idx_tickets_order_id ON tickets(order_id);
CREATE INDEX idx_events_status ON events(status) WHERE status = 'published';
```

2. Optimize slow queries:
```sql
EXPLAIN ANALYZE SELECT * FROM orders WHERE event_id = 'xxx';
```

3. Use query caching with Redis

**2. Missing Caching**

```
Repeated expensive queries
```

**Solution:**
1. Enable Redis caching:
```javascript
const cache = require('./lib/cache');

async function getEvent(id) {
  const cached = await cache.get(`event:${id}`);
  if (cached) return cached;
  
  const event = await db.events.findById(id);
  await cache.set(`event:${id}`, event, 3600);
  return event;
}
```

2. Cache static assets with CDN
3. Enable database query result caching

**3. Memory Leaks**

```
Memory usage growing over time
```

**Solution:**
1. Monitor memory usage:
```bash
pm2 monit
```

2. Check for event listener leaks
3. Review closure scopes
4. Use heap snapshots to identify leaks

**4. High CPU Usage**

```
CPU at 100%
```

**Solution:**
1. Profile application:
```bash
node --prof server.js
node --prof-process isolate-*.log > profile.txt
```

2. Optimize hot code paths
3. Add horizontal scaling
4. Use worker threads for CPU-intensive tasks

### Performance Monitoring

```bash
# Check database performance
SELECT * FROM pg_stat_activity WHERE state = 'active';

# Monitor slow queries
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;

# Check Redis memory usage
redis-cli INFO memory
```

## 7E. Database Issues

### Symptoms
- Connection errors
- Data corruption
- Slow queries
- Lock timeouts

### Common Causes and Solutions

**1. Connection Pool Exhaustion**

```
Error: "sorry, too many clients already"
```

**Solution:**
1. Increase connection pool size:
```javascript
const pool = new Pool({
  max: 20,  // Increase from default 10
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

2. Close connections properly
3. Use connection pooling middleware
4. Monitor active connections

**2. Lock Timeouts**

```
Error: "Lock wait timeout exceeded"
```

**Solution:**
1. Keep transactions short
2. Avoid long-running queries in transactions
3. Use appropriate isolation levels
4. Add retry logic for lock conflicts

**3. Disk Space Issues**

```
Error: "could not extend file"
```

**Solution:**
1. Monitor disk usage:
```bash
df -h
```

2. Clean up old logs:
```bash
find /var/log -name "*.log" -mtime +30 -delete
```

3. Archive old data
4. Add more storage

**4. Replication Lag**

```
Read replica showing stale data
```

**Solution:**
1. Monitor replication lag:
```sql
SELECT EXTRACT(EPOCH FROM (now() - pg_last_xact_replay_timestamp())) AS lag_seconds;
```

2. Optimize write-heavy queries
3. Consider synchronous replication for critical data
4. Scale read replicas

### Database Maintenance

```bash
# Vacuum and analyze
vacuumdb --analyze --verbose opentickets

# Check for bloat
SELECT schemaname, tablename, 
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

# Reindex
reindexdb opentickets
```

---

# 8. FAQ DOCUMENT

## General Usage

### Q1: What is GatherTix?
**A:** GatherTix is a free, open-source ticketing platform designed for non-profits and small event teams. Unlike commercial services, there are no per-ticket fees—you just pay payment processor fees.

### Q2: Who can use GatherTix?
**A:** Anyone! It's especially great for non-profits, community groups, schools, churches, and small event teams who want to avoid high ticketing fees.

### Q3: Do I need technical skills to use GatherTix?
**A:** For day-to-day use, no! The interface is designed for non-technical users. However, you'll need someone technical (or a friendly volunteer) for the initial setup.

### Q4: Is GatherTix really free?
**A:** Yes! GatherTix is open-source software licensed under the GNU AGPLv3. Self-hosting is free; you only pay for server hosting and payment processor fees (typically 2.9% + $0.30 per transaction for Stripe, or 0% with Zeffy for eligible non-profits). You only pay for your server hosting and payment processor fees (typically 2.9% + $0.30 per transaction).

### Q5: Can I use GatherTix for multiple organizations?
**A:** Yes, a single GatherTix instance can host multiple organizations, making it perfect for community foundations or event collectives.

### Q6: What types of events work best with GatherTix?
**A:** GatherTix works great for fundraisers, galas, concerts, workshops, conferences, meetups, classes, and community events.

### Q7: Can I offer free tickets?
**A:** Absolutely! Just set the ticket price to $0. GatherTix handles free registrations just like paid ones.

### Q8: How do attendees receive their tickets?
**A:** Attendees receive an email confirmation with a PDF ticket attachment containing a QR code. They can print it or show it on their phone.

### Q9: Can attendees transfer their tickets?
**A:** Yes, you can enable ticket transfers in your event settings. Attendees can then transfer tickets to others through their confirmation email.

### Q10: What happens if someone loses their ticket?
**A:** You can resend confirmation emails from the order management page. Attendees can also be looked up by name or email at check-in.

## Pricing and Fees

### Q11: What are the costs involved?
**A:** 
- GatherTix software: FREE
- Server hosting: $5-50/month (depending on traffic)
- Payment processing: 2.9% + $0.30 per transaction (Stripe/PayPal)

### Q12: Are there any hidden fees?
**A:** No! Unlike commercial platforms, we don't charge per-ticket fees, service fees, or monthly subscriptions.

### Q13: Can I pass fees to attendees?
**A:** Yes, you can add a service fee to tickets that will be passed to attendees at checkout.

### Q14: How do I get paid?
**A:** Payments go directly to your Stripe or PayPal account. You can transfer funds to your bank account according to each processor's schedule.

### Q15: When do I receive payments?
**A:** 
- Stripe: 2-7 business days for first payout, then daily or weekly
- PayPal: Instant to your PayPal balance

### Q16: Can I accept cash or check payments?
**A:** Yes, you can create "offline" payment methods and manually mark orders as paid when you receive payment.

### Q17: Do you support multiple currencies?
**A:** Yes! GatherTix supports 135+ currencies through Stripe and PayPal.

### Q18: Can I offer discounts or promo codes?
**A:** Yes, you can create discount codes for dollar amounts or percentages off.

### Q19: How do refunds work?
**A:** You can process full or partial refunds from the order management page. Refunds go back to the original payment method.

### Q20: Is there a limit on ticket sales?
**A:** No artificial limits! Your only limits are your server capacity and payment processor account limits.

## Technical Requirements

### Q21: What do I need to run GatherTix?
**A:** 
- A server (VPS or dedicated)
- Domain name
- SSL certificate
- Email service (SMTP)
- Payment processor account

### Q22: Can I host GatherTix myself?
**A:** Yes! That's the whole point. You have full control over your data and platform.

### Q23: What are the server requirements?
**A:** Minimum: 2 CPU cores, 2GB RAM, 20GB storage. Recommended: 4+ cores, 4GB+ RAM, SSD storage.

### Q24: Do you offer hosting?
**A:** Not currently. We recommend DigitalOcean, Linode, or AWS for hosting.

### Q25: Can I use shared hosting?
**A:** No, GatherTix requires Node.js and a database, which most shared hosts don't support.

### Q26: What databases are supported?
**A:** PostgreSQL (recommended) and MySQL 8+.

### Q27: Is Docker supported?
**A:** Yes! We provide Docker Compose files for easy deployment.

### Q28: Can I run GatherTix on Windows?
**A:** For development, yes. For production, Linux is strongly recommended.

### Q29: What browsers are supported?
**A:** Chrome, Firefox, Safari, Edge (latest 2 versions). IE11 is not supported.

### Q30: Is there a mobile app?
**A:** Yes! We have a check-in scanner app for iOS and Android.

## Data Privacy

### Q31: Who owns the data?
**A:** You do! All attendee data belongs to your organization. We don't access, sell, or use your data.

### Q32: Is GatherTix GDPR compliant?
**A:** Yes, GatherTix includes features to help you comply with GDPR, including data export and deletion.

### Q33: Where is data stored?
**A:** Wherever you host your GatherTix instance. You have full control over data location.

### Q34: Is data encrypted?
**A:** Yes, sensitive data is encrypted at rest and all communications use HTTPS.

### Q35: Can I export my data?
**A:** Yes, you can export orders, attendees, and events at any time in CSV or Excel format.

### Q36: How long is data retained?
**A:** As long as you want! You control data retention and can delete data at any time.

### Q37: Do you use cookies?
**A:** Yes, essential cookies for session management and optional analytics cookies (if enabled).

### Q38: Is attendee data shared with third parties?
**A:** Only with payment processors (Stripe/PayPal) for transaction processing. Never sold or shared for marketing.

### Q39: Can attendees request data deletion?
**A:** Yes, you can delete attendee data upon request through the admin interface.

### Q40: Do you track attendees?
**A:** Only check-in status for event management. No tracking pixels or marketing cookies without consent.

## Customization

### Q41: Can I customize the look and feel?
**A:** Yes! You can customize colors, fonts, logos, and even create custom themes.

### Q42: Can I use my own domain?
**A:** Yes, you can use a custom domain like tickets.yourorganization.com.

### Q43: Can I customize email templates?
**A:** Yes, all email templates can be customized with your branding and messaging.

### Q44: Can I add custom fields to tickets?
**A:** Yes, you can add custom questions that attendees answer during checkout.

### Q45: Can I customize the ticket PDF?
**A:** Yes, ticket templates can be customized or you can create entirely new designs.

### Q46: Can I integrate with my website?
**A:** Yes, you can embed event widgets or link directly to your GatherTix pages.

### Q47: Can I add my own payment processor?
**A:** Yes, the payment provider system is extensible. You can add custom integrations.

### Q48: Can I create custom reports?
**A:** Yes, you can export data and create custom reports, or use the API to build your own.

### Q49: Can I translate GatherTix?
**A:** Yes! GatherTix supports internationalization. You can add translations for any language.

### Q50: Can I modify the code?
**A:** Absolutely! GatherTix is open-source under the AGPL-3.0 license. You can modify it however you need, but any modifications must also be shared under the same license (including network-use).

## Support

### Q51: How do I get help?
**A:** 
- Documentation: docs.opentickets.io
- Community Forum: community.opentickets.io
- GitHub Issues: github.com/opentickets/opentickets/issues
- Email: support@opentickets.io

### Q52: Is there paid support available?
**A:** Yes, we offer paid support plans for organizations that need guaranteed response times.

### Q53: How do I report a bug?
**A:** Submit an issue on GitHub with details about the problem and steps to reproduce.

### Q54: Can I request features?
**A:** Yes! Submit feature requests on GitHub or discuss in the community forum.

### Q55: How can I contribute?
**A:** We welcome contributions! See CONTRIBUTING.md in the repository for guidelines.

### Q56: Is there training available?
**A:** Yes, we have video tutorials and documentation. Custom training is available for organizations.

### Q57: How do I stay updated?
**A:** Subscribe to our newsletter, follow us on Twitter, or watch the GitHub repository.

### Q58: What if I find a security issue?
**A:** Please report security issues privately to security@opentickets.io. Do not post publicly.

### Q59: Can I hire someone to help?
**A:** Yes! We maintain a list of consultants familiar with GatherTix.

### Q60: Where can I find examples?
**A:** Check our showcase page and community forum for examples of organizations using GatherTix.

---

## Additional Resources

### Documentation Links
- User Guide: https://docs.opentickets.io/user-guide
- API Reference: https://docs.opentickets.io/api
- Developer Guide: https://docs.opentickets.io/developers
- Deployment Guide: https://docs.opentickets.io/deployment

### Community
- Forum: https://community.opentickets.io
- GitHub: https://github.com/opentickets/opentickets
- Discord: https://discord.gg/opentickets
- Twitter: https://twitter.com/opentickets

### Support
- Email: support@opentickets.io
- Documentation: https://docs.opentickets.io
- Status Page: https://status.opentickets.io

---

*This documentation is maintained by the GatherTix community. Last updated: 2024*

*GatherTix is released under the GNU Affero General Public License v3 (AGPL-3.0-or-later). You are free to use, modify, and distribute this software, provided that modifications are shared under the same terms, including for network use.*
