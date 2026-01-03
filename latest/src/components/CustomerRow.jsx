const CustomerRow = ({ customer, onDelete, onEdit }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4 font-medium">{customer.name}</td>
      <td className="p-4 text-gray-600">{customer.email}</td>
      <td className="p-4">
        <div className="flex flex-wrap gap-1">
          {(customer.assignedTo || []).map(user => (
            <span key={user?._id} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
              {user?.name || 'Unknown User'}
            </span>
          ))}
        </div>
      </td>
      <td className="p-4 flex gap-4">
        <button 
          onClick={() => onEdit(customer)}
          className="text-blue-500 hover:text-blue-700 font-semibold"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(customer._id)}
          className="text-red-500 hover:text-red-700 font-semibold"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default CustomerRow;