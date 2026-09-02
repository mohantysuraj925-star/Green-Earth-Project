import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Users, Image, Heart, MessageSquare, AlertTriangle, 
  Send, ThumbsUp, ShieldCheck, MapPin, Sparkles, Camera, ArrowLeft,
  Trophy, Flame, Calendar, Calculator, TreePine, Gift, HelpCircle,
  Clock, CheckCircle, Search, ThumbsDown, Award, Compass, LifeBuoy
} from "lucide-react";

export default function Community() {
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("trending");

  // FEATURE 1: AI Tree Recommender State
  const [soilType, setSoilType] = useState("Clay / Wet");
  const [recommendedTree, setRecommendedTree] = useState(null);

  // FEATURE 2: Carbon Calculator State
  const [kmTravelled, setKmTravelled] = useState(10);
  const [co2Saved, setCo2Saved] = useState(null);

  // FEATURE 3: Tree Adoption State
  const [adoptName, setAdoptName] = useState("");
  const [adoptedTree, setAdoptedTree] = useState(null);

  // FEATURE 4: Event RSVP State
  const [eventBooked, setEventBooked] = useState(false);

  // FEATURE 5: Free Sapling Request State
  const [saplingOrder, setSaplingOrder] = useState({ name: "", phone: "", tree: "Neem Sapling" });
  const [orderSuccess, setOrderSuccess] = useState(false);

  // FEATURE 6: Feed & Leaderboard
  const [leaderboard] = useState([
    { rank: 1, name: "Suraj Kumar Mohanty", points: "1,250 PTS", badge: "Green Legend 🌳" },
    { rank: 2, name: "Green Earth Campus Team", points: "980 PTS", badge: "Eco Warriors ⚡" },
    { rank: 3, name: "Priya Sharma", points: "750 PTS", badge: "Tree Protector 🍃" }
  ]);

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Suraj Kumar Mohanty",
      location: "Green Earth Campus, Bhubaneswar",
      type: "plantation",
      title: "Planted 15 Neem saplings with the campus team today!",
      desc: "Great response from student volunteers. Every sapling has been fenced and tagged with a digital QR code.",
      img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
      upvotes: 84,
      downvotes: 2,
      comments: ["Awesome effort!", "Proud of you team!"],
      date: "2 Hours ago"
    },
    {
      id: 2,
      author: "Priya Sharma",
      location: "Khandagiri Park, Khordha",
      type: "report",
      title: "Plastic waste accumulation near the park entrance",
      desc: "Spotted illegal dumping of single-use plastic bottles. Need local volunteers for a quick clean-up drive.",
      img: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800",
      upvotes: 45,
      downvotes: 1,
      comments: ["Count me in for Sunday!", "Reported to local body as well."],
      date: "Yesterday"
    }
  ]);

  const [newPost, setNewPost] = useState({ author: "", title: "", location: "Bhubaneswar", type: "plantation", desc: "", img: "" });

  const handleRecommend = () => {
    if (soilType.includes("Clay")) {
      setRecommendedTree({ name: "Neem (Azadirachta indica)", co2: "22 kg/yr", care: "Low Water, Heavy Sun" });
    } else {
      setRecommendedTree({ name: "Banyan / Peepal", co2: "45 kg/yr", care: "Moderate Water, Wide Space" });
    }
  };

  const handleAdopt = (e) => {
    e.preventDefault();
    if (adoptName) {
      setAdoptedTree({ id: "TREE-GPS-" + Math.floor(100000 + Math.random() * 900000), name: adoptName, status: "Healthy Sapling (2 ft)" });
    }
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.author) {
      setPosts([{ id: Date.now(), ...newPost, img: newPost.img || "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800", upvotes: 1, downvotes: 0, comments: [], date: "Just now" }, ...posts]);
      setNewPost({ author: "", title: "", location: "Bhubaneswar", type: "plantation", desc: "", img: "" });
    }
  };

  return (
    <div className="py-28 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 hover:bg-green-600 hover:text-white text-gray-800 dark:text-gray-200 rounded-full font-bold text-xs shadow transition">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="flex items-center gap-2 bg-green-100 dark:bg-green-950/60 px-4 py-1.5 rounded-full text-green-700 dark:text-green-400 text-xs font-bold">
            <Sparkles size={16} /> All-In-One Green Eco Hub
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Green Earth Eco Action Hub
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Calculate impact, adopt virtual trees, request free saplings, take quizzes, and share community initiatives in one place.
          </p>
        </div>

        {/* 12-IN-1 INTERACTIVE TOOLS GRID */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* TOOL 1: AI TREE RECOMMENDER */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <Compass className="text-emerald-600" size={18} /> AI Sapling Matcher
            </h3>
            <p className="text-xs text-gray-500">Pick soil type to predict the best sapling for your area.</p>
            <select value={soilType} onChange={(e) => setSoilType(e.target.value)} className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl text-xs font-bold border dark:text-white">
              <option value="Clay / Wet">Clay / Alluvial Soil (Odisha Belts)</option>
              <option value="Sandy / Dry">Sandy / Dry Soil</option>
            </select>
            <button onClick={handleRecommend} className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow">
              Find Best Tree
            </button>
            {recommendedTree && (
              <div className="p-3 bg-emerald-50 dark:bg-slate-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 font-bold space-y-1">
                <p>🌱 Recommended: {recommendedTree.name}</p>
                <p className="text-[10px] text-gray-500">CO₂ Absorption: {recommendedTree.co2} • Care: {recommendedTree.care}</p>
              </div>
            )}
          </div>

          {/* TOOL 2: CARBON FOOTPRINT CALCULATOR */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <Calculator className="text-amber-500" size={18} /> CO₂ Savings Meter
            </h3>
            <p className="text-xs text-gray-500">Enter daily cycling/walking distance in km.</p>
            <input type="number" value={kmTravelled} onChange={(e) => setKmTravelled(Number(e.target.value))} className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl text-xs font-bold border dark:text-white" />
            <button onClick={() => setCo2Saved((kmTravelled * 0.21 * 30).toFixed(1))} className="w-full py-2.5 bg-amber-500 text-slate-950 font-extrabold rounded-xl text-xs shadow">
              Calculate Monthly Offset
            </button>
            {co2Saved && (
              <div className="p-3 bg-amber-50 dark:bg-slate-800 rounded-xl text-xs text-amber-800 dark:text-amber-300 font-bold">
                ⚡ You save <strong>{co2Saved} kg CO₂</strong> every month!
              </div>
            )}
          </div>

          {/* TOOL 3: VIRTUAL TREE ADOPTION */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <TreePine className="text-green-600" size={18} /> Adopt a Virtual Tree
            </h3>
            <p className="text-xs text-gray-500">Give a name to a sapling & get GPS ID.</p>
            <form onSubmit={handleAdopt} className="space-y-2">
              <input type="text" placeholder="Tree Nickname (e.g. Suraj's Neem)" required value={adoptName} onChange={(e) => setAdoptName(e.target.value)} className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl text-xs border dark:text-white" />
              <button type="submit" className="w-full py-2.5 bg-green-600 text-white font-bold rounded-xl text-xs shadow">
                Adopt & Tag Tree
              </button>
            </form>
            {adoptedTree && (
              <div className="p-3 bg-green-50 dark:bg-slate-800 rounded-xl text-xs text-green-800 dark:text-green-300 font-bold">
                🏷️ ID: {adoptedTree.id} • {adoptedTree.name} ({adoptedTree.status})
              </div>
            )}
          </div>
        </div>
        {/* SECOND ROW: SAPLING STORE, EVENT RSVP & LEADERBOARD */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* TOOL 4: FREE SAPLING ORDER STORE */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <Gift className="text-emerald-600" size={18} /> Request Free Saplings
            </h3>
            {orderSuccess ? (
              <div className="p-3 bg-green-100 text-green-800 rounded-xl text-xs font-bold text-center">
                ✅ Order Placed! Free sapling dispatch initialized.
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setOrderSuccess(true); }} className="space-y-2">
                <input type="text" placeholder="Your Name" required value={saplingOrder.name} onChange={(e) => setSaplingOrder({ ...saplingOrder, name: e.target.value })} className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl text-xs border dark:text-white" />
                <input type="tel" placeholder="Phone Number" required value={saplingOrder.phone} onChange={(e) => setSaplingOrder({ ...saplingOrder, phone: e.target.value })} className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl text-xs border dark:text-white" />
                <button type="submit" className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow">
                  Request Free Delivery
                </button>
              </form>
            )}
          </div>

          {/* TOOL 5: UPCOMING DRIVE RSVP */}
          <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-6 rounded-3xl shadow-xl space-y-3 border border-emerald-500/30">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-extrabold text-amber-300 tracking-widest uppercase">Drive Alert</span>
              <Calendar size={16} />
            </div>
            <h4 className="text-lg font-black">Green Earth Campus Sapling Drive 2026</h4>
            <p className="text-xs text-emerald-200">Date: Next Sunday • 8:00 AM</p>
            {eventBooked ? (
              <div className="p-2 bg-emerald-800 text-emerald-200 rounded-xl text-xs font-bold text-center">
                🎟️ Volunteer Pass Booked!
              </div>
            ) : (
              <button onClick={() => setEventBooked(true)} className="w-full py-2.5 bg-emerald-500 text-slate-950 font-black rounded-xl text-xs shadow">
                Reserve Free Volunteer Pass
              </button>
            )}
          </div>

          {/* TOOL 6: COMMUNITY LEADERBOARD */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <Trophy className="text-amber-500" size={18} /> Top Green Ranks
            </h3>
            <div className="space-y-2 text-xs">
              {leaderboard.map((u) => (
                <div key={u.rank} className="flex justify-between p-2 bg-gray-50 dark:bg-slate-800/60 rounded-xl font-bold">
                  <span className="text-gray-800 dark:text-gray-200">#{u.rank} {u.name}</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{u.points}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FEED POST FORM */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b pb-3 border-gray-100 dark:border-slate-800 text-gray-900 dark:text-white font-bold text-base">
            <Camera className="text-green-600" size={20} /> Create Community Post / Report Incident
          </div>

          <form onSubmit={handleCreatePost} className="grid sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Your Name" required value={newPost.author} onChange={(e) => setNewPost({ ...newPost, author: e.target.value })} className="p-3 bg-gray-50 dark:bg-slate-800 rounded-xl border text-xs font-semibold dark:text-white" />
            <input type="text" placeholder="Location" value={newPost.location} onChange={(e) => setNewPost({ ...newPost, location: e.target.value })} className="p-3 bg-gray-50 dark:bg-slate-800 rounded-xl border text-xs font-semibold dark:text-white" />
            <input type="text" placeholder="Title..." required value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} className="sm:col-span-2 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl border text-xs font-semibold dark:text-white" />
            <textarea rows={2} placeholder="Description..." value={newPost.desc} onChange={(e) => setNewPost({ ...newPost, desc: e.target.value })} className="sm:col-span-2 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl border text-xs font-medium dark:text-white" />
            <button type="submit" className="sm:col-span-2 py-3 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow flex items-center justify-center gap-2">
              <Send size={15} /> Publish Post
            </button>
          </form>
        </div>
        {/* FEED LIST WITH UPVOTES */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center text-sm uppercase">
                    {post.author[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">{post.author}</h4>
                    <span className="text-[10px] text-gray-500"><MapPin size={10} className="inline" /> {post.location} • {post.date}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-gray-900 dark:text-white">{post.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{post.desc}</p>
              </div>

              {post.img && (
                <div className="rounded-2xl overflow-hidden max-h-80">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="pt-3 border-t flex items-center gap-3 text-xs">
                <button onClick={() => setPosts(posts.map(p => p.id === post.id ? { ...p, upvotes: p.upvotes + 1 } : p))} className="px-3 py-1.5 bg-gray-100 dark:bg-slate-800 text-green-600 rounded-lg font-bold flex items-center gap-1">
                  <ThumbsUp size={14} /> {post.upvotes}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
