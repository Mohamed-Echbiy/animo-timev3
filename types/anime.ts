export interface anime {
  id: string;
  malId: number;
  title: {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
  };
  status: string;
  image: string;
  cover: string;
  popularity: number;
  description: string;
  rating: number;
  genres: string[];
  color: string;
  totalEpisodes: number;
  type: string;
  releaseDate: number;
}
