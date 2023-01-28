export interface trending {
  id: string;
  malId: number;
  title: {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
  };
  image: string;
  trailer: {
    site: string;
    id: string;
    thumbnail: string;
  };
  description: string;
  cover: string;
  rating: number;
  releasedDate: number;
  totalEpisodes: number;
  genres: string[];
  duration: number;
  type: string;
}
