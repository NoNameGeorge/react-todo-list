import axios from 'axios';
import React from 'react';

import './AddList.scss'

import Badge from '../Badge/Badge';


const AddList = ({ colors, onAdd }) => {
    const [seletedColor, selectColor] = React.useState(3);
    const [isLoading, setIsLoading] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');

    React.useEffect(() => {
        if (Array.isArray(colors)) {
            selectColor(colors[0].id);
        }
    }, [colors]);

    const onClose = () => {
        setInputValue('');
        selectColor(colors[0].id);
    };

    const addList = () => {
        if (!inputValue) {
            alert('Введите название списка');
            return;
        }

        setIsLoading(true);

        axios
            .post('https://my-json-server.typicode.com/NoNameGeorge/react-todo-list-JSON/lists', {
                name: inputValue,
                colorId: seletedColor
            })
            .then(({ data }) => {
                const color = colors.filter(c => c.id === seletedColor)[0];
                const listObj = { ...data, color, tasks: [] };
                onAdd(listObj);
                onClose();
            })
            .catch(() => {
                alert('Ошибка при добавлении списка!');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="add-list">
            <input
                className="field"
                type="text"
                placeholder="Введите название списка..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />

            <div className="add-list-colors">
                {colors.map(color => (
                    <Badge
                        onClick={() => selectColor(color.id)}
                        key={color.id}
                        color={color.name}
                        className={seletedColor === color.id && 'active'}
                    />
                ))}
            </div>
            
            <button onClick={addList} className="button">
                {isLoading ? 'Добавление...' : 'Добавить'}
            </button>
        </div>
    );
};

export default AddList;