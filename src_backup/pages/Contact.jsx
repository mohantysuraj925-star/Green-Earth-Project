import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Leaf } from "lucide-react";
import { useState } from "react";


export default function Contact() {

  const [message, setMessage] = useState("");


  const handlePledge = () => {

    setMessage(
      "🌿 Thank you for taking the Green Pledge! Together we can save our Earth."
    );

    setTimeout(() => {
      setMessage("");
    }, 4000);

  };


  const details = [
    {
      icon: <Mail size={30}/>,
      title: "Email",
      text: "mohantysuraj91@gmail.com"
    },
    {
      icon: <Phone size={30}/>,
      title: "Phone",
      text: "99999999"
    },
    {
      icon: <MapPin size={30}/>,
      title: "Location",
      text: "Odisha, India"
    }
  ];


  return (

    <section
      id="contact"
      className="bg-white pt-28 pb-39 px-6"
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

          className="text-center mb-16"

        >

          <span className="inline-block bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">

            Contact Us

          </span>


          <h2 className="mt-6 text-5xl font-extrabold text-gray-900">

            Let's Build A Greener Future

          </h2>


          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-8">

            Every small step counts. Join our green mission
            and inspire others to protect nature.

          </p>


        </motion.div>



        <div className="grid lg:grid-cols-2 gap-12">


          <motion.div

            initial={{
              opacity:0,
              x:-40
            }}

            whileInView={{
              opacity:1,
              x:0
            }}

            viewport={{
              once:true
            }}

            transition={{
              duration:0.7
            }}

            className="bg-green-50 rounded-3xl shadow-xl p-8"

          >

            <h3 className="text-3xl font-bold mb-8">

              Contact Information

            </h3>


            <div className="space-y-7">


              {details.map((item,index)=>(

                <div
                  key={index}
                  className="flex items-center gap-5 bg-white p-5 rounded-2xl shadow-sm"
                >

                  <div className="text-green-600">

                    {item.icon}

                  </div>


                  <div>

                    <h4 className="font-bold">

                      {item.title}

                    </h4>


                    <p className="text-gray-600">

                      {item.text}

                    </p>

                  </div>


                </div>

              ))}


            </div>


          </motion.div>          <motion.div

            initial={{
              opacity:0,
              x:40
            }}

            whileInView={{
              opacity:1,
              x:0
            }}

            viewport={{
              once:true
            }}

            transition={{
              duration:0.7
            }}

            className="bg-green-600 rounded-3xl shadow-xl p-10 text-white flex flex-col justify-center"

          >

            <Leaf size={55} />


            <h3 className="text-4xl font-bold mt-6">

              Green Pledge

            </h3>


            <p className="mt-5 text-green-100 leading-8">

              I promise to plant trees, save water,
              reduce pollution and encourage others
              to protect our planet.

            </p>



            <button

              onClick={handlePledge}

              className="mt-10 bg-white text-green-700 px-8 py-4 rounded-full font-bold hover:scale-105 transition"

            >

              Take Green Pledge

            </button>




            {message && (

              <motion.div

                initial={{
                  opacity:0,
                  y:20
                }}

                animate={{
                  opacity:1,
                  y:0
                }}

                className="mt-8 bg-white text-green-700 rounded-2xl p-4 font-semibold"

              >

                {message}

              </motion.div>

            )}


          </motion.div>


        </div>


      </div>


    </section>


  );

}
