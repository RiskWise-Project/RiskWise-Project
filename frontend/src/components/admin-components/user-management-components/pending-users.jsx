import { useEffect, useState } from "react";
import { fetchUsers } from "../../../services/admin-services";
import ApproveModal from "./ApproveModal";

function PendingUsers() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const loadUsers = async () => {
    try {
      const allUsers = await fetchUsers();
      const pendings = allUsers.filter(
        (user) => user.verificationStatus === "pending"
      );
      setPendingUsers(pendings);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
    loadUsers(); // refresh list after approval/rejection
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Pending Accounts</h1>

      {pendingUsers.length === 0 ? (
        <p>No pending users right now.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user) => (
              <tr key={user._id} className="border">
                <td className="p-2 border">{user.fullname}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border text-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => handleOpenModal(user)}
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <ApproveModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default PendingUsers;
