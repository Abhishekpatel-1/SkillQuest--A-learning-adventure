import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { QuestCard } from "@/components/QuestCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Sparkles } from "lucide-react";

const categories = ["All", "Programming", "Design", "Data Science", "AI/ML", "Cloud"];

const quests = [
  {
    title: "Python Fundamentals",
    description: "Master the basics of Python programming with hands-on exercises and real projects",
    xpReward: 500,
    difficulty: "easy" as const,
    duration: "2 hours",
    participants: 1247,
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
  },
  {
    title: "UI/UX Design Basics",
    description: "Learn the principles of great user interface design from industry experts",
    xpReward: 350,
    difficulty: "medium" as const,
    duration: "1.5 hours",
    participants: 892,
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
  },
  {
    title: "Machine Learning 101",
    description: "Introduction to machine learning concepts and building your first model",
    xpReward: 750,
    difficulty: "hard" as const,
    duration: "3 hours",
    participants: 634,
    category: "AI/ML",
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
  },
  {
    title: "React for Beginners",
    description: "Build modern web applications with React and hooks",
    xpReward: 600,
    difficulty: "medium" as const,
    duration: "2.5 hours",
    participants: 1089,
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
  },
  {
    title: "Data Visualization",
    description: "Create stunning charts and graphs to tell stories with data",
    xpReward: 400,
    difficulty: "easy" as const,
    duration: "1 hour",
    participants: 756,
    category: "Data Science",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
  },
  {
    title: "Cloud Architecture",
    description: "Design scalable cloud solutions with Google Cloud Platform",
    xpReward: 800,
    difficulty: "hard" as const,
    duration: "4 hours",
    participants: 423,
    category: "Cloud",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop",
  },
];

export default function Quests() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQuests = quests.filter((quest) => {
    const matchesCategory = selectedCategory === "All" || quest.category === selectedCategory;
    const matchesSearch = quest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          quest.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <section className="mb-8 animate-slide-up">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-8 w-8 text-accent" />
            <h1 className="font-display text-3xl sm:text-4xl font-bold">
              Quest Board
            </h1>
          </div>
          <p className="text-muted-foreground">
            Choose your next adventure and earn XP rewards
          </p>
        </section>

        {/* Search & Filter */}
        <section className="mb-8 space-y-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search quests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12"
              />
            </div>
            <Button variant="outline" className="shrink-0">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Featured Quest */}
        <section className="mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-8 shadow-glow">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90" />
            <div className="absolute top-0 right-0 w-1/2 h-full">
              <img
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop"
                alt="Featured Quest"
                className="h-full w-full object-cover opacity-30"
              />
            </div>
            <div className="relative z-10 max-w-xl">
              <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30">
                🔥 Featured Quest
              </Badge>
              <h2 className="font-display text-3xl font-bold text-primary-foreground mb-2">
                AI Hackathon Prep
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                Prepare for hackathons with this comprehensive AI/ML crash course. Learn to build winning projects!
              </p>
              <div className="flex items-center gap-4 mb-6">
                <Badge variant="gold">+1000 XP</Badge>
                <span className="text-primary-foreground/70 text-sm">4 hours • 2.3k learners</span>
              </div>
              <Button variant="gold" size="lg" onClick={() => navigate("/rooms")}>
                Start Challenge
              </Button>
            </div>
          </div>
        </section>

        {/* Quest Grid */}
        <section className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <h2 className="font-display text-2xl font-bold mb-6">
            Available Quests ({filteredQuests.length})
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredQuests.map((quest, index) => (
              <div key={quest.title} className="animate-scale-in" style={{ animationDelay: `${0.1 * index}s` }}>
                <QuestCard {...quest} onStart={() => navigate("/rooms")} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
