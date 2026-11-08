import { useState } from 'react'
import { useTodos } from '../api/todos.js'
import StatusPanel from '../components/StatusPanel.jsx'
import TaskCard from '../components/TaskCard.jsx'

function TaskList({ getCompleted, onToggle }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const { data: todos, isPending, isError, refetch } = useTodos()

  if (isPending) return <StatusPanel loading title="Loading tasks" message="Getting tasks from the API..." />
  if (isError) return <StatusPanel title="Could not load tasks" message="Please check your connection." onRetry={refetch} />
  if (todos.length === 0) return <StatusPanel title="No tasks yet" message="The API returned an empty list." />

  const visibleTodos = todos.filter((todo) => {
    const matchesSearch = todo.title.toLowerCase().includes(search.trim().toLowerCase())
    const completed = getCompleted(todo)
    const matchesFilter = filter === 'all' || (filter === 'completed' ? completed : !completed)
    return matchesSearch && matchesFilter
  })

  return (
    <div>
      <h1 className="text-3xl font-bold">Tasks</h1>
      <p className="mt-2 text-slate-600">Search and manage 20 sample tasks. Your changes last for this visit only.</p>

      <div className="mt-6 grid gap-4 rounded-lg border bg-white p-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Search tasks
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Enter a task title"
            className="mt-2 block w-full rounded border border-slate-300 px-3 py-2 focus:outline-2 focus:outline-blue-600"
          />
        </label>
        <label className="text-sm font-medium">
          Status
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="mt-2 block w-full rounded border border-slate-300 bg-white px-3 py-2 focus:outline-2 focus:outline-blue-600"
          >
            <option value="all">All</option>
            <option value="active">To do</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>

      <p className="my-5 text-sm text-slate-600">Showing {visibleTodos.length} of {todos.length} tasks</p>
      {visibleTodos.length === 0 ? (
        <StatusPanel title="No matching tasks" message="Try a different search or status filter." />
      ) : (
        <section aria-label="Task results" className="grid gap-4 md:grid-cols-2">
          {visibleTodos.map((todo) => (
            <TaskCard key={todo.id} todo={todo} completed={getCompleted(todo)} onToggle={onToggle} />
          ))}
        </section>
      )}
    </div>
  )
}

export default TaskList
