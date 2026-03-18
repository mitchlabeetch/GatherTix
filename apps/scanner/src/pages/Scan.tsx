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
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useAuth } from "../contexts/AuthContext";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

type ScanStatus = "idle" | "scanning" | "success" | "error";

interface ScanResult {
  status: ScanStatus;
  message: string;
  ticket?: {
    ticketNumber: string;
    attendeeName: string;
    ticketType: string;
  };
}

export function Scan() {
  const { organizationId, eventId, token } = useAuth();
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // Initialize scanner
    scannerRef.current = new Html5Qrcode("reader");

    const startScanning = async () => {
      try {
        await scannerRef.current?.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          handleScanSuccess,
          handleScanError
        );
        setIsScanning(true);
      } catch (err) {
        console.error("Failed to start scanner:", err);
      }
    };

    startScanning();

    return () => {
      scannerRef.current?.stop().catch(console.error);
    };
  }, []);

  const handleScanSuccess = async (decodedText: string) => {
    // Pause scanning
    await scannerRef.current?.pause();

    setScanResult({
      status: "scanning",
      message: "Validating ticket...",
    });

    try {
      // TODO: Validate ticket with API
      // const response = await fetch(`${API_URL}/trpc/ticket.validateQR`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({
      //     organizationId,
      //     qrToken: decodedText,
      //   }),
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock success response
      setScanResult({
        status: "success",
        message: "Ticket validated successfully!",
        ticket: {
          ticketNumber: "TCK-ABC123",
          attendeeName: "John Doe",
          ticketType: "General Admission",
        },
      });
    } catch (error) {
      setScanResult({
        status: "error",
        message: "Invalid or already checked-in ticket",
      });
    }

    // Resume scanning after delay
    setTimeout(async () => {
      setScanResult(null);
      await scannerRef.current?.resume();
    }, 3000);
  };

  const handleScanError = (errorMessage: string) => {
    // Ignore scan errors (no QR code in frame)
    if (errorMessage.includes("No MultiFormat Readers")) {
      return;
    }
    console.error("Scan error:", errorMessage);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Scan Tickets</h1>

      {/* Scanner */}
      <div className="relative aspect-square max-w-sm mx-auto bg-black rounded-lg overflow-hidden">
        <div id="reader" className="w-full h-full" />
        
        {/* Scan overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 border-2 border-white/30 rounded-lg" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-primary rounded-lg">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-primary -mt-1 -ml-1" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-primary -mt-1 -mr-1" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-primary -mb-1 -ml-1" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-primary -mb-1 -mr-1" />
          </div>
        </div>
      </div>

      {/* Instructions */}
      <p className="text-center text-muted-foreground text-sm">
        Point the camera at a ticket QR code to scan
      </p>

      {/* Result Modal */}
      {scanResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg p-6 max-w-sm w-full">
            {scanResult.status === "scanning" && (
              <div className="flex flex-col items-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-lg font-medium">{scanResult.message}</p>
              </div>
            )}

            {scanResult.status === "success" && (
              <div className="flex flex-col items-center">
                <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                <p className="text-lg font-medium text-green-600 mb-2">
                  {scanResult.message}
                </p>
                {scanResult.ticket && (
                  <div className="text-center text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">
                      {scanResult.ticket.attendeeName}
                    </p>
                    <p>{scanResult.ticket.ticketType}</p>
                    <p className="text-xs">{scanResult.ticket.ticketNumber}</p>
                  </div>
                )}
              </div>
            )}

            {scanResult.status === "error" && (
              <div className="flex flex-col items-center">
                <XCircle className="h-12 w-12 text-red-500 mb-4" />
                <p className="text-lg font-medium text-red-600">
                  {scanResult.message}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
