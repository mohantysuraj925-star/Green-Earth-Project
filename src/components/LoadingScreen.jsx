import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear"
        }}
      >
        <Leaf
          size={70}
          className="text-green-600"
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          repeatType: "reverse"
        }}
        className="mt-8 text-3xl font-extrabold text-green-700"
      >
        Green Earth
      </motion.h1>

      <p className="mt-3 text-gray-500">
        Loading Nature...
      </p>

    </div>
  );
}
