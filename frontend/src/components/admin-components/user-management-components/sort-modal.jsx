import React from "react";

const SortModal = ({ isOpen, onClose, sortOptions, setSortOptions }) => {
  if (!isOpen) return null;

  const handleChange = (filter, value) => {
    setSortOptions({ ...sortOptions, [filter]: value });
  };

  const handleCancel = () => {
    // Clear all filters
    setSortOptions({
      date: "",
      month: "",
      category: "",
      severity: "",
      status: "",
    });
    onClose();
  };

  return (
    <div className="absolute bg-opacity-50 shadow-lg flex items-center justify-center z-50 md:right-10 md:top-75 right-6 top-80">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Filter / Sort Reports</h2>

        {/* Date Sorting */}
        <div className="mb-3">
          <label className="block mb-1 font-semibold">Date</label>
          <select
            value={sortOptions.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">None</option>
            <option value="dateDesc">Newest → Oldest</option>
            <option value="dateAsc">Oldest → Newest</option>
          </select>
        </div>

        {/* Month Filter */}
        <div className="mb-3">
          <label className="block mb-1 font-semibold">Month</label>
          <select
            value={sortOptions.month}
            onChange={(e) => handleChange("month", e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">All</option>
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="2">March</option>
            <option value="3">April</option>
            <option value="4">May</option>
            <option value="5">June</option>
            <option value="6">July</option>
            <option value="7">August</option>
            <option value="8">September</option>
            <option value="9">October</option>
            <option value="10">November</option>
            <option value="11">December</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="mb-3">
          <label className="block mb-1 font-semibold">Category</label>
          <select
            value={sortOptions.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">All</option>
            <option value="Operational">Operational</option>
            <option value="Environmental">Environmental</option>
            <option value="Safety">Safety</option>
            <option value="Security">Security</option>
            <option value="Structural">Structural</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Severity Filter */}
        <div className="mb-3">
          <label className="block mb-1 font-semibold">Severity</label>
          <select
            value={sortOptions.severity}
            onChange={(e) => handleChange("severity", e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="mb-3">
          <label className="block mb-1 font-semibold">Status</label>
          <select
            value={sortOptions.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="solved">Solved</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => {
              setSortOptions({
                month: "",
                severity: "",
                category: "",
                status: "",
                date: "",
              });
              onClose();
            }}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={onClose}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortModal;
