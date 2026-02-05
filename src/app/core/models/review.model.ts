// src/app/features/reviews/models/review.model.ts

export interface Review {
  id: number;
  customerName: string;
  customerInitial: string;
  rating: number;
  reviewText: string;
  date: string;
  status: ReviewStatus;
  product: ReviewProduct;
  reply?: ReviewReply;
  images: string[];
}

export interface ReviewProduct {
  name: string;
  code: string;
  category: string;
  image: string;
}

export interface ReviewReply {
  text: string;
  author: string;
  date: string;
}

export type ReviewStatus = 'published' | 'pending' | 'hidden' | 'rejected';

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  pendingReviews: number;
  negativeReviews: number;
}

export interface ReviewFilters {
  rating: string;
  status: string;
  dateFrom: string;
  dateTo: string;
  product: string;
  search: string;
}
