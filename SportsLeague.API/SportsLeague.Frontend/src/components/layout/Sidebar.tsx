import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', icon: '🏠' },
  { to: '/teams', label: 'Equipos', icon: '⚽' },
  { to: '/players', label: 'Jugadores', icon: '🏃' },
  { to: '/referees', label: 'Arbitros', icon: ' whistle' },
  { to: '/tournaments', label: 'Torneos', icon: '🏆' },
  { to: '/matches', label: 'Partidos', icon: '📋' },
  { to: '/sponsors', label: 'Patrocinadores', icon: '💼' },
];

const statsItems = [
  { to: '/stats/scorers', label: 'Goleadores', icon: '⚽' },
  { to: '/stats/cards', label: 'Tarjetas', icon: '🟨' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>ITM Sports</h2>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3>General</h3>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="nav-section">
          <h3>Estadisticas</h3>
          {statsItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="nav-section">
          <h3>Herramientas</h3>
          <NavLink
            to="/api-tester"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">🔧</span>
            Probador API
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}
