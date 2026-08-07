import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Sparkles, Compass, Calculator, TreePine, Gift, Calendar, Trophy, 
  AlertTriangle, ShieldCheck, HelpCircle, BookOpen, Smile, Building2, 
  ArrowLeft, CheckCircle, Send, MapPin, Search, LifeBuoy, Star, Award
} from "lucide-react";

export default function EcoHub() {
  // FEATURE 1: AI Sapling Recommender
  const [soil, setSoil] = useState("Clay");
  const [treeRec, setTreeRec] = useState(null);

  // FEATURE 2: Carbon Offset Calculator
  const [km, setKm] = useState(15);
  const [co2Saved, setCo2Saved] = useState(null);

  // FEATURE 3: Virtual Tree Adoption
  const [adoptName, setAdoptName] = useState("");
  const [adopted, setAdopted] = useState(null);

  // FEATURE 4: Free Sapling Request
  const [order, setOrder] = useState({ name: "", phone: "", sapling: "Neem" });
  const [ordered, setOrdered] = useState(false);

  // FEATURE 5: Event Ticket RSVP
  const [rsvpDone, setRsvpDone] = useState(false);

  // FEATURE 6: District Leaderboard
  const leaderboard = [
    { rank: 1, name: "Khordha District", trees: "12,450", rankBadge: "🥇 Top Green Zone" },
    { rank: 2, name: "Cuttack Circle", trees: "9,820", rankBadge: "🥈 Eco Champion" },
    { rank: 3, name: "Puri Coastal Belt", trees: "8,100", rankBadge: "🥉 Rising Green" }
  ];

  // FEATURE 7: Environmental Violation Report
  const [report, setReport] = useState({ area: "", type: "Tree Cutting" });
  const [reportSent, setReportSent] = useState(false);

  // FEATURE 8: Disaster Rescue Request
  const [rescue, setRescue] = useState({ location: "", desc: "" });
  const [rescueSent, setRescueSent] = useState(false);

  // FEATURE 9: Eco Quiz
  const [quizAns, setQuizAns] = useState(null);

  // FEATURE 10: Green Laws Directory
  const laws = [
    { title: "The Odisha Forest Act", desc: "Strict penalties for unauthorized timber cutting." },
    { title: "Environment Protection Act", desc: "Mandatory campus green cover guidelines." }
  ];

  // FEATURE 11: Kids Eco Zone
  const [kidsBadge, setKidsBadge] = useState(false);

  // FEATURE 12: Corporate Carbon Credit Estimator
  const [empCount, setEmpCount] = useState(50);

  return (
    <div className="py-28 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 hover:bg-green-600 hover:text-white text-gray-800 dark:text-gray-200 rounded-full font-bold text-xs shadow transition">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <span className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-700 text-white px-5 py-2 rounded-full text-xs font-extrabold shadow-lg">
            <Sparkles size={16} /> 12-in-1 All Green Action Center
          </span>
        </div>

        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Green Earth EcoHub Portal
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Access 12 powerful environmental tools, AI recommenders, calculators, and rescue services in a single unified dashboard.
          </p>
        </div>

        {/* FEATURE GRID 1: SMART TOOLS */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* F1: AI Sapling Recommender */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <Compass className="text-emerald-600" size={18} /> 1. AI Tree Predictor
            </h3>
            <p className="text-xs text-gray-500">Pick soil type for optimal species match.</p>
            <select value={soil} onChange={(e) => setSoil(e.target.value)} className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl text-xs font-bold border dark:text-white">
              <option value="Clay">Clay / Alluvial Soil</option>
              <option value="Sandy">Sandy Coastal Soil</option>
            </select>
            <button onClick={() => setTreeRec(soil === "Clay" ? "Neem (22kg CO₂/yr)" : "Casuarina / Peepal")} className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow">
              Predict Best Tree
            </button>
            {treeRec && <p className="p-2 bg-emerald-50 dark:bg-slate-800 text-emerald-700 text-xs font-bold rounded-xl">🌱 Match: {treeRec}</p>}
          </div>

          {/* F2: Carbon Offset Calculator */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <Calculator className="text-amber-500" size={18} /> 2. Carbon Offset Meter
            </h3>
            <p className="text-xs text-gray-500">Enter daily cycling/walking km.</p>
            <input type="number" value={km} onChange={(e) => setKm(Number(e.target.value))} className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl text-xs font-bold border dark:text-white" />
            <button onClick={() => setCo2Saved((km * 0.21 * 30).toFixed(1))} className="w-full py-2.5 bg-amber-500 text-slate-950 font-extrabold rounded-xl text-xs shadow">
              Calculate CO₂ Offset
            </button>
            {co2Saved && <p className="p-2 bg-amber-50 dark:bg-slate-800 text-amber-800 text-xs font-bold rounded-xl">⚡ Monthly Saved: {co2Saved} kg CO₂</p>}
          </div>

          {/* F3: Virtual Tree Adoption */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <TreePine className="text-green-600" size={18} /> 3. Adopt Virtual Tree
            </h3>
            <p className="text-xs text-gray-500">Tag a tree with custom name & ID.</p>
            <input type="text" placeholder="Tree Nickname" value={adoptName} onChange={(e) => setAdoptName(e.target.value)} className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl text-xs border dark:text-white" />
            <button onClick={() => adoptName && setAdopted("GPS-TAG-" + Math.floor(100000 + Math.random() * 900000))} className="w-full py-2.5 bg-green-600 text-white font-bold rounded-xl text-xs shadow">
              Generate Tag ID
            </button>
            {adopted && <p className="p-2 bg-green-50 dark:bg-slate-800 text-green-700 text-xs font-bold rounded-xl">🏷️ Tag: {adopted}</p>}
          </div>
        </div>

        {/* FEATURE GRID 2: SERVICES & LEADERBOARD */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* F4: Free Sapling Order Store */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <Gift className="text-emerald-600" size={18} /> 4. Free Sapling Request
            </h3>
            {ordered ? <p className="p-3 bg-green-100 text-green-800 text-xs font-bold rounded-xl">✅ Sapling Delivery Booked!</p> : (
              <form onSubmit={(e) => { e.preventDefault(); setOrdered(true); }} className="space-y-2">
                <input type="text" placeholder="Your Name" required className="w-full p-2 bg-gray-50 dark:bg-slate-800 rounded-xl text-xs border dark:text-white" />
                <button type="submit" className="w-full py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs">Request Sapling</button>
              </form>
            )}
          </div>

          {/* F5: Drive Ticket RSVP */}
          <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-6 rounded-3xl shadow-xl space-y-3 border border-emerald-500/30">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Calendar className="text-amber-400" size={18} /> 5. Event Pass Booking
            </h3>
            <p className="text-xs text-emerald-200">Monsoon Plantation Pass • Free Entry</p>
            {rsvpDone ? <p className="p-2 bg-emerald-800 text-emerald-200 text-xs font-bold rounded-xl text-center">🎟️ Pass Confirmed!</p> : (
              <button onClick={() => setRsvpDone(true)} className="w-full py-2.5 bg-amber-400 text-slate-950 font-black rounded-xl text-xs shadow">Get Volunteer Pass</button>
            )}
          </div>

          {/* F6: State & District Leaderboard */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <Trophy className="text-amber-500" size={18} /> 6. District Green Ranks
            </h3>
            <div className="space-y-1.5 text-xs">
              {leaderboard.map(l => (
                <div key={l.rank} className="flex justify-between p-2 bg-gray-50 dark:bg-slate-800 rounded-xl font-bold">
                  <span>#{l.rank} {l.name}</span>
                  <span className="text-emerald-600">{l.trees} Trees</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* FEATURE GRID 3: LAWS, RESCUE, QUIZ, CORPORATE */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* F7: Environmental Violation Report */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="text-rose-500" size={18} /> 7. Report Tree Felling
            </h3>
            {reportSent ? <p className="p-2 bg-rose-100 text-rose-800 text-xs font-bold rounded-xl">🚨 Incident Logged to Hotline!</p> : (
              <form onSubmit={(e) => { e.preventDefault(); setReportSent(true); }} className="space-y-2">
                <input type="text" placeholder="Incident Area" required className="w-full p-2 bg-gray-50 dark:bg-slate-800 rounded-xl text-xs border dark:text-white" />
                <button type="submit" className="w-full py-2 bg-rose-600 text-white font-bold rounded-xl text-xs">Dispatch Incident</button>
              </form>
            )}
          </div>

          {/* F8: Disaster Tree Rescue Alert */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <LifeBuoy className="text-sky-500" size={18} /> 8. Storm Rescue Alert
            </h3>
            {rescueSent ? <p className="p-2 bg-sky-100 text-sky-800 text-xs font-bold rounded-xl">🚜 Rescue Clearance Notified!</p> : (
              <form onSubmit={(e) => { e.preventDefault(); setRescueSent(true); }} className="space-y-2">
                <input type="text" placeholder="Fallen Tree Location" required className="w-full p-2 bg-gray-50 dark:bg-slate-800 rounded-xl text-xs border dark:text-white" />
                <button type="submit" className="w-full py-2 bg-sky-600 text-white font-bold rounded-xl text-xs">Request Rescue</button>
              </form>
            )}
          </div>

          {/* F9: Eco Quiz & Verified Badge */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="text-amber-500" size={18} /> 9. Green Quiz Badge
            </h3>
            <p className="text-xs text-gray-500">1 mature tree absorbs ~22kg CO₂ annually?</p>
            <div className="flex gap-2">
              <button onClick={() => setQuizAns("correct")} className="flex-1 py-1.5 bg-emerald-600 text-white font-bold rounded-xl text-xs">True</button>
              <button onClick={() => setQuizAns("wrong")} className="flex-1 py-1.5 bg-rose-600 text-white font-bold rounded-xl text-xs">False</button>
            </div>
            {quizAns && <p className="p-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl">🏅 Quiz Unlocked Badge!</p>}
          </div>

          {/* F10: Green Laws & Legal Guide */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="text-indigo-500" size={18} /> 10. Tree Protection Laws
            </h3>
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
              {laws.map((l, i) => <p key={i}>📜 <strong>{l.title}:</strong> {l.desc}</p>)}
            </div>
          </div>

          {/* F11: Kids & Student Zone */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <Smile className="text-pink-500" size={18} /> 11. Kids Eco Zone
            </h3>
            <p className="text-xs text-gray-500">Interactive comic guides & student green badges.</p>
            <button onClick={() => setKidsBadge(true)} className="w-full py-2 bg-pink-500 text-white font-bold rounded-xl text-xs">Claim Student Badge</button>
            {kidsBadge && <p className="p-2 bg-pink-50 text-pink-700 text-xs font-bold rounded-xl">🎒 Badge Saved!</p>}
          </div>

          {/* F12: Corporate Carbon Credit Estimator */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <Building2 className="text-teal-600" size={18} /> 12. ESG Carbon Estimator
            </h3>
            <p className="text-xs text-gray-500">Enter organization workforce size.</p>
            <input type="number" value={empCount} onChange={(e) => setEmpCount(Number(e.target.value))} className="w-full p-2 bg-gray-50 dark:bg-slate-800 rounded-xl text-xs border dark:text-white" />
            <p className="p-2 bg-teal-50 dark:bg-slate-800 text-teal-800 text-xs font-bold rounded-xl">🏢 Recommended Trees: {empCount * 3} Saplings/Year</p>
          </div>

        </div>

      </div>
    </div>
  );
}
