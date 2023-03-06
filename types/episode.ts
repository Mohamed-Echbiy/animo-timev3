export interface episode {
  thumbnail: string;
  message: string;
  download: string;
  headers: {
    Referer: string;
  };
  sources: {
    isM3U8: boolean;
    quality: string;
    url: string;
  }[];
  title: string;
  totalEp: string | number;
}
