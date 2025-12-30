import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardItemProps {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  isCurrentUser?: boolean;
}

const rankIcons = {
  1: <Trophy className="h-6 w-6 text-accent fill-accent" />,
  2: <Medal className="h-6 w-6 text-muted-foreground" />,
  3: <Award className="h-6 w-6 text-amber-600" />,
};

export function LeaderboardItem({
  rank,
  name,
  avatar,
  xp,
  level,
  isCurrentUser,
}: LeaderboardItemProps) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] ${
        isCurrentUser
          ? "gradient-hero border-2 border-primary shadow-glow"
          : "bg-card border-2 border-border hover:border-primary/30"
      } ${rank <= 3 ? "shadow-game" : ""}`}
    >
      <div className="flex h-12 w-12 items-center justify-center">
        {rank <= 3 ? (
          rankIcons[rank as 1 | 2 | 3]
        ) : (
          <span className="font-display text-xl font-bold text-muted-foreground">
            #{rank}
          </span>
        )}
      </div>
      <div className="relative">
        <img
          src={avatar}
          alt={name}
          className="h-12 w-12 rounded-full border-2 border-primary/30 object-cover"
        />
        <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full gradient-primary text-[10px] font-bold text-primary-foreground shadow-sm">
          {level}
        </div>
      </div>
      <div className="flex-1">
        <p className={`font-display font-bold ${isCurrentUser ? "text-primary" : ""}`}>
          {name}
          {isCurrentUser && (
            <span className="ml-2 text-xs font-normal text-muted-foreground">(You)</span>
          )}
        </p>
        <p className="text-sm text-muted-foreground">{xp.toLocaleString()} XP</p>
      </div>
      {rank <= 3 && (
        <div className="hidden sm:block">
          <div
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              rank === 1
                ? "gradient-gold text-accent-foreground"
                : rank === 2
                ? "bg-muted text-muted-foreground"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {rank === 1 ? "Champion" : rank === 2 ? "Runner-up" : "Bronze"}
          </div>
        </div>
      )}
    </div>
  );
}
