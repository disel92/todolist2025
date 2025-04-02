import {v1} from "uuid/dist/esm"


export interface Task {
  id: string
  title: string
  isDone: boolean
}

export type Tasks = Array<Task> // Task[]


export type FilterValues = "all" | "active" | "completed"
