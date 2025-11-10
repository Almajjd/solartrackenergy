"use client";

import { useState, useEffect, useCallback } from 'react';

export interface IotData {
  waterTankLevel: number;
  batteryVoltage: number;
  batteryCapacity: number;
  solarVoltage: number;
  solarCurrent: number;
  isPumpOn: boolean;
}

const initialData: IotData = {
    waterTankLevel: 75,
    batteryVoltage: 13.2,
    batteryCapacity: 88,
    solarVoltage: 0,
    solarCurrent: 0,
    isPumpOn: false,
};

export function useIotData() {
  const [data, setData] = useState<IotData>(initialData);

  const togglePump = useCallback(() => {
    setData(prevData => ({ ...prevData, isPumpOn: !prevData.isPumpOn }));
    console.log('Pump toggled via UI');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        let { waterTankLevel, batteryCapacity, isPumpOn } = prevData;

        // Simulate water level changes
        if (isPumpOn) {
          waterTankLevel = Math.max(0, waterTankLevel - 1);
        } else {
          waterTankLevel = Math.min(100, waterTankLevel + 0.2);
        }

        // Simulate daytime for solar panel
        const hour = new Date().getHours();
        const isDaytime = hour > 6 && hour < 18;
        
        const newSolarVoltage = isDaytime ? 18.5 + (Math.random() - 0.5) * 2 : 0;
        const newSolarCurrent = isDaytime ? 5.2 + (Math.random() - 0.5) * 2 : 0;
        const isCharging = newSolarCurrent > 0.1;

        // Simulate battery changes
        if (isCharging) {
          batteryCapacity = Math.min(100, batteryCapacity + 0.5);
        } else {
          // Power consumption from system/pump
          const consumption = isPumpOn ? 0.3 : 0.1;
          batteryCapacity = Math.max(0, batteryCapacity - consumption);
        }

        // Simple voltage mapping from capacity
        let newBatteryVoltage = 11.8 + (batteryCapacity / 100) * 1.9;

        return {
          waterTankLevel: parseFloat(waterTankLevel.toFixed(2)),
          batteryVoltage: parseFloat(newBatteryVoltage.toFixed(1)),
          batteryCapacity: parseFloat(batteryCapacity.toFixed(2)),
          solarVoltage: parseFloat(newSolarVoltage.toFixed(1)),
          solarCurrent: parseFloat(newSolarCurrent.toFixed(1)),
          isPumpOn: prevData.isPumpOn,
        };
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return { data, togglePump };
}
