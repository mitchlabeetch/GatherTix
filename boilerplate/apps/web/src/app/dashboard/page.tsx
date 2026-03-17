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
"use client";

import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Ticket, Users, DollarSign } from "lucide-react";

export default function DashboardPage() {
  const { data: user, isLoading: userLoading } = trpc.auth.me.useQuery();
  const { data: organizations, isLoading: orgsLoading } = trpc.org.list.useQuery();

  const isLoading = userLoading || orgsLoading;

  const stats = [
    {
      title: "Organizations",
      value: organizations?.length || 0,
      icon: Users,
      description: "Organizations you belong to",
    },
    {
      title: "Events",
      value: 0,
      icon: Calendar,
      description: "Total events across organizations",
    },
    {
      title: "Tickets Sold",
      value: 0,
      icon: Ticket,
      description: "Total tickets sold",
    },
    {
      title: "Revenue",
      value: "$0",
      icon: DollarSign,
      description: "Total revenue generated",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back{user ? `, ${user.firstName}` : ""}
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your ticketing activity
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-2xl font-bold">{stat.value}</div>
              )}
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Organizations</CardTitle>
            <CardDescription>Organizations you are a member of</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : organizations && organizations.length > 0 ? (
              <div className="space-y-4">
                {organizations.map((org) => (
                  <div
                    key={org.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <p className="font-medium">{org.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {org.eventCount} events • {org.memberCount} members
                      </p>
                    </div>
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium capitalize">
                      {org.role.toLowerCase()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                You haven&apos;t joined any organizations yet.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common actions to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/dashboard/organizations/new"
              className="block rounded-lg border p-4 hover:bg-muted"
            >
              <p className="font-medium">Create Organization</p>
              <p className="text-sm text-muted-foreground">
                Set up a new organization to host events
              </p>
            </a>
            <a
              href="/dashboard/events/new"
              className="block rounded-lg border p-4 hover:bg-muted"
            >
              <p className="font-medium">Create Event</p>
              <p className="text-sm text-muted-foreground">
                Create a new event and start selling tickets
              </p>
            </a>
            <a
              href="/events"
              className="block rounded-lg border p-4 hover:bg-muted"
            >
              <p className="font-medium">Browse Events</p>
              <p className="text-sm text-muted-foreground">
                Discover and book tickets for upcoming events
              </p>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
