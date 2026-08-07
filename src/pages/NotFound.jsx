import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-6">

      <div className="text-center">

        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-8xl font-extrabold text-green-600"
        >
          404
        </motion.h1>

        <h2 className="mt-6 text-4xl font-bold text-gray-900">
          Page Not Found
        </h2>

        <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-10 bg-green-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-700 transition"
        >
          Back To Home
        </Link>

      </div>

    </section>
  );
}
