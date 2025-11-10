"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets } from "lucide-react";

interface WaterTankProps {
  level: number;
}

export function WaterTank({ level }: WaterTankProps) {
  const waterColorClass =
    level > 50
      ? "bg-blue-500"
      : level > 20
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Water Tank</CardTitle>
        <Droplets className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-4 h-48">
          <div className="w-1/2 h-full rounded-lg bg-muted border-2 border-border flex flex-col justify-end overflow-hidden relative">
            <div
              className={cn("w-full transition-all duration-1000 ease-in-out relative", waterColorClass)}
              style={{ height: `${level}%` }}
            >
              <div className="absolute -bottom-2 w-full">
                <svg className="w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path fill="hsl(var(--card))" fillOpacity="0.5" d="M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,186.7C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col justify-center">
            <p className="text-4xl font-bold">{level.toFixed(0)}%</p>
            <p className="text-xs text-muted-foreground">
              {level > 50 ? "Normal" : level > 20 ? "Low" : "Critical"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
