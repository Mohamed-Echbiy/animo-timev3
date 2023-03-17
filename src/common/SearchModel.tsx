import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useContext, useState } from "react";
import { userContext } from "../../pages/_app";

import { CloseIcon, SearchIcon } from "./Icons";
import { InputSuggestions } from "react-input-suggestions";

const animeTitles = [
  "spy x familly",
  "Attack on Titan",
  "One Piece",
  "Naruto",
  "Demon Slayer",
  "Fullmetal Alchemist: Brotherhood",
  "Death Note",
  "Dragon Ball Z",
  "Hunter x Hunter",
  "Sword Art Online",
  "My Hero Academia",
  "Fairy Tail",
  "Bleach",
  "JoJo's Bizarre Adventure",
  "Code Geass",
  "Cowboy Bebop",
  "Neon Genesis Evangelion",
  "Steins;Gate",
  "Gintama",
  "Re:Zero − Starting Life in Another World",
  "Attack on Titan: Junior High",
  "Toradora!",
  "K-On!",
  "Death Parade",
  "Gurren Lagann",
  "The Melancholy of Haruhi Suzumiya",
  "Clannad",
  "Anohana: The Flower We Saw That Day",
  "Your Lie in April",
  "Violet Evergarden",
  "Love Live! School Idol Project",
  "Kill la Kill",
  "Haikyu!!",
  "Black Butler",
  "Fate/Zero",
  "Fate/stay night",
  "Magi: The Labyrinth of Magic",
  "Magi: The Kingdom of Magic",
  "One Punch Man",
  "The Seven Deadly Sins",
  "Tokyo Ghoul",
  "Parasyte",
  "Psycho-Pass",
  "No Game No Life",
  "Log Horizon",
  "Durarara!!",
  "Baccano!",
  "Kuroko's Basketball",
  "The Promised Neverland",
  "Cells at Work!",
  "Erased",
  "The Rising of the Shield Hero",
  "JoJo's Bizarre Adventure: Stardust Crusaders",
  "JoJo's Bizarre Adventure: Diamond is Unbreakable",
  "JoJo's Bizarre Adventure: Golden Wind",
  "Soul Eater",
  "Blue Exorcist",
  "Seven Deadly Sins: Dragon's Judgement",
  "Jujutsu Kaisen",
  "Dr. Stone",
  "Demon Slayer: Kimetsu no Yaiba – Mugen Train",
  "The Quintessential Quintuplets",
  "Black Clover",
  "The God of High School",
  "Tower of God",
  "That Time I Got Reincarnated as a Slime",
  "Fullmetal Alchemist",
  "High School DxD",
  "Overlord",
  "The Irregular at Magic High School",
  "Sword Art Online: Alicization",
  "Sword Art Online: War of Underworld",
  "KonoSuba",
  "Konosuba: God's Blessing on This Wonderful World! Legend of Crimson",
  "Attack on Titan: The Final Season",
  "Re:Zero − Starting Life in Another World Season 2",
  "Naruto Shippuden",
  "Bleach: Memories of Nobody",
  "Dragon Ball Super",
  "Dragon Ball Z: Battle of Gods",
  "Dragon Ball Z: Resurrection 'F'",
  "Death Note: The Last Name",
  "Fullmetal Alchemist: The Sacred Star of Milos",
  "Naruto Shippuden the Movie: The Lost Tower",
  "Naruto Shippuden the Movie: Blood Prison",
  "Naruto Shippuden the Movie: Bonds",
  "Naruto Shippuden the Movie: The Will of Fire",
  "One Piece",
  "Dragon Ball",
  "Dragon Ball GT",
  "Cowboy Bebop: The Movie",
  "The End of Evangelion",
  "Evangelion: 1.11 You Are (Not) Alone",
  "Evangelion: 2.22 You Can (Not) Advance",
  "Evangelion: 3.33 You Can (Not) Redo",
  "Fullmetal Alchemist the Movie: Conqueror of Shamballa",
  "Gintama: The Movie",
  "Gintama: The Final",
  "Hunter x Hunter: Phantom Rouge",
  "Hunter x Hunter: The Last Mission",
  "JoJo's Bizarre Adventure: Phantom Blood",
  "JoJo's Bizarre Adventure: The Animation",
  "JoJo's Bizarre Adventure: Battle Tendency",
  "JoJo's Bizarre Adventure: Diamond is Unbreakable",
  "JoJo's Bizarre Adventure: Golden Wind",
  "K-On!: The Movie",
  "Love Live! The School Idol Movie",
  "My Hero Academia: Two Heroes",
  "My Hero Academia: Heroes Rising",
  "Naruto the Movie: Ninja Clash in the Land of Snow",
  "Naruto the Movie 2: Legend of the Stone of Gelel",
  "Naruto the Movie 3: Guardians of the Crescent Moon Kingdom",
  "Naruto Shippuden the Movie",
  "Naruto Shippuden the Movie: Bonds",
  "Naruto Shippuden the Movie: The Will of Fire",
  "Naruto Shippuden the Movie: The Lost Tower",
  "Naruto Shippuden the Movie: Blood Prison",
  "Neon Genesis Evangelion: Death & Rebirth",
  "Puella Magi Madoka Magica the Movie Part I: Beginnings",
  "Puella Magi Madoka Magica the Movie Part II: Eternal",
  "Puella Magi Madoka Magica the Movie Part III: Rebellion",
  "Sword Art Online The Movie: Ordinal Scale",
  "The Seven Deadly Sins: Prisoners of the Sky",
  "Tokyo Godfathers",
  "Yu-Gi-Oh! The Movie: Pyramid of Light",
  "Yu-Gi-Oh!: The Dark Side of Dimensions",
  "Bungo Stray Dogs: Dead Apple",
  "Fate/kaleid liner Prisma Illya: Oath Under Snow",
  "Fate/Grand Order: First Order",
  "Fate/stay night: Heaven's Feel I. presage flower",
  "Fate/stay night: Heaven's Feel II. lost butterfly",
  "Fate/stay night: Heaven's Feel III. spring song",
  "Gintama: The Final Chapter - Be Forever Yorozuya",
  "Girls und Panzer der Film",
  "Haikyu!! Movie: Talent and Sense",
  "K-On! Movie",
  "Love Live! Sunshine!! The School Idol Movie: Over the Rainbow",
  "Made in Abyss: Dawn of the Deep Soul",
  "My Hero Academia: World Heroes' Mission",
  "Neon Genesis Evangelion: The End of Evangelion",
  "One Piece Film: Gold",
  "One Piece Film: Z",
  "Psycho-Pass: The Movie",
  "Re:Zero kara Hajimeru Isekai Seikatsu - Memory Snow",
  "Rurouni Kenshin Part I: Origins",
  "Rurouni Kenshin Part II: Kyoto Inferno",
  "Rurouni Kenshin Part III: The Legend Ends",
  "Saekano: How to Raise a Boring Girlfriend Fine",
  "Shin Evangelion Gekijō-ban :||",
  "The Seven Deadly Sins: Cursed by Light",
  "Violet Evergarden: The Movie",
  "Yo-kai Watch Movie 1: The Secret Is Created, Nyan!",
  "Yo-kai Watch Movie 2: King Enma and the 5 Stories, Nyan!",
  "Yo-kai Watch Movie 3: The Great Adventure of the Flying Whale & the Double World, Nyan!",
  "Yo-kai Watch Movie 4: Shadowside - Oni-ō no Fukkatsu",
  "Yo-kai Watch Movie 5: Forever Friends",
  "Yo-kai Watch Movie 6: The Yōkai Academy Y – Neko wa Hero ni Nareru ka",
  "Yo-kai Watch Movie 7: The Great Yōkai Gathering",
  "Yo-kai Watch Jam the Movie: Yo-kai Academy Y - Can a Cat be a Hero?",
  "Your Name.",
  "Weathering with You",
  "A Silent Voice",
  "Anohana: The Flower We Saw That Day",
  "Clannad: The Motion Picture",
  "Code Geass: Lelouch of the Rebellion I - Initiation",
  "Code Geass: Lelouch of the Rebellion II - Transgression",
  "Code Geass: Lelouch of the Rebellion III - Glorification",
  "Crayon Shin-chan: The Legend Called: Dance! Amigo!",
  "Crayon Shin-chan: The Legend Called: Buri Buri 3 Minutes Charge",
  "Crayon Shin-chan: The Legend Called: Storming Festival",
  "Crayon Shin-chan: The Legend Called: Dance! Amigo! - And That Other Guy",
  "Crayon Shin-chan: The Legend Called: Singing with the Scary Team",
  "Crayon Shin-chan: The Legend Called: The Adult Empire Strikes Back",
  "Detective Conan: The Fist of Blue Sapphire",
  "Detective Conan: The Scarlet Bullet",
  "Doraemon: Nobita's Chronicle of the Moon Exploration",
  "Dragon Ball Super: Broly",
  "Fate/kaleid liner Prisma Illya: Vow in the Snow",
  "Fate/stay night: Unlimited Blade Works (movie)",
  "Fate/Stay Night: Heaven's Feel I. Presage Flower (movie)",
  "Fate/Stay Night: Heaven's Feel II. Lost Butterfly (movie)",
  "Fate/Stay Night: Heaven's Feel III. Spring Song (movie)",
  "Free! -Take Your Marks-",
  "Free! -Road to the World- The Dream",
  "Free! -Road to the World- Yume",
  "Gintama: The Movie: The Final Chapter: Forever Yorozuya",
  "Gintama: The Final",
  "Girls und Panzer das Finale: Part I",
  "Girls und Panzer das Finale: Part II",
  "Girls und Panzer das Finale: Part III",
  "Girls und Panzer das Finale: Part IV",
  "Given",
  "Goblin Slayer: Goblin's Crown",
  "Grisaia: Phantom Trigger The Animation - Stargazer",
  "Haikyuu!! Movie 1: Owari to Hajimari",
  "Haikyuu!! Movie 2: Shousha to Haisha",
  "Haikyuu!! Movie 3: Sainou to Sense",
  "Haikyuu!! Movie 4: Concept no Tatakai",
  "High☆Speed!: Free! Starting Days",
  "High School Fleet Movie",
  "I Want to Eat Your Pancreas",
  "Is the Order a Rabbit?? Dear My Sister",
  "Is the Order a Rabbit?? Sing For You",
  "K-On! Movie",
  "Kabaneri of the Iron Fortress: The Battle of Unato",
  "Kase-san and Morning Glories",
  "Kimi no Na wa.",
  "Kizumonogatari I: Tekketsu-hen",
  "Kizumonogatari II: Nekketsu-hen",
  "Kizumonogatari III: Reiketsu-hen",
  "Koe no Katachi",
  "Kokoro ga Sakebitagatterunda.",
  "K-On! Movie",
  "K-On!: Live House!",
  "Konosuba: God's Blessing on This Wonderful World! Legend of Crimson",
  "KonoSuba: God's Blessing on This Wonderful World! - God's Blessing on This Wonderful Choker!",
  "Laid-Back Camp Movie",
  "Liz and the Blue Bird",
  "Love Live! The School Idol Movie",
  "Love Live! Sunshine!! The School Idol Movie: Over the Rainbow",
  "Macross Frontier: Itsuwari no Utahime",
  "Macross Frontier: Sayonara no Tsubasa",
  "Made in Abyss Movie 1: Tabidachi no Yoake",
  "Made in Abyss Movie 2: Hourou Suru Tasogare",
  "Made in Abyss Movie 3: Fukaki Tamashii no Reimei",
  "Magia Record: Mahou Shoujo Madoka☆Magica Gaiden (TV) 2nd Season",
  "Magia Record: Mahou Shoujo Madoka☆Magica Gaiden (TV) - Kakusei Zenya",
  "Mahou Shoujo Lyrical Nanoha Detonation",
  "Mahouka Koukou no Rettousei Movie: Hoshi wo Yobu Shoujo",
  "Maquia: When the Promised Flower Blooms",
  "Mirai no Mirai",
  "Mobile Suit Gundam 00 the Movie: A Wakening of the Trailblazer",
  "Mobile Suit Gundam Narrative",
  "Mobile Suit Gundam Thunderbolt: December Sky",
  "Mobile Suit Gundam Thunderbolt: Bandit Flower",
  "Natsume Yuujinchou Movie: Utsusemi ni Musubu",
  "Nekopara",
  "Nisekoi OVA",
  "No Game No Life: Zero",
  "Non Non Biyori Movie: Vacation",
  "One Piece Film: Gold",
  "One Piece Film: Z",
  "One Punch Man 2nd Season OVA",
  "Owarimonogatari",
  "Owarimonogatari 2nd Season",
  "Peace Maker Kurogane Movie 1: Omou Michi",
  "Peace Maker Kurogane Movie 2: Yuumei",
  "Persona 3 the Movie 1: Spring of Birth",
  "Persona 3 the Movie 2: Midsummer Knight's Dream",
  "Persona 3 the Movie 3: Falling Down",
  "Persona 3 the Movie 4: Winter of Rebirth",
  "Persona 4 the Animation: The Factor of Hope",
  "Persona 4 the Golden Animation: Thank you Mr. Accomplice",
];

function SearchModel() {
  const [searchValue, setSearch] = useState<String>("");
  const { setSearchModel, isSearchModel } = useContext(userContext);

  return (
    <AnimatePresence>
      {isSearchModel && (
        <motion.div
          className="searchModel overflow-hidden h-screen text-xs md:text-sm lg:text-base w-screen z-[1000] fixed top-0 left-0 bg-transparent flex justify-center items-center"
          initial={{ opacity: 0, y: "-100vh" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "tween" }}
          exit={{ opacity: 0, y: "-100vh" }}
        >
          <div className="bg-gray-900 opacity-80 top-0 left-0 absolute w-full h-full z-[900]"></div>
          <div className="field min-w-[250px] w-2/6 py-10 min-h-[308px] bg-white opacity-100 z-[1200] rounded-lg flex items-center flex-col gap-2 relative px-2">
            <div className="relative max-w-[420px] w-full mx-auto pr-6 ">
              <InputSuggestions
                autoFocus
                type="text"
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                className="py-2 px-1"
                placeholder="type here"
                suggestions={animeTitles.slice(0, 7).map((e) => (
                  <Link
                    href={`/search/${e}`}
                    className="py-2 bg-white w-full text-xs px-1 hover:bg-black hover:text-white transition-colors ease-in-out duration-500"
                    onClick={() => setSearchModel(false)}
                  >
                    {e}
                  </Link>
                ))}
              />
              <span className=" absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer">
                <Link
                  href={`/search/${searchValue}`}
                  title={`search for ${searchValue}`}
                  onClick={() => setSearchModel(false)}
                >
                  <SearchIcon />
                </Link>
              </span>
            </div>
            <div
              className="close_Search_Modal cursor-pointer absolute top-2 right-2 text-secondary-600 "
              onClick={() => setSearchModel(false)}
            >
              <CloseIcon />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SearchModel;
