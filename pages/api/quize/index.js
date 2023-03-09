const animeQuize = require("aniquiz");

export default function handler(req, res) {
  const q = animeQuize.getEntry();
  console.log(q);
  res.status(200).json({ data: q });
}
