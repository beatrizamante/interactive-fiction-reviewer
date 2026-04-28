'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  BookOpen,
  Sparkles,
  Upload,
  Link as LinkIcon,
  ImageIcon,
  Tag,
} from 'lucide-react';
import { fictionsApi } from '@/app/api/fictions';

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const GENRES = [
  'Fantasy',
  'Sci-Fi',
  'Mystery',
  'Romance',
  'Horror',
  'Adventure',
  'Historical',
  'Comedy',
  'Drama',
  'Thriller',
];

const PLATFORMS = [
  'Twine',
  'ChoiceScript',
  'Ink',
  "Ren'Py",
  'Quest',
  'Inform',
  'TADS',
  'Custom Engine',
  'Web-based',
  'Other',
];

export function CreateStoryModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateStoryModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [storyUrl, setStoryUrl] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [chapters, setChapters] = useState('');
  const [endings, setEndings] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [tags, setTags] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : prev.length < 3
          ? [...prev, genre]
          : prev,
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await fictionsApi.create({
        title: title.trim(),
        link: storyUrl.trim(),
        description: description.trim() || undefined,
        genre:
          selectedGenres.length > 0 ? selectedGenres.join(', ') : undefined,
      });
      onClose();
      resetForm();
      onSuccess?.();
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      setError(
        Array.isArray(msg)
          ? msg.join(', ')
          : (msg ?? 'Erro ao criar história. Tente novamente.'),
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStoryUrl('');
    setCoverUrl('');
    setSelectedGenres([]);
    setSelectedPlatform('');
    setChapters('');
    setEndings('');
    setEstimatedTime('');
    setTags('');
    setStep(1);
    setError(null);
  };

  const canProceedStep1 =
    title.trim() && description.trim() && selectedGenres.length > 0;
  const canProceedStep2 = storyUrl.trim() && selectedPlatform;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 font-serif text-2xl">
            <div className="p-2 rounded-lg bg-primary/20">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            {step === 1
              ? 'Create Your Story'
              : step === 2
                ? 'Story Details'
                : 'Final Touches'}
          </DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 py-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  s <= step
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-1 rounded transition-colors ${
                    s < step ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Story Title <span className="text-destructive">*</span>
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your story's title"
                  className="bg-input border-border focus:border-primary focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Description <span className="text-destructive">*</span>
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a compelling description of your interactive fiction..."
                  className="bg-input border-border focus:border-primary focus:ring-primary min-h-[120px] resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {description.length}/500 characters
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Genres <span className="text-destructive">*</span>
                  <span className="text-muted-foreground font-normal ml-2">
                    (Select up to 3)
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {GENRES.map((genre) => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => toggleGenre(genre)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedGenres.includes(genre)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="button"
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Continue
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 2: Story Details */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-primary" />
                  Story URL <span className="text-destructive">*</span>
                </label>
                <Input
                  value={storyUrl}
                  onChange={(e) => setStoryUrl(e.target.value)}
                  placeholder="https://example.com/your-story"
                  className="bg-input border-border focus:border-primary focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground">
                  Link to where readers can play your story
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-primary" />
                  Cover Image URL
                </label>
                <Input
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                  placeholder="https://example.com/cover-image.jpg"
                  className="bg-input border-border focus:border-primary focus:ring-primary"
                />
                {coverUrl && (
                  <div className="mt-2 p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-2">
                      Preview:
                    </p>
                    <div className="w-24 h-32 bg-secondary rounded overflow-hidden">
                      <img
                        src={coverUrl}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Platform / Engine <span className="text-destructive">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PLATFORMS.map((platform) => (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => setSelectedPlatform(platform)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${
                        selectedPlatform === platform
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 border-border hover:bg-muted"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Continue
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Final Details */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Chapters
                  </label>
                  <Input
                    type="number"
                    value={chapters}
                    onChange={(e) => setChapters(e.target.value)}
                    placeholder="e.g., 12"
                    min="1"
                    className="bg-input border-border focus:border-primary focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Endings
                  </label>
                  <Input
                    type="number"
                    value={endings}
                    onChange={(e) => setEndings(e.target.value)}
                    placeholder="e.g., 7"
                    min="1"
                    className="bg-input border-border focus:border-primary focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Play Time
                  </label>
                  <Input
                    value={estimatedTime}
                    onChange={(e) => setEstimatedTime(e.target.value)}
                    placeholder="e.g., 2-3 hrs"
                    className="bg-input border-border focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" />
                  Tags
                </label>
                <Input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="choice-based, branching narrative, multiple endings..."
                  className="bg-input border-border focus:border-primary focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground">
                  Separate tags with commas
                </p>
              </div>

              {/* Preview Card */}
              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <p className="text-sm font-medium text-foreground mb-3">
                  Story Preview
                </p>
                <div className="flex gap-4">
                  <div className="w-20 h-28 bg-secondary rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                    {coverUrl ? (
                      <img
                        src={coverUrl}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <BookOpen className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-semibold text-foreground truncate">
                      {title || 'Your Story Title'}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {description ||
                        'Your story description will appear here...'}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedGenres.map((genre) => (
                        <span
                          key={genre}
                          className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded-full"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1 border-border hover:bg-muted"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {loading ? (
                    'Publicando...'
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Publish Story
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>

        {/* Tips */}
        {error && (
          <div className="mt-2 p-3 bg-destructive/10 rounded-lg border border-destructive/30">
            <p className="text-xs text-destructive">{error}</p>
          </div>
        )}
        <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-xs text-primary flex items-start gap-2">
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
            {step === 1 &&
              'A great description helps readers discover your story. Be specific about themes and tone!'}
            {step === 2 &&
              'Make sure your story link works and is publicly accessible before publishing.'}
            {step === 3 &&
              'Adding details like chapter count and endings helps readers know what to expect.'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
