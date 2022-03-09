import React from 'react';

const List = ({ onClick, items, name }) => {

    console.log(items)

    return (
        <ul className='todo__list'>
            {items.map((item, index) => {
                return <li
                    key={`${item.name}__${index}`}
                    onClick={() => onClick(item)}
                >
                    {item.name}
                </li>
            })}
        </ul>
    );
};

export default List;