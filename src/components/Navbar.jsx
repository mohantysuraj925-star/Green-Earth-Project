import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Menu, X, Leaf, Heart, Bell, Globe, User, Check, Search, ChevronDown,
  Home, Info, Briefcase, Flag, BookOpen, Image, FileText, PhoneCall, Sparkles, Users, BarChart2, AlertTriangle, ShieldCheck, LogOut, LayoutDashboard
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const location = useLocation();

  const [authTab, setAuthTab] = useState("login");
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  const [userFormData, setUserFormData] = useState({ name: "", email: "", password: "" });
  const [volunteerFormData, setVolunteerFormData] = useState({ name: "", email: "", password: "", location: "", agreeTerms: false });
  const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });

  const [loading, setLoading] = useState(false);
  
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("green_earth_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg({ type: "", text: "" });

    let endpoint = "";
    let payload = {};

    if (authTab === "login") {
      endpoint = "http://127.0.0.1:8000/api/login/";
      payload = { email: loginFormData.email, password: loginFormData.password };
    } else if (authTab === "user") {
      endpoint = "http://127.0.0.1:8000/api/register/";
      payload = { ...userFormData, role: "user" };
    } else if (authTab === "volunteer") {
      if (!volunteerFormData.agreeTerms) {
        setStatusMsg({ type: "error", text: "Please accept the Terms & Conditions." });
        setLoading(false);
        return;
      }
      endpoint = "http://127.0.0.1:8000/api/register/";
      payload = { ...volunteerFormData, role: "volunteer", is_paid: true };
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMsg({ type: "success", text: data.message });
        if (authTab === "login") {
          setCurrentUser(data.user);
          localStorage.setItem("green_earth_user", JSON.stringify(data.user));
          setTimeout(() => setAuthModalOpen(false), 1200);
        } else {
          setAuthTab("login");
        }
      } else {
        setStatusMsg({ type: "error", text: data.error || "Operation failed!" });
      }
    } catch (error) {
      setStatusMsg({ type: "error", text: "Server connection failed! Ensure backend is running." });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("green_earth_user");
    setAuthModalOpen(false);
  };

  const translations = {
    EN: { Home: "Home", About: "About", Services: "Services", Campaigns: "Campaigns", EcoHub: "EcoHub", Community: "Community", CarbonTracker: "Carbon Tracker", ReportIssue: "Report Issue", "Learn More": "Learn More", Gallery: "Gallery", Blog: "Blog", Contact: "Contact", Donate: "Donate", More: "More", LiveUpdates: "Live Updates", DriveNotice: "Tree plantation drive tomorrow!" },
    HI: { Home: "होम", About: "हमारे बारे में", Services: "सेवाएं", Campaigns: "अभियान", EcoHub: "इको हब", Community: "कम्यूनिटी", CarbonTracker: "कार्बन ट्रैकर", ReportIssue: "रिपोर्ट करें", "Learn More": "और जानें", Gallery: "गैलरी", Blog: "ब्लॉग", Contact: "संपर्क करें", Donate: "दान करें", More: "अन्य", LiveUpdates: "लाइव अपडेट", DriveNotice: "कल पौधारोपण अभियान!" },
    OR: { Home: "ଗୃହ", About: "ଆମ ବିଷୟରେ", Services: "ସେବାସମୂହ", Campaigns: "ଅଭିଯାନ", EcoHub: "ଇକୋ ହବ୍", Community: "କମ୍ୟୁନିଟି", CarbonTracker: "କାର୍ବନ୍ ଟ୍ରାକର୍", ReportIssue: "ରିପୋର୍ଟ କରନ୍ତୁ", "Learn More": "ଅଧିକ ଜାଣନ୍ତୁ", Gallery: "ଗ୍ୟାଲେରୀ", Blog: "ବ୍ଲଗ୍", Contact: "ଯୋଗାଯୋଗ", Donate: "ଦାନ କରନ୍ତୁ", More: "ଅଧିକ", LiveUpdates: "ଲାଇଭ୍ ଅପଡେଟ୍", DriveNotice: "ଆସନ୍ତାକାଲି ବୃକ୍ଷରୋପଣ!" }
  };

  const t = translations[currentLang];
  const primaryLinks = [
    { name: t.Home, path: "/", icon: Home },
    { name: t.About, path: "/about", icon: Info },
    { name: t.Services, path: "/services", icon: Briefcase },
    { name: t.Campaigns, path: "/campaigns", icon: Flag },
    { name: t.EcoHub, path: "/ecohub", icon: Sparkles },
    { name: t.Community, path: "/community", icon: Users },
  ];

  const secondaryLinks = [
    { name: t.CarbonTracker, path: "/carbon-tracker", icon: BarChart2 },
    { name: t.ReportIssue, path: "/report-issue", icon: AlertTriangle },
    { name: t["Learn More"], path: "/learn-more", icon: BookOpen },
    { name: t.Gallery, path: "/gallery", icon: Image },
    { name: t.Blog, path: "/blog", icon: FileText },
    { name: t.Contact, path: "/contact", icon: PhoneCall }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-slate-800 py-2" : "bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 py-3"
    }`}>
      <div className="w-full px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <div className="p-1.5 bg-green-100 dark:bg-green-950/80 rounded-xl group-hover:scale-105 transition-transform">
            <Leaf className="text-green-600 dark:text-green-400" size={20} />
          </div>
          <span className="text-base sm:text-lg font-extrabold text-gray-900 dark:text-white tracking-tight">
            Green <span className="text-green-600 dark:text-green-400 underline decoration-amber-400 underline-offset-4">Earth</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-1 bg-gray-100/80 dark:bg-slate-800/80 p-1 rounded-full border border-gray-200/50 dark:border-slate-700/50 shrink-0">
          {primaryLinks.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <NavLink key={idx} to={item.path} className={({ isActive }) => `px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1 whitespace-nowrap ${isActive ? "bg-green-600 text-white shadow-md font-extrabold" : "text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-200/60 dark:hover:bg-slate-700/60"}`}>
                <IconComponent size={13} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

          <div className="relative">
            <button onClick={() => setMoreOpen(!moreOpen)} className="px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition text-gray-700 dark:text-gray-200">
              <span>{t.More}</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`} />
            </button>
            {moreOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-2xl p-1.5 z-50 space-y-1">
                {secondaryLinks.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <NavLink key={idx} to={item.path} onClick={() => setMoreOpen(false)} className="px-3 py-2 text-xs font-bold flex items-center gap-2 rounded-xl text-gray-800 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-slate-800">
                      <IconComp size={14} />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button onClick={() => setSearchModalOpen(true)} className="p-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-slate-700">
            <Search size={16} />
          </button>

          {/* USER ACCOUNT BUTTON */}
          <button onClick={() => { setStatusMsg({ type: "", text: "" }); setAuthModalOpen(true); }} className="p-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-slate-700 flex items-center gap-1.5 cursor-pointer">
            <User size={16} className={currentUser ? "text-green-600 dark:text-green-400" : ""} />
            {currentUser && <span className="text-xs font-bold text-green-600 dark:text-green-400 max-w-[80px] truncate">{currentUser.name}</span>}
          </button>

          <ThemeToggle />

          <Link to="/donate" className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-extrabold shadow-md flex items-center gap-1.5 shrink-0">
            <Heart size={14} className="fill-white" />
            <span>{t.Donate}</span>
          </Link>
        </div>
      </div>

      {/* ACCOUNT MODAL */}
      {authModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 max-w-sm w-full border border-gray-200 dark:border-slate-800 relative shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <button onClick={() => setAuthModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"><X size={20} /></button>

            {/* IF LOGGED IN: SHOW PROFILE CARD */}
            {currentUser ? (
              <div className="text-center space-y-4 pt-2">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-950/80 rounded-full flex items-center justify-center mx-auto text-green-600 font-extrabold text-2xl">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">{currentUser.name}</h3>
                  <p className="text-xs text-gray-500">{currentUser.email}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-green-100 dark:bg-green-900/60 text-green-700 dark:text-green-300 text-[11px] font-bold rounded-full uppercase tracking-wider">
                    Role: {currentUser.role}
                  </span>
                </div>

                {/* ADMIN DASHBOARD BUTTON (Visible to Admin Role) */}
                {(currentUser.role === "ADMIN" || currentUser.role === "admin" || currentUser.email === "admin") && (
                  <Link
                    to="/admin-dashboard"
                    onClick={() => setAuthModalOpen(false)}
                    className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition"
                  >
                    <LayoutDashboard size={15} /> Go to Admin Dashboard
                  </Link>
                )}

                <button onClick={handleLogout} className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer">
                  <LogOut size={15} /> Sign Out
                </button>
              </div>
            ) : (
              /* IF NOT LOGGED IN: SHOW TABS & FORM */
              <>
                <div className="flex items-center bg-gray-100 dark:bg-slate-800 p-1 rounded-2xl gap-1">
                  <button onClick={() => { setAuthTab("user"); setStatusMsg({ type: "", text: "" }); }} className={`flex-1 py-1.5 text-[11px] font-bold rounded-xl transition ${authTab === "user" ? "bg-green-600 text-white shadow" : "text-gray-600 dark:text-gray-300"}`}>User</button>
                  <button onClick={() => { setAuthTab("volunteer"); setStatusMsg({ type: "", text: "" }); }} className={`flex-1 py-1.5 text-[11px] font-bold rounded-xl transition ${authTab === "volunteer" ? "bg-green-600 text-white shadow" : "text-gray-600 dark:text-gray-300"}`}>Volunteer</button>
                  <button onClick={() => { setAuthTab("login"); setStatusMsg({ type: "", text: "" }); }} className={`flex-1 py-1.5 text-[11px] font-bold rounded-xl transition ${authTab === "login" ? "bg-green-600 text-white shadow" : "text-gray-600 dark:text-gray-300"}`}>Sign In</button>
                </div>

                {statusMsg.text && (
                  <div className={`p-2.5 rounded-xl text-xs font-semibold ${statusMsg.type === "success" ? "bg-green-100 text-green-800 border border-green-300" : "bg-red-100 text-red-800 border border-red-300"}`}>
                    {statusMsg.text}
                  </div>
                )}

                <form onSubmit={handleAuthSubmit} className="space-y-3 pt-1">
                  {authTab === "user" && (
                    <>
                      <input type="text" placeholder="Full Name" value={userFormData.name} onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })} required className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border rounded-xl text-xs dark:text-white border-gray-200 dark:border-slate-700 focus:outline-none" />
                      <input type="email" placeholder="Email Address" value={userFormData.email} onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })} required className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border rounded-xl text-xs dark:text-white border-gray-200 dark:border-slate-700 focus:outline-none" />
                      <input type="password" placeholder="Password" value={userFormData.password} onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })} required className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border rounded-xl text-xs dark:text-white border-gray-200 dark:border-slate-700 focus:outline-none" />
                      <div className="p-2 bg-blue-50 dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-slate-700 text-[10px] text-blue-700 dark:text-blue-300">
                        💳 Subscription: ₹1 / Month (Report Issues & Tracking)
                      </div>
                    </>
                  )}

                  {authTab === "volunteer" && (
                    <>
                      <input type="text" placeholder="Full Name" value={volunteerFormData.name} onChange={(e) => setVolunteerFormData({ ...volunteerFormData, name: e.target.value })} required className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border rounded-xl text-xs dark:text-white border-gray-200 dark:border-slate-700 focus:outline-none" />
                      <input type="email" placeholder="Email Address" value={volunteerFormData.email} onChange={(e) => setVolunteerFormData({ ...volunteerFormData, email: e.target.value })} required className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border rounded-xl text-xs dark:text-white border-gray-200 dark:border-slate-700 focus:outline-none" />
                      <input type="text" placeholder="City / Location" value={volunteerFormData.location} onChange={(e) => setVolunteerFormData({ ...volunteerFormData, location: e.target.value })} required className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border rounded-xl text-xs dark:text-white border-gray-200 dark:border-slate-700 focus:outline-none" />
                      <input type="password" placeholder="Password" value={volunteerFormData.password} onChange={(e) => setVolunteerFormData({ ...volunteerFormData, password: e.target.value })} required className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border rounded-xl text-xs dark:text-white border-gray-200 dark:border-slate-700 focus:outline-none" />
                      
                      <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1">
                        <div className="flex items-center gap-1 font-bold text-amber-800 dark:text-amber-300 text-[11px]">
                          <ShieldCheck size={14} /> Volunteer Policy Notice
                        </div>
                        <ul className="text-[10px] text-amber-900 dark:text-amber-200 list-disc list-inside space-y-0.5">
                          <li>One-time fee of ₹10 for Lifetime Free Access.</li>
                          <li>Volunteers receive no monetary salary or wages.</li>
                          <li>Includes verified career rankings and job certificates.</li>
                        </ul>
                      </div>

                      <label className="flex items-start gap-2 cursor-pointer text-[10px] text-gray-600 dark:text-gray-300">
                        <input type="checkbox" checked={volunteerFormData.agreeTerms} onChange={(e) => setVolunteerFormData({ ...volunteerFormData, agreeTerms: e.target.checked })} className="mt-0.5 rounded text-green-600" />
                        <span>I agree to work voluntarily without financial compensation.</span>
                      </label>
                    </>
                  )}

                  {authTab === "login" && (
                    <>
                      <input type="text" placeholder="Email or Username" value={loginFormData.email} onChange={(e) => setLoginFormData({ ...loginFormData, email: e.target.value })} required className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border rounded-xl text-xs dark:text-white border-gray-200 dark:border-slate-700 focus:outline-none" />
                      <input type="password" placeholder="Password" value={loginFormData.password} onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })} required className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border rounded-xl text-xs dark:text-white border-gray-200 dark:border-slate-700 focus:outline-none" />
                    </>
                  )}

                  <button type="submit" disabled={loading} className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer disabled:opacity-50">
                    {loading ? "Processing..." : authTab === "login" ? "Sign In" : authTab === "volunteer" ? "Pay ₹10 & Join as Volunteer" : "Register (₹1/mo)"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}