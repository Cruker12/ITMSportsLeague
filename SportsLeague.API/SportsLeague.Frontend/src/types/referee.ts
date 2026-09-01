export interface RefereeRequest {
  firstName: string;
  lastName: string;
  nationality: string;
}

export interface RefereeResponse {
  id: number;
  firstName: string;
  lastName: string;
  nationality: string;
  createdAt: string;
  updatedAt?: string | null;
}
