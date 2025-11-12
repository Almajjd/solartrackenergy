"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sun, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SolarPanelStatusProps {
  voltage: number;
  current: number;
}

export function SolarPanelStatus({ voltage, current }: SolarPanelStatusProps) {
  const { toast } = useToast();
  const isCharging = current > 0.1;

  const handleCleanPanels = () => {
    toast({
      title: "Cleaning Initiated",
      description: "Solar panel cleaning cycle has started.",
    });
    // Here you would typically trigger the cleaning process
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Solar Panel</CardTitle>
        <Sun className={cn("h-4 w-4 text-muted-foreground transition-colors", isCharging && "animate-pulse text-yellow-500")} />
      </CardHeader>
      <CardContent>
        <div className="h-48 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <p className="text-xs text-muted-foreground">{isCharging ? "Status: Charging" : "Status: Idle"}</p>
            <Button onClick={handleCleanPanels} variant="outline" size="sm" className="w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Clean Panels
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
