import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {

  const [visible, setVisible] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  const scrollToTop = () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };

  return (

    <button

      onClick={scrollToTop}

      className={`fixed bottom-8 right-8 z-50 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:bg-green-700 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}

    >

      <ArrowUp size={24} />

    </button>

  );

}
