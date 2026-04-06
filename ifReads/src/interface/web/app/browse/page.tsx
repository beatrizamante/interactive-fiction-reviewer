"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  BookOpen, 
  Sparkles, 
  Search, 
  Star, 
  Filter,
  SlidersHorizontal,
  Grid3X3,
  List,
  ChevronDown,
  Clock,
  TrendingUp,
  Heart
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StoryCard } from "@/components/story-card"

const genres = [
  "All Genres",
  "Mystery",
  "Sci-Fi", 
  "Fantasy",
  "Horror",
  "Romance",
  "Adventure",
  "Historical",
  "Thriller",
  "Comedy"
]

const sortOptions = [
  { value: "popular", label: "Most Popular", icon: TrendingUp },
  { value: "rating", label: "Highest Rated", icon: Star },
  { value: "recent", label: "Most Recent", icon: Clock },
  { value: "favorites", label: "Most Favorited", icon: Heart },
]

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All Genres")
  const [sortBy, setSortBy] = useState("popular")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const currentSort = sortOptions.find(s => s.value === sortBy) || sortOptions[0]

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full" />
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

          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/browse" 
              className="text-foreground font-medium"
            >
              Browse
            </Link>
            <Link 
              href="/browse?sort=rating" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Top Rated
            </Link>
            <Link 
              href="/browse?filter=new" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              New Releases
            </Link>
          </div>

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

      {/* Main Content */}
      <main className="relative z-10 px-6 md:px-12 lg:px-20 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
            Browse Interactive Fiction
          </h1>
          <p className="text-muted-foreground">
            Discover stories where your choices matter
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search stories, authors, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/50 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Genre Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="bg-secondary/30 border-border/50 hover:bg-secondary/50 text-foreground gap-2"
                >
                  <Filter className="w-4 h-4" />
                  {selectedGenre}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border/50">
                {genres.map((genre) => (
                  <DropdownMenuItem
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={selectedGenre === genre ? "bg-primary/10 text-primary" : "text-foreground"}
                  >
                    {genre}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="bg-secondary/30 border-border/50 hover:bg-secondary/50 text-foreground gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  {currentSort.label}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border/50">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={sortBy === option.value ? "bg-primary/10 text-primary" : "text-foreground"}
                  >
                    <option.icon className="w-4 h-4 mr-2" />
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View Toggle */}
            <div className="flex items-center rounded-lg border border-border/50 bg-secondary/30 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Genre Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {genres.slice(1).map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre === selectedGenre ? "All Genres" : genre)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                genre === selectedGenre
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground border border-border/50"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-muted-foreground">
          Showing <span className="text-foreground font-medium">{stories.length}</span> stories
          {selectedGenre !== "All Genres" && (
            <> in <span className="text-primary">{selectedGenre}</span></>
          )}
        </div>

        {/* Stories Grid/List */}
        <div className={
          viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "flex flex-col gap-4"
        }>
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} viewMode={viewMode} />
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="bg-secondary/30 border-border/50 hover:bg-secondary/50 text-foreground"
          >
            Load More Stories
          </Button>
        </div>
      </main>
    </div>
  )
}

const stories = [
  {
    id: "1",
    title: "The Forgotten Lighthouse",
    author: { id: "a1", name: "Elena Marsh" },
    genre: "Mystery",
    rating: 4.8,
    reviewCount: 324,
    description: "A storm-battered coast holds secrets from a century past. Your choices will illuminate the truth or let it sink into the darkness forever.",
    wordCount: 45000,
    playTime: "3-4 hours",
    tags: ["detective", "atmospheric", "multiple endings"]
  },
  {
    id: "2", 
    title: "Starbound Chronicles",
    author: { id: "a2", name: "Marcus Webb" },
    genre: "Sci-Fi",
    rating: 4.6,
    reviewCount: 512,
    description: "Captain your own vessel through uncharted galaxies where every decision echoes across the cosmos and shapes the fate of civilizations.",
    wordCount: 120000,
    playTime: "8-12 hours",
    tags: ["space opera", "crew management", "branching narrative"]
  },
  {
    id: "3",
    title: "Whispers in the Garden",
    author: { id: "a3", name: "Amelia Chen" },
    genre: "Fantasy",
    rating: 4.9,
    reviewCount: 678,
    description: "An enchanted garden where flowers speak and paths shift. Find the heart of the maze before dawn breaks the spell forever.",
    wordCount: 32000,
    playTime: "2-3 hours",
    tags: ["magical realism", "puzzle", "time limit"]
  },
  {
    id: "4",
    title: "Midnight at Blackwood Manor",
    author: { id: "a4", name: "Victoria Gray" },
    genre: "Horror",
    rating: 4.7,
    reviewCount: 445,
    description: "The manor has been waiting for you. Each room holds a memory, each corridor a choice. Will you uncover the truth or become part of its history?",
    wordCount: 55000,
    playTime: "4-5 hours",
    tags: ["gothic", "psychological", "survival"]
  },
  {
    id: "5",
    title: "The Last Diplomat",
    author: { id: "a5", name: "James Liu" },
    genre: "Thriller",
    rating: 4.5,
    reviewCount: 289,
    description: "War looms on the horizon. As the empire's final ambassador, your words carry the weight of nations. Choose them carefully.",
    wordCount: 78000,
    playTime: "5-7 hours",
    tags: ["political intrigue", "dialogue-heavy", "consequences"]
  },
  {
    id: "6",
    title: "Echoes of Avalon",
    author: { id: "a6", name: "Morgan Blake" },
    genre: "Fantasy",
    rating: 4.8,
    reviewCount: 534,
    description: "Arthurian legend reimagined. Play as Morgana, Lancelot, or Guinevere in this epic tale where loyalty and love collide.",
    wordCount: 95000,
    playTime: "7-9 hours",
    tags: ["mythology", "romance", "multiple protagonists"]
  },
  {
    id: "7",
    title: "Neon Dreams",
    author: { id: "a7", name: "Kai Tanaka" },
    genre: "Sci-Fi",
    rating: 4.4,
    reviewCount: 198,
    description: "In a cyberpunk megacity, you're a memory hacker with a past you can't remember. Download the truth before it's deleted forever.",
    wordCount: 62000,
    playTime: "4-6 hours",
    tags: ["cyberpunk", "noir", "identity"]
  },
  {
    id: "8",
    title: "The Heist at Hartwell",
    author: { id: "a8", name: "Olivia Stone" },
    genre: "Adventure",
    rating: 4.6,
    reviewCount: 367,
    description: "Assemble your crew. Plan your approach. Execute the perfect heist or watch it all fall apart. Every member has their own agenda.",
    wordCount: 48000,
    playTime: "3-5 hours",
    tags: ["heist", "team dynamics", "planning"]
  }
]
