import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { API_URL } from "../utila";
export const AddTaskForm = ({ fetchTasks }) => {
  const [newTask, setNewTask] = useState();

  const addNewTask = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/task`, {
        name: newTask,
        completed: false,
      });

      await fetchTasks();

      setNewTask("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Typography align="center" variant="h2" paddingTop={2} paddingBottom={2}>
        my task list
      </Typography>
      <div className="addTaskForm">
        <TextField
          size="small"
          label="task"
          variant="outlined"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button
          disabled={!newTask?.length}
          variant="outline"
          onClick={addNewTask}
        >
          <AddIcon />
        </Button>
      </div>
    </div>
  );
};
