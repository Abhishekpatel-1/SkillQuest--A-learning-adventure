import { Navbar } from "@/components/Navbar";
import { XPProgress } from "@/components/XPProgress";
import { StreakCounter } from "@/components/StreakCounter";
import { QuestCard } from "@/components/QuestCard";
import { AchievementBadge } from "@/components/AchievementBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Target,
  Flame,
  BookOpen,
  Code,
  Palette,
  Brain,
  Trophy,
  Star,
  Zap,
  ArrowRight,
} from "lucide-react";

const activeQuests = [
  {
    title: "Python Fundamentals",
    description: "Master the basics of Python programming with hands-on exercises",
    xpReward: 500,
    difficulty: "easy" as const,
    duration: "2 hours",
    participants: 1247,
    progress: 65,
    imageUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
  },
  {
    title: "UI/UX Design Basics",
    description: "Learn the principles of great user interface design",
    xpReward: 350,
    difficulty: "medium" as const,
    duration: "1.5 hours",
    participants: 892,
    progress: 30,
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
  },
];

const achievements = [
  { icon: Flame, title: "Hot Streak", description: "7-day learning streak", unlocked: true, rarity: "rare" as const },
  { icon: BookOpen, title: "Bookworm", description: "Complete 10 quests", unlocked: true, rarity: "common" as const },
  { icon: Code, title: "Code Master", description: "500 lines of code", unlocked: true, rarity: "epic" as const },
  { icon: Trophy, title: "Champion", description: "Reach top 10", unlocked: false, rarity: "legendary" as const },
  { icon: Star, title: "Rising Star", description: "Earn 5000 XP", unlocked: true, rarity: "rare" as const },
  { icon: Brain, title: "Quick Learner", description: "Complete quest in 1hr", unlocked: false, rarity: "epic" as const },
];

const skillProgress = [
  { name: "Python", level: 8, progress: 75, color: "from-primary to-secondary" },
  { name: "JavaScript", level: 6, progress: 45, color: "from-accent to-primary" },
  { name: "Design", level: 4, progress: 60, color: "from-secondary to-success" },
  { name: "Data Science", level: 3, progress: 25, color: "from-primary to-accent" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="mb-8 animate-slide-up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold">
                Welcome back, <span className="text-gradient">Alex!</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                Ready to continue your learning adventure?
              </p>
            </div>
            <StreakCounter days={7} />
          </div>
        </section>

        {/* XP Progress */}
        <section className="mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <XPProgress currentXP={2450} maxXP={3000} level={12} />
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">550 XP</span> to Level 13
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4 text-primary" />
                  <span>Daily Goal: 200 XP</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Active Quests */}
        <section className="mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl font-bold">Active Quests</h2>
            <Button variant="ghost" onClick={() => navigate("/quests")} className="group">
              View All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {activeQuests.map((quest, index) => (
              <div key={quest.title} className="animate-slide-up" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                <QuestCard {...quest} onStart={() => navigate("/rooms")} />
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Achievements Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Skill Progress */}
          <section className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  Skill Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillProgress.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="flex h-6 w-6 items-center justify-center rounded-full gradient-primary text-[10px] font-bold text-primary-foreground">
                          {skill.level}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {skill.progress}% to Level {skill.level + 1}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000`}
                        style={{ width: `${skill.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Achievements */}
          <section className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-accent" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {achievements.map((achievement) => (
                    <AchievementBadge key={achievement.title} {...achievement} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
