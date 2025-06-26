import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Reportes</a></li>
          <li><a href="#">Configuración</a></li>
        </ul>
      </nav>
    </aside>
  );
}
