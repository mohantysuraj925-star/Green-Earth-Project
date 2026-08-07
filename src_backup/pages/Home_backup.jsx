import { motion } from "framer-motion";
import { ArrowRight, Leaf, Droplets, TreePine } from "lucide-react";

export default function Home() {
  return (
    <section
      id="home"
      className="bg-gradient-to-br from-green-50 via-white to-blue-50 px-6 pt-24 pb-14 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">
            <Leaf size={20}/>
            Green Earth Initiative
          </div>

          <h1 className="mt-5 text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Save Trees,
            <br />
            <span className="text-green-600">
              Save Our Planet
            </span>
          </h1>

          <p className="mt-5 text-lg text-gray-600 leading-8 max-w-xl">
            Join our mission to protect nature, conserve water and create a
            cleaner and greener future for everyone.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <button className="flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-green-700 transition">
              Get Started
              <ArrowRight size={18}/>
            </button>

            <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-600 hover:text-white transition">
              Learn More
            </button>

          </div>


          <div className="grid grid-cols-3 gap-3 mt-10">

            <div className="bg-white p-4 rounded-2xl shadow">
              <TreePine className="text-green-600"/>
              <p className="text-sm font-semibold mt-2">
                Plant Trees
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow">
              <Droplets className="text-blue-600"/>
              <p className="text-sm font-semibold mt-2">
                Save Water
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow">
              <Leaf className="text-green-600"/>
              <p className="text-sm font-semibold mt-2">
                Clean Earth
              </p>
            </div>

          </div>

        </motion.div>


        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >

          <div className="relative">

            <div className="absolute -inset-5 bg-green-200 rounded-[40px] blur-2xl opacity-40"></div>

            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
              alt="Nature"
              className="relative rounded-[40px] shadow-2xl w-full max-w-lg h-[500px] object-cover"
            />

          </div>

        </motion.div>

      </div>
    </section>
  );
}
