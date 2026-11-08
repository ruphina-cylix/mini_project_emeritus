function StatusPanel({ title, message, onRetry, loading = false }) {
  return (
    <div className="rounded-lg border bg-white p-6" role={loading ? 'status' : undefined}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-slate-600">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="mt-4 rounded bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800">
          Try again
        </button>
      )}
    </div>
  )
}

export default StatusPanel
