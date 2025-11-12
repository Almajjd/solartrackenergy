"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets } from "lucide-react";

interface WaterTankProps {
  level: number;
}

export function WaterTank({ level }: WaterTankProps) {
  const levels = [
    { threshold: 25, label: "25%" },
    { threshold: 50, label: "50%" },
    { threshold: 75, label: "75%" },
    { threshold: 100, label: "100%" },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Water Tank</CardTitle>
        <Droplets className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-around gap-2 h-48">
          <div className="flex items-end justify-center gap-4 h-full">
            {levels.map((item, index) => {
              const isActive = level >= item.threshold;
              const barHeight = `${item.threshold}%`;
              const waterColorClass =
                level > 50
                  ? "bg-blue-500"
                  : level > 20
                  ? "bg-yellow-500"
                  : "bg-red-500";

              return (
                <div key={index} className="flex flex-col items-center justify-end h-full w-1/4">
                  <div className="relative w-full h-full bg-muted rounded-t-md overflow-hidden border-t border-x">
                    <div
                      className={cn("absolute bottom-0 w-full transition-all duration-500", isActive ? waterColorClass : "bg-muted")}
                      style={{ height: '100%' }}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">{item.label}</span>
                </div>
              );
            })}
          </div>
           <div className="w-full flex flex-col items-center">
            <p className="text-3xl font-bold">{level.toFixed(0)}%</p>
            <p className="text-xs text-muted-foreground">
              {level > 50 ? "Normal" : level > 20 ? "Low" : "Critical"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
