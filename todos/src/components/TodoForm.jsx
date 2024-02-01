import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const TodoForm = ({ fetchData }) => {
  const [newTodo, setNewTodo] = useState({
    body: "",
  });

  const handleChange = (e) => {
    setNewTodo((prev) => ({
      ...prev,
      body: e.target.value,
    }));
    console.log(newTodo);
  };

  const postTodo = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/todo/", newTodo);
      setNewTodo({ body: "" });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="input task here"
        className="input input-bordered w-full max-w-xs"
        onChange={handleChange}
        value={newTodo.body}
        onKeyDown={(e) => {
          if (e.key === "Enter") postTodo();
        }}
      />
      <button className="btn btn-primary  ml-2" onClick={postTodo}>
        Add new task
      </button>
    </div>
  );
};

export default TodoForm;
