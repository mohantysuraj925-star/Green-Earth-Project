import { useState, useEffect } from "react";
import { Wind, Sun, CloudRain, Trophy, Sparkles, Search, CheckCircle, MapPin, Loader2 } from "lucide-react";

export default function EcoTools() {
  const [city, setCity] = useState("Bhubaneswar");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aqiData, setAqiData] = useState({
    city: "Bhubaneswar",
    aqi: 42,
    status: "Good",
    temp: "31°C",
    humidity: "78%",
    advice: "Air quality is great! Ideal for plantation."
  });

  const [kmDriven, setKmDriven] = useState(10);
  const [treesPlanted, setTreesPlanted] = useState(2);

  // FETCH REAL AIR QUALITY & WEATHER DATA FROM OPEN-METEO API
  const fetchRealData = async (searchCity) => {
    setLoading(true);
    setError("");
    try {
      // 1. Get Coordinates (Lat, Lon) for the city/district
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchCity)}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("District/City not found. Try spelling correctly!");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, admin1, country } = geoData.results[0];

      // 2. Get Real Weather & Humidity
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m`
      );
      const weatherData = await weatherRes.json();

      // 3. Get Real PM2.5 Air Quality Index (US AQI formula approximation)
      const aqiRes = await fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=pm2_5,pm10`
      );
      const aqiDataRes = await aqiRes.json();

      const pm25 = aqiDataRes.current ? aqiDataRes.current.pm2_5 : 15;
      const calculatedAqi = Math.round(pm25 * 2.5); // PM2.5 to standard AQI estimate

      let status = "Good";
      let advice = "Air quality is clean and fresh!";
      if (calculatedAqi > 50 && calculatedAqi <= 100) {
        status = "Moderate";
        advice = "Acceptable air quality for outdoor activities.";
      } else if (calculatedAqi > 100 && calculatedAqi <= 200) {
        status = "Unhealthy for Sensitive Groups";
        advice = "Wear a mask if sensitive to dust.";
      } else if (calculatedAqi > 200) {
        status = "Poor / Pollution Warning";
        advice = "Plant Peepal & Neem trees to combat smog!";
      }

      setAqiData({
        city: `${name}${admin1 ? `, ${admin1}` : ""}`,
        aqi: calculatedAqi || 35,
        status: status,
        temp: `${Math.round(weatherData.current.temperature_2m)}°C`,
        humidity: `${weatherData.current.relative_humidity_2m}%`,
        advice: advice
      });
    } catch (err) {
      setError("Failed to fetch live weather data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealData("Bhubaneswar");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchRealData(city);
    }
  };

  const leaders = [
    { rank: 1, name: "Suraj Mohanty", trees: 45, badge: "Green Legend" },
    { rank: 2, name: "Pihuli", trees: 28, badge: "Eco Warrior" },
    { rank: 3, name: "Priya Sharma", trees: 15, badge: "Tree Guardian" }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white via-green-50/40 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-400 mb-3">
            <Sparkles size={14} /> Live Environmental Data
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Real-Time District Air Quality, Climate & Eco Calculator
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* REAL AQI & WEATHER CARD */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                  <Wind className="text-green-600" size={20} /> Live District AQI
                </h3>
              </div>

              <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter District or City (e.g. Cuttack, Patna)..."
                  className="flex-1 px-3.5 py-2.5 bg-gray-50 dark:bg-slate-800 border rounded-xl text-xs font-medium focus:outline-none dark:text-white"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />} Search
                </button>
              </form>

              {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

              <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-200/50 dark:border-green-800/30 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
                    <MapPin size={14} className="text-green-600" /> {aqiData.city}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-green-600 text-white">
                    AQI: {aqiData.aqi}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 p-2 rounded-xl">
                    <Sun size={14} className="text-amber-500" /> Temp: {aqiData.temp}
                  </div>
                  <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 p-2 rounded-xl">
                    <CloudRain size={14} className="text-blue-500" /> Humidity: {aqiData.humidity}
                  </div>
                </div>

                <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 italic">
                  "{aqiData.advice}"
                </p>
              </div>
            </div>
          </div>
          {/* ECO IMPACT CALCULATOR */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Sparkles className="text-emerald-600" size={20} /> Personal Eco Impact
              </h3>

              <div className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="block text-gray-500 mb-1">Daily Commute: {kmDriven} km</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={kmDriven}
                    onChange={(e) => setKmDriven(Number(e.target.value))}
                    className="w-full accent-green-600 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-gray-500 mb-1">Trees Sponsored: {treesPlanted} Trees</label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={treesPlanted}
                    onChange={(e) => setTreesPlanted(Number(e.target.value))}
                    className="w-full accent-green-600 cursor-pointer"
                  />
                </div>

                <div className="p-4 bg-emerald-50 dark:bg-slate-800/80 rounded-2xl border border-emerald-100 dark:border-slate-700 space-y-2">
                  <div className="flex justify-between text-emerald-800 dark:text-emerald-300">
                    <span>Est. Yearly CO₂ Emissions:</span>
                    <span className="font-extrabold">{(kmDriven * 0.12 * 365).toFixed(0)} kg</span>
                  </div>
                  <div className="flex justify-between text-green-700 dark:text-green-400">
                    <span>CO₂ Offset by Your Trees:</span>
                    <span className="font-extrabold">{treesPlanted * 22} kg/yr</span>
                  </div>
                  <div className="pt-1 border-t text-[11px] text-gray-500">
                    Net Impact: {treesPlanted * 22 >= kmDriven * 0.12 * 365 ? "🌱 Carbon Neutral!" : "⚠️ Plant more trees to neutralize commute."}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LEADERBOARD OF CHAMPIONS */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Trophy className="text-amber-500" size={20} /> Top Green Donors
              </h3>

              <div className="space-y-3">
                {leaders.map((lead) => (
                  <div key={lead.rank} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800/60 rounded-2xl border border-gray-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-xs ${
                        lead.rank === 1 ? "bg-amber-400 text-slate-900" : lead.rank === 2 ? "bg-slate-300 text-slate-900" : "bg-amber-700 text-white"
                      }`}>
                        #{lead.rank}
                      </span>
                      <div>
                        <h4 className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1">
                          {lead.name} <CheckCircle size={12} className="text-green-600" />
                        </h4>
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">{lead.badge}</span>
                      </div>
                    </div>
                    <span className="font-extrabold text-green-600 dark:text-green-400 text-xs">{lead.trees} Trees</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
