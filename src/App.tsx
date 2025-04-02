import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";


import {FilterValues, Task} from "./utils/types.ts"
import {v1} from "uuid";


export const App = () => {


  let todolistId1 = v1() as string;
  let todolistId2 = v1() as string;

  let [tasksObject, setTasksObject] = useState<Record<string, Task[]>>({
    [todolistId1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
      {id: v1(), title: 'Redux', isDone: false},
      {id: v1(), title: 'Typescript', isDone: false},
      {id: v1(), title: 'RTK query', isDone: false}
    ],
    [todolistId2]: [
      {id: v1(), title: 'Books', isDone: true},
      {id: v1(), title: 'Milks', isDone: true}
    ]
  });

  type TodolistType = {
    id: string
    title: string
    filter: FilterValues
  }

  let [todolists, setTodolist] = useState<Array<TodolistType>>(
    [
      {id: todolistId1, title: "What to learn", filter: "active"},
      {id: todolistId2, title: "What to by", filter: "completed"}
    ]);

  function deleteTasks (id: string, todolistId: string) {
    let tasks = tasksObject[todolistId];
    let filteredTasks = tasks.filter(t => t.id !== id);
    tasksObject[todolistId] = filteredTasks;
    setTasksObject({...tasksObject});
  }

  function createTask (title: string, todolistId: string) {
    let task = {id: v1(), title: title, isDone: false};
    let tasks = tasksObject[todolistId];
    let newTasks = [task, ...tasks];
    tasksObject[todolistId] = newTasks;
    setTasksObject({...tasksObject});
  }

  function changeStatus(tasksID: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObject[todolistId];
    let task = tasks.find(t => t.id === tasksID);
    if (task) {
      task.isDone = isDone;
      setTasksObject({...tasksObject});
    }
  }

  // чтобы поменять значение фильтра
  const changeFilter = (f: FilterValues, todolistId: string) => {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = f;
      setTodolist([...todolists])
    }
  }

  function  removeTodolist (todolistId: string) {
    let filterTodolists = todolists.filter(tl => tl.id !== todolistId);
    setTodolist(filterTodolists);
    delete tasksObject[todolistId];
    setTasksObject({...tasksObject});
  }


  return (
    <div className="app">
      {
        todolists.map((tl) => {

          let filteredTasks = tasksObject[tl.id];

          if (tl.filter === 'active') {
            filteredTasks = filteredTasks.filter(task => !task.isDone)
          }
          if (tl.filter === 'completed') {
            filteredTasks = filteredTasks.filter(task => task.isDone)
          }

          return <TodolistItem
            key={tl.id}
            listId={tl.id}
            title={tl.title}
            tasks={filteredTasks}
            data={"13/01/2025"}
            deleteTasks={deleteTasks}
            changeFilter={changeFilter}
            createTask={createTask}
            changeStatus={changeStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
          />
        })
      }
    </div>
  )
}
