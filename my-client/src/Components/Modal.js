import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

// renders `Modal` component if `showModal` is true, `mode` indicating the mode of the modal, `setShowModal` to control the modal's visibility, `getData` function to fetch data, `task` details of the task to the `Modal` component
const Modal = ({ mode, setShowModal, getData, task }) => {
  // initializes `cookies` object using `useCookies` hook
  const [cookies] = useCookies(null);
  // determine whether modal is in editmode based on the value of mode prop
  const editMode = mode === "edit" ? true : false;
  // initializes data state variable using `useState` hook
  // if edit mode it initializes form fields with existing task details otherwise with default values
  const [data, setData] = useState({
    user_id: editMode ? task.user_id : cookies.User.id,
    title: editMode ? task.title : '',
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });

  // handle adding a new task to save data
  const postData = async (e) => {
    e.preventDefault();
    if (data.title === null || data.title?.trim().length === 0) {
      return toast.error("Task is required");
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}todos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 201) {
        setShowModal(false);
        getData();
        toast.success("Todo saved");
      } else toast.error("Failed to update todo");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // handle editing an existing task to update task data
  const editData = async (e) => {
    e.preventDefault();
    if (data.title === null || data.title?.trim().length === 0) {
      return toast.error("Task is required");
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}todos/${task.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        setShowModal(false);
        getData();
        toast.success("Todo updated");
      } else toast.error("Failed to update todo");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // handle updates in `data` state variables in response to change in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  // JSX representing component's UI
  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Lets's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form method="POST">
          <input required maxLength={30} placeholder="Write your task here" name="title" value={data.title} onChange={handleChange} />
          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <input required type="range" id="range" min="0" max="100" name="progress" value={data.progress} onChange={handleChange} />
          <input type="date" name="date" value={data.date} onChange={handleChange} />
          <br />
          <input className={mode} type="submit" value="save" onClick={editMode ? editData : postData} />
        </form>
      </div>
    </div>
  );
};

export default Modal;