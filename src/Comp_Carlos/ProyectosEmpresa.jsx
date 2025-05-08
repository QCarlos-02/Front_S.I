import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const ProyectosEmpresa = () => {
  // Datos reales hard-codeados
  const sampleData = [
    {
      proyecto: "Escalando la Innovación en la Región Caribe",
      empresa: "Futurizza S.A.S.",
      descripcion:
        "Proyecto para impulsar el tejido empresarial de la Región Caribe, financiando prototipos y escalando procesos de innovación con 14 empresas beneficiarias.",
      fechaInicio: "2024-02-15",
      fechaFin: "2024-12-31",
      estado: "En curso",
    },
    {
      proyecto: "Fortalecimiento del Emprendimiento con Enactus Colombia",
      empresa: "Enactus Colombia",
      descripcion:
        "Alianza estratégica para fortalecer competencias interdisciplinarias en emprendimiento e innovación, incorporando inglés y diseño de proyectos productivos de impacto social.",
      fechaInicio: "2025-02-25",
      fechaFin: "2025-08-25",
      estado: "En curso",
    },
    {
      proyecto: 'Mesa de Trabajo "Transición Energética Justa en el Cesar"',
      empresa: "Gobernación del Cesar · UPME · Movimiento No Fracking",
      descripcion:
        "Encuentro técnico para definir políticas y estrategias de transición energética justa en el Cesar, articulando actores gubernamentales y sociales.",
      fechaInicio: "2025-04-25",
      fechaFin: "2025-04-25",
      estado: "Completado",
    },
  ];

  const [proyectos, setProyectos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [proyectosFiltrados, setFiltrados] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [filtroEmpresa, setFiltroEmpresa] = useState("Todas");

  useEffect(() => {
    // Cargamos los datos reales de ejemplo
    setProyectos(sampleData);
    setFiltrados(sampleData);
  }, []);

  useEffect(() => {
    let datosFiltrados = proyectos;

    // Aplicar filtro de búsqueda
    if (filtro) {
      datosFiltrados = datosFiltrados.filter((proyecto) =>
        Object.values(proyecto).some((valor) =>
          valor?.toString().toLowerCase().includes(filtro.toLowerCase())
        )
      );
    }

    // Aplicar filtro de estado
    if (filtroEstado !== "Todos") {
      datosFiltrados = datosFiltrados.filter(
        (proyecto) => proyecto.estado === filtroEstado
      );
    }

    // Aplicar filtro de empresa
    if (filtroEmpresa !== "Todas") {
      datosFiltrados = datosFiltrados.filter(
        (proyecto) => proyecto.empresa === filtroEmpresa
      );
    }

    setFiltrados(datosFiltrados);
  }, [filtro, filtroEstado, filtroEmpresa, proyectos]);

  const resetearFiltros = () => {
    setFiltro("");
    setFiltroEstado("Todos");
    setFiltroEmpresa("Todas");
  };

  // Obtener estados únicos para el filtro
  const estados = [
    "Todos",
    ...new Set(proyectos.map((proyecto) => proyecto.estado)),
  ].filter(Boolean);

  // Obtener empresas únicas para el filtro
  const empresas = [
    "Todas",
    ...new Set(proyectos.map((proyecto) => proyecto.empresa)),
  ].filter(Boolean);

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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const columns = [
    {
      name: "PROYECTO",
      selector: (row) => row.proyecto,
      sortable: true,
      wrap: true,
      style: { fontWeight: "600" },
    },
    {
      name: "EMPRESA",
      selector: (row) => row.empresa,
      sortable: true,
      wrap: true,
    },
    {
      name: "DESCRIPCIÓN",
      selector: (row) => row.descripcion,
      wrap: true,
      grow: 2,
    },
    {
      name: "FECHA INICIO",
      selector: (row) => row.fechaInicio,
      sortable: true,
      format: (row) => formatDate(row.fechaInicio),
      className: "fecha-cell",
    },
    {
      name: "FECHA FIN",
      selector: (row) => row.fechaFin,
      sortable: true,
      format: (row) => formatDate(row.fechaFin),
      className: "fecha-cell",
    },
    {
      name: "ESTADO",
      selector: (row) => row.estado,
      sortable: true,
      cell: (row) => {
        let colorClass = "estado-otro";

        if (row.estado === "En curso") {
          colorClass = "estado-activo";
        } else if (row.estado === "Completado") {
          colorClass = "estado-vencido";
        } else if (row.estado === "Planificado") {
          colorClass = "estado-proceso";
        }

        return <div className={`estado-badge ${colorClass}`}>{row.estado}</div>;
      },
    },
  ];

  return (
    <div className="empresas-container">
      <h1 className="empresas-title">Proyectos Universidad–Empresa</h1>
      <p className="empresas-description">
        Conoce los proyectos de colaboración entre la Universidad Popular del
        Cesar y empresas aliadas para el desarrollo regional y la innovación.
      </p>

      <div className="filtrar-empresas">
        <h2>Filtrar Proyectos</h2>

        <div className="filtros-grid">
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

          <div className="filtro-grupo">
            <label>Empresa:</label>
            <select
              value={filtroEmpresa}
              onChange={(e) => setFiltroEmpresa(e.target.value)}
            >
              {empresas.map((empresa, index) => (
                <option key={index} value={empresa}>
                  {empresa}
                </option>
              ))}
            </select>
          </div>

          <div className="filtro-grupo busqueda">
            <label>Búsqueda:</label>
            <input
              type="text"
              placeholder="Buscar proyecto, empresa..."
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
          data={proyectosFiltrados}
          pagination
          highlightOnHover
          customStyles={customStyles}
          responsive
          noDataComponent="No se encontraron proyectos con los criterios seleccionados"
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
      </div>

      <div className="beneficios-seccion">
        <h2>Beneficios de la Colaboración Universidad-Empresa</h2>
        <div className="beneficios-contenido">
          <ul>
            <li>
              Acceso a investigación y desarrollo de nuevas tecnologías
              aplicadas a problemas reales
            </li>
            <li>
              Formación de talento humano especializado y adaptado a las
              necesidades del sector productivo
            </li>
            <li>
              Posibilidad de cofinanciación en proyectos de investigación con
              entidades gubernamentales
            </li>
            <li>
              Transferencia de conocimiento y tecnología para mejorar procesos
              productivos
            </li>
            <li>
              Desarrollo de soluciones innovadoras para problemas específicos de
              la región
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProyectosEmpresa;
