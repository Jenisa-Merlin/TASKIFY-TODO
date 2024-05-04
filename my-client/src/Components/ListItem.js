import Modal from "./Modal";
import ProgressBar from "./ProgressBar";
import Checkbox from "./Checkbox";

import React, { useState } from "react";
import { toast } from "react-toastify";

// ListItem functional component which receives task (details of task), getData (function to fetch data) as props
const ListItem = ({ task, getData }) => {
  // define state variable showModal to control the visibility of the modal
  // initial value of showModal is false
  const [showModal, setShowModal] = useState(false);
  // define state variable completed to track whether the task is completed
  // initial value of completed is taken from task prop
  const [completed, setCompleted] = useState(task.status);
  
  // responsible for deleting task
  const deleteTodo = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}todos/${task.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        getData();
        toast.success("Todo deleted");
      } else toast.error("Failed to delete todo");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // responsible for handling checkbox changes (marking a task as completed or incomplete) to update task's completion status
  const handleCheckboxChange = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}todos/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...task, completed: !completed }),
        }
      );
      if (response.status === 200) {
        setCompleted(!completed);
        getData();
        toast.success("Todo updated");
      } else toast.error("Failed to update todo");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  // JSX representing task item's UI is rendered
  return (
    <div className="list-item">
      <div className="info-container" style={{ textAlign: "left" }}>
        <div style={{ marginRight: "10px", marginLeft: "5px" }}>
          <Checkbox checked={completed} onChange={handleCheckboxChange} />
        </div>
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress} />
      </div>
      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>
          EDIT
        </button>
        <button className="delete" onClick={deleteTodo}>
          DELETE
        </button>
      </div>
      {/* renders `Modal` component if `showModal` is true, `mode` indicating the mode of the modal, `setShowModal` to control the modal's visibility, `getData` function to fetch data, `task` details of the task to the `Modal` component */}
      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          getData={getData}
          task={task}
        />
      )}
    </div>
  );
};

export default ListItem;