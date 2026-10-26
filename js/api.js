const API_BASE_URL = "http://localhost:3000/api";

export const ticketApi = {
  async crearTicket(datos) {
    const res = await fetch(`${API_BASE_URL}/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    if (!res.ok) throw new Error('Error al crear ticket');
    return await res.json();
  },
  async listarTickets() {
    const res = await fetch(`${API_BASE_URL}/tickets`);
    if (!res.ok) throw new Error('Error al listar tickets');
    return await res.json();
  },
  async obtenerTicket(id) {
    const res = await fetch(`${API_BASE_URL}/tickets/${id}`);
    if (!res.ok) throw new Error('Error al obtener ticket');
    return await res.json();
  },
  async actualizarEstado(id, estado) {
    const res = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado })
    });
    if (!res.ok) throw new Error('Error al actualizar');
    return await res.json();
  }
};
