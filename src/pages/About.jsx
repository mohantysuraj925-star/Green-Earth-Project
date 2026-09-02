import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaSeedling,
  FaGlobeAsia,
  FaHandsHelping,
  FaHistory,
  FaBullseye,
  FaUsers,
  FaCalculator,
  FaDownload,
  FaChevronDown,
  FaCheckCircle,
  FaUserPlus,
  FaCertificate,
  FaTruck,
  FaCalendarAlt,
  FaFilePdf,
  FaAward
} from "react-icons/fa";

const features = [
  {
    icon: <FaLeaf />,
    title: "Save Nature",
    description: "Protect forests and inspire people to create a cleaner and healthier planet."
  },
  {
    icon: <FaSeedling />,
    title: "Plant More Trees",
    description: "Every tree improves air quality and supports a sustainable future."
  },
  {
    icon: <FaGlobeAsia />,
    title: "Green Earth",
    description: "Together we can build a greener world for future generations."
  }
];

const timeline = [
  { year: "2023", title: "Mission Launch", desc: "Started with 10 volunteers and planted 500 saplings." },
  { year: "2024", title: "Community Expansion", desc: "Reached 100+ volunteers and partnered with schools." },
  { year: "2025", title: "10K Saplings Milestone", desc: "Successfully crossed 10,000 trees planted." },
  { year: "2026", title: "AI & IoT Integration", desc: "Adopted smart telemetry and drone seeding." }
];

const upcomingEvents = [
  { date: "Aug 15, 2026", title: "Independence Green Drive", location: "Bhubaneswar Park Zone" },
  { date: "Sep 05, 2026", title: "Campus Tree Adoption Fair", location: "GIET Campus Grounds" },
  { date: "Oct 02, 2026", title: "Clean & Green Earth Rally", location: "Khurdha City Center" }
];

const team = [
  { name: "Suraj Kumar Mohanty", role: "Founder & Lead Developer", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400" },
  { name: "Ananya Sharma", role: "Head of Campaigns", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400" },
  { name: "Rajesh Verma", role: "Field Logistics Lead", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" }
];

export default function About() {
  const [selectedTree, setSelectedTree] = useState("Neem");
  const [years, setYears] = useState(5);

  // Certificate Generator States
  const [certName, setCertName] = useState("");
  const [certYears, setCertYears] = useState("1 Year");
  const [certGoal, setCertGoal] = useState("Reforestation & Biodiversity Protection");
  const [certGenerated, setCertGenerated] = useState(false);

  const treeRates = { Neem: 22, Banyan: 48, Peepal: 45, Mango: 30 };
  const estimatedCO2 = treeRates[selectedTree] * years;

  const handleDownloadReport = () => {
    const reportText = `GREEN EARTH PROJECT - OFFICIAL MISSION REPORT\nFounder: Suraj Kumar Mohanty\nTrees Planted: 10,000+\nVolunteers: 500+`;
    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Green_Earth_Mission_Report.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const printCertificate = () => {
    window.print();
  };

  return (
    <section id="about" className="bg-white dark:bg-slate-950 pt-28 pb-32 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
            <div className="absolute -inset-4 bg-green-100 dark:bg-green-900/30 rounded-[40px] blur-xl opacity-50"></div>
            <img src="https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=900" alt="Plant Trees" className="relative rounded-[40px] shadow-2xl w-full" />
            <div className="absolute bottom-5 left-5 bg-white dark:bg-slate-900 rounded-2xl shadow-xl px-6 py-4 border border-gray-100 dark:border-slate-800">
              <h3 className="text-3xl font-bold text-green-700 dark:text-green-400">10K+</h3>
              <p className="text-gray-600 dark:text-gray-300">Trees Planted</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="inline-block bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-5 py-2 rounded-full font-semibold">About Our Mission</span>
            <h2 className="mt-6 text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">Together We Can Save Our Planet</h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-8">Our mission is to encourage everyone to plant trees, save water and protect nature.</p>
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="bg-green-50 dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-green-100 dark:border-slate-800">
                <h3 className="text-4xl font-extrabold text-green-700 dark:text-green-400">10K+</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Trees Planted</p>
              </div>
              <div className="bg-green-50 dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-green-100 dark:border-slate-800">
                <h3 className="text-4xl font-extrabold text-green-700 dark:text-green-400">500+</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Volunteers</p>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Realistic Eco Certificate Generator Section */}
        <div className="mt-28 bg-gradient-to-r from-emerald-950 via-green-900 to-slate-900 rounded-3xl p-8 text-white shadow-2xl border border-green-700">
          <div className="flex items-center gap-3 mb-4">
            <FaCertificate size={32} className="text-amber-400" />
            <div>
              <h3 className="text-2xl font-bold">Official Green Earth Certificate Generator</h3>
              <p className="text-xs text-green-200">Generate and print your authentic Eco Volunteer Recognition Certificate for free.</p>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); if (certName.trim()) setCertGenerated(true); }} className="grid md:grid-cols-3 gap-4 mb-8">
            <input
              type="text"
              placeholder="Full Name"
              required
              value={certName}
              onChange={(e) => setCertName(e.target.value)}
              className="p-3.5 bg-white/10 text-white placeholder-green-200 rounded-xl border border-white/20 focus:outline-none text-sm"
            />
            <select
              value={certYears}
              onChange={(e) => setCertYears(e.target.value)}
              className="p-3.5 bg-slate-800 text-white rounded-xl border border-slate-700 text-sm font-semibold"
            >
              <option value="6 Months">Active for 6 Months</option>
              <option value="1 Year">Active for 1 Year</option>
              <option value="2+ Years">Active for 2+ Years</option>
              <option value="5+ Years (Senior Member)">Active for 5+ Years</option>
            </select>
            <input
              type="text"
              placeholder="Your Environmental Goal (e.g., Tree Plantation)"
              value={certGoal}
              onChange={(e) => setCertGoal(e.target.value)}
              className="p-3.5 bg-white/10 text-white placeholder-green-200 rounded-xl border border-white/20 focus:outline-none text-sm"
            />
            <button
              type="submit"
              className="md:col-span-3 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition text-sm shadow-md"
            >
              Generate Official Certificate
            </button>
          </form>

          {certGenerated && (
            <div className="mt-8 flex flex-col items-center">
              {/* Certificate Template Card */}
              <div id="printable-certificate" className="w-full max-w-3xl bg-amber-50/90 text-slate-900 p-8 md:p-12 rounded-2xl border-8 border-emerald-800 shadow-2xl relative overflow-hidden font-serif">
                <div className="absolute top-2 right-2 opacity-10 pointer-events-none">
                  <FaLeaf size={220} className="text-green-900" />
                </div>

                <div className="text-center border-b-2 border-emerald-800 pb-6 mb-6">
                  <div className="flex justify-center items-center gap-2 mb-2">
                    <FaLeaf className="text-emerald-700" size={28} />
                    <span className="text-2xl font-black tracking-widest text-emerald-900 uppercase">GREEN EARTH PROJECT</span>
                  </div>
                  <p className="text-xs font-sans tracking-widest text-emerald-800 uppercase font-semibold">ECOLOGICAL CONSERVATION & REFORESTATION COUNCIL</p>
                </div>

                <div className="text-center">
                  <span className="text-xs font-sans uppercase tracking-widest text-emerald-700 font-bold">CERTIFICATE OF ENVIRONMENTAL COMMITMENT</span>
                  <p className="text-xs font-sans text-gray-600 mt-2">This is proudly presented to</p>
                  <h4 className="text-3xl md:text-4xl font-extrabold text-emerald-900 my-3 underline decoration-amber-500 decoration-2">{certName}</h4>
                  <p className="text-xs font-sans text-gray-700 max-w-xl mx-auto leading-relaxed">
                    In recognition of outstanding dedication to nature protection and active participation in the <strong>Save Tree • Save Future Campaign</strong> for <strong>{certYears}</strong> with a primary objective of <strong>"{certGoal}"</strong>.
                  </p>
                </div>

                <div className="mt-10 pt-6 border-t border-emerald-800/40 flex justify-between items-end font-sans text-xs">
                  <div>
                    <p className="font-bold text-emerald-900">Suraj Kumar Mohanty</p>
                    <p className="text-gray-500 text-[10px]">Founder & Lead Developer</p>
                    <div className="w-24 border-b border-gray-400 mt-1"></div>
                    <span className="text-[9px] text-emerald-700 font-bold block mt-1">Authorized Digital Signature</span>
                  </div>

                  <div className="text-center">
                    <div className="w-14 h-14 bg-emerald-800 text-amber-300 rounded-full flex items-center justify-center font-bold text-[10px] mx-auto border-2 border-amber-400 shadow-inner">
                      VERIFIED
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-emerald-900">Date Issued</p>
                    <p className="text-gray-600 text-[11px]">{new Date().toLocaleDateString()}</p>
                    <p className="text-[9px] text-gray-400 mt-1">ID: GEP-CERT-{Math.floor(100000 + Math.random() * 900000)}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={printCertificate}
                className="mt-6 flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full transition shadow-lg cursor-pointer text-sm"
              >
                <FaFilePdf size={18} /> Print or Save as PDF
              </button>
            </div>
          )}
        </div>

        <div className="mt-28">
          <div className="text-center mb-16">
            <FaUsers className="mx-auto text-4xl text-green-600 mb-2" />
            <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white">Meet Our Team</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-800 text-center">
                <img src={member.image} alt={member.name} className="w-28 h-28 mx-auto rounded-full object-cover mb-4 border-2 border-green-600" />
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">{member.name}</h4>
                <p className="text-xs text-green-600 dark:text-green-400 font-semibold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20 bg-green-600 rounded-[35px] p-12 text-center text-white shadow-xl">
          <FaHandsHelping className="mx-auto text-5xl mb-5" />
          <h3 className="text-3xl md:text-4xl font-bold">Every Small Step Counts 🌿</h3>
        </motion.div>
      </div>
    </section>
  );
}
