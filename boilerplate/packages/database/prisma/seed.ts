// GatherTix - Self-hosted ticketing platform for non-profits and community groups.
// Copyright (C) 2024 GatherTix Contributors
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.
import { PrismaClient, UserRole, OrganizationStatus, OrganizationMemberRole, EventStatus, TicketStatus, OrderStatus } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...\n");

  // Create admin user
  const adminPassword = await argon2.hash("admin123456");
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "User",
      password: adminPassword,
      role: UserRole.ADMIN,
      emailVerified: true,
    },
  });
  console.log("✅ Created admin user:", admin.email);

  // Create regular user
  const userPassword = await argon2.hash("user123456");
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      firstName: "John",
      lastName: "Doe",
      password: userPassword,
      role: UserRole.USER,
      emailVerified: true,
    },
  });
  console.log("✅ Created regular user:", user.email);

  // Create sample organization
  const organization = await prisma.organization.upsert({
    where: { slug: "acme-events" },
    update: {},
    create: {
      slug: "acme-events",
      name: "Acme Events",
      description: "Premier event management company",
      email: "contact@acmeevents.com",
      website: "https://acmeevents.com",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      status: OrganizationStatus.ACTIVE,
    },
  });
  console.log("✅ Created organization:", organization.name);

  // Add user as organization owner
  await prisma.organizationMember.upsert({
    where: {
      organizationId_userId: {
        organizationId: organization.id,
        userId: user.id,
      },
    },
    update: {},
    create: {
      organizationId: organization.id,
      userId: user.id,
      role: OrganizationMemberRole.OWNER,
    },
  });
  console.log("✅ Added user as organization owner");

  // Create sample event
  const eventStartDate = new Date();
  eventStartDate.setDate(eventStartDate.getDate() + 30);

  const eventEndDate = new Date(eventStartDate);
  eventEndDate.setHours(eventEndDate.getHours() + 4);

  const event = await prisma.event.upsert({
    where: {
      organizationId_slug: {
        organizationId: organization.id,
        slug: "summer-music-festival-2024",
      },
    },
    update: {},
    create: {
      organizationId: organization.id,
      slug: "summer-music-festival-2024",
      title: "Summer Music Festival 2024",
      description: "Join us for an unforgettable day of live music, food, and fun! Featuring top artists from around the world.",
      startDate: eventStartDate,
      endDate: eventEndDate,
      timezone: "America/Los_Angeles",
      venueName: "Golden Gate Park",
      address: "501 Stanyan St",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      postalCode: "94117",
      maxAttendees: 500,
      isPublic: true,
      status: EventStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });
  console.log("✅ Created event:", event.title);

  // Create ticket types
  const ticketTypes = await Promise.all([
    prisma.ticketType.upsert({
      where: { id: "early-bird" },
      update: {},
      create: {
        eventId: event.id,
        name: "Early Bird",
        description: "Limited early bird tickets at a special price",
        price: 49.99,
        currency: "USD",
        quantity: 100,
        minPerOrder: 1,
        maxPerOrder: 4,
        isVisible: true,
        sortOrder: 0,
      },
    }),
    prisma.ticketType.upsert({
      where: { id: "general-admission" },
      update: {},
      create: {
        eventId: event.id,
        name: "General Admission",
        description: "Standard entry ticket",
        price: 79.99,
        currency: "USD",
        quantity: 300,
        minPerOrder: 1,
        maxPerOrder: 10,
        isVisible: true,
        sortOrder: 1,
      },
    }),
    prisma.ticketType.upsert({
      where: { id: "vip" },
      update: {},
      create: {
        eventId: event.id,
        name: "VIP Experience",
        description: "VIP access with exclusive perks and premium viewing area",
        price: 149.99,
        currency: "USD",
        quantity: 50,
        minPerOrder: 1,
        maxPerOrder: 4,
        isVisible: true,
        sortOrder: 2,
      },
    }),
  ]);
  console.log("✅ Created", ticketTypes.length, "ticket types");

  // Create email templates
  const templates = await Promise.all([
    prisma.template.upsert({
      where: { id: "order-confirmation-template" },
      update: {},
      create: {
        organizationId: organization.id,
        name: "Order Confirmation",
        type: "EMAIL_ORDER_CONFIRMATION",
        subject: "Your order confirmation - {{eventName}}",
        content: `
<h1>Thank you for your order!</h1>
<p>Hi {{customerName}},</p>
<p>Your order for <strong>{{eventName}}</strong> has been confirmed.</p>
<p><strong>Order Number:</strong> {{orderNumber}}</p>
<p><strong>Event Date:</strong> {{eventDate}}</p>
<p><strong>Total:</strong> {{total}}</p>
<p>Your tickets are attached to this email.</p>
<p>See you there!</p>
        `.trim(),
        isDefault: true,
      },
    }),
    prisma.template.upsert({
      where: { id: "ticket-template" },
      update: {},
      create: {
        organizationId: organization.id,
        name: "Ticket PDF",
        type: "PDF_TICKET",
        content: JSON.stringify({
          layout: "standard",
          showQRCode: true,
          showEventDetails: true,
          showAttendeeName: true,
        }),
        isDefault: true,
      },
    }),
  ]);
  console.log("✅ Created", templates.length, "templates");

  console.log("\n✨ Database seed completed!");
  console.log("\nLogin credentials:");
  console.log("  Admin: admin@example.com / admin123456");
  console.log("  User:  user@example.com / user123456");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
