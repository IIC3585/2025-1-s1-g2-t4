const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      font-family: Arial, sans-serif;
    }
    .seccion {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      margin-bottom: 10px;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    .titulo {
      background: #f8f9fa;
      padding: 15px;
      cursor: pointer;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .titulo:hover {
      background: #e9ecef;
    }
    .contenido {
      padding: 0 15px;
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      transition: max-height 0.3s ease-out, opacity 0.3s ease-out, padding 0.3s ease-out;
    }

    .seccion.activa .contenido {
      padding: 15px;
      max-height: 1000px;
      opacity: 1;
    }
    .icono {
      transition: transform 0.3s ease;
    }
    .seccion.activa .icono {
      transform: rotate(180deg);
    }
  </style>
`;

class Acordion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    const secciones = Array.from(this.querySelectorAll('[data-titulo]'));
    
    secciones.forEach((seccion, index) => {
      const titulo = seccion.getAttribute('data-titulo');
      const contenido = seccion.innerHTML;
      
      const divSeccion = document.createElement('div');
      divSeccion.className = 'seccion';
      
      divSeccion.innerHTML = `
        <div class="titulo">
          ${titulo}
          <span class="icono">▼</span>
        </div>
        <div class="contenido">${contenido}</div>
      `;
      
      this.shadowRoot.appendChild(divSeccion);
      
      // Evento para abrir/cerrar
      divSeccion.querySelector('.titulo').addEventListener('click', () => {
        const estaActiva = divSeccion.classList.contains('activa');
        
        // Cerrar todas las secciones primero
        this.shadowRoot.querySelectorAll('.seccion').forEach(s => {
          s.classList.remove('activa');
        });
        
        // Abrir solo si no estaba activa
        if (!estaActiva) {
          divSeccion.classList.add('activa');
        }
      });

      // Abrir la primera sección por defecto (opcional)
      if (index === 0) {
        divSeccion.classList.add('activa');
      }
    });
  }
}

customElements.define('component-acordion', Acordion);