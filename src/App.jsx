import { useState } from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import TaskList from './pages/TaskList.jsx'
import TaskDetail from './pages/TaskDetail.jsx'
import StatusPanel from './components/StatusPanel.jsx'

function App() {
  // Keep changes here so the list, detail page, and dashboard stay in sync.
  const [completionChanges, setCompletionChanges] = useState({})

  function getCompleted(todo) {
    return completionChanges[todo.id] ?? todo.completed
  }

  function toggleCompleted(id, originalCompleted) {
    setCompletionChanges((current) => ({
      ...current,
      [id]: !(current[id] ?? originalCompleted),
    }))
  }

  function navClass({ isActive }) {
    return isActive
      ? 'font-semibold text-blue-700 underline underline-offset-4'
      : 'text-slate-600 hover:text-blue-700'
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <Link to="/" className="text-xl font-bold text-slate-900">COS Hub</Link>
          <nav aria-label="Main navigation" className="flex gap-5 text-sm">
            <NavLink to="/" end className={navClass}>Dashboard</NavLink>
            <NavLink to="/tasks" className={navClass}>Tasks</NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard getCompleted={getCompleted} />} />
          <Route path="/tasks" element={<TaskList getCompleted={getCompleted} onToggle={toggleCompleted} />} />
          <Route path="/tasks/:id" element={<TaskDetail getCompleted={getCompleted} onToggle={toggleCompleted} />} />
          <Route path="*" element={<StatusPanel title="Page not found" message="Use the links above to go back." />} />
        </Routes>
      </main>

    </div>
  )
}

export default App
