import React from "react";
import UserForm from "./user-form";

export default function AddUserModal({
  isOpen,
  onClose,
  newUser,
  setNewUser,
  handleAddUser,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="p-6 rounded-lg shadow-lg w-full max-w-2xl"
        style={{ backgroundColor: "var(--color-white)" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            className="text-xl font-semibold"
            style={{ color: "var(--color-dark)" }}
          >
            Add New User
          </h2>
          <button
            className="font-bold text-2xl"
            style={{ color: "var(--color-accent)" }}
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <UserForm
          user={newUser}
          onChange={setNewUser}
          onSubmit={() => {
            handleAddUser();
            onClose();
          }}
          submitLabel="Add User"
        />
      </div>
    </div>
  );
}
