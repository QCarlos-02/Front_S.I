import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import DataTable from 'react-data-table-component';
import '../App.css'; // Asegúrate de tener este archivo CSS para los estilos
const Empresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [empresasFiltradas, setEmpresasFiltradas] = useState([]);
  const [mostrarBeneficios, setMostrarBeneficios] = useState(false);

  useEffect(() => {
    Papa.parse('/empresas_reales.csv', {
      download: true,
      header: true,
      complete: (results) => {
        const datosLimpios = results.data.filter(row => Object.values(row).some(v => v));
        setEmpresas(datosLimpios);
        setEmpresasFiltradas(datosLimpios);
      },
    });
  }, []);

  useEffect(() => {
    const datosFiltrados = empresas.filter((empresa) =>
      Object.values(empresa).some((valor) =>
        valor?.toString().toLowerCase().includes(filtro.toLowerCase())
      )
    );
    setEmpresasFiltradas(datosFiltrados);
  }, [filtro, empresas]);

  const columns = [
    { name: 'Nombre', selector: row => row['Nombre'], sortable: true, wrap: true },
    { name: 'Sector', selector: row => row['Sector'], sortable: true },
    { name: 'Ciudad', selector: row => row['Ciudad'], sortable: true },
    { name: 'Teléfono', selector: row => row['Teléfono'] },
    { name: 'Correo', selector: row => row['Correo'] },
    {
      name: 'Sitio Web',
      selector: row => row['Sitio Web'],
      cell: row => (
        <a href={row['Sitio Web']} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          Visitar
        </a>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    { name: 'Contacto', selector: row => row['Contacto'] },
  ];

  return (
    <div className="p-6 w-full">
      {/* Título */}
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">Empresas Aliadas</h1>

      {/* Filtro + Botón */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-center">
        <input
          type="text"
          placeholder="Buscar empresa, sector, ciudad..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border border-gray-300 rounded text-sm w-full sm:w-96 h-10 px-3"
        />

        <button
          onClick={() => setMostrarBeneficios(!mostrarBeneficios)}
          className="bg-green-700 text-white text-xs font-semibold rounded hover:bg-green-800 transition-all px-4 py-2 mt-2 sm:mt-0"
          style={{ marginLeft: "2rem", whiteSpace: "nowrap" }}
        >
          {mostrarBeneficios ? 'Ocultar beneficios' : 'Ver beneficios'}
        </button>
      </div>

      {/* Card de Beneficios */}
      {mostrarBeneficios && (
  <div className="card-beneficios-container">
    <div className="card-beneficios">
      <h2>Beneficios de colaborar con el programa</h2>
      <ul>
        <li>Acceso a estudiantes capacitados en tecnologías actuales.</li>
        <li>Participación en proyectos de investigación aplicada.</li>
        <li>Asesoría técnica gratuita en el desarrollo de soluciones.</li>
        <li>Reconocimiento en medios institucionales de la universidad.</li>
        <li>Alianzas a largo plazo para prácticas y empleabilidad.</li>
      </ul>
    </div>
  </div>
)}


      {/* Tabla */}
      <DataTable
        columns={columns}
        data={empresasFiltradas}
        pagination
        highlightOnHover
        striped
        responsive
        noDataComponent="No se encontraron resultados"
      />
    </div>
  );
};

export default Empresas;