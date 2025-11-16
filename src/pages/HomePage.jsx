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

      {/* Search & Create */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl gap-4 mt-10 md:flex-row">
        <div className="flex items-center bg-neutral-900/90 border border-neutral-800 rounded-xl px-4 py-3 w-full md:w-[70%] shadow-lg
                        transition-colors duration-300 hover:border-violet-500 hover:shadow-[0_0_25px_rgba(129,140,248,0.5)]">
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full text-white placeholder-gray-400 bg-transparent focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button
          className="px-6 py-3 font-semibold text-white rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 shadow-lg
                     hover:shadow-[0_0_25px_rgba(129,140,248,0.9)] hover:scale-105 active:scale-95 transition-all duration-200"
          onClick={() => navigate("/task")}
        >
          Create New Task
        </button>
      </div>

      {/* Data Table */}
      <div className="relative z-10 w-full max-w-4xl mt-12">
        <div className="overflow-x-auto bg-neutral-900/90 border border-neutral-800 backdrop-blur-md shadow-2xl rounded-2xl
                        transition-shadow duration-300 hover:shadow-[0_0_45px_rgba(59,130,246,0.7)]">

          <table className="w-full min-w-[800px] text-center text-white">
            <thead>
              <tr className="text-sm tracking-wide uppercase bg-neutral-800/90">
                <th className="p-4 border-b border-neutral-700">Title</th>
                <th className="p-4 border-b border-neutral-700">Description</th>
                <th className="p-4 border-b border-neutral-700">Status</th>
                <th className="p-4 border-b border-neutral-700">Due Date</th>
                <th className="p-4 border-b border-neutral-700">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTasks.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-10 text-lg font-medium text-gray-400">
                    No tasks found. Try updating your search criteria.
                  </td>
                </tr>
              )}

              {filteredTasks.map((data, idx) => (
                <tr key={idx} className="transition-all duration-200 hover:bg-neutral-800/80">
                  <td className="p-4 border-b border-neutral-800">{data.Title}</td>
                  <td className="p-4 border-b border-neutral-800">{data.Description}</td>

                  <td className="p-4 border-b border-neutral-800">
                    <span
                      className={`px-3 py-1 rounded-xl text-sm font-medium
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

                  {/* Due Date Column */}
                  <td className="p-4 font-semibold text-blue-300 border-b border-neutral-800">
                    {data.DueDate
                      ? new Date(data.DueDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </td>

                  <td className="flex justify-center p-4 space-x-3 border-b border-neutral-800">
                    <button
                      className="px-4 py-2 bg-blue-600 rounded-lg shadow-sm
                                 md:hover:bg-blue-500 md:hover:shadow-[0_0_18px_rgba(59,130,246,0.8)]
                                 active:scale-95 transition-all duration-200"
                      onClick={() => handleEdit(idx, navigate)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 rounded-lg shadow-sm
                                 md:hover:bg-red-500 md:hover:shadow-[0_0_18px_rgba(248,113,113,0.8)]
                                 active:scale-95 transition-all duration-200"
                      onClick={() => handleDelete(idx)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
