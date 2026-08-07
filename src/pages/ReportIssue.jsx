import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  MapPin,
  Sparkles,
  ShieldCheck,
  Award,
  Filter,
  Navigation,
  Search,
  Zap,
  ChevronDown,
  Printer,
  X,
  Scan,
  Compass,
  Clock,
  Package,
  Leaf,
  Boxes,
  ShieldAlert,
  Weight,
  QrCode,
  Radio,
  FileCheck,
  Map as MapIcon,
  Trophy,
  Megaphone,
  ThumbsUp,
  ExternalLink,
  Send,
  Share2,
  Copy,
  Download,
  Check,
  Maximize2,
  Minimize2,
  Globe
} from "lucide-react";

export default function ReportIssue() {
  const [activeTab, setActiveTab] = useState("report");
  const [filterSeverity, setFilterSeverity] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const [wasteType, setWasteType] = useState("Plastic & Dry Waste");
  const [severity, setSeverity] = useState("Medium Hazard");
  const [openWasteDrop, setOpenWasteDrop] = useState(false);
  const [openSeverityDrop, setOpenSeverityDrop] = useState(false);

  // Map States
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [isMapMaximized, setIsMapMaximized] = useState(false);
  const [userCoords, setUserCoords] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Broadcast Modal State
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [driveDate, setDriveDate] = useState("");

  const [complaints, setComplaints] = useState([
    {
      id: "CMP-101",
      location: "Main Market Road, Sector 4",
      description: "Dumped plastic packaging and dry polythene waste near the public park drain.",
      wasteType: "Plastic & Dry Waste",
      severity: "High Hazard",
      beforeImg: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80",
      afterImg: null,
      reporter: "Suraj Kumar",
      resolver: null,
      status: "PENDING",
      aiConfidence: "96.4%",
      estimatedWeight: "45 Kg",
      votes: 12,
      hazardIndex: "8.5 / 10",
      date: "2026-08-01"
    }
  ]);

  const leaderboardData = [
    { rank: 1, name: "Suraj Kumar", points: 1450, solved: 14, badge: "Green Legend" },
    { rank: 2, name: "Rahul Mohanty", points: 980, solved: 9, badge: "Eco Warrior" },
    { rank: 3, name: "Ananya Sharma", points: 720, solved: 7, badge: "Clean Guardian" }
  ];

  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [beforeImagePreview, setBeforeImagePreview] = useState(null);
  const [reporterName, setReporterName] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [isScanningPhoto, setIsScanningPhoto] = useState(false);

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [resolverName, setResolverName] = useState("");
  const [afterImagePreview, setAfterImagePreview] = useState(null);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [customPopup, setCustomPopup] = useState(null);
  const [showCertificate, setShowCertificate] = useState(null);

  const wasteCategories = [
    { title: "Plastic & Dry Waste", icon: Package, desc: "Bottles, bags, polythene, packaging" },
    { title: "Bio-degradable Waste", icon: Leaf, desc: "Food, organic waste, garden leaves" },
    { title: "Construction Debris", icon: Boxes, desc: "Bricks, cement bags, heavy dirt" },
    { title: "Hazardous / E-Waste", icon: ShieldAlert, desc: "Batteries, glass, wires, chemicals" }
  ];

  const severityLevels = [
    { title: "Low Hazard", color: "text-emerald-500", badge: "Low Risk" },
    { title: "Medium Hazard", color: "text-amber-500", badge: "Moderate Risk" },
    { title: "High Hazard", color: "text-red-500", badge: "High Priority" }
  ];

  const totalReports = complaints.length;
  const resolvedCount = complaints.filter(c => c.status.includes("RESOLVED")).length;
  const pendingCount = totalReports - resolvedCount;

  // Auto GPS Location Lock
  const handleGPSLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setUserCoords({ lat, lng });
          setLocation(`Lat: ${lat.toFixed(4)}° N, Long: ${lng.toFixed(4)}° E (Exact GPS Locked)`);
          setCustomPopup({ title: "Exact GPS Position Locked", desc: `Latitude: ${lat.toFixed(4)}, Longitude: ${lng.toFixed(4)}` });
        },
        () => {
          setCustomPopup({ title: "GPS Access Required", desc: "Please enable device location permission." });
        },
        { enableHighAccuracy: true }
      );
    }
  };

  const handleOpenMap = () => {
    handleGPSLocation();
    setShowHeatmap(true);
  };

  const handleCopyLocation = () => {
    if (!userCoords) return;
    const text = `Lat: ${userCoords.lat.toFixed(4)}, Long: ${userCoords.lng.toFixed(4)} - Green Earth GPS Grid`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareLocation = () => {
    if (!userCoords) return;
    const shareUrl = `https://maps.google.com/?q=${userCoords.lat},${userCoords.lng}`;
    if (navigator.share) {
      navigator.share({
        title: "My Live Environmental Grid Position",
        text: "Check out my exact GPS coordinates:",
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCustomPopup({ title: "Map Link Copied!", desc: "Google Satellite Map link copied to clipboard." });
    }
  };

  const handleBeforeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBeforeImagePreview(URL.createObjectURL(file));
      setIsScanningPhoto(true);
      setTimeout(() => setIsScanningPhoto(false), 1800);
    }
  };

  const handleAfterImage = (e) => {
    const file = e.target.files[0];
    if (file) setAfterImagePreview(URL.createObjectURL(file));
  };

  const handleVote = (id) => {
    setComplaints(complaints.map(cmp => cmp.id === id ? { ...cmp, votes: cmp.votes + 1 } : cmp));
  };

  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    if (!location || !beforeImagePreview) {
      setCustomPopup({ title: "Validation Error", desc: "Location and waste image are mandatory." });
      return;
    }

    const newIssue = {
      id: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
      location,
      description,
      wasteType,
      severity: isUrgent ? "CRITICAL EMERGENCY" : severity,
      beforeImg: beforeImagePreview,
      afterImg: null,
      reporter: reporterName || "Eco Citizen",
      resolver: null,
      status: "PENDING",
      aiConfidence: `${(92 + Math.random() * 7).toFixed(1)}%`,
      estimatedWeight: `${Math.floor(20 + Math.random() * 60)} Kg`,
      votes: 1,
      hazardIndex: isUrgent ? "9.8 / 10" : "6.5 / 10",
      date: new Date().toISOString().split("T")[0]
    };

    setComplaints([newIssue, ...complaints]);
    setLocation("");
    setDescription("");
    setBeforeImagePreview(null);
    setReporterName("");
    setIsUrgent(false);
    setCustomPopup({ title: "Issue Logged on AI Grid", desc: "Complaint ID assigned and dispatched to grid." });
  };

  const handleResolveSubmit = (e) => {
    e.preventDefault();
    if (!afterImagePreview || !resolverName) {
      setCustomPopup({ title: "Verification Action Required", desc: "Name and cleaned site image are mandatory." });
      return;
    }

    setIsAiAnalyzing(true);

    setTimeout(() => {
      setIsAiAnalyzing(false);

      const updated = complaints.map((cmp) => {
        if (cmp.id === selectedComplaint.id) {
          return {
            ...cmp,
            status: "RESOLVED 🟢",
            afterImg: afterImagePreview,
            resolver: resolverName
          };
        }
        return cmp;
      });

      setComplaints(updated);
      setShowCertificate({
        id: selectedComplaint.id,
        hero: resolverName,
        reporter: selectedComplaint.reporter,
        location: selectedComplaint.location,
        wasteType: selectedComplaint.wasteType,
        date: new Date().toLocaleDateString()
      });

      setSelectedComplaint(null);
      setAfterImagePreview(null);
      setResolverName("");
    }, 2200);
  };

  const handleBroadcastSubmit = (e) => {
    e.preventDefault();
    setShowBroadcastModal(false);
    setCustomPopup({
      title: "Cleanliness Drive Broadcasted!",
      desc: `Alert dispatched to local volunteers for ${driveDate || 'Scheduled Drive'}.`
    });
    setBroadcastMsg("");
    setDriveDate("");
  };

  const filteredComplaints = complaints.filter((item) => {
    const matchesSeverity = filterSeverity === "ALL" || item.severity.includes(filterSeverity);
    const matchesSearch = item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-800 dark:text-gray-100 py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto pt-16">
        
        {/* TOP TOOLBAR */}
        <div className="flex flex-wrap justify-between items-center gap-3 mb-8 bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <Scan size={14} className="text-emerald-500" /> Real-time Live Grid Active
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleOpenMap}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Globe size={14} /> Open Google Satellite 3D Map
            </button>
            <button
              onClick={() => setShowBroadcastModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Megaphone size={14} /> Broadcast Drive Alert
            </button>
          </div>
        </div>

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 px-4 py-1.5 rounded-full font-bold text-xs border border-emerald-300 dark:border-emerald-800">
            <ShieldCheck size={14} className="text-emerald-600 dark:text-emerald-400" /> Community Environmental Clearance Grid
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mt-4 tracking-tight">
            Eco Clean & Waste Portal
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm sm:text-base leading-relaxed">
            Report waste dumps with exact GPS tag or resolve active complaints to generate AI-verified certificates.
          </p>

          {/* REAL-TIME IMPACT COUNTERS */}
          <div className="grid grid-cols-3 gap-3 mt-6 max-w-lg mx-auto">
            <div className="p-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl text-center shadow-sm">
              <p className="text-[10px] font-bold uppercase text-gray-400">Total Grid Reports</p>
              <p className="text-lg font-black text-gray-900 dark:text-white mt-0.5">{totalReports}</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl text-center shadow-sm">
              <p className="text-[10px] font-bold uppercase text-gray-400">Active Pending</p>
              <p className="text-lg font-black text-amber-600 dark:text-amber-400 mt-0.5">{pendingCount}</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl text-center shadow-sm">
              <p className="text-[10px] font-bold uppercase text-gray-400">AI Verified Solved</p>
              <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">{resolvedCount}</p>
            </div>
          </div>

          {/* TAB SWITCHER */}
          <div className="mt-8 inline-flex bg-gray-200 dark:bg-slate-800 p-1.5 rounded-full border border-gray-300 dark:border-slate-700 shadow-md">
            <button
              onClick={() => setActiveTab("report")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "report"
                  ? "bg-red-600 text-white shadow-md scale-105"
                  : "text-gray-700 dark:text-gray-300 hover:text-red-600"
              }`}
            >
              <AlertTriangle size={14} /> Report Waste Dump
            </button>
            <button
              onClick={() => setActiveTab("resolve")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "resolve"
                  ? "bg-emerald-600 text-white shadow-md scale-105"
                  : "text-gray-700 dark:text-gray-300 hover:text-emerald-600"
              }`}
            >
              <CheckCircle2 size={14} /> Cleanup Grid ({pendingCount})
            </button>
            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "leaderboard"
                  ? "bg-amber-500 text-white shadow-md scale-105"
                  : "text-gray-700 dark:text-gray-300 hover:text-amber-500"
              }`}
            >
              <Trophy size={14} /> Eco Leaderboard
            </button>
          </div>
        </div>

        {/* TAB 1: REPORT FORM */}
        {activeTab === "report" && (
          <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-slate-800 space-y-6">
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <Camera className="text-red-500" size={22} /> Register Waste Clearance Issue
            </h2>

            <form onSubmit={handleComplaintSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1.5">
                  Reporter Identity / Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Suraj Kumar"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  className="w-full p-3.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm focus:outline-none text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400">
                    Exact Location / Coordinates *
                  </label>
                  <button
                    type="button"
                    onClick={handleGPSLocation}
                    className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Compass size={12} /> Lock Exact GPS
                  </button>
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 text-red-500" size={18} />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Main Market Road, Sector 4"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 p-3.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm focus:outline-none text-gray-900 dark:text-white placeholder-gray-400"
                  />
                </div>
              </div>

              {/* CUSTOM LUCIDE DROPDOWNS */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1.5">
                    Waste Category
                  </label>
                  <button
                    type="button"
                    onClick={() => { setOpenWasteDrop(!openWasteDrop); setOpenSeverityDrop(false); }}
                    className="w-full p-3.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-bold flex justify-between items-center text-gray-900 dark:text-white cursor-pointer"
                  >
                    <span>{wasteType}</span>
                    <ChevronDown size={16} className={`transition-transform ${openWasteDrop ? "rotate-180" : ""}`} />
                  </button>

                  {openWasteDrop && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-30 space-y-1">
                      {wasteCategories.map((cat) => {
                        const IconComponent = cat.icon;
                        return (
                          <div
                            key={cat.title}
                            onClick={() => { setWasteType(cat.title); setOpenWasteDrop(false); }}
                            className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer transition flex items-center gap-2.5"
                          >
                            <IconComponent size={18} className="text-emerald-500" />
                            <div>
                              <p className="text-xs font-bold text-gray-900 dark:text-white">{cat.title}</p>
                              <p className="text-[10px] text-gray-500 dark:text-gray-400">{cat.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1.5">
                    Dump Severity / Size
                  </label>
                  <button
                    type="button"
                    onClick={() => { setOpenSeverityDrop(!openSeverityDrop); setOpenWasteDrop(false); }}
                    className="w-full p-3.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-bold flex justify-between items-center text-gray-900 dark:text-white cursor-pointer"
                  >
                    <span>{severity}</span>
                    <ChevronDown size={16} className={`transition-transform ${openSeverityDrop ? "rotate-180" : ""}`} />
                  </button>

                  {openSeverityDrop && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-30 space-y-1">
                      {severityLevels.map((lvl) => (
                        <div
                          key={lvl.title}
                          onClick={() => { setSeverity(lvl.title); setOpenSeverityDrop(false); }}
                          className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer transition flex items-center justify-between"
                        >
                          <span className="text-xs font-bold text-gray-900 dark:text-white">{lvl.title}</span>
                          <span className={`text-[10px] font-bold ${lvl.color}`}>{lvl.badge}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <label className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/40 rounded-2xl border border-red-200 dark:border-red-900/50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="w-4 h-4 accent-red-600 rounded"
                />
                <span className="text-xs font-bold text-red-700 dark:text-red-300 flex items-center gap-1.5">
                  <Radio size={14} className="text-red-500 animate-pulse" /> Emergency Priority Dispatch
                </span>
              </label>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1.5">
                  Specific Landmark / Instructions
                </label>
                <textarea
                  rows="3"
                  placeholder="e.g. Opposite to the blue gate near electric pole..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm focus:outline-none text-gray-900 dark:text-white placeholder-gray-400"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1.5">
                  Upload Site Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBeforeImage}
                  className="block w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-red-50 dark:file:bg-red-950/80 file:text-red-700 dark:file:text-red-300 cursor-pointer"
                />

                {beforeImagePreview && (
                  <div className="mt-3 relative rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800">
                    <img src={beforeImagePreview} alt="Preview" className="w-full h-48 object-cover" />
                    {isScanningPhoto ? (
                      <div className="absolute inset-0 bg-emerald-500/10 backdrop-blur-[1px] flex flex-col justify-between p-4 border-2 border-emerald-500">
                        <div className="w-full h-1 bg-emerald-400 shadow-[0_0_15px_#10b981] animate-pulse"></div>
                        <p className="text-center text-xs font-black text-emerald-400 bg-slate-900/90 py-1.5 rounded-full uppercase tracking-wider flex items-center justify-center gap-1.5">
                          <Scan size={14} className="animate-spin" /> AI Laser Analyzing Waste Density...
                        </p>
                      </div>
                    ) : (
                      <span className="absolute bottom-2 right-2 bg-slate-900/90 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-500/40 flex items-center gap-1">
                        <Weight size={12} /> AI Density Analysis Ready
                      </span>
                    )}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
              >
                <AlertTriangle size={18} /> Register Official Clearance Issue
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: LEADERBOARD */}
        {activeTab === "leaderboard" && (
          <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-slate-800 space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  <Trophy className="text-amber-500" size={24} /> Eco Heroes Hall of Fame
                </h2>
                <p className="text-xs text-gray-500 mt-1">Top volunteers ranked by verified cleanliness resolutions.</p>
              </div>
            </div>

            <div className="space-y-3">
              {leaderboardData.map((hero) => (
                <div key={hero.rank} className="p-4 bg-gray-50 dark:bg-slate-800/80 rounded-2xl border border-gray-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center ${
                      hero.rank === 1 ? "bg-amber-400 text-slate-900" : hero.rank === 2 ? "bg-gray-300 text-slate-900" : "bg-amber-700 text-white"
                    }`}>
                      #{hero.rank}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">{hero.name}</h4>
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{hero.badge}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-amber-500">{hero.points} Pts</p>
                    <p className="text-[10px] text-gray-400">{hero.solved} Drives Solved</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ACTIVE CLEANUP GRID */}
        {activeTab === "resolve" && (
          <div>
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mb-6">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-3 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search locality or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 p-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>

              <div className="flex gap-2 w-full sm:w-auto justify-end">
                {["ALL", "High", "Medium", "Low"].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setFilterSeverity(lvl)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                      filterSeverity === lvl
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-extrabold"
                        : "bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredComplaints.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-gray-200 dark:border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-extrabold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-3 py-1 rounded-full border border-red-200 dark:border-red-900">
                        {item.id}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleVote(item.id)}
                          className="text-[10px] font-bold text-slate-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 px-2.5 py-1 rounded-full hover:bg-emerald-100 flex items-center gap-1 cursor-pointer"
                        >
                          <ThumbsUp size={11} className="text-emerald-500" /> {item.votes} Votes
                        </button>
                        <span
                          className={`text-[10px] font-extrabold px-3 py-1 rounded-full ${
                            item.status.includes("RESOLVED")
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800 animate-pulse"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <MapPin size={16} className="text-red-500 shrink-0" /> {item.location}
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(item.location)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 hover:underline ml-1"
                        title="Navigate on Google Maps"
                      >
                        <ExternalLink size={13} />
                      </a>
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">{item.description}</p>

                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div>
                        <p className="text-[10px] font-bold text-red-600 dark:text-red-400 mb-1">BEFORE (Garbage Dump)</p>
                        <img src={item.beforeImg} alt="Before" className="w-full h-28 object-cover rounded-xl border border-gray-200 dark:border-slate-800" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mb-1">AFTER (Cleaned Spot)</p>
                        {item.afterImg ? (
                          <img src={item.afterImg} alt="After" className="w-full h-28 object-cover rounded-xl border border-emerald-300 dark:border-emerald-800" />
                        ) : (
                          <div className="w-full h-28 bg-gray-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-xs text-gray-400 text-center px-2">
                            Awaiting Volunteer Action
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-800 text-[11px] text-gray-500 dark:text-gray-400 flex justify-between">
                      <span>Reporter: <strong className="text-gray-800 dark:text-gray-200">{item.reporter}</strong></span>
                      {item.resolver && (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <Award size={14} className="text-amber-500" /> Resolved by {item.resolver}
                        </span>
                      )}
                    </div>
                  </div>

                  {!item.status.includes("RESOLVED") && (
                    <button
                      onClick={() => setSelectedComplaint(item)}
                      className="mt-5 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 size={16} /> Mark Cleaned & Verify Solution
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REAL GOOGLE SATELLITE HYBRID 3D MAP MODAL WITH MINIMIZE / FULLSCREEN */}
        {showHeatmap && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6">
            <div className={`bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 relative shadow-2xl transition-all duration-300 flex flex-col justify-between ${
              isMapMaximized 
                ? "w-full h-full rounded-none p-4" 
                : "max-w-4xl w-full h-[540px] rounded-3xl p-6"
            }`}>
              
              {/* MODAL HEADER WITH FULLSCREEN & MINIMIZE BUTTONS */}
              <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-gray-100 dark:border-slate-800">
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                    <Globe className="text-emerald-500" size={20} /> Live Google Satellite Hybrid 3D Grid Map
                  </h3>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    {userCoords ? `Device Locked GPS: ${userCoords.lat.toFixed(4)}°, ${userCoords.lng.toFixed(4)}°` : 'Fetching exact GPS location...'}
                  </p>
                </div>

                {/* TOOL BUTTONS */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLocation}
                    className="px-2.5 py-1.5 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 text-gray-800 dark:text-gray-200 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedLink ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                    {copiedLink ? "Copied" : "Copy"}
                  </button>
                  <button
                    onClick={handleShareLocation}
                    className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Share2 size={13} /> Share
                  </button>

                  {/* MINIMIZE / MAXIMIZE TOGGLE BUTTON */}
                  <button
                    onClick={() => setIsMapMaximized(!isMapMaximized)}
                    className="p-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 text-gray-800 dark:text-gray-200 rounded-xl cursor-pointer"
                    title={isMapMaximized ? "Minimize Map" : "Maximize / Fullscreen"}
                  >
                    {isMapMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                  </button>

                  <button
                    onClick={() => { setShowHeatmap(false); setIsMapMaximized(false); }}
                    className="p-2 bg-red-100 dark:bg-red-950/60 hover:bg-red-200 text-red-600 dark:text-red-400 rounded-xl cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              
              {/* GOOGLE SATELLITE IFRAME EMBED WITH EXACT LIVE LOCATION */}
              <div className="w-full flex-1 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800 relative mt-3 min-h-[340px]">
                {userCoords ? (
                  <iframe
                    title="Google Satellite 3D Live Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://maps.google.com/?q=${userCoords.lat},${userCoords.lng}&hl=en&z=17&output=embed`}
                  ></iframe>
                ) : (
                  <div className="h-full w-full bg-slate-900 flex flex-col items-center justify-center text-white p-4 space-y-3">
                    <Compass className="animate-spin text-emerald-400" size={32} />
                    <p className="text-xs font-bold text-gray-300">Locking Device Precise GPS Coordinates...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* BROADCAST ANNOUNCEMENT MODAL */}
        {showBroadcastModal && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-gray-200 dark:border-slate-800 relative shadow-2xl space-y-4">
              <button onClick={() => setShowBroadcastModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer">
                <X size={20} />
              </button>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Megaphone className="text-emerald-500" size={22} /> Broadcast Cleanliness Drive Alert
              </h3>
              <p className="text-xs text-gray-500">Dispatch live drive alerts to volunteers near your active GPS grid.</p>

              <form onSubmit={handleBroadcastSubmit} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">Drive Date *</label>
                  <input
                    type="date"
                    required
                    value={driveDate}
                    onChange={(e) => setDriveDate(e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">Broadcast Announcement Message *</label>
                  <textarea
                    rows="3"
                    required
                    placeholder="e.g. Cleanliness drive organized near Sector 4 Park. Join us with gloves!"
                    value={broadcastMsg}
                    onChange={(e) => setBroadcastMsg(e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none text-gray-900 dark:text-white"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send size={14} /> Send Live Alert to Local Volunteers
                </button>
              </form>
            </div>
          </div>
        )}

        {/* CUSTOM POPUP */}
        {customPopup && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-sm w-full border border-gray-200 dark:border-slate-800 relative shadow-2xl text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
                <Sparkles size={24} />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">{customPopup.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">{customPopup.desc}</p>
              <button
                onClick={() => setCustomPopup(null)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer"
              >
                Acknowledge
              </button>
            </div>
          </div>
        )}

        {/* RESOLVE MODAL */}
        {selectedComplaint && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-gray-200 dark:border-slate-800 relative shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="text-emerald-500" size={22} /> Resolve Complaint #{selectedComplaint.id}
              </h3>

              <form onSubmit={handleResolveSubmit} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                    Your Name / Eco Hero Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suraj Kumar"
                    value={resolverName}
                    onChange={(e) => setResolverName(e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">
                    Upload Photo of Cleaned Area *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleAfterImage}
                    className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 dark:file:bg-emerald-950 file:text-emerald-700 dark:file:text-emerald-400 cursor-pointer"
                  />
                  {afterImagePreview && (
                    <img src={afterImagePreview} alt="Cleaned" className="mt-2 w-full h-32 object-cover rounded-xl border border-emerald-300 dark:border-emerald-800" />
                  )}
                </div>

                {isAiAnalyzing ? (
                  <div className="p-4 bg-emerald-50 dark:bg-slate-800 rounded-xl text-center space-y-2">
                    <Sparkles className="animate-spin mx-auto text-emerald-600 dark:text-emerald-400" size={24} />
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      AI Cross-Referencing Image Data...
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedComplaint(null)}
                      className="flex-1 py-3 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer"
                    >
                      Verify & Generate Certificate
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {/* OFFICIAL CERTIFICATE */}
        {showCertificate && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-lg w-full border-4 border-amber-400 relative shadow-2xl text-center space-y-4">
              <button
                onClick={() => setShowCertificate(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto border-2 border-amber-400">
                <Award size={36} />
              </div>

              <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-wide uppercase">
                Certificate of Clearance Excellence
              </h2>
              <p className="text-xs text-amber-600 dark:text-amber-400 uppercase tracking-widest font-bold">Green Earth AI Community Grid</p>

              <div className="my-4 py-4 bg-gray-50 dark:bg-slate-800/80 rounded-2xl border border-gray-200 dark:border-slate-700 text-center">
                <p className="text-xs text-gray-500">This Official AI Certificate is awarded to:</p>
                <h3 className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{showCertificate.hero}</h3>
                <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-2 px-4 leading-relaxed">
                  For successfully resolving issue <strong>#{showCertificate.id}</strong> ({showCertificate.wasteType}) located at {showCertificate.location}.
                </p>
              </div>

              <div className="flex justify-between items-center text-[10px] text-gray-500 dark:text-gray-400 px-4 pt-2 border-t border-gray-100 dark:border-slate-800">
                <span>Issued Date: {showCertificate.date}</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <QrCode size={14} /> AI Grid Verified
                </span>
              </div>

              <button
                onClick={() => window.print()}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl text-xs shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Printer size={16} /> Print / Save Official Certificate
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
