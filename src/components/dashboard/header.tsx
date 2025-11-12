import { Bolt } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-card border-b rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 text-primary rounded-lg">
          <Bolt className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Solar Pump Track
        </h1>
      </div>
      <div className="flex items-center gap-2">
         <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        <span className="text-sm text-muted-foreground">Live Data</span>
      </div>
    </header>
  );
}
