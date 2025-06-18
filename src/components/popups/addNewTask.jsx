'use client';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../commonComponents/Popup";
import { addNewTask } from "@/redux/slice/boardSlice";
import { v4 as uuid } from "uuid";
import Button from "../commonComponents/Button";

const AddNewTaskPopup = ({onClose}) => {
    const dispatch = useDispatch();
    const { columns, tasks } = useSelector((state) => state.board);
    const [taskDetails, setTaskDetails] = useState({
        title: "",
        description: "",
        columnId: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails({ ...taskDetails, [name]: value });
    };
    const handleAddTask = () => {
        if (!taskDetails.title.trim() || !taskDetails.columnId) {
            alert("Please fill all mendatory fields");
            return;
        }
        const id = uuid().slice(0, 4);
        const { title, description, columnId } = taskDetails;
        const selectedColumn = columns.find(col => col.id === columnId);
        const updatedColumn = {
            ...selectedColumn,
            taskIds: [...selectedColumn.taskIds, id]
        }
        const updatedColumns = columns.filter(col => col.id !== columnId);
        const updatedData = {
          columns: [...updatedColumns,updatedColumn],
          tasks: [
            ...tasks,
            {
              id: id,
              title,
              description,
            },
          ],
        };
        dispatch(addNewTask(updatedData));
        setTaskDetails({ title: "", description: "", columnId: "" });
        onClose();
    }
  return (
    <Popup title={"Add New Column"}>
      <div className="add-new-column">
        <label>
          Task Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Task Title"
          name="title"
          value={taskDetails.title}
          onChange={handleChange}
          className="inputField"
        />
        <label>Task Description</label>
        <input
          type="text"
          placeholder="Task Description"
          name="description"
          value={taskDetails.description}
          onChange={handleChange}
          className="inputField"
        />
        <label>
          Select Column <span className="text-red-500">*</span>
        </label>
        <select
          onChange={handleChange}
          name="columnId"
          className="inputField"
        >
          <option value="">Select Column</option>
          {/* Assuming columns is an array of column objects with id and title */}
          {columns.map((col) => (
            <option key={col.id} value={col.id}>
              {col.title}
            </option>
          ))}
        </select>
        <div className="flex gap-2 py-2 justify-center w-full">
          <Button onClick={handleAddTask}>Add Task</Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </Popup>
  );
}

export default AddNewTaskPopup;