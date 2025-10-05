import React, { useEffect, useState } from "react";
import { db } from "./../../../utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { Bell, Sun, Moon } from "lucide-react";
import NotificationModal from "../../../components/notification-components/notification-modal/notification-modal";
import { useNotifications } from "../../../context/notification-context";
import { useTheme } from "../../../context/theme-context";
import AddUserModal from "../../../components/admin-components/user-management-components/add-user-modal";
import UserRow from "../../../components/admin-components/user-management-components/user-row";
import { Plus } from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const { unreadCount, setModalOpen } = useNotifications();
  const { darkMode, setDarkMode } = useTheme();
  const [editingUser, setEditingUser] = useState(null);
  const [modalOpen, setModalOpenState] = useState(false);
  const [search, setSearch] = useState("");
  const [newUser, setNewUser] = useState({
    fullname: "",
    email: "",
    role: "user",
    college: "",
    course: "",
    section: "",
    yearLevel: "",
    studentNumber: "",
    authProvider: "email",
    profileImageBase64: "",
  });

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    await addDoc(collection(db, "users"), {
      ...newUser,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    setNewUser({
      fullname: "",
      email: "",
      role: "user",
      college: "",
      course: "",
      section: "",
      yearLevel: "",
      studentNumber: "",
      authProvider: "email",
      profileImageBase64: "",
    });
    fetchUsers();
  };

  const handleUpdateUser = async () => {
    await updateDoc(doc(db, "users", editingUser.id), {
      ...editingUser,
      updatedAt: serverTimestamp(),
    });
    setEditingUser(null);
    fetchUsers();
  };

  const handleArchiveUser = async (id) => {
    await updateDoc(doc(db, "users", id), {
      archived: true,
      updatedAt: serverTimestamp(),
    });
    fetchUsers();
  };

  const filteredUsers = users.filter(
    (u) =>
      !u.archived &&
      (u.fullname.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="dashboard-container flex flex-col w-full h-full bg-[var(--color-white)]">
      {/* Header */}
      <div className="header-container-dashboard flex flex-row items-center justify-between md:p-4 w-full">
        <h1 className="text-2xl text-[var(--color-highlight)] tracking-wider font-black md:text-3xl">
          Admin Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:scale-105 transition"
          >
            {darkMode ? (
              <Sun className="md:w-7 md:h-7 w-7 h-7 text-[var(--color-accent)] font-black" />
            ) : (
              <Moon className="md:w-7 md:h-7 w-7 h-7 text-[var(--color-highlight)] font-black" />
            )}
          </button>

          <div
            className="relative cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            <Bell
              className="md:w-7 md:h-7 w-7 h-7 text-[var(--color-highlight)] font-black"
              strokeWidth={2.5}
            />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center gap-2 justify-between w-full md:px-4 px-2">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-[85%] w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)]"
        />
        <button
          className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-[var(--color-white)] rounded-lg hover:bg-orange-600 transition"
          onClick={() => setModalOpenState(true)}
        >
          <Plus className="w-5 h-5" /> Add New User
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-auto bg-[var(--color-white)] rounded-lg shadow-md">
        <table className="w-full table-auto border-collapse text-[var(--color-dark)]">
          <thead>
            <tr className="bg-[var(--color-highlight)] text-[var(--color-white)]">
              <th className="border px-3 py-2 text-left">Profile Picture</th>
              <th className="border px-3 py-2 text-left">Name</th>
              <th className="border px-3 py-2 text-left">Email</th>
              <th className="border px-3 py-2 text-left">College</th>
              <th className="border px-3 py-2 text-left">Course</th>
              <th className="border px-3 py-2 text-left">Section</th>
              <th className="border px-3 py-2 text-left">Year</th>
              <th className="border px-3 py-2 text-left">Role</th>
              <th className="border px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                editingUser={editingUser}
                setEditingUser={setEditingUser}
                handleUpdateUser={handleUpdateUser}
                handleArchiveUser={handleArchiveUser}
                fetchUsers={fetchUsers}
              />
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      <AddUserModal
        isOpen={modalOpen}
        onClose={() => setModalOpenState(false)}
        newUser={newUser}
        setNewUser={setNewUser}
        handleAddUser={handleAddUser}
      />
      <NotificationModal />
    </div>
  );
}
