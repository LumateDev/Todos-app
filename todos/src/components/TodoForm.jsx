import React from "react";

const TodoForm = () => {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="input task here"
        className="input input-bordered w-full max-w-xs"
      />
      <button className="btn btn-primary  ml-2">Add new task</button>
    </div>
  );
};

export default TodoForm;
