// DATOS DE HABITACIONES (25 habitaciones reales)
const habitaciones = [
  { id: 1, nombre: "Habitación 1", tipo: "Dos camas", categoria: "estandar", precio: 500, caracteristicas: ["2 camas, Matrimonial e Individual", "Baño privado"], disponible: true, televisor: false, aire: false },
  { id: 2, nombre: "Habitación 2", tipo: "Dos camas", categoria: "estandar", precio: 500, caracteristicas: ["2 camas, Matrimonial e Individual", "Baño privado"], disponible: true, televisor: false, aire: false },
  { id: 3, nombre: "Habitación 3", tipo: "Matrimonial", categoria: "estandar", precio: 400, caracteristicas: ["Cama matrimonial", "Baño privado"], disponible: true, televisor: false, aire: false },
  { id: 4, nombre: "Habitación 4", tipo: "Dos camas", categoria: "estandar", precio: 500, caracteristicas: ["2 camas Individuales", "Baño privado"], disponible: true, televisor: false, aire: false },
  { id: 5, nombre: "Habitación 5", tipo: "Matrimonial", categoria: "estandar", precio: 400, caracteristicas: ["Cama matrimonial", "Baño privado"], disponible: true, televisor: false, aire: false },
  { id: 6, nombre: "Habitación 6", tipo: "Matrimonial", categoria: "estandar", precio: 400, caracteristicas: ["Cama matrimonial", "Baño privado"], disponible: true, televisor: false, aire: false },
  { id: 7, nombre: "Habitación 7", tipo: "Dos camas con TV", categoria: "familiares", precio: 550, caracteristicas: ["2 camas Individuales", "Baño privado", "Televisor"], disponible: true, televisor: true, aire: false },
  { id: 8, nombre: "Habitación 8", tipo: "Dos camas con TV", categoria: "familiares", precio: 550, caracteristicas: ["2 camas Individuales", "Baño privado", "Televisor"], disponible: true, televisor: true, aire: false },
  { id: 9, nombre: "Habitación 9", tipo: "Matrimonial con TV", categoria: "estandar", precio: 450, caracteristicas: ["Cama matrimonial", "Baño privado", "Televisor"], disponible: true, televisor: true, aire: false },
  { id: 10, nombre: "Habitación 10", tipo: "Matrimonial con TV", categoria: "estandar", precio: 450, caracteristicas: ["Cama matrimonial", "Baño privado", "Televisor"], disponible: true, televisor: true, aire: false },
  { id: 11, nombre: "Habitación 11", tipo: "Matrimonial con TV", categoria: "estandar", precio: 450, caracteristicas: ["Cama matrimonial", "Baño privado", "Televisor"], disponible: true, televisor: true, aire: false },
  { id: 12, nombre: "Habitación 12", tipo: "Matrimonial con TV", categoria: "estandar", precio: 450, caracteristicas: ["Cama matrimonial", "Baño privado", "Televisor"], disponible: true, televisor: true, aire: false },
  { id: 13, nombre: "Habitación 13", tipo: "Matrimonial con TV", categoria: "estandar", precio: 450, caracteristicas: ["Cama matrimonial", "Baño privado", "Televisor"], disponible: true, televisor: true, aire: false },
  { id: 14, nombre: "Habitación 14", tipo: "Matrimonial con TV", categoria: "estandar", precio: 450, caracteristicas: ["Cama matrimonial", "Baño privado", "Televisor"], disponible: true, televisor: true, aire: false },
  { id: 15, nombre: "Habitación 15", tipo: "Matrimonial", categoria: "estandar", precio: 400, caracteristicas: ["Cama matrimonial", "Baño privado"], disponible: true, televisor: false, aire: false },
  { id: 16, nombre: "Habitación 16", tipo: "Doble cama sin TV", categoria: "estandar", precio: 500, caracteristicas: ["2 camas Individuales", "Baño privado"], disponible: true, televisor: false, aire: false },
  { id: 17, nombre: "Habitación 17", tipo: "Matrimonial", categoria: "estandar", precio: 400, caracteristicas: ["Cama matrimonial", "Baño privado"], disponible: true, televisor: false, aire: false },
  { id: 18, nombre: "Habitación 18", tipo: "Matrimonial", categoria: "estandar", precio: 400, caracteristicas: ["Cama matrimonial", "Baño privado"], disponible: true, televisor: false, aire: false },
  { id: 19, nombre: "Habitación 19", tipo: "Dos camas matrimoniales", categoria: "familiares", precio: 700, caracteristicas: ["2 camas matrimoniales", "Baño privado"], disponible: true, televisor: false, aire: false },
  { id: 20, nombre: "Habitación 20", tipo: "Cuatro camas", categoria: "familiares", precio: 900, caracteristicas: ["4 camas individuales", "Baño privado"], disponible: true, televisor: false, aire: false },
  { id: 21, nombre: "Habitación 21", tipo: "Triple cama", categoria: "familiares", precio: 700, caracteristicas: ["3 camas individuales", "Baño privado"], disponible: true, televisor: false, aire: false },
  { id: 22, nombre: "Habitación 22", tipo: "Doble cama con TV", categoria: "familiares", precio: 550, caracteristicas: ["2 camas Individuales", "Baño privado", "Televisor"], disponible: true, televisor: true, aire: false },
  { id: 23, nombre: "Habitación 23", tipo: "Cama Matrimonial", categoria: "aire", precio: 1100, caracteristicas: ["Cama Queen", "Baño privado", "Aire Acondicionado"], disponible: true, televisor: true, aire: true },
  { id: 24, nombre: "Habitación 24", tipo: "Cama Matrimonial", categoria: "aire", precio: 1100, caracteristicas: ["Cama Queen", "Baño privado", "Aire Acondicionado"], disponible: false, televisor: true, aire: true },
  { id: 25, nombre: "Habitación 25", tipo: "Cama Matrimonial", categoria: "aire", precio: 1100, caracteristicas: ["Cama Queen", "Baño privado", "Aire Acondicionado"], disponible: true, televisor: true, aire: true }
];

// =================== ADMIN CONFIG ===================
const ADMIN_USER = 'HCS-ADMINISTRADOR';
const ADMIN_PASS = '2026HOTELCOSTASUR';
function isAdmin() { const u = getUsuarioActual(); return u && u.rol === 'admin'; }

// =================== TOAST SYSTEM ===================
function showToast(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.cssText = 'position:fixed;top:1.5rem;right:1.5rem;z-index:9999;display:flex;flex-direction:column;gap:0.6rem;';
    document.body.appendChild(container);
  }
  const colors = { success: '#00C853', error: '#FF1744', warning: '#FF9800', info: '#2196F3' };
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.style.cssText = `background:${colors[type]};color:white;padding:0.9rem 1.4rem;border-radius:12px;font-weight:600;font-size:0.92rem;box-shadow:0 6px 24px rgba(0,0,0,0.18);display:flex;align-items:center;gap:0.6rem;max-width:340px;animation:slideInToast 0.3s ease;`;
  toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.4s'; setTimeout(() => toast.remove(), 400); }, 3500);
}
const toastStyle = document.createElement('style');
toastStyle.textContent = '@keyframes slideInToast{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}';
document.head.appendChild(toastStyle);

// =================== DATA LAYER ===================
function initData() {
  if (!localStorage.getItem('usuarios')) localStorage.setItem('usuarios', JSON.stringify([]));
  if (!localStorage.getItem('reservas')) localStorage.setItem('reservas', JSON.stringify([]));
  if (!localStorage.getItem('usuarioActual')) localStorage.setItem('usuarioActual', JSON.stringify(null));
}
function getUsuarioActual() { return JSON.parse(localStorage.getItem('usuarioActual')); }
function setUsuarioActual(usuario) { localStorage.setItem('usuarioActual', JSON.stringify(usuario)); }
function getUsuarios() { return JSON.parse(localStorage.getItem('usuarios')); }
function setUsuarios(usuarios) { localStorage.setItem('usuarios', JSON.stringify(usuarios)); }
function getReservas() { return JSON.parse(localStorage.getItem('reservas')); }
function setReservas(reservas) { localStorage.setItem('reservas', JSON.stringify(reservas)); }

// =================== AUTH ===================
function registrarUsuario(datos) {
  const usuarios = getUsuarios();
  if (!datos.nombre || !datos.email || !datos.password) {
    showToast('Completa todos los campos.', 'warning'); return false;
  }
  if (datos.password.length < 8) {
    showToast('La contraseña debe tener al menos 8 caracteres.', 'error'); return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(datos.email)) {
    showToast('Ingresa un correo electrónico válido.', 'error'); return false;
  }
  if (usuarios.find(u => u.email.toLowerCase() === datos.email.toLowerCase())) {
    showToast('Este correo ya está registrado.', 'warning'); return false;
  }
  if (usuarios.find(u => u.nombre.toLowerCase() === datos.nombre.toLowerCase())) {
    showToast('Este nombre de usuario ya existe. Elige otro.', 'warning'); return false;
  }
  const nuevoUsuario = { id: Date.now(), ...datos, fechaRegistro: new Date().toISOString() };
  usuarios.push(nuevoUsuario);
  setUsuarios(usuarios);
  showToast('¡Cuenta creada exitosamente! Ya puedes iniciar sesión.', 'success');
  return true;
}

function loginUsuario(nombre, password) {
  if (!nombre || !password) {
    showToast('Completa todos los campos.', 'warning'); return false;
  }
  // ── Acceso de Administrador ──
  if (nombre.trim().toUpperCase() === ADMIN_USER && password === ADMIN_PASS) {
    const adminObj = { id: 'admin-hcs', nombre: ADMIN_USER, rol: 'admin' };
    setUsuarioActual(adminObj);
    actualizarHeaderUsuario();
    showToast('Bienvenido, Administrador 🔧', 'success');
    return 'admin';
  }
  // ── Acceso de huésped normal ──
  const usuarios = getUsuarios();
  const usuario = usuarios.find(u => u.nombre.toLowerCase() === nombre.toLowerCase() && u.password === password);
  if (usuario) {
    setUsuarioActual(usuario);
    actualizarHeaderUsuario();
    showToast(`¡Bienvenido, ${usuario.nombre}!`, 'success');
    return true;
  } else {
    showToast('Usuario o contraseña incorrectos. Verifica tus datos.', 'error');
    return false;
  }
}

function logoutUsuario() {
  setUsuarioActual(null);
  actualizarHeaderUsuario();
  showToast('Has cerrado sesión correctamente.', 'info');
}

function actualizarHeaderUsuario() {
  const usuario = getUsuarioActual();
  const userNameSpan = document.getElementById('userNameDisplay');
  const logoutBtn    = document.getElementById('logoutBtn');
  const loginBtn     = document.getElementById('abrirLoginBtn');
  const adminLink    = document.getElementById('adminNavLink');
  if (usuario) {
    const label = isAdmin() ? ADMIN_USER : '👤 ' + usuario.nombre;
    if (userNameSpan) userNameSpan.textContent = label;
    if (logoutBtn)  logoutBtn.style.display  = 'block';
    if (loginBtn)   loginBtn.style.display   = 'none';
    if (adminLink)  adminLink.style.display  = isAdmin() ? 'inline-block' : 'none';
  } else {
    if (userNameSpan) userNameSpan.textContent = '';
    if (logoutBtn)  logoutBtn.style.display  = 'none';
    if (loginBtn)   loginBtn.style.display   = 'inline-block';
    if (adminLink)  adminLink.style.display  = 'none';
  }
}

function calcularDias(fechaIngreso, fechaSalida) {
  const diff = new Date(fechaSalida) - new Date(fechaIngreso);
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function crearReserva(reservaData) {
  const usuario = getUsuarioActual();
  if (!usuario) { showToast('Debes iniciar sesión para reservar.', 'warning'); return false; }
  const reservas = getReservas();
  const nuevaReserva = {
    id: Date.now(),
    usuarioId: usuario.id,
    usuarioNombre: usuario.nombre,
    ...reservaData,
    estado: 'pendiente',
    fechaReserva: new Date().toISOString()
  };
  reservas.push(nuevaReserva);
  setReservas(reservas);
  const habitacion = habitaciones.find(h => h.id === reservaData.habitacionId);
  if (habitacion) habitacion.disponible = false;
  const idText = reservaData.tipoDocumento === 'pasaporte'
    ? `Pasaporte: ${reservaData.pasaporte} (${reservaData.paisPasaporte})`
    : `Cédula: ${reservaData.cedula}`;
  const detallesHTML = `
    <strong>Habitación:</strong> ${reservaData.habitacionNombre}<br>
    <strong>Precio por noche:</strong> C$${reservaData.precioPorNoche}<br>
    <strong>Entrada:</strong> ${reservaData.fechaIngreso} | <strong>Salida:</strong> ${reservaData.fechaSalida}<br>
    <strong>Días:</strong> ${reservaData.dias} | <strong>Huéspedes:</strong> ${reservaData.huespedes}<br>
    <strong>TOTAL:</strong> C$${reservaData.total}<br><br>
    <div style="border-top:1px solid #e4e4e7;margin:0.8rem 0;padding-top:0.8rem;">
      <strong>👤 Huésped:</strong><br>${reservaData.nombres} ${reservaData.apellidos}<br>${idText}<br>
      ${reservaData.nacionalidad} · ${reservaData.procedencia}
    </div>`;
  document.getElementById('reservaExitosaDetalles').innerHTML = detallesHTML;
  document.getElementById('mensajeImportanteReserva').textContent =
    `¡IMPORTANTE! El día ${reservaData.fechaIngreso} debe presentarse a realizar el pago.`;
  return true;
}

// Cancelar reserva (huésped)
function cancelarReserva(reservaId) {
  let reservas = getReservas();
  const reserva = reservas.find(r => r.id === reservaId);
  if (!reserva) { showToast('Reserva no encontrada.', 'error'); return; }
  const habitacion = habitaciones.find(h => h.id === reserva.habitacionId);
  if (habitacion) habitacion.disponible = true;
  reservas = reservas.filter(r => r.id !== reservaId);
  setReservas(reservas);
  showToast(`Reserva de ${reserva.habitacionNombre} cancelada.`, 'info');
  const misReservasPopup = document.getElementById('misReservasPopup');
  if (misReservasPopup && misReservasPopup.style.display === 'flex') mostrarMisReservas();
  renderRooms(currentFilter);
}

// Reconciliar disponibilidad desde localStorage al cargar la página
function reconciliarDisponibilidad() {
  const reservas = getReservas();
  habitaciones.forEach(h => {
    const activa = reservas.find(r =>
      r.habitacionId === h.id && (r.estado === 'pendiente' || r.estado === 'activo' || !r.estado)
    );
    h.disponible = !activa;
  });
}

// RENDERIZAR HABITACIONES
let habitacionSeleccionada = null;
let currentFilter = "all";

function renderRooms(filter = "all") {
  const container = document.getElementById('roomsContainer');
  if (!container) return;
  let filtered = habitaciones;
  if (filter === "estandar") filtered = habitaciones.filter(r => r.precio >= 400 && r.precio <= 500);
  else if (filter === "familiares") filtered = habitaciones.filter(r => r.precio >= 550 && r.precio <= 900);
  else if (filter === "aire") filtered = habitaciones.filter(r => r.aire === true);
  if (filtered.length === 0) { container.innerHTML = '<div style="text-align:center; padding:3rem;">🚫 No hay habitaciones en esta categoría</div>'; return; }
  container.innerHTML = filtered.map(room => {
    let extra = [];
    if (room.televisor) extra.push("TV");
    if (room.aire) extra.push("Aire Acondicionado");
    else extra.push("Ventilador");
    let img = "IMG/Hotel Costa Sur.jpeg"; // Imagen por defecto
    const id = room.id;
    if ([1, 2, 4, 16].includes(id)) img = "IMG/habitaciones/Habitacion  1,2,4,16.jpeg";
    else if (id === 19) img = "IMG/habitaciones/Habitación 19.jpeg";
    else if (id === 21) img = "IMG/habitaciones/Habitación 21 .jpeg";
    else if ([3, 5, 6, 15, 17, 18].includes(id)) img = "IMG/habitaciones/Habitación 3, 5, 6, 15, 17, 18.jpeg";
    else if ([7, 8, 22].includes(id)) img = "IMG/habitaciones/Habitación 7, 8, 22.jpeg";
    else if ([9, 10, 11, 12, 13, 14].includes(id)) img = "IMG/habitaciones/Habitación 9, 10 11, 12, 13, 14.jpeg";
    else if ([23, 24, 25].includes(id)) img = "IMG/habitaciones/Habitación Aire acondicionado 23, 24, 25.jpeg";
    
    const allFeatures = [...room.caracteristicas, ...extra];
    
    const featuresHtml = allFeatures.map(f => {
      let iconHTML = `<span style="color: #888; margin-right: 4px;">✓</span>`;
      return `<span class="feature-tag">${iconHTML}${f}</span>`;
    }).join('');

    return `<div class="room-card" data-room-id="${room.id}">
      <div class="room-card__img-container">
        <img src="${img}" class="room-card__img">
        ${room.disponible ? '<div class="room-badge">✓ Disponible</div>' : '<div class="room-badge" style="background:var(--gris-texto)">✗ Reservado</div>'}
      </div>
      <div class="room-card__content">
        <h3 class="room-card__title">${room.nombre}</h3>
        <p class="room-card__subtitle">${room.tipo}</p>
        <div class="room-card__features">${featuresHtml}</div>
        
        <div class="room-card__footer">
          <div class="room-card__price-new">
            <strong>C$${room.precio}</strong><span>/noche</span>
          </div>
          <button class="room-card__btn-new" onclick="seleccionarHabitacion(${room.id}, '${room.nombre} - ${room.tipo}', ${room.precio})" ${!room.disponible ? 'disabled' : ''}>${room.disponible ? 'Reservar' : 'No disponible'}</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

window.seleccionarHabitacion = function(id, nombre, precio) {
  const usuario = getUsuarioActual();
  if (!usuario) { alert("⚠️ Debes iniciar sesión para reservar."); mostrarPopup('loginPopup'); return; }
  habitacionSeleccionada = { id, nombre, precio };
  document.getElementById('reservaHabitacionInfo').textContent = `${nombre} - C$${precio} por noche`;
  mostrarPopup('reservaPopup');
};

function setupFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => btn.addEventListener('click', () => {
    btns.forEach(b => b.classList.remove('filter-btn--active'));
    btn.classList.add('filter-btn--active');
    currentFilter = btn.dataset.filter;
    renderRooms(currentFilter);
  }));
}

// FUNCIONES DE POPUPS CON BLOQUEO DE SCROLL
function blockBodyScroll(block) {
  if (block) { document.body.classList.add('popup-open'); }
  else { document.body.classList.remove('popup-open'); }
}

function mostrarPopup(id) {
  const p = document.getElementById(id);
  if (p) { p.style.display = 'flex'; blockBodyScroll(true); }
}

function cerrarPopup(id) {
  const p = document.getElementById(id);
  if (p) p.style.display = 'none';
  const anyOpen = Array.from(document.querySelectorAll('.popup')).some(pop => pop.style.display === 'flex');
  if (!anyOpen) blockBodyScroll(false);
}

document.addEventListener('click', function(e) {
  if (e.target.classList && e.target.classList.contains('popup')) {
    e.target.style.display = 'none';
    const anyOpen = Array.from(document.querySelectorAll('.popup')).some(pop => pop.style.display === 'flex');
    if (!anyOpen) blockBodyScroll(false);
  }
});

function mostrarMisReservas() {
  const usuario = getUsuarioActual();
  if (!usuario) { alert("Debes iniciar sesión."); mostrarPopup('loginPopup'); return; }
  const reservas = getReservas().filter(r => r.usuarioId === usuario.id);
  const container = document.getElementById('misReservasContent');
  if (reservas.length === 0) {
    container.innerHTML = '<p style="text-align:center; padding:2rem;">📭 No tienes reservas aún.</p>';
  } else {
    container.innerHTML = reservas.map(r => `
      <div style="border:1px solid #ddd; margin-bottom:1rem; padding:1rem; border-radius:12px;">
        <strong>${r.habitacionNombre}</strong><br>
        Entrada: ${r.fechaIngreso} | Salida: ${r.fechaSalida}<br>
        Días: ${r.dias} | Total: C$${r.total}<br>
        Huésped: ${r.nombres} ${r.apellidos}
        <div style="margin-top: 0.8rem;">
          <button class="popup__btn popup__btn--cerrar" style="padding: 0.4rem 1rem; font-size: 0.8rem;" onclick="cancelarReserva(${r.id})">Cancelar reserva</button>
        </div>
      </div>
    `).join('');
  }
  mostrarPopup('misReservasPopup');
}

// =================== PANEL ADMINISTRADOR ===================
function mostrarAdmin() {
  if (!isAdmin()) { showToast('Acceso denegado.', 'error'); return; }
  renderAdminPanel();
  mostrarPopup('adminPopup');
}

function renderAdminPanel() {
  document.getElementById('adminContent').innerHTML = `
    <div class="admin-tabs" id="adminTabsBar">
      <button class="admin-tab active" onclick="switchAdminTab('dashboard',this)">📊 Dashboard</button>
      <button class="admin-tab" onclick="switchAdminTab('habitaciones',this)">🏨 Habitaciones</button>
      <button class="admin-tab" onclick="switchAdminTab('reservas',this)">📋 Reservas</button>
      <button class="admin-tab" onclick="switchAdminTab('usuarios',this)">👥 Usuarios</button>
    </div>
    <div id="adminTabContent" style="margin-top:1.2rem;"></div>`;
  switchAdminTab('dashboard', document.querySelector('.admin-tab.active'));
}

window.switchAdminTab = function(tab, btn) {
  document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const content = document.getElementById('adminTabContent');
  const reservas = getReservas();
  const users    = getUsuarios();

  if (tab === 'dashboard') {
    const pendientes  = reservas.filter(r => !r.estado || r.estado === 'pendiente').length;
    const activas     = reservas.filter(r => r.estado === 'activo').length;
    const completadas = reservas.filter(r => r.estado === 'completado').length;
    const libres      = habitaciones.filter(h => h.disponible).length;
    content.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1rem;margin-bottom:1.5rem;">
        <div class="adm-stat" style="background:#f0f7ff;"><div class="adm-num" style="color:#0056b3;">${users.length}</div><div class="adm-lbl">Usuarios registrados</div></div>
        <div class="adm-stat" style="background:#f9f9f9;"><div class="adm-num">${reservas.length}</div><div class="adm-lbl">Reservas totales</div></div>
        <div class="adm-stat" style="background:#fffbe6;"><div class="adm-num" style="color:#d48806;">${pendientes}</div><div class="adm-lbl">Pendientes de llegada</div></div>
        <div class="adm-stat" style="background:#f0fff4;"><div class="adm-num" style="color:#00C853;">${activas}</div><div class="adm-lbl">Huéspedes activos</div></div>
        <div class="adm-stat" style="background:#f9f0ff;"><div class="adm-num" style="color:#9254de;">${completadas}</div><div class="adm-lbl">Completadas</div></div>
        <div class="adm-stat" style="background:#f0fff4;"><div class="adm-num" style="color:#00C853;">${libres}</div><div class="adm-lbl">Habitaciones libres</div></div>
      </div>
      <p style="text-align:center;color:#5A6B7A;font-size:0.9rem;">Usa las pestañas para gestionar habitaciones, reservas y usuarios.</p>`;

  } else if (tab === 'habitaciones') {
    content.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:1rem;">${
      habitaciones.map(h => {
        const r = reservas.find(r => r.habitacionId === h.id && (r.estado === 'pendiente' || r.estado === 'activo' || !r.estado));
        const estado = r ? (r.estado === 'activo' ? 'activo' : 'pendiente') : 'libre';
        const col = estado==='libre'?'#00C853':estado==='activo'?'#2196F3':'#FF9800';
        const lbl = estado==='libre'?'✓ Libre':estado==='activo'?'🔑 Ocupado':'📅 Reservado';
        return `<div style="background:white;border-radius:14px;padding:1rem;border:2px solid ${col}25;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.4rem;">
            <strong style="font-size:.95rem;">${h.nombre}</strong>
            <span style="background:${col}18;color:${col};padding:.2rem .6rem;border-radius:20px;font-size:.72rem;font-weight:700;">${lbl}</span>
          </div>
          <div style="font-size:.78rem;color:#5A6B7A;margin-bottom:.7rem;">${h.tipo} · C$${h.precio}/noche</div>
          ${r ? `<div style="background:#f9f9f9;border-radius:8px;padding:.5rem;font-size:.76rem;margin-bottom:.7rem;">
            <strong>Huésped:</strong> ${r.nombres} ${r.apellidos}<br>
            <strong>Entrada:</strong> ${r.fechaIngreso} · <strong>Salida:</strong> ${r.fechaSalida}
          </div>
          ${estado==='pendiente'?`<button onclick="adminCheckIn(${r.id})" class="adm-btn-green">✅ Check-in · Confirmar pago</button>`:''}
          ${estado==='activo'?`<button onclick="adminCheckOut(${r.id})" class="adm-btn-blue">🚪 Check-out · Liberar</button>`:''}
          ` : `<div style="font-size:.8rem;color:#00C853;font-weight:600;">Disponible para reservar</div>`}
        </div>`;
      }).join('')}</div>`;

  } else if (tab === 'reservas') {
    content.innerHTML = `
      <input type="text" id="searchRes" placeholder="🔍 Buscar por huésped, habitación, cédula..." oninput="filtrarTablaReservas(this.value)"
        style="width:100%;padding:.7rem 1rem;border:1px solid #e4e4e7;border-radius:30px;font-family:inherit;font-size:.9rem;outline:none;margin-bottom:1rem;">
      <div id="resTable">${buildReservasTable(reservas)}</div>`;

  } else if (tab === 'usuarios') {
    content.innerHTML = `
      <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:center;margin-bottom:1rem;">
        <input type="text" id="searchUsr" placeholder="🔍 Buscar usuario..." oninput="filtrarTablaUsuarios(this.value)"
          style="flex:1;min-width:200px;padding:.7rem 1rem;border:1px solid #e4e4e7;border-radius:30px;font-family:inherit;font-size:.9rem;outline:none;">
        <button onclick="formNuevoUsuario()" style="padding:.7rem 1.4rem;background:#0056b3;color:white;border:none;border-radius:30px;cursor:pointer;font-weight:600;white-space:nowrap;">+ Crear usuario</button>
      </div>
      <div id="usrTable">${buildUsuariosTable(users)}</div>`;
  }
};

// ─── Helpers de tabla ────────────────────────────────────────
function buildReservasTable(reservas) {
  if (!reservas.length) return '<p style="text-align:center;padding:2rem;color:#999;">No hay reservas registradas.</p>';
  const estLabel = e => e==='activo'?'🔑 Activo':e==='completado'?'✅ Completado':'📅 Pendiente';
  const estCol   = e => e==='activo'?'#2196F3':e==='completado'?'#00C853':'#FF9800';
  return `<div style="overflow-x:auto;"><table class="adm-table"><thead><tr>
    <th>Habitación</th><th>Huésped</th><th>Cédula/Pasaporte</th>
    <th>Entrada</th><th>Salida</th><th>Días</th><th>Total</th><th>Estado</th><th>Acciones</th>
  </tr></thead><tbody>${reservas.map(r=>`<tr>
    <td><strong>${r.habitacionNombre}</strong></td>
    <td>${r.nombres} ${r.apellidos}<br><small style="color:#888;">${r.usuarioNombre}</small></td>
    <td style="font-size:.8rem;">${r.cedula||r.pasaporte||'—'}</td>
    <td>${r.fechaIngreso}</td><td>${r.fechaSalida}</td>
    <td>${r.dias}</td><td><strong>C$${r.total}</strong></td>
    <td><span style="background:${estCol(r.estado)}18;color:${estCol(r.estado)};padding:.2rem .6rem;border-radius:20px;font-size:.75rem;font-weight:700;">${estLabel(r.estado)}</span></td>
    <td><button onclick="adminEliminarReserva(${r.id})" style="background:#FF1744;color:white;border:none;padding:.3rem .8rem;border-radius:20px;cursor:pointer;font-size:.78rem;">🗑 Eliminar</button></td>
  </tr>`).join('')}</tbody></table></div>`;
}

function buildUsuariosTable(users) {
  if (!users.length) return '<p style="text-align:center;padding:2rem;color:#999;">No hay usuarios registrados.</p>';
  return `<div style="overflow-x:auto;"><table class="adm-table"><thead><tr>
    <th>Usuario</th><th>Email</th><th>Fecha registro</th><th>Reservas</th><th>Acciones</th>
  </tr></thead><tbody>${users.map(u=>{
    const numRes = getReservas().filter(r=>r.usuarioId===u.id).length;
    return `<tr>
      <td><strong>${u.nombre}</strong></td>
      <td>${u.email}</td>
      <td style="font-size:.82rem;">${new Date(u.fechaRegistro).toLocaleDateString('es-NI')}</td>
      <td style="text-align:center;">${numRes}</td>
      <td style="display:flex;gap:.4rem;flex-wrap:wrap;">
        <button onclick="formEditarUsuario('${u.id}')" style="background:#0056b3;color:white;border:none;padding:.3rem .7rem;border-radius:20px;cursor:pointer;font-size:.78rem;">✏️ Editar</button>
        <button onclick="adminEliminarUsuario('${u.id}')" style="background:#FF1744;color:white;border:none;padding:.3rem .7rem;border-radius:20px;cursor:pointer;font-size:.78rem;">🗑 Eliminar</button>
      </td>
    </tr>`;
  }).join('')}</tbody></table></div>`;
}

// ─── Filtros en vivo ─────────────────────────────────────────
window.filtrarTablaReservas = function(q) {
  const term = q.toLowerCase();
  const filtered = getReservas().filter(r =>
    `${r.nombres} ${r.apellidos} ${r.habitacionNombre} ${r.cedula||''} ${r.pasaporte||''}`.toLowerCase().includes(term)
  );
  document.getElementById('resTable').innerHTML = buildReservasTable(filtered);
};

window.filtrarTablaUsuarios = function(q) {
  const term = q.toLowerCase();
  const filtered = getUsuarios().filter(u =>
    `${u.nombre} ${u.email}`.toLowerCase().includes(term)
  );
  document.getElementById('usrTable').innerHTML = buildUsuariosTable(filtered);
};

// ─── Check-in / Check-out ────────────────────────────────────
window.adminCheckIn = function(reservaId) {
  if (!confirm('¿Confirmar que el huésped pagó y realizó el check-in?')) return;
  const reservas = getReservas();
  const idx = reservas.findIndex(r => r.id === reservaId);
  if (idx === -1) { showToast('Reserva no encontrada.', 'error'); return; }
  reservas[idx].estado = 'activo';
  reservas[idx].fechaCheckIn = new Date().toISOString();
  setReservas(reservas);
  showToast(`✅ Check-in confirmado para ${reservas[idx].nombres} ${reservas[idx].apellidos}`, 'success');
  switchAdminTab('habitaciones', document.querySelectorAll('.admin-tab')[1]);
};

window.adminCheckOut = function(reservaId) {
  if (!confirm('¿Confirmar check-out y liberar la habitación?')) return;
  const reservas = getReservas();
  const idx = reservas.findIndex(r => r.id === reservaId);
  if (idx === -1) { showToast('Reserva no encontrada.', 'error'); return; }
  reservas[idx].estado = 'completado';
  reservas[idx].fechaCheckOut = new Date().toISOString();
  setReservas(reservas);
  const hab = habitaciones.find(h => h.id === reservas[idx].habitacionId);
  if (hab) hab.disponible = true;
  renderRooms(currentFilter);
  showToast(`🚪 Check-out realizado. Habitación ${reservas[idx].habitacionNombre} liberada.`, 'info');
  switchAdminTab('habitaciones', document.querySelectorAll('.admin-tab')[1]);
};

// ─── CRUD Reservas ───────────────────────────────────────────
window.adminEliminarReserva = function(reservaId) {
  if (!confirm('¿Eliminar esta reserva definitivamente?')) return;
  let reservas = getReservas();
  const r = reservas.find(r => r.id === reservaId);
  if (!r) return;
  const hab = habitaciones.find(h => h.id === r.habitacionId);
  if (hab && r.estado !== 'completado') hab.disponible = true;
  setReservas(reservas.filter(r => r.id !== reservaId));
  renderRooms(currentFilter);
  showToast('Reserva eliminada.', 'info');
  switchAdminTab('reservas', document.querySelectorAll('.admin-tab')[2]);
};

// ─── CRUD Usuarios ───────────────────────────────────────────
window.adminEliminarUsuario = function(userId) {
  if (!confirm('¿Eliminar este usuario? Sus reservas no se eliminarán.')) return;
  setUsuarios(getUsuarios().filter(u => String(u.id) !== String(userId)));
  showToast('Usuario eliminado.', 'info');
  switchAdminTab('usuarios', document.querySelectorAll('.admin-tab')[3]);
};

window.formNuevoUsuario = function() {
  const c = document.getElementById('adminTabContent');
  c.insertAdjacentHTML('afterbegin', `
    <div id="userForm" style="background:#f0f7ff;border-radius:14px;padding:1.2rem;margin-bottom:1rem;border:1px solid #bcd4f7;">
      <strong style="font-size:1rem;">➕ Nuevo Usuario</strong>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.8rem;margin-top:.8rem;">
        <input id="fnNombre" placeholder="Nombre de usuario" style="padding:.6rem;border:1px solid #ddd;border-radius:8px;font-family:inherit;">
        <input id="fnEmail" type="email" placeholder="Correo electrónico" style="padding:.6rem;border:1px solid #ddd;border-radius:8px;font-family:inherit;">
        <input id="fnPass" type="password" placeholder="Contraseña (mín. 8 chars)" style="padding:.6rem;border:1px solid #ddd;border-radius:8px;font-family:inherit;">
      </div>
      <div style="display:flex;gap:.6rem;margin-top:.8rem;">
        <button onclick="adminCrearUsuario()" style="padding:.5rem 1.2rem;background:#0056b3;color:white;border:none;border-radius:20px;cursor:pointer;font-weight:600;">Crear</button>
        <button onclick="document.getElementById('userForm').remove()" style="padding:.5rem 1.2rem;background:#e4e4e7;border:none;border-radius:20px;cursor:pointer;">Cancelar</button>
      </div>
    </div>`);
};

window.adminCrearUsuario = function() {
  const nombre = document.getElementById('fnNombre')?.value.trim();
  const email  = document.getElementById('fnEmail')?.value.trim();
  const pass   = document.getElementById('fnPass')?.value;
  if (!nombre || !email || !pass) { showToast('Completa todos los campos.', 'warning'); return; }
  if (pass.length < 8) { showToast('Contraseña mínimo 8 caracteres.', 'error'); return; }
  const usuarios = getUsuarios();
  if (usuarios.find(u => u.email.toLowerCase() === email.toLowerCase())) { showToast('Correo ya registrado.', 'warning'); return; }
  if (usuarios.find(u => u.nombre.toLowerCase() === nombre.toLowerCase())) { showToast('Usuario ya existe.', 'warning'); return; }
  usuarios.push({ id: Date.now(), nombre, email, password: pass, fechaRegistro: new Date().toISOString() });
  setUsuarios(usuarios);
  showToast(`Usuario "${nombre}" creado exitosamente.`, 'success');
  switchAdminTab('usuarios', document.querySelectorAll('.admin-tab')[3]);
};

window.formEditarUsuario = function(userId) {
  const usuarios = getUsuarios();
  const u = usuarios.find(u => String(u.id) === String(userId));
  if (!u) return;
  const c = document.getElementById('adminTabContent');
  c.insertAdjacentHTML('afterbegin', `
    <div id="userEditForm" style="background:#fff9e6;border-radius:14px;padding:1.2rem;margin-bottom:1rem;border:1px solid #ffe58f;">
      <strong style="font-size:1rem;">✏️ Editar: ${u.nombre}</strong>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.8rem;margin-top:.8rem;">
        <input id="feNombre" value="${u.nombre}" placeholder="Nombre" style="padding:.6rem;border:1px solid #ddd;border-radius:8px;font-family:inherit;">
        <input id="feEmail" value="${u.email}" type="email" placeholder="Email" style="padding:.6rem;border:1px solid #ddd;border-radius:8px;font-family:inherit;">
        <input id="fePass" type="password" placeholder="Nueva contraseña (dejar vacío para no cambiar)" style="padding:.6rem;border:1px solid #ddd;border-radius:8px;font-family:inherit;">
      </div>
      <div style="display:flex;gap:.6rem;margin-top:.8rem;">
        <button onclick="adminGuardarEdicion('${userId}')" style="padding:.5rem 1.2rem;background:#E8B86B;color:#1E2A32;border:none;border-radius:20px;cursor:pointer;font-weight:600;">Guardar</button>
        <button onclick="document.getElementById('userEditForm').remove()" style="padding:.5rem 1.2rem;background:#e4e4e7;border:none;border-radius:20px;cursor:pointer;">Cancelar</button>
      </div>
    </div>`);
};

window.adminGuardarEdicion = function(userId) {
  const nombre = document.getElementById('feNombre')?.value.trim();
  const email  = document.getElementById('feEmail')?.value.trim();
  const pass   = document.getElementById('fePass')?.value;
  if (!nombre || !email) { showToast('Nombre y email son obligatorios.', 'warning'); return; }
  const usuarios = getUsuarios();
  const idx = usuarios.findIndex(u => String(u.id) === String(userId));
  if (idx === -1) return;
  usuarios[idx].nombre = nombre;
  usuarios[idx].email  = email;
  if (pass && pass.length >= 8) usuarios[idx].password = pass;
  else if (pass && pass.length < 8) { showToast('Contraseña mínimo 8 caracteres.', 'error'); return; }
  setUsuarios(usuarios);
  showToast(`Usuario "${nombre}" actualizado.`, 'success');
  switchAdminTab('usuarios', document.querySelectorAll('.admin-tab')[3]);
};

// CHATBOT FAQ
function initChatbot() {
  const toggle = document.getElementById('chatbotToggle');
  const windowChat = document.getElementById('chatbotWindow');
  const closeChat = document.getElementById('chatbotClose');
  const faqBtns = document.querySelectorAll('.chatbot__faq-buttons button');
  const messagesDiv = document.getElementById('chatMessages');
  const respuestas = {
    horarios: "⏰ Check-in: desde las 2:00 PM. Check-out: antes de las 12:00 PM.",
    precios: "💰 Habitaciones económicas: C$350-500, familiares: C$550-900, con AA: C$1100 por noche.",
    servicios: "🍳 No incluimos desayuno, pero hay opciones cerca del hotel.",
    wifi: "📶 Sí, WiFi gratuito en todas las áreas del hotel.",
    mascotas: "🐾 Lo sentimos, no aceptamos mascotas.",
    reservas: "📅 Para reservar, inicia sesión y haz clic en 'Reservar ahora' en cualquier habitación."
  };
  toggle?.addEventListener('click', () => windowChat?.classList.toggle('active'));
  closeChat?.addEventListener('click', () => windowChat?.classList.remove('active'));
  faqBtns.forEach(btn => btn.addEventListener('click', () => {
    const key = btn.dataset.question;
    const respuesta = respuestas[key] || "❓ No tengo esa información. Llama al +505 8853 6728.";
    const msg = document.createElement('div'); msg.className = 'bot-msg'; msg.textContent = respuesta;
    messagesDiv.appendChild(msg); messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }));
}

// EVENTOS PRINCIPALES
document.addEventListener('DOMContentLoaded', () => {
  initData();
  reconciliarDisponibilidad();
  renderRooms("all");
  setupFilters();
  actualizarHeaderUsuario();
  initChatbot();

  // ── Registro ──────────────────────────────────────────
  document.getElementById('registroForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('regNombre').value.trim();
    const email  = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const datos = { nombre, email, password };
    if (registrarUsuario(datos)) {
      cerrarPopup('registroPopup');
      document.getElementById('registroForm').reset();
      // Abrir login automáticamente para que inicie sesión de inmediato
      mostrarPopup('loginPopup');
    }
  });

  // ── Login ─────────────────────────────────────────────
  document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const usuario  = document.getElementById('loginUsuario').value.trim();
    const password = document.getElementById('loginPassword').value;
    const result = loginUsuario(usuario, password);
    if (result) {
      cerrarPopup('loginPopup');
      document.getElementById('loginForm').reset();
      if (result === 'admin') mostrarAdmin();
    }
  });

  // ── Formulario de Reserva ─────────────────────────────
  const reservaForm = document.getElementById('popupForm');
  if (reservaForm) {
    const actualizarTotal = () => {
      const ingreso = document.getElementById('fechaIngreso').value;
      const salida  = document.getElementById('fechaSalida').value;
      if (ingreso && salida && habitacionSeleccionada) {
        const dias = calcularDias(ingreso, salida);
        document.getElementById('diasEstancia').value = dias > 0 ? dias : 0;
        document.getElementById('totalPago').value = dias > 0
          ? `C$ ${(habitacionSeleccionada.precio * dias).toFixed(2)}`
          : '';
      }
    };
    document.getElementById('fechaIngreso')?.addEventListener('change', actualizarTotal);
    document.getElementById('fechaSalida')?.addEventListener('change', actualizarTotal);

    // Toggle tipo de documento
    document.getElementById('tipoDocumento')?.addEventListener('change', (e) => {
      const isPasaporte = e.target.value === 'pasaporte';
      document.getElementById('containerCedula').style.display   = isPasaporte ? 'none'  : 'block';
      document.getElementById('cedula').required                 = !isPasaporte;
      document.getElementById('containerPasaporte').style.display= isPasaporte ? 'flex'  : 'none';
      document.getElementById('paisPasaporte').required          = isPasaporte;
      document.getElementById('pasaporte').required              = isPasaporte;
    });

    // Auto-formato de cédula nicaragüense
    document.getElementById('cedula')?.addEventListener('input', (e) => {
      let val = e.target.value.toUpperCase().replace(/[^0-9A-Z]/g, '');
      if (val.length > 14) val = val.slice(0, 14);
      let formatted = val.substring(0, 3);
      if (val.length > 3) formatted += '-' + val.substring(3, 9);
      if (val.length > 9) formatted += '-' + val.substring(9, 14);
      e.target.value = formatted;
    });

    reservaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!habitacionSeleccionada) { showToast('Selecciona una habitación primero.', 'warning'); return; }

      const tipoDoc    = document.getElementById('tipoDocumento').value;
      const camposBase = ['nombres','apellidos','sexo','fechaNacimiento','nacionalidad',
                          'procedencia','fechaIngreso','fechaSalida','numHuespedes','metodoPago'];
      if (tipoDoc === 'pasaporte') camposBase.push('paisPasaporte','pasaporte');
      else camposBase.push('cedula');

      for (const id of camposBase) {
        if (!document.getElementById(id)?.value) {
          showToast('Completa todos los campos requeridos.', 'warning'); return;
        }
      }

      // Validación de documentos
      if (tipoDoc === 'pasaporte') {
        const pais      = document.getElementById('paisPasaporte').value;
        const pasaporte = document.getElementById('pasaporte').value.trim().toUpperCase();
        const reglas    = {
          "Belice": /^[A-Z0-9]{6,12}$/, "Costa Rica": /^[A-Z0-9]{7,12}$/,
          "El Salvador": /^[A-Z][0-9]{8}$/, "Guatemala": /^[A-Z0-9]{8,13}$/,
          "Honduras": /^[A-Z0-9]{9,13}$/, "Nicaragua": /^[A-Z]?[0-9]{7,8}$/,
          "Panamá": /^[A-Z0-9-]{7,15}$/
        };
        if (reglas[pais] && !reglas[pais].test(pasaporte)) {
          showToast(`Formato de pasaporte inválido para ${pais}.`, 'error'); return;
        }
      } else {
        const cedula = document.getElementById('cedula').value.trim();
        if (!/^\d{3}-\d{6}-\d{4}[A-Z]$/.test(cedula)) {
          showToast('Cédula inválida. Formato: 000-000000-0000X', 'error'); return;
        }
      }

      const dias = calcularDias(
        document.getElementById('fechaIngreso').value,
        document.getElementById('fechaSalida').value
      );
      if (dias <= 0) { showToast('La fecha de salida debe ser posterior a la entrada.', 'error'); return; }

      const reservaData = {
        habitacionId:    habitacionSeleccionada.id,
        habitacionNombre:habitacionSeleccionada.nombre,
        precioPorNoche:  habitacionSeleccionada.precio,
        tipoDocumento:   tipoDoc,
        cedula:          document.getElementById('cedula').value,
        paisPasaporte:   document.getElementById('paisPasaporte')?.value || '',
        pasaporte:       document.getElementById('pasaporte')?.value || '',
        nombres:         document.getElementById('nombres').value,
        apellidos:       document.getElementById('apellidos').value,
        sexo:            document.getElementById('sexo').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        nacionalidad:    document.getElementById('nacionalidad').value,
        procedencia:     document.getElementById('procedencia').value,
        fechaIngreso:    document.getElementById('fechaIngreso').value,
        fechaSalida:     document.getElementById('fechaSalida').value,
        dias,
        huespedes:       parseInt(document.getElementById('numHuespedes').value),
        metodoPago:      document.getElementById('metodoPago').value,
        total:           habitacionSeleccionada.precio * dias
      };
      if (crearReserva(reservaData)) {
        cerrarPopup('reservaPopup');
        reservaForm.reset();
        habitacionSeleccionada = null;
        renderRooms(currentFilter);
        mostrarPopup('reservaExitosaPopup');
      }
    });
  }

  // ── Botones de cierre (limpian formularios al cerrar) ─
  const closeIds = [
    'closeRegistroPopupBtn','cancelRegistroBtn',
    'closeLoginPopupBtn','cancelLoginBtn',
    'closePopupBtn','cancelPopupBtn',
    'closeDetallePopupBtn','cerrarDetalleBtn',
    'closeMisReservasBtn','closeAdminBtn',
    'closeExitosaPopupBtn','btnAceptarExitosa'
  ];
  closeIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () => {
        const popup = btn.closest('.popup');
        if (popup) {
          cerrarPopup(popup.id);
          popup.querySelectorAll('form').forEach(f => f.reset());
        }
      });
    }
  });

  // ── Navegación entre popups ───────────────────────────
  document.getElementById('irRegistroLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    cerrarPopup('loginPopup');
    document.getElementById('loginForm')?.reset();
    mostrarPopup('registroPopup');
  });
  document.getElementById('irLoginLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    cerrarPopup('registroPopup');
    document.getElementById('registroForm')?.reset();
    mostrarPopup('loginPopup');
  });

  // ── Otros botones ─────────────────────────────────────
  document.getElementById('abrirLoginBtn')?.addEventListener('click', (e) => { e.preventDefault(); mostrarPopup('loginPopup'); });
  document.getElementById('heroReservarBtn')?.addEventListener('click', () => {
    if (!getUsuarioActual()) {
      mostrarPopup('loginPopup');
    } else {
      document.getElementById('habitaciones').scrollIntoView({ behavior: 'smooth' });
      showToast('¡Elige tu habitación ideal!', 'info');
    }
  });
  document.getElementById('misReservasLink')?.addEventListener('click', (e) => { e.preventDefault(); mostrarMisReservas(); });
  document.getElementById('logoutBtn')?.addEventListener('click', logoutUsuario);
  // Enlace admin en nav (solo visible cuando admin está logueado)
  document.getElementById('adminNavLink')?.addEventListener('click', (e) => { e.preventDefault(); mostrarAdmin(); });

  // ── Sorteo / Lead Capture ─────────────────────────────
  const sorteoForm = document.getElementById('sorteoForm');
  if (sorteoForm) {
    sorteoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombres     = document.getElementById('sorteoNombres').value.trim();
      const apellidos   = document.getElementById('sorteoApellidos').value.trim();
      const email       = document.getElementById('sorteoEmail').value.trim();
      const telefono    = document.getElementById('sorteoTelefono').value.trim();
      const departamento= document.getElementById('sorteoDepartamento').value;
      const sexo        = document.getElementById('sorteoSexo').value;
      const edad        = document.getElementById('sorteoEdad').value;
      const ocupacion   = document.getElementById('sorteoOcupacion').value.trim();
      let leads = JSON.parse(localStorage.getItem('sorteoLeads')) || [];
      leads.push({ nombres, apellidos, email, telefono, departamento, sexo, edad, ocupacion, fecha: new Date().toISOString() });
      localStorage.setItem('sorteoLeads', JSON.stringify(leads));
      showToast(`¡Gracias por participar, ${nombres}! 🎉 Te contactaremos si ganas.`, 'success');
      sorteoForm.reset();
    });
  }

  // ── Scroll reveal animación suave ─────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-card, .room-card, .review, .contacto-item').forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
});