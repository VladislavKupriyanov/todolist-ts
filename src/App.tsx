import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';

export type FilterValuesType = "All" | "Active" | "Completed";

export function App() {

    let [tasks, setTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJs", isDone: false },
        { id: 4, title: "RestAPI", isDone: false },
        { id: 5, title: "GraphQL", isDone: false }
    ]);

    let [filter, setFilter] = useState<FilterValuesType>("All");

    let tasksForTodolist = tasks;

    if (filter == "Active") {
        tasksForTodolist = tasks.filter(task => task.isDone === false);
    };

    if (filter == "Completed") {
        tasksForTodolist = tasks.filter(task => task.isDone === true);
    };

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    };

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(task => task.id !== id);
        setTasks(filteredTasks);
    };

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
};