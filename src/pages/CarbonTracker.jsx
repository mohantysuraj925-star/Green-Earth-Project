import { useState } from "react";
import {
  Car,
  Zap,
  Utensils,
  Trees,
  Award,
  Sparkles,
  Leaf,
  ArrowRight,
  Download,
  Share2,
  CheckSquare,
  PieChart,
  Check,
  TrendingDown,
  Droplets,
  ShieldAlert,
  Sliders
} from "lucide-react";

export default function CarbonTracker() {
  const [kmDriven, setKmDriven] = useState(15);
  const [electricityUnit, setElectricityUnit] = useState(100);
  const [dietType, setDietType] = useState("veg");
  const [plasticUse, setPlasticUse] = useState("low");
  const [viewType, setViewType] = useState("monthly"); // monthly or yearly
  const [copied, setCopied] = useState(false);
  const [reductionTarget, setReductionTarget] = useState(30); // % target

  // Interactive Checklist
  const [goals, setGoals] = useState({
    publicTransport: false,
    reusableBottle: false,
    unplugDevices: false,
  });

  // Base Calculation (Monthly Kg)
  const travelCO2 = kmDriven * 30 * 0.12;
  const energyCO2 = electricityUnit * 0.85;
  const dietCO2 = dietType === "non-veg" ? 120 : dietType === "eggetarian" ? 70 : 45;
  const plasticCO2 = plasticUse === "high" ? 40 : plasticUse === "medium" ? 20 : 5;

  let baseCO2 = travelCO2 + energyCO2 + dietCO2 + plasticCO2;

  // Reduce score based on checked eco-goals
  if (goals.publicTransport) baseCO2 -= 15;
  if (goals.reusableBottle) baseCO2 -= 5;
  if (goals.unplugDevices) baseCO2 -= 10;
  if (baseCO2 < 0) baseCO2 = 0;

  // Monthly vs Yearly Calculations
  const isYearly = viewType === "yearly";
  const multiplier = isYearly ? 12 : 1;
  const rawDisplayCO2 = baseCO2 * multiplier;
  
  // Format Display Number
  const totalCO2Display = isYearly 
    ? (rawDisplayCO2 / 1000).toFixed(2) // Convert to Tons for Yearly
    : Math.round(rawDisplayCO2); // Kg for Monthly

  const unitLabel = isYearly ? "Tons/yr" : "Kg/mo";
  const treesNeeded = Math.ceil((baseCO2 * 12) / 20); // 1 tree absorbs ~20kg CO2/yr

  // Percentage Breakdown
  const totalRaw = travelCO2 + energyCO2 + dietCO2 + plasticCO2 || 1;
  const travelPct = Math.round((travelCO2 / totalRaw) * 100);
  const energyPct = Math.round((energyCO2 / totalRaw) * 100);
  const dietPct = Math.round((dietCO2 / totalRaw) * 100);
  const plasticPct = 100 - (travelPct + energyPct + dietPct);

  // DYNAMIC BADGE & DYNAMIC SUGGESTIONS
  const getDynamicInsights = (monthlyKg) => {
    if (monthlyKg < 100) {
      return {
        badge: { title: "Eco Champion 🌟", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/50" },
        tips: [
          "Awesome work! You are in the top 10% eco-friendly individuals.",
          "Keep inspiring your peers by sharing your low-footprint certificate.",
          "Consider adopting a sapling in your community to reach carbon neutral status."
        ]
      };
    } else if (monthlyKg < 250) {
      return {
        badge: { title: "Balanced Earthling 🌿", color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/50" },
        tips: [
          "Your travel contributes heavily—try carpooling or walking short distances.",
          "Switching to LED lights and un-plugging appliances can save ~20kg CO₂/mo.",
          "Try including 1-2 extra plant-based meals per week."
        ]
      };
    } else {
      return {
        badge: { title: "High Footprint ⚠️ Action Needed", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/50" },
        tips: [
          "Urgent: High daily travel/power consumption detected!",
          "Switching from daily solo driving to public transit can cut up to 60% CO₂.",
          "Eliminate single-use plastic bottles immediately—use copper or glass.",
          "Audit your home electricity: A/C and water heaters consume maximum units."
        ]
      };
    }
  };

  const currentInsight = getDynamicInsights(baseCO2);

  const handleShare = () => {
    navigator.clipboard.writeText(`My carbon footprint is ${totalCO2Display} ${unitLabel} on Green Earth! Calculate yours here.`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-800 dark:text-gray-100 py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto pt-16">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/60 text-green-700 dark:text-green-300 px-4 py-1.5 rounded-full font-semibold text-xs border border-green-200 dark:border-green-800">
            <Sparkles size={14} /> Next-Gen Environmental Intelligence
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mt-4 tracking-tight">
            Carbon Footprint Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm sm:text-base leading-relaxed">
            Real-time carbon emissions analysis with dynamic lifestyle suggestions and offset calculations.
          </p>

          {/* DYNAMIC MONTHLY / YEARLY TOGGLE */}
          <div className="mt-6 inline-flex bg-gray-200 dark:bg-slate-800 p-1.5 rounded-full border border-gray-300 dark:border-slate-700 shadow-inner">
            <button
              onClick={() => setViewType("monthly")}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                !isYearly
                  ? "bg-green-600 text-white shadow-md scale-105"
                  : "text-gray-700 dark:text-gray-300 hover:text-green-600"
              }`}
            >
              Monthly Mode (Kg)
            </button>
            <button
              onClick={() => setViewType("yearly")}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isYearly
                  ? "bg-green-600 text-white shadow-md scale-105"
                  : "text-gray-700 dark:text-gray-300 hover:text-green-600"
              }`}
            >
              Yearly Mode (Tons)
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* INPUT FORM */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-200/80 dark:border-slate-800 space-y-8">
            {/* TRAVEL */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-2xl">
                  <Car size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">Daily Travel Distance</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Daily commute by vehicle (Km/day)</p>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={kmDriven}
                onChange={(e) => setKmDriven(Number(e.target.value))}
                className="w-full accent-green-600 cursor-pointer"
              />
              <div className="flex justify-between text-xs sm:text-sm font-semibold mt-2 text-gray-700 dark:text-gray-300">
                <span>0 Km</span>
                <span className="text-green-600 dark:text-green-400 font-extrabold">{kmDriven} Km / day</span>
                <span>100 Km</span>
              </div>
            </div>

            {/* ELECTRICITY */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-2xl">
                  <Zap size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">Monthly Electricity Usage</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Power consumption in kilowatt-hours (Units)</p>
                </div>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                value={electricityUnit}
                onChange={(e) => setElectricityUnit(Number(e.target.value))}
                className="w-full accent-green-600 cursor-pointer"
              />
              <div className="flex justify-between text-xs sm:text-sm font-semibold mt-2 text-gray-700 dark:text-gray-300">
                <span>10 Units</span>
                <span className="text-green-600 dark:text-green-400 font-extrabold">{electricityUnit} Units / month</span>
                <span>500 Units</span>
              </div>
            </div>

            {/* DIET */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                  <Utensils size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">Diet Preference</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Food production carbon intensity</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: "veg", label: "Vegetarian 🥦" },
                  { id: "eggetarian", label: "Eggetarian 🥚" },
                  { id: "non-veg", label: "Non-Veg 🍗" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setDietType(item.id)}
                    className={`py-3 px-2 rounded-2xl text-xs font-bold transition-all border cursor-pointer ${
                      dietType === item.id
                        ? "bg-green-600 text-white border-green-600 shadow-md"
                        : "bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* PLASTIC USAGE */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-2xl">
                  <Leaf size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">Single-Use Plastic Generation</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Bottles, packaging, and disposables</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: "low", label: "Low 🟢" },
                  { id: "medium", label: "Moderate 🟡" },
                  { id: "high", label: "High 🔴" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPlasticUse(item.id)}
                    className={`py-3 px-2 rounded-2xl text-xs font-bold transition-all border cursor-pointer ${
                      plasticUse === item.id
                        ? "bg-green-600 text-white border-green-600 shadow-md"
                        : "bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* STYLED CHECKLIST WITH GLOW & ICONS */}
            <div className="pt-6 border-t border-gray-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                <CheckSquare size={20} className="text-green-600" /> Daily Reduction Pledges
              </h3>
              <p className="text-xs text-gray-500 mb-4">Toggle actions practiced today to instantly reduce your active score:</p>
              
              <div className="space-y-3">
                {[
                  { id: "publicTransport", title: "Public Transit Day", desc: "Used bus/train or bicycle today (-15 kg CO₂)" },
                  { id: "reusableBottle", title: "Zero Plastic Bottle", desc: "Used copper/steel bottle instead of plastic (-5 kg CO₂)" },
                  { id: "unplugDevices", title: "Smart Power Switch-Off", desc: "Completely unplugged standby devices (-10 kg CO₂)" }
                ].map((goal) => {
                  const isChecked = goals[goal.id];
                  return (
                    <div
                      key={goal.id}
                      onClick={() => setGoals({ ...goals, [goal.id]: !isChecked })}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? "bg-green-50/80 dark:bg-green-950/40 border-green-500 shadow-sm"
                          : "bg-gray-50/60 dark:bg-slate-800/40 border-gray-200 dark:border-slate-700/60 hover:bg-gray-100/50"
                      }`}
                    >
                      <div>
                        <h4 className={`text-xs font-extrabold ${isChecked ? "text-green-700 dark:text-green-400" : "text-gray-800 dark:text-gray-200"}`}>
                          {goal.title}
                        </h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{goal.desc}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                        isChecked ? "bg-green-600 border-green-600 text-white" : "border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                      }`}>
                        {isChecked && <Check size={14} strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* NEW FEATURE: REDUCTION SIMULATOR */}
            <div className="pt-6 border-t border-gray-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
                  <Sliders size={20} className="text-emerald-500" /> Reduction Target Simulator
                </h3>
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-full">
                  -{reductionTarget}% Target
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-4">Simulate how much CO₂ & trees you save by cutting your habits:</p>
              
              <input
                type="range"
                min="10"
                max="80"
                step="10"
                value={reductionTarget}
                onChange={(e) => setReductionTarget(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-xl border border-emerald-200/60 dark:border-emerald-800/50 text-center">
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-300 uppercase font-bold">CO₂ Saved / Year</p>
                  <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {Math.round((baseCO2 * 12 * (reductionTarget / 100)))} Kg
                  </p>
                </div>
                <div className="p-3 bg-green-50/80 dark:bg-green-950/40 rounded-xl border border-green-200/60 dark:border-green-800/50 text-center">
                  <p className="text-[10px] text-green-700 dark:text-green-300 uppercase font-bold">Trees Saved / Year</p>
                  <p className="text-base font-extrabold text-green-600 dark:text-green-400 mt-0.5">
                    {Math.ceil((treesNeeded * (reductionTarget / 100)))} Trees
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RESULT BOARD & DYNAMIC ADVICE */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-gray-200/80 dark:border-slate-800 text-center relative overflow-hidden">
              <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 ${currentInsight.badge.bg} ${currentInsight.badge.color}`}>
                {currentInsight.badge.title}
              </div>

              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {isYearly ? "Annual Output" : "Monthly Footprint"}
              </h2>
              <div className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
                {totalCO2Display} <span className="text-base font-bold text-green-600 dark:text-green-400">{unitLabel}</span>
              </div>

              {/* VISUAL BREAKDOWN BAR */}
              <div className="mt-6 text-left">
                <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                  <span>Emission Sources</span>
                  <PieChart size={14} />
                </div>
                <div className="h-3 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                  <div style={{ width: `${travelPct}%` }} className="bg-blue-500" title={`Travel ${travelPct}%`} />
                  <div style={{ width: `${energyPct}%` }} className="bg-amber-500" title={`Energy ${energyPct}%`} />
                  <div style={{ width: `${dietPct}%` }} className="bg-emerald-500" title={`Diet ${dietPct}%`} />
                  <div style={{ width: `${plasticPct}%` }} className="bg-purple-500" title={`Plastic ${plasticPct}%`} />
                </div>
                <div className="grid grid-cols-2 gap-1.5 mt-2 text-[10px] text-gray-500 font-semibold">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Travel ({travelPct}%)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Energy ({energyPct}%)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Diet ({dietPct}%)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500" /> Plastic ({plasticPct}%)</span>
                </div>
              </div>

              <hr className="my-6 border-gray-100 dark:border-slate-800" />

              <div className="bg-green-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-green-200 dark:border-slate-700 flex items-center gap-4 text-left">
                <div className="p-3 bg-green-600 text-white rounded-xl">
                  <Trees size={26} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Tree Plantation Offset</h4>
                  <p className="text-lg font-extrabold text-green-700 dark:text-green-300">
                    {treesNeeded} Saplings / Year
                  </p>
                </div>
              </div>

              {/* REPORT & SHARE */}
              <div className="mt-6 grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => window.print()}
                  className="py-2.5 px-3 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Download size={14} /> Print Report
                </button>
                <button
                  onClick={handleShare}
                  className="py-2.5 px-3 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  {copied ? <Check size={14} /> : <Share2 size={14} />}
                  {copied ? "Copied!" : "Share Result"}
                </button>
              </div>
            </div>

            {/* DYNAMIC RECOMMENDATIONS BOX (CHANGES BASED ON INPUT) */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white p-6 rounded-3xl shadow-xl">
              <h3 className="font-bold text-base flex items-center gap-2 mb-3">
                <Award size={18} /> Personalized Advice
              </h3>
              <ul className="text-xs space-y-2.5 text-green-100">
                {currentInsight.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ArrowRight size={14} className="mt-0.5 text-green-300 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
