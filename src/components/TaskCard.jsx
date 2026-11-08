import { Link } from 'react-router-dom'

function TaskCard({ todo, completed, onToggle }) {
  return (
    <article className="rounded-lg border bg-white p-4">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(todo.id, todo.completed)}
          aria-label={'Mark task ' + todo.id + ' completed'}
          className="mt-1 h-4 w-4 accent-blue-700"
        />
        <div>
          <h2 className="font-semibold first-letter:uppercase">{todo.title}</h2>
          <p className="mt-1 text-sm text-slate-500">Task #{todo.id} · User {todo.userId}</p>
          <p className="mt-1 text-sm">{completed ? 'Completed' : 'To do'}</p>
          <Link to={'/tasks/' + todo.id} className="mt-3 inline-block text-sm text-blue-700 hover:underline">
            View details
          </Link>
        </div>
      </div>
    </article>
  )
}

export default TaskCard
