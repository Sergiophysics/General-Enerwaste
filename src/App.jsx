import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Datos generales para el dashboard
export const generalData = [
  {
    mes: "Junio",
    toneladas: 27,
    ingreso_disposicion: 21000,
    gasto_combustible: 3500,
    gasto_aditivos: 1200,
    utilidad_operativa: 16300,
  },
  {
    mes: "Mayo",
    toneladas: 26,
    ingreso_disposicion: 20500,
    gasto_combustible: 3400,
    gasto_aditivos: 1000,
    utilidad_operativa: 16100,
  },
];

function DataTable({ data }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 32 }}>
      <thead>
        <tr style={{ background: '#f4f6fa' }}>
          <th>Mes</th>
          <th>Toneladas</th>
          <th>Ingreso</th>
          <th>Gasto Combustible</th>
          <th>Gasto Aditivos</th>
          <th>Utilidad Operativa</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} style={{ textAlign: 'center', background: idx % 2 ? '#fff' : '#f9fafb' }}>
            <td>{row.mes}</td>
            <td>{row.toneladas}</td>
            <td>${row.ingreso_disposicion.toLocaleString()}</td>
            <td>${row.gasto_combustible.toLocaleString()}</td>
            <td>${row.gasto_aditivos.toLocaleString()}</td>
            <td>${row.utilidad_operativa.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function WidgetResumen({ data, mes }) {
  const actual = data.find((d) => d.mes === mes) || data[0];
  return (
    <div style={{ display: 'flex', gap: '2rem', margin: '2rem 0' }}>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '1.5rem 2rem', minWidth: 180 }}>
        <div style={{ color: '#888' }}>Toneladas ({actual.mes})</div>
        <div style={{ fontWeight: 'bold', fontSize: 22 }}>{actual.toneladas}</div>
      </div>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '1.5rem 2rem', minWidth: 180 }}>
        <div style={{ color: '#888' }}>Ingreso ({actual.mes})</div>
        <div style={{ fontWeight: 'bold', fontSize: 22 }}>${actual.ingreso_disposicion.toLocaleString()}</div>
      </div>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '1.5rem 2rem', minWidth: 180 }}>
        <div style={{ color: '#888' }}>Utilidad Operativa ({actual.mes})</div>
        <div style={{ fontWeight: 'bold', fontSize: 22 }}>${actual.utilidad_operativa.toLocaleString()}</div>
      </div>
    </div>
  );
}

function GraficasIndicadoresGrid({ data }) {
  const graficas = [
    { key: 'toneladas', color: '#4fd1c5', nombre: 'Toneladas' },
    { key: 'ingreso_disposicion', color: '#3182ce', nombre: 'Ingreso', formato: v => `$${v.toLocaleString()}` },
    { key: 'utilidad_operativa', color: '#38a169', nombre: 'Utilidad Operativa', formato: v => `$${v.toLocaleString()}` },
    { key: 'gasto_combustible', color: '#e53e3e', nombre: 'Gasto Combustible', formato: v => `$${v.toLocaleString()}` },
    { key: 'gasto_aditivos', color: '#d69e2e', nombre: 'Gasto Aditivos', formato: v => `$${v.toLocaleString()}` },
  ];
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '1.5rem',
      margin: '2rem 0',
    }}>
      {graficas.map(g => (
        <GraficoIndicador
          key={g.key}
          data={data}
          dataKey={g.key}
          color={g.color}
          nombre={g.nombre}
          formato={g.formato}
        />
      ))}
    </div>
  );
}

function calcularUtilidad(row) {
  return row.ingreso_disposicion - row.gasto_combustible - row.gasto_aditivos;
}

function UtilidadOperativaWidget({ data, mes }) {
  const row = data.find((d) => d.mes === mes);
  if (!row) return <div style={{ color: 'red' }}>No hay datos para el mes seleccionado</div>;
  const utilidad = calcularUtilidad(row);
  return (
    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '1.5rem 2rem', minWidth: 220, marginBottom: 24 }}>
      <div style={{ color: '#888' }}>Utilidad Operativa calculada ({mes})</div>
      <div style={{ fontWeight: 'bold', fontSize: 22 }}>${utilidad.toLocaleString()}</div>
      <div style={{ fontSize: 13, color: '#888', marginTop: 8 }}>
        (Ingreso - Gasto Combustible - Gasto Aditivos)
      </div>
    </div>
  );
}

function GraficaComparativa({ data }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '2rem', margin: '2rem 0' }}>
      <h2 style={{ marginBottom: 24 }}>Comparativa mensual</h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip formatter={v => `$${v.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="toneladas" fill="#4fd1c5" name="Toneladas" />
          <Bar dataKey="ingreso_disposicion" fill="#3182ce" name="Ingreso" />
          <Bar dataKey="utilidad_operativa" fill="#38a169" name="Utilidad Operativa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function GraficoIndicador({ data, dataKey, color, nombre, formato = v => v }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ marginBottom: 16 }}>{nombre}</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip formatter={formato} />
          <Bar dataKey={dataKey} fill={color} name={nombre} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function App() {
  const [mesSeleccionado, setMesSeleccionado] = useState(generalData[0].mes);
  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fa' }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: 32,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}>
        <h1>General enerwaste</h1>
        <label style={{ fontWeight: 'bold', marginRight: 8 }}>Filtrar por mes:</label>
        <select value={mesSeleccionado} onChange={e => setMesSeleccionado(e.target.value)} style={{ marginBottom: 16 }}>
          {generalData.map((d) => (
            <option key={d.mes} value={d.mes}>{d.mes}</option>
          ))}
        </select>
        <UtilidadOperativaWidget data={generalData} mes={mesSeleccionado} />
        <WidgetResumen data={generalData} mes={mesSeleccionado} />
        <GraficasIndicadoresGrid data={generalData} />
        <h2 style={{ marginTop: 40 }}>Histórico de datos</h2>
        <DataTable data={generalData} />
      </div>
    </div>
  );
}

