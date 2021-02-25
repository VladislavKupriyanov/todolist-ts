import React, { useState } from 'react';
import './App.css';
import { v1 } from 'uuid';
import { Todolist } from './Todolist';

export type FilterValuesType = "All" | "Active" | "Completed";

export function App() {

    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJs", isDone: false },
        { id: v1(), title: "RestAPI", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false }
    ]);

    function addTask(title: string) {
        let newTask = { id: v1(), title: title, isDone: false }
        setTasks([newTask, ...tasks]);
    };

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(task => task.id !== id);
        setTasks(filteredTasks);
    };

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

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        };
        setTasks([...tasks])
    };

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
};