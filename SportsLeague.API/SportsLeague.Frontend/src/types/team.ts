export interface TeamRequest {
  name: string;
  city: string;
  stadium: string;
  logoUrl?: string | null;
  foundedDate: string;
}

export interface TeamResponse {
  id: number;
  name: string;
  city: string;
  stadium: string;
  logoUrl?: string | null;
  foundedDate: string;
  createdAt: string;
  updatedAt?: string | null;
}
