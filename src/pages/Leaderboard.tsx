import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { LeaderboardItem } from "@/components/LeaderboardItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, TrendingUp, Medal, Crown } from "lucide-react";

const leaderboardData = [
  { rank: 1, name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", xp: 15420, level: 24 },
  { rank: 2, name: "James Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", xp: 14850, level: 23 },
  { rank: 3, name: "Sofia Garcia", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", xp: 13200, level: 21 },
  { rank: 4, name: "Liam Johnson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", xp: 11890, level: 19 },
  { rank: 5, name: "Olivia Brown", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", xp: 10540, level: 18 },
  { rank: 6, name: "Noah Martinez", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", xp: 9870, level: 17 },
  { rank: 7, name: "Alex Thompson", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop", xp: 8450, level: 15, isCurrentUser: true },
  { rank: 8, name: "Ava Davis", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", xp: 7820, level: 14 },
  { rank: 9, name: "Mason Lee", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", xp: 7340, level: 13 },
  { rank: 10, name: "Isabella Taylor", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop", xp: 6890, level: 12 },
];

const timeRanges = ["This Week", "This Month", "All Time"];

export default function Leaderboard() {
  const [selectedRange, setSelectedRange] = useState("This Week");
  const currentUserRank = leaderboardData.find((u) => u.isCurrentUser);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <section className="mb-8 text-center animate-slide-up">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Trophy className="h-10 w-10 text-accent animate-bounce-subtle" />
            <h1 className="font-display text-4xl font-bold">
              Leaderboard
            </h1>
          </div>
          <p className="text-muted-foreground">
            Compete with learners worldwide and climb the ranks
          </p>
        </section>

        {/* Time Range Selector */}
        <section className="mb-8 flex justify-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="inline-flex gap-2 rounded-2xl bg-muted p-1">
            {timeRanges.map((range) => (
              <Button
                key={range}
                variant={selectedRange === range ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedRange(range)}
                className="rounded-xl"
              >
                {range}
              </Button>
            ))}
          </div>
        </section>

        {/* Top 3 Spotlight */}
        <section className="mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="grid gap-4 md:grid-cols-3">
            {/* 2nd Place */}
            <div className="order-2 md:order-1 flex flex-col items-center">
              <div className="relative mb-3">
                <img
                  src={leaderboardData[1].avatar}
                  alt={leaderboardData[1].name}
                  className="h-24 w-24 rounded-full border-4 border-muted object-cover shadow-lg"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-muted shadow-md">
                  <Medal className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <h3 className="font-display font-bold">{leaderboardData[1].name}</h3>
              <p className="text-sm text-muted-foreground">{leaderboardData[1].xp.toLocaleString()} XP</p>
            </div>

            {/* 1st Place */}
            <div className="order-1 md:order-2 flex flex-col items-center">
              <div className="relative mb-3">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <Crown className="h-10 w-10 text-accent animate-float" />
                </div>
                <img
                  src={leaderboardData[0].avatar}
                  alt={leaderboardData[0].name}
                  className="h-32 w-32 rounded-full border-4 border-accent object-cover shadow-gold animate-pulse-glow"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full gradient-gold shadow-gold">
                  <Trophy className="h-6 w-6 text-accent-foreground" />
                </div>
              </div>
              <h3 className="font-display text-lg font-bold">{leaderboardData[0].name}</h3>
              <p className="text-sm text-accent font-semibold">{leaderboardData[0].xp.toLocaleString()} XP</p>
              <Badge variant="gold" className="mt-2">Champion</Badge>
            </div>

            {/* 3rd Place */}
            <div className="order-3 flex flex-col items-center">
              <div className="relative mb-3">
                <img
                  src={leaderboardData[2].avatar}
                  alt={leaderboardData[2].name}
                  className="h-24 w-24 rounded-full border-4 border-amber-200 object-cover shadow-lg"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 shadow-md">
                  <Medal className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <h3 className="font-display font-bold">{leaderboardData[2].name}</h3>
              <p className="text-sm text-muted-foreground">{leaderboardData[2].xp.toLocaleString()} XP</p>
            </div>
          </div>
        </section>

        {/* Your Rank Card */}
        {currentUserRank && (
          <section className="mb-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Card className="gradient-hero border-2 border-primary shadow-glow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary shadow-glow">
                      <span className="font-display text-xl font-bold text-primary-foreground">
                        #{currentUserRank.rank}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold">Your Ranking</h3>
                      <p className="text-sm text-muted-foreground">
                        {currentUserRank.xp.toLocaleString()} XP • Level {currentUserRank.level}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-success">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-semibold">+3 ranks</span>
                    </div>
                    <p className="text-xs text-muted-foreground">this week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Full Leaderboard */}
        <section className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                {selectedRange} Rankings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {leaderboardData.map((user, index) => (
                <div key={user.rank} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <LeaderboardItem {...user} />
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
