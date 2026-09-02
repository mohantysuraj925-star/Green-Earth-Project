import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Cpu,
  Activity,
  ShieldCheck,
  Zap,
  BarChart3,
  Globe2,
  TreePine,
  Sliders,
  Radio,
  Award,
  Compass,
  Database,
  Layers,
  Thermometer,
  CloudRain,
  Sun,
  Flame,
  Search,
  Navigation,
  Download,
  AlertTriangle,
  Battery
} from "lucide-react";

export default function Advance() {
  const [treeInput, setTreeInput] = useState(25);
  const [activeZone, setActiveZone] = useState("Zone-A (North Forest)");
  const [soilType, setSoilType] = useState("loamy");
  const [alertSent, setAlertSent] = useState(false);

  const speciesDatabase = {
    loamy: [
      { name: "Neem (Azadirachta indica)", survival: "95%", co2: "25kg/yr", note: "High medicinal & air purifying value" },
      { name: "Banyan (Ficus benghalensis)", survival: "98%", co2: "48kg/yr", note: "Provides massive canopy coverage" }
    ],
    sandy: [
      { name: "Acacia (Khair)", survival: "88%", co2: "18kg/yr", note: "Drought resistant with deep roots" },
      { name: "Eucalyptus", survival: "90%", co2: "20kg/yr", note: "Fast growth rate in dry conditions" }
    ],
    clay: [
      { name: "Teak (Tectona grandis)", survival: "92%", co2: "30kg/yr", note: "Strong timber & moisture tolerant" },
      { name: "Mahogany", survival: "89%", co2: "28kg/yr", note: "Thrives in nutrient-rich heavy soil" }
    ]
  };

  const droneFleet = [
    { id: "Drone Alpha-1", battery: "88%", status: "Active Seeding", zone: "Zone-A" },
    { id: "Drone Beta-2", battery: "62%", status: "Thermal Scanning", zone: "Zone-B" },
    { id: "Drone Gamma-3", battery: "95%", status: "Standby / Charging", zone: "Base Station" }
  ];

  const features = [
    {
      icon: <Cpu className="text-green-600" size={32} />,
      title: "AI Environmental Analytics",
      description: "Real-time monitoring of local ecosystem health, soil quality, and tree survival rates using satellite imagery."
    },
    {
      icon: <Activity className="text-blue-500" size={32} />,
      title: "Impact Tracker & CO₂ Metrics",
      description: "Detailed live calculation of oxygen production and real-time metric tracking of carbon offsets per region."
    },
    {
      icon: <ShieldCheck className="text-emerald-600" size={32} />,
      title: "Verified Green Certification",
      description: "Cryptographically verified digital badges for high-contribution corporate and individual volunteers."
    },
    {
      icon: <Zap className="text-amber-500" size={32} />,
      title: "Smart Resource Allocation",
      description: "Automated distribution system for water, fertilizer, and planting supplies based on weather predictions."
    },
    {
      icon: <BarChart3 className="text-purple-600" size={32} />,
      title: "Predictive Growth Models",
      description: "Machine learning algorithms forecasting canopy expansion and biodiversity impact over 5, 10, and 20 years."
    },
    {
      icon: <Globe2 className="text-teal-500" size={32} />,
      title: "Global Volunteer Mesh Network",
      description: "Decentralized task distribution connecting local ground teams directly with global donors."
    },
    {
      icon: <Database className="text-indigo-500" size={32} />,
      title: "Ecosystem Soil Telemetry",
      description: "IoT ground sensors monitoring moisture, NPK soil nutrients, and temperature continuously."
    },
    {
      icon: <Layers className="text-rose-500" size={32} />,
      title: "Drone Seed-Bomb Mapping",
      description: "Automated aerial drone pathways for precision seed dispersal in hard-to-reach terrain."
    }
  ];

  const telemetryData = {
    "Zone-A (North Forest)": { moisture: "68%", temp: "24°C", humidity: "75%", health: "Optimal" },
    "Zone-B (River Basin)": { moisture: "82%", temp: "22°C", humidity: "88%", health: "Excellent" },
    "Zone-C (Hill Side)": { moisture: "45%", temp: "28°C", humidity: "60%", health: "Needs Irrigation" }
  };

  const leaderboards = [
    { name: "EcoShield Corp", trees: "2,450 Trees", badge: "Gold Impact" },
    { name: "Green Volunteers Club", trees: "1,890 Trees", badge: "Silver Impact" },
    { name: "S.K. Tech Community", trees: "1,200 Trees", badge: "Bronze Impact" }
  ];

  const calculatedCO2 = (treeInput * 22).toLocaleString();
  const calculatedO2 = (treeInput * 118).toLocaleString();

  return (
    <div className="min-h-screen pt-28 pb-16 px-6 max-w-7xl mx-auto">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200 rounded-full font-medium hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/40 dark:hover:text-green-400 transition mb-8"
      >
        <ArrowLeft size={20} />
        Back to Home
      </Link>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full inline-block mb-4">
          Advanced Engineering & Intelligence Suite
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Advance Environmental Mission
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Explore our cutting-edge AI tools, IoT sensor networks, drone fleets, and live ecological analytics.
        </p>
      </div>

      {/* AI Native Species Finder */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 mb-12 border border-gray-200 dark:border-slate-800 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Search className="text-green-600" size={28} />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Native Species Matcher</h2>
            <p className="text-xs text-gray-500">Select local soil parameters to find highest survival rate trees.</p>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          {["loamy", "sandy", "clay"].map((type) => (
            <button
              key={type}
              onClick={() => setSoilType(type)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition ${
                soilType === type
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400"
              }`}
            >
              {type} Soil
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {speciesDatabase[soilType].map((item, i) => (
            <div key={i} className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-900 dark:text-white text-base">{item.name}</h4>
                <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400 font-bold px-2.5 py-1 rounded-full">
                  {item.survival} Survival
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{item.note}</p>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Est. Carbon Capture: {item.co2}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live IoT Sensor Telemetry Simulator */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 mb-12 border border-gray-200 dark:border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Radio className="text-red-500 animate-pulse" size={26} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Live Ground Sensor Telemetry</h2>
          </div>
          <div className="flex gap-2">
            {Object.keys(telemetryData).map((zone) => (
              <button
                key={zone}
                onClick={() => setActiveZone(zone)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  activeZone === zone
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400"
                }`}
              >
                {zone.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-green-100 dark:border-slate-700">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-1">
              <CloudRain size={18} />
              <span className="text-xs font-bold uppercase">Soil Moisture</span>
            </div>
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
              {telemetryData[activeZone].moisture}
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-amber-100 dark:border-slate-700">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-1">
              <Thermometer size={18} />
              <span className="text-xs font-bold uppercase">Ambient Temp</span>
            </div>
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
              {telemetryData[activeZone].temp}
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-blue-100 dark:border-slate-700">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-1">
              <Sun size={18} />
              <span className="text-xs font-bold uppercase">Air Humidity</span>
            </div>
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
              {telemetryData[activeZone].humidity}
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-purple-100 dark:border-slate-700">
            <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 mb-1">
              <TreePine size={18} />
              <span className="text-xs font-bold uppercase">Zone Status</span>
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {telemetryData[activeZone].health}
            </p>
          </div>
        </div>
      </div>

      {/* Drone Fleet Telemetry */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 mb-12 border border-gray-200 dark:border-slate-800 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Navigation className="text-blue-600" size={28} />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Aerial Drone Mission Monitor</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {droneFleet.map((drone, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-gray-900 dark:text-white">{drone.id}</span>
                <span className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                  <Battery size={14} /> {drone.battery}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Target Area: <strong className="text-gray-900 dark:text-white">{drone.zone}</strong></p>
              <div className="mt-3 text-xs inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 font-semibold">
                {drone.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calculator Section */}
      <div className="bg-gradient-to-br from-green-900 to-emerald-950 text-white rounded-3xl p-8 mb-16 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Sliders className="text-green-400" size={28} />
          <h2 className="text-2xl font-bold">Interactive Carbon & Oxygen Calculator</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <label className="block text-sm font-medium text-green-200 mb-2">
              Select Number of Trees to Plant: <span className="font-bold text-white text-lg">{treeInput}</span>
            </label>
            <input
              type="range"
              min="1"
              max="500"
              value={treeInput}
              onChange={(e) => setTreeInput(Number(e.target.value))}
              className="w-full h-3 bg-green-800 rounded-lg appearance-none cursor-pointer accent-green-400"
            />
            <div className="flex justify-between text-xs text-green-300 mt-2">
              <span>1 Tree</span>
              <span>250 Trees</span>
              <span>500 Trees</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10">
              <span className="text-xs text-green-300 block">Est. Carbon Offset</span>
              <span className="text-3xl font-extrabold text-green-400">{calculatedCO2}</span>
              <span className="text-xs text-gray-300 block mt-1">kg/year</span>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10">
              <span className="text-xs text-green-300 block">Est. Oxygen Generated</span>
              <span className="text-3xl font-extrabold text-blue-300">{calculatedO2}</span>
              <span className="text-xs text-gray-300 block mt-1">kg/year</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Technical Capabilities */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Core Technical Capabilities
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard & Roadmap Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        {/* Leaderboard */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <Award className="text-amber-500" size={28} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Top Impact Partners</h2>
          </div>
          <div className="space-y-4">
            {leaderboards.map((partner, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{partner.name}</h4>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">{partner.badge}</span>
                </div>
                <span className="font-extrabold text-gray-900 dark:text-white text-sm">{partner.trees}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Simulator */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="text-rose-500" size={28} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Forest Safeguard Trigger</h2>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-6">Simulate automated notification broadcast to ground personnel in case of soil drought or threat.</p>
          
          <button
            onClick={() => setAlertSent(!alertSent)}
            className={`w-full py-4 rounded-2xl font-bold text-sm transition flex items-center justify-center gap-2 ${
              alertSent
                ? "bg-rose-600 text-white"
                : "bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 hover:bg-rose-100 hover:text-rose-600"
            }`}
          >
            <Flame size={18} />
            {alertSent ? "Emergency Dispatch Dispatched!" : "Test Alert System"}
          </button>
        </div>
      </div>

      {/* System Status Banner */}
      <div className="bg-gray-50 dark:bg-slate-900/60 rounded-3xl p-8 border border-gray-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
            <TreePine size={28} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">Active Deployment Engine</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">All analytics systems operational. Satellite telemetry sync complete.</p>
          </div>
        </div>

        <Link
          to="/contact"
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-md transition shrink-0"
        >
          Request Custom Module
        </Link>
      </div>
    </div>
  );
}
