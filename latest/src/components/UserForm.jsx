import { useState, useEffect } from 'react';
import { fetchUsers } from '../api/customerApi.js';

const CustomerForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', assignedTo: [] });
  const [availableUsers, setAvailableUsers] = useState([]);

  useEffect(() => {
    const getTeam = async () => {
      try {
        const { data } = await fetchUsers();
        setAvailableUsers(data);
      } catch (err) {
        console.error("Error fetching team:", err);
      }
    };
    getTeam();

    // If initialData exists (Edit Mode), populate form. 
    // Otherwise, reset to empty (Add Mode).
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: '', email: '', company: '', assignedTo: [] });
    }
  }, [initialData]);

  const canSave = availableUsers.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form locally after submission
    setFormData({ name: '', email: '', company: '', assignedTo: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-blue-600">
      <h2 className="text-xl font-bold mb-4">
        {initialData ? '📝 Edit Customer' : '👤 Add New Customer'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
          placeholder="Name" 
          value={formData.name} 
          onChange={e => setFormData({...formData, name: e.target.value})} 
          required 
        />
        <input 
          className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
          placeholder="Email" 
          type="email"
          value={formData.email} 
          onChange={e => setFormData({...formData, email: e.target.value})} 
          required 
        />
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Assign Team Member</label>
          <select 
            className="border p-2 rounded w-full bg-gray-50"
            // Handles cases where assignedTo might be populated objects or just IDs
            value={typeof formData.assignedTo[0] === 'object' ? formData.assignedTo[0]._id : formData.assignedTo[0] || ''} 
            onChange={e => setFormData({...formData, assignedTo: [e.target.value]})}
            required
          >
            <option value="">Select a team member...</option>
            {availableUsers.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
          {!canSave && (
            <p className="text-red-500 text-xs mt-1 animate-pulse">
              ⚠️ You must add a team member first!
            </p>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex items-center gap-3">
        <button 
          type="submit" 
          disabled={!canSave}
          className={`px-6 py-2 rounded font-semibold text-white transition-all ${
            canSave ? 'bg-blue-600 hover:bg-blue-700 shadow-lg' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {initialData ? 'Update Customer' : 'Save Customer'}
        </button>

        {/* onCancel is now correctly used here */}
        {initialData && (
          <button 
            type="button" 
            onClick={onCancel}
            className="px-6 py-2 rounded font-semibold text-gray-600 bg-gray-200 hover:bg-gray-300 transition-all"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
};

export default CustomerForm;