import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Sparkles, 
  Star, 
  Users,
  ExternalLink,
  ChevronLeft,
  Calendar,
  MapPin,
  Globe,
  Twitter,
  Mail
} from "lucide-react"
import { StoryCard } from "@/components/story-card"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function AuthorPage({ params }: PageProps) {
  const { id } = await params
  
  // In a real app, fetch author data based on id
  const author = getAuthorById(id)

  if (!author) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-foreground mb-2">Author not found</h1>
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
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full" />
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

        {/* Author Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-card border border-border/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl md:text-5xl font-serif font-bold text-foreground/80">
                  {author.name.charAt(0)}
                </span>
              </div>
            </div>
          </div>

          {/* Author Info */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
              {author.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              {author.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {author.location}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Member since {author.memberSince}
              </div>
            </div>

            <p className="text-muted-foreground max-w-2xl mb-6 leading-relaxed">
              {author.bio}
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {author.website && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="bg-secondary/30 border-border/50 hover:bg-secondary/50 text-foreground"
                >
                  <a href={author.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 mr-2" />
                    Website
                  </a>
                </Button>
              )}
              {author.twitter && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="bg-secondary/30 border-border/50 hover:bg-secondary/50 text-foreground"
                >
                  <a href={`https://twitter.com/${author.twitter}`} target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4 mr-2" />
                    @{author.twitter}
                  </a>
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="bg-secondary/30 border-border/50 hover:bg-secondary/50 text-foreground"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <div className="text-2xl font-serif font-bold text-foreground">{author.storyCount}</div>
                <div className="text-xs text-muted-foreground">Stories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-serif font-bold text-foreground">{author.totalReviews}</div>
                <div className="text-xs text-muted-foreground">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-serif font-bold text-foreground flex items-center gap-1">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  {author.avgRating}
                </div>
                <div className="text-xs text-muted-foreground">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-serif font-bold text-foreground">{author.followers}</div>
                <div className="text-xs text-muted-foreground">Followers</div>
              </div>
            </div>
          </div>

          {/* Follow Button */}
          <div className="flex-shrink-0">
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
            >
              <Users className="w-4 h-4 mr-2" />
              Follow
            </Button>
          </div>
        </div>

        {/* Author's Stories */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground">
              Stories by {author.name}
            </h2>
            <span className="text-sm text-muted-foreground">
              {author.stories.length} {author.stories.length === 1 ? "story" : "stories"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {author.stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </section>

        {/* Author Links Section */}
        <section className="mt-16 p-8 rounded-2xl bg-card/50 border border-border/50">
          <h2 className="text-xl font-serif font-semibold text-foreground mb-4">
            Find More from {author.name}
          </h2>
          <p className="text-muted-foreground mb-6">
            Visit the {"author's"} official website or external platforms to discover more of their work.
          </p>
          
          <div className="flex flex-wrap gap-3">
            {author.externalLinks.map((link) => (
              <Button
                key={link.label}
                variant="outline"
                asChild
                className="bg-secondary/30 border-border/50 hover:bg-secondary/50 text-foreground"
              >
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {link.label}
                </a>
              </Button>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

function getAuthorById(id: string) {
  const authors: Record<string, Author> = {
    "a1": {
      id: "a1",
      name: "Elena Marsh",
      location: "Portland, Oregon",
      memberSince: "2022",
      bio: "Elena Marsh writes mysteries that blur the line between the mundane and the supernatural. A former lighthouse tour guide, she draws on coastal folklore and her love of atmospheric settings to create stories where every shadow might hide a secret. When not writing, she can be found hiking foggy trails or visiting historical sites for 'research purposes.'",
      website: "https://elenamarsh.com",
      twitter: "elenamarshwrites",
      storyCount: 4,
      totalReviews: 892,
      avgRating: 4.7,
      followers: 2341,
      stories: [
        {
          id: "1",
          title: "The Forgotten Lighthouse",
          author: { id: "a1", name: "Elena Marsh" },
          genre: "Mystery",
          rating: 4.8,
          reviewCount: 324,
          description: "A storm-battered coast holds secrets from a century past. Your choices will illuminate the truth.",
          wordCount: 45000,
          playTime: "3-4 hours",
          tags: ["detective", "atmospheric", "multiple endings"]
        },
        {
          id: "9",
          title: "The Séance at Silverbrook",
          author: { id: "a1", name: "Elena Marsh" },
          genre: "Mystery",
          rating: 4.6,
          reviewCount: 256,
          description: "A Victorian medium. A skeptical journalist. A séance that goes terribly wrong.",
          wordCount: 38000,
          playTime: "2-3 hours",
          tags: ["historical", "supernatural", "investigation"]
        },
        {
          id: "10",
          title: "Tides of Memory",
          author: { id: "a1", name: "Elena Marsh" },
          genre: "Mystery",
          rating: 4.7,
          reviewCount: 198,
          description: "Returning to your hometown after 20 years, you find that some memories were better left buried.",
          wordCount: 52000,
          playTime: "4-5 hours",
          tags: ["small town", "family secrets", "noir"]
        },
        {
          id: "11",
          title: "The Cartographer's Daughter",
          author: { id: "a1", name: "Elena Marsh" },
          genre: "Adventure",
          rating: 4.5,
          reviewCount: 114,
          description: "Your father left behind a map to a place that shouldn't exist. Now you must decide whether to follow it.",
          wordCount: 61000,
          playTime: "5-6 hours",
          tags: ["exploration", "family", "puzzles"]
        }
      ],
      externalLinks: [
        { label: "IFDB Profile", url: "https://ifdb.org" },
        { label: "Itch.io Store", url: "https://itch.io" },
        { label: "Patreon", url: "https://patreon.com" }
      ]
    },
    "a2": {
      id: "a2",
      name: "Marcus Webb",
      location: "Austin, Texas",
      memberSince: "2021",
      bio: "Marcus Webb is a science fiction author and former game designer who specializes in epic, branching narratives. His work explores themes of exploration, diplomacy, and the moral complexities of being human in an increasingly alien universe. He's known for creating rich, diverse casts of characters and stories that reward multiple playthroughs.",
      website: "https://marcuswebb.io",
      twitter: "marcuswebbsf",
      storyCount: 3,
      totalReviews: 1247,
      avgRating: 4.5,
      followers: 3892,
      stories: [
        {
          id: "2",
          title: "Starbound Chronicles",
          author: { id: "a2", name: "Marcus Webb" },
          genre: "Sci-Fi",
          rating: 4.6,
          reviewCount: 512,
          description: "Captain your own vessel through uncharted galaxies where every decision echoes across the cosmos.",
          wordCount: 120000,
          playTime: "8-12 hours",
          tags: ["space opera", "crew management", "branching narrative"]
        },
        {
          id: "12",
          title: "First Contact Protocol",
          author: { id: "a2", name: "Marcus Webb" },
          genre: "Sci-Fi",
          rating: 4.4,
          reviewCount: 389,
          description: "You're humanity's first ambassador to an alien species. Don't mess this up.",
          wordCount: 75000,
          playTime: "6-8 hours",
          tags: ["diplomacy", "aliens", "first contact"]
        },
        {
          id: "13",
          title: "The Last Colony Ship",
          author: { id: "a2", name: "Marcus Webb" },
          genre: "Sci-Fi",
          rating: 4.5,
          reviewCount: 346,
          description: "Generation ship survival. Resources are limited. Moral choices are not.",
          wordCount: 89000,
          playTime: "7-9 hours",
          tags: ["generation ship", "survival", "society"]
        }
      ],
      externalLinks: [
        { label: "IFDB Profile", url: "https://ifdb.org" },
        { label: "Choice of Games", url: "https://choiceofgames.com" }
      ]
    },
    "a3": {
      id: "a3",
      name: "Amelia Chen",
      location: "Vancouver, Canada",
      memberSince: "2020",
      bio: "Amelia Chen writes stories that exist in the liminal spaces between reality and dream. Her work often explores themes of memory, loss, and the quiet magic hidden in everyday life. A poet by training, she brings a lyrical sensibility to interactive fiction, crafting experiences that linger long after the final choice is made.",
      website: "https://ameliachen.garden",
      twitter: "ameliachenwrite",
      storyCount: 5,
      totalReviews: 1856,
      avgRating: 4.8,
      followers: 5234,
      stories: [
        {
          id: "3",
          title: "Whispers in the Garden",
          author: { id: "a3", name: "Amelia Chen" },
          genre: "Fantasy",
          rating: 4.9,
          reviewCount: 678,
          description: "An enchanted garden where flowers speak and paths shift. Find the heart of the maze before dawn.",
          wordCount: 32000,
          playTime: "2-3 hours",
          tags: ["magical realism", "puzzle", "time limit"]
        },
        {
          id: "14",
          title: "The Memory Keeper",
          author: { id: "a3", name: "Amelia Chen" },
          genre: "Fantasy",
          rating: 4.8,
          reviewCount: 534,
          description: "You collect other people's forgotten memories. But whose memories are your own?",
          wordCount: 28000,
          playTime: "2-3 hours",
          tags: ["identity", "poetic", "emotional"]
        },
        {
          id: "15",
          title: "Paper Lanterns",
          author: { id: "a3", name: "Amelia Chen" },
          genre: "Fantasy",
          rating: 4.9,
          reviewCount: 412,
          description: "A festival night where the veil between worlds grows thin. Light a lantern. Make a wish.",
          wordCount: 24000,
          playTime: "1-2 hours",
          tags: ["festival", "wishes", "bittersweet"]
        }
      ],
      externalLinks: [
        { label: "IFDB Profile", url: "https://ifdb.org" },
        { label: "Itch.io Store", url: "https://itch.io" },
        { label: "Ko-fi", url: "https://ko-fi.com" }
      ]
    }
  }

  return authors[id] || authors["a1"]
}

interface Story {
  id: string
  title: string
  author: { id: string; name: string }
  genre: string
  rating: number
  reviewCount: number
  description: string
  wordCount: number
  playTime: string
  tags: string[]
}

interface Author {
  id: string
  name: string
  location: string | null
  memberSince: string
  bio: string
  website: string | null
  twitter: string | null
  storyCount: number
  totalReviews: number
  avgRating: number
  followers: number
  stories: Story[]
  externalLinks: { label: string; url: string }[]
}
