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

import { type ChangeEvent, useState } from "react";
import Link from "next/link";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Search, Ticket } from "lucide-react";
import { formatDate } from "@ticketing/shared/utils";

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const { data: events, isLoading } = trpc.event.list.useQuery({
    search: search || undefined,
    page: 1,
    limit: 20,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Discover Events</h1>
        <p className="text-muted-foreground">Find and book tickets for amazing events near you</p>
      </div>

      {/* Search */}
      <div className="relative mb-8 max-w-md">
        <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Search events..."
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch((e.currentTarget as HTMLInputElement).value)
          }
          className="pl-10"
        />
      </div>

      {/* Events Grid */}
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : events?.data.length === 0 ? (
        <div className="py-16 text-center">
          <Ticket className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
          <h3 className="mb-2 text-lg font-semibold">No events found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or check back later for new events.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events?.data.map((event) => (
            <Card key={event.id} className="flex flex-col">
              <div className="bg-muted relative aspect-video">
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full rounded-t-lg object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Calendar className="text-muted-foreground h-12 w-12" />
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                  <Badge variant="secondary">{event.status}</Badge>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(event.startDate)}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-muted-foreground mb-2 flex items-center gap-1 text-sm">
                  <MapPin className="h-3 w-3" />
                  {event.city || "Online"}
                  {event.state && `, ${event.state}`}
                </div>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  {event.description || "No description available"}
                </p>
                {event.ticketTypes.length > 0 && (
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-sm font-medium">
                      From ${Math.min(...event.ticketTypes.map((t) => t.price)).toFixed(2)}
                    </span>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Link href={`/events/${event.organization.slug}/${event.slug}`} className="w-full">
                  <Button className="w-full">View Event</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
