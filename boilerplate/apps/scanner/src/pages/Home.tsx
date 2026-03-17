import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { QrCode, CheckCircle, XCircle, Users } from "lucide-react";

interface CheckInStats {
  totalTickets: number;
  checkedInTickets: number;
  checkInRate: number;
}

export function Home() {
  const { organizationId, eventId, token } = useAuth();
  const [stats, setStats] = useState<CheckInStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch stats from API
    // For now, show placeholder stats
    setStats({
      totalTickets: 100,
      checkedInTickets: 45,
      checkInRate: 45,
    });
    setIsLoading(false);
  }, [organizationId, eventId, token]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-primary/10 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Users className="h-5 w-5" />
            <span className="text-sm font-medium">Total Tickets</span>
          </div>
          <p className="text-3xl font-bold">
            {isLoading ? "-" : stats?.totalTickets}
          </p>
        </div>

        <div className="bg-green-500/10 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Checked In</span>
          </div>
          <p className="text-3xl font-bold">
            {isLoading ? "-" : stats?.checkedInTickets}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-muted p-4 rounded-lg">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Check-in Progress</span>
          <span className="text-sm text-muted-foreground">
            {isLoading ? "-" : `${stats?.checkInRate.toFixed(0)}%`}
          </span>
        </div>
        <div className="w-full bg-muted-foreground/20 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${stats?.checkInRate || 0}%` }}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        
        <Link
          to="/scan"
          className="flex items-center gap-4 p-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <QrCode className="h-6 w-6" />
          <div>
            <p className="font-medium">Scan Tickets</p>
            <p className="text-sm opacity-80">Scan QR codes to check in attendees</p>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <div className="text-center py-8 text-muted-foreground">
          <p>No recent check-ins</p>
          <p className="text-sm">Start scanning to see activity here</p>
        </div>
      </div>
    </div>
  );
}
