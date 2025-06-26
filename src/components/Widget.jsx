import './Widget.css';

export default function Widget({ title, value, icon }) {
  return (
    <div className="widget">
      <div className="widget-icon">{icon}</div>
      <div>
        <div className="widget-title">{title}</div>
        <div className="widget-value">{value}</div>
      </div>
    </div>
  );
}
