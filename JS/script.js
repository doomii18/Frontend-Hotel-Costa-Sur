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

// SISTEMA DE USUARIOS Y RESERVAS (localStorage)
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

function registrarUsuario(datos) {
  const usuarios = getUsuarios();
  // Validar que la contraseña tenga al menos 8 caracteres
  if (datos.password.length < 8) {
    alert("❌ La contraseña debe tener al menos 8 caracteres.");
    return false;
  }
  if (usuarios.find(u => u.email === datos.email)) { 
    alert("⚠️ Este correo ya está registrado."); 
    return false; 
  }
  const nuevoUsuario = { id: Date.now(), ...datos, fechaRegistro: new Date().toISOString() };
  usuarios.push(nuevoUsuario);
  setUsuarios(usuarios);
  alert("✅ ¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.");
  return true;
}

function loginUsuario(nombre, password) {
  const usuarios = getUsuarios();
  const usuario = usuarios.find(u => u.nombre === nombre && u.password === password);
  if (usuario) {
    setUsuarioActual(usuario);
    actualizarHeaderUsuario();
    alert(`¡Bienvenido ${usuario.nombre}!`);
    return true;
  } else { alert("❌ Usuario o contraseña incorrectos."); return false; }
}

function logoutUsuario() {
  if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
    setUsuarioActual(null);
    actualizarHeaderUsuario();
    alert("👋 Has cerrado sesión.");
  }
}

function actualizarHeaderUsuario() {
  const usuario = getUsuarioActual();
  const userNameSpan = document.getElementById('userNameDisplay');
  const logoutBtn = document.getElementById('logoutBtn');
  const loginBtn = document.getElementById('abrirLoginBtn');
  if (usuario) { 
    if (userNameSpan) userNameSpan.textContent = `👤 ${usuario.nombre}`; 
    if (logoutBtn) logoutBtn.style.display = 'block'; 
    if (loginBtn) loginBtn.style.display = 'none';
  }
  else { 
    if (userNameSpan) userNameSpan.textContent = ''; 
    if (logoutBtn) logoutBtn.style.display = 'none'; 
    if (loginBtn) loginBtn.style.display = 'inline-block';
  }
}

function calcularDias(fechaIngreso, fechaSalida) {
  const diff = new Date(fechaSalida) - new Date(fechaIngreso);
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function crearReserva(reservaData) {
  const usuario = getUsuarioActual();
  if (!usuario) { alert("⚠️ Debes iniciar sesión para reservar."); return false; }
  const reservas = getReservas();
  const nuevaReserva = { id: Date.now(), usuarioId: usuario.id, usuarioNombre: usuario.nombre, ...reservaData, fechaReserva: new Date().toISOString() };
  reservas.push(nuevaReserva);
  setReservas(reservas);
  
  const habitacion = habitaciones.find(h => h.id === reservaData.habitacionId);
  if (habitacion) habitacion.disponible = false;
  
  const idText = reservaData.tipoDocumento === 'pasaporte' ? `Pasaporte: ${reservaData.pasaporte} (${reservaData.paisPasaporte})` : `Cédula: ${reservaData.cedula}`;
  
  const detallesHTML = `
    <strong>Habitación:</strong> ${reservaData.habitacionNombre}<br>
    <strong>Precio por noche:</strong> C$${reservaData.precioPorNoche}<br>
    <strong>Entrada:</strong> ${reservaData.fechaIngreso} | <strong>Salida:</strong> ${reservaData.fechaSalida}<br>
    <strong>Días:</strong> ${reservaData.dias} | <strong>Huéspedes:</strong> ${reservaData.huespedes}<br>
    <strong>Método de pago:</strong> Pago presencial en el hotel<br>
    <strong>TOTAL:</strong> C$${reservaData.total}<br><br>
    <div style="border-top: 1px solid #e4e4e7; margin: 0.8rem 0; padding-top: 0.8rem;">
      <strong>👤 Datos del huésped:</strong><br>
      ${reservaData.nombres} ${reservaData.apellidos}<br>
      ${idText}<br>
      ${reservaData.nacionalidad} · ${reservaData.procedencia}
    </div>
  `;
  
  document.getElementById('reservaExitosaDetalles').innerHTML = detallesHTML;
  document.getElementById('mensajeImportanteReserva').textContent = `¡IMPORTANTE! El día ${reservaData.fechaIngreso} debe presentarse a realizar el pago.`;
  return true;
}

// Cancelar reserva
function cancelarReserva(reservaId) {
  if (!confirm("¿Estás seguro de que deseas cancelar esta reserva?")) return;
  
  let reservas = getReservas();
  const reserva = reservas.find(r => r.id === reservaId);
  if (!reserva) {
    alert("Reserva no encontrada.");
    return;
  }
  
  const habitacion = habitaciones.find(h => h.id === reserva.habitacionId);
  if (habitacion) habitacion.disponible = true;
  
  reservas = reservas.filter(r => r.id !== reservaId);
  setReservas(reservas);
  
  alert(`Reserva de ${reserva.habitacionNombre} cancelada correctamente.`);
  
  const misReservasPopup = document.getElementById('misReservasPopup');
  if (misReservasPopup && misReservasPopup.style.display === 'flex') {
    mostrarMisReservas();
  }
  renderRooms(currentFilter);
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

function mostrarAdmin() {
  const reservas = getReservas();
  const users = getUsuarios();
  document.getElementById('adminContent').innerHTML = `<h4>📊 Estadísticas</h4><p>Usuarios: ${users.length}</p><p>Reservas: ${reservas.length}</p><hr><h4>👥 Usuarios</h4>${users.map(u => `<div>👤 ${u.nombre} (${u.email})</div>`).join('')}<hr><h4>📋 Reservas</h4>${reservas.map(r => `<div>${r.habitacionNombre} - ${r.usuarioNombre} - C$${r.total}</div>`).join('')}`;
  mostrarPopup('adminPopup');
}

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
  renderRooms("all");
  setupFilters();
  actualizarHeaderUsuario();
  initChatbot();

  // Registro
  document.getElementById('registroForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('regNombre').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    
    if (!nombre || !email || !password) {
      alert("Completa todos los campos.");
      return;
    }
    if (password.length < 8) {
      alert("❌ La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    const datos = { nombre, email, password };
    if (registrarUsuario(datos)) cerrarPopup('registroPopup');
  });
  
  // Login
  document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const usuario = document.getElementById('loginUsuario').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    if (loginUsuario(usuario, password)) cerrarPopup('loginPopup');
  });
  
  // Reserva
  const reservaForm = document.getElementById('popupForm');
  if (reservaForm) {
    const actualizarTotal = () => {
      const ingreso = document.getElementById('fechaIngreso').value;
      const salida = document.getElementById('fechaSalida').value;
      if (ingreso && salida && habitacionSeleccionada) {
        const dias = calcularDias(ingreso, salida);
        document.getElementById('diasEstancia').value = dias > 0 ? dias : 0;
        if (dias > 0) document.getElementById('totalPago').value = (habitacionSeleccionada.precio * dias).toFixed(2);
        else document.getElementById('totalPago').value = '';
      }
    };
    document.getElementById('fechaIngreso')?.addEventListener('change', actualizarTotal);
    document.getElementById('fechaSalida')?.addEventListener('change', actualizarTotal);
    // Toggle documento
    document.getElementById('tipoDocumento')?.addEventListener('change', (e) => {
      const isPasaporte = e.target.value === 'pasaporte';
      document.getElementById('containerCedula').style.display = isPasaporte ? 'none' : 'block';
      document.getElementById('cedula').required = !isPasaporte;
      
      document.getElementById('containerPasaporte').style.display = isPasaporte ? 'flex' : 'none';
      document.getElementById('paisPasaporte').required = isPasaporte;
      document.getElementById('pasaporte').required = isPasaporte;
    });

    // Formateo automático de cédula
    document.getElementById('cedula')?.addEventListener('input', (e) => {
      let val = e.target.value.toUpperCase().replace(/[^0-9A-Z]/g, '');
      if (val.length > 14) val = val.slice(0, 14);
      let formatted = '';
      if (val.length > 0) formatted += val.substring(0, 3);
      if (val.length > 3) formatted += '-' + val.substring(3, 9);
      if (val.length > 9) formatted += '-' + val.substring(9, 14);
      e.target.value = formatted;
    });

    reservaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!habitacionSeleccionada) { alert("Selecciona una habitación."); return; }
      
      const tipoDoc = document.getElementById('tipoDocumento').value;
      const camposBase = ['nombres','apellidos','sexo','fechaNacimiento','nacionalidad','procedencia','fechaIngreso','fechaSalida','numHuespedes','metodoPago'];
      if (tipoDoc === 'pasaporte') camposBase.push('paisPasaporte', 'pasaporte');
      else camposBase.push('cedula');
      
      for (let id of camposBase) if (!document.getElementById(id).value) { alert("Completa todos los campos requeridos."); return; }
      
      // Validaciones de documentos
      if (tipoDoc === 'pasaporte') {
        const pais = document.getElementById('paisPasaporte').value;
        const pasaporte = document.getElementById('pasaporte').value.trim().toUpperCase();
        const reglasPasaporte = {
          "Belice": /^[A-Z0-9]{6,12}$/,
          "Costa Rica": /^[A-Z0-9]{7,12}$/,
          "El Salvador": /^[A-Z][0-9]{8}$/,
          "Guatemala": /^[A-Z0-9]{8,13}$/,
          "Honduras": /^[A-Z0-9]{9,13}$/,
          "Nicaragua": /^[A-Z]?[0-9]{7,8}$/,
          "Panamá": /^[A-Z0-9-]{7,15}$/
        };
        
        if (reglasPasaporte[pais] && !reglasPasaporte[pais].test(pasaporte)) {
          alert(`El formato del pasaporte no es válido para ${pais}. Verifique que esté correcto y no tenga espacios u otros caracteres inválidos.`);
          return;
        }
      } else {
        const cedula = document.getElementById('cedula').value.trim();
        const cedulaRegex = /^\d{3}-\d{6}-\d{4}[A-Z]$/;
        if (!cedulaRegex.test(cedula)) {
          alert("El formato de la Cédula de Identidad Nicaragüense no es válido.\nDebe ser: 000-000000-0000X (con la última letra en mayúscula).");
          return;
        }
      }

      const dias = calcularDias(document.getElementById('fechaIngreso').value, document.getElementById('fechaSalida').value);
      if (dias <= 0) { alert("La fecha de salida debe ser posterior."); return; }
      const total = habitacionSeleccionada.precio * dias;
      const reservaData = {
        habitacionId: habitacionSeleccionada.id,
        habitacionNombre: habitacionSeleccionada.nombre,
        precioPorNoche: habitacionSeleccionada.precio,
        tipoDocumento: tipoDoc,
        cedula: document.getElementById('cedula').value,
        paisPasaporte: document.getElementById('paisPasaporte')?.value || '',
        pasaporte: document.getElementById('pasaporte')?.value || '',
        nombres: document.getElementById('nombres').value,
        apellidos: document.getElementById('apellidos').value,
        sexo: document.getElementById('sexo').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        nacionalidad: document.getElementById('nacionalidad').value,
        procedencia: document.getElementById('procedencia').value,
        fechaIngreso: document.getElementById('fechaIngreso').value,
        fechaSalida: document.getElementById('fechaSalida').value,
        dias: dias,
        huespedes: parseInt(document.getElementById('numHuespedes').value),
        metodoPago: document.getElementById('metodoPago').value,
        total: total
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
  // Botones de cierre
  const closeIds = ['closeRegistroPopupBtn','cancelRegistroBtn','closeLoginPopupBtn','cancelLoginBtn','closePopupBtn','cancelPopupBtn','closeDetallePopupBtn','cerrarDetalleBtn','closeMisReservasBtn','closeAdminBtn', 'closeExitosaPopupBtn', 'btnAceptarExitosa'];
  closeIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () => {
        const popup = btn.closest('.popup');
        if (popup) cerrarPopup(popup.id);
      });
    }
  });
  document.getElementById('irRegistroLink')?.addEventListener('click', (e) => { e.preventDefault(); cerrarPopup('loginPopup'); mostrarPopup('registroPopup'); });
  document.getElementById('irLoginLink')?.addEventListener('click', (e) => { e.preventDefault(); cerrarPopup('registroPopup'); mostrarPopup('loginPopup'); });
  document.getElementById('abrirLoginBtn')?.addEventListener('click', (e) => { e.preventDefault(); mostrarPopup('loginPopup'); });
  document.getElementById('heroReservarBtn')?.addEventListener('click', () => { if (!getUsuarioActual()) mostrarPopup('loginPopup'); else alert("Selecciona una habitación para reservar."); });
  document.getElementById('misReservasLink')?.addEventListener('click', (e) => { e.preventDefault(); mostrarMisReservas(); });
  document.getElementById('logoutBtn')?.addEventListener('click', logoutUsuario);
  document.querySelector('.header__title')?.addEventListener('dblclick', mostrarAdmin);
  
  // Sorteo / Lead Capture
  const sorteoForm = document.getElementById('sorteoForm');
  if (sorteoForm) {
    sorteoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombres = document.getElementById('sorteoNombres').value.trim();
      const apellidos = document.getElementById('sorteoApellidos').value.trim();
      const email = document.getElementById('sorteoEmail').value.trim();
      const telefono = document.getElementById('sorteoTelefono').value.trim();
      const departamento = document.getElementById('sorteoDepartamento').value;
      const sexo = document.getElementById('sorteoSexo').value;
      const edad = document.getElementById('sorteoEdad').value;
      const ocupacion = document.getElementById('sorteoOcupacion').value.trim();
      let leads = JSON.parse(localStorage.getItem('sorteoLeads')) || [];
      leads.push({ nombres, apellidos, email, telefono, departamento, sexo, edad, ocupacion, fecha: new Date().toISOString() });
      localStorage.setItem('sorteoLeads', JSON.stringify(leads));
      alert("🎉 ¡Gracias por participar, " + nombres + "! Ya estás dentro del sorteo mensual. Te contactaremos por correo si resultas ganador.");
      sorteoForm.reset();
    });
  }

  setTimeout(() => { if (!getUsuarioActual()) mostrarPopup('loginPopup'); }, 3000);
});