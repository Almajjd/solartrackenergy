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
        <div className="flex flex-col justify-between items-center h-48">
          <div className="relative w-24 h-40 bg-muted rounded-lg border-2 border-border overflow-hidden">
            <div
              className={cn(
                "absolute bottom-0 w-full transition-all duration-500",
                waterColorClass
              )}
              style={{ height: `${level}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-white mix-blend-difference">
                    {level.toFixed(0)}%
                </span>
            </div>
          </div>
          <div className="w-full flex flex-col items-center">
            <p className="text-xs text-muted-foreground">
              {level > 50 ? "Normal" : level > 20 ? "Low" : "Critical"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
