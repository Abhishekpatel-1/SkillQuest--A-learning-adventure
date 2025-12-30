import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, Clock, Users, Trophy, ChevronRight } from "lucide-react";

interface QuestCardProps {
  title: string;
  description: string;
  xpReward: number;
  difficulty: "easy" | "medium" | "hard";
  duration: string;
  participants: number;
  progress?: number;
  imageUrl?: string;
  onStart?: () => void;
}

const difficultyColors = {
  easy: "bg-success/20 text-success border-success/30",
  medium: "bg-accent/20 text-accent border-accent/30",
  hard: "bg-destructive/20 text-destructive border-destructive/30",
};

const difficultyLabels = {
  easy: "Beginner",
  medium: "Intermediate", 
  hard: "Advanced",
};

export function QuestCard({
  title,
  description,
  xpReward,
  difficulty,
  duration,
  participants,
  progress,
  imageUrl,
  onStart,
}: QuestCardProps) {
  const isActive = progress !== undefined && progress > 0;

  return (
    <Card className="group overflow-hidden hover:scale-[1.02] cursor-pointer border-2 hover:border-primary/50">
      {imageUrl && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          <Badge
            className={`absolute top-3 right-3 ${difficultyColors[difficulty]} border`}
          >
            {difficultyLabels[difficulty]}
          </Badge>
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-xl font-bold leading-tight group-hover:text-gradient transition-colors">
            {title}
          </h3>
          {!imageUrl && (
            <Badge className={`${difficultyColors[difficulty]} border shrink-0`}>
              {difficultyLabels[difficulty]}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              {duration}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              {participants}
            </span>
          </div>
          <div className="flex items-center gap-1 font-bold text-accent">
            <Zap className="h-4 w-4 fill-accent" />
            +{xpReward} XP
          </div>
        </div>
        {isActive && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={onStart}
          variant={isActive ? "secondary" : "default"}
          className="w-full group/btn"
        >
          {isActive ? (
            <>
              Continue Quest
              <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </>
          ) : (
            <>
              <Trophy className="h-4 w-4" />
              Start Quest
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
