// ========== PAGINATION ==========
export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// ========== AUTH ==========
export interface LoginRequest {
  email: string;
  password: string;
}
export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

// ========== DESTINATIONS ==========
export interface Destination {
  id: string;
  name: string;
  slug: string;
  coverImage: string;
  description?: string;
  country?: string;
  featured?: boolean;
}
export interface CreateDestinationRequest {
  name: string;
  slug: string;
  coverImage: string;
  description?: string;
  country?: string;
  featured?: boolean;
}

// ========== PROGRAMS ==========
export interface Program {
  id: string;
  destinationId: string;
  title: string;
  slug: string;
  price: number;
  durationDays: number;
  maxPeople: number;
  includes: string;
  excludes: string;
  itineraryJson: string;
  galleryJson: string;
  seoTitle?: string;
  seoDescription?: string;
  featured: boolean;
  active: boolean;
  destination?: Destination;
}
export interface CreateProgramRequest {
  destinationId: string;
  title: string;
  slug: string;
  price: number;
  durationDays: number;
  maxPeople: number;
  includes: string;
  excludes: string;
  itineraryJson: string;
  galleryJson: string;
  seoTitle?: string;
  seoDescription?: string;
  featured: boolean;
  active: boolean;
}

// ========== ARTICLES ==========
export interface Article {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  publishedAt: string;
  content?: string;
}
export interface CreateArticleRequest {
  title: string;
  slug: string;
  coverImage: string;
  content?: string;
}

// ========== OFFERS ==========
export enum OfferType {
  Percentage = 1,
  Fixed = 2,
  Bundle = 3,
}
export interface Offer {
  id: string;
  title: string;
  type: OfferType;
  value: number;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}
export interface CreateOfferRequest {
  title: string;
  type: OfferType;
  value: number;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

// ========== LEADS ==========
export enum BookingStatus {
  Pending = 0,
  Confirmed = 1,
  Cancelled = 2,
}
export enum LeadSource {
  Website = 0,
  Phone = 1,
  Social = 2,
}
export interface Lead {
  id: string;
  name: string;
  phone: string;
  travelersCount: number;
  destinationName: string | null;
  departureCity: string;
  travelDate: string;
  durationDays: number;
  source: number;
  status: number;
  createdAt: string;
}
export interface CreateLeadRequest {
  name: string;
  email: string;
  phone: string;
  message?: string;
  programId?: string;
  source?: LeadSource;
}
export interface UpdateLeadStatusRequest {
  status: BookingStatus;
}

// ========== QUIZ ==========
export interface QuizRequest {
  answers: Record<string, string>;
}
