-- Add bio column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;

-- Create avatars storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- Storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  xp_reward INTEGER NOT NULL DEFAULT 0,
  rarity TEXT NOT NULL DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary'))
);

-- Create user_achievements junction table
CREATE TABLE public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Enable RLS
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Achievements are viewable by everyone
CREATE POLICY "Achievements are publicly viewable"
ON public.achievements FOR SELECT
TO authenticated
USING (true);

-- User achievements policies
CREATE POLICY "Users can view all user achievements"
ON public.user_achievements FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can earn achievements"
ON public.user_achievements FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Insert some starter achievements
INSERT INTO public.achievements (name, description, icon, xp_reward, rarity) VALUES
('First Steps', 'Complete your first quest', 'footprints', 50, 'common'),
('Quick Learner', 'Complete 5 quests', 'zap', 100, 'common'),
('Knowledge Seeker', 'Complete 10 quests', 'book-open', 200, 'rare'),
('Team Player', 'Join your first learning room', 'users', 75, 'common'),
('Streak Starter', 'Maintain a 3-day streak', 'flame', 100, 'common'),
('Dedicated Scholar', 'Maintain a 7-day streak', 'trophy', 250, 'rare'),
('Master Mind', 'Reach level 10', 'crown', 500, 'epic'),
('Legend', 'Reach level 25', 'star', 1000, 'legendary');