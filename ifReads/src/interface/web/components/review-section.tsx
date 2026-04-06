"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, ThumbsUp, MessageSquare, User } from "lucide-react"

interface Review {
  id: string
  user: { name: string; avatar: string | null }
  rating: number
  date: string
  content: string
  helpful: number
}

interface ReviewSectionProps {
  storyId: string
  reviews: Review[]
}

export function ReviewSection({ storyId, reviews }: ReviewSectionProps) {
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [newRating, setNewRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState("")

  const handleSubmitReview = () => {
    console.log("[v0] Review submitted:", { storyId, rating: newRating, text: reviewText })
    setShowWriteReview(false)
    setNewRating(0)
    setReviewText("")
  }

  return (
    <section className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-serif font-semibold text-foreground flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          Reviews
        </h2>
        <Button
          onClick={() => setShowWriteReview(!showWriteReview)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Write a Review
        </Button>
      </div>

      {/* Write Review Form */}
      {showWriteReview && (
        <div className="mb-8 p-6 rounded-2xl bg-card border border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Your Review</h3>
          
          {/* Rating Selection */}
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-2 block">Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setNewRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star 
                    className={`w-7 h-7 transition-colors ${
                      star <= (hoverRating || newRating)
                        ? "fill-primary text-primary" 
                        : "text-muted-foreground/30 hover:text-muted-foreground/50"
                    }`}
                  />
                </button>
              ))}
              {newRating > 0 && (
                <span className="ml-2 text-sm text-muted-foreground">
                  {newRating} star{newRating !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>

          {/* Review Text */}
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-2 block">Your thoughts</label>
            <Textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience with this story..."
              className="min-h-[120px] bg-secondary/50 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground resize-none"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowWriteReview(false)}
              className="bg-secondary/30 border-border/50 hover:bg-secondary/50 text-foreground"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReview}
              disabled={newRating === 0 || reviewText.trim() === ""}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Submit Review
            </Button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Load More */}
      {reviews.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="bg-secondary/30 border-border/50 hover:bg-secondary/50 text-foreground"
          >
            Load More Reviews
          </Button>
        </div>
      )}
    </section>
  )
}

function ReviewCard({ review }: { review: Review }) {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful)
  const [hasVoted, setHasVoted] = useState(false)

  const handleHelpful = () => {
    if (!hasVoted) {
      setHelpfulCount(prev => prev + 1)
      setHasVoted(true)
    }
  }

  return (
    <div className="p-6 rounded-2xl bg-card/50 border border-border/50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <User className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <div className="font-medium text-foreground">{review.user.name}</div>
            <div className="text-sm text-muted-foreground">{review.date}</div>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star}
              className={`w-4 h-4 ${
                star <= review.rating 
                  ? "fill-primary text-primary" 
                  : "text-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="text-foreground/90 leading-relaxed mb-4">
        {review.content}
      </p>

      <div className="flex items-center gap-4">
        <button
          onClick={handleHelpful}
          disabled={hasVoted}
          className={`flex items-center gap-2 text-sm transition-colors ${
            hasVoted 
              ? "text-primary cursor-default" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ThumbsUp className={`w-4 h-4 ${hasVoted ? "fill-primary" : ""}`} />
          Helpful ({helpfulCount})
        </button>
      </div>
    </div>
  )
}
