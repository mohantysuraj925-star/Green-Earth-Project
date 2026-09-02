import { useState } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import {
  Leaf,
  Trees,
  Droplets,
  Earth,
  ArrowDown,
  Target,
  Trophy,
  Calendar,
  ArrowRight,
  Heart,
  Cpu,
  Sparkles,
  Users,
  CheckCircle2,
  Wind,
  ShieldCheck,
  Flame
} from "lucide-react";

export default function Home() {
  const [pledged, setPledged] = useState(false);
  const [pledgeCount, setPledgeCount] = useState(1284);

  const handlePledge = () => {
    if (!pledged) {
      setPledged(true);
      setPledgeCount((prev) => prev + 1);
    }
  };

  const stats = [
    { number: "10,000+", label: "Trees Planted", subtext: "Across 50+ locations" },
    { number: "500+", label: "Active Volunteers", subtext: "Dedicated eco-warriors" },
    { number: "100+", label: "Successful Campaigns", subtext: "In urban & rural areas" }
  ];

  const liveImpact = [
    { icon: Wind, label: "CO₂ Offset", value: "240 Tons/yr", color: "text-emerald-500" },
    { icon: Trees, label: "Oxygen Generated", value: "1.2 Million L", color: "text-green-500" },
    { icon: Droplets, label: "Water Saved", value: "850,000 L", color: "text-blue-500" }
  ];

  const goals = [
    {
      icon: Trees,
      title: "Mass Plantation",
      desc: "Planting native trees across urban and rural zones to boost local biodiversity and restore eco-balance."
    },
    {
      icon: Droplets,
      title: "Water Conservation",
      desc: "Restoring natural water bodies, cleaning riverbeds, and constructing efficient rainwater harvesting systems."
    },
    {
      icon: Earth,
      title: "Zero Plastic Awareness",
      desc: "Educating communities, hosting drive-through recycling events, and eliminating single-use plastics."
    }
  ];

  const achievements = [
    { title: "50+ Acres Restored", desc: "Converted barren wasteland into flourishing green zones.", badge: "Land Restoration" },
    { title: "120+ School Drives", desc: "Empowered over 15,000 students with eco-friendly habits.", badge: "Youth Engagement" },
    { title: "Zero Plastic Award 2025", desc: "Recognized nationally for community-driven recycling initiatives.", badge: "National Honor" }
  ];

  const activities = [
    {
      title: "Monsoon Tree Plantation Drive",
      date: "July 2026",
      tag: "Plantation",
      img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600"
    },
    {
      title: "Riverbed Clean-up Mission",
      date: "June 2026",
      tag: "Clean-up",
      img: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600"
    },
    {
      title: "Eco Workshop for Youth",
      date: "May 2026",
      tag: "Awareness",
      img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600"
    }
  ];

  const communityMembers = [
    { name: "Rahul Sharma", role: "Environmental Lead", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
    { name: "Priya Patel", role: "Campaign Director", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150" },
    { name: "Ankit Verma", role: "Community Organizer", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150" }
  ];

  return (
    <div className="overflow-hidden bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* HERO SECTION */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/40 pt-16 pb-24 px-6 transition-colors duration-300"
      >
        <div className="absolute top-0 left-0 w-80 h-80 bg-green-200/50 dark:bg-green-600/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300/40 dark:bg-emerald-500/10 rounded-full blur-3xl opacity-40 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/60 text-green-700 dark:text-green-300 px-5 py-2 rounded-full font-semibold border border-green-200 dark:border-green-700/50 shadow-sm">
              <Leaf size={18} className="text-green-600 dark:text-green-400 animate-pulse" /> Save Nature • Save Future
            </div>

            <h1 className="mt-7 text-5xl md:text-7xl font-extrabold leading-tight text-gray-900 dark:text-white">
              Plant Trees
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-400 dark:to-emerald-300">
                Save Tomorrow
              </span>
            </h1>

            <p className="mt-7 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-xl">
              Nature gives us life. Every tree we plant, every drop of water we save, and every small action we take helps create a cleaner, greener, and healthier Earth.
            </p>

            {/* BUTTONS WITH RE-NAMED Eco Smart Tools BUTTON */}
            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <ScrollLink to="environment-goals" smooth={true} duration={600} offset={-90}>
                <button className="px-8 py-4 rounded-full bg-green-600 dark:bg-green-500 text-white font-semibold shadow-xl hover:bg-green-700 dark:hover:bg-green-600 hover:scale-105 transition-all">
                  Explore Mission
                </button>
              </ScrollLink>
              <Link to="/about">
                <button className="px-8 py-4 rounded-full border-2 border-green-600 dark:border-green-500 text-green-700 dark:text-green-400 font-semibold hover:bg-green-600 hover:text-white dark:hover:bg-green-500 dark:hover:text-white transition-all">
                  Learn More
                </button>
              </Link>
              <Link to="/advance">
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-700 via-teal-700 to-green-800 text-white font-semibold shadow-xl hover:scale-105 transition-all flex items-center gap-2 border border-emerald-500/30">
                  <Cpu size={20} className="text-green-300 animate-pulse" />
                  <span>Eco Smart Tools</span>
                  <Sparkles size={16} className="text-amber-300" />
                </button>
              </Link>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-green-100 dark:border-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-green-500/10 transition-all hover:-translate-y-1"
                >
                  <h2 className="text-3xl font-extrabold text-green-600 dark:text-green-400">
                    {item.number}
                  </h2>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mt-1 text-sm">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {item.subtext}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* HERO IMAGE & FLOATING CARDS */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center"
          >
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900"
              alt="Green Forest"
              className="rounded-[40px] shadow-2xl w-full max-w-lg object-cover border-4 border-white dark:border-gray-800 hover:scale-[1.01] transition-transform"
            />
            <div className="absolute -top-6 -left-4 sm:-left-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
              <Trees className="text-green-600 dark:text-green-400" size={30} />
              <div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white">10,000+</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Trees Planted</p>
              </div>
            </div>
            <div className="absolute top-1/2 -right-4 sm:-right-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
              <Droplets className="text-blue-500 dark:text-blue-400" size={30} />
              <div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white">Save Water</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Every Drop Counts</p>
              </div>
            </div>
            <div className="absolute -bottom-6 left-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
              <Earth className="text-green-600 dark:text-green-400" size={30} />
              <div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white">Green Earth</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Clean Future</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 flex justify-center">
          <ScrollLink to="live-impact" smooth={true} duration={600} offset={-90}>
            <button className="animate-bounce flex flex-col items-center text-green-700 dark:text-green-400 hover:text-green-900 dark:hover:text-green-200 transition">
              <span className="text-xs font-semibold mb-2 uppercase tracking-widest">Scroll Down</span>
              <ArrowDown size={24} />
            </button>
          </ScrollLink>
        </div>
      </section>

      {/* LIVE ENVIRONMENTAL IMPACT BAR */}
      <section id="live-impact" className="py-10 bg-green-900 text-white border-y border-green-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6 text-center">
          {liveImpact.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center justify-center gap-4 bg-green-800/40 p-4 rounded-2xl border border-green-700/50">
                <Icon size={32} className={item.color} />
                <div className="text-left">
                  <p className="text-xs text-green-300 uppercase font-semibold">{item.label}</p>
                  <p className="text-xl font-bold text-white">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* INTERACTIVE GREEN PLEDGE WIDGET */}
      <section className="py-16 px-6 bg-gradient-to-r from-emerald-50 to-green-100 dark:from-gray-900 dark:to-emerald-950/60">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-green-200 dark:border-gray-800 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldCheck size={120} className="text-green-600" />
          </div>
          <span className="bg-green-100 dark:bg-green-900/60 text-green-700 dark:text-green-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
            Take Action Today
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-4">
            Take the Green Pledge
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-xl mx-auto text-sm">
            I pledge to plant at least one tree every year and reduce my plastic waste to preserve planet Earth for future generations.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handlePledge}
              disabled={pledged}
              className={`px-8 py-3.5 rounded-full font-bold shadow-lg transition-all flex items-center gap-2 ${
                pledged
                  ? "bg-emerald-600 text-white cursor-default"
                  : "bg-green-600 hover:bg-green-700 text-white hover:scale-105"
              }`}
            >
              <CheckCircle2 size={20} />
              {pledged ? "Pledge Taken!" : "I Take The Pledge"}
            </button>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Flame size={16} className="text-amber-500" /> {pledgeCount.toLocaleString()} Eco-Warriors have pledged!
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 1: ENVIRONMENT GOALS */}
      <section id="environment-goals" className="py-20 px-6 bg-white dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-4 py-1.5 rounded-full font-semibold text-sm">
            <Target size={16} /> Our Core Focus
          </div>
          <h2 className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-white">Environment Goals</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We are dedicated to sustainable environmental practices that drive long-term positive impact.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {goals.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-green-50/60 dark:bg-gray-900/60 p-8 rounded-3xl border border-green-100 dark:border-gray-800 text-left hover:shadow-xl transition-all hover:-translate-y-2"
                >
                  <div className="w-14 h-14 bg-green-600 dark:bg-green-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-green-500/20">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2: ACHIEVEMENTS */}
      <section className="py-20 px-6 bg-emerald-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-800/80 text-emerald-300 px-4 py-1.5 rounded-full font-semibold text-sm border border-emerald-700">
            <Trophy size={16} /> Impact & Recognition
          </div>
          <h2 className="mt-4 text-4xl font-extrabold text-white">Our Key Achievements</h2>
          <p className="mt-3 text-emerald-200/80 max-w-2xl mx-auto">
            Milestones created by our community volunteers and environmental partners.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {achievements.map((item, index) => (
              <div
                key={index}
                className="bg-emerald-900/50 backdrop-blur-md p-8 rounded-3xl border border-emerald-800 text-left shadow-lg hover:-translate-y-1 transition-transform"
              >
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-700/50">
                  {item.badge}
                </span>
                <h3 className="text-2xl font-bold text-white mt-4">{item.title}</h3>
                <p className="mt-2 text-emerald-200/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: RECENT ACTIVITIES */}
      <section className="py-20 px-6 bg-green-50/50 dark:bg-gray-900/40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-4 py-1.5 rounded-full font-semibold text-sm">
                <Calendar size={16} /> On The Ground
              </div>
              <h2 className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-white">Recent Activities</h2>
            </div>
            <Link to="/campaigns" className="mt-4 md:mt-0 text-green-600 dark:text-green-400 font-bold inline-flex items-center gap-2 hover:underline">
              View All Campaigns <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {activities.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-transform"
              >
                <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-center text-xs font-semibold text-green-700 dark:text-green-400 mb-2">
                    <span className="bg-green-100 dark:bg-green-950 px-3 py-1 rounded-full">{item.tag}</span>
                    <span className="text-gray-500 dark:text-gray-400">{item.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: COMMUNITY & VOLUNTEERS */}
      <section className="py-20 px-6 bg-white dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-4 py-1.5 rounded-full font-semibold text-sm">
            <Users size={16} /> Community Impact
          </div>
          <h2 className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-white">Driven By People</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Meet the leaders and passionate volunteers powering our eco-initiatives every single day.
          </p>
          <div className="grid sm:grid-cols-3 gap-8 mt-12">
            {communityMembers.map((member, index) => (
              <div
                key={index}
                className="bg-green-50/50 dark:bg-gray-900/50 p-6 rounded-3xl border border-green-100 dark:border-gray-800 text-center hover:-translate-y-1 transition-transform"
              >
                <img src={member.img} alt={member.name} className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-green-500 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: CALL TO ACTION */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <Heart size={48} className="mx-auto mb-4 text-green-200 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-extrabold">Ready to make a difference?</h2>
          <p className="mt-4 text-lg text-green-100">
            Join thousands of volunteers making Earth cleaner and greener for everyone.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <button className="px-8 py-4 rounded-full bg-white text-green-800 font-bold shadow-lg hover:bg-green-50 hover:scale-105 transition">
                Become a Volunteer
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
