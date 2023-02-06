export const removeFavorite = async (body: { by: string; id: string }) => {
  const send = await fetch(
    `https://animotime.onrender.com/api/removeFavorite`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body }),
    }
  );
};
