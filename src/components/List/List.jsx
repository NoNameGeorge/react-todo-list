import axios from 'axios';
import React from 'react';

import removeSvg from '../../assets/img/remove.svg';

import Badge from '../Badge/Badge';

import './List.scss'


const List = ({
    items,
    activeItem,
    colors,
    isRemovable,
    onClick,
    onRemove,
    getColor
}) => {





    const removeList = item => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
            axios
                .delete('https://my-json-server.typicode.com/NoNameGeorge/react-todo-list-JSON/lists/' + item.id)
                .then(() => {
                    onRemove(item.id);
                });
        }
    };

    return (
        <ul className='todo__list'>
            {items.map(item => {
                return <li
                    key={item.name}
                    className={(activeItem && item.id === activeItem.id) ? 'active' : ''}
                >
                    {item.icon
                        ? item.icon
                        : <Badge
                            color={getColor(item)}

                        />
                    }
                    <span
                        onClick={() => onClick(item)}
                    >
                        {item.name}
                    </span>
                    {isRemovable && (
                        <img
                            className="remove-icon"
                            src={removeSvg}
                            alt=""
                            onClick={() => removeList(item)}
                        />
                    )}
                </li>
            })}
        </ul>
    );
};

export default List;