"use client";

import { useState, useEffect, useCallback } from 'react';
import mqtt from 'mqtt';

export interface IotData {
  waterTankLevel: number;
  batteryVoltage: number;
  batteryCapacity: number;
  solarVoltage: number;
  solarCurrent: number;
  isPumpOn: boolean;
}

const initialData: IotData = {
    waterTankLevel: 0,
    batteryVoltage: 12.5,
    batteryCapacity: 80,
    solarVoltage: 0,
    solarCurrent: 0,
    isPumpOn: false,
};

const MQTT_BROKER = "wss://broker.emqx.io:8084/mqtt";
const TOPIC_LEVEL = "tandon/level";

export function useIotData() {
  const [data, setData] = useState<IotData>(initialData);

  const togglePump = useCallback(() => {
    setData(prevData => ({ ...prevData, isPumpOn: !prevData.isPumpOn }));
    console.log('Pump toggled via UI');
  }, []);

  useEffect(() => {
    // MQTT Client Setup
    const client = mqtt.connect(MQTT_BROKER);

    client.on('connect', () => {
      console.log('Connected to MQTT broker!');
      client.subscribe(TOPIC_LEVEL, (err) => {
        if (!err) {
          console.log(`Subscribed to topic: ${TOPIC_LEVEL}`);
        }
      });
    });

    client.on('message', (topic, message) => {
      if (topic === TOPIC_LEVEL) {
        try {
          const payload = JSON.parse(message.toString());
          setData(prevData => ({
            ...prevData,
            waterTankLevel: payload.level_percent || prevData.waterTankLevel,
          }));
        } catch (e) {
          console.error('Failed to parse MQTT message:', e);
        }
      }
    });

    client.on('error', (err) => {
      console.error('MQTT Connection Error:', err);
      client.end();
    });

    // Simulation for other data points remains for now
    const interval = setInterval(() => {
      setData(prevData => {
        let { batteryCapacity, isPumpOn } = prevData;

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
          ...prevData,
          batteryVoltage: parseFloat(newBatteryVoltage.toFixed(1)),
          batteryCapacity: parseFloat(batteryCapacity.toFixed(2)),
          solarVoltage: parseFloat(newSolarVoltage.toFixed(1)),
          solarCurrent: parseFloat(newSolarCurrent.toFixed(1)),
        };
      });
    }, 2000); // Update every 2 seconds

    return () => {
      if (client) {
        client.end();
      }
      clearInterval(interval);
    };
  }, []);

  return { data, togglePump };
}
