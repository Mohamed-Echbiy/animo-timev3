export interface relations {
  id: number;
  relationType: string;
  malId: number;
  title: {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
  };
  status: string;
  episodes: number;
  image: string;
  color: string;
  type: string;
  cover: string;
  rating: number;
  genres?: string[];
}
