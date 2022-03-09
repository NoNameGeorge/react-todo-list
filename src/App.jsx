import React from "react";
import axios from "axios";
import { Route } from "react-router-dom";

// Components
import { List } from './components'


function App() {
  const [lists, setLists] = React.useState(null)
  const [colors, setColors] = React.useState(null)
  const [activeItem, setActiveItem] = React.useState(null)

  React.useEffect(() => {
    axios
      .get('http://localhost:3001/lists')
      .then(({ data }) => {
        setLists(data)
      })
    axios
      .get('http://localhost:3001/colors').then(({ data }) => {
        setColors(data);
      });
  }, [])

  console.log(lists, colors)

  return (
    <div className="todo-wrapper flex">
      <div className="todo grid">
        <div className="todo__sidebar">
          <ul className="todo__list list">
            <li>
              <img src="" alt="" />
              <div>Все задачи</div>
            </li>
          </ul>

          <ul className="todo__list list">
            <li>
              <img src="" alt="" />
              <div>Все задачи</div>
            </li>
          </ul>


          <div className="sidebar__items">
            <div className="sidebar__item flex">
              <img src="" alt="" className="sidebar__item__img" />
              <div className="sidebar__item__text"></div>
              <div className="sidebar__item__delete"></div>
            </div>
          </div>

        </div>
        <div className="todo__main">

        </div>
      </div>
    </div>
  );
}

export default App;
