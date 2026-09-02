import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";

import {
  Menu,
  X,
  Leaf,
  Heart,
  Search,
  ChevronDown,
  Home,
  Info,
  Briefcase,
  Flag,
  BookOpen,
  Image,
  FileText,
  PhoneCall,
  Sparkles,
  Users,
  BarChart2,
  AlertTriangle,
  LogOut,
  User,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";


/* =========================================================
   BACKEND API
   ========================================================= */

const API_BASE =
  `${window.location.protocol}//${window.location.hostname}:8000/api`;


/* =========================================================
   NAVBAR
   ========================================================= */

export default function Navbar() {
  const location = useLocation();

  /* ---------------------------------------------------------
     UI STATES
  --------------------------------------------------------- */

  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [langOpen, setLangOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const [authTab, setAuthTab] = useState("login");

  const [loading, setLoading] = useState(false);

  const [statusMsg, setStatusMsg] = useState({
    type: "",
    text: "",
  });


  /* ---------------------------------------------------------
     LANGUAGE
  --------------------------------------------------------- */

  const [currentLang, setCurrentLang] = useState("EN");


  /* ---------------------------------------------------------
     USER
  --------------------------------------------------------- */

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("green_earth_user");

      if (!savedUser) {
        return null;
      }

      return JSON.parse(savedUser);
    } catch (error) {
      console.error("User storage error:", error);
      localStorage.removeItem("green_earth_user");
      return null;
    }
  });


  /* ---------------------------------------------------------
     USER REGISTER FORM
  --------------------------------------------------------- */

  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    password: "",
  });


  /* ---------------------------------------------------------
     VOLUNTEER REGISTER FORM
  --------------------------------------------------------- */

  const [volunteerFormData, setVolunteerFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    agreeTerms: false,
  });


  /* ---------------------------------------------------------
     LOGIN FORM
  --------------------------------------------------------- */

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });


  /* =========================================================
     SCROLL EFFECT
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  /* =========================================================
     CLOSE MENUS WHEN ROUTE CHANGES
  ========================================================= */

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
    setLangOpen(false);
    setNotifOpen(false);
  }, [location.pathname]);


  /* =========================================================
     TRANSLATIONS
  ========================================================= */

  const translations = {
    EN: {
      Home: "Home",
      About: "About",
      Services: "Services",
      Campaigns: "Campaigns",
      EcoHub: "EcoHub",
      Community: "Community",
      CarbonTracker: "Carbon Tracker",
      ReportIssue: "Report Issue",
      LearnMore: "Learn More",
      Gallery: "Gallery",
      Blog: "Blog",
      Contact: "Contact",
      Donate: "Donate",
      More: "More",
      SignIn: "Sign In",
      CreateAccount: "Create Account",
      Volunteer: "Volunteer",
      User: "User",
    },

    HI: {
      Home: "होम",
      About: "हमारे बारे में",
      Services: "सेवाएं",
      Campaigns: "अभियान",
      EcoHub: "इको हब",
      Community: "कम्यूनिटी",
      CarbonTracker: "कार्बन ट्रैकर",
      ReportIssue: "रिपोर्ट करें",
      LearnMore: "और जानें",
      Gallery: "गैलरी",
      Blog: "ब्लॉग",
      Contact: "संपर्क करें",
      Donate: "दान करें",
      More: "अन्य",
      SignIn: "साइन इन",
      CreateAccount: "अकाउंट बनाएं",
      Volunteer: "वॉलंटियर",
      User: "यूज़र",
    },

    OR: {
      Home: "ଗୃହ",
      About: "ଆମ ବିଷୟରେ",
      Services: "ସେବାସମୂହ",
      Campaigns: "ଅଭିଯାନ",
      EcoHub: "ଇକୋ ହବ୍",
      Community: "କମ୍ୟୁନିଟି",
      CarbonTracker: "କାର୍ବନ୍ ଟ୍ରାକର୍",
      ReportIssue: "ରିପୋର୍ଟ କରନ୍ତୁ",
      LearnMore: "ଅଧିକ ଜାଣନ୍ତୁ",
      Gallery: "ଗ୍ୟାଲେରୀ",
      Blog: "ବ୍ଲଗ୍",
      Contact: "ଯୋଗାଯୋଗ",
      Donate: "ଦାନ କରନ୍ତୁ",
      More: "ଅଧିକ",
      SignIn: "ସାଇନ୍ ଇନ୍",
      CreateAccount: "ଆକାଉଣ୍ଟ ତିଆରି",
      Volunteer: "ଭଲେଣ୍ଟିୟର",
      User: "ୟୁଜର୍",
    },
  };

  const t = translations[currentLang];


  /* =========================================================
     PRIMARY LINKS
  ========================================================= */

  const primaryLinks = [
    {
      name: t.Home,
      path: "/",
      icon: Home,
    },
    {
      name: t.About,
      path: "/about",
      icon: Info,
    },
    {
      name: t.Services,
      path: "/services",
      icon: Briefcase,
    },
    {
      name: t.Campaigns,
      path: "/campaigns",
      icon: Flag,
    },
    {
      name: t.EcoHub,
      path: "/ecohub",
      icon: Sparkles,
    },
    {
      name: t.Community,
      path: "/community",
      icon: Users,
    },
  ];


  /* =========================================================
     SECONDARY LINKS
  ========================================================= */

  const secondaryLinks = [
    {
      name: t.CarbonTracker,
      path: "/carbon-tracker",
      icon: BarChart2,
    },
    {
      name: t.ReportIssue,
      path: "/report-issue",
      icon: AlertTriangle,
    },
    {
      name: t.LearnMore,
      path: "/learn-more",
      icon: BookOpen,
    },
    {
      name: t.Gallery,
      path: "/gallery",
      icon: Image,
    },
    {
      name: t.Blog,
      path: "/blog",
      icon: FileText,
    },
    {
      name: t.Contact,
      path: "/contact",
      icon: PhoneCall,
    },
  ];


  /* =========================================================
     OPEN AUTH MODAL
  ========================================================= */

  const openAuthModal = (tab = "login") => {
    setAuthTab(tab);

    setStatusMsg({
      type: "",
      text: "",
    });

    setAuthModalOpen(true);
  };


  /* =========================================================
     HANDLE AUTH SUBMIT
  ========================================================= */

  const handleAuthSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setStatusMsg({
      type: "",
      text: "",
    });


    let endpoint = "";
    let payload = {};


    /* -------------------------------------------------------
       LOGIN
    ------------------------------------------------------- */

    if (authTab === "login") {
      endpoint = `${API_BASE}/login/`;

      payload = {
        email: loginFormData.email.trim(),
        password: loginFormData.password,
      };
    }


    /* -------------------------------------------------------
       USER REGISTER
    ------------------------------------------------------- */

    else if (authTab === "user") {
      endpoint = `${API_BASE}/register/`;

      payload = {
        name: userFormData.name.trim(),
        email: userFormData.email.trim(),
        password: userFormData.password,
        role: "user",
      };
    }


    /* -------------------------------------------------------
       VOLUNTEER REGISTER
    ------------------------------------------------------- */

    else if (authTab === "volunteer") {
      if (!volunteerFormData.agreeTerms) {
        setStatusMsg({
          type: "error",
          text: "Please accept the volunteer terms.",
        });

        setLoading(false);
        return;
      }

      endpoint = `${API_BASE}/register/`;

      payload = {
        name: volunteerFormData.name.trim(),
        email: volunteerFormData.email.trim(),
        password: volunteerFormData.password,
        role: "volunteer",
        location: volunteerFormData.location.trim(),
      };
    }


    /* =======================================================
       API REQUEST
    ======================================================= */

    try {
      console.log("Connecting to:", endpoint);

      const response = await fetch(endpoint, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify(payload),
      });


      /* -----------------------------------------------------
         SAFE JSON RESPONSE
      ----------------------------------------------------- */

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }


      /* =====================================================
         SUCCESS
      ===================================================== */

      if (response.ok) {

        /* ---------------------------------------------------
           LOGIN SUCCESS
        --------------------------------------------------- */

        if (authTab === "login") {

          const user = data.user;

          if (!user) {
            throw new Error(
              "Backend login succeeded but user data was not returned."
            );
          }


          /*
             Save complete backend user response.

             Supports:
             id
             _id
             user_id
             name
             email
             role
          */

          const savedUser = {
            ...user,

            user_id:
              user.user_id ||
              user.id ||
              user._id ||
              null,
          };


          setCurrentUser(savedUser);

          localStorage.setItem(
            "green_earth_user",
            JSON.stringify(savedUser)
          );


          /* -------------------------------------------------
             OPTIONAL BACKWARD COMPATIBILITY
          ------------------------------------------------- */

          if (savedUser.user_id) {
            localStorage.setItem(
              "green_earth_user_id",
              String(savedUser.user_id)
            );
          }


          setStatusMsg({
            type: "success",
            text: data.message || "Login successful!",
          });


          /* Close after success */

          setTimeout(() => {
            setAuthModalOpen(false);

            setStatusMsg({
              type: "",
              text: "",
            });
          }, 1000);
        }


        /* ---------------------------------------------------
           REGISTER SUCCESS
        --------------------------------------------------- */

        else {

          setStatusMsg({
            type: "success",
            text:
              data.message ||
              "Account created successfully!",
          });


          /*
             Automatically move to Login
          */

          setTimeout(() => {
            setAuthTab("login");

            setStatusMsg({
              type: "success",
              text: "Account created. Please sign in.",
            });
          }, 900);
        }

        return;
      }


      /* =====================================================
         BACKEND ERROR
      ===================================================== */

      setStatusMsg({
        type: "error",
        text:
          data.error ||
          data.detail ||
          data.message ||
          `Request failed (${response.status})`,
      });

    } catch (error) {

      console.error("AUTH ERROR:", error);

      setStatusMsg({
        type: "error",
        text:
          "Backend connection failed. Please make sure Django server is running on port 8000.",
      });

    } finally {
      setLoading(false);
    }
  };


  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    setCurrentUser(null);

    localStorage.removeItem("green_earth_user");
    localStorage.removeItem("green_earth_user_id");

    setAuthModalOpen(false);

    setStatusMsg({
      type: "",
      text: "",
    });
  };


  /* =========================================================
     RESET REGISTER FORM
  ========================================================= */

  const switchAuthTab = (tab) => {
    setAuthTab(tab);

    setStatusMsg({
      type: "",
      text: "",
    });
  };


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${
            scrolled
              ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-slate-800 py-2"
              : "bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 py-3"
          }
        `}
      >

        <div
          className="
            w-full
            px-3 sm:px-6 lg:px-8
            flex items-center justify-between
            gap-2
          "
        >

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            className="
              flex items-center gap-2
              shrink-0
              group
            "
          >
            <div
              className="
                p-1.5
                bg-green-100
                dark:bg-green-950/80
                rounded-xl
                group-hover:scale-105
                transition-transform
              "
            >
              <Leaf
                className="
                  text-green-600
                  dark:text-green-400
                "
                size={20}
              />
            </div>

            <span
              className="
                text-base sm:text-lg
                font-extrabold
                text-gray-900
                dark:text-white
                tracking-tight
              "
            >
              Green{" "}
              <span
                className="
                  text-green-600
                  dark:text-green-400
                  underline
                  decoration-amber-400
                  underline-offset-4
                "
              >
                Earth
              </span>
            </span>
          </Link>


          {/* =================================================
              DESKTOP NAV
          ================================================= */}

          <nav
            className="
              hidden lg:flex
              items-center gap-1
              bg-gray-100/80
              dark:bg-slate-800/80
              p-1
              rounded-full
              border
              border-gray-200/50
              dark:border-slate-700/50
              shrink-0
            "
          >

            {primaryLinks.map((item, index) => {
              const IconComponent = item.icon;

              return (
                <NavLink
                  key={index}
                  to={item.path}
                  className={({ isActive }) =>
                    `
                    px-2.5 py-1
                    rounded-full
                    text-xs
                    font-bold
                    transition-all
                    duration-200
                    flex items-center gap-1
                    whitespace-nowrap

                    ${
                      isActive
                        ? "bg-green-600 text-white shadow-md"
                        : "text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-200/60 dark:hover:bg-slate-700/60"
                    }
                    `
                  }
                >
                  <IconComponent size={13} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}


            {/* MORE */}

            <div className="relative">

              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="
                  px-2.5 py-1
                  rounded-full
                  text-xs
                  font-bold
                  flex items-center gap-1
                  transition
                  text-gray-700
                  dark:text-gray-200
                  hover:text-green-600
                  dark:hover:text-green-400
                "
              >
                <span>{t.More}</span>

                <ChevronDown
                  size={13}
                  className={`
                    transition-transform duration-200
                    ${moreOpen ? "rotate-180" : ""}
                  `}
                />
              </button>


              {moreOpen && (
                <div
                  className="
                    absolute
                    left-0
                    mt-2
                    w-52
                    bg-white
                    dark:bg-slate-900
                    border
                    border-gray-200
                    dark:border-slate-800
                    rounded-2xl
                    shadow-2xl
                    p-1.5
                    z-50
                    space-y-1
                  "
                >

                  {secondaryLinks.map((item, index) => {
                    const IconComp = item.icon;

                    return (
                      <NavLink
                        key={index}
                        to={item.path}
                        onClick={() => setMoreOpen(false)}
                        className="
                          px-3 py-2
                          text-xs
                          font-bold
                          flex items-center gap-2
                          rounded-xl
                          text-gray-800
                          dark:text-gray-200
                          hover:bg-green-50
                          dark:hover:bg-slate-800
                          hover:text-green-600
                          dark:hover:text-green-400
                          transition
                        "
                      >
                        <IconComp size={14} />
                        <span>{item.name}</span>
                      </NavLink>
                    );
                  })}

                </div>
              )}

            </div>

          </nav>


          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div
            className="
              flex items-center
              gap-1.5 sm:gap-2
              shrink-0
            "
          >

            {/* SEARCH */}

            <button
              onClick={() => setSearchModalOpen(true)}
              className="
                p-2
                rounded-xl
                bg-gray-100
                dark:bg-slate-800
                text-gray-800
                dark:text-gray-200
                border
                border-gray-200
                dark:border-slate-700
                hover:text-green-600
                transition
              "
            >
              <Search size={16} />
            </button>


            {/* USER */}

            <button
              onClick={() => openAuthModal("login")}
              className="
                p-2
                rounded-xl
                bg-gray-100
                dark:bg-slate-800
                text-gray-800
                dark:text-gray-200
                border
                border-gray-200
                dark:border-slate-700
                flex items-center gap-1.5
                cursor-pointer
                hover:border-green-500
                transition
              "
            >
              <User
                size={16}
                className={
                  currentUser
                    ? "text-green-600 dark:text-green-400"
                    : ""
                }
              />

              {currentUser && (
                <span
                  className="
                    text-xs
                    font-bold
                    text-green-600
                    dark:text-green-400
                    max-w-[80px]
                    truncate
                  "
                >
                  {currentUser.name}
                </span>
              )}
            </button>


            <ThemeToggle />


            {/* DONATE */}

            <Link
              to="/donate"
              className="
                hidden sm:flex
                bg-gradient-to-r
                from-green-600
                to-emerald-700
                text-white
                px-3.5 py-2
                rounded-xl
                text-xs
                font-extrabold
                shadow-md
                items-center gap-1.5
                shrink-0
              "
            >
              <Heart
                size={14}
                className="fill-white"
              />

              <span>{t.Donate}</span>
            </Link>


            {/* =================================================
                SIGNATURE HAMBURGER
            ================================================= */}

            <button
              onClick={() => setOpen(!open)}
              aria-label="Open navigation menu"
              className="
                lg:hidden
                relative
                w-10
                h-10
                rounded-2xl
                overflow-hidden
                flex items-center justify-center
                bg-gradient-to-br
                from-green-500
                via-emerald-600
                to-green-800
                text-white
                shadow-lg
                hover:scale-105
                active:scale-95
                transition-all
                duration-200
              "
            >

              <span
                className="
                  absolute
                  inset-0
                  rounded-2xl
                  border
                  border-white/30
                "
              />

              <span
                className={`
                  absolute
                  w-5
                  h-0.5
                  bg-white
                  rounded-full
                  transition-all duration-300
                  ${
                    open
                      ? "rotate-45"
                      : "-translate-y-1.5"
                  }
                `}
              />

              <span
                className={`
                  absolute
                  w-5
                  h-0.5
                  bg-white
                  rounded-full
                  transition-all duration-300
                  ${
                    open
                      ? "-rotate-45"
                      : "translate-y-1.5"
                  }
                `}
              />

              <span
                className={`
                  absolute
                  w-2
                  h-2
                  rounded-full
                  bg-amber-300
                  shadow-[0_0_10px_rgba(253,224,71,0.8)]
                  transition-all duration-300
                  ${
                    open
                      ? "opacity-0 scale-0"
                      : "right-2 bottom-2"
                  }
                `}
              />

            </button>

          </div>

        </div>


        {/* =====================================================
            MOBILE MENU
        ===================================================== */}

        {open && (
          <div
            className="
              lg:hidden
              mx-3 mt-3
              p-3
              rounded-3xl
              bg-white/95
              dark:bg-slate-900/95
              backdrop-blur-xl
              border
              border-gray-200
              dark:border-slate-800
              shadow-2xl
            "
          >

            <div className="grid grid-cols-2 gap-2">

              {[
                ...primaryLinks,
                ...secondaryLinks,
              ].map((item, index) => {
                const IconComponent = item.icon;

                return (
                  <NavLink
                    key={index}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `
                      flex items-center gap-2
                      px-3 py-3
                      rounded-2xl
                      text-xs
                      font-bold
                      transition

                      ${
                        isActive
                          ? "bg-green-600 text-white shadow-md"
                          : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200"
                      }
                      `
                    }
                  >
                    <IconComponent size={15} />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}

            </div>


            {/* MOBILE DONATE */}

            <Link
              to="/donate"
              onClick={() => setOpen(false)}
              className="
                mt-3
                w-full
                bg-gradient-to-r
                from-green-600
                to-emerald-700
                text-white
                py-3
                rounded-2xl
                text-xs
                font-extrabold
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <Heart
                size={15}
                className="fill-white"
              />

              {t.Donate}
            </Link>

          </div>
        )}

      </header>


      {/* =======================================================
          AUTH MODAL
      ======================================================= */}

      {authModalOpen && (
        <div
          className="
            fixed inset-0
            bg-black/75
            backdrop-blur-md
            z-[100]
            flex items-center justify-center
            p-4
          "
        >

          <div
            className="
              bg-white
              dark:bg-slate-900
              rounded-3xl
              p-5 sm:p-6
              max-w-sm
              w-full
              border
              border-gray-200
              dark:border-slate-800
              relative
              shadow-2xl
              max-h-[90vh]
              overflow-y-auto
            "
          >

            {/* CLOSE */}

            <button
              onClick={() => setAuthModalOpen(false)}
              className="
                absolute
                top-4
                right-4
                p-1
                rounded-full
                text-gray-400
                hover:text-gray-800
                dark:hover:text-white
                hover:bg-gray-100
                dark:hover:bg-slate-800
                transition
              "
            >
              <X size={20} />
            </button>


            {/* =================================================
                LOGGED IN PROFILE
            ================================================= */}

            {currentUser ? (
              <div className="text-center space-y-5 pt-3">

                <div
                  className="
                    w-20
                    h-20
                    bg-green-100
                    dark:bg-green-950/70
                    rounded-full
                    flex items-center justify-center
                    mx-auto
                    text-green-600
                    dark:text-green-400
                    font-extrabold
                    text-3xl
                    border-4
                    border-white
                    dark:border-slate-800
                    shadow-lg
                  "
                >
                  {currentUser.name
                    ?.charAt(0)
                    ?.toUpperCase() || "U"}
                </div>


                <div>

                  <h3
                    className="
                      text-lg
                      font-extrabold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    {currentUser.name}
                  </h3>

                  <p
                    className="
                      text-xs
                      text-gray-500
                      dark:text-gray-400
                      mt-1
                    "
                  >
                    {currentUser.email}
                  </p>


                  <span
                    className="
                      inline-flex
                      mt-3
                      px-3 py-1
                      bg-green-100
                      dark:bg-green-900/60
                      text-green-700
                      dark:text-green-300
                      text-[10px]
                      font-bold
                      rounded-full
                      uppercase
                      tracking-wider
                    "
                  >
                    {currentUser.role || "User"}
                  </span>

                </div>


                {/* USER ID */}

                {currentUser.user_id && (
                  <div
                    className="
                      p-3
                      rounded-2xl
                      bg-gray-50
                      dark:bg-slate-800
                      border
                      border-gray-200
                      dark:border-slate-700
                      text-left
                    "
                  >
                    <p
                      className="
                        text-[10px]
                        font-bold
                        text-gray-400
                        uppercase
                      "
                    >
                      User ID
                    </p>

                    <p
                      className="
                        text-xs
                        font-semibold
                        text-gray-700
                        dark:text-gray-200
                        break-all
                        mt-1
                      "
                    >
                      {currentUser.user_id}
                    </p>
                  </div>
                )}


                {/* LOGOUT */}

                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    py-3
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    font-bold
                    rounded-2xl
                    text-xs
                    flex
                    items-center
                    justify-center
                    gap-2
                    transition
                  "
                >
                  <LogOut size={15} />
                  Sign Out
                </button>

              </div>
            ) : (

              /* =================================================
                 AUTH FORMS
              ================================================= */

              <>

                {/* HEADER */}

                <div className="text-center pt-3 mb-5">

                  <div
                    className="
                      w-16
                      h-16
                      bg-green-100
                      dark:bg-green-950/70
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      mx-auto
                      mb-3
                    "
                  >
                    <Leaf
                      size={30}
                      className="
                        text-green-600
                        dark:text-green-400
                      "
                    />
                  </div>


                  <h2
                    className="
                      text-xl
                      font-extrabold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    Welcome to Green Earth
                  </h2>

                  <p
                    className="
                      text-xs
                      text-gray-500
                      dark:text-gray-400
                      mt-1
                    "
                  >
                    Join the movement. Protect our planet.
                  </p>

                </div>


                {/* =================================================
                    AUTH TABS
                ================================================= */}

                <div
                  className="
                    flex
                    bg-gray-100
                    dark:bg-slate-800
                    p-1
                    rounded-2xl
                    gap-1
                    mb-4
                  "
                >

                  <button
                    onClick={() => switchAuthTab("user")}
                    className={`
                      flex-1
                      py-2
                      text-[11px]
                      font-bold
                      rounded-xl
                      transition

                      ${
                        authTab === "user"
                          ? "bg-green-600 text-white shadow"
                          : "text-gray-600 dark:text-gray-300"
                      }
                    `}
                  >
                    {t.CreateAccount}
                  </button>


                  <button
                    onClick={() => switchAuthTab("login")}
                    className={`
                      flex-1
                      py-2
                      text-[11px]
                      font-bold
                      rounded-xl
                      transition

                      ${
                        authTab === "login"
                          ? "bg-green-600 text-white shadow"
                          : "text-gray-600 dark:text-gray-300"
                      }
                    `}
                  >
                    {t.SignIn}
                  </button>

                </div>


                {/* VOLUNTEER SWITCH */}

                {authTab === "user" && (
                  <button
                    onClick={() => switchAuthTab("volunteer")}
                    className="
                      w-full
                      mb-3
                      py-2
                      text-[11px]
                      font-bold
                      rounded-xl
                      border
                      border-green-200
                      dark:border-green-900
                      text-green-700
                      dark:text-green-300
                      bg-green-50
                      dark:bg-green-950/30
                    "
                  >
                    Register as Volunteer
                  </button>
                )}


                {/* =================================================
                    STATUS MESSAGE
                ================================================= */}

                {statusMsg.text && (
                  <div
                    className={`
                      p-3
                      rounded-xl
                      text-xs
                      font-semibold
                      mb-3
                      flex
                      items-start
                      gap-2

                      ${
                        statusMsg.type === "success"
                          ? "bg-green-100 text-green-800 border border-green-300"
                          : "bg-red-100 text-red-800 border border-red-300"
                      }
                    `}
                  >

                    {statusMsg.type === "success" ? (
                      <CheckCircle2
                        size={16}
                        className="shrink-0"
                      />
                    ) : (
                      <X
                        size={16}
                        className="shrink-0"
                      />
                    )}

                    <span>{statusMsg.text}</span>

                  </div>
                )}


                {/* =================================================
                    FORM
                ================================================= */}

                <form
                  onSubmit={handleAuthSubmit}
                  className="space-y-3"
                >

                  {/* USER REGISTER */}

                  {authTab === "user" && (
                    <>

                      <input
                        type="text"
                        placeholder="Full Name"
                        value={userFormData.name}
                        onChange={(e) =>
                          setUserFormData({
                            ...userFormData,
                            name: e.target.value,
                          })
                        }
                        required
                        className="
                          w-full
                          p-3
                          bg-gray-50
                          dark:bg-slate-800
                          border
                          border-gray-200
                          dark:border-slate-700
                          rounded-xl
                          text-sm
                          dark:text-white
                          focus:outline-none
                          focus:ring-2
                          focus:ring-green-500/30
                          focus:border-green-500
                        "
                      />


                      <input
                        type="email"
                        placeholder="Email Address"
                        value={userFormData.email}
                        onChange={(e) =>
                          setUserFormData({
                            ...userFormData,
                            email: e.target.value,
                          })
                        }
                        required
                        className="
                          w-full
                          p-3
                          bg-gray-50
                          dark:bg-slate-800
                          border
                          border-gray-200
                          dark:border-slate-700
                          rounded-xl
                          text-sm
                          dark:text-white
                          focus:outline-none
                          focus:ring-2
                          focus:ring-green-500/30
                          focus:border-green-500
                        "
                      />


                      <input
                        type="password"
                        placeholder="Password"
                        value={userFormData.password}
                        onChange={(e) =>
                          setUserFormData({
                            ...userFormData,
                            password: e.target.value,
                          })
                        }
                        required
                        className="
                          w-full
                          p-3
                          bg-gray-50
                          dark:bg-slate-800
                          border
                          border-gray-200
                          dark:border-slate-700
                          rounded-xl
                          text-sm
                          dark:text-white
                          focus:outline-none
                          focus:ring-2
                          focus:ring-green-500/30
                          focus:border-green-500
                        "
                      />

                    </>
                  )}


                  {/* VOLUNTEER */}

                  {authTab === "volunteer" && (
                    <>

                      <input
                        type="text"
                        placeholder="Full Name"
                        value={volunteerFormData.name}
                        onChange={(e) =>
                          setVolunteerFormData({
                            ...volunteerFormData,
                            name: e.target.value,
                          })
                        }
                        required
                        className="
                          w-full p-3
                          bg-gray-50
                          dark:bg-slate-800
                          border
                          border-gray-200
                          dark:border-slate-700
                          rounded-xl
                          text-sm
                          dark:text-white
                          focus:outline-none
                          focus:ring-2
                          focus:ring-green-500/30
                          focus:border-green-500
                        "
                      />


                      <input
                        type="email"
                        placeholder="Email Address"
                        value={volunteerFormData.email}
                        onChange={(e) =>
                          setVolunteerFormData({
                            ...volunteerFormData,
                            email: e.target.value,
                          })
                        }
                        required
                        className="
                          w-full p-3
                          bg-gray-50
                          dark:bg-slate-800
                          border
                          border-gray-200
                          dark:border-slate-700
                          rounded-xl
                          text-sm
                          dark:text-white
                          focus:outline-none
                          focus:ring-2
                          focus:ring-green-500/30
                          focus:border-green-500
                        "
                      />


                      <input
                        type="text"
                        placeholder="City / Location"
                        value={volunteerFormData.location}
                        onChange={(e) =>
                          setVolunteerFormData({
                            ...volunteerFormData,
                            location: e.target.value,
                          })
                        }
                        required
                        className="
                          w-full p-3
                          bg-gray-50
                          dark:bg-slate-800
                          border
                          border-gray-200
                          dark:border-slate-700
                          rounded-xl
                          text-sm
                          dark:text-white
                          focus:outline-none
                          focus:ring-2
                          focus:ring-green-500/30
                          focus:border-green-500
                        "
                      />


                      <input
                        type="password"
                        placeholder="Password"
                        value={volunteerFormData.password}
                        onChange={(e) =>
                          setVolunteerFormData({
                            ...volunteerFormData,
                            password: e.target.value,
                          })
                        }
                        required
                        className="
                          w-full p-3
                          bg-gray-50
                          dark:bg-slate-800
                          border
                          border-gray-200
                          dark:border-slate-700
                          rounded-xl
                          text-sm
                          dark:text-white
                          focus:outline-none
                          focus:ring-2
                          focus:ring-green-500/30
                          focus:border-green-500
                        "
                      />


                      <label
                        className="
                          flex
                          items-start
                          gap-2
                          cursor-pointer
                          text-[11px]
                          text-gray-600
                          dark:text-gray-300
                        "
                      >

                        <input
                          type="checkbox"
                          checked={
                            volunteerFormData.agreeTerms
                          }
                          onChange={(e) =>
                            setVolunteerFormData({
                              ...volunteerFormData,
                              agreeTerms:
                                e.target.checked,
                            })
                          }
                          className="
                            mt-0.5
                            rounded
                            text-green-600
                          "
                        />

                        <span>
                          I agree to participate as a
                          volunteer.
                        </span>

                      </label>

                    </>
                  )}


                  {/* LOGIN */}

                  {authTab === "login" && (
                    <>

                      <input
                        type="text"
                        placeholder="Email or Username"
                        value={loginFormData.email}
                        onChange={(e) =>
                          setLoginFormData({
                            ...loginFormData,
                            email: e.target.value,
                          })
                        }
                        required
                        className="
                          w-full
                          p-3
                          bg-gray-50
                          dark:bg-slate-800
                          border
                          border-gray-200
                          dark:border-slate-700
                          rounded-xl
                          text-sm
                          dark:text-white
                          focus:outline-none
                          focus:ring-2
                          focus:ring-green-500/30
                          focus:border-green-500
                        "
                      />


                      <input
                        type="password"
                        placeholder="Password"
                        value={loginFormData.password}
                        onChange={(e) =>
                          setLoginFormData({
                            ...loginFormData,
                            password: e.target.value,
                          })
                        }
                        required
                        className="
                          w-full
                          p-3
                          bg-gray-50
                          dark:bg-slate-800
                          border
                          border-gray-200
                          dark:border-slate-700
                          rounded-xl
                          text-sm
                          dark:text-white
                          focus:outline-none
                          focus:ring-2
                          focus:ring-green-500/30
                          focus:border-green-500
                        "
                      />

                    </>
                  )}


                  {/* =================================================
                      SUBMIT BUTTON
                  ================================================= */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      w-full
                      py-3
                      bg-gradient-to-r
                      from-green-600
                      to-emerald-700
                      hover:from-green-700
                      hover:to-emerald-800
                      text-white
                      font-extrabold
                      rounded-xl
                      text-sm
                      shadow-lg
                      transition
                      disabled:opacity-60
                      disabled:cursor-not-allowed
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >

                    {loading ? (
                      <>
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />

                        Connecting...
                      </>
                    ) : authTab === "login" ? (
                      "Sign In"
                    ) : authTab === "volunteer" ? (
                      "Create Volunteer Account"
                    ) : (
                      "Create Account"
                    )}

                  </button>

                </form>


                {/* SWITCH */}

                {authTab === "login" ? (
                  <p
                    className="
                      text-center
                      text-xs
                      text-gray-500
                      dark:text-gray-400
                      mt-4
                    "
                  >
                    Don't have an account?{" "}

                    <button
                      onClick={() => switchAuthTab("user")}
                      className="
                        text-green-600
                        dark:text-green-400
                        font-bold
                        hover:underline
                      "
                    >
                      Create Account
                    </button>
                  </p>
                ) : (
                  <p
                    className="
                      text-center
                      text-xs
                      text-gray-500
                      dark:text-gray-400
                      mt-4
                    "
                  >
                    Already have an account?{" "}

                    <button
                      onClick={() => switchAuthTab("login")}
                      className="
                        text-green-600
                        dark:text-green-400
                        font-bold
                        hover:underline
                      "
                    >
                      Sign In
                    </button>
                  </p>
                )}

              </>
            )}

          </div>

        </div>
      )}


      {/* =======================================================
          SEARCH MODAL
      ======================================================= */}

      {searchModalOpen && (
        <div
          className="
            fixed inset-0
            bg-black/60
            backdrop-blur-sm
            z-[90]
            flex items-start
            justify-center
            pt-24
            px-4
          "
          onClick={() => setSearchModalOpen(false)}
        >

          <div
            className="w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <div
              className="
                bg-white
                dark:bg-slate-900
                rounded-3xl
                p-4
                shadow-2xl
                border
                border-gray-200
                dark:border-slate-800
              "
            >

              <div className="flex items-center justify-between mb-3">

                <h3
                  className="
                    font-extrabold
                    text-gray-900
                    dark:text-white
                  "
                >
                  Search Green Earth
                </h3>

                <button
                  onClick={() =>
                    setSearchModalOpen(false)
                  }
                  className="
                    p-2
                    rounded-xl
                    hover:bg-gray-100
                    dark:hover:bg-slate-800
                  "
                >
                  <X size={18} />
                </button>

              </div>

              <SearchBar />

            </div>

          </div>

        </div>
      )}

    </>
  );
}