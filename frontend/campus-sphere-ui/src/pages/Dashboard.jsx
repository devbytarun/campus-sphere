export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Welcome to CampusSphere
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Use the sidebar to navigate between Students, Classes, Attendance, and Subjects.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Students', value: '—', icon: '👥' },
          { label: 'Classes', value: '—', icon: '📚' },
          { label: 'Attendance', value: '—', icon: '✓' },
          { label: 'Subjects', value: '—', icon: '📖' },
        ].map(({ label, value, icon }) => (
          <div
            key={label}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden>{icon}</span>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {label}
                </p>
                <p className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
                  {value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
