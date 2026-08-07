import { motion } from "framer-motion";

const resources = [
  {
    title: "Climate Change Guide",
    description: "Learn the basics of climate change and how to reduce its impact."
  },
  {
    title: "Tree Plantation Handbook",
    description: "Best practices for planting and maintaining healthy trees."
  },
  {
    title: "Water Conservation Tips",
    description: "Simple daily habits to save water and protect natural resources."
  }
];

export default function Resources() {
  return (
    <section className="bg-white min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center">
          <span className="inline-block bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">
            Resources
          </span>

          <h1 className="mt-6 text-5xl font-extrabold text-gray-900">
            Learn & Explore
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
            Educational resources to help you understand environmental
            protection and sustainable living.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {resources.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="bg-green-50 rounded-3xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900">
                {item.title}
              </h2>

              <p className="mt-4 text-gray-600 leading-7">
                {item.description}
              </p>

              <button className="mt-8 w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition">
                Explore
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
