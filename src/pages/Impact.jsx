import { motion } from "framer-motion";
import { FaTree, FaTint, FaGlobe, FaSeedling } from "react-icons/fa";
import { Link } from "react-scroll";

const impacts = [
  {
    icon: <FaTree className="text-5xl text-green-600" />,
    title: "Plant More Trees",
    description: "Every tree planted makes our environment cleaner and greener.",
  },
  {
    icon: <FaTint className="text-5xl text-blue-500" />,
    title: "Save Water",
    description: "Every drop of water saved helps protect our future.",
  },
  {
    icon: <FaGlobe className="text-5xl text-green-700" />,
    title: "Protect Earth",
    description: "Together we can reduce pollution and create a better planet.",
  },
  {
    icon: <FaSeedling className="text-5xl text-lime-600" />,
    title: "Grow Green",
    description: "Small actions today create a greener tomorrow.",
  },
];

export default function Impact() {
  return (
    <section
      id="impact"
      className="bg-green-100 pt-24 pb-32 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="inline-block bg-white text-green-700 px-4 py-2 rounded-full font-semibold">
            Our Impact
          </span>

          <h2 className="mt-5 text-5xl font-extrabold text-gray-900">
            Small Actions, Big Change
          </h2>

          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Together we can make the Earth greener by planting trees,
            saving water and protecting nature.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {impacts.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-lg p-8 text-center"
            >
              <div className="flex justify-center">{item.icon}</div>

              <h3 className="mt-6 text-2xl font-bold">
                {item.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link
            to="contact"
            smooth={true}
            duration={600}
            offset={-90}
          >
            <button className="px-10 py-4 rounded-full bg-green-600 text-white font-bold hover:bg-green-700 transition">
              Become a Volunteer
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}
