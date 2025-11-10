"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Power } from "lucide-react";

interface PumpControlProps {
  isOn: boolean;
  onToggle: () => void;
}

export function PumpControl({ isOn, onToggle }: PumpControlProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Water Pump Control</CardTitle>
        <Power className={cn("h-4 w-4 transition-colors", isOn ? "text-green-500" : "text-muted-foreground")} />
      </CardHeader>
      <CardContent>
        <div className="h-48 flex flex-col items-center justify-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="pump-switch"
                checked={isOn}
                onCheckedChange={onToggle}
                aria-label="Toggle water pump"
                className="scale-150"
              />
              <Label htmlFor="pump-switch" className="sr-only">Toggle Pump</Label>
            </div>
            <div className="flex items-center gap-2">
                <div className={cn("h-3 w-3 rounded-full transition-colors", isOn ? "bg-green-500 animate-pulse" : "bg-red-500")}></div>
                <span className="text-lg font-bold">{isOn ? "ON" : "OFF"}</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
