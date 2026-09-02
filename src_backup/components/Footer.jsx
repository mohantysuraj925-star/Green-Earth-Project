import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaLeaf
} from "react-icons/fa";

import { Link } from "react-scroll";


export default function Footer() {


  const links = [
    {
      id:"home",
      name:"Home"
    },
    {
      id:"about",
      name:"About"
    },
    {
      id:"services",
      name:"Mission"
    },
    {
      id:"contact",
      name:"Contact"
    }
  ];



  return (

    <footer className="bg-slate-950 text-white pt-16 pb-8">


      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">



        <div>


          <Link
            to="home"
            smooth={true}
            duration={700}
            offset={-90}
            className="cursor-pointer"
          >


            <div className="flex items-center gap-3">


              <div className="bg-green-600 p-3 rounded-full">

                <FaLeaf className="text-white text-2xl"/>

              </div>



              <h2 className="text-3xl font-bold text-green-400">

                Green Earth

              </h2>


            </div>


          </Link>




          <p className="mt-5 text-gray-400 leading-8">

            Plant Trees Today, Save Tomorrow.
            Together we can create a cleaner,
            greener and healthier Earth.

          </p>


        </div>




        <div>


          <h3 className="text-xl font-bold mb-5">

            Quick Links

          </h3>



          <ul className="space-y-3">


            {links.map((item)=>(

              <li key={item.id}>


                <Link

                  to={item.id}

                  smooth={true}

                  duration={700}

                  offset={-90}

                  className="text-gray-400 hover:text-green-400 cursor-pointer transition"

                >

                  {item.name}

                </Link>


              </li>

            ))}


          </ul>


        </div>        <div>


          <h3 className="text-xl font-bold mb-5">

            Contact

          </h3>



          <div className="space-y-4 text-gray-400">


            <p>
              📧 mohantysuraj91@gmail.com
            </p>


            <p>
              📱 99999999
            </p>


            <p>
              📍 Odisha, India
            </p>


          </div>


        </div>




        <div>


          <h3 className="text-xl font-bold mb-5">

            Follow Us

          </h3>




          <div className="flex gap-4">


            <a
              href="#"
              className="bg-slate-800 p-3 rounded-full text-xl hover:text-green-400 hover:-translate-y-1 transition"
            >

              <FaFacebook/>

            </a>



            <a
              href="#"
              className="bg-slate-800 p-3 rounded-full text-xl hover:text-green-400 hover:-translate-y-1 transition"
            >

              <FaInstagram/>

            </a>



            <a
              href="#"
              className="bg-slate-800 p-3 rounded-full text-xl hover:text-green-400 hover:-translate-y-1 transition"
            >

              <FaLinkedin/>

            </a>




            <a
              href="https://github.com/mohantysuraj925-star"
              target="_blank"
              rel="noreferrer"
              className="bg-slate-800 p-3 rounded-full text-xl hover:text-green-400 hover:-translate-y-1 transition"
            >

              <FaGithub/>

            </a>


          </div>


        </div>



      </div>




      <div className="border-t border-slate-800 mt-12 pt-6 text-center text-gray-500">


        © 2026 Green Earth | Plant Trees Today, Save Tomorrow.


      </div>



    </footer>

  );

}
