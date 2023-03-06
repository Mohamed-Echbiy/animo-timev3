export const addToFavorites = async (info: {
  by: string;
  id: string;
  title: string;
  image: string;
  rating: number;
  type: String;
  // genres: string[] | undefined;
}) => {
  const send = await fetch(`https://animotime.onrender.com/api/addFavorite/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...info }),
  });
  console.log(send.json());
};
