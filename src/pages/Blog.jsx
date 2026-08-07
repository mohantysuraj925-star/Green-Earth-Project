import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaBookReader,
  FaVolumeUp,
  FaVolumeMute,
  FaHeart,
  FaRegHeart,
  FaPen,
  FaTimes,
  FaCheckCircle,
  FaClock,
  FaTag,
  FaSearch,
  FaBookmark,
  FaRegBookmark,
  FaShareAlt,
  FaCalculator
} from "react-icons/fa";

const initialBlogData = [
  {
    id: 1,
    title: "Why Trees Are Important for Urban Ecosystems",
    category: "Plantation",
    date: "July 2026",
    readTime: "3 min read",
    likes: 142,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    description: "Discover how planting native tree species helps fight urban heat islands and improves local biodiversity.",
    fullContent: "Trees act as the natural lungs of our cities. Urban tree canopies reduce ground temperatures by up to 5 degrees Celsius, filter air pollutants, and absorb thousands of kilograms of carbon dioxide every year. Planting native species like Neem and Peepal ensures survival without high water demands."
  },
  {
    id: 2,
    title: "Save Every Drop: Smart Water Conservation Habits",
    category: "Eco Tips",
    date: "July 2026",
    readTime: "4 min read",
    likes: 198,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
    description: "Simple, practical daily habits that reduce household water waste and protect local freshwater reserves.",
    fullContent: "Freshwater accounts for less than 3 percent of the Earth's total water. Simple actions like installing low-flow aerators on faucets, fixing minor plumbing leaks, and practicing rainwater harvesting can save thousands of liters of clean water per household every single year."
  },
  {
    id: 3,
    title: "Beat Plastic Pollution: Steps to Single-Use Alternatives",
    category: "Pollution",
    date: "July 2026",
    readTime: "5 min read",
    likes: 230,
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800",
    description: "Practical strategies to eliminate single-use plastic bottles, bags, and cutlery from your daily life.",
    fullContent: "Over 8 million tons of plastic enter our oceans every year, harming marine life and contaminating food chains. By switching to reusable cloth bags, stainless steel water bottles, and glass containers, every individual can prevent hundreds of plastic waste items from ending up in landfills."
  }
];

export default function Blog() {
  const [blogs, setBlogs] = useState(initialBlogData);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [shareModalArticle, setShareModalArticle] = useState(null);

  // Energy Saved Calculator State
  const [kwhSaved, setKwhSaved] = useState(20);

  const [likedMap, setLikedMap] = useState(() => {
    const saved = localStorage.getItem("blog_user_likes");
    return saved ? JSON.parse(saved) : {};
  });

  const [savedArticles, setSavedArticles] = useState(() => {
    const saved = localStorage.getItem("blog_saved_posts");
    return saved ? JSON.parse(saved) : {};
  });

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleCategory, setArticleCategory] = useState("Eco Tips");
  const [articleContent, setArticleContent] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem("blog_user_likes", JSON.stringify(likedMap));
    localStorage.setItem("blog_saved_posts", JSON.stringify(savedArticles));
  }, [likedMap, savedArticles]);

  const toggleAudioNarration = (text) => {
    if (!('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;

    if (isPlayingAudio) {
      synth.cancel();
      setIsPlayingAudio(false);
    } else {
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.95;

      const voices = synth.getVoices();
      const maleVoice = voices.find(
        (v) => v.lang.startsWith("en") && (v.name.includes("Male") || v.name.includes("David") || v.name.includes("Mark") || v.name.includes("Google US English"))
      );
      if (maleVoice) utterance.voice = maleVoice;

      utterance.onend = () => setIsPlayingAudio(false);
      synth.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const toggleLike = (id) => {
    const isLiked = !!likedMap[id];
    setLikedMap((prev) => ({ ...prev, [id]: !isLiked }));
    setBlogs((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, likes: isLiked ? item.likes - 1 : item.likes + 1 }
          : item
      )
    );
  };

  const toggleBookmark = (id) => {
    setSavedArticles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesCategory = filter === "All" || b.category === filter;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubmitArticle = (e) => {
    e.preventDefault();
    if (articleTitle.trim() && articleContent.trim()) {
      const newPost = {
        id: Date.now(),
        title: articleTitle,
        category: articleCategory,
        date: "July 2026",
        readTime: "3 min read",
        likes: 1,
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
        description: articleContent.slice(0, 100) + "...",
        fullContent: articleContent
      };
      setBlogs([newPost, ...blogs]);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowSubmitModal(false);
        setArticleTitle("");
        setArticleContent("");
      }, 1500);
    }
  };

  return (
    <section className="bg-green-50 dark:bg-slate-950 min-h-screen pt-28 pb-24 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <span className="inline-block bg-white dark:bg-slate-900 text-green-700 dark:text-green-400 px-5 py-2 rounded-full font-semibold shadow border border-green-100 dark:border-slate-800">
            Latest Articles & Insights
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Green Earth Blog
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Learn about sustainability, environmental protection, and practical ways to build a greener future.
          </p>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full text-xs shadow-lg transition cursor-pointer"
          >
            <FaPen /> Write & Submit Article
          </button>
        </div>

        {/* FEATURE 1: LIVE SEARCH & CATEGORY FILTER BAR */}
        <div className="mt-12 flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-md border border-gray-100 dark:border-slate-800">
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-4 top-3.5 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white rounded-full text-xs focus:outline-none border border-gray-200 dark:border-slate-700"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", "Plantation", "Eco Tips", "Pollution"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                  filter === cat
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredBlogs.map((blog) => {
            const isLiked = !!likedMap[blog.id];
            const isSaved = !!savedArticles[blog.id];
            return (
              <motion.div
                key={blog.id}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-800 flex flex-col justify-between"
              >
                <div className="relative">
                  <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                  <button
                    onClick={() => toggleBookmark(blog.id)}
                    className="absolute top-3 right-3 p-2.5 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black transition cursor-pointer"
                  >
                    {isSaved ? <FaBookmark className="text-amber-400" size={12} /> : <FaRegBookmark size={12} />}
                  </button>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1 font-semibold text-green-600 dark:text-green-400">
                        <FaTag size={10} /> {blog.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock size={10} /> {blog.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">
                      {blog.title}
                    </h2>
                    <p className="mt-3 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                      {blog.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-800">
                    <button
                      onClick={() => setSelectedArticle(blog)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full font-bold text-xs hover:bg-green-700 transition cursor-pointer"
                    >
                      <FaBookReader /> Read Article
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShareModalArticle(blog)}
                        title="Share Article"
                        className="p-2 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 rounded-full hover:bg-green-100 dark:hover:bg-slate-700 transition cursor-pointer"
                      >
                        <FaShareAlt size={12} />
                      </button>

                      <button
                        onClick={() => toggleLike(blog.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs transition cursor-pointer border ${
                          isLiked
                            ? "bg-rose-600 text-white border-rose-600 shadow-md"
                            : "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900"
                        }`}
                      >
                        {isLiked ? <FaHeart size={12} /> : <FaRegHeart size={12} />} {blog.likes}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FEATURE 2: ECO ENERGY SAVINGS WIDGET */}
        <div className="mt-20 bg-gradient-to-r from-emerald-900 to-green-900 text-white rounded-3xl p-8 shadow-2xl border border-green-700">
          <div className="flex items-center gap-3 mb-6">
            <FaCalculator className="text-amber-400" size={28} />
            <div>
              <h3 className="text-2xl font-bold">Household Energy Savings Impact</h3>
              <p className="text-xs text-green-200">See how small habits save monthly power and carbon emissions!</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <label className="block text-xs font-bold text-green-200 uppercase mb-2">
                Monthly Power Saved: <strong className="text-amber-300 text-base">{kwhSaved} kWh</strong>
              </label>
              <input
                type="range"
                min="5"
                max="200"
                value={kwhSaved}
                onChange={(e) => setKwhSaved(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg accent-green-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-white/10 backdrop-blur rounded-2xl text-center border border-white/10">
              <span className="text-[11px] font-bold text-green-300 uppercase block">Estimated CO₂ Offset</span>
              <span className="text-3xl font-extrabold text-amber-300 mt-1 block">🌱 {Math.round(kwhSaved * 0.85)} kg CO₂</span>
            </div>
          </div>
        </div>
      </div>

      {/* ARTICLE READER MODAL WITH VOICE */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-200 dark:border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setSelectedArticle(null);
                if (window.speechSynthesis) window.speechSynthesis.cancel();
                setIsPlayingAudio(false);
              }}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <FaTimes size={18} />
            </button>

            <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider block mb-2">
              {selectedArticle.category} • {selectedArticle.readTime}
            </span>

            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
              {selectedArticle.title}
            </h2>

            <button
              onClick={() => toggleAudioNarration(selectedArticle.fullContent)}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 font-bold rounded-full text-xs hover:bg-green-200 transition cursor-pointer border border-green-300 dark:border-green-800"
            >
              {isPlayingAudio ? <FaVolumeMute /> : <FaVolumeUp />}
              {isPlayingAudio ? "Stop Voice Narration" : "Listen to Voice Narration (English Male)"}
            </button>

            <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-56 object-cover rounded-2xl my-6" />

            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line font-normal">
              {selectedArticle.fullContent}
            </p>
          </div>
        </div>
      )}

      {/* SHARE MODAL */}
      {shareModalArticle && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-sm w-full border border-gray-200 dark:border-slate-800 shadow-2xl relative text-center">
            <button
              onClick={() => setShareModalArticle(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <FaTimes size={16} />
            </button>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Share Article</h3>
            <p className="text-xs text-gray-500 mb-4">{shareModalArticle.title}</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Article link copied to clipboard! 📋");
                setShareModalArticle(null);
              }}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-xs transition cursor-pointer"
            >
              Copy Article Link 📋
            </button>
          </div>
        </div>
      )}

      {/* SUBMIT ARTICLE MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full border border-gray-200 dark:border-slate-800 shadow-2xl relative">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <FaTimes size={18} />
            </button>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Submit Your Blog Post</h3>
            <p className="text-xs text-gray-500 mb-6">Share your environmental thoughts and eco-friendly tips.</p>

            {submitSuccess ? (
              <div className="p-6 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 rounded-2xl text-center font-bold text-sm flex items-center justify-center gap-2">
                <FaCheckCircle size={20} /> Article Submitted Successfully!
              </div>
            ) : (
              <form onSubmit={handleSubmitArticle} className="space-y-4">
                <input
                  type="text"
                  placeholder="Article Title"
                  required
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                  className="w-full p-3.5 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-slate-700 text-xs focus:outline-none"
                />

                <select
                  value={articleCategory}
                  onChange={(e) => setArticleCategory(e.target.value)}
                  className="w-full p-3.5 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-slate-700 text-xs focus:outline-none font-semibold"
                >
                  <option value="Eco Tips">Eco Tips</option>
                  <option value="Plantation">Plantation Drive</option>
                  <option value="Pollution">Pollution Prevention</option>
                </select>

                <textarea
                  placeholder="Write your article content here..."
                  rows={5}
                  required
                  value={articleContent}
                  onChange={(e) => setArticleContent(e.target.value)}
                  className="w-full p-3.5 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-slate-700 text-xs focus:outline-none"
                />

                <button
                  type="submit"
                  className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer"
                >
                  Publish Article
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
