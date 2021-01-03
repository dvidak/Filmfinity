/**
 * Interface for Facebook Graphi API liked movies response.
 */
export type FbLike = {
  id: string;
  genre?: string;
  name?: string;
  verification_status: 'blue_verified' | 'not_verified';
  category?: string;
  birthday?: string;
};
