import React from "react"
import axios from "axios"
import { Route, useNavigate, useLocation, Routes } from "react-router-dom"

// Components
import { List } from './components'
import Tasks from "./components/Tasks/Tasks"
import AddList from "./components/AddList/AddList"

function App() {
  const [lists, setLists] = React.useState(null)
  const [colors, setColors] = React.useState(null)
  const [tasks, setTasks] = React.useState(null)

  const [activeItem, setActiveItem] = React.useState(null)


  let navigate = useNavigate()
  let locate = useLocation()

  React.useEffect(() => {
    axios
      .get('https://my-json-server.typicode.com/NoNameGeorge/react-todo-list-JSON/lists')
      .then(({ data }) => {
        setLists(data)
      })
  }, [])

  React.useEffect(() => {
    axios
      .get('https://my-json-server.typicode.com/NoNameGeorge/react-todo-list-JSON/tasks')
      .then(({ data }) => {
        setTasks(data)
      })
  }, [])

  React.useEffect(() => {
    axios
      .get('https://my-json-server.typicode.com/NoNameGeorge/react-todo-list-JSON/colors').then(({ data }) => {
        setColors(data)
      })
  }, [])


  const onAddList = obj => {
    const newList = [...lists, obj]
    setLists(newList)
  }

  const onAddTask = (item) => {
    const newTasks = [...tasks, item]
    setTasks(newTasks)
    }

  const onEditTask = (listId, taskObj) => {
    const newTitle = prompt('Введите новый заголовок')

    if (!newTitle || taskObj.text === newTitle) return

    const newTasks = tasks.map(task => {
      if (task.id === taskObj.id && task.listId === listId) {
        task.text = newTitle
      }
      return task
    })

    setTasks(newTasks)

    axios
      .patch('https://my-json-server.typicode.com/NoNameGeorge/react-todo-list-JSON/tasks/' + taskObj.id, {
        text: newTitle
      })
      .catch(() => {
        alert('Не удалось обновить название списка')
      })
  }

  const onRemoveTask = (listId, taskId) => {
    if (window.confirm('Вы действительно хотите удалить пункт списка?')) {
      const newTasks = tasks.filter(task => task.id !== taskId || task.listId !== listId)

      setTasks(newTasks)

      axios
        .delete('https://my-json-server.typicode.com/NoNameGeorge/react-todo-list-JSON/tasks/' + taskId)
        .catch(() => {
          alert('Не удалось обновить задачу')
        })
    }
  }

  const onCompleteTask = (listId, taskId, completed) => {
    const newTasks = tasks.map(task => {
      if (task.id === taskId && task.listId === listId) {
        task.completed = completed
      }
      return task
    })

    setTasks(newTasks)

    axios
      .patch('https://my-json-server.typicode.com/NoNameGeorge/react-todo-list-JSON/tasks/' + taskId, {
        completed
      })
      .catch(() => {
        alert('Не удалось обновить задачу')
      })
  }

  const getColor = (item, type) => {
    if (colors && type) {
      return colors.filter(color => color.id === item.colorId)[0].hex
    }

    if (colors) {
      return colors.filter(color => color.id === item.colorId)[0].name
    }
  }

  const onEditListTitle = (id, title) => {
    const newList = lists.map(item => {
      if (item.id === id) {
        item.name = title
      }
      return item
    })
    setLists(newList)
  }


  React.useEffect(() => {
    const listID = locate.pathname.split('/').reverse()[0]

    if (lists) {
      const list = lists.find(list => list.id === Number(listID))
      if (list) {
        setActiveItem(list)
      } else {
        setActiveItem(null)
      }
    }

  }, [lists, locate.pathname])

  let currentItem

  if (lists && activeItem) {
    currentItem = lists.filter(item => (item.id === activeItem.id))[0]
  }

  if (!colors || !lists || !tasks) return <></>

  return (
    <div className="todo-wrapper flex">
      <div className="todo grid">
        <div className="todo__sidebar">

          <List
            onClick={() => navigate('/')}
            items={[
              {
                active: locate.pathname === '/',
                icon: (<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001V8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z" fill="black" /></svg>),
                name: 'Все задачи'
              }
            ]}
          />

          <List
            items={lists}
            onRemove={id => {
              const newLists = lists.filter(item => item.id !== id)
              setLists(newLists)
            }}
            onClick={list => navigate(`/lists/${list.id}`)}
            activeItem={activeItem}
            colors={colors}
            isRemovable
            getColor={(item) => getColor(item)}
          />

          <AddList onAdd={onAddList} colors={colors} />
        </div>
        <div className="todo__main">

          <Routes>
            <Route path="/" element={
              activeItem === null &&
              lists.map(list => {
                return <Tasks
                  key={list.id}
                  item={list}
                  tasks={tasks}
                  onAddTask={onAddTask}
                  onEditTask={(listId, taskObj) => onEditTask(listId, taskObj)}
                  onRemoveTask={(listId, taskId) => onRemoveTask(listId, taskId)}
                  onCompleteTask={(listId, taskId, completed) => onCompleteTask(listId, taskId, completed)}
                  onEditListTitle={(id, title) => onEditListTitle(id, title)}
                  getColor={(item, type) => getColor(item, type)}
                />
              })
            } />
            {currentItem &&
              <Route path="/lists/:id" element={
                <Tasks
                  key={currentItem.id}
                  item={currentItem}
                  tasks={tasks}
                  onAddTask={onAddTask}
                  onEditTask={(listId, taskObj) => onEditTask(listId, taskObj)}
                  onRemoveTask={(listId, taskId) => onRemoveTask(listId, taskId)}
                  onCompleteTask={(listId, taskId, completed) => onCompleteTask(listId, taskId, completed)}
                  onEditListTitle={(id, title) => onEditListTitle(id, title)}
                  getColor={(item, type) => getColor(item, type)}
                />
              } />
            }




          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
