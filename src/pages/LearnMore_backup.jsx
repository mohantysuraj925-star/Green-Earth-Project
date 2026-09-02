import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Leaf,
  Trees,
  Droplets,
  Earth,
  ArrowLeft,
  ArrowUp,
} from "lucide-react";

export default function LearnMore() {

  const sections = [
    {
      icon: Trees,
      title: "Protect Trees",
      text: "Trees are the foundation of a healthy environment. They provide oxygen, support wildlife and help maintain balance in nature."
    },
    {
      icon: Droplets,
      title: "Save Water",
      text: "Water is one of our most valuable resources. Small steps in our daily life can help protect water for the future."
    },
    {
      icon: Earth,
      title: "Reduce Pollution",
      text: "Reducing waste, avoiding unnecessary pollution and keeping surroundings clean can create a better Earth."
    }
  ];

  const facts = [
    {
      icon: "🌳",
      number: "10K+",
      title: "Trees Planted"
    },
    {
      icon: "🤝",
      number: "500+",
      title: "Volunteers"
    },    {
      icon: "🌱",
      number: "100+",
      title: "Green Campaigns"
    },
    {
      icon: "🌍",
      number: "50+",
      title: "Clean Areas"
    }
  ];

  const ecoTips = [
    "Use reusable bags and avoid single-use plastic.",
    "Save electricity by turning off unused lights.",
    "Plant more trees and protect green spaces.",
    "Save water and avoid unnecessary wastage.",
    "Recycle waste whenever possible."
  ];

  const gallery = [
    {
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
      title: "Green Forest"
    },
    {
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
      title: "Beautiful Nature"
    },    {
      image: "https://images.unsplash.com/photo-1473445361085-b9a07f55608b?w=800",
      title: "Fresh Environment"
    }
  ];

  const timeline = [
    {
      year: "01",
      title: "Awareness",
      text: "Spreading knowledge about protecting nature and saving resources."
    },
    {
      year: "02",
      title: "Action",
      text: "Encouraging people to plant trees and adopt eco-friendly habits."
    },
    {
      year: "03",
      title: "Change",
      text: "Building a cleaner and greener future together."
    }
  ];

  const faqs = [
    {
      question: "Why are trees important?",
      answer: "Trees provide oxygen, support wildlife and help maintain balance in the environment."
    },    {
      question: "How can we save water?",
      answer:
        "We can save water by avoiding wastage, fixing leaks and using water responsibly."
    },
    {
      question: "How can we reduce pollution?",
      answer:
        "Using less plastic, recycling waste and keeping surroundings clean helps reduce pollution."
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 px-6 py-28">

      <div className="max-w-6xl mx-auto">

        <Link to="/">
          <button className="mb-8 flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg hover:bg-green-700 transition-all">
            <ArrowLeft size={20}/>
            Back to Home
          </button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >

          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">

            <Leaf size={18} />

            About Green Earth

          </div>          <h1 className="mt-8 text-5xl md:text-6xl font-extrabold text-gray-900">

            Together We Can Make
            <span className="text-green-600"> Earth Greener</span>

          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 leading-8">

            Green Earth is an awareness project created to inspire people
            to protect nature, save resources and take responsible steps
            towards a cleaner and healthier planet.

          </p>

        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {sections.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition-all"
              >

                <Icon
                  size={42}
                  className="text-green-600"
                />

                <h2 className="mt-6 text-2xl font-bold text-gray-900">
                  {item.title}
                </h2>

                <p className="mt-4 text-gray-600 leading-7">
                  {item.text}
                </p>

              </motion.div>

            );

          })}

        </div>        <div className="mt-20 text-center">

          <h2 className="text-4xl font-extrabold text-gray-900">
            Our Environmental Impact
          </h2>

          <p className="mt-4 text-gray-600">
            Together we are making a greener future.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">

            {facts.map((item, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-lg p-6 text-center"
              >

                <div className="text-4xl">
                  {item.icon}
                </div>

                <h3 className="mt-4 text-3xl font-extrabold text-green-600">
                  {item.number}
                </h3>

                <p className="mt-2 text-gray-600">
                  {item.title}
                </p>

              </motion.div>

            ))}

          </div>

        </div>        <div className="mt-20">

          <h2 className="text-4xl font-extrabold text-center text-gray-900">
            Daily Eco Tips
          </h2>

          <p className="mt-4 text-center text-gray-600">
            Small habits can create a big positive impact on our planet.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-6">

            {ecoTips.map((tip, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 bg-green-50 rounded-2xl p-6"
              >

                <div className="text-3xl">
                  🌱
                </div>

                <p className="text-gray-700 font-medium">
                  {tip}
                </p>

              </motion.div>

            ))}

          </div>

        </div>        <div className="mt-20">

          <h2 className="text-4xl font-extrabold text-center text-gray-900">
            Nature Gallery
          </h2>

          <p className="mt-4 text-center text-gray-600">
            Beautiful nature reminds us why we should protect our planet.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">

            {gallery.map((item, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-3xl shadow-xl bg-white"
              >

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover hover:scale-110 transition duration-500"
                />

                <h3 className="p-5 text-xl font-bold text-gray-900">
                  {item.title}
                </h3>

              </motion.div>

            ))}

          </div>

        </div>        <div className="mt-20">

          <h2 className="text-4xl font-extrabold text-center text-gray-900">
            Our Mission Journey
          </h2>

          <p className="mt-4 text-center text-gray-600">
            Every step brings us closer to a greener Earth.
          </p>

          <div className="mt-12 space-y-6 max-w-4xl mx-auto">

            {timeline.map((item, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-lg p-8 flex gap-6 items-start"
              >

                <div className="text-3xl font-extrabold text-green-600">
                  {item.year}
                </div>

                <div>

                  <h3 className="text-2xl font-bold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-gray-600 leading-7">
                    {item.text}
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </div>        <div className="mt-20">

          <h2 className="text-4xl font-extrabold text-center text-gray-900">
            Frequently Asked Questions
          </h2>

          <div className="mt-12 max-w-4xl mx-auto space-y-6">

            {faqs.map((item, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-lg p-7"
              >

                <h3 className="text-xl font-bold text-green-700">
                  {item.question}
                </h3>

                <p className="mt-3 text-gray-600 leading-7">
                  {item.answer}
                </p>

              </motion.div>

            ))}

          </div>

        </div>        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-green-600 text-white rounded-3xl p-10 text-center"
        >

          <h2 className="text-3xl md:text-4xl font-bold">
            "The Earth is our home. Protecting it is our responsibility."
          </h2>

          <p className="mt-4 text-green-100">
            Small actions today can create a greener tomorrow.
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-green-600 text-white rounded-3xl p-10 text-center"
        >

          <h2 className="text-3xl font-bold">
            Small Actions Create Big Changes
          </h2>

          <p className="mt-4 text-green-50 max-w-3xl mx-auto">
            Every positive action towards nature matters.
            Protecting Earth starts with awareness and responsibility.
          </p>

        </motion.div>        <div className="mt-16 flex justify-center">

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all"
          >

            <ArrowUp size={20} />

            Back to Top

          </button>

        </div>

      </div>

    </section>
  );

}
