import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import { FilterValuesType } from './App'

type TaskType = {
    id: string
    title: string
    isDone: boolean
};

type PropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
};

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('');

    const addTask = () => {
        props.addTask(title);
        setTitle('');
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    };

    const onPressKeyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) {
            addTask();
        };
    };

    const onAllClickHandler = () => props.changeFilter("All");
    const onActiveClickHandler = () => props.changeFilter("Active");
    const onCompletedClickHandler = () => props.changeFilter("Completed");

    const tasksElements = props.tasks.map((task) => {

        const onClickHandler = () => props.removeTask(task.id);

        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={onClickHandler}>x</button>
            </li>
        );
    });

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onPressKeyHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};