export interface commentSchema {
  by: {
    userName: string;
    id: string;
  };
  comment: string;
  reactions: {
    dislike: { id: string }[];
    like: { id: string }[];
  };
  animeEpId: number;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
}
