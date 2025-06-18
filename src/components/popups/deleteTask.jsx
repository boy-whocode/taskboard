'use client';

import { deleteTask } from "@/redux/slice/boardSlice";
import { useDispatch } from "react-redux";
import Popup from "../commonComponents/Popup";
import Button from "../commonComponents/Button";

const DeleteTaskPopup = ({ task, onClose }) => {
    const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    onClose();
  };

  return (
    <Popup title="Delete Task" onClose={onClose}>
      <div className="text-center">
        <p>Are you sure you want to delete the task "{task.title}"?</p>
        <div className="flex gap-2 py-2 justify-center w-full">
          <Button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Popup>
  );
}

export default DeleteTaskPopup;