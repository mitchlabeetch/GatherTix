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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { QrCode, Loader2 } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [apiKey, setApiKey] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [eventId, setEventId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // TODO: Validate API key with server
      // For now, just store the values
      login(apiKey, organizationId, eventId);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-primary p-3 rounded-full">
            <QrCode className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Ticket Scanner</h1>
          <p className="text-muted-foreground text-center">
            Sign in to start scanning tickets
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="apiKey" className="text-sm font-medium">
              API Key
            </label>
            <input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="orgId" className="text-sm font-medium">
              Organization ID
            </label>
            <input
              id="orgId"
              type="text"
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
              placeholder="Enter organization ID"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="eventId" className="text-sm font-medium">
              Event ID
            </label>
            <input
              id="eventId"
              type="text"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              placeholder="Enter event ID"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
