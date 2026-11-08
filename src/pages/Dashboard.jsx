import { Link } from 'react-router-dom'
import { useTodos } from '../api/todos.js'
import StatusPanel from '../components/StatusPanel.jsx'

function Dashboard({ getCompleted }) {
  const { data: todos, isPending, isError, refetch } = useTodos()

  if (isPending) return <StatusPanel loading title="Loading dashboard" message="Getting tasks from the API..." />
  if (isError) return <StatusPanel title="Could not load tasks" message="Please check your connection." onRetry={refetch} />
  if (todos.length === 0) return <StatusPanel title="No tasks yet" message="The API returned an empty list." />

  const completedCount = todos.filter(getCompleted).length
  const nextTasks = todos.filter((todo) => !getCompleted(todo)).slice(0, 3)

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-slate-600">Here is an overview of the 20 sample tasks.</p>

      <section aria-label="Task summary" className="mt-7 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border bg-white p-5">
          <p className="text-sm text-slate-600">Total tasks</p>
          <p className="mt-2 text-2xl font-bold">{todos.length}</p>
        </div>
        <div className="rounded-lg border bg-white p-5">
          <p className="text-sm text-slate-600">Completed</p>
          <p className="mt-2 text-2xl font-bold">{completedCount}</p>
        </div>
        <div className="rounded-lg border bg-white p-5">
          <p className="text-sm text-slate-600">To do</p>
          <p className="mt-2 text-2xl font-bold">{todos.length - completedCount}</p>
        </div>
      </section>

      <section className="mt-8 rounded-lg border bg-white p-5">
        <h2 className="text-xl font-semibold">Next tasks</h2>
        {nextTasks.length === 0 ? (
          <p className="mt-3 text-slate-600">All sample tasks are complete.</p>
        ) : (
          <ul className="mt-3 list-inside list-disc space-y-2">
            {nextTasks.map((todo) => (
              <li key={todo.id}>
                <Link to={'/tasks/' + todo.id} className="text-blue-700 hover:underline">{todo.title}</Link>
              </li>
            ))}
          </ul>
        )}
        <Link to="/tasks" className="mt-5 inline-block text-sm font-semibold text-blue-700 hover:underline">
          View all tasks →
        </Link>
      </section>
    </div>
  )
}

export default Dashboard
