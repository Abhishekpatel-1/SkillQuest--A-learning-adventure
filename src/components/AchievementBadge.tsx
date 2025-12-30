import { LucideIcon } from "lucide-react";

interface AchievementBadgeProps {
  icon: LucideIcon;
  title: string;
  description: string;
  unlocked: boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const rarityStyles = {
  common: "from-muted to-muted/50 border-border",
  rare: "from-secondary/30 to-secondary/10 border-secondary/50",
  epic: "from-primary/30 to-primary/10 border-primary/50",
  legendary: "from-accent/30 to-accent/10 border-accent/50 shadow-gold",
};

const rarityLabels = {
  common: "Common",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary",
};

export function AchievementBadge({
  icon: Icon,
  title,
  description,
  unlocked,
  rarity,
}: AchievementBadgeProps) {
  return (
    <div
      className={`group relative flex flex-col items-center gap-2 rounded-2xl border-2 bg-gradient-to-br p-4 transition-all duration-300 ${
        unlocked
          ? `${rarityStyles[rarity]} hover:scale-105`
          : "from-muted/50 to-muted/30 border-border opacity-50 grayscale"
      }`}
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-xl ${
          unlocked
            ? rarity === "legendary"
              ? "gradient-gold shadow-gold"
              : rarity === "epic"
              ? "gradient-primary shadow-glow"
              : rarity === "rare"
              ? "bg-secondary shadow-md"
              : "bg-muted"
            : "bg-muted"
        }`}
      >
        <Icon
          className={`h-7 w-7 ${
            unlocked ? "text-primary-foreground" : "text-muted-foreground"
          }`}
        />
      </div>
      <div className="text-center">
        <p className="font-display text-sm font-bold">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {unlocked && (
        <span
          className={`absolute -top-2 -right-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${
            rarity === "legendary"
              ? "gradient-gold text-accent-foreground"
              : rarity === "epic"
              ? "gradient-primary text-primary-foreground"
              : rarity === "rare"
              ? "bg-secondary text-secondary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {rarityLabels[rarity]}
        </span>
      )}
    </div>
  );
}
