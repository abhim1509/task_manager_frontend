import { addTask, editTask } from "@/utilities/network/routes";
import { parsedJSON } from "@/utilities/reusable";
import { getValue } from "@/utilities/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NavigationBar from "./NavigationBar";

const EditTasks = () => {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("0");
  const [isTaskCompleted, setIsTaskCompleted] = useState(0);
  const [deadlineDate, setDate] = useState(new Date());
  const [taskToEdit, setTaskToEdit] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setTaskToEdit(getValue("taskToEdit"));
  }, []);

  const _handleInput = (e: any) => {
    const { value, name } = e.target;
    //console.log({ value, name });
    switch (name) {
      case "description":
        setDescription(value);
        //console.log("description", description);
        break;

      case "priority":
        setPriority(value);
        //console.log("priority", priority);
        break;
      case "isTaskCompleted":
        setIsTaskCompleted(value);
        //console.log("isTaskCompleted", value);
        break;
    }
  };

  const _editTasktoUser = () => {
    const date = JSON.stringify(deadlineDate);
    const taskObj = {
      isCompleted: isTaskCompleted,
      description: description,
      priority: priority,
      deadline: date,
    };
    const userObj = parsedJSON(getValue("userObject"));
    const { userId, token } = userObj.data;
    console.log({ userId, token });
    const taskToEdit = parsedJSON(getValue("taskToEdit"));
    console.log("taskId", taskToEdit._id);
    editTask(userId, taskToEdit._id, taskObj, token);
    navigate(`/users/${userId}/tasks/`);
  };
  //console.log(taskToEdit);
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <h1>Edit Tasks</h1>
        <NavigationBar />
      </div>
      <div>
        <label htmlFor="description">Task Description</label>
        <input
          type="text"
          name="description"
          id="description"
          onChange={(e: any) => {
            _handleInput(e);
          }}
        />
        <label htmlFor="priority">Task priority</label>
        <input
          type="text"
          name="priority"
          id="priority"
          onChange={(e: any) => {
            _handleInput(e);
          }}
        />
        <div>
          {" "}
          Task completed:
          <select
            name="isTaskCompleted"
            onChange={(e: any) => {
              _handleInput(e);
            }}
          >
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>
        <div style={{ width: "150px", height: "150px" }}>
          Deadline date:
          <input
            type="date"
            name="date"
            id=""
            onChange={(date: any) => {
              setDate(date.target.value);
            }}
          />
        </div>
        <button onClick={_editTasktoUser}>Save</button>
      </div>
    </>
  );
};

export default EditTasks;