import { useEffect, useState } from "react";
import {
  fetchCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  fetchUsers,
} from "./api/customerApi.js";
import CustomerForm from "./components/CustomerForm";
import CustomerRow from "./components/CustomerRow";
import UserManagement from "./components/UserManagement";

function App() {
  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [activeTab, setActiveTab] = useState("customers"); // 'customers' or 'team'

  // Load everything on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [customerRes, userRes] = await Promise.all([
        fetchCustomers(),
        fetchUsers(),
      ]);
      setCustomers(customerRes.data);
      setUsers(userRes.data);
    } catch (error) {
      console.error("Failed to load data", error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingCustomer) {
        await updateCustomer(editingCustomer._id, formData);
      } else {
        await addCustomer(formData);
      }
      setEditingCustomer(null);
      loadData(); // Refresh both to ensure relationships are updated
    } catch (error) {
      console.error("Error saving customer:", error);
      alert("Error saving customer. Make sure a team member is assigned.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      await deleteCustomer(id);
      loadData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-4xl font-black text-blue-900 tracking-tight">CRM.io</h1>
          
          {/* Tab Navigation */}
          <div className="flex bg-gray-200 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab("customers")}
              className={`px-4 py-2 rounded-md transition-all ${activeTab === 'customers' ? 'bg-white shadow-sm font-bold' : 'text-gray-600'}`}
            >
              Customers
            </button>
            <button 
              onClick={() => setActiveTab("team")}
              className={`px-4 py-2 rounded-md transition-all ${activeTab === 'team' ? 'bg-white shadow-sm font-bold' : 'text-gray-600'}`}
            >
              Team Members ({users.length})
            </button>
          </div>
        </header>

        {activeTab === "team" ? (
          /* User Management Section */
          <UserManagement onUserAdded={loadData} />
        ) : (
          /* Customer Management Section */
          <>
            <CustomerForm
              onSubmit={handleFormSubmit}
              initialData={editingCustomer}
              onCancel={() => setEditingCustomer(null)}
            />

            <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-blue-900 text-white uppercase text-xs">
                  <tr>
                    <th className="p-4 font-bold">Customer Name</th>
                    <th className="p-4 font-bold">Email Address</th>
                    <th className="p-4 font-bold">Assigned Team</th>
                    <th className="p-4 font-bold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {customers.length > 0 ? (
                    customers.map((c) => (
                      <CustomerRow
                        key={c._id}
                        customer={c}
                        onDelete={handleDelete}
                        onEdit={setEditingCustomer}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-12 text-center text-gray-400 italic">
                        No customers found. Add your first client above!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;