'use client';
import { useState } from "react";
import Popup from "../commonComponents/Popup";
import { useDispatch, useSelector } from "react-redux";
import { addNewColumn } from "@/redux/slice/boardSlice";
import { v4 as uuid } from "uuid";
import Button from "../commonComponents/Button";

const AddNewColumnPopup = ({ onClose }) => {
  const [columnName, setColumnName] = useState('');
  const dispatch = useDispatch();
  const {columns, tasks} = useSelector((state) => state.board);
  
  const handleAddColumn = () => {
      const id = uuid().slice(0, 4);
    if (columnName.trim()) {
        const newColumn = {columns:[
            ...columns,
            {
            id: id,
            title: columnName,
            taskIds: []
        }],
        tasks: [...tasks]
    }
        console.log("New Column:", newColumn);
      dispatch(addNewColumn(newColumn));
    }
    setColumnName('');
    onClose();
  };

  return (
    <Popup title={"Add New Column"}>
      <div className="add-new-column">
        <label>
          Column Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="inputField"
          placeholder="Column Name"
          value={columnName}
          onChange={(e) => setColumnName(e.target.value)}
        />
        <div className="flex gap-2 py-2 justify-center w-full">
          <Button onClick={handleAddColumn}>Add Column</Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </Popup>
  );
}

export default AddNewColumnPopup;