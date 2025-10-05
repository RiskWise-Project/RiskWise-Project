import React from "react";
import { db } from "../../../utils/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

export default function UserRow({
  user,
  editingUser,
  setEditingUser,
  handleArchiveUser,
  fetchUsers,
}) {
  const isEditing = editingUser?.id === user.id;

  // Save changes function
  const handleSave = async () => {
    if (!editingUser) return;
    try {
      await updateDoc(doc(db, "users", editingUser.id), {
        ...editingUser,
        updatedAt: serverTimestamp(),
      });
      setEditingUser(null);
      fetchUsers(); // refresh list
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  return (
    <tr className="text-sm">
      {/* Profile Image */}
      <td className="border px-2 py-2 text-center">
        {isEditing ? (
          <input
            type="text"
            value={editingUser.profileImageBase64 || ""}
            onChange={(e) =>
              setEditingUser({
                ...editingUser,
                profileImageBase64: e.target.value,
              })
            }
            placeholder="Image URL/Base64"
            className="border p-1 rounded w-full"
          />
        ) : user.profileImageBase64 ? (
          <img
            src={user.profileImageBase64}
            alt="profile"
            className="w-10 h-10 rounded-full mx-auto"
          />
        ) : (
          "No Image"
        )}
      </td>

      {/* Full Name */}
      <td className="border px-2 py-2">
        {isEditing ? (
          <input
            type="text"
            value={editingUser.fullname}
            onChange={(e) =>
              setEditingUser({ ...editingUser, fullname: e.target.value })
            }
            className="border p-1 rounded w-full"
          />
        ) : (
          user.fullname
        )}
      </td>

      {/* Email */}
      <td className="border px-2 py-2">
        {isEditing ? (
          <input
            type="email"
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
            className="border p-1 rounded w-full"
          />
        ) : (
          user.email
        )}
      </td>

      {/* College */}
      <td className="border px-2 py-2">
        {isEditing ? (
          <input
            type="text"
            value={editingUser.college}
            onChange={(e) =>
              setEditingUser({ ...editingUser, college: e.target.value })
            }
            className="border p-1 rounded w-full"
          />
        ) : (
          user.college
        )}
      </td>

      {/* Course */}
      <td className="border px-2 py-2">
        {isEditing ? (
          <input
            type="text"
            value={editingUser.course}
            onChange={(e) =>
              setEditingUser({ ...editingUser, course: e.target.value })
            }
            className="border p-1 rounded w-full"
          />
        ) : (
          user.course
        )}
      </td>

      {/* Section */}
      <td className="border px-2 py-2">
        {isEditing ? (
          <input
            type="text"
            value={editingUser.section}
            onChange={(e) =>
              setEditingUser({ ...editingUser, section: e.target.value })
            }
            className="border p-1 rounded w-full"
          />
        ) : (
          user.section
        )}
      </td>

      {/* Year Level */}
      <td className="border px-2 py-2">
        {isEditing ? (
          <input
            type="text"
            value={editingUser.yearLevel}
            onChange={(e) =>
              setEditingUser({ ...editingUser, yearLevel: e.target.value })
            }
            className="border p-1 rounded w-full"
          />
        ) : (
          user.yearLevel
        )}
      </td>

      {/* Role */}
      <td className="border px-2 py-2">
        {isEditing ? (
          <select
            value={editingUser.role}
            onChange={(e) =>
              setEditingUser({ ...editingUser, role: e.target.value })
            }
            className="border p-1 rounded w-full"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        ) : (
          user.role
        )}
      </td>

      {/* Actions */}
      <td className="border px-2 py-2 flex gap-2 justify-center">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setEditingUser(null)}
              className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditingUser(user)}
              className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleArchiveUser(user.id)}
              className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Archive
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
