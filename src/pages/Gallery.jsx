import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaRegHeart,
  FaExpand,
  FaTimes,
  FaUpload,
  FaCheckCircle,
  FaPlay,
  FaDownload,
  FaMapMarkerAlt,
  FaLeaf,
  FaExclamationTriangle
} from "react-icons/fa";

const initialGalleryData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900",
    title: "Dense Evergreen Canopy",
    category: "Nature",
    location: "Bhubaneswar",
    likes: 124
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=900",
    title: "College Sapling Drive",
    category: "Plantation",
    location: "GIET Campus",
    likes: 89
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900",
    title: "Clean Wind Farm Energy",
    category: "Nature",
    location: "Khurdha",
    likes: 156
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900",
    title: "Lake Rejuvenation Project",
    category: "Water",
    location: "Puri",
    likes: 210
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900",
    title: "Community Forest Walk",
    category: "Plantation",
    location: "Bhubaneswar",
    likes: 95
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=900",
    title: "Beach Plastic Cleanup",
    category: "Clean Drives",
    location: "Puri Beach",
    likes: 312
  }
];

const videoClips = [
  {
    id: 1,
    type: "positive",
    title: "Realistic Nature: Mountains, Rivers & Waterfalls",
    duration: "Real HD Image Slideshow",
    views: "3.4K",
    desc: "Real high-definition visuals of majestic mountains, crystal-clear waterfalls, and evergreen rainforests.",
    speechText: "Welcome to Green Earth. Look at these breathtaking mountains, pure rivers, and lush green forests. Nature gives us life, oxygen, and beauty. Let us stand together to protect and restore our planet.",
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000", // Mountain
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1000", // Waterfall
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1000", // River & Forest
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000"  // Lake & Nature
    ]
  },
  {
    id: 2,
    type: "negative",
    title: "Threat Warning: Factories, Chimneys & Plastic Pollution",
    duration: "Real HD Image Slideshow",
    views: "5.1K",
    desc: "Real photos showing toxic factory chimneys, dark air pollution, and plastic dumps threatening nature.",
    speechText: "Warning! Industrial chimneys spewing toxic smoke and endless plastic waste dumping are destroying our water bodies and fresh air. If we do not stop pollution today, our future is in grave danger!",
    images: [
      "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1000", // Factory Smoke
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=1000", // Plastic Waste
      "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=1000", // Air Pollution
      "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=1000"  // Polluted Water
    ]
  }
];

// REAL IMAGE AUTO-SLIDESHOW PLAYER
function RealImageVideoSlideshow({ images, title }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 2500); // Changes image every 2.5 seconds
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="relative w-full h-80 bg-black rounded-b-3xl overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIdx}
          src={images[currentIdx]}
          alt={title}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute bottom-3 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-bold">
        📷 Real HD Scene {currentIdx + 1} of {images.length}
      </div>
    </div>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [activeImage, setActiveImage] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const [likedMap, setLikedMap] = useState(() => {
    const saved = localStorage.getItem("gallery_user_likes");
    return saved ? JSON.parse(saved) : {};
  });

  const [gallery, setGallery] = useState(() => {
    const savedCounts = localStorage.getItem("gallery_counts");
    return savedCounts ? JSON.parse(savedCounts) : initialGalleryData;
  });

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState("Plantation");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem("gallery_user_likes", JSON.stringify(likedMap));
    localStorage.setItem("gallery_counts", JSON.stringify(gallery));
  }, [likedMap, gallery]);

  useEffect(() => {
    if (activeVideo) {
      const synth = window.speechSynthesis;
      if (synth) {
        synth.cancel();
        const utterance = new SpeechSynthesisUtterance(activeVideo.speechText);
        utterance.lang = "en-US";
        utterance.rate = 0.95;

        const voices = synth.getVoices();
        const maleVoice = voices.find(
          (v) => v.lang.startsWith("en") && (v.name.includes("Male") || v.name.includes("David") || v.name.includes("Mark") || v.name.includes("Google US English"))
        );
        if (maleVoice) utterance.voice = maleVoice;

        synth.speak(utterance);
      }
    } else {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    }
  }, [activeVideo]);

  const toggleLike = (id) => {
    const isLiked = !!likedMap[id];
    setLikedMap((prev) => ({ ...prev, [id]: !isLiked }));

    setGallery((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, likes: isLiked ? item.likes - 1 : item.likes + 1 }
          : item
      )
    );
  };

  const handleDownloadWallpaper = (title, url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "_")}_Wallpaper.jpg`;
    a.target = "_blank";
    a.click();
  };

  const filteredImages = filter === "All"
    ? gallery
    : gallery.filter((item) => item.category === filter);

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (uploadTitle.trim()) {
      const newPhoto = {
        id: Date.now(),
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900",
        title: uploadTitle,
        category: uploadCategory,
        location: "Odisha Zone",
        likes: 0
      };
      setGallery([newPhoto, ...gallery]);
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setShowUploadModal(false);
        setUploadTitle("");
      }, 1500);
    }
  };

  return (
    <section className="bg-white dark:bg-slate-950 min-h-screen pt-28 pb-24 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <span className="inline-block bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-5 py-2 rounded-full font-semibold border border-green-200 dark:border-slate-800">
            Nature & Impact Gallery
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Explore The Beauty Of Nature
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Discover inspiring moments from forests, rivers, wildlife, and ground environmental campaigns.
          </p>

          <button
            onClick={() => setShowUploadModal(true)}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full text-xs shadow-lg transition cursor-pointer"
          >
            <FaUpload /> Submit Your Drive Photo
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {["All", "Plantation", "Clean Drives", "Water", "Nature"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition cursor-pointer ${
                filter === cat
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Photo Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredImages.map((item) => {
            const isLiked = !!likedMap[item.id];
            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-slate-800 flex flex-col justify-between group"
              >
                <div className="relative overflow-hidden cursor-pointer" onClick={() => setActiveImage(item)}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                    <FaExpand size={24} />
                  </div>
                  <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-bold">
                    {item.category}
                  </span>
                </div>

                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-base">{item.title}</h3>
                    <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-1">
                      <FaMapMarkerAlt className="text-green-600" size={10} /> {item.location}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownloadWallpaper(item.title, item.image)}
                      title="Download HD Wallpaper"
                      className="p-2 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-green-100 dark:hover:bg-slate-700 transition cursor-pointer"
                    >
                      <FaDownload size={12} />
                    </button>
                    <button
                      onClick={() => toggleLike(item.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs transition cursor-pointer border ${
                        isLiked
                          ? "bg-rose-600 text-white border-rose-600 shadow-md"
                          : "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900"
                      }`}
                    >
                      {isLiked ? <FaHeart size={12} /> : <FaRegHeart size={12} />} {item.likes}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* TWO DISTINCT VIDEO SHORTS (GREEN REAL NATURE vs RED FACTORY POLLUTION) */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <FaPlay className="text-green-600" size={20} /> Realistic Image Slideshow Shorts
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {videoClips.map((v) => (
              <div
                key={v.id}
                className={`rounded-3xl p-6 text-white border flex flex-col justify-between ${
                  v.type === "positive"
                    ? "bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 border-emerald-600 shadow-emerald-900/20 shadow-2xl"
                    : "bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 border-rose-600 shadow-rose-900/20 shadow-2xl"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span
                      className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                        v.type === "positive" ? "bg-emerald-500 text-slate-950" : "bg-rose-600 text-white animate-pulse"
                      }`}
                    >
                      {v.type === "positive" ? "🏔️ Mountains, Rivers & Waterfalls" : "🏭 Factories & Plastic Threat"}
                    </span>
                    <span className="text-xs text-gray-400">{v.views} views</span>
                  </div>
                  <h4 className="font-bold text-lg">{v.title}</h4>
                  <p className="text-xs text-gray-300 mt-2 leading-relaxed">{v.desc}</p>
                </div>

                <button
                  onClick={() => setActiveVideo(v)}
                  className={`mt-6 w-full py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg ${
                    v.type === "positive"
                      ? "bg-emerald-500 hover:bg-emerald-600 text-slate-950"
                      : "bg-rose-600 hover:bg-rose-700 text-white"
                  }`}
                >
                  <FaPlay size={14} /> Play Real HD Visuals (English Male Voice)
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WORKING REAL IMAGE AUTO-SLIDESHOW PLAYER WITH VOICE */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 text-white p-3 rounded-full hover:bg-black transition cursor-pointer"
            >
              <FaTimes size={18} />
            </button>

            <div
              className={`p-4 text-white border-b ${
                activeVideo.type === "positive" ? "bg-emerald-950 border-emerald-700" : "bg-rose-950 border-rose-700"
              }`}
            >
              <h3 className="font-bold text-lg flex items-center gap-2">
                {activeVideo.type === "positive" ? <FaLeaf className="text-emerald-400" /> : <FaExclamationTriangle className="text-rose-400" />}
                {activeVideo.title}
              </h3>
              <p className="text-xs text-gray-300 mt-1">🔊 English Male Voice Active • Real HD Photos Auto-Changing...</p>
            </div>

            <RealImageVideoSlideshow images={activeVideo.images} title={activeVideo.title} />
          </div>
        </div>
      )}

      {/* LIGHTBOX PHOTO MODAL */}
      {activeImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black transition cursor-pointer"
            >
              <FaTimes size={18} />
            </button>
            <img src={activeImage.image} alt={activeImage.title} className="w-full max-h-[75vh] object-contain bg-black" />
            <div className="p-6 text-white flex justify-between items-center bg-slate-900">
              <div>
                <h3 className="text-xl font-bold">{activeImage.title}</h3>
                <span className="text-xs text-green-400 font-semibold">{activeImage.category} Collection</span>
              </div>
              <button
                onClick={() => toggleLike(activeImage.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs cursor-pointer shadow-lg transition ${
                  likedMap[activeImage.id]
                    ? "bg-rose-600 text-white"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                {likedMap[activeImage.id] ? <FaHeart /> : <FaRegHeart />} Likes (
                {gallery.find((g) => g.id === activeImage.id)?.likes || 0})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD PHOTO MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full border border-gray-200 dark:border-slate-800 shadow-2xl relative">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <FaTimes size={18} />
            </button>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Submit Campaign Photo</h3>
            <p className="text-xs text-gray-500 mb-6">Share your on-ground tree plantation or cleanup drive moments.</p>

            {uploadSuccess ? (
              <div className="p-6 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 rounded-2xl text-center font-bold text-sm flex items-center justify-center gap-2">
                <FaCheckCircle size={20} /> Photo Uploaded Successfully!
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Photo Title / Event Name"
                  required
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full p-3.5 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-slate-700 text-xs focus:outline-none"
                />
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full p-3.5 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-slate-700 text-xs focus:outline-none font-semibold"
                >
                  <option value="Plantation">Plantation Drive</option>
                  <option value="Clean Drives">Clean Drives</option>
                  <option value="Water">Water Conservation</option>
                  <option value="Nature">Nature Spotting</option>
                </select>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer"
                >
                  Submit Photo
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
