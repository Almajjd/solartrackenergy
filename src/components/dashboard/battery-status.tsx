"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BatteryCharging } from "lucide-react";

interface BatteryStatusProps {
  voltage: number;
  capacity: number;
}

export function BatteryStatus({ voltage, capacity }: BatteryStatusProps) {
  const capacityColor =
    capacity > 70
      ? "bg-green-500"
      : capacity > 30
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Battery Status</CardTitle>
        <BatteryCharging className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4 h-48 flex flex-col justify-between">
          <div>
            <span className="text-3xl font-bold">{voltage.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground"> Volts</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Capacity</span>
                <span className={cn("font-bold", capacity > 70 ? "text-green-600" : capacity > 30 ? "text-yellow-600" : "text-red-600")}>{capacity.toFixed(0)}%</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className={cn("h-full w-full flex-1 transition-all duration-500", capacityColor)} style={{ transform: `translateX(-${100 - (capacity || 0)}%)` }}></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
