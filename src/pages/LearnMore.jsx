import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Leaf,
  Trees,
  Droplets,
  ArrowLeft,
  ArrowUp,
  Recycle,
  HelpCircle,
  Download,
  Calculator,
  Volume2,
  VolumeX,
  Award,
  Pause,
  Play,
  RotateCcw,
  RefreshCw,
  FileText
} from "lucide-react";
import { useState, useEffect } from "react";

const quizBank = [
  {
    q: "Which tree species releases oxygen for nearly 24 hours a day?",
    options: ["Eucalyptus Tree", "Peepal Tree", "Pine Tree"],
    answer: 1
  },
  {
    q: "How much CO2 does a mature tree absorb per year on average?",
    options: ["5 kg", "22 kg", "100 kg"],
    answer: 1
  },
  {
    q: "Which element makes up the largest part of Earth's atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide"],
    answer: 1
  },
  {
    q: "What is the primary cause of global ocean acidification?",
    options: ["Plastic waste", "Excess CO2 absorption", "Oil spills"],
    answer: 1
  },
  {
    q: "Which type of energy source is completely renewable and pollution-free?",
    options: ["Coal", "Solar Energy", "Natural Gas"],
    answer: 1
  },
  {
    q: "How many liters of water can a single dripping tap waste in a day?",
    options: ["Up to 30 Liters", "Only 1 Liter", "500 Liters"],
    answer: 0
  },
  {
    q: "Which forest type is known as the 'Lungs of the Planet'?",
    options: ["Amazon Rainforest", "Taiga Forest", "Black Forest"],
    answer: 0
  }
];

export default function LearnMore() {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [userSelection, setUserSelection] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState("");

  const [isPlaying, setIsPlaying] = useState(false);
  const [speechUtterance, setSpeechUtterance] = useState(null);

  // Tree & Paper Calculator States
  const [paperReams, setPaperReams] = useState(5); // 1 Ream = 500 A4 Sheets

  // Carbon Calculator States
  const [km, setKm] = useState(15);
  const [power, setPower] = useState(80);

  // Certificate State
  const [learnerName, setLearnerName] = useState("");
  const [certDone, setCertDone] = useState(false);

  // Calculations for Paper vs Trees
  const totalSheets = paperReams * 500;
  const treesCut = (totalSheets / 8333).toFixed(2); // ~8,333 sheets = 1 tree
  const waterUsedLiters = Math.round(paperReams * 50); // ~50 Liters per ream

  const monthlyCO2 = Math.round(km * 0.2 * 30 + power * 0.8);
  const treesNeeded = Math.ceil(monthlyCO2 / 22);

  const fullSpeechText = "Welcome to Green Earth Project. Our mission is to protect nature, save water, plant trees, and reduce pollution for a cleaner and greener planet.";

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(fullSpeechText);
      utterance.rate = 0.9;
      utterance.onend = () => setIsPlaying(false);
      setSpeechUtterance(utterance);
    }
  }, []);

  const handleNextQuiz = () => {
    let nextIdx = Math.floor(Math.random() * quizBank.length);
    if (nextIdx === currentQuizIndex) {
      nextIdx = (currentQuizIndex + 1) % quizBank.length;
    }
    setCurrentQuizIndex(nextIdx);
    setUserSelection(null);
    setQuizFeedback("");
  };

  const handleAnswerSelect = (idx) => {
    setUserSelection(idx);
    if (idx === quizBank[currentQuizIndex].answer) {
      setQuizFeedback("correct");
    } else {
      setQuizFeedback("wrong");
    }
  };

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert("Speech Synthesis is not supported in your browser.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else if (speechUtterance) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speechUtterance);
      }
      setIsPlaying(true);
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handleDownloadHandbook = () => {
    const content = `=========================================
GREEN EARTH PROJECT - OFFICIAL ECO ACTION HANDBOOK
=========================================

1. PLANT TREES:
   - Plant native species like Neem, Peepal, and Banyan.
   - Water saplings during early morning or late evening.

2. SAVE WATER:
   - Fix leaking taps promptly.
   - Practice rainwater harvesting.

3. REDUCE PLASTIC:
   - Carry cloth bags for grocery shopping.
   - Avoid single-use plastic bottles.

Thank you for protecting nature!
Green Earth Conservation Wing
=========================================`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Green_Earth_Eco_Handbook.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const sections = [
    {
      icon: Trees,
      title: "Protect Trees",
      text: "Trees give us oxygen, protect wildlife and maintain balance in our environment."
    },
    {
      icon: Droplets,
      title: "Save Water",
      text: "Every drop matters. Saving water today creates a better future tomorrow."
    },
    {
      icon: Recycle,
      title: "Reduce Pollution",
      text: "Recycling waste and reducing pollution helps keep our planet clean."
    }
  ];

  const facts = [
    { icon: "🌳", number: "10K+", title: "Trees Planted" },
    { icon: "🤝", number: "500+", title: "Volunteers" },
    { icon: "🌱", number: "100+", title: "Campaigns" },
    { icon: "🌍", number: "50+", title: "Clean Areas" }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-6 py-28 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
          <Link to="/">
            <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition font-bold text-xs cursor-pointer">
              <ArrowLeft size={18} />
              Back to Home
            </button>
          </Link>

          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-full border border-gray-200 dark:border-slate-800 shadow-md">
            <button
              onClick={toggleSpeech}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full font-bold text-xs shadow hover:bg-green-700 transition cursor-pointer"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              {isPlaying ? "Pause Voice" : "Play Real Voice Narration 🔊"}
            </button>
            {isPlaying && (
              <button
                onClick={stopSpeech}
                title="Stop Audio"
                className="p-2 bg-rose-100 dark:bg-rose-900/40 text-rose-600 rounded-full hover:bg-rose-200 transition cursor-pointer"
              >
                <RotateCcw size={14} />
              </button>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-5 py-2 rounded-full font-semibold border border-green-200 dark:border-slate-800">
            <Leaf size={18} />
            About Green Earth
          </div>

          <h1 className="mt-8 text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white">
            Together We Can Make <span className="text-green-600 dark:text-green-400">Earth Greener</span>
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-8">
            Green Earth inspires people to protect nature, save resources and create a cleaner and healthier planet.
          </p>

          <button
            onClick={handleDownloadHandbook}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full text-xs shadow-lg transition cursor-pointer"
          >
            <Download size={16} /> Download Free Eco Handbook (.txt)
          </button>
        </motion.div>
        {/* NEW FEATURE: PAPER CONSUMPTION VS TREE CUT CALCULATOR */}
        <div className="mt-16 bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-amber-500" size={32} />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Paper Consumption vs. Tree Impact Calculator</h3>
              <p className="text-xs text-gray-500">Find out how many trees are cut to produce your paper usage!</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">
                  Paper Reams Used (1 Ream = 500 A4 Sheets): <strong className="text-green-600 text-base">{paperReams} Reams ({totalSheets.toLocaleString()} Pages)</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={paperReams}
                  onChange={(e) => setPaperReams(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>1 Ream (500 sheets)</span>
                  <span>50 Reams (25k sheets)</span>
                  <span>100 Reams (50k sheets)</span>
                </div>
              </div>

              <div className="p-4 bg-green-50 dark:bg-slate-800/60 rounded-2xl border border-green-100 dark:border-slate-700 text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                💡 <strong>Fact:</strong> It takes approximately 1 full-grown tree to make 16.6 reams (8,333 A4 sheets) of standard paper.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-rose-50 dark:bg-rose-950/40 p-5 rounded-2xl border border-rose-200 dark:border-rose-900 text-center">
                <span className="text-[10px] text-rose-600 dark:text-rose-400 font-extrabold uppercase block">Trees Cut Down</span>
                <span className="text-3xl font-black text-rose-600 dark:text-rose-400 mt-1 block">🪓 {treesCut} Trees</span>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/40 p-5 rounded-2xl border border-blue-200 dark:border-blue-900 text-center">
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-extrabold uppercase block">Water Consumed</span>
                <span className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-1 block">💧 {waterUsedLiters} L</span>
              </div>
            </div>
          </div>
        </div>

        {/* ENDLESS DYNAMIC QUIZ ENGINE */}
        <div className="mt-16 bg-gradient-to-r from-emerald-900 to-green-900 text-white rounded-3xl p-8 shadow-2xl border border-green-700">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <HelpCircle size={28} className="text-amber-400" />
              <div>
                <h3 className="text-2xl font-bold">Endless Eco Quiz Challenge</h3>
                <p className="text-xs text-green-200">Answer questions to test your eco knowledge!</p>
              </div>
            </div>

            <button
              onClick={handleNextQuiz}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition border border-white/20 cursor-pointer"
            >
              <RefreshCw size={14} /> Next Question
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur p-6 rounded-2xl border border-white/10">
            <h4 className="text-lg font-bold text-amber-300 mb-4">
              Q: {quizBank[currentQuizIndex].q}
            </h4>

            <div className="grid md:grid-cols-3 gap-3">
              {quizBank[currentQuizIndex].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(idx)}
                  className={`p-3.5 rounded-xl text-xs font-bold transition border text-left cursor-pointer ${
                    userSelection === idx
                      ? "bg-amber-400 text-slate-950 border-amber-300 font-extrabold"
                      : "bg-white/10 hover:bg-white/20 text-white border-white/10"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {quizFeedback === "correct" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-emerald-500/30 border border-emerald-400 rounded-xl text-emerald-200 font-extrabold text-sm flex items-center justify-between"
              >
                <span>🎉 Your Answer is Correct! Great job!</span>
                <button
                  onClick={handleNextQuiz}
                  className="px-3 py-1.5 bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs"
                >
                  Try Another ➔
                </button>
              </motion.div>
            )}

            {quizFeedback === "wrong" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-rose-500/30 border border-rose-400 rounded-xl text-rose-200 font-extrabold text-sm flex items-center justify-between"
              >
                <span>❌ Your Answer is Incorrect! Try again or load next.</span>
                <button
                  onClick={handleNextQuiz}
                  className="px-3 py-1.5 bg-rose-500 text-white font-bold rounded-lg text-xs"
                >
                  Next Question ➔
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* PERSONAL CARBON FOOTPRINT CALCULATOR */}
        <div className="mt-16 bg-gradient-to-br from-green-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-8 shadow-2xl border border-green-700">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="text-amber-400" size={28} />
            <div>
              <h3 className="text-2xl font-bold">Personal Carbon Footprint Calculator</h3>
              <p className="text-xs text-green-200">Estimate your monthly carbon emissions and see how many trees offset it!</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-green-300 uppercase mb-1">Daily Travel Distance: {km} KM</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={km}
                  onChange={(e) => setKm(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg accent-green-400 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-green-300 uppercase mb-1">Monthly Electricity Units: {power} kWh</label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  value={power}
                  onChange={(e) => setPower(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg accent-green-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur p-4 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] text-green-300 uppercase font-bold block">Est. Monthly CO₂</span>
                <span className="text-3xl font-extrabold text-amber-300">{monthlyCO2} kg</span>
              </div>
              <div className="bg-white/10 backdrop-blur p-4 rounded-2xl border border-white/10 text-center">
                <span className="text-[10px] text-green-300 uppercase font-bold block">Trees Needed/Year</span>
                <span className="text-3xl font-extrabold text-green-400">{treesNeeded} 🌳</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {sections.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 hover:-translate-y-3 transition-all border border-gray-100 dark:border-slate-800"
              >
                <Icon size={45} className="text-green-600 dark:text-green-400" />
                <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">{item.title}</h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-7">{item.text}</p>
              </motion.div>
            );
          })}
        </div>

        {/* ECO LEARNER PASS GENERATOR */}
        <div className="mt-20 bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <Award className="text-amber-500" size={28} />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Eco-Learner Certification Badge</h3>
              <p className="text-xs text-gray-500">Generate your personalized Eco Knowledge Badge after exploring the guides.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Enter your name"
              value={learnerName}
              onChange={(e) => setLearnerName(e.target.value)}
              className="p-3 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-slate-700 text-xs flex-1 focus:outline-none"
            />
            <button
              onClick={() => learnerName.trim() && setCertDone(true)}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-xs transition cursor-pointer"
            >
              Generate Badge
            </button>
          </div>

          {certDone && (
            <div className="p-6 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 rounded-2xl border-2 border-green-500 text-center font-semibold text-xs">
              🎖️ Certified Eco-Learner Pass Issued to <strong>{learnerName}</strong>! Keep spreading environmental awareness.
            </div>
          )}
        </div>

        {/* ENVIRONMENTAL IMPACT COUNTER */}
        <div className="mt-20">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white">Our Environmental Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {facts.map((item, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6 text-center border border-gray-100 dark:border-slate-800">
                <div className="text-4xl">{item.icon}</div>
                <h3 className="mt-4 text-3xl font-extrabold text-green-600 dark:text-green-400">{item.number}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400 text-xs font-bold">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BACK TO TOP BUTTON */}
        <div className="mt-20 flex justify-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 bg-green-600 text-white px-7 py-3 rounded-full shadow-lg hover:bg-green-700 transition font-bold text-xs cursor-pointer"
          >
            <ArrowUp size={18} /> Back To Top
          </button>
        </div>
      </div>
    </section>
  );
}
