import React, { useEffect, useState } from "react";
import { db } from "../../../utils/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

function ApproveModal({ isOpen, onClose }) {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "users"));
      const users = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      const pendings = users.filter((u) => u.verificationStatus === "pending");
      setPendingUsers(pendings);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) loadUsers(); // only load when modal opens
  }, [isOpen]);

  const approveUser = async (id) => {
    await updateDoc(doc(db, "users", id), {
      verificationStatus: "approved",
      updatedAt: serverTimestamp(),
    });
    loadUsers();
  };

  const rejectUser = async (id) => {
    await updateDoc(doc(db, "users", id), {
      verificationStatus: "rejected",
      updatedAt: serverTimestamp(),
    });
    loadUsers();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute bg-white bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-[900px] h-full overflow-y-auto shadow-lg">
        <h1 className="text-xl font-bold mb-4">
          Pending Account Verifications
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : pendingUsers.length === 0 ? (
          <p>No pending users.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Requirement</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingUsers.map((user) => (
                <tr key={user.id} className="border">
                  <td className="p-2 border">{user.fullname}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">
                    {user.verificationDocument ? (
                      <>
                        <span>Document</span>
                        <button
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 ml-2"
                          onClick={() => {
                            const win = window.open("");
                            win.document.write(
                              `<img src="data:image/jpeg;base64,${user.verificationDocument}" style="max-width:100%; height:auto;" />`
                            );
                          }}
                        >
                          View Document
                        </button>
                      </>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="p-2 border flex gap-2 justify-center">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      onClick={() => approveUser(user.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      onClick={() => rejectUser(user.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex justify-end mt-6">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApproveModal;
