import { useState } from 'react'
import './App.css'
import logoUniCesar from './assets/LOGO-UNICESAR.png'  // Añadir esta línea

// Añade estas importaciones al inicio del archivo junto a las existentes
import facebookIcon from './assets/facebook.png'
import twitterIcon from './assets/x.png'
import instagramIcon from './assets/instagram.png'

function App() {
  const [activeSection, setActiveSection] = useState('dashboard')

  return (
    <div className="landing-container">
      {/* Header with Navigation */}
      <header className="main-header">
        <div className="top-bar">
          <div className="logo-container">
            <img src={logoUniCesar} alt="Logo Universidad Popular del Cesar" className="logo-img" />
            {/* <h1>Ingeniería de Sistemas</h1> */}
          </div>
        </div>
        <nav className="nav-menu">
          <ul>
            <li onClick={() => setActiveSection('dashboard')} className={activeSection === 'dashboard' ? 'active' : ''}>
              Dashboard
            </li>
            <li onClick={() => setActiveSection('graduates')} className={activeSection === 'graduates' ? 'active' : ''}>
              Egresados
            </li>
            <li onClick={() => setActiveSection('companies')} className={activeSection === 'companies' ? 'active' : ''}>
              Empresas
            </li>
            <li onClick={() => setActiveSection('projects')} className={activeSection === 'projects' ? 'active' : ''}>
              Proyectos
            </li>
            <li onClick={() => setActiveSection('events')} className={activeSection === 'events' ? 'active' : ''}>
              Eventos
            </li>
            <li onClick={() => setActiveSection('international')} className={activeSection === 'international' ? 'active' : ''}>
              Internacionalización
            </li>
            <li onClick={() => setActiveSection('social')} className={activeSection === 'social' ? 'active' : ''}>
              Proyecto Social
            </li>
            <li onClick={() => setActiveSection('publications')} className={activeSection === 'publications' ? 'active' : ''}>
              Publicaciones
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2>Programa de Ingeniería de Sistemas</h2>
          <p>El Ingeniero de Sistemas egresado de la Universidad Popular del Cesar será un profesional integral que estará en la capacidad de desarrollar soluciones de software aplicando las ciencias básicas y de ingeniería, modelos basados en métodos analíticos, computacionales y experimentales para la resolución de problemas, con capacidad de gestión, emprendimiento y pensamiento crítico.</p>
          <button className="cta-button">Conoce más</button>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="info-section">
        <div className="info-card mission">
          <h3>Misión</h3>
          <p>Formar profesionales en Ingeniería de Sistemas con capacidad de gestionar, 
             desarrollar y administrar proyectos de base tecnológica, comprometidos con 
             el desarrollo sostenible de la región Caribe y el país, fundamentados en 
             principios y valores que contribuyan a la construcción de una sociedad más 
             justa y equitativa.</p>
        </div>

        <div className="info-card vision">
          <h3>Visión</h3>
          <p>El programa de Ingeniería de Sistemas de la Universidad Popular del Cesar 
             será reconocido en el 2026 por su excelencia académica, la calidad de sus 
             egresados, el impacto de sus investigaciones y su contribución al desarrollo 
             tecnológico de la región Caribe.</p>
        </div>

        <div className="info-card values">
          <h3>Valores Institucionales</h3>
          <ul>
            <li>Excelencia Académica</li>
            <li>Innovación</li>
            <li>Ética Profesional</li>
            <li>Responsabilidad Social</li>
            <li>Trabajo en Equipo</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Contacto</h4>
            <p>Dirección: Sede Principal Unicesar</p>
            <p>Valledupar - Cesar - Colombia</p>
            <p>Teléfono: (+57 605 588 5592)</p>
            <p>Email: sistemas@unicesar.edu.co</p>
          </div>
          <div className="footer-section">
            <h4>Enlaces Rápidos</h4>
            <a href="https://unicesar.edu.co/index.php/es/" target="_blank">Página Principal</a>
            <a href="https://campus.unicesar.edu.co/" target="_blank">Campus Virtual</a>
            <a href="https://biblioteca.unicesar.edu.co/" target="_blank">Biblioteca</a>
            <a href="https://unicesar.edu.co/index.php/es/investigacion" target="_blank">Investigación</a>
          </div>
          <div className="footer-section">
            <h4>Síguenos</h4>
            <div className="social-icons">
              <a href="https://www.facebook.com/UPCesar" target="_blank" rel="noopener noreferrer">
                <img src={facebookIcon} alt="Facebook" className="social-icon" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <img src={twitterIcon} alt="Twitter" className="social-icon" />
              </a>
              <a href="https://www.instagram.com/unicesar_" target="_blank" rel="noopener noreferrer">
                <img src={instagramIcon} alt="Instagram" className="social-icon" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Universidad Popular del Cesar. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
