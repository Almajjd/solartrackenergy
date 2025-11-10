"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Sun } from "lucide-react";

interface SolarPanelStatusProps {
  voltage: number;
  current: number;
}

export function SolarPanelStatus({ voltage, current }: SolarPanelStatusProps) {
  const isCharging = current > 0.1;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Solar Panel</CardTitle>
        <Sun className={cn("h-4 w-4 text-muted-foreground transition-colors", isCharging && "animate-pulse text-yellow-500")} />
      </CardHeader>
      <CardContent>
        <div className="h-48 flex flex-col justify-between">
            <div>
                <p className="text-xs text-muted-foreground">Voltage</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{voltage.toFixed(1)}</span>
                    <span className="text-sm text-muted-foreground">V</span>
                </div>
            </div>
            <div>
                <p className="text-xs text-muted-foreground">Current</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{current.toFixed(1)}</span>
                    <span className="text-sm text-muted-foreground">A</span>
                </div>
            </div>
            <p className="text-xs text-muted-foreground">{isCharging ? "Status: Charging" : "Status: Idle"}</p>
        </div>
      </CardContent>
    </Card>
  );
}
