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
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
};

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('');
    let [error, setError] = useState<null | 'Title is required'>(null);

    const addTask = () => {
        if (title.trim() === '') {
            setError('Title is required')
            return;
        };
        props.addTask(title.trim());
        setTitle('');
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    };

    const onPressKeyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.charCode === 13) {
            addTask();
        };
    };

    const onAllClickHandler = () => props.changeFilter("All");
    const onActiveClickHandler = () => props.changeFilter("Active");
    const onCompletedClickHandler = () => props.changeFilter("Completed");

    const tasksElements = props.tasks.map((task) => {
        const onClickHandler = () => props.removeTask(task.id);
        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, event.currentTarget.checked);
        };

        return (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <input
                    type="checkbox"
                    onChange={onChangeHandler}
                    checked={task.isDone}
                />
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
                    className={error ? 'error' : ''}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onPressKeyHandler}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <button className={props.filter === 'All' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'Active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'Completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};