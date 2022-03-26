import "../styles/createPlan.css";

import axios from "axios";
import Project from "./Project";

import { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";

function Manager() {
  const initialPlan = {
    title: "",
    deadline: "",
    user: [],
    project: [],
  };
  const [username, setUsername] = useState([]);
  const [listTask, setListTask] = useState([]);
  const [plan, setPlan] = useState(initialPlan);
  const [selected, setSelected] = useState([]);
  const [addProject, setAddProject] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/user/role/User").then((resp) => {
      const data = resp.data.map((result) => ({
        value: result._id,
        label: result.username,
      }));
      setUsername(data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlan({ ...plan, [name]: value, user: selected });
    console.log(plan);
  };

  const handleToggle = () => {
    setAddProject(!addProject);
  };

  return (
    <div className="project-manager">
      <h1 className="header-1">Beto Todo App</h1>
      <h2 className="header-createPlan">Create Plan</h2>
      <div className="container-form">
        <div className="item">
          <h3>Title</h3>
          <input
            className="title-input-field"
            type="text"
            onChange={handleChange}
            name="title"
            placeholder="plan 1..."
            value={plan.title}
          />
        </div>

        <div className="item">
          <h3>Deadline</h3>
          <input
            className="deadline-input-field"
            type="date"
            onChange={handleChange}
            name="deadline"
            placeholder="30/04/2022"
            value={plan.deadline}
          />
        </div>

        <div className="item">
          <h3>Employee(s)</h3>
          <MultiSelect
            className="multiple-select"
            placeholder="select options"
            value={selected}
            options={username}
            onChange={setSelected}
          />
        </div>

        <div className="button">
          <button className="btn-commit" onClick={handleToggle}>
            {addProject ? "Back" : "Add"}
          </button>
        </div>
        {addProject && (
          <div className="projectTask">
            <Project plan={plan} setPlan={setPlan} />
          </div>
        )}

        <button className="btn-commit">Create</button>
        <button className="btn-cancel">Cancel</button>
      </div>
    </div>
  );
}

export default Manager;
