import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-white overflow-x-hidden">

        <Navbar />

        <main>

          <Home />

          <About />

          <Services />

          <Contact />

        </main>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
