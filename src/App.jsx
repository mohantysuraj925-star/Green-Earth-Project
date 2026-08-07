import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";
import LoadingScreen from "./components/LoadingScreen";
import PageTransition from "./components/PageTransition";
import ScrollProgress from "./components/ScrollProgress";
import AnnouncementBar from "./components/AnnouncementBar";
import Newsletter from "./components/Newsletter";
import VisitorCounter from "./components/VisitorCounter";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import LearnMore from "./pages/LearnMore";
import Advance from "./pages/Advance";
import Campaigns from "./pages/Campaigns";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import Resources from "./pages/Resources";
import FAQ from "./pages/FAQ";
import Donate from "./pages/Donate";
import Community from "./pages/Community";
import EcoHub from "./pages/EcoHub";
import CarbonTracker from "./pages/CarbonTracker";
import ReportIssue from "./pages/ReportIssue";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollProgress />
      <VisitorCounter />

      <div className="bg-white dark:bg-slate-950 overflow-x-hidden min-h-screen flex flex-col">
        <AnnouncementBar />
        <Navbar />

        <main className="flex-1">
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/ecohub" element={<EcoHub />} />
              <Route path="/learn-more" element={<LearnMore />} />
              <Route path="/advance" element={<Advance />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/community" element={<Community />} />
              <Route path="/carbon-tracker" element={<CarbonTracker />} />
              <Route path="/report-issue" element={<ReportIssue />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>

          <Newsletter />
        </main>

        <Footer />
        <BackToTop />
      </div>
    </BrowserRouter>
  );
}

export default App;