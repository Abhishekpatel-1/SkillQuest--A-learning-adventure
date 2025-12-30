import { Flame } from "lucide-react";

interface StreakCounterProps {
  days: number;
}

export function StreakCounter({ days }: StreakCounterProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent/30 px-5 py-3 shadow-gold animate-pulse-glow">
      <div className="relative">
        <Flame className="h-8 w-8 text-accent fill-accent animate-bounce-subtle" />
        <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-destructive animate-ping" />
      </div>
      <div>
        <p className="font-display text-2xl font-bold text-accent">{days}</p>
        <p className="text-xs font-semibold text-accent/70">Day Streak</p>
      </div>
    </div>
  );
}
