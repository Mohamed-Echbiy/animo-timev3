export interface animeDetail {
  duration: number;
  id: string;
  title: {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
  };
  malId: number;
  subOrDub: string;
  trailer: {
    id: string;
    site: string;
    thumbnail: string;
  }[];
  image: string;
  cover: string;
  popularity: number;
  color: string;
  description: string;
  status: string;
  releaseDate: number;
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  endDate: {
    year: number;
    month: number;
    day: number;
  };
  rating: number;
  genres: string[];
  season: string;
  studios: string[];
  type: string;
  recommendations: {
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
  }[];
  characters: {
    id: string;
    role: string;
    name: {
      full: string;
      first: string;
      last: string | null;
      native: string;
      userPreferred: string;
    };
    image: string;
    voiceActors: {
      id: number;
      image: string;
      language: string;
      name: {
        first: string;
        full: string;
        last: string;
        native: string;
        userPreferred: string;
      };
    }[];
  }[];
  relations: {
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
  }[];
  episodes: {
    description: string;
    id: string;
    title: string;
    episode: string;
    image: string;
  }[];
  countryOfOrigin: string;
  currentEpisode: number;
}
