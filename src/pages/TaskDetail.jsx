import { Link, useParams } from 'react-router-dom'
import { useTodo } from '../api/todos.js'
import StatusPanel from '../components/StatusPanel.jsx'

function TaskDetail({ getCompleted, onToggle }) {
  const { id: idParam } = useParams()
  const id = Number(idParam)
  const validId = Number.isInteger(id) && id > 0
  const { data: todo, isPending, isError, refetch } = useTodo(id)

  return (
    <div className="max-w-2xl">
      <Link to="/tasks" className="text-sm text-blue-700 hover:underline">← Back to tasks</Link>
      <div className="mt-5">
        {!validId || (!isPending && !isError && !todo) ? (
          <StatusPanel title="Task not found" message="Choose a task from the list instead." />
        ) : isPending ? (
          <StatusPanel loading title="Loading task" message="Getting the task details..." />
        ) : isError ? (
          <StatusPanel title="Could not load this task" message="Please check your connection." onRetry={refetch} />
        ) : (
          <article className="rounded-lg border bg-white p-6">
            <p className="text-sm text-slate-500">Task #{todo.id}</p>
            <h1 className="mt-2 text-2xl font-bold first-letter:uppercase">{todo.title}</h1>
            <dl className="mt-6 space-y-3">
              <div><dt className="text-sm text-slate-500">Status</dt><dd className="font-medium">{getCompleted(todo) ? 'Completed' : 'To do'}</dd></div>
              <div><dt className="text-sm text-slate-500">Assigned to</dt><dd className="font-medium">User {todo.userId}</dd></div>
            </dl>
            <button
              type="button"
              onClick={() => onToggle(todo.id, todo.completed)}
              className="mt-6 rounded bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
            >
              {getCompleted(todo) ? 'Mark as to do' : 'Mark as completed'}
            </button>
            <p className="mt-3 text-sm text-slate-500">This change resets when you refresh the page.</p>
          </article>
        )}
      </div>
    </div>
  )
}

export default TaskDetail
