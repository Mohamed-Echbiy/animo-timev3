export interface recommndation {
  id: string;
  malId: string;
  title: {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
  };
  status: string;
  episodes: number;
  image: string;
  cover: string;
  rating: number;
  type: string;
  genres?: string[];
}
