import {Button} from "./Button";
import {ChangeEvent, useState} from "react";

import {FilterValues, Tasks} from "./utils/types"

type Props = {
  title: string
  tasks: Tasks
  data?: string
  deleteTasks: (id: string, todolistId: string) => void
  changeFilter: (filter: FilterValues, todolistId: string) => void
  createTask: (title: string, todolistId: string) => void
  changeStatus: (tasksID: string, isDone: boolean, todolistId: string) => void
  filter: FilterValues
  listId: string
  removeTodolist: (todolistId: string) => void
}

export const TodolistItem = ({
                               title,
                               tasks,
                               data,
                               deleteTasks,
                               changeFilter,
                               createTask,
                               changeStatus,
                               filter,
                               listId,
                               removeTodolist,
                             }: Props) => {

  let [taskTitle, setTaskTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const createTaskHandler = () => {
    if (taskTitle.trim() !== "") {
      createTask(taskTitle.trim(), listId);
      setTaskTitle("");
    } else {
      setError("Error")
    }
  }

  const createTaskOnEvenHandler = (e) => {
    setError(null)
    if (e.key == "Enter") {
      createTaskHandler()
    }
  }

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }

  const changeFilterAll = () => changeFilter("all", listId)
  const changeFilterActive = () => changeFilter("active", listId)
  const changeFilterCompleted = () => changeFilter("completed", listId)
  const changeRemoveTodolist = () => removeTodolist(listId)

  return (
    <div>

      <h3>{title}
        <button onClick={changeRemoveTodolist}>X</button>
      </h3>
      <div>
        <input value={taskTitle}
               onChange={changeTaskTitleHandler}
               onKeyPress={createTaskOnEvenHandler}
               className={error ? "error" : ""}
        />
        <Button title="+" onClick={createTaskHandler}/>
        {error && <div className={"error-message"}>{error}</div>}
      </div>

      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (

        <ul>
          {tasks.map(t => {
            const deleteTaskHandler = () => deleteTasks(t.id, listId)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              changeStatus(t.id, e.currentTarget.checked, listId);
            }

            return (
              <li key={t.id} className={filter === "completed" ? "is-done" : ""}>
                <input type="checkbox"
                       onChange={onChangeHandler}
                       checked={t.isDone}/>
                <span>{t.title}</span>
                <Button title={"X"} onClick={deleteTaskHandler}/>
              </li>
            )
          })}
        </ul>
      )}

      <button
        className={filter === "all" ? "active-filter" : ""}
        onClick={changeFilterAll}>All
      </button>
      <button
        className={filter === "active" ? "active-filter" : ""}
        onClick={changeFilterActive}>Active
      </button>
      <button
        className={filter === "completed" ? "active-filter" : ""}
        onClick={changeFilterCompleted}>Completed
      </button>
      <div>{data}</div>
    </div>
  )
}

