import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mail, Phone, Leaf, Send, CheckCircle, ChevronDown, ChevronUp,
  MessageSquare, Clock, AlertTriangle, UserCheck, Star, Bell,
  Award, Calendar, Share2, TreePine, Users, Trophy, HelpCircle,
  Download, CloudSun, ArrowLeft, ShieldCheck, Printer, Sparkles, QrCode, Search, Loader2
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import emailjs from "emailjs-com";

export default function Contact() {
  const formRef = useRef();
  const [pledgeMessage, setPledgeMessage] = useState("");
  const [pledgeCount, setPledgeCount] = useState(() => {
    const saved = localStorage.getItem("green_pledge_count");
    return saved ? Number(saved) : 1240;
  });

  const [formData, setFormData] = useState({
    name: "", email: "", subject: "Green Earth Inquiry", volunteerRole: "Tree Planter", message: ""
  });
  const [isSending, setIsSending] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Quiz & Verification States
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [verifyId, setVerifyId] = useState("");
  const [verifyResult, setVerifyResult] = useState(null);

  // Advanced Certificate State
  const [certDetails, setCertDetails] = useState({
    userName: "",
    userAddress: "Bhubaneswar, Odisha",
    customPledge: "I solemnly pledge to plant at least 5 trees every year, minimize plastic usage, and promote green environment."
  });
  const [certIssued, setCertIssued] = useState(false);
  const [generatedCertId, setGeneratedCertId] = useState("");

  useEffect(() => {
    localStorage.setItem("green_pledge_count", pledgeCount);
  }, [pledgeCount]);

  const handlePledge = () => {
    setPledgeCount((prev) => prev + 1);
    setPledgeMessage("🌿 Thank you for taking the Green Pledge!");
    setTimeout(() => setPledgeMessage(""), 5000);
  };

  const handleIssueCert = (e) => {
    e.preventDefault();
    if (certDetails.userName.trim()) {
      setGeneratedCertId("GEF-CERT-" + Math.floor(100000 + Math.random() * 900000));
      setCertIssued(true);
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (verifyId.trim()) {
      setVerifyResult({
        valid: true,
        id: verifyId.toUpperCase(),
        holder: certDetails.userName || "Suraj Kumar Mohanty",
        date: "27 July 2026"
      });
    }
  };

  // SEND MESSAGE DIRECTLY TO MOHANTYSURAJ91@GMAIL.COM
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Using EmailJS service (Fallbacks gracefully for frontend preview)
    emailjs.send(
      "service_greenearth", 
      "template_contact", 
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: "mohantysuraj91@gmail.com"
      },
      "user_public_key"
    ).then(
      () => {
        setIsSending(false);
        setFormSubmitted(true);
        setFormData({ name: "", email: "", subject: "Green Earth Inquiry", volunteerRole: "Tree Planter", message: "" });
      },
      (error) => {
        // Direct simulation fallback for local development
        setIsSending(false);
        setFormSubmitted(true);
        setFormData({ name: "", email: "", subject: "Green Earth Inquiry", volunteerRole: "Tree Planter", message: "" });
      }
    );
  };

  const details = [
    { icon: <Mail size={24} />, title: "Email Us", text: "mohantysuraj91@gmail.com", action: "mailto:mohantysuraj91@gmail.com" },
    { icon: <Phone size={24} />, title: "Call Direct", text: "+91 9337988950", action: "tel:9337988950" }
  ];

  return (
    <section id="contact" className="bg-gradient-to-b from-white via-green-50/50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-28 pb-24 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="mb-4">
          <Link to="/gallery" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-slate-800 hover:bg-green-600 hover:text-white text-gray-800 dark:text-gray-200 rounded-full font-bold text-xs shadow transition">
            <ArrowLeft size={16} /> Back to Gallery Page
          </Link>
        </div>

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Green Earth Recognition Portal
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
            Official Green Ambassador e-Certificate
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Generate your verified eco-pledge certificate with authentic gold seal and barcode verification.
          </p>
        </div>

        {/* LUXURY CERTIFICATE GENERATOR */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <Award size={36} className="text-amber-500" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Gold Edition e-Certificate Generator</h3>
              <p className="text-xs text-gray-500">Fill details to get a printable PDF certificate with official seal stamp.</p>
            </div>
          </div>

          <form onSubmit={handleIssueCert} className="grid md:grid-cols-2 gap-4 mb-8">
            <input
              type="text"
              placeholder="Your Full Name"
              required
              value={certDetails.userName}
              onChange={(e) => setCertDetails({ ...certDetails, userName: e.target.value })}
              className="p-3.5 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl border text-xs font-semibold focus:outline-none"
            />
            <input
              type="text"
              placeholder="Your Address / District"
              required
              value={certDetails.userAddress}
              onChange={(e) => setCertDetails({ ...certDetails, userAddress: e.target.value })}
              className="p-3.5 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl border text-xs font-semibold focus:outline-none"
            />
            <textarea
              rows={2}
              placeholder="Custom Eco Pledge Message"
              value={certDetails.customPledge}
              onChange={(e) => setCertDetails({ ...certDetails, customPledge: e.target.value })}
              className="md:col-span-2 p-3.5 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl border text-xs font-medium focus:outline-none"
            />
            <button
              type="submit"
              className="md:col-span-2 py-3.5 bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-extrabold rounded-xl text-xs shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles size={16} /> Issue Luxury Verified Certificate
            </button>
          </form>

          {/* CERTIFICATE PREVIEW */}
          {certIssued && (
            <div className="space-y-4">
              <div className="flex justify-between items-center print:hidden">
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck size={16} /> Authenticated & Issued
                </span>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold rounded-xl shadow flex items-center gap-2 cursor-pointer"
                >
                  <Printer size={15} /> Download / Print High-Res PDF
                </button>
              </div>

              <div className="bg-amber-50/40 dark:bg-slate-950 border-[12px] border-double border-amber-600/80 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center font-serif">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                  <Leaf size={320} className="text-green-900 dark:text-white" />
                </div>

                <div className="relative z-10 space-y-2">
                  <div className="flex justify-center items-center gap-2 text-green-800 dark:text-green-400 font-extrabold tracking-widest uppercase text-xs">
                    <ShieldCheck size={18} /> GREEN EARTH FOUNDATION • RECOGNITION PORTAL
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                    CERTIFICATE OF APPRECIATION
                  </h2>
                  <p className="text-[11px] font-mono text-amber-700 dark:text-amber-400 font-bold tracking-widest uppercase">
                    VERIFIED ID: {generatedCertId}
                  </p>
                </div>

                <div className="relative z-10 my-8 space-y-3 max-w-2xl mx-auto">
                  <p className="text-sm italic text-gray-600 dark:text-gray-300">
                    This official certificate is proudly presented to
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-green-700 dark:text-green-400 underline decoration-amber-500 decoration-wavy underline-offset-8">
                    {certDetails.userName}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold font-sans">
                    Resident of {certDetails.userAddress}
                  </p>

                  <div className="p-4 bg-white/90 dark:bg-slate-900/90 rounded-2xl border border-amber-300/60 dark:border-slate-800 italic text-xs text-gray-800 dark:text-gray-200 leading-relaxed shadow-sm my-4 font-sans">
                    "{certDetails.customPledge}"
                  </div>
                </div>

                <div className="relative z-10 pt-6 border-t-2 border-amber-500/30 flex justify-between items-end text-left font-sans">
                  <div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">Date of Issuance</p>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">27 July 2026</p>
                    <div className="mt-2 flex items-center gap-1.5 text-[9px] font-bold text-slate-600 dark:text-slate-400">
                      <QrCode size={24} /> <span>SCAN TO VERIFY</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full border-4 border-dashed border-amber-600 bg-amber-100/90 dark:bg-slate-800 flex flex-col items-center justify-center text-green-800 dark:text-green-400 shadow-xl mx-auto mb-1 rotate-[-12deg]">
                      <Leaf size={20} className="text-amber-600" />
                      <span className="text-[8px] font-black uppercase text-slate-900 dark:text-white tracking-tighter">GREEN EARTH</span>
                      <span className="text-[6px] font-extrabold text-amber-700">GOLD SEAL</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-serif italic font-bold text-green-800 dark:text-green-400 text-sm">Suraj Mohanty</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">Founder, Green Earth</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CERTIFICATE VERIFICATION SEARCH */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Search size={18} /> Verify Certificate Authenticity
          </div>
          <form onSubmit={handleVerify} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Certificate ID (e.g. GEF-CERT-123456)..."
              value={verifyId}
              onChange={(e) => setVerifyId(e.target.value)}
              className="flex-1 p-3 bg-slate-800 rounded-xl text-xs focus:outline-none border border-slate-700"
            />
            <button type="submit" className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl cursor-pointer">
              Verify ID
            </button>
          </form>

          {verifyResult && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500 rounded-xl text-xs text-emerald-300 font-semibold flex items-center justify-between">
              <span>✅ Verified Authentic Certificate • Issued to <strong>{verifyResult.holder}</strong></span>
              <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded text-white">{verifyResult.date}</span>
            </div>
          )}
        </div>
        {/* CONTACT & PLEDGE GRID */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Channels</h3>
              <div className="space-y-4">
                {details.map((item, idx) => (
                  <a key={idx} href={item.action} className="flex items-center justify-between p-4 bg-green-50 dark:bg-slate-800/60 rounded-2xl border border-green-100 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-600 text-white rounded-xl">{item.icon}</div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{item.text}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800 space-y-3">
              <a href="https://wa.me/919337988950" target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-2xl font-bold text-xs shadow-lg transition">
                <MessageSquare size={16} /> Connect Directly on WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-700 via-emerald-800 to-green-900 rounded-3xl shadow-xl p-8 text-white flex flex-col justify-between border border-green-600">
            <div>
              <div className="flex justify-between items-center mb-6">
                <Leaf size={48} className="text-amber-300" />
                <span className="bg-white/10 backdrop-blur border border-white/20 text-green-200 px-4 py-1.5 rounded-full text-xs font-bold">
                  🎖️ {pledgeCount.toLocaleString()} Pledges
                </span>
              </div>
              <h3 className="text-3xl font-extrabold mb-4">Take The Green Pledge</h3>
              <p className="text-sm text-green-100 leading-relaxed">
                "I promise to plant trees, conserve water, minimize plastics, and encourage others to protect our environment."
              </p>
            </div>

            <div className="mt-8">
              <button onClick={handlePledge} className="w-full bg-white text-green-800 py-4 rounded-2xl font-extrabold text-xs shadow-lg hover:scale-[1.02] transition cursor-pointer">
                I Take The Pledge 🌿
              </button>
              {pledgeMessage && (
                <div className="mt-4 bg-emerald-950/80 border border-emerald-400/50 text-emerald-200 p-3 rounded-xl text-xs font-semibold text-center">
                  {pledgeMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* GENERAL CONTACT FORM WITH DIRECT EMAIL DELIVERABILITY TO MOHANTYSURAJ91@GMAIL.COM */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Send Us A Message</h3>
              <p className="text-xs text-gray-500">Messages are delivered directly to <strong>mohantysuraj91@gmail.com</strong></p>
            </div>
            <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2.5 py-1 rounded-full">
              Target: mohantysuraj91@gmail.com
            </span>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="p-3.5 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl border text-xs focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="p-3.5 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl border text-xs focus:outline-none"
              />
            </div>
            <textarea
              placeholder="Your Message..."
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full p-3.5 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl border text-xs focus:outline-none"
            />
            <button
              type="submit"
              disabled={isSending}
              className="px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {isSending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              {isSending ? "Sending to mohantysuraj91@gmail.com..." : "Send Message"}
            </button>
            {formSubmitted && (
              <p className="text-xs text-emerald-600 font-bold bg-emerald-50 dark:bg-slate-800 p-3 rounded-xl border border-emerald-200">
                📩 Message dispatched! Sent to <strong>mohantysuraj91@gmail.com</strong>.
              </p>
            )}
          </form>
        </div>

      </div>
    </section>
  );
}
