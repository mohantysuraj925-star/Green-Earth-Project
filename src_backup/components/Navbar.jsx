import { Link } from "react-scroll";
import { Menu, X, Leaf } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  const links = [
    { id: "home", name: "Home" },
    { id: "about", name: "About" },
    { id: "services", name: "Mission" },
    { id: "contact", name: "Contact" },
  ];


  return (

    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-green-100 shadow-sm">


      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">


        {/* Logo */}

        <Link
          to="home"
          smooth={true}
          duration={700}
          offset={-90}
          className="cursor-pointer"
        >

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >

            <div className="bg-green-100 p-2 rounded-full">

              <Leaf
                size={30}
                className="text-green-600"
              />

            </div>


            <h1 className="text-2xl font-extrabold text-green-700">
              Green Earth
            </h1>


          </motion.div>

        </Link>



        {/* Desktop Menu */}

        <div className="hidden md:flex items-center gap-8">


          {links.map((item)=>(

            <Link
              key={item.id}
              to={item.id}
              spy={true}
              smooth={true}
              duration={700}
              offset={-90}
              activeClass="text-green-700 font-bold after:w-full"
              className="relative cursor-pointer text-gray-700 font-medium hover:text-green-600 transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-green-600 after:w-0 hover:after:w-full after:transition-all"
            >

              {item.name}

            </Link>

          ))}


        </div>




        {/* Mobile Button */}


        <button
          className="md:hidden text-green-700"
          onClick={()=>setOpen(!open)}
        >

          {open ? <X size={32}/> : <Menu size={32}/>}

        </button>


      </div>




      {/* Mobile Menu */}


      <AnimatePresence>

      {open && (

        <motion.div

          initial={{
            opacity:0,
            height:0
          }}

          animate={{
            opacity:1,
            height:"auto"
          }}

          exit={{
            opacity:0,
            height:0
          }}

          className="md:hidden bg-white shadow-xl overflow-hidden"

        >


          {links.map((item)=>(


            <Link

              key={item.id}

              to={item.id}

              spy={true}

              smooth={true}

              duration={700}

              offset={-90}

              onClick={()=>setOpen(false)}

              className="block px-6 py-4 border-b text-gray-700 hover:bg-green-50 hover:text-green-700 transition cursor-pointer"

            >

              {item.name}

            </Link>


          ))}



        </motion.div>


      )}


      </AnimatePresence>



    </nav>


  );

}
