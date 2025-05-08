import React from "react";
import "./Beneficios.css"; // Importamos estilos específicos

const Beneficios = () => {
  // Datos de los beneficios organizados por categorías
  const categoriasBeneficios = [
    {
      titulo: "Beneficios Académicos",
      icono: "academic",
      items: [
        "Acceso a estudiantes capacitados en tecnologías actuales",
        "Participación en proyectos de investigación aplicada",
        "Posibilidad de influir en el contenido curricular para satisfacer necesidades de la industria",
        "Participación en talleres y seminarios técnicos especializados",
      ],
    },
    {
      titulo: "Beneficios Empresariales",
      icono: "business",
      items: [
        "Asesoría técnica gratuita en el desarrollo de soluciones",
        "Reconocimiento en medios institucionales de la universidad",
        "Alianzas a largo plazo para prácticas y empleabilidad",
        "Reducción de costos de reclutamiento y formación inicial",
      ],
    },
    {
      titulo: "Beneficios de Networking",
      icono: "network",
      items: [
        "Networking con otros actores del sector TI regional",
        "Invitaciones a eventos exclusivos de la industria tecnológica",
        "Contacto directo con docentes investigadores y grupos de investigación",
        "Participación en la Red de Empresas de Tecnología del Cesar",
      ],
    },
  ];

  // Testimonios de empresas colaboradoras
  const testimonios = [
    {
      nombre: "Empresa ABC Tech",
      cargo: "Director de Recursos Humanos",
      texto:
        "La colaboración con el programa de Ingeniería de Sistemas nos ha permitido acceder a talento joven y capacitado, mejorando significativamente nuestros procesos de desarrollo.",
    },
    {
      nombre: "Soluciones Digitales S.A.",
      cargo: "Gerente de Innovación",
      texto:
        "Los proyectos desarrollados con estudiantes y docentes del programa han aportado perspectivas frescas y soluciones innovadoras a problemas complejos de nuestra organización.",
    },
    {
      nombre: "TechValley",
      cargo: "CEO",
      texto:
        "La vinculación con la Universidad Popular del Cesar nos ha posicionado como referentes en el sector tecnológico regional, ampliando nuestra red de contactos profesionales.",
    },
  ];

  // Renderizamos los iconos según la categoría
  const renderIcono = (tipo) => {
    switch (tipo) {
      case "academic":
        return (
          <div className="icono icono-academic">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
        );
      case "business":
        return (
          <div className="icono icono-business">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
        );
      case "network":
        return (
          <div className="icono icono-network">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="beneficios-container">
      <div className="beneficios-header">
        <h1 className="beneficios-title">
          Beneficios de Colaborar con el Programa
        </h1>
        <p className="beneficios-subtitle">
          Descubre las múltiples ventajas que ofrece establecer alianzas
          estratégicas con el programa de Ingeniería de Sistemas de la
          Universidad Popular del Cesar
        </p>
      </div>

      {/* Sección de beneficios principales */}
      <div className="beneficios-grid">
        {categoriasBeneficios.map((categoria, index) => (
          <div key={index} className="beneficio-card">
            {renderIcono(categoria.icono)}
            <h2 className="beneficio-titulo">{categoria.titulo}</h2>
            <ul className="beneficio-lista">
              {categoria.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Sección informativa adicional */}
      <div className="info-seccion">
        <h2>¿Cómo establecer una alianza con nosotros?</h2>
        <div className="pasos-colaboracion">
          <div className="paso">
            <div className="paso-numero">1</div>
            <div className="paso-contenido">
              <h3>Contacto Inicial</h3>
              <p>
                Comuníquese con la coordinación del programa a través del
                formulario de contacto o directamente al correo:{" "}
                <strong>ingenieria.sistemas@unicesar.edu.co</strong>
              </p>
            </div>
          </div>
          <div className="paso">
            <div className="paso-numero">2</div>
            <div className="paso-contenido">
              <h3>Reunión Exploratoria</h3>
              <p>
                Agendaremos una reunión para conocer sus necesidades específicas
                y explorar posibles áreas de colaboración
              </p>
            </div>
          </div>
          <div className="paso">
            <div className="paso-numero">3</div>
            <div className="paso-contenido">
              <h3>Propuesta de Colaboración</h3>
              <p>
                Desarrollaremos una propuesta formal adaptada a los intereses
                mutuos entre su organización y la universidad
              </p>
            </div>
          </div>
          <div className="paso">
            <div className="paso-numero">4</div>
            <div className="paso-contenido">
              <h3>Formalización</h3>
              <p>
                Firma del convenio o acuerdo específico que establece los
                términos y condiciones de la alianza
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonios */}
      <div className="testimonios-seccion">
        <h2>Lo que dicen nuestros aliados</h2>
        <div className="testimonios-grid">
          {testimonios.map((testimonio, index) => (
            <div key={index} className="testimonio-card">
              <div className="testimonio-contenido">
                <p className="testimonio-texto">"{testimonio.texto}"</p>
                <div className="testimonio-autor">
                  <p className="autor-nombre">{testimonio.nombre}</p>
                  <p className="autor-cargo">{testimonio.cargo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Final */}
      <div className="cta-seccion">
        <h2>¿Listo para colaborar?</h2>
        <p>
          Únase a las organizaciones que ya están aprovechando los beneficios de
          trabajar con nuestro programa
        </p>
        <a href="/contacto" className="cta-boton">
          Contáctenos Hoy
        </a>
      </div>
    </div>
  );
};

export default Beneficios;
