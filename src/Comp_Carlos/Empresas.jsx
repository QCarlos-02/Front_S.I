import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import DataTable from "react-data-table-component";

const Empresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [empresasFiltradas, setEmpresasFiltradas] = useState([]);
  const [filtroSector, setFiltroSector] = useState("Todos");
  const [filtroCiudad, setFiltroCiudad] = useState("Todas");

  useEffect(() => {
    Papa.parse("/empresas_reales.csv", {
      download: true,
      header: true,
      complete: (results) => {
        const datosLimpios = results.data.filter((row) =>
          Object.values(row).some((v) => v)
        );
        setEmpresas(datosLimpios);
        setEmpresasFiltradas(datosLimpios);
      },
    });
  }, []);

  useEffect(() => {
    let datosFiltrados = empresas;

    // Aplicar filtro de búsqueda
    if (filtro) {
      datosFiltrados = datosFiltrados.filter((empresa) =>
        Object.values(empresa).some((valor) =>
          valor?.toString().toLowerCase().includes(filtro.toLowerCase())
        )
      );
    }

    // Aplicar filtro de sector
    if (filtroSector !== "Todos") {
      datosFiltrados = datosFiltrados.filter(
        (empresa) => empresa["Sector"] === filtroSector
      );
    }

    // Aplicar filtro de ciudad
    if (filtroCiudad !== "Todas") {
      datosFiltrados = datosFiltrados.filter(
        (empresa) => empresa["Ciudad"] === filtroCiudad
      );
    }

    setEmpresasFiltradas(datosFiltrados);
  }, [filtro, filtroSector, filtroCiudad, empresas]);

  // Obtener sectores únicos para el filtro
  const sectores = [
    "Todos",
    ...new Set(empresas.map((empresa) => empresa["Sector"])),
  ].filter(Boolean);

  // Obtener ciudades únicas para el filtro
  const ciudades = [
    "Todas",
    ...new Set(empresas.map((empresa) => empresa["Ciudad"])),
  ].filter(Boolean);

  const resetearFiltros = () => {
    setFiltro("");
    setFiltroSector("Todos");
    setFiltroCiudad("Todas");
  };

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#4CAF50",
        color: "white",
        fontWeight: "bold",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
        padding: "16px",
        textTransform: "uppercase",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
        backgroundColor: "white",
        "&:nth-of-type(odd)": {
          backgroundColor: "#f9f9f9",
        },
      },
      highlightOnHoverStyle: {
        backgroundColor: "#f1f9f1",
        transition: "0.15s",
        cursor: "pointer",
      },
    },
    pagination: {
      style: {
        backgroundColor: "white",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
      },
      pageButtonsStyle: {
        color: "#4CAF50",
        fill: "#4CAF50",
      },
    },
  };

  const columns = [
    {
      name: "NOMBRE",
      selector: (row) => row["Nombre"],
      sortable: true,
      wrap: true,
      style: { fontWeight: "600" },
    },
    {
      name: "SECTOR",
      selector: (row) => row["Sector"],
      sortable: true,
    },
    {
      name: "CIUDAD",
      selector: (row) => row["Ciudad"],
      sortable: true,
    },
    {
      name: "TELÉFONO",
      selector: (row) => row["Teléfono"],
    },
    {
      name: "CORREO",
      selector: (row) => row["Correo"],
      cell: (row) => (
        <a href={`mailto:${row["Correo"]}`} className="email-link">
          {row["Correo"]}
        </a>
      ),
    },
    {
      name: "SITIO WEB",
      selector: (row) => row["Sitio Web"],
      cell: (row) => (
        <a
          href={row["Sitio Web"]}
          target="_blank"
          rel="noopener noreferrer"
          className="website-link"
        >
          Visitar
        </a>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "CONTACTO",
      selector: (row) => row["Contacto"],
    },
  ];

  return (
    <div className="empresas-container">
      <h1 className="empresas-title">Directorio de Empresas Aliadas</h1>
      <p className="empresas-description">
        Explora nuestro directorio de empresas aliadas y conoce las
        oportunidades laborales disponibles para egresados de Ingeniería de
        Sistemas.
      </p>

      <div className="filtrar-empresas">
        <h2>Filtrar Empresas</h2>

        <div className="filtros-grid">
          <div className="filtro-grupo">
            <label>Sector:</label>
            <select
              value={filtroSector}
              onChange={(e) => setFiltroSector(e.target.value)}
            >
              {sectores.map((sector, index) => (
                <option key={index} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>

          <div className="filtro-grupo">
            <label>Ciudad:</label>
            <select
              value={filtroCiudad}
              onChange={(e) => setFiltroCiudad(e.target.value)}
            >
              {ciudades.map((ciudad, index) => (
                <option key={index} value={ciudad}>
                  {ciudad}
                </option>
              ))}
            </select>
          </div>

          <div className="filtro-grupo busqueda">
            <label>Búsqueda:</label>
            <input
              type="text"
              placeholder="Buscar empresa..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>

          <button className="resetear-filtros" onClick={resetearFiltros}>
            Resetear Filtros
          </button>
        </div>
      </div>

      <div className="tabla-empresas">
        <DataTable
          columns={columns}
          data={empresasFiltradas}
          pagination
          highlightOnHover
          customStyles={customStyles}
          responsive
          noDataComponent="No se encontraron empresas con los criterios seleccionados"
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
      </div>

      <div className="beneficios-seccion">
        <h2>Beneficios para Empresas Aliadas</h2>
        <div className="beneficios-contenido">
          <ul>
            <li>
              Acceso prioritario a talento calificado de egresados de Ingeniería
              de Sistemas
            </li>
            <li>
              Participación en ferias de empleo y eventos exclusivos de la
              universidad
            </li>
            <li>
              Publicación gratuita de ofertas laborales en nuestros canales
              oficiales
            </li>
            <li>
              Posibilidad de establecer convenios para prácticas profesionales
            </li>
            <li>
              Visibilidad y promoción en la red de la Universidad Popular del
              Cesar
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Empresas;
