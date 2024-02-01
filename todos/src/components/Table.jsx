/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import {
  MdOutlineDeleteOutline,
  MdEditNote,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";

const Table = ({ todos, setTodos, isLoading }) => {
  const [edtiText, setEditText] = useState({
    body: "",
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`);
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id, value) => {
    try {
      const responce = await axios.patch(
        `http://127.0.0.1:8000/api/todo/${id}/`,
        value
      );
      const newTodos = todos.map((todo) =>
        todo.id === id ? responce.data : todo
      );
      setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handeCheckbox = (id, value) => {
    handleEdit(id, {
      completed: !value,
    });
  };

  const handleChange = (e) => {
    setEditText((prev) => ({
      ...prev,
      body: e.target.value,
    }));
    console.log(edtiText);
  };

  const handleClick = () => {
    handleEdit(edtiText.id, edtiText);
    setEditText({
      body: "",
    });
  };

  return (
    <div className="flex justify-center py-12">
      <table className="w-11/12 max-w-4xl">
        <thead className="border-b-2 border-black">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Checkbox
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              To do
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Stutus
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Data created
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5" className="loading">
                Is loading
              </td>
            </tr>
          ) : (
            <>
              {todos.map((todoItem, index) => {
                return (
                  <tr key={todoItem.id} className="border-b border-black">
                    <td className="p-3 text-sm" title={todoItem.id}>
                      <span
                        onClick={() =>
                          handeCheckbox(todoItem.id, todoItem.completed)
                        }
                        className="inline-block cursor-pointer"
                      >
                        {todoItem.completed ? (
                          <MdOutlineCheckBox />
                        ) : (
                          <MdOutlineCheckBoxOutlineBlank />
                        )}
                      </span>
                    </td>
                    <td className="p-3 text-sm">{todoItem.body}</td>
                    <td className="p-3 text-sm">
                      <span
                        className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${
                          todoItem.completed ? "bg-green-300" : "bg-red-300"
                        } `}
                      >
                        {todoItem.completed ? "Done" : "In progress"}
                      </span>
                    </td>
                    <td className="p-3 text-sm">
                      {new Date(todoItem.created).toLocaleString()}
                    </td>
                    <td className="p-3 text-sm font-medium grid grid-flow-col items-center mt-5">
                      <span className="text-xl cursor-pointer">
                        <label htmlFor="my_modal_6" className="btn">
                          <MdEditNote onClick={() => setEditText(todoItem)} />
                        </label>
                      </span>
                      <span className="text-xl cursor-pointer">
                        <MdOutlineDeleteOutline
                          onClick={() => handleDelete(todoItem.id)}
                        />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>

      {/* modal*/}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit task</h3>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full mt-8 max-w-xs"
            value={edtiText.body}
            onChange={handleChange}
          />
          <div className="modal-action">
            <label
              htmlFor="my_modal_6"
              onClick={handleClick}
              className="btn btn-primary"
            >
              Edit
            </label>
            <label htmlFor="my_modal_6" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
