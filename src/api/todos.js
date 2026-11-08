import { useQuery } from '@tanstack/react-query'

const API_URL = 'https://jsonplaceholder.typicode.com'
const TASK_LIMIT = 20

async function fetchTodos() {
  const response = await fetch(`${API_URL}/todos?_limit=${TASK_LIMIT}`)
  if (!response.ok) throw new Error('Could not load tasks')
  const todos = await response.json()
  if (!Array.isArray(todos)) throw new Error('Unexpected task data')
  return todos
}

async function fetchTodo(id) {
  const response = await fetch(`${API_URL}/todos/${id}`)
  if (response.status === 404) return null
  if (!response.ok) throw new Error('Could not load this task')
  return response.json()
}

export function useTodos() {
  return useQuery({
    queryKey: ['todos', { limit: TASK_LIMIT }],
    queryFn: fetchTodos,
  })
}

export function useTodo(id) {
  return useQuery({
    queryKey: ['todo', id],
    queryFn: () => fetchTodo(id),
    enabled: Number.isInteger(id) && id > 0,
  })
}
