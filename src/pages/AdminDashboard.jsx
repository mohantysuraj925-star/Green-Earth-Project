import { useState, useEffect } from "react";
import { Users, UserCheck, ShieldCheck, RefreshCw, Search } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total_users: 0, total_volunteers: 0, users_list: [] });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin-stats/");
      const data = await response.json();
      if (response.ok) {
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to load admin stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const filteredUsers = stats.users_list ? stats.users_list.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-100 p-4 sm:p-8 pt-24">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold flex items-center gap-2 text-gray-900 dark:text-white">
              <ShieldCheck className="text-green-600 dark:text-green-400" size={28} /> Admin Control Panel
            </h1>
            <p className="text-xs text-gray-500 mt-1">Manage active users, volunteers, and system statistics</p>
          </div>

          <button
            onClick={fetchAdminData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-md transition self-start sm:self-auto cursor-pointer"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh Data
          </button>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-950/80 rounded-2xl text-blue-600 dark:text-blue-400">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Total Registered Users</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">{stats.total_users}</h3>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-950/80 rounded-2xl text-green-600 dark:text-green-400">
              <UserCheck size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Active Volunteers</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">{stats.total_volunteers}</h3>
            </div>
          </div>
        </div>

        {/* SEARCH & USER TABLE */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-2 border-b border-gray-100 dark:border-slate-700">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Registered Accounts Details</h2>
            
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={15} />
              <input
                type="text"
                placeholder="Search name, email, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none dark:text-white"
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-slate-900/60 text-gray-500 dark:text-gray-400 font-bold uppercase border-b border-gray-200 dark:border-slate-700">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700/50">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-500">Loading user accounts...</td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-500">No user records found.</td>
                  </tr>
                ) : (
                  filteredUsers.map((user, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition">
                      <td className="p-3 font-bold text-gray-900 dark:text-white">{user.name || "N/A"}</td>
                      <td className="p-3 text-gray-600 dark:text-gray-300">{user.email}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          user.role === "volunteer"
                            ? "bg-green-100 text-green-800 dark:bg-green-950/80 dark:text-green-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300"
                        }`}>
                          {user.role || "User"}
                        </span>
                      </td>
                      <td className="p-3 text-green-600 dark:text-green-400 font-bold">● Active</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}