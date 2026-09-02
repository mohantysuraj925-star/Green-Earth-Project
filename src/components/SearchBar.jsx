import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchBar() {

  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const routes = {
    home: "/",
    about: "/about",
    services: "/services",
    campaigns: "/campaigns",
    gallery: "/gallery",
    blog: "/blog",
    resources: "/resources",
    faq: "/faq",
    contact: "/contact",
    donate: "/donate",
    learn: "/learn-more",
    "learn more": "/learn-more"
  };

  const handleSearch = () => {

    const key = query.trim().toLowerCase();

    if (routes[key]) {
      navigate(routes[key]);
      setQuery("");
    }

  };

  return (

    <div className="hidden xl:flex items-center bg-gray-100 dark:bg-slate-800 rounded-full px-4 py-2">

      <Search
        size={18}
        className="text-gray-500"
      />

      <input
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
        onKeyDown={(e)=>e.key==="Enter" && handleSearch()}
        placeholder="Search..."
        className="bg-transparent outline-none px-3 w-40 dark:text-white"
      />

    </div>

  );

}
