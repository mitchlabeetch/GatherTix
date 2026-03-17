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
import { Outlet, Link, useLocation } from "react-router-dom";
import { QrCode, Home, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function Layout() {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <QrCode className="h-6 w-6" />
            <span className="font-bold">Ticket Scanner</span>
          </Link>
          <button
            onClick={logout}
            className="p-2 hover:bg-muted rounded-full"
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-4">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 w-full border-t bg-background">
        <div className="container flex justify-around py-2">
          <Link
            to="/"
            className={`flex flex-col items-center p-2 rounded-lg ${
              isActive("/") ? "text-primary bg-primary/10" : "text-muted-foreground"
            }`}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            to="/scan"
            className={`flex flex-col items-center p-2 rounded-lg ${
              isActive("/scan") ? "text-primary bg-primary/10" : "text-muted-foreground"
            }`}
          >
            <QrCode className="h-6 w-6" />
            <span className="text-xs mt-1">Scan</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
