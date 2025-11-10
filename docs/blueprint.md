# **App Name**: EnergiTrack

## Core Features:

- Water Tank Level Monitoring: Visualize water tank levels with a dynamic vertical gauge, updating via MQTT data. Includes color-coded alerts and numerical percentage display.
- Battery Status Monitoring: Display battery voltage and capacity with dynamic color indicators (green, yellow, red) based on MQTT data.
- Solar Panel Monitoring: Show solar panel voltage and current from MQTT data, with a subtly animated sun icon indicating charging activity.
- Pump Status and Control: Real-time pump status display (ON/OFF) based on MQTT and a toggle button for remote control with visual feedback on press.
- Scheduling Configuration: Display scheduled pump operations in a table with options to add, edit, and delete schedules. Schedules are stored as a JSON file (for MVP).
- Schedule Application: Button to apply the configured schedule, sending the new schedule configuration to MQTT.

## Style Guidelines:

- Primary color: Deep Indigo (#3F51B5) for a sophisticated, technical feel.
- Background color: Light gray (#F5F5F5), a desaturated indigo, for a clean, modern look.
- Accent color: Cyan (#00BCD4) to highlight interactive elements and data points, ensuring they stand out against the indigo palette.
- Body and headline font: 'Inter', a grotesque-style sans-serif, for a modern and neutral look.
- Use clean, minimalist icons from a set like Remix Icon or Material Icons to represent different data points and controls.
- Implement a responsive grid layout using Tailwind CSS to ensure adaptability across various screen sizes and devices.
- Incorporate subtle transitions and animations for UI elements like button presses and data updates to enhance user experience without being distracting.