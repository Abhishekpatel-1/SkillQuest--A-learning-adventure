import { Check, Circle } from "lucide-react";

interface TaskItemProps {
  title: string;
  xp: number;
  completed: boolean;
  onToggle: () => void;
}

export function TaskItem({ title, xp, completed, onToggle }: TaskItemProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all duration-300 ${
        completed
          ? "border-success/30 bg-success/5"
          : "border-border bg-card hover:border-primary/30 hover:shadow-md"
      }`}
    >
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all ${
          completed
            ? "gradient-success shadow-md"
            : "border-2 border-muted-foreground/30"
        }`}
      >
        {completed ? (
          <Check className="h-4 w-4 text-success-foreground" />
        ) : (
          <Circle className="h-4 w-4 text-muted-foreground/30" />
        )}
      </div>
      <span
        className={`flex-1 font-medium ${
          completed ? "text-muted-foreground line-through" : ""
        }`}
      >
        {title}
      </span>
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-bold ${
          completed
            ? "bg-success/20 text-success"
            : "bg-accent/20 text-accent"
        }`}
      >
        +{xp} XP
      </span>
    </button>
  );
}
