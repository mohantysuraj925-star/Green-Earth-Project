import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Trees,
  Droplets,
  Earth,
  ShieldCheck,
  QrCode,
  Printer,
  UserCheck,
  MapPin,
  X,
  Calendar,
  ArrowRight,
  Heart,
  Users
} from "lucide-react";

export default function Campaigns() {
  const [passModal, setPassModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", district: "Khordha", blood: "O+" });
  const [passGenerated, setPassGenerated] = useState(false);
  const [passData, setPassData] = useState(null);

  const campaigns = [
    {
      id: 1,
      title: "Monsoon Plantation Drive 2026",
      category: "Plantation",
      date: "July - August 2026",
      location: "Bhubaneswar & Khordha Belt",
      target: "5,000 Saplings",
      volunteers: "120+ Joined",
      desc: "Massive native tree plantation drive covering educational campuses, parks, and roadside avenues.",
      img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800"
    },
    {
      id: 2,
      title: "Riverbed Clean-up & Wetland Restoration",
      category: "Conservation",
      date: "August 2026",
      location: "Mahanadi Basin, Cuttack",
      target: "10 Tons Plastic Removal",
      volunteers: "85 Joined",
      desc: "Restoring riverbed biodiversity and planting Vetiver grass to control soil erosion and filter water.",
      img: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800"
    },
    {
      id: 3,
      title: "Urban Green Canopy Project",
      category: "Urban Forestry",
      date: "September 2026",
      location: "Smart City Zones, Odisha",
      target: "2,500 Shade Trees",
      volunteers: "200+ Target",
      desc: "Creating green pockets in urban residential areas to reduce city heat islands and purify ambient air.",
      img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800"
    },
    {
      id: 4,
      title: "School & Youth Climate Awareness",
      category: "Education",
      date: "October 2026",
      location: "State Schools & Colleges",
      target: "50+ Workshops",
      volunteers: "45 Mentors",
      desc: "Educating young students on seed-ball making, plastic waste reduction, and organic composting.",
      img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800"
    }
  ];

  const handleGenerate = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      const volId = "GEF-VOL-" + Math.floor(100000 + Math.random() * 900000);
      setPassData({ ...formData, volId, issueDate: "27 July 2026", validTill: "July 2027" });
      setPassGenerated(true);
    }
  };

  return (
    <div className="py-12 bg-gray-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Environmental Impact Drives
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Our Active & Upcoming Campaigns
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Join thousands of volunteers on the ground making real environmental change across Odisha and beyond.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setPassModal(true)}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-lg hover:shadow-xl transition flex items-center gap-2 mx-auto cursor-pointer"
            >
              <UserCheck size={20} /> Get Official Volunteer ID Pass
            </button>
          </div>
        </div>

        {/* CAMPAIGNS GRID */}
        <div className="grid md:grid-cols-2 gap-8">
          {campaigns.map((c) => (
            <motion.div
              key={c.id}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    {c.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1"><Calendar size={14} className="text-green-600" /> {c.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} className="text-green-600" /> {c.location}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{c.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{c.desc}</p>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-2.5 bg-green-50 dark:bg-slate-800 rounded-xl text-xs font-bold text-green-700 dark:text-green-400">
                      Target: {c.target}
                    </div>
                    <div className="p-2.5 bg-emerald-50 dark:bg-slate-800 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <Users size={14} /> {c.volunteers}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to="/donate"
                  className="w-full py-3 bg-gray-900 dark:bg-slate-800 hover:bg-green-600 dark:hover:bg-green-600 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2"
                >
                  Join / Support Campaign <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* REAL PVC VOLUNTEER ID PASS MODAL */}
      {passModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-gray-200 dark:border-slate-800 relative shadow-2xl">
            <button
              onClick={() => { setPassModal(false); setPassGenerated(false); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            {!passGenerated ? (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Apply for Official ID Card</h3>
                  <p className="text-xs text-gray-500">Fill details to issue your verified volunteer badge</p>
                </div>

                <form onSubmit={handleGenerate} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border rounded-xl text-xs dark:text-white"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border rounded-xl text-xs dark:text-white"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="District / City"
                      required
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border rounded-xl text-xs dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Blood Group"
                      value={formData.blood}
                      onChange={(e) => setFormData({ ...formData, blood: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 border rounded-xl text-xs dark:text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer"
                  >
                    Generate Real ID Pass
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <div className="flex justify-between items-center print:hidden">
                  <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                    <ShieldCheck size={16} /> Verified Volunteer
                  </span>
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Printer size={13} /> Print ID Card
                  </button>
                </div>

                {/* PVC CARD DESIGN */}
                <div className="w-full bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-2xl p-5 border-2 border-emerald-500/40 text-white shadow-2xl relative overflow-hidden text-left font-sans">
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />

                  <div className="flex justify-between items-center border-b border-emerald-500/30 pb-3 mb-3">
                    <div>
                      <h4 className="text-sm font-black tracking-wider uppercase text-emerald-400">GREEN EARTH</h4>
                      <p className="text-[8px] uppercase tracking-widest text-slate-300 font-bold">FOUNDATION VOLUNTEER</p>
                    </div>
                    <span className="bg-amber-400/20 text-amber-300 text-[9px] font-extrabold px-2 py-0.5 rounded border border-amber-400/30">
                      OFFICIAL PVC
                    </span>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-20 bg-emerald-900/60 rounded-xl border border-emerald-500/40 flex flex-col items-center justify-center text-center p-1 shrink-0">
                      <UserCheck size={28} className="text-emerald-400" />
                      <span className="text-[8px] font-bold text-slate-300 mt-1">PASSED</span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <h5 className="text-base font-extrabold text-white leading-tight">{passData.name}</h5>
                      <p className="text-[10px] text-emerald-300 font-bold">ID: {passData.volId}</p>
                      <p className="text-[10px] text-slate-300 flex items-center gap-1">
                        <MapPin size={10} /> {passData.district} | Blood: {passData.blood}
                      </p>
                      <p className="text-[9px] text-slate-400">Valid: {passData.issueDate} - {passData.validTill}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-emerald-500/30 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <QrCode size={32} className="text-white" />
                      <span className="text-[8px] text-slate-400 font-mono">SCAN TO VERIFY<br/>AUTHD: GEF-IN</span>
                    </div>
                    <span className="text-[9px] font-bold text-amber-300">AUTHORIZED</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
