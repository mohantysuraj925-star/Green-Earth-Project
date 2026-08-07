import { Mail } from "lucide-react";

export default function Newsletter() {

  return (

    <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-20 px-6">

      <div className="max-w-5xl mx-auto text-center">

        <Mail
          size={60}
          className="mx-auto mb-6"
        />

        <h2 className="text-4xl font-extrabold">
          Stay Updated
        </h2>

        <p className="mt-6 text-lg text-green-100">
          Subscribe to receive the latest environmental news,
          campaigns and Green Earth updates.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">

          <input
            type="email"
            placeholder="Enter your email"
            className="px-6 py-4 rounded-full text-gray-900 w-full md:w-96 outline-none"
          />

          <button
            className="bg-white text-green-700 px-8 py-4 rounded-full font-bold hover:bg-green-100 transition"
          >
            Subscribe
          </button>

        </div>

      </div>

    </section>

  );

}
