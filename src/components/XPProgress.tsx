import { Progress } from "@/components/ui/progress";
import { Zap } from "lucide-react";

interface XPProgressProps {
  currentXP: number;
  maxXP: number;
  level: number;
}

export function XPProgress({ currentXP, maxXP, level }: XPProgressProps) {
  const percentage = (currentXP / maxXP) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-glow">
            <span className="font-display text-lg font-bold text-primary-foreground">
              {level}
            </span>
          </div>
          <span className="font-display text-sm font-semibold text-muted-foreground">
            Level {level}
          </span>
        </div>
        <div className="flex items-center gap-1 text-accent font-bold">
          <Zap className="h-4 w-4 fill-accent" />
          <span>{currentXP.toLocaleString()} / {maxXP.toLocaleString()} XP</span>
        </div>
      </div>
      <Progress value={percentage} variant="gold" className="h-3" />
    </div>
  );
}
