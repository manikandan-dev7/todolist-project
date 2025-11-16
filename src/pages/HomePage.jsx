import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = ({ TaskTableData, handleEdit, handleDelete }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = TaskTableData.filter((task) =>
    task.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-start px-4 py-10 animated-bg">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500 drop-shadow-xl">
        Task Management Dashboard
      </h1>

      {/* Search + Create */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl gap-4 mt-10 md:flex-row">
        {/* Search */}
        <div className="flex items-center w-full px-4 py-3 bg-neutral-900/90 border border-neutral-800 rounded-xl shadow-lg transition-colors duration-300 hover:border-violet-500 hover:shadow-[0_0_25px_rgba(129,140,248,0.5)] md:w-[70%]">
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full text-white placeholder-gray-400 bg-transparent focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Create button */}
        <button
          className="px-6 py-3 font-semibold text-white rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 shadow-lg
                     hover:shadow-[0_0_25px_rgba(129,140,248,0.9)] hover:scale-105
                     active:scale-95 transition-all duration-200"
          onClick={() => navigate("/task")}
        >
          Create New Task
        </button>
      </div>

      {/* Table */}
      <div className="relative z-10 w-full max-w-5xl mt-12">
        <div className="bg-neutral-900/90 border border-neutral-800 backdrop-blur-md shadow-2xl rounded-2xl transition-shadow duration-300 hover:shadow-[0_0_45px_rgba(59,130,246,0.7)] overflow-hidden">
          {/* Scrollable wrapper for mobile (x-axis) */}
          <div className="w-full overflow-x-auto scrollbar-hide">
            <table className="w-full min-w-[720px] text-center text-white border-collapse table-auto">
              <thead>
                <tr className="text-sm tracking-wide uppercase bg-neutral-800/90">
                  <th className="p-3 border border-neutral-700">Title</th>
                  <th className="p-3 border border-neutral-700">Description</th>
                  <th className="p-3 border border-neutral-700">Due Date</th>
                  <th className="p-3 border border-neutral-700">Priority</th>
                  <th className="p-3 border border-neutral-700">Status</th>
                  <th className="p-3 border border-neutral-700">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredTasks.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-10 text-lg font-medium text-gray-400 border border-neutral-800"
                    >
                      No tasks found. Try adjusting your search.
                    </td>
                  </tr>
                )}

                {filteredTasks.map((data, idx) => (
                  <tr
                    key={idx}
                    className="transition-colors duration-200 hover:bg-neutral-800/80"
                  >
                    <td className="p-4 border border-neutral-800 align-top break-words max-w-[180px]">
                      {data.Title}
                    </td>

                    <td className="p-4 border border-neutral-800 align-top break-words max-w-[260px]">
                      {data.Description}
                    </td>

                    <td className="p-4 align-top border border-neutral-800">
                      <span className="inline-block px-3 py-1 text-sm font-medium text-blue-300 rounded-full bg-blue-600/30 whitespace-nowrap">
                        {data.DueDate}
                      </span>
                    </td>

                    <td className="p-4 align-top border border-neutral-800">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap
                          ${
                            data.Priority === "Immediate"
                              ? "bg-red-600/40 text-red-300"
                              : data.Priority === "High"
                              ? "bg-orange-600/40 text-orange-300"
                              : data.Priority === "Medium"
                              ? "bg-yellow-600/40 text-yellow-300"
                              : "bg-green-600/40 text-green-300"
                          }`}
                      >
                        {data.Priority}
                      </span>
                    </td>

                    <td className="p-4 align-top border border-neutral-800">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap
                          ${
                            data.Status === "Pending"
                              ? "bg-yellow-600/40 text-yellow-300"
                              : data.Status === "OnProcess"
                              ? "bg-blue-600/30 text-blue-300"
                              : "bg-green-600/30 text-green-300"
                          }`}
                      >
                        {data.Status}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="p-4 align-top border border-neutral-800">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          className="px-4 py-2 bg-blue-600 rounded-lg shadow-sm hover:bg-blue-500 hover:shadow-[0_0_18px_rgba(59,130,246,0.8)] active:scale-95 transition-all duration-200"
                          onClick={() => handleEdit(idx, navigate)}
                        >
                          Edit
                        </button>

                        <button
                          className="px-4 py-2 bg-red-600 rounded-lg shadow-sm hover:bg-red-500 hover:shadow-[0_0_18px_rgba(248,113,113,0.8)] active:scale-95 transition-all duration-200"
                          onClick={() => handleDelete(idx)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
