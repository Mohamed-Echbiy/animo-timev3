export interface recent_episodes {
  id: string;
  malId: number;
  title: {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
  };
  episodeId: string;
  episodeTitle: string;
  episodeNumber: number;
  image: string;
  rating: number;
}
