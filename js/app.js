import { ticketApi } from './api.js';

console.log("Sistema de Gestión de Tickets iniciado.");

document.addEventListener('DOMContentLoaded', () => {
  // Crear ticket
  const formCrear = document.getElementById('form-crear-ticket');
  if (formCrear) {
    formCrear.addEventListener('submit', async (e) => {
      e.preventDefault();
      const datos = {
        titulo: document.getElementById('titulo').value,
        descripcion: document.getElementById('descripcion').value,
        dni: document.getElementById('dni').value,
        prioridad: document.getElementById('prioridad').value
      };
      try {
        const nuevo = await ticketApi.crearTicket(datos);
        alert(`Ticket creado: #${nuevo.id || nuevo._id}`);
        formCrear.reset();
        listar();
      } catch (err) {
        alert(err.message);
      }
    });
  }

  // Listar tickets
  async function listar() {
    const contenedor = document.getElementById('lista-tickets');
    if (!contenedor) return;
    try {
      const tickets = await ticketApi.listarTickets();
      contenedor.innerHTML = tickets.map(t => `
        <div class="box">
          <p><strong>#${t.id || t._id}</strong> - ${t.titulo} - DNI: ${t.dni || ''}</p>
          <p>Estado: ${t.estado} | Prioridad: ${t.prioridad || t.titulo}</p>
          <button class="button is-small is-warning" onclick="cambiarEstado('${t.id || t._id}', 'en_proceso')">En proceso</button>
          <button class="button is-small is-success" onclick="cambiarEstado('${t.id || t._id}', 'cerrado')">Cerrar</button>
        </div>
      `).join('');
    } catch (err) {
      contenedor.innerHTML = `<p class="has-text-danger">Error: ${err.message}. Verificá que la API en localhost:3000 esté corriendo.</p>`;
    }
  }

  window.cambiarEstado = async (id, estado) => {
    try {
      await ticketApi.actualizarEstado(id, estado);
      listar();
    } catch (err) { alert(err.message); }
  };

  // Consultar por DNI
  const formDNI = document.getElementById('form-consulta-dni');
  if (formDNI) {
    formDNI.addEventListener('submit', async (e) => {
      e.preventDefault();
      const dni = document.getElementById('consulta-dni').value;
      const tickets = await ticketApi.listarTickets();
      const filtrados = tickets.filter(t => String(t.dni) === String(dni));
      document.getElementById('lista-tickets').innerHTML = filtrados.length ? filtrados.map(t => `<div class="box">${t.titulo} - ${t.estado}</div>`).join('') : '<p>No hay tickets para ese DNI</p>';
    });
  }

  listar();
});
