import "./styles/app.scss";
import "./styles/allNotes.scss";
import AllNotes from "./components/AllNotes";
import CompleteNotes from "./components/CompleteNotes";
import NoCompleteNotes from "./components/NoCompleteNotes";
import { useState, useEffect } from "react";

function App() {
  const [whatToShow, setWhatToShow] = useState("all");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("localTasks");
    data !== null ? setTasks(JSON.parse(data)) : setTasks([]);
  }, []);

  useEffect(() => {
    localStorage.setItem("localTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const data = document.getElementById("input").value;

    if (data) {
      setTasks([
        ...tasks,
        {
          key: tasks.length,
          state: false,
          content: data,
        },
      ]);
      document.getElementById("input").value = "";
      document.getElementById("input").focus();
    } else {
      alert("Please write a task");
      document.getElementById("input").focus();
    }
  };

  const changeState = (key) => {
    setTasks(
      tasks.map((task) =>
        task.key === key ? { ...task, state: !task.state } : task
      )
    );
  };

  const deleteNote = (key) => {
    setTasks(
      tasks
        .filter((task) => task.key !== key)
        .map((task) => (task.key > key ? { ...task, key: task.key - 1 } : task))
    );
  };

  const deleteAllNotes = () => {
    setTasks(
      tasks
        .filter((task) => task.state !== true)
        .map((task, index) =>
          task.key !== tasks.length ? { ...task, key: index } : task
        )
    );
  };

  return (
    <div className="global-container">
      <h1 className="logo" onClick={() => setWhatToShow("all")}>
        #ToDo
      </h1>
      <nav className="nav">
        <input
          className="navbar-item"
          onClick={() => setWhatToShow("all")}
          type="radio"
          name="radio"
          id="radio"
          checked={whatToShow === "all" ? true : false}
        />
        <label htmlFor="radio">All</label>
        <input
          className="navbar-item"
          onClick={() => setWhatToShow("complete")}
          type="radio"
          name="radio"
          id="radio2"
          checked={whatToShow === "complete" ? true : false}
        />
        <label htmlFor="radio2">Complete</label>
        <input
          className="navbar-item"
          onClick={() => setWhatToShow("active")}
          type="radio"
          name="radio"
          id="radio3"
          checked={whatToShow === "active" ? true : false}
        />
        <label htmlFor="radio3">Active</label>
      </nav>
      <div
        className="form"
        onKeyDownCapture={(e) => (e.key === "Enter" ? addTask() : null)}
      >
        <span>
          <input
            type="text"
            id="input"
            autoFocus
            autoComplete="off"
            placeholder="Write your task."
            className="text"
          />
          <div className="animation"></div>
        </span>
        <input type="button" value="Add" onClick={addTask} className="button" />
      </div>

      {whatToShow === "all" ? (
        <AllNotes tasks={tasks} changeState={changeState} />
      ) : whatToShow === "complete" ? (
        <CompleteNotes
          tasks={tasks}
          changeState={changeState}
          deleteNote={deleteNote}
          deleteAllNotes={deleteAllNotes}
        />
      ) : (
        <NoCompleteNotes tasks={tasks} changeState={changeState} />
      )}
    </div>
  );
}

export default App;
