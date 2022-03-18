import axios from 'axios';
import React from 'react';

import './Tasks.scss'

import editImage from './../../assets/img/edit.svg'
import { Link } from 'react-router-dom';
import Task from './Task';

const Tasks = ({
    item,
    tasks,
    onAddTask,
    onEditTask,
    onRemoveTask,
    onCompleteTask,
    onEditListTitle,
    getColor
}) => {
    const [inputValue, setInputValue] = React.useState('');


    const editTask = (item) => {
        const newTitle = prompt('Введите новый заголовок')
        if (!newTitle || item.name === newTitle) return

        onEditListTitle(item.id, newTitle)

        axios
            .patch('https://my-json-server.typicode.com/NoNameGeorge/react-todo-list-JSON/lists/' + item.id, {
                name: newTitle
            })
            .catch(() => {
                alert('Не удалось обновить название списка');
            });
    }

    const taskItems = tasks && tasks.filter(task => task.listId === item.id)
    
    const addTask = () => {
        if (!inputValue) {
            alert('Введите название задачи');
            return;
        }

        const task = {
            "listId": item.id,
            "text": inputValue,
            "completed": false
        }

        onAddTask(task)

        axios
            .post(`https://my-json-server.typicode.com/NoNameGeorge/react-todo-list-JSON/tasks`, task)
            .catch(() => {
                alert('Ошибка при добавлении задачи!');
            })
            .finally(() => {
                setInputValue('')
            })

    }

    return (
        <div className='tasks'>
            <Link to={`/lists/${item.id}`}>
                <h2
                    style={{
                        color: getColor(item, 'hex')
                    }}
                    className="tasks__title">
                    <div>{item.name}</div>
                    <img
                        alt=""
                        src={editImage}
                        onClick={() => editTask(item)}
                    />
                </h2>
            </Link>


            <div className="tasks__items">
                {taskItems && taskItems.length
                    ? taskItems.map(task => {
                        return <Task
                            key={task.id}
                            id={task.id}
                            text={task.text}
                            completed={task.completed}
                            list={item}
                            onRemove={(listId, taskId) => onRemoveTask(listId, taskId)}
                            onEdit={(id, obj) => onEditTask(id, obj)}
                            onComplete={(listId, taskId, completed) => onCompleteTask(listId, taskId, completed)}
                        >
                        </Task>
                    })
                    : <h2>Задачи отсутствуют</h2>
                }
            </div>

            <div className="add-tasks">

                <input
                    className="field"
                    type="text"
                    placeholder="Введите название задачи..."
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />

                <button onClick={addTask} className="button">Добавить</button>
            </div>
        </div>
    );
};

export default Tasks;