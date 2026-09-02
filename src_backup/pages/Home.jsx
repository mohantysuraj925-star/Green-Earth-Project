import { motion } from "framer-motion";
import { Link } from "react-scroll";
import {
  Leaf,
  Trees,
  Droplets,
  Earth,
  ArrowDown
} from "lucide-react";

export default function Home() {

  const stats = [
    {
      number: "10K+",
      label: "Trees Planted"
    },
    {
      number: "500+",
      label: "Volunteers"
    },
    {
      number: "100+",
      label: "Campaigns"
    }
  ];


  return (

    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 pt-28 pb-28 px-6"
    >


      <div className="absolute top-0 left-0 w-80 h-80 bg-green-200 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300 rounded-full blur-3xl opacity-20"></div>



      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">



        <motion.div

          initial={{
            opacity:0,
            x:-60
          }}

          animate={{
            opacity:1,
            x:0
          }}

          transition={{
            duration:0.8
          }}

        >



          <motion.div

            initial={{
              opacity:0,
              y:-20
            }}

            animate={{
              opacity:1,
              y:0
            }}

            transition={{
              delay:0.2
            }}

            className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold"

          >

            <Leaf size={18}/>

            Save Nature • Save Future

          </motion.div>




          <h1 className="mt-7 text-5xl md:text-7xl font-extrabold leading-tight text-gray-900">

            Plant Trees

            <br/>

            <span className="text-green-600">

              Save Tomorrow

            </span>

          </h1>




          <p className="mt-7 text-lg leading-8 text-gray-600 max-w-xl">

            Nature gives us life. Every tree we plant, every drop of water
            we save and every small action we take helps create a cleaner,
            greener and healthier Earth.

          </p>




          <div className="mt-10 flex flex-wrap gap-4">


            <Link
              to="services"
              smooth={true}
              duration={700}
              offset={-90}
            >

              <button className="px-8 py-4 rounded-full bg-green-600 text-white font-semibold shadow-xl hover:bg-green-700 hover:scale-105 transition-all">

                Explore Mission

              </button>


            </Link>



            <Link
              to="about"
              smooth={true}
              duration={700}
              offset={-90}
            >

              <button className="px-8 py-4 rounded-full border-2 border-green-600 text-green-700 font-semibold hover:bg-green-600 hover:text-white transition-all">

                Learn More

              </button>


            </Link>


          </div>      <div className="grid grid-cols-3 gap-6 mt-14">

        {stats.map((item,index)=>(

          <motion.div
            key={index}
            whileHover={{ y:-5 }}
            className="bg-white/70 backdrop-blur rounded-2xl p-4 shadow-md"
          >

            <h2 className="text-3xl md:text-4xl font-extrabold text-green-700">
              {item.number}
            </h2>

            <p className="mt-2 text-sm md:text-base text-gray-600">
              {item.label}
            </p>

          </motion.div>

        ))}

      </div>


    </motion.div>




    <motion.div

      initial={{
        opacity:0,
        x:60
      }}

      animate={{
        opacity:1,
        x:0
      }}

      transition={{
        duration:1
      }}

      className="relative flex justify-center"

    >


      <motion.img

        whileHover={{
          scale:1.03
        }}

        transition={{
          duration:0.3
        }}

        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900"

        alt="Green Forest"

        className="rounded-[40px] shadow-2xl w-full max-w-lg object-cover"

      />



      <motion.div

        animate={{
          y:[0,-10,0]
        }}

        transition={{
          duration:3,
          repeat:Infinity
        }}

        className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3"

      >

        <Trees className="text-green-600" size={32}/>

        <div>

          <h3 className="font-bold text-lg">
            10,000+
          </h3>

          <p className="text-sm text-gray-500">
            Trees Planted
          </p>

        </div>

      </motion.div>




      <motion.div

        animate={{
          y:[0,10,0]
        }}

        transition={{
          duration:3,
          repeat:Infinity
        }}

        className="absolute top-1/2 -right-6 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3"

      >

        <Droplets className="text-blue-500" size={32}/>

        <div>

          <h3 className="font-bold text-lg">
            Save Water
          </h3>

          <p className="text-sm text-gray-500">
            Every Drop Counts
          </p>

        </div>

      </motion.div>




      <motion.div

        animate={{
          y:[0,-8,0]
        }}

        transition={{
          duration:3,
          repeat:Infinity
        }}

        className="absolute -bottom-6 left-12 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3"

      >

        <Earth className="text-green-700" size={32}/>

        <div>

          <h3 className="font-bold text-lg">
            Green Earth
          </h3>

          <p className="text-sm text-gray-500">
            Clean Future
          </p>

        </div>

      </motion.div>



    </motion.div>


  </div>




  <div className="mt-20 flex justify-center">


    <Link
      to="about"
      smooth={true}
      duration={700}
      offset={-90}
    >

      <button className="animate-bounce flex flex-col items-center text-green-700 hover:text-green-900 transition">

        <span className="text-sm font-semibold mb-2">
          Scroll Down
        </span>

        <ArrowDown size={28}/>

      </button>


    </Link>


  </div>



</section>

  );

}
