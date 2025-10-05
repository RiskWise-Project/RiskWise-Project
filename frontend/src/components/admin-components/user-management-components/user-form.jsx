import React from "react";

export default function UserForm({ user, onChange, onSubmit, submitLabel }) {
  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Full Name"
        value={user.fullname}
        onChange={(e) => onChange({ ...user, fullname: e.target.value })}
        className="border p-2 rounded w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => onChange({ ...user, email: e.target.value })}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="College"
        value={user.college}
        onChange={(e) => onChange({ ...user, college: e.target.value })}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Course"
        value={user.course}
        onChange={(e) => onChange({ ...user, course: e.target.value })}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Section"
        value={user.section}
        onChange={(e) => onChange({ ...user, section: e.target.value })}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Year Level"
        value={user.yearLevel}
        onChange={(e) => onChange({ ...user, yearLevel: e.target.value })}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Student Number"
        value={user.studentNumber}
        onChange={(e) => onChange({ ...user, studentNumber: e.target.value })}
        className="border p-2 rounded w-full"
      />
      <select
        value={user.role}
        onChange={(e) => onChange({ ...user, role: e.target.value })}
        className="border p-2 rounded w-full"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <div className="md:col-span-3 flex justify-end">
        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}
