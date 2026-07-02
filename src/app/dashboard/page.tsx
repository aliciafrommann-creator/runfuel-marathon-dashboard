export default function DashboardPage() {
  return (
    <>
      <header className="app-header">
        <div className="page-shell app-header-inner">
          <div>
            <p className="eyebrow">Runnies</p>
            <h1>Marathon Dashboard</h1>
          </div>
          <p className="local-save-note">Speichert lokal in diesem Browser.</p>
        </div>
      </header>
      <iframe
        className="dashboard-frame"
        title="Runnies Marathon Dashboard"
        src="/dashboard-static/lissabon-marathon-dashboard.html"
      />
    </>
  );
}
