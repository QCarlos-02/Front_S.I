import React from "react";
import "./EgresadoCard.css";

const EgresadoCard = ({ egresado }) => {
  // Función para determinar el estado del egresado en español
  const getStatusText = (status) => {
    switch (status) {
      case "employed":
        return "Empleado";
      case "studying":
        return "Estudiando";
      case "searching":
        return "Buscando empleo";
      default:
        return status;
    }
  };

  return (
    <div className="egresado-card">
      <div className="egresado-photo">
        <img
          src={egresado.photo || "/api/placeholder/150/150"}
          alt={`Foto de ${egresado.firstName} ${egresado.lastName}`}
        />
      </div>

      <div className="egresado-info">
        <h3>
          {egresado.firstName} {egresado.lastName}
        </h3>

        <div className="egresado-details">
          <p className="egresado-detail">
            <span className="detail-label">Graduación:</span>
            <span className="graduation-year">{egresado.graduationYear}</span>
          </p>

          <p className="egresado-detail">
            <span className="detail-label">Estado:</span>
            <span className="status-badge">
              {getStatusText(egresado.status)}
            </span>
          </p>

          {egresado.company && (
            <p className="egresado-detail">
              <span className="detail-label">Empresa:</span>
              {egresado.company}
            </p>
          )}

          {egresado.position && (
            <p className="egresado-detail">
              <span className="detail-label">Cargo:</span>
              {egresado.position}
            </p>
          )}

          <p className="egresado-detail">
            <span className="detail-label">Ubicación:</span>
            {egresado.city}, {egresado.country}
          </p>

          {egresado.academicDegree && (
            <p className="egresado-detail">
              <span className="detail-label">Formación:</span>
              {egresado.academicDegree}
            </p>
          )}
        </div>
      </div>

      <div className="egresado-contact">
        {egresado.email && (
          <a href={`mailto:${egresado.email}`} className="contact-button email">
            Contactar
          </a>
        )}
        {egresado.linkedin && (
          <a
            href={egresado.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-button linkedin"
          >
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
};

export default EgresadoCard;
