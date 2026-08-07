import { Megaphone } from "lucide-react";
import { Link } from "react-router-dom";

export default function AnnouncementBar() {

  return (

    <div className="bg-green-700 text-white py-2 px-6 text-sm">

      <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-3">

        <Megaphone size={16} />

        <span>
          🌱 Join our Green Earth Mission and help make the planet cleaner.
        </span>

        <Link
          to="/campaigns"
          className="font-bold underline hover:text-green-200"
        >
          View Campaigns
        </Link>

      </div>

    </div>

  );

}
