import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaTree,
  FaTint,
  FaRecycle,
  FaGlobeAsia,
  FaSun,
  FaAward,
  FaGamepad,
  FaCheckCircle,
  FaHandsHelping,
  FaFlask,
  FaRedo,
  FaCloudRain,
  FaBug,
  FaCoins
} from "react-icons/fa";

const missionsData = [
  {
    id: "trees",
    category: "plantation",
    icon: <FaTree />,
    title: "Plant Trees",
    description: "Planting native saplings to create cleaner air, combat urban heat islands, and restore green covers.",
    progress: 82,
    target: "15,000 Trees"
  },
  {
    id: "water",
    category: "water",
    icon: <FaTint />,
    title: "Save Water",
    description: "Promoting rainwater harvesting, lake rejuvenation, and micro-irrigation systems in dry zones.",
    progress: 68,
    target: "50,000 Liters/Day"
  },
  {
    id: "recycle",
    category: "waste",
    icon: <FaRecycle />,
    title: "Reduce Pollution",
    description: "Community waste recycling, beach cleanups, and single-use plastic eradication drives.",
    progress: 75,
    target: "5 Tons Recycled"
  },
  {
    id: "earth",
    category: "plantation",
    icon: <FaGlobeAsia />,
    title: "Protect Earth",
    description: "Comprehensive ecological conservation and youth environmental education programs.",
    progress: 90,
    target: "Global Awareness"
  }
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [joinedMissions, setJoinedMissions] = useState({});

  // Ultimate Tree Simulator Game State
  const [species, setSpecies] = useState("Neem");
  const [treeStage, setTreeStage] = useState(1);
  const [coins, setCoins] = useState(100);
  const [weather, setWeather] = useState("Sunny"); // Sunny, Rainy, Stormy
  const [hasPest, setHasPest] = useState(false);
  const [waterCount, setWaterCount] = useState(0);
  const [sunCount, setSunCount] = useState(0);
  const [fertilizerCount, setFertilizerCount] = useState(0);
  const [lastAction, setLastAction] = useState("");

  const [questDone, setQuestDone] = useState({ q1: false, q2: false, q3: false });

  const filteredMissions = activeCategory === "all"
    ? missionsData
    : missionsData.filter(m => m.category === activeCategory);

  // Random Pest Spawn Logic
  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() > 0.6 && treeStage > 1) {
        setHasPest(true);
        setLastAction("⚠️ Pest Attack! Spray Bio-Pesticide!");
      }
    }, 12000);
    return () => clearInterval(timer);
  }, [treeStage]);

  const handleWater = () => {
    if (hasPest) return alert("Clear the pests first!");
    const nextWater = waterCount + 1;
    setWaterCount(nextWater);
    setCoins(prev => prev + 10);
    setLastAction("+10 Liters Water 💧 (+10 EcoCoins)");
    checkTreeGrowth(nextWater, sunCount, fertilizerCount);
  };

  const handleSun = () => {
    if (hasPest) return alert("Clear the pests first!");
    const nextSun = sunCount + 1;
    setSunCount(nextSun);
    setCoins(prev => prev + 15);
    setLastAction("Sunlight Nourishment ☀️ (+15 EcoCoins)");
    checkTreeGrowth(waterCount, nextSun, fertilizerCount);
  };

  const handleFertilizer = () => {
    if (coins < 20) return alert("Not enough EcoCoins! Need 20 coins.");
    if (hasPest) return alert("Clear the pests first!");
    const nextFert = fertilizerCount + 1;
    setFertilizerCount(nextFert);
    setCoins(prev => prev - 20);
    setLastAction("Bio-Nutrient Boosted 🧪 (-20 EcoCoins)");
    checkTreeGrowth(waterCount, sunCount, nextFert);
  };

  const handleSprayPest = () => {
    setHasPest(false);
    setCoins(prev => prev + 25);
    setLastAction("Pests Eradicated! 🐛 (+25 Bonus Coins)");
  };

  const resetGame = () => {
    setTreeStage(1);
    setWaterCount(0);
    setSunCount(0);
    setFertilizerCount(0);
    setHasPest(false);
    setCoins(100);
    setLastAction("Game Reset! Choose species & grow again.");
  };

  const checkTreeGrowth = (w, s, f) => {
    const total = w + s + f;
    if (total >= 9) setTreeStage(4);
    else if (total >= 5) setTreeStage(3);
    else if (total >= 2) setTreeStage(2);
    else setTreeStage(1);
  };

  const stageData = {
    1: { name: `Seedling (${species}) 🌰`, desc: "Water and sunlight required to break dormancy!", icon: "🌱", co2: "0 kg" },
    2: { name: `Sprout (${species}) 🌿`, desc: "Roots developing rapidly! Watch out for garden pests.", icon: "🪴", co2: "3 kg" },
    3: { name: `Young Sapling (${species}) 🎋`, desc: "Canopy expanding! Apply bio-nutrients for accelerated growth.", icon: "🌳", co2: "12 kg" },
    4: { name: `Full Grown ${species} Tree 🌳`, desc: "Fully mature canopy capturing maximum carbon & producing pure O₂!", icon: "🌲", co2: "25 kg" }
  };

  return (
    <section id="services" className="bg-green-50 dark:bg-slate-950 pt-28 pb-32 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block bg-white dark:bg-slate-900 text-green-700 dark:text-green-400 px-5 py-2 rounded-full font-semibold shadow-sm border border-gray-100 dark:border-slate-800">
            Interactive Ecological Hub & Services
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Engage, Grow & Protect
          </h2>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-8">
            Experience our interactive conservation tools, complete eco-quests, and participate in live community drives.
          </p>
        </motion.div>

        {/* ULTIMATE GAME SIMULATOR WITH PEST DEFENSE & WEATHER */}
        <div className="mt-14 bg-gradient-to-br from-slate-900 via-green-950 to-slate-900 rounded-3xl p-8 text-white shadow-2xl border border-green-700 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <FaGamepad size={32} className="text-amber-400" />
              <div>
                <h3 className="text-2xl font-bold">Pro Eco-Tree Growth Simulator</h3>
                <p className="text-xs text-green-200">Earn EcoCoins, defend from pests, and adapt to live weather!</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* ECO COIN BADGE */}
              <div className="flex items-center gap-1.5 bg-amber-500/20 px-4 py-2 rounded-full border border-amber-400/50 text-amber-300 text-xs font-bold">
                <FaCoins size={16} /> {coins} EcoCoins
              </div>

              {/* REFRESH ICON BUTTON */}
              <button
                onClick={resetGame}
                title="Reset Tree Growth"
                className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition shadow-md cursor-pointer border border-white/20"
              >
                <FaRedo size={16} />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Display Screen */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10 text-center flex flex-col items-center justify-center min-h-[250px] relative">
              {/* Weather Indicator */}
              <div className="absolute top-3 left-3 text-[10px] bg-slate-800/80 px-3 py-1 rounded-full text-blue-300 flex items-center gap-1">
                <FaCloudRain size={12} /> Climate: {weather}
              </div>

              {lastAction && (
                <span className="absolute top-3 right-3 text-[10px] font-bold text-amber-300 bg-black/50 px-3 py-1 rounded-full animate-pulse">
                  {lastAction}
                </span>
              )}

              <div className={`text-7xl my-4 transition-transform duration-500 ${hasPest ? "animate-bounce" : ""}`}>
                {hasPest ? "🐛🌱" : stageData[treeStage].icon}
              </div>

              <h4 className="text-xl font-extrabold text-amber-300">{stageData[treeStage].name}</h4>
              <p className="text-xs text-gray-200 mt-1 max-w-xs">{stageData[treeStage].desc}</p>
              
              <div className="mt-3 flex gap-2">
                <span className="text-[10px] bg-green-800/80 px-3 py-1 rounded-full text-green-200 font-semibold">
                  CO₂ Offset: {stageData[treeStage].co2}/year
                </span>
              </div>
            </div>

            {/* Game Controls & Action Panel */}
            <div className="space-y-4">
              {/* Species Selector */}
              <div>
                <label className="block text-[11px] font-bold text-green-300 uppercase mb-1">Select Tree Species:</label>
                <select
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                  className="w-full bg-slate-800 text-white p-2.5 rounded-xl border border-slate-700 text-xs font-semibold focus:outline-none"
                >
                  <option value="Neem">Neem Tree (High Oxygen)</option>
                  <option value="Banyan">Banyan Tree (Massive Canopy)</option>
                  <option value="Peepal">Peepal Tree (24/7 Oxygen Supply)</option>
                  <option value="Mango">Mango Tree (Fruit & Shade)</option>
                </select>
              </div>

              {hasPest ? (
                <button
                  onClick={handleSprayPest}
                  className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-2xl transition text-xs shadow-xl animate-pulse flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaBug size={18} /> DEFEND: Spray Organic Bio-Pesticide (+25 Coins)
                </button>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={handleWater}
                    className="p-3.5 bg-blue-600/80 hover:bg-blue-600 rounded-2xl flex flex-col items-center justify-center font-bold text-xs transition cursor-pointer shadow-lg active:scale-95"
                  >
                    <FaTint size={20} className="mb-1 text-blue-200" />
                    Water ({waterCount})
                  </button>
                  <button
                    onClick={handleSun}
                    className="p-3.5 bg-amber-500/80 hover:bg-amber-500 text-slate-950 rounded-2xl flex flex-col items-center justify-center font-bold text-xs transition cursor-pointer shadow-lg active:scale-95"
                  >
                    <FaSun size={20} className="mb-1 text-yellow-100" />
                    Sunlight ({sunCount})
                  </button>
                  <button
                    onClick={handleFertilizer}
                    className="p-3.5 bg-emerald-600/80 hover:bg-emerald-600 rounded-2xl flex flex-col items-center justify-center font-bold text-xs transition cursor-pointer shadow-lg active:scale-95"
                  >
                    <FaFlask size={20} className="mb-1 text-green-200" />
                    Nutrient (-20💰)
                  </button>
                </div>
              )}

              {treeStage === 4 && (
                <div className="p-3 bg-amber-500/20 rounded-xl border border-amber-400/40 text-amber-300 text-xs text-center font-bold flex items-center justify-center gap-2">
                  <FaAward size={18} /> Master Arborist Champion Status Reached!
                </div>
              )}
            </div>
          </div>
        </div>
        {/* FEATURE 2: ECO QUEST & BADGES */}
        <div className="mt-20 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <FaAward className="text-amber-500" size={28} />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Eco Quests & Achievement Badges</h3>
              <p className="text-xs text-gray-500">Complete small daily habits to earn community badges.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 bg-gray-50 dark:bg-slate-800/60 rounded-2xl border border-gray-100 dark:border-slate-700">
              <span className="text-xs font-bold text-green-600 dark:text-green-400">Quest #1</span>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm mt-1">Avoided Single-Use Plastic Today</h4>
              <button
                onClick={() => setQuestDone(prev => ({ ...prev, q1: true }))}
                className={`mt-4 w-full py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  questDone.q1
                    ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {questDone.q1 ? "✓ Completed (+50 XP)" : "Claim Quest"}
              </button>
            </div>

            <div className="p-5 bg-gray-50 dark:bg-slate-800/60 rounded-2xl border border-gray-100 dark:border-slate-700">
              <span className="text-xs font-bold text-green-600 dark:text-green-400">Quest #2</span>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm mt-1">Watered Plants in Neighborhood</h4>
              <button
                onClick={() => setQuestDone(prev => ({ ...prev, q2: true }))}
                className={`mt-4 w-full py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  questDone.q2
                    ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {questDone.q2 ? "✓ Completed (+50 XP)" : "Claim Quest"}
              </button>
            </div>

            <div className="p-5 bg-gray-50 dark:bg-slate-800/60 rounded-2xl border border-gray-100 dark:border-slate-700">
              <span className="text-xs font-bold text-green-600 dark:text-green-400">Quest #3</span>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm mt-1">Shared Green Earth Campaign</h4>
              <button
                onClick={() => setQuestDone(prev => ({ ...prev, q3: true }))}
                className={`mt-4 w-full py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  questDone.q3
                    ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {questDone.q3 ? "✓ Completed (+50 XP)" : "Claim Quest"}
              </button>
            </div>
          </div>
        </div>

        {/* Missions Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {filteredMissions.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="bg-green-100 dark:bg-slate-800 p-4 rounded-2xl text-3xl text-green-600 dark:text-green-400 w-fit mb-4">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="mb-4">
                  <div className="flex justify-between text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1">
                    <span>Progress</span>
                    <span className="text-green-600 dark:text-green-400">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-600 h-full rounded-full" style={{ width: `${item.progress}%` }}></div>
                  </div>
                </div>
              </div>

              {joinedMissions[item.id] ? (
                <div className="w-full py-2.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 rounded-xl font-bold text-xs flex items-center justify-center gap-1">
                  <FaCheckCircle size={14} /> Joined Active
                </div>
              ) : (
                <button
                  onClick={() => setJoinedMissions(prev => ({ ...prev, [item.id]: true }))}
                  className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition text-xs cursor-pointer flex items-center justify-center gap-1 shadow-md"
                >
                  <FaHandsHelping size={14} /> Join Drive
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Global Progress Overview Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-10 border border-gray-100 dark:border-slate-800"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Overall Green Mission Achievement
            </h3>
            <span className="text-green-700 dark:text-green-400 font-extrabold text-2xl">
              75%
            </span>
          </div>

          <div className="w-full h-5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "75%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="h-full bg-green-600 rounded-full"
            />
          </div>

          <p className="mt-6 text-center text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Our goal is to inspire millions of people to plant trees, save water, and protect nature through transparent tracking and ground community participation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
