import { useState } from "react";
import { motion } from "framer-motion";
import {
  HeartHandshake,
  CheckCircle,
  X,
  QrCode,
  CreditCard,
  TreePine,
  ShieldCheck,
  Target,
  Download,
  Share2,
  HelpCircle,
  Gift,
  Award
} from "lucide-react";

const donationTiers = [
  {
    id: 1,
    title: "Plant a Tree Sapling",
    amount: 50,
    impact: "1 Tree Sapling + 1 Year Care",
    description: "Helps plant and nurture one native tree sapling in college and local community parks."
  },
  {
    id: 2,
    title: "Campus Green Drive",
    amount: 500,
    impact: "10 Saplings + Watering Kit",
    description: "Supports a full campus tree plantation drive with protective tree guards and soil manure."
  },
  {
    id: 3,
    title: "Green Earth Partner",
    amount: 2000,
    impact: "50 Trees + Forest Rejuvenation",
    description: "Funds long-term environmental sustainability, water body cleaning, and community drives."
  }
];

const recentSupporters = [
  { name: "Suraj Mohanty", amount: "₹500", time: "2 hrs ago" },
  { name: "Pihuli", amount: "₹2,000", time: "5 hrs ago" },
  { name: "Priya Sharma", amount: "₹100", time: "1 day ago" }
];

const treeSpecies = ["Neem Tree", "Peepal Tree", "Banyan Tree", "Mango Sapling", "Gulmohar"];
const plantationZones = ["GIET Campus Zone", "Khurda Forest Belt", "Bhubaneswar City Park"];

export default function Donate() {
  const [customAmount, setCustomAmount] = useState(500);
  const [selectedTier, setSelectedTier] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [donationFrequency, setDonationFrequency] = useState("one-time");
  const [dedicationName, setDedicationName] = useState("");
  const [selectedTree, setSelectedTree] = useState("Neem Tree");
  const [selectedZone, setSelectedZone] = useState("GIET Campus Zone");
  const [treeTagMessage, setTreeTagMessage] = useState("");
  const [isGift, setIsGift] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [donorName, setDonorName] = useState("");

  const [quizAns, setQuizAns] = useState(null);

  const handleDonateClick = (tier) => {
    setSelectedTier(tier);
    setCustomAmount(tier.amount);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (customAmount > 0) {
      setDonationSuccess(true);
    }
  };

  const downloadReceipt = () => {
    const text = `GREEN EARTH PROJECT - DONATION RECEIPT\n\nDonor: ${donorName || "Supporter"}\nAmount: ₹${customAmount}\nTree Species: ${selectedTree}\nPlantation Zone: ${selectedZone}\nTrees Funded: ${Math.floor(customAmount / 50)}\nGift Donation: ${isGift ? "Yes" : "No"}\nStatus: Paid (80G Eligible)`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Donation_Receipt_${Date.now()}.txt`;
    a.click();
  };

  return (
    <section className="bg-gradient-to-b from-green-50 via-white to-green-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen pt-28 pb-24 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <span className="inline-block bg-white dark:bg-slate-900 text-green-700 dark:text-green-400 px-5 py-2 rounded-full font-semibold border border-green-200 dark:border-slate-800 shadow-sm">
            Support Our Green Mission
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Every Contribution Matters
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Your support directly funds tree plantation drives, plastic clean-up campaigns, and eco-awareness initiatives.
          </p>
        </div>

        {/* ECO QUIZ DISCOUNT WIDGET */}
        <div className="mt-8 bg-emerald-100 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-300 dark:border-emerald-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-300">
            <HelpCircle size={18} /> Quick Eco Quiz: How many liters of oxygen does 1 mature tree produce daily?
          </div>
          <div className="flex gap-2">
            {["100 Liters", "260 Liters", "500 Liters"].map((opt) => (
              <button
                key={opt}
                onClick={() => setQuizAns(opt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                  quizAns === opt ? "bg-emerald-600 text-white" : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {quizAns && (
            <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 w-full text-center">
              {quizAns === "260 Liters" ? "🎉 Correct! A mature tree produces ~260 liters of Oxygen daily!" : "❌ Close! The correct answer is 260 Liters."}
            </span>
          )}
        </div>

        {/* Live Target Goal Tracker */}
        <div className="mt-8 bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1.5">
              <Target size={16} className="text-emerald-600" /> Monthly Goal: 2,000 Trees Target
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              ₹45,000 / ₹1,00,000 Raised (45%)
            </span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-full w-[45%] rounded-full"></div>
          </div>
        </div>

        {/* Live Impact Calculator Banner */}
        <div className="mt-8 bg-emerald-900 text-white rounded-3xl p-6 shadow-2xl border border-emerald-700 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <TreePine className="text-amber-400" size={32} />
            <div>
              <h3 className="font-bold text-lg">Your Impact Summary</h3>
              <p className="text-xs text-emerald-200">
                ₹{customAmount} will plant approximately <strong>{Math.floor(customAmount / 50)} Trees</strong> and offset ~<strong>{Math.floor(customAmount / 50) * 22} kg CO₂/year</strong>.
              </p>
            </div>
          </div>
          <span className="px-4 py-2 bg-emerald-800 border border-emerald-600 rounded-full text-xs font-bold text-amber-300">
            🌱 100% Transparency Guaranteed
          </span>
        </div>

        {/* Donation Tiers Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {donationTiers.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-slate-800 flex flex-col justify-between"
            >
              <div>
                <HeartHandshake className="mx-auto text-green-600 dark:text-green-400" size={48} />
                <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white text-center">
                  {item.title}
                </h2>
                <p className="mt-4 text-4xl font-extrabold text-green-700 dark:text-green-400 text-center">
                  ₹{item.amount}
                </p>
                <span className="block mt-2 text-center text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 py-1 px-3 rounded-full">
                  {item.impact}
                </span>
                <p className="mt-4 text-xs text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                  {item.description}
                </p>
              </div>

              <button
                onClick={() => handleDonateClick(item)}
                className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-2xl font-bold text-xs shadow-lg transition cursor-pointer"
              >
                Donate ₹{item.amount} Now
              </button>
            </motion.div>
          ))}
        </div>
        {/* Custom Donation & Recent Supporters Section */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {/* Custom Amount Selector */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Or Choose Custom Amount</h3>
            <p className="text-xs text-gray-500 mb-6">Enter any custom contribution amount in INR (₹).</p>

            <div className="flex gap-2 mb-4">
              {[100, 250, 1000, 5000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setCustomAmount(amt)}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs border transition ${
                    customAmount === amt
                      ? "bg-green-600 text-white border-green-600 shadow-md"
                      : "bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700"
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            <div className="relative mb-6">
              <span className="absolute left-4 top-3.5 font-bold text-gray-400">₹</span>
              <input
                type="number"
                min="10"
                value={customAmount}
                onChange={(e) => setCustomAmount(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white font-extrabold text-lg rounded-xl border border-gray-200 dark:border-slate-700 focus:outline-none"
              />
            </div>

            <button
              onClick={() => setSelectedTier({ title: "Custom Donation", amount: customAmount })}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-lg transition cursor-pointer"
            >
              Proceed to Donate ₹{customAmount}
            </button>
          </div>

          {/* Recent Supporters Feed */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="text-green-600" size={20} /> Recent Green Donors
            </h3>
            <p className="text-xs text-gray-500 mb-6">People who recently supported our green initiative.</p>

            <div className="space-y-3">
              {recentSupporters.map((s, idx) => (
                <div key={idx} className="flex justify-between items-center p-3.5 bg-green-50/60 dark:bg-slate-800/60 rounded-2xl border border-green-100 dark:border-slate-700">
                  <div>
                    <h4 className="font-bold text-xs text-gray-900 dark:text-white">{s.name}</h4>
                    <span className="text-[10px] text-gray-500">{s.time}</span>
                  </div>
                  <span className="font-extrabold text-green-700 dark:text-green-400 text-sm">{s.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PAYMENT MODAL */}
      {selectedTier && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-200 dark:border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setSelectedTier(null);
                setDonationSuccess(false);
              }}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X size={20} />
            </button>

            {donationSuccess ? (
              <div className="text-center py-4 space-y-4">
                <CheckCircle size={56} className="text-green-600 mx-auto" />
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">Payment Successful!</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Thank you <strong>{donorName || "Green Earth Supporter"}</strong> for contributing <strong>₹{customAmount}</strong>. Your contribution will plant <strong>{Math.floor(customAmount / 50)} {selectedTree} sapling(s)</strong> at <strong>{selectedZone}</strong>!
                </p>

                {dedicationName && (
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center justify-center gap-1">
                    <Gift size={14} /> Dedicated To: {dedicationName}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={downloadReceipt}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Download size={14} /> Receipt (80G)
                  </button>

                  <a
                    href={`https://wa.me/?text=I%20just%20donated%20%E2%82%B9${customAmount}%20to%20plant%20trees%20with%20Green%20Earth%20Project!%20Join%20the%20mission.`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1"
                  >
                    <Share2 size={14} /> Share
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div className="text-center mb-4">
                  <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase">Confirm Donation</span>
                  <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">₹{customAmount}</h3>
                  <p className="text-xs text-gray-500">{selectedTier.title}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDonationFrequency("one-time")}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                      donationFrequency === "one-time" ? "bg-green-600 text-white border-green-600" : "bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    One-Time
                  </button>
                  <button
                    type="button"
                    onClick={() => setDonationFrequency("monthly")}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                      donationFrequency === "monthly" ? "bg-green-600 text-white border-green-600" : "bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Monthly Recurring 🔄
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1">Tree Species</label>
                    <select
                      value={selectedTree}
                      onChange={(e) => setSelectedTree(e.target.value)}
                      className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl border text-xs font-bold focus:outline-none"
                    >
                      {treeSpecies.map((tree) => (
                        <option key={tree} value={tree}>{tree}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1">Plantation Zone</label>
                    <select
                      value={selectedZone}
                      onChange={(e) => setSelectedZone(e.target.value)}
                      className="w-full p-2.5 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl border text-xs font-bold focus:outline-none"
                    >
                      {plantationZones.map((zone) => (
                        <option key={zone} value={zone}>{zone}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Your Full Name"
                  required
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full p-3 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-slate-700 text-xs focus:outline-none"
                />

                <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800">
                  <input
                    type="checkbox"
                    id="giftCheck"
                    checked={isGift}
                    onChange={(e) => setIsGift(e.target.checked)}
                    className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
                  />
                  <label htmlFor="giftCheck" className="text-xs font-bold text-amber-800 dark:text-amber-300 cursor-pointer flex items-center gap-1">
                    <Gift size={14} /> Mark as Eco-Gift Donation for Birthday / Anniversary
                  </label>
                </div>

                <input
                  type="text"
                  placeholder="Dedicate Tree To Someone? (Optional)"
                  value={dedicationName}
                  onChange={(e) => setDedicationName(e.target.value)}
                  className="w-full p-3 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-slate-700 text-xs focus:outline-none"
                />

                <input
                  type="text"
                  placeholder="Message for Tree Guard Tag (Optional)"
                  value={treeTagMessage}
                  onChange={(e) => setTreeTagMessage(e.target.value)}
                  className="w-full p-3 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-slate-700 text-xs focus:outline-none"
                />

                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-gray-500">Select Payment Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`p-3 rounded-xl font-bold text-xs border flex items-center justify-center gap-2 ${
                        paymentMethod === "upi" ? "bg-green-600 text-white border-green-600" : "bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <QrCode size={14} /> UPI / QR Code
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-3 rounded-xl font-bold text-xs border flex items-center justify-center gap-2 ${
                        paymentMethod === "card" ? "bg-green-600 text-white border-green-600" : "bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <CreditCard size={14} /> Card / NetBanking
                    </button>
                  </div>
                </div>

                {paymentMethod === "upi" && (
                  <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl text-center border border-gray-200 dark:border-slate-700">
                    <QrCode size={80} className="mx-auto text-gray-800 dark:text-white mb-2" />
                    <span className="text-[11px] text-gray-500 block">Scan QR code using GPay, PhonePe, or Paytm</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer"
                >
                  Pay ₹{customAmount} Safely
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
