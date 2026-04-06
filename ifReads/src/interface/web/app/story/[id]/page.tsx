import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Sparkles, 
  Star, 
  Clock, 
  FileText, 
  Heart,
  Share2,
  ExternalLink,
  ChevronLeft,
  User,
  Calendar,
  MessageSquare,
  ThumbsUp
} from "lucide-react"
import { ReviewSection } from "@/components/review-section"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { id } = await params
  
  // In a real app, fetch story data based on id
  const story = getStoryById(id)

  if (!story) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-foreground mb-2">Story not found</h1>
          <Link href="/browse" className="text-primary hover:text-primary/80">
            Back to Browse
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <BookOpen className="w-7 h-7 text-primary transition-transform group-hover:scale-110" />
              <Sparkles className="w-2.5 h-2.5 text-teal-glow absolute -top-0.5 -right-0.5" />
            </div>
            <span className="text-xl font-serif font-semibold text-foreground">
              ifReads
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-primary hover:bg-primary/10"
            >
              Login
            </Button>
            <Button 
              className="bg-primary/90 text-primary-foreground hover:bg-primary"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 px-6 md:px-12 lg:px-20 py-8">
        {/* Back Link */}
        <Link 
          href="/browse"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Browse
        </Link>

        {/* Story Header */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Cover */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="aspect-[3/4] rounded-2xl bg-card border border-border/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="w-20 h-20 text-primary/40" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 space-y-3">
              <Button 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                size="lg"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Play Story
              </Button>
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  className="flex-1 bg-secondary/30 border-border/50 hover:bg-secondary/50 text-foreground"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Favorite
                </Button>
                <Button 
                  variant="outline"
                  className="bg-secondary/30 border-border/50 hover:bg-secondary/50 text-foreground"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Story Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                {story.genre}
              </span>
              {story.tags.map((tag) => (
                <span 
                  key={tag}
                  className="text-sm px-3 py-1 rounded-full bg-secondary/50 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
              {story.title}
            </h1>

            <Link 
              href={`/author/${story.author.id}`}
              className="inline-flex items-center gap-2 text-lg text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <User className="w-4 h-4" />
              by {story.author.name}
            </Link>

            {/* Rating Summary */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(story.rating) 
                          ? "fill-primary text-primary" 
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xl font-semibold text-foreground">{story.rating}</span>
                <span className="text-muted-foreground">({story.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{story.playTime}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="w-4 h-4" />
                <span>{(story.wordCount / 1000).toFixed(0)}k words</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Published {story.publishedDate}</span>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none">
              <h2 className="text-lg font-semibold text-foreground mb-3">About this Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                {story.fullDescription}
              </p>
            </div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {story.features.map((feature) => (
                <div 
                  key={feature.label}
                  className="p-4 rounded-xl bg-card/50 border border-border/50 text-center"
                >
                  <div className="text-lg font-semibold text-foreground">{feature.value}</div>
                  <div className="text-xs text-muted-foreground">{feature.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection storyId={id} reviews={story.reviews} />
      </main>
    </div>
  )
}

function getStoryById(id: string) {
  const stories: Record<string, Story> = {
    "1": {
      id: "1",
      title: "The Forgotten Lighthouse",
      author: { id: "a1", name: "Elena Marsh" },
      genre: "Mystery",
      rating: 4.8,
      reviewCount: 324,
      description: "A storm-battered coast holds secrets from a century past.",
      fullDescription: `The year is 1923. A violent storm has revealed the entrance to a cavern beneath the old Hartwick Lighthouse, dormant for fifty years. As the new lighthouse keeper's assistant, you've been tasked with investigating what lies within.

But the lighthouse keeper is hiding something, the townspeople speak in whispers, and the ghost stories about Hartwick Point may be more than mere superstition.

Your choices will determine not just the fate of those around you, but whether the truth sees the light of day—or remains buried forever beneath the churning waves.

This story features multiple branching paths, three distinct endings, and a rich cast of characters whose fates rest in your hands.`,
      wordCount: 45000,
      playTime: "3-4 hours",
      tags: ["detective", "atmospheric", "multiple endings"],
      publishedDate: "March 2025",
      features: [
        { label: "Endings", value: "3" },
        { label: "Chapters", value: "12" },
        { label: "Choices", value: "47" },
        { label: "Characters", value: "8" },
      ],
      reviews: [
        {
          id: "r1",
          user: { name: "StoryExplorer", avatar: null },
          rating: 5,
          date: "2 days ago",
          content: "Absolutely captivating! The atmosphere is thick enough to cut with a knife, and every choice felt meaningful. I've played through twice already and discovered completely different storylines. Elena Marsh has outdone herself.",
          helpful: 24,
        },
        {
          id: "r2",
          user: { name: "MysteryFan92", avatar: null },
          rating: 4,
          date: "1 week ago",
          content: "Great mystery with genuinely surprising twists. The lighthouse setting is perfectly realized. Only complaint is I wish there were more interaction with the townspeople in the second act.",
          helpful: 18,
        },
        {
          id: "r3",
          user: { name: "NarrativeNerd", avatar: null },
          rating: 5,
          date: "2 weeks ago",
          content: "This is why I love interactive fiction. The prose is beautiful, the pacing is perfect, and the mystery kept me guessing until the very end. The 'true' ending made me tear up.",
          helpful: 31,
        },
      ]
    },
    "2": {
      id: "2",
      title: "Starbound Chronicles",
      author: { id: "a2", name: "Marcus Webb" },
      genre: "Sci-Fi",
      rating: 4.6,
      reviewCount: 512,
      description: "Captain your own vessel through uncharted galaxies.",
      fullDescription: `The galaxy is vast, and humanity is just beginning to explore it. As captain of the independent vessel Horizon, you and your crew navigate the frontier of known space—trading, exploring, and occasionally getting into trouble with various factions vying for control of the cosmos.

Your ship. Your crew. Your choices.

Manage relationships with your diverse crew members, each with their own backgrounds, motivations, and secrets. Navigate diplomatic situations between alien species who don't always see eye to eye. Make decisions that will shape not just your story, but the future of interstellar civilization.

With over 120,000 words of content and dozens of major branching points, Starbound Chronicles offers a truly epic interactive experience.`,
      wordCount: 120000,
      playTime: "8-12 hours",
      tags: ["space opera", "crew management", "branching narrative"],
      publishedDate: "January 2025",
      features: [
        { label: "Endings", value: "7" },
        { label: "Chapters", value: "24" },
        { label: "Choices", value: "156" },
        { label: "Characters", value: "15" },
      ],
      reviews: [
        {
          id: "r1",
          user: { name: "SpaceCadet", avatar: null },
          rating: 5,
          date: "3 days ago",
          content: "The scope of this story is incredible. I've spent over 20 hours exploring different paths and I'm still finding new content. The crew dynamics are fantastic.",
          helpful: 42,
        },
        {
          id: "r2",
          user: { name: "SciFiReader", avatar: null },
          rating: 4,
          date: "1 week ago",
          content: "Excellent worldbuilding and characters. The political intrigue between factions is well done. Sometimes the pacing drags in the middle chapters though.",
          helpful: 28,
        },
      ]
    },
    "3": {
      id: "3",
      title: "Whispers in the Garden",
      author: { id: "a3", name: "Amelia Chen" },
      genre: "Fantasy",
      rating: 4.9,
      reviewCount: 678,
      description: "An enchanted garden where flowers speak and paths shift.",
      fullDescription: `You've inherited a garden from a grandmother you never knew. But this is no ordinary garden—the roses whisper secrets, the paths rearrange themselves when you're not looking, and somewhere at its heart lies something precious that's been waiting for you.

You have until dawn to find your way to the center of the maze and discover what your grandmother left behind. But the garden has other inhabitants, some helpful, some not, and time moves strangely among the moonlit flowers.

A lyrical, dreamlike experience that explores themes of family, memory, and the magic hidden in everyday things. Features a real-time element that adds urgency to your exploration.`,
      wordCount: 32000,
      playTime: "2-3 hours",
      tags: ["magical realism", "puzzle", "time limit"],
      publishedDate: "February 2025",
      features: [
        { label: "Endings", value: "5" },
        { label: "Chapters", value: "8" },
        { label: "Choices", value: "32" },
        { label: "Characters", value: "6" },
      ],
      reviews: [
        {
          id: "r1",
          user: { name: "DreamWeaver", avatar: null },
          rating: 5,
          date: "1 day ago",
          content: "Pure magic. The writing is absolutely beautiful—every sentence feels crafted with care. The time mechanic adds real tension without being frustrating. A masterpiece.",
          helpful: 56,
        },
        {
          id: "r2",
          user: { name: "FantasyLover", avatar: null },
          rating: 5,
          date: "5 days ago",
          content: "I cried at the ending. This story touched something deep in me. Amelia Chen understands how to weave emotion into every choice.",
          helpful: 44,
        },
      ]
    }
  }

  return stories[id] || stories["1"]
}

interface Story {
  id: string
  title: string
  author: { id: string; name: string }
  genre: string
  rating: number
  reviewCount: number
  description: string
  fullDescription: string
  wordCount: number
  playTime: string
  tags: string[]
  publishedDate: string
  features: { label: string; value: string }[]
  reviews: Review[]
}

interface Review {
  id: string
  user: { name: string; avatar: string | null }
  rating: number
  date: string
  content: string
  helpful: number
}
