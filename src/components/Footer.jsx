import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaLeaf,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaHeart
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Campaigns", path: "/campaigns" },
    { name: "Community", path: "/community" },
    { name: "EcoHub", path: "/ecohub" }
  ];

  const featureLinks = [
    { name: "Carbon Tracker", path: "/carbon-tracker" },
    { name: "Advance Tools", path: "/advance" },
    { name: "Learn More", path: "/learn-more" },
    { name: "Gallery", path: "/gallery" },
    { name: "Blog", path: "/blog" },
    { name: "Donate & Support", path: "/donate" }
  ];

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* BRAND COLUMN */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-3 group inline-flex">
            <div className="bg-gradient-to-br from-green-500 to-emerald-700 p-3 rounded-2xl shadow-lg shadow-green-600/20 group-hover:scale-110 transition-transform">
              <FaLeaf className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">
              Green <span className="text-green-400 underline decoration-amber-400 underline-offset-4">Earth</span>
            </h2>
          </Link>

          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            Plant Trees Today, Save Tomorrow. Together we can create a cleaner, greener, and healthier Earth for future generations.
          </p>

          <div className="pt-2">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md hover:shadow-green-500/20 transition-all hover:scale-105"
            >
              <FaHeart className="text-red-300" />
              <span>Plant a Tree Today</span>
            </Link>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-base font-bold text-white mb-4 border-l-4 border-green-500 pl-3">
            Navigation
          </h3>
          <ul className="space-y-2.5">
            {quickLinks.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-gray-400 hover:text-green-400 text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 hover:translate-x-1 duration-200"
                >
                  <span className="text-green-500 text-[10px]">►</span> {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* FEATURES & TOOLS */}
        <div>
          <h3 className="text-base font-bold text-white mb-4 border-l-4 border-green-500 pl-3">
            Tools & Hub
          </h3>
          <ul className="space-y-2.5">
            {featureLinks.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-gray-400 hover:text-green-400 text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 hover:translate-x-1 duration-200"
                >
                  <span className="text-green-500 text-[10px]">►</span> {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT & SOCIAL */}
        <div>
          <h3 className="text-base font-bold text-white mb-4 border-l-4 border-green-500 pl-3">
            Contact & Social
          </h3>

          <div className="space-y-3 text-gray-400 text-xs sm:text-sm">
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-green-400 text-sm shrink-0" />
              <a href="mailto:mohantysuraj91@gmail.com" className="hover:text-green-300 transition">
                mohantysuraj91@gmail.com
              </a>
            </p>

            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-green-400 text-sm shrink-0" />
              <a href="tel:9337988950" className="hover:text-green-300 transition">
                +91 9337988950
              </a>
            </p>

            <p className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-green-400 text-sm shrink-0" />
              <span>Odisha, India</span>
            </p>
          </div>

          <div className="pt-5">
            <h4 className="text-xs font-bold text-gray-300 mb-3 uppercase tracking-wider">Connect With Us</h4>
            <div className="flex gap-2.5">
              <a
                href="#"
                className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-gray-400 hover:text-green-400 hover:border-green-500/50 hover:bg-slate-800 transition-all hover:-translate-y-1"
                aria-label="Facebook"
              >
                <FaFacebook size={16} />
              </a>

              <a
                href="#"
                className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-gray-400 hover:text-green-400 hover:border-green-500/50 hover:bg-slate-800 transition-all hover:-translate-y-1"
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>

              <a
                href="#"
                className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-gray-400 hover:text-green-400 hover:border-green-500/50 hover:bg-slate-800 transition-all hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={16} />
              </a>

              <a
                href="https://github.com/mohantysuraj925-star"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-gray-400 hover:text-green-400 hover:border-green-500/50 hover:bg-slate-800 transition-all hover:-translate-y-1"
                aria-label="GitHub"
              >
                <FaGithub size={16} />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* COPYRIGHT BOTTOM BAR */}
      <div className="border-t border-slate-900 mt-12 pt-6 text-center text-gray-500 text-xs">
        <p>© 2026 Green Earth Project. All Rights Reserved. Built with Passion for a Greener World.</p>
      </div>
    </footer>
  );
}
