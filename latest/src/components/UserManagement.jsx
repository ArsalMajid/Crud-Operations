import { useState, useEffect } from "react";
import { fetchUsers, addUser } from "../api/customerApi.js";

const UserManagement = ({ onUserAdded }) => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    try {
      const { data } = await fetchUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to load users:", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return; // Prevent empty submissions

    setLoading(true);
    try {
      // We call the API directly without storing the response variable since it's unused
      await addUser({ name: name.trim(), email: email.trim() });
      
      setName("");
      setEmail("");
      await loadUsers();

      if (onUserAdded) onUserAdded();
      alert("Team member added successfully!");
    } catch (err) {
      const serverMessage = err.response?.data?.message || "Email must be unique";
      alert(`Failed to add team member: ${serverMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Manage Team</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-gray-50 p-4 rounded-lg">
        <input
          className="border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none"
          placeholder="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`font-bold py-2 px-4 rounded transition-all shadow-md ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {loading ? "Adding..." : "Add Member"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.length > 0 ? (
          users.map((u) => (
            <div key={u._id} className="p-4 bg-white border rounded-lg shadow-sm flex items-center gap-3">
              <div className="h-10 w-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold uppercase">
                {u.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-gray-800 truncate">{u.name}</p>
                <p className="text-xs text-gray-500 truncate">{u.email}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic text-center col-span-full py-4">No team members added yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserManagement;