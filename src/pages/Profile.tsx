import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Camera,
  Edit3,
  Save,
  X,
  Zap,
  Trophy,
  Flame,
  Star,
  Crown,
  BookOpen,
  Users,
  Footprints,
  Loader2,
} from "lucide-react";

interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  xp: number;
  level: number;
  streak_days: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xp_reward: number;
  rarity: string;
}

interface UserAchievement {
  id: string;
  achievement_id: string;
  earned_at: string;
  achievements: Achievement;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  footprints: Footprints,
  zap: Zap,
  "book-open": BookOpen,
  users: Users,
  flame: Flame,
  trophy: Trophy,
  crown: Crown,
  star: Star,
};

const rarityColors: Record<string, string> = {
  common: "bg-muted text-muted-foreground",
  rare: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  epic: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  legendary: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchAchievements();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile");
    } else if (data) {
      setProfile(data);
      setDisplayName(data.display_name || "");
      setBio(data.bio || "");
    }
    setIsLoading(false);
  };

  const fetchAchievements = async () => {
    // Fetch all achievements
    const { data: allAchievements, error: achievementsError } = await supabase
      .from("achievements")
      .select("*");

    if (achievementsError) {
      console.error("Error fetching achievements:", achievementsError);
    } else {
      setAchievements(allAchievements || []);
    }

    // Fetch user's earned achievements
    if (user) {
      const { data: earned, error: earnedError } = await supabase
        .from("user_achievements")
        .select(`
          id,
          achievement_id,
          earned_at,
          achievements (*)
        `)
        .eq("user_id", user.id);

      if (earnedError) {
        console.error("Error fetching user achievements:", earnedError);
      } else {
        setUserAchievements((earned as unknown as UserAchievement[]) || []);
      }
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const avatarUrl = `${urlData.publicUrl}?t=${Date.now()}`;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: avatarUrl })
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      setProfile((prev) => (prev ? { ...prev, avatar_url: avatarUrl } : null));
      toast.success("Avatar updated!");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload avatar");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setIsSaving(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: displayName,
          bio: bio,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      setProfile((prev) =>
        prev ? { ...prev, display_name: displayName, bio: bio } : null
      );
      setIsEditing(false);
      toast.success("Profile updated!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const xpForNextLevel = (profile?.level || 1) * 500;
  const currentLevelXp = profile?.xp ? profile.xp % 500 : 0;
  const xpProgress = (currentLevelXp / 500) * 100;

  const earnedAchievementIds = userAchievements.map((ua) => ua.achievement_id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="lg:col-span-1 overflow-hidden">
            <div className="h-24 gradient-primary" />
            <CardContent className="relative pt-0">
              <div className="relative -mt-16 mb-4">
                <div className="relative mx-auto w-32 h-32">
                  <div className="w-32 h-32 rounded-full border-4 border-background bg-muted overflow-hidden shadow-lg">
                    {profile?.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full gradient-primary flex items-center justify-center">
                        <span className="font-display text-4xl text-primary-foreground">
                          {displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "?"}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {isUploading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Camera className="h-5 w-5" />
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </div>
              </div>

              <div className="text-center space-y-4">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Display name"
                      className="text-center"
                    />
                    <Textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows={3}
                    />
                    <div className="flex gap-2 justify-center">
                      <Button
                        size="sm"
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4" />
                        )}
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          setDisplayName(profile?.display_name || "");
                          setBio(profile?.bio || "");
                        }}
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <h2 className="font-display text-2xl font-bold">
                        {profile?.display_name || "Adventurer"}
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        {user?.email}
                      </p>
                    </div>
                    {profile?.bio && (
                      <p className="text-muted-foreground">{profile.bio}</p>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  </>
                )}

                <div className="pt-4 border-t space-y-4">
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center">
                          <span className="font-display text-sm font-bold text-primary-foreground">
                            {profile?.level || 1}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">Level</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Zap className="h-5 w-5 text-accent fill-accent" />
                        <span className="font-bold text-accent">
                          {profile?.xp || 0}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">XP</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Flame className="h-5 w-5 text-orange-500 fill-orange-500" />
                        <span className="font-bold text-orange-500">
                          {profile?.streak_days || 0}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">Streak</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Next Level</span>
                      <span className="font-medium">
                        {currentLevelXp} / {500} XP
                      </span>
                    </div>
                    <Progress value={xpProgress} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements Gallery */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-accent" />
                Achievement Gallery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {achievements.map((achievement) => {
                  const isEarned = earnedAchievementIds.includes(achievement.id);
                  const IconComponent = iconMap[achievement.icon] || Star;

                  return (
                    <div
                      key={achievement.id}
                      className={`relative rounded-xl border-2 p-4 transition-all ${
                        isEarned
                          ? "border-accent/50 bg-accent/5"
                          : "border-muted bg-muted/20 opacity-50 grayscale"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${
                            isEarned
                              ? "gradient-gold shadow-gold"
                              : "bg-muted"
                          }`}
                        >
                          <IconComponent
                            className={`h-7 w-7 ${
                              isEarned ? "text-amber-900" : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold truncate">
                              {achievement.name}
                            </h3>
                            <Badge
                              variant="outline"
                              className={`text-xs capitalize ${
                                rarityColors[achievement.rarity]
                              }`}
                            >
                              {achievement.rarity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {achievement.description}
                          </p>
                          <div className="flex items-center gap-1 mt-2 text-sm">
                            <Zap className="h-4 w-4 text-accent fill-accent" />
                            <span className="font-medium text-accent">
                              +{achievement.xp_reward} XP
                            </span>
                          </div>
                        </div>
                      </div>
                      {isEarned && (
                        <div className="absolute top-2 right-2">
                          <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                            <svg
                              className="h-4 w-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {achievements.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No achievements available yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
