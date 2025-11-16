import React from "react";
import { useNavigate } from "react-router-dom";

const CreateTask = ({
  TaskData,
  handleTaskDataChange,
  handleCreate,
  EditIndex,
  setTaskData,
  initialTaskData,
  setEditIndex,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-start px-4 py-10 animated-bg">
      {/* Page Title */}
      <h1 className="mb-8 text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500 drop-shadow-xl">
        {EditIndex === null ? "Create New Task" : "Update Task"}
      </h1>

      <form
        className="relative z-10 bg-neutral-900/90 border border-neutral-800 shadow-2xl rounded-2xl p-8 w-full max-w-3xl
                   backdrop-blur-md transition-shadow duration-300
                   hover:shadow-[0_0_40px_rgba(59,130,246,0.7)]"
        onSubmit={(e) => handleCreate(e, navigate)}
      >
        <h2 className="mb-6 text-2xl font-semibold text-white md:text-3xl">
          {EditIndex === null ? "Task Details" : "Edit Task Details"}
        </h2>

        {/* Title */}
        <label className="block mb-1 font-medium text-gray-200 md:text-lg">
          Title
        </label>
        <input
          className="w-full p-3 mb-4 text-white transition-colors duration-200 border rounded-lg bg-neutral-950 border-neutral-700 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
          type="text"
          required
          placeholder="Enter task title"
          value={TaskData.Title}
          onChange={(e) => handleTaskDataChange("Title", e.target.value)}
        />

        {/* Description */}
        <label className="block mb-1 font-medium text-gray-200 md:text-lg">
          Description
        </label>
        <textarea
          className="w-full p-3 mb-4 overflow-y-auto text-white transition-colors duration-200 border rounded-lg resize-y bg-neutral-950 border-neutral-700 min-h-32 max-h-52 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
          required
          placeholder="Enter task description"
          value={TaskData.Description}
          onChange={(e) => handleTaskDataChange("Description", e.target.value)}
        ></textarea>

        {/* Due Date */}
        <label className="block mb-1 font-medium text-gray-200 md:text-lg">
          Due Date
        </label>
        <input
          type="date"
          className="w-full p-3 mb-4 text-white transition-colors duration-200 border rounded-lg bg-neutral-950 border-neutral-700 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
          value={TaskData.DueDate}
          onChange={(e) => handleTaskDataChange("DueDate", e.target.value)}
          required
        />

        {/* Priority */}
        <label className="block mb-1 font-medium text-gray-200 md:text-lg">
          Priority
        </label>
        <select
          className="w-full p-3 mb-6 text-white transition-colors duration-200 border rounded-lg bg-neutral-950 border-neutral-700 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
          value={TaskData.Priority}
          onChange={(e) => handleTaskDataChange("Priority", e.target.value)}
          required
        >
          <option value="" disabled hidden>
            Select Priority
          </option>
          <option value="Immediate">Immediate</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low Priority</option>
        </select>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            className="px-6 py-2 text-gray-200 transition-all duration-200 rounded-lg bg-neutral-800 hover:bg-neutral-700 hover:scale-105 active:scale-95"
            onClick={() => {
              setTaskData(initialTaskData);
              setEditIndex(null);
              navigate("/home");
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold
                       hover:shadow-[0_0_25px_rgba(129,140,248,0.9)] hover:scale-110
                       active:scale-95 transition-all duration-200"
          >
            {EditIndex === null ? "Create Task" : "Update Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
