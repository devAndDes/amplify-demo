import { AddTaskForm } from "./components/AddTaskForm";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Task } from "./components/Task";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "./utils";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const {
        data: { tasks: tasksData },
      } = await axios.get(`${API_URL}/task`);
      setTasks(tasksData.Items);
      console.log(tasksData.Items);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddTaskForm fetchTasks={fetchTasks} />
      {tasks.map((task) => {
        return <Task key={task.id} task={task} fetchTasks={fetchTasks} />;
      })}
    </ThemeProvider>
  );
}
