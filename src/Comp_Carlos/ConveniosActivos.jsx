import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import DataTable from "react-data-table-component";
import "./Empresas.css"; // Reutilizamos los estilos existentes

const ConveniosActivos = () => {
  const [convenios, setConvenios] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [conveniosFiltrados, setConveniosFiltrados] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  // 1) Cargar datos del CSV
  useEffect(() => {
    Papa.parse("/convenios_reales.csv", {
      download: true,
      header: true,
      complete: (results) => {
        // Eliminar filas vacías
        const datosLimpios = results.data.filter((row) =>
          Object.values(row).some((cell) => cell)
        );
        setConvenios(datosLimpios);
        setConveniosFiltrados(datosLimpios);
      },
    });
  }, []);

  // 2) Aplicar filtros
  useEffect(() => {
    let datosFiltrados = convenios;

    // Filtro de texto
    if (filtro) {
      const terminoBusqueda = filtro.toLowerCase();
      datosFiltrados = datosFiltrados.filter((convenio) =>
        Object.values(convenio).some((valor) =>
          String(valor).toLowerCase().includes(terminoBusqueda)
        )
      );
    }

    // Filtro por tipo de convenio
    if (filtroTipo !== "Todos") {
      datosFiltrados = datosFiltrados.filter(
        (convenio) => convenio.type === filtroTipo
      );
    }

    // Filtro por estado
    if (filtroEstado !== "Todos") {
      datosFiltrados = datosFiltrados.filter(
        (convenio) => convenio.status === filtroEstado
      );
    }

    setConveniosFiltrados(datosFiltrados);
  }, [filtro, filtroTipo, filtroEstado, convenios]);

  // Obtener tipos únicos para el filtro
  const tipos = [
    "Todos",
    ...new Set(convenios.map((convenio) => convenio.type)),
  ].filter(Boolean);

  // Obtener estados únicos para el filtro
  const estados = [
    "Todos",
    ...new Set(convenios.map((convenio) => convenio.status)),
  ].filter(Boolean);

  const resetearFiltros = () => {
    setFiltro("");
    setFiltroTipo("Todos");
    setFiltroEstado("Todos");
  };

  // Estilos personalizados para la tabla
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

  // Renderizar estado con color de acuerdo a su valor
  const EstadoCell = ({ value }) => {
    let bgColor = "";
    let textColor = "white";

    switch (value.toLowerCase()) {
      case "activo":
        bgColor = "#4CAF50"; // Verde
        break;
      case "en proceso":
        bgColor = "#FF9800"; // Naranja
        break;
      case "por renovar":
        bgColor = "#2196F3"; // Azul
        break;
      case "vencido":
        bgColor = "#F44336"; // Rojo
        break;
      default:
        bgColor = "#9E9E9E"; // Gris
    }

    return (
      <div
        style={{
          backgroundColor: bgColor,
          color: textColor,
          padding: "3px 8px",
          borderRadius: "4px",
          display: "inline-block",
          fontWeight: "500",
          textAlign: "center",
        }}
      >
        {value}
      </div>
    );
  };

  // Convertir fecha a formato español
  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return "";

    try {
      const fecha = new Date(fechaStr);
      return fecha.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      return fechaStr;
    }
  };

  // 3) Definición de columnas para DataTable
  const columns = [
    {
      name: "TÍTULO",
      selector: (row) => row.title,
      sortable: true,
      wrap: true,
      style: { fontWeight: "600" },
    },
    {
      name: "TIPO",
      selector: (row) => row.type,
      sortable: true,
      width: "150px",
    },
    {
      name: "DESCRIPCIÓN",
      selector: (row) => row.description,
      wrap: true,
      grow: 2,
    },
    {
      name: "INICIO",
      selector: (row) => row.signedDate,
      sortable: true,
      width: "120px",
      cell: (row) => formatearFecha(row.signedDate),
    },
    {
      name: "VENCE",
      selector: (row) => row.expirationDate,
      sortable: true,
      width: "120px",
      cell: (row) => formatearFecha(row.expirationDate),
    },
    {
      name: "ESTADO",
      selector: (row) => row.status,
      sortable: true,
      width: "120px",
      cell: (row) => <EstadoCell value={row.status} />,
    },
  ];

  return (
    <div className="empresas-container">
      <h1 className="empresas-title">Convenios Activos</h1>
      <p className="empresas-description">
        Explora nuestros convenios institucionales y conoce las alianzas
        estratégicas que benefician a los estudiantes y egresados de la
        Universidad Popular del Cesar.
      </p>

      <div className="filtrar-empresas">
        <h2>Filtrar Convenios</h2>

        <div className="filtros-grid">
          <div className="filtro-grupo">
            <label>Tipo:</label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
            >
              {tipos.map((tipo, index) => (
                <option key={index} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>

          <div className="filtro-grupo">
            <label>Estado:</label>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              {estados.map((estado, index) => (
                <option key={index} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </div>

          <div className="filtro-grupo busqueda">
            <label>Búsqueda:</label>
            <input
              type="text"
              placeholder="Buscar por título, descripción..."
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
          data={conveniosFiltrados}
          pagination
          highlightOnHover
          customStyles={customStyles}
          responsive
          noDataComponent="No se encontraron convenios con los criterios seleccionados"
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
      </div>

      <div className="beneficios-seccion">
        <h2>Ventajas de Nuestros Convenios</h2>
        <div className="beneficios-contenido">
          <ul>
            <li>
              Acceso a prácticas profesionales en empresas e instituciones
              aliadas
            </li>
            <li>
              Oportunidades de intercambio académico con universidades
              nacionales e internacionales
            </li>
            <li>
              Posibilidad de participar en proyectos de investigación
              interinstitucionales
            </li>
            <li>
              Descuentos especiales en programas de educación continua y
              posgrados
            </li>
            <li>
              Facilidades para la transferencia y homologación de créditos
              académicos
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConveniosActivos;
