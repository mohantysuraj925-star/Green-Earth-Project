import { motion } from "framer-motion";

const faqs = [
  {
    question: "Why is planting trees important?",
    answer: "Trees improve air quality, absorb carbon dioxide, protect biodiversity and help fight climate change."
  },
  {
    question: "How can I join Green Earth?",
    answer: "You can participate in campaigns, volunteer, spread awareness and support environmental activities."
  },
  {
    question: "Can students participate?",
    answer: "Yes. Students, teachers and organizations are all welcome to join our mission."
  },
  {
    question: "Is Green Earth a non-profit initiative?",
    answer: "Our mission focuses on environmental awareness, sustainability and community participation."
  }
];

export default function FAQ() {
  return (
    <section className="bg-green-50 min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="text-center">
          <span className="inline-block bg-white text-green-700 px-5 py-2 rounded-full font-semibold shadow">
            Frequently Asked Questions
          </span>

          <h1 className="mt-6 text-5xl font-extrabold text-gray-900">
            Have Questions?
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Find answers to the most common questions about Green Earth.
          </p>
        </div>

        <div className="mt-16 space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -3 }}
              className="bg-white rounded-3xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-green-700">
                {faq.question}
              </h2>

              <p className="mt-4 text-gray-600 leading-7">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
