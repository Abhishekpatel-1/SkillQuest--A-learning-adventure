import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { TaskItem } from "@/components/TaskItem";
import { ChatMessage } from "@/components/ChatMessage";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Send,
  Trophy,
  Clock,
  Zap,
  BookOpen,
  MessageCircle,
  Video,
  Mic,
  MicOff,
  VideoOff,
} from "lucide-react";

const initialTasks = [
  { id: 1, title: "Watch Introduction Video", xp: 50, completed: true },
  { id: 2, title: "Complete Quiz 1: Variables", xp: 75, completed: true },
  { id: 3, title: "Write your first Python script", xp: 100, completed: false },
  { id: 4, title: "Debug the sample code", xp: 125, completed: false },
  { id: 5, title: "Complete Final Project", xp: 200, completed: false },
];

const chatMessages = [
  { avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", name: "Sarah", message: "Just finished the first quiz! 💪", time: "2m ago", isOwn: false },
  { avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", name: "Mike", message: "Nice! The debugging task is tricky", time: "1m ago", isOwn: false },
  { avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", name: "You", message: "Anyone want to pair program?", time: "Just now", isOwn: true },
];

const participants = [
  { name: "Sarah K.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", status: "active" },
  { name: "Mike R.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", status: "active" },
  { name: "Emma L.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", status: "away" },
  { name: "James P.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", status: "active" },
];

export default function LearningRoom() {
  const [tasks, setTasks] = useState(initialTasks);
  const [message, setMessage] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOff, setIsVideoOff] = useState(true);

  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalXP = tasks.filter((t) => t.completed).reduce((sum, t) => sum + t.xp, 0);
  const progress = (completedTasks / tasks.length) * 100;

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        {/* Room Header */}
        <section className="mb-6 animate-slide-up">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="default" className="animate-pulse-glow">LIVE</Badge>
                <h1 className="font-display text-2xl sm:text-3xl font-bold">
                  Python Fundamentals
                </h1>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {participants.length} learners
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  45:23 remaining
                </span>
                <span className="flex items-center gap-1 text-accent font-semibold">
                  <Zap className="h-4 w-4 fill-accent" />
                  +{totalXP} XP earned
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={isMuted ? "outline" : "default"}
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button
                variant={isVideoOff ? "outline" : "default"}
                size="icon"
                onClick={() => setIsVideoOff(!isVideoOff)}
              >
                {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
              </Button>
              <Button variant="destructive">Leave Room</Button>
            </div>
          </div>
        </section>

        {/* Progress Bar */}
        <section className="mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Quest Progress</span>
                <span className="text-sm text-muted-foreground">
                  {completedTasks}/{tasks.length} tasks completed
                </span>
              </div>
              <Progress value={progress} className="h-3" />
            </CardContent>
          </Card>
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Tasks Panel */}
          <section className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Card className="h-full">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Quest Tasks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    title={task.title}
                    xp={task.xp}
                    completed={task.completed}
                    onToggle={() => toggleTask(task.id)}
                  />
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Participants */}
            <section className="animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-4 w-4 text-secondary" />
                    Learners
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {participants.map((p) => (
                    <div key={p.name} className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className="h-10 w-10 rounded-full border-2 border-border object-cover"
                        />
                        <div
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${
                            p.status === "active" ? "bg-success" : "bg-muted-foreground"
                          }`}
                        />
                      </div>
                      <span className="font-medium text-sm">{p.name}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Chat */}
            <section className="animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
              <Card className="flex flex-col" style={{ height: "400px" }}>
                <CardHeader className="pb-3 shrink-0">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    Room Chat
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
                  <div className="flex-1 overflow-y-auto space-y-4 p-4">
                    {chatMessages.map((msg, i) => (
                      <ChatMessage key={i} {...msg} />
                    ))}
                  </div>
                  <div className="p-4 border-t shrink-0">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setMessage("");
                      }}
                      className="flex gap-2"
                    >
                      <Input
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </section>
          </aside>
        </div>

        {/* Complete Quest CTA */}
        {progress === 100 && (
          <section className="mt-8 animate-scale-in">
            <Card className="gradient-primary border-0 shadow-glow">
              <CardContent className="p-8 text-center">
                <Trophy className="h-16 w-16 text-accent mx-auto mb-4 animate-bounce-subtle" />
                <h2 className="font-display text-2xl font-bold text-primary-foreground mb-2">
                  Quest Complete!
                </h2>
                <p className="text-primary-foreground/80 mb-6">
                  You've earned {totalXP} XP and unlocked the Python Badge!
                </p>
                <Button variant="gold" size="lg">
                  Claim Rewards
                </Button>
              </CardContent>
            </Card>
          </section>
        )}
      </main>
    </div>
  );
}
