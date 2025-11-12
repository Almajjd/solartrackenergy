"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets } from "lucide-react";

interface WaterTankProps {
  level: number;
}

export function WaterTank({ level }: WaterTankProps) {
  const getBarState = (barLevel: number) => {
    if (level >= barLevel) {
      if (level > 75) return "bg-green-500";
      if (level > 50) return "bg-yellow-500";
      if (level > 25) return "bg-orange-500";
      return "bg-red-500";
    }
    return "bg-muted";
  };
  
  const levelText =
    level > 75
    ? "Full"
    : level > 50
    ? "Good"
    : level > 25
    ? "Low"
    : "Critical";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Water Tank</CardTitle>
        <Droplets className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-between items-center h-48">
          <div className="relative w-28 h-40 bg-card border-2 border-foreground rounded-lg p-2 flex flex-col-reverse gap-1.5">
             <div className="absolute inset-x-0 top-1.5 text-center">
                 <p className="text-sm font-bold text-foreground">{level.toFixed(0)}%</p>
             </div>
             <div className={cn("h-1/4 w-full rounded-sm", getBarState(25))}></div>
             <div className={cn("h-1/4 w-full rounded-sm", getBarState(50))}></div>
             <div className={cn("h-1/4 w-full rounded-sm", getBarState(75))}></div>
             <div className={cn("h-1/4 w-full rounded-sm", getBarState(100))}></div>
          </div>
          <div className="w-full flex flex-col items-center">
            <p className="text-xs text-muted-foreground">
              {levelText}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
