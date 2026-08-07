import { motion } from "framer-motion";
import {
  FaTree,
  FaTint,
  FaRecycle,
  FaGlobeAsia
} from "react-icons/fa";


const missions = [
  {
    icon: <FaTree />,
    title: "Plant Trees",
    description:
      "Plant more trees to create cleaner air and a healthier environment."
  },
  {
    icon: <FaTint />,
    title: "Save Water",
    description:
      "Protect water resources because every single drop matters."
  },
  {
    icon: <FaRecycle />,
    title: "Reduce Pollution",
    description:
      "Recycle waste, reduce plastic and keep our planet clean."
  },
  {
    icon: <FaGlobeAsia />,
    title: "Protect Earth",
    description:
      "Work together to build a sustainable future for everyone."
  }
];


export default function Services() {


  return (

    <section
      id="services"
      className="bg-green-50 pt-28 pb-32 px-6"
    >

      <div className="max-w-7xl mx-auto">



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

          transition={{
            duration:0.7
          }}

          className="text-center"

        >


          <span className="inline-block bg-white text-green-700 px-5 py-2 rounded-full font-semibold shadow-sm">

            Our Mission

          </span>



          <h2 className="mt-6 text-5xl font-extrabold text-gray-900">

            Together We Can Make A Difference

          </h2>



          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-8">

            Small actions create big changes. Join our mission
            to protect nature and make Earth greener.

          </p>


        </motion.div>




        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">          {missions.map((item,index)=>(

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
                y:-10,
                scale:1.03
              }}

              className="bg-white rounded-3xl p-8 shadow-xl text-center"

            >


              <div className="flex justify-center">


                <div className="bg-green-100 p-5 rounded-full">

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

          className="mt-20 bg-white rounded-3xl shadow-xl p-10"

        >


          <div className="flex justify-between items-center mb-4">


            <h3 className="text-xl font-bold text-gray-800">

              Green Mission Progress

            </h3>


            <span className="text-green-700 font-bold text-xl">

              75%

            </span>


          </div>




          <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">


            <motion.div

              initial={{
                width:0
              }}

              whileInView={{
                width:"75%"
              }}

              viewport={{
                once:true
              }}

              transition={{
                duration:1.5
              }}

              className="h-full bg-green-600 rounded-full"

            />


          </div>




          <p className="mt-6 text-center text-gray-600 leading-7">

            Our goal is to inspire millions of people to plant trees,
            save water and protect nature.

          </p>



        </motion.div>



      </div>


    </section>


  );

}
