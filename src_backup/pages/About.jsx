import { motion } from "framer-motion";
import {
  FaLeaf,
  FaSeedling,
  FaGlobeAsia,
  FaHandsHelping
} from "react-icons/fa";


const features = [
  {
    icon: <FaLeaf />,
    title: "Save Nature",
    description:
      "Protect forests and inspire people to create a cleaner and healthier planet."
  },
  {
    icon: <FaSeedling />,
    title: "Plant More Trees",
    description:
      "Every tree improves air quality and supports a sustainable future."
  },
  {
    icon: <FaGlobeAsia />,
    title: "Green Earth",
    description:
      "Together we can build a greener world for future generations."
  }
];


export default function About() {

  return (

    <section
      id="about"
      className="bg-white pt-28 pb-32 px-6"
    >

      <div className="max-w-7xl mx-auto">


        <div className="grid lg:grid-cols-2 gap-16 items-center">


          <motion.div

            initial={{
              opacity:0,
              x:-60
            }}

            whileInView={{
              opacity:1,
              x:0
            }}

            viewport={{
              once:true
            }}

            transition={{
              duration:0.8
            }}

            className="relative"

          >

            <div className="absolute -inset-4 bg-green-100 rounded-[40px] blur-xl opacity-50"></div>


            <img

              src="https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?w=900"

              alt="Plant Trees"

              className="relative rounded-[40px] shadow-2xl w-full"

            />


            <div className="absolute bottom-5 left-5 bg-white rounded-2xl shadow-xl px-6 py-4">

              <h3 className="text-3xl font-bold text-green-700">
                10K+
              </h3>

              <p className="text-gray-600">
                Trees Planted
              </p>

            </div>


          </motion.div>





          <motion.div

            initial={{
              opacity:0,
              x:60
            }}

            whileInView={{
              opacity:1,
              x:0
            }}

            viewport={{
              once:true
            }}

            transition={{
              duration:0.8
            }}

          >


            <span className="inline-block bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">

              About Our Mission

            </span>


            <h2 className="mt-6 text-5xl font-extrabold text-gray-900 leading-tight">

              Together We Can Save Our Planet

            </h2>


            <p className="mt-6 text-lg text-gray-600 leading-8">

              Our mission is to encourage everyone to plant trees,
              save water and protect nature. Small actions from millions
              of people can create a huge positive impact on Earth.

            </p>            <div className="grid grid-cols-2 gap-6 mt-10">


              <motion.div

                whileHover={{
                  y:-8
                }}

                className="bg-green-50 rounded-3xl p-6 shadow-md"

              >

                <h3 className="text-4xl font-extrabold text-green-700">
                  10K+
                </h3>

                <p className="mt-2 text-gray-600">
                  Trees Planted
                </p>

              </motion.div>



              <motion.div

                whileHover={{
                  y:-8
                }}

                className="bg-green-50 rounded-3xl p-6 shadow-md"

              >

                <h3 className="text-4xl font-extrabold text-green-700">
                  500+
                </h3>

                <p className="mt-2 text-gray-600">
                  Volunteers
                </p>

              </motion.div>


            </div>


          </motion.div>


        </div>




        <div className="grid md:grid-cols-3 gap-8 mt-20">


          {features.map((item,index)=>(

            <motion.div

              key={index}

              initial={{
                opacity:0,
                y:40
              }}

              whileInView={{
                opacity:1,
                y:0
              }}

              viewport={{
                once:true
              }}

              transition={{
                delay:index*0.15
              }}

              whileHover={{
                y:-10
              }}

              className="bg-green-50 rounded-3xl p-8 shadow-lg text-center"

            >


              <div className="flex justify-center">

                <div className="bg-white p-5 rounded-full shadow-md">

                  <span className="text-5xl text-green-600">

                    {item.icon}

                  </span>

                </div>

              </div>



              <h3 className="mt-6 text-2xl font-bold text-gray-900">

                {item.title}

              </h3>



              <p className="mt-4 text-gray-600 leading-7">

                {item.description}

              </p>


            </motion.div>


          ))}


        </div>





        <motion.div

          initial={{
            opacity:0,
            y:40
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          viewport={{
            once:true
          }}

          className="mt-20 bg-green-600 rounded-[35px] p-12 text-center text-white shadow-xl"

        >


          <FaHandsHelping className="mx-auto text-5xl mb-5"/>



          <h3 className="text-3xl md:text-4xl font-bold">

            Every Small Step Counts 🌿

          </h3>



          <p className="mt-5 text-lg text-green-100 max-w-3xl mx-auto">

            Together we can make our Earth greener, healthier and
            more beautiful for everyone.

          </p>



        </motion.div>



      </div>


    </section>

  );

}
