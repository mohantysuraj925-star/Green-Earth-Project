import { Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function VisitorCounter() {

  const [count, setCount] = useState(0);

  useEffect(() => {

    let visitors = Number(localStorage.getItem("greenEarthVisitors") || 1250);

    visitors += 1;

    localStorage.setItem("greenEarthVisitors", visitors);

    setCount(visitors);

  }, []);

  return (

    <div className="fixed left-6 bottom-6 z-50 bg-white dark:bg-slate-900 shadow-xl rounded-2xl px-5 py-4 flex items-center gap-3">

      <Users className="text-green-600" />

      <div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Visitors
        </p>

        <h3 className="text-xl font-bold text-green-700">
          {count.toLocaleString()}
        </h3>

      </div>

    </div>

  );

}
