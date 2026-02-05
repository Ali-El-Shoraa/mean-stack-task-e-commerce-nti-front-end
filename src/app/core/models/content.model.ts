// src/app/features/content-management/models/content.model.ts

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  phone: string;
  email: string;
  address: string;
  maintenanceMode: boolean;
}

export interface HeroSection {
  image: string;
  title: string;
  description: string;
  textColor: 'light' | 'dark';
  button1Text: string;
  button1Link: string;
  enabled: boolean;
}

export interface Offer {
  code: string;
  discount: number;
  description: string;
  startDate: string;
  endDate: string;
  minAmount: number;
  maxUses: number;
  active: boolean;
}

export interface Banner {
  id: number;
  image: string;
  text: string;
  link: string;
  position: 'top' | 'middle' | 'bottom';
  active: boolean;
}

export interface AdSlot {
  id: string;
  name: string;
  location: string;
  size: string;
  code: string;
  active: boolean;
}

export interface SeoSettings {
  pageTitle: string;
  pageDescription: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  ogType: string;
  enableSitemap: boolean;
  enableRobotsTxt: boolean;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  order: number;
}

export interface ContactInfo {
  title: string;
  description: string;
  fullAddress: string;
  mainPhone: string;
  whatsappNumber: string;
  email: string;
  workingHours: string;
}

export interface ContactCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  items: { label: string; value: string }[];
  active: boolean;
}

export interface SocialMedia {
  platform: string;
  icon: string;
  color: string;
  url: string;
}

export interface MapSettings {
  title: string;
  locationTitle: string;
  locationDescription: string;
  latitude: string;
  longitude: string;
  showMap: boolean;
  enableDirections: boolean;
}

export interface AboutHeader {
  title: string;
  description: string;
  backgroundImage: string;
}

export interface OurStory {
  title: string;
  description: string;
  text1: string;
  text2: string;
  image: string;
}

export interface MissionVision {
  missionTitle: string;
  missionText: string;
  missionIcon: string;
  visionTitle: string;
  visionText: string;
  visionIcon: string;
}

export interface ValueItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  bio: string;
  socialLinks: { platform: string; url: string }[];
}

export interface StatItem {
  id: number;
  icon: string;
  value: string;
  label: string;
  suffix: string;
}

export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  description: string;
}

export type ContentTab = 'home' | 'contact' | 'about';
export type HomeSection =
  | 'site-settings'
  | 'hero-section'
  | 'offers'
  | 'banners'
  | 'ads'
  | 'meta-seo'
  | 'policies'
  | 'faq';
export type ContactSection =
  | 'contact-info'
  | 'contact-form'
  | 'contact-cards'
  | 'map-section'
  | 'social-media'
  | 'faq-preview';
export type AboutSection =
  | 'about-header'
  | 'our-story'
  | 'mission-vision'
  | 'our-values'
  | 'our-team'
  | 'our-stats'
  | 'timeline';
