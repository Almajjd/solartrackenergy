"use client";

import { Header } from "@/components/dashboard/header";
import { WaterTank } from "@/components/dashboard/water-tank";
import { BatteryStatus } from "@/components/dashboard/battery-status";
import { SolarPanelStatus } from "@/components/dashboard/solar-panel-status";
import { PumpControl } from "@/components/dashboard/pump-control";
import { ScheduleManager } from "@/components/dashboard/schedule-manager";
import { useIotData } from "@/hooks/use-iot-data";

export default function Home() {
  const { data, togglePump } = useIotData();

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <main className="space-y-6">
          <Header />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <WaterTank level={data.waterTankLevel} />
            <BatteryStatus
              voltage={data.batteryVoltage}
              capacity={data.batteryCapacity}
            />
            <SolarPanelStatus
              voltage={data.solarVoltage}
              current={data.solarCurrent}
            />
            <PumpControl isOn={data.isPumpOn} onToggle={togglePump} />
          </div>
          <div className="grid gap-6">
            <ScheduleManager />
          </div>
        </main>
      </div>
    </div>
  );
}
