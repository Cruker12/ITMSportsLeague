import { SponsorCategory } from '../utils/constants';

export interface SponsorRequest {
  name: string;
  contactEmail: string;
  phone?: string | null;
  websiteUrl?: string | null;
  category: SponsorCategory;
}

export interface SponsorResponse {
  id: number;
  name: string;
  contactEmail: string;
  phone?: string | null;
  websiteUrl?: string | null;
  category: SponsorCategory;
  createdAt: string;
  updatedAt?: string | null;
}

export interface TournamentSponsorRequest {
  tournamentId: number;
  contractAmount: number;
}

export interface TournamentSponsorResponse {
  id: number;
  tournamentId: number;
  tournamentName: string;
  sponsorId: number;
  sponsorName: string;
  contractAmount: number;
  joinedAt: string;
}
