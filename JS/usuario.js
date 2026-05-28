// ================================================================
//  usuario.js  — Lógica exclusiva del usuario / huésped
//  Hotel Costa Sur  |  Depende de: data.js
// ================================================================

// =================== ESTADO LOCAL ===================
let habitacionSeleccionada = null;
let currentFilter = "all";

// =================== LISTA COMPLETA DE NACIONALIDADES DEL MUNDO ===================
const NACIONALIDADES = [
  "Afgana","Albanesa","Alemana","Andorrana","Angoleña","Antiguana","Saudí","Argelina","Argentina","Armenia",
  "Australiana","Austriaca","Azerbaiyana","Bahameña","Bangladesí","Barbadense","Bareiní","Belga","Beliceña","Beninesa",
  "Bielorrusa","Birmana","Boliviana","Bosnia","Botswanesa","Brasileña","Bruneana","Búlgara","Burkinesa","Burundesa",
  "Butanesa","Caboverdiana","Camboyana","Camerunesa","Canadiense","Catarí","Chadiana","Checa","Chilena","China",
  "Chipriota","Colombiana","Comorense","Congoleña","Norcoreana","Surcoreana","Costarricense","Croata","Cubana","Danesa",
  "Dominicana","Dominiquesa","Ecuatoguineana","Ecuatoriana","Egipcia","Emiratí","Eritrea","Eslovaca","Eslovena","Española",
  "Estadounidense","Estonia","Etíope","Filipina","Finlandesa","Fiyiana","Francesa","Gabonesa","Gambiana","Georgiana",
  "Ghanesa","Granadina","Griega","Guatemalteca","Guineana","Guyanesa","Haitiana","Hondureña","Húngara","India",
  "Indonesia","Iraquí","Iraní","Irlandesa","Islandesa","Israelí","Italiana","Jamaicana","Japonesa","Jordana",
  "Kazaja","Keniata","Kirguisa","Kiribatiana","Kuwaití","Laosiana","Lesotense","Letona","Libanesa","Liberiana",
  "Libia","Liechtensteiniana","Lituana","Luxemburguesa","Macedonia","Malgache","Malasia","Malauí","Maldiva","Maliense",
  "Maltesa","Marfileña","Marroquí","Mauriciana","Mauritana","Mexicana","Micronesia","Moldava","Monegasca","Mongola",
  "Montenegrina","Mozambiqueña","Namibia","Nauruana","Nepalesa","Nicaragüense","Nigerina","Nigeriana","Noruega",
  "Neozelandesa","Omaní","Neerlandesa","Pakistaní","Palauana","Palestina","Panameña","Papú","Paraguaya","Peruana",
  "Polaca","Portuguesa","Puertorriqueña","Británica","Centroafricana","Ruandesa","Rumana","Rusa","Salvadoreña","Samoana",
  "Sanmarinense","Santotomense","Senegalesa","Serbia","Seychellense","Sierraleonesa","Singapurense","Siria","Somalí",
  "Srilanquesa","Suazi","Sudafricana","Sudanesa","Sueca","Suiza","Surinamesa","Tailandesa","Taiwanesa","Tanzana",
  "Tayika","Timorense","Togolesa","Tongana","Trinitense","Tunecina","Turca","Turkmena","Tuvaluana","Ucraniana",
  "Ugandesa","Uruguaya","Uzbeka","Vanuatuense","Vaticana","Venezolana","Vietnamita","Yemení","Yibutiana","Zambiana",
  "Zimbabuense"
].sort();

// =================== PAÍSES PARA PASAPORTE (emisores) ===================
const PAISES_PASAPORTE = [
  "Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina","Armenia",
  "Australia","Austria","Azerbaiyán","Bahamas","Bangladés","Barbados","Baréin","Bélgica","Belice","Benín",
  "Bielorrusia","Birmania","Bolivia","Bosnia y Herzegovina","Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi",
  "Bután","Cabo Verde","Camboya","Camerún","Canadá","Catar","Chad","Chequia","Chile","China",
  "Chipre","Colombia","Comoras","Congo","Corea del Norte","Corea del Sur","Costa Rica","Croacia","Cuba","Dinamarca",
  "Dominica","Ecuador","Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia","Eslovenia","España","Estados Unidos",
  "Estonia","Etiopía","Filipinas","Finlandia","Fiyi","Francia","Gabón","Gambia","Georgia","Ghana",
  "Granada","Grecia","Guatemala","Guinea","Guyana","Haití","Honduras","Hungría","India","Indonesia",
  "Irak","Irán","Irlanda","Islandia","Israel","Italia","Jamaica","Japón","Jordania","Kazajistán",
  "Kenia","Kirguistán","Kiribati","Kuwait","Laos","Lesoto","Letonia","Líbano","Liberia","Libia",
  "Liechtenstein","Lituania","Luxemburgo","Macedonia del Norte","Madagascar","Malasia","Malaui","Maldivas","Malí","Malta",
  "Marruecos","Mauricio","Mauritania","México","Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Mozambique",
  "Namibia","Nauru","Nepal","Nicaragua","Níger","Nigeria","Noruega","Nueva Zelanda","Omán","Países Bajos",
  "Pakistán","Palaos","Palestina","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Polonia","Portugal","Puerto Rico",
  "Reino Unido","República Centroafricana","República Dominicana","Ruanda","Rumanía","Rusia","Samoa","San Marino",
  "Santo Tomé y Príncipe","Senegal","Serbia","Seychelles","Sierra Leona","Singapur","Siria","Somalia","Sri Lanka",
  "Suazilandia","Sudáfrica","Sudán","Suecia","Suiza","Surinam","Tailandia","Taiwán","Tanzania","Tayikistán",
  "Timor Oriental","Togo","Tonga","Trinidad y Tobago","Túnez","Turquía","Turkmenistán","Tuvalu","Ucrania","Uganda",
  "Uruguay","Uzbekistán","Vanuatu","Vaticano","Venezuela","Vietnam","Yemen","Yibuti","Zambia","Zimbabue"
].sort();

// =================== HEADER ===================
function actualizarHeaderUsuario() {
  const usuario      = getUsuarioActual();
  const userNameSpan = document.getElementById('userNameDisplay');
  const logoutBtn    = document.getElementById('logoutBtn');
  const loginBtn     = document.getElementById('abrirLoginBtn');
  const adminLink    = document.getElementById('adminNavLink');

  if (usuario) {
    const label = isAdmin() ? ADMIN_USER : '👤 ' + usuario.nombre;
    if (userNameSpan) userNameSpan.textContent = label;
    if (logoutBtn)   logoutBtn.style.display   = 'block';
    if (loginBtn)    loginBtn.style.display    = 'none';
    if (adminLink)   adminLink.style.display   = isAdmin() ? 'inline-block' : 'none';
  } else {
    if (userNameSpan) userNameSpan.textContent = '';
    if (logoutBtn)   logoutBtn.style.display   = 'none';
    if (loginBtn)    loginBtn.style.display    = 'inline-block';
    if (adminLink)   adminLink.style.display   = 'none';
  }
}

// =================== RENDERIZAR HABITACIONES ===================
function renderRooms(filter = "all") {
  const container = document.getElementById('roomsContainer');
  if (!container) return;

  if (habitaciones.length === 0) {
    container.innerHTML = '<div style="text-align:center; padding:3rem; grid-column: 1 / -1;"><i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: #0056b3; margin-bottom: 1rem;"></i><br>Cargando habitaciones...</div>';
    return;
  }

  let filtered = habitaciones;
  if (filter === "estandar")   filtered = habitaciones.filter(r => r.precio >= 400 && r.precio <= 500);
  else if (filter === "familiar") filtered = habitaciones.filter(r => r.precio >= 550 && r.precio <= 900);
  else if (filter === "premium")  filtered = habitaciones.filter(r => r.precio >= 1100);

  if (filtered.length === 0) {
    container.innerHTML = '<div style="text-align:center; padding:3rem; grid-column: 1 / -1;">🚫 No hay habitaciones en esta categoría</div>';
    return;
  }

  container.innerHTML = filtered.map(room => {
    let extra = [];
    if (room.televisor) extra.push("TV");
    if (room.aire) extra.push("Aire Acondicionado");
    else extra.push("Ventilador");

    let img = "IMG/Hotel Costa Sur.jpeg";
    const id = room.id;
    if ([1, 2, 4, 16].includes(id))               img = "IMG/habitaciones/Habitacion  1,2,4,16.jpeg";
    else if (id === 19)                            img = "IMG/habitaciones/Habitación 19.jpeg";
    else if (id === 21)                            img = "IMG/habitaciones/Habitación 21 .jpeg";
    else if ([3, 5, 6, 15, 17, 18].includes(id))  img = "IMG/habitaciones/Habitación 3, 5, 6, 15, 17, 18.jpeg";
    else if ([7, 8, 22].includes(id))              img = "IMG/habitaciones/Habitación 7, 8, 22.jpeg";
    else if ([9,10,11,12,13,14].includes(id))      img = "IMG/habitaciones/Habitación 9, 10 11, 12, 13, 14.jpeg";
    else if ([23, 24, 25].includes(id))            img = "IMG/habitaciones/Habitación Aire acondicionado 23, 24, 25.jpeg";

    const allFeatures  = [...room.caracteristicas, ...extra];
    const featuresHtml = allFeatures.map(f =>
      `<span class="feature-tag"><span style="color:#888;margin-right:4px;">✓</span>${f}</span>`
    ).join('');

    return `<div class="room-card" data-room-id="${room.id}">
      <div class="room-card__img-container">
        <img src="${img}" class="room-card__img">
        ${room.disponible
          ? '<div class="room-badge">✓ Disponible</div>'
          : '<div class="room-badge" style="background:var(--gris-texto)">✗ Reservado</div>'}
      </div>
      <div class="room-card__content">
        <h3 class="room-card__title">${room.nombre}</h3>
        <p class="room-card__subtitle">${room.tipo}</p>
        <div class="room-card__features">${featuresHtml}</div>
        <div class="room-card__footer">
          <div class="room-card__price-new">
            <strong>C$${room.precio}</strong><span>/noche</span>
          </div>
          <button class="room-card__btn-new"
            onclick="seleccionarHabitacion(${room.id}, '${room.nombre} - ${room.tipo}', ${room.precio})"
            ${!room.disponible ? 'disabled' : ''}>
            ${room.disponible ? 'Reservar' : 'No disponible'}
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
}

window.seleccionarHabitacion = async function(id, nombre, precio) {
  // Verificar que el usuario esté logueado
  if (!getUsuarioActual()) {
    showToast('Debes iniciar sesión para poder reservar.', 'warning');
    mostrarPopup('loginPopup');
    return;
  }

  habitacionSeleccionada = { id, nombre, precio };
  document.getElementById('reservaHabitacionInfo').textContent = `${nombre} - C$${precio} por noche`;
  
  let disabledDates = [];
  try {
    const res = await apiCall(`/reservas/fechas-no-disponibles/${id}/`);
    if (res && res.fechas) disabledDates = res.fechas;
  } catch(e) { console.warn("Could not fetch dates", e); }

  const actualizarTotal = () => {
    const ingreso = document.getElementById('fechaIngreso').value;
    const salida  = document.getElementById('fechaSalida').value;
    if (ingreso && salida && habitacionSeleccionada) {
      const dias = calcularDias(ingreso, salida);
      document.getElementById('diasEstancia').value = dias > 0 ? dias : 0;
      document.getElementById('totalPago').value    = dias > 0 ? `C$ ${(habitacionSeleccionada.precio * dias).toFixed(2)}` : '';
    }
  };

  // Destroy previous flatpickr instances if any
  const fpIngreso = document.getElementById('fechaIngreso');
  const fpSalida  = document.getElementById('fechaSalida');
  if (fpIngreso._flatpickr) fpIngreso._flatpickr.destroy();
  if (fpSalida._flatpickr)  fpSalida._flatpickr.destroy();

  flatpickr(fpIngreso, {
    minDate: "today",
    disable: disabledDates,
    dateFormat: "Y-m-d",
    locale: "es",
    onChange: function() {
      actualizarTotal();
      // Actualizar minDate de salida
      const val = fpIngreso.value;
      if (val && fpSalida._flatpickr) {
        const nextDay = new Date(val);
        nextDay.setDate(nextDay.getDate() + 1);
        fpSalida._flatpickr.set('minDate', nextDay);
      }
    }
  });
  flatpickr(fpSalida, {
    minDate: "today",
    disable: disabledDates,
    dateFormat: "Y-m-d",
    locale: "es",
    onChange: actualizarTotal
  });

  // Populate nationalities dynamically
  populateNacionalidades();
  populatePaisesPasaporte();

  mostrarPopup('reservaPopup');
};

function populateNacionalidades() {
  const sel = document.getElementById('nacionalidad');
  if (!sel || sel.options.length > 5) return; // Already populated
  sel.innerHTML = '<option value="">Seleccione su nacionalidad</option>';
  NACIONALIDADES.forEach(n => {
    const opt = document.createElement('option');
    opt.value = n;
    opt.textContent = n;
    sel.appendChild(opt);
  });
}

function populatePaisesPasaporte() {
  const sel = document.getElementById('paisPasaporte');
  if (!sel || sel.options.length > 10) return; // Already populated
  sel.innerHTML = '<option value="">Seleccione país emisor...</option>';
  PAISES_PASAPORTE.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p;
    opt.textContent = p;
    sel.appendChild(opt);
  });
}

function setupFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => btn.addEventListener('click', () => {
    btns.forEach(b => b.classList.remove('filter-btn--active'));
    btn.classList.add('filter-btn--active');
    currentFilter = btn.dataset.filter;
    renderRooms(currentFilter);
  }));
}

// =================== POPUPS (bloqueo de scroll) ===================
function blockBodyScroll(block) {
  document.body.classList.toggle('popup-open', block);
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

// =================== MIS RESERVAS ===================
async function mostrarMisReservas() {
  const usuario = getUsuarioActual();
  if (!usuario) { alert("Debes iniciar sesión."); mostrarPopup('loginPopup'); return; }

  const container = document.getElementById('misReservasContent');
  container.innerHTML = '<div style="text-align:center; padding:2rem;"><i class="fas fa-spinner fa-spin" style="font-size: 1.5rem; color: #0056b3;"></i><br>Sincronizando reservas...</div>';
  mostrarPopup('misReservasPopup');

  // Sincronizar y obtener reservas
  await syncDataFromBackend();
  const reservas  = getReservas();

  if (reservas.length === 0) {
    container.innerHTML = '<p style="text-align:center; padding:2rem;">📭 No tienes reservas aún.</p>';
  } else {
    container.innerHTML = reservas.map(r => {
      const estadoLabel = r.estado === 'activo' ? '🔑 Activo' : r.estado === 'completado' ? '✅ Completado' : r.estado === 'cancelado' ? '❌ Cancelado' : '📅 Pendiente';
      const canEdit = r.estado === 'pendiente' || !r.estado;
      return `
      <div style="border:1px solid #ddd; margin-bottom:1rem; padding:1.2rem; border-radius:12px; background:#fafafa;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
          <strong style="font-size:1.05rem;">${r.habitacionNombre}</strong>
          <span style="font-size:0.85rem; padding:0.3rem 0.8rem; border-radius:20px; background:#f0f0f0; font-weight:600;">${estadoLabel}</span>
        </div>
        Entrada: ${r.fechaIngreso} | Salida: ${r.fechaSalida}<br>
        Días: ${r.dias} | Total: C$${r.total}<br>
        Huésped: ${r.nombres} ${r.apellidos}
        <div style="margin-top: 0.8rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
          ${canEdit ? `<button class="popup__btn popup__btn--reservar" style="padding: 0.4rem 1rem; font-size: 0.8rem; flex:none;"
            onclick="editarReserva(${r.id})">✏️ Editar</button>` : ''}
          ${canEdit ? `<button class="popup__btn popup__btn--cerrar" style="padding: 0.4rem 1rem; font-size: 0.8rem; flex:none;"
            onclick="cancelarReserva(${r.id})">🗑 Cancelar</button>` : ''}
        </div>
      </div>
    `}).join('');
  }
  mostrarPopup('misReservasPopup');
}

// =================== EDITAR RESERVA ===================
window.editarReserva = async function(reservaId) {
  const reserva = getReservas().find(r => r.id === reservaId);
  if (!reserva) { showToast('Reserva no encontrada.', 'error'); return; }

  // Find room
  const room = habitaciones.find(h => h.id === reserva.habitacionId);
  if (!room) { showToast('Habitación no encontrada.', 'error'); return; }

  cerrarPopup('misReservasPopup');

  habitacionSeleccionada = { id: room.id, nombre: room.nombre, precio: parseFloat(room.precio), editingReservaId: reservaId };
  document.getElementById('reservaHabitacionInfo').textContent = `${room.nombre} - ${room.tipo} - C$${room.precio} por noche (Editando)`;

  let disabledDates = [];
  try {
    const res = await apiCall(`/reservas/fechas-no-disponibles/${room.id}/?exclude=${reservaId}`);
    if (res && res.fechas) disabledDates = res.fechas;
  } catch(e) { console.warn("Could not fetch dates", e); }

  populateNacionalidades();
  populatePaisesPasaporte();

  // Pre-fill form
  const setVal = (id, val) => { const el = document.getElementById(id); if (el && val) el.value = val; };
  setVal('tipoDocumento', reserva.tipo_documento);
  setVal('cedula', reserva.cedula);
  setVal('paisPasaporte', reserva.pais_pasaporte);
  setVal('pasaporte', reserva.pasaporte);
  setVal('nombres', reserva.nombres);
  setVal('apellidos', reserva.apellidos);
  setVal('correo', getUsuarioActual()?.correo || '');
  setVal('sexo', reserva.sexo);
  setVal('fechaNacimiento', reserva.fecha_nacimiento);
  setVal('nacionalidad', reserva.nacionalidad);
  setVal('procedencia', reserva.procedencia);
  setVal('numHuespedes', reserva.huespedes || reserva.num_huespedes || 1);

  // Toggle document type fields
  const isPasaporte = reserva.tipo_documento === 'pasaporte';
  document.getElementById('containerCedula').style.display    = isPasaporte ? 'none'  : 'block';
  document.getElementById('cedula').required                  = !isPasaporte;
  document.getElementById('containerPasaporte').style.display = isPasaporte ? 'flex'  : 'none';
  document.getElementById('paisPasaporte').required           = isPasaporte;
  document.getElementById('pasaporte').required               = isPasaporte;

  const actualizarTotal = () => {
    const ingreso = document.getElementById('fechaIngreso').value;
    const salida  = document.getElementById('fechaSalida').value;
    if (ingreso && salida && habitacionSeleccionada) {
      const dias = calcularDias(ingreso, salida);
      document.getElementById('diasEstancia').value = dias > 0 ? dias : 0;
      document.getElementById('totalPago').value    = dias > 0 ? `C$ ${(habitacionSeleccionada.precio * dias).toFixed(2)}` : '';
    }
  };

  const fpIngreso = document.getElementById('fechaIngreso');
  const fpSalida  = document.getElementById('fechaSalida');
  if (fpIngreso._flatpickr) fpIngreso._flatpickr.destroy();
  if (fpSalida._flatpickr)  fpSalida._flatpickr.destroy();

  flatpickr(fpIngreso, {
    minDate: "today", disable: disabledDates, dateFormat: "Y-m-d", locale: "es",
    defaultDate: reserva.fechaIngreso,
    onChange: actualizarTotal
  });
  flatpickr(fpSalida, {
    minDate: "today", disable: disabledDates, dateFormat: "Y-m-d", locale: "es",
    defaultDate: reserva.fechaSalida,
    onChange: actualizarTotal
  });

  actualizarTotal();
  mostrarPopup('reservaPopup');
};

// =================== CANCELAR RESERVA ===================
window.cancelarReserva = async function(reservaId) {
  if (!confirm('¿Deseas cancelar esta reserva?')) return;
  
  try {
    const res = await apiCall(`/reservas/${reservaId}/`, { method: 'DELETE' });
    showToast(res.message, 'success');
    await syncDataFromBackend();
    await fetchHabitaciones();
  } catch (err) {
    showToast(err.message, 'error');
    return;
  }

  const misReservasPopup = document.getElementById('misReservasPopup');
  if (misReservasPopup && misReservasPopup.style.display === 'flex') mostrarMisReservas();
  renderRooms(currentFilter);
};

// =================== CREAR / ACTUALIZAR RESERVA ===================
async function crearReserva(reservaData) {
  const usuario = getUsuarioActual();
  if (!usuario) { showToast('Debes iniciar sesión para reservar.', 'warning'); return false; }

  const isEditing = habitacionSeleccionada?.editingReservaId;

  try {
    let res;
    if (isEditing) {
      // Actualizar reserva existente
      res = await apiCall('/reservas/actualizar/', {
        method: 'PUT',
        body: JSON.stringify({
          id_reserva: isEditing,
          fechaIngreso: reservaData.fechaIngreso,
          fechaSalida: reservaData.fechaSalida,
          dias: reservaData.dias,
          total: reservaData.total,
          huespedes: reservaData.huespedes,
          metodoPago: reservaData.metodoPago
        })
      });
    } else {
      // Crear nueva reserva
      res = await apiCall('/reservas/crear/', {
        method: 'POST',
        body: JSON.stringify(reservaData)
      });
    }
    showToast(res.message || (isEditing ? 'Reserva actualizada' : 'Reserva creada exitosamente'), 'success');
    await syncDataFromBackend();
    await fetchHabitaciones();
  } catch (err) {
    showToast(err.message, 'error');
    return false;
  }

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

// =================== CHATBOT ===================
function initChatbot() {
  const toggle      = document.getElementById('chatbotToggle');
  const windowChat  = document.getElementById('chatbotWindow');
  const closeChat   = document.getElementById('chatbotClose');
  const faqBtns     = document.querySelectorAll('.chatbot__faq-buttons button');
  const messagesDiv = document.getElementById('chatMessages');

  const respuestas = {
    horarios:  "⏰ Check-in: desde las 2:00 PM. Check-out: antes de las 12:00 PM.",
    precios:   "💰 Habitaciones económicas: C$350-500, familiares: C$550-900, con AA: C$1100 por noche.",
    servicios: "🍳 No incluimos desayuno, pero hay opciones cerca del hotel.",
    wifi:      "📶 Sí, WiFi gratuito en todas las áreas del hotel.",
    mascotas:  "🐾 Lo sentimos, no aceptamos mascotas.",
    reservas:  "📅 Para reservar, inicia sesión y haz clic en 'Reservar ahora' en cualquier habitación."
  };

  toggle?.addEventListener('click', () => windowChat?.classList.toggle('active'));
  closeChat?.addEventListener('click', () => windowChat?.classList.remove('active'));
  faqBtns.forEach(btn => btn.addEventListener('click', () => {
    const key      = btn.dataset.question;
    const respuesta = respuestas[key] || "❓ No tengo esa información. Llama al +505 8853 6728.";
    const msg       = document.createElement('div');
    msg.className   = 'bot-msg';
    msg.textContent = respuesta;
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }));
}

// =================== INICIALIZACIÓN (DOMContentLoaded) ===================
document.addEventListener('DOMContentLoaded', async () => {
  initData();
  
  // Conectar al backend y cargar habitaciones
  await initBackendConnection();

  renderRooms("all");
  setupFilters();
  actualizarHeaderUsuario();
  initChatbot();

  // Hamburger Menu Toggle
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const headerNav     = document.querySelector('.header__nav');
  const headerUser    = document.querySelector('.header__user');
  if (menuToggleBtn && headerNav && headerUser) {
    menuToggleBtn.addEventListener('click', () => {
      const isActive = headerNav.classList.toggle('active');
      headerUser.classList.toggle('active', isActive);
      
      const icon = menuToggleBtn.querySelector('i');
      if (icon) {
        if (isActive) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    headerNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        headerNav.classList.remove('active');
        headerUser.classList.remove('active');
        const icon = menuToggleBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // Populate nationalities on page load too
  populateNacionalidades();
  populatePaisesPasaporte();

  // Sincronización en background cada 60 segundos
  setInterval(async () => {
    await fetchHabitaciones();
    if (!document.body.classList.contains('popup-open')) {
      renderRooms(currentFilter);
    }
  }, 60000);

  // Toggle password visibility in registration form
  const setupPasswordToggle = (inputId, iconId) => {
    const input = document.getElementById(inputId);
    const icon  = document.getElementById(iconId);
    if (input && icon) {
      icon.addEventListener('click', () => {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        icon.className = isPassword ? 'far fa-eye-slash toggle-password-icon' : 'far fa-eye toggle-password-icon';
      });
    }
  };
  setupPasswordToggle('regPassword', 'toggleRegPassword');
  setupPasswordToggle('regConfirmPassword', 'toggleRegConfirmPassword');

  // ── Registro ──────────────────────────────────────────
  document.getElementById('registroForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre          = document.getElementById('regNombre').value.trim();
    const email           = document.getElementById('regEmail').value.trim();
    const password        = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    if (password !== confirmPassword) {
      showToast('Las contraseñas no coinciden.', 'warning');
      return;
    }

    if (password.length < 8) {
      showToast('La contraseña debe tener al menos 8 caracteres.', 'warning');
      return;
    }

    if (await registrarUsuario({ nombre, email, password })) {
      cerrarPopup('registroPopup');
      document.getElementById('registroForm').reset();
      
      // Restaurar tipo y íconos de contraseña a oculto
      document.getElementById('regPassword').type = 'password';
      document.getElementById('regConfirmPassword').type = 'password';
      const eye1 = document.getElementById('toggleRegPassword');
      const eye2 = document.getElementById('toggleRegConfirmPassword');
      if (eye1) eye1.className = 'far fa-eye toggle-password-icon';
      if (eye2) eye2.className = 'far fa-eye toggle-password-icon';

      mostrarPopup('loginPopup');
    }
  });

  // ── Login ─────────────────────────────────────────────
  document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const usuario  = document.getElementById('loginUsuario').value.trim();
    const password = document.getElementById('loginPassword').value;
    const result   = await loginUsuario(usuario, password);
    if (result) {
      actualizarHeaderUsuario();
      cerrarPopup('loginPopup');
      document.getElementById('loginForm').reset();
      if (result === 'admin') {
        window.location.href = 'admin.html';
      } else {
        renderRooms("all");
      }
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
        document.getElementById('totalPago').value    = dias > 0
          ? `C$ ${(habitacionSeleccionada.precio * dias).toFixed(2)}`
          : '';
      }
    };
    document.getElementById('fechaIngreso')?.addEventListener('change', actualizarTotal);
    document.getElementById('fechaSalida')?.addEventListener('change', actualizarTotal);

    // Toggle tipo de documento
    document.getElementById('tipoDocumento')?.addEventListener('change', (e) => {
      const isPasaporte = e.target.value === 'pasaporte';
      document.getElementById('containerCedula').style.display    = isPasaporte ? 'none'  : 'block';
      document.getElementById('cedula').required                  = !isPasaporte;
      document.getElementById('containerPasaporte').style.display = isPasaporte ? 'flex'  : 'none';
      document.getElementById('paisPasaporte').required           = isPasaporte;
      document.getElementById('pasaporte').required               = isPasaporte;
    });

    // Auto-formato cédula nicaragüense
    document.getElementById('cedula')?.addEventListener('input', (e) => {
      let val = e.target.value.toUpperCase().replace(/[^0-9A-Z]/g, '');
      if (val.length > 14) val = val.slice(0, 14);
      let formatted = val.substring(0, 3);
      if (val.length > 3) formatted += '-' + val.substring(3, 9);
      if (val.length > 9) formatted += '-' + val.substring(9, 14);
      e.target.value = formatted;
    });

    // Auto-formato Pasaporte (validación por país)
    document.getElementById('pasaporte')?.addEventListener('input', (e) => {
      const pais = document.getElementById('paisPasaporte').value;
      let val = e.target.value.toUpperCase().replace(/[^0-9A-Z]/g, '');
      
      // Formato por país con guiones automáticos
      if (pais === 'Panamá') {
        if (val.length > 15) val = val.slice(0, 15);
        let formatted = val;
        if (val.length > 1) formatted = val.substring(0, 1) + '-' + val.substring(1);
        if (val.length > 4) formatted = val.substring(0, 1) + '-' + val.substring(1, 4) + '-' + val.substring(4);
        e.target.value = formatted;
      } else if (pais === 'Nicaragua') {
        // Formato: C00000000 (letra + 8 dígitos)
        if (val.length > 9) val = val.slice(0, 9);
        e.target.value = val;
      } else if (pais === 'Costa Rica') {
        if (val.length > 9) val = val.slice(0, 9);
        e.target.value = val;
      } else if (pais === 'Estados Unidos') {
        // US passport: 9 digits
        val = val.replace(/[^0-9]/g, '');
        if (val.length > 9) val = val.slice(0, 9);
        e.target.value = val;
      } else {
        // Generic alphanumeric, max 15 chars
        if (val.length > 15) val = val.slice(0, 15);
        e.target.value = val;
      }
    });

    reservaForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!habitacionSeleccionada) { showToast('Selecciona una habitación primero.', 'warning'); return; }
      if (!getUsuarioActual()) { showToast('Debes iniciar sesión para reservar.', 'warning'); mostrarPopup('loginPopup'); return; }

      const tipoDoc = document.getElementById('tipoDocumento').value;
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
        if (pasaporte.replace(/[^A-Z0-9]/g, '').length < 5) {
            showToast(`El pasaporte debe tener al menos 5 caracteres alfanuméricos.`, 'error'); return;
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

      const usuario = getUsuarioActual();
      const reservaData = {
        usuarioId:       usuario.id,
        habitacionId:    habitacionSeleccionada.id,
        habitacionNombre:habitacionSeleccionada.nombre,
        precioPorNoche:  habitacionSeleccionada.precio,
        tipoDocumento:   tipoDoc,
        cedula:          document.getElementById('cedula').value,
        paisPasaporte:   document.getElementById('paisPasaporte')?.value || '',
        pasaporte:       document.getElementById('pasaporte')?.value || '',
        nombres:         document.getElementById('nombres').value,
        apellidos:       document.getElementById('apellidos').value,
        correo:          document.getElementById('correo').value,
        sexo:            document.getElementById('sexo').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        nacionalidad:    document.getElementById('nacionalidad').value,
        procedencia:     document.getElementById('procedencia').value,
        fechaIngreso:    document.getElementById('fechaIngreso').value,
        fechaSalida:     document.getElementById('fechaSalida').value,
        dias,
        huespedes:       parseInt(document.getElementById('numHuespedes').value),
        numHuespedes:    parseInt(document.getElementById('numHuespedes').value),
        metodoPago:      document.getElementById('metodoPago').value,
        total:           habitacionSeleccionada.precio * dias
      };

      if (await crearReserva(reservaData)) {
        cerrarPopup('reservaPopup');
        reservaForm.reset();
        habitacionSeleccionada = null;
        renderRooms(currentFilter);
        mostrarPopup('reservaExitosaPopup');
      }
    });
  }

  // ── Botones de cierre ─────────────────────────────────
  const closeIds = [
    'closeRegistroPopupBtn','cancelRegistroBtn',
    'closeLoginPopupBtn','cancelLoginBtn',
    'closePopupBtn','cancelPopupBtn',
    'closeDetallePopupBtn','cerrarDetalleBtn',
    'closeMisReservasBtn',
    'closeExitosaPopupBtn','btnAceptarExitosa',
    'closeSorteoPromoPopupBtn','cancelSorteoPromoBtn'
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

  // ── Botones principales ───────────────────────────────
  document.getElementById('abrirLoginBtn')?.addEventListener('click', (e) => {
    e.preventDefault(); mostrarPopup('loginPopup');
  });
  document.getElementById('heroReservarBtn')?.addEventListener('click', () => {
    if (!getUsuarioActual()) {
      mostrarPopup('loginPopup');
    } else {
      document.getElementById('habitaciones').scrollIntoView({ behavior: 'smooth' });
      showToast('¡Elige tu habitación ideal!', 'info');
    }
  });
  document.getElementById('misReservasLink')?.addEventListener('click', (e) => {
    e.preventDefault(); mostrarMisReservas();
  });
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    logoutUsuario();
    actualizarHeaderUsuario();
    renderRooms("all");
  });
  // Enlace admin
  document.getElementById('adminNavLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'admin.html';
  });

  // ── Sorteo / Lead Capture ─────────────────────────────
  const sorteoForm = document.getElementById('sorteoForm');
  if (sorteoForm) {
    sorteoForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nombres      = document.getElementById('sorteoNombres').value.trim();
      const apellidos    = document.getElementById('sorteoApellidos').value.trim();
      const email        = document.getElementById('sorteoEmail').value.trim();
      const telefono     = document.getElementById('sorteoTelefono').value.trim();
      const departamento = document.getElementById('sorteoDepartamento').value;
      const sexo         = document.getElementById('sorteoSexo').value;
      const edad         = document.getElementById('sorteoEdad').value;
      const ocupacion    = document.getElementById('sorteoOcupacion').value.trim();
      
      const leadData = { nombres, apellidos, email, telefono, departamento, sexo, edad: parseInt(edad) || 0, ocupacion };

      try {
        const res = await apiCall('/sorteos/crear/', {
          method: 'POST',
          noAuth: true,
          body: JSON.stringify(leadData)
        });
        showToast(res.message || '¡Te has registrado exitosamente!', 'success');
        sorteoForm.reset();
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  }

  // ── Sorteo Promo Popup Logic (8 seconds timer) ──────────
  setTimeout(() => {
    const yaMostrado = sessionStorage.getItem('sorteoPromoMostrado');
    if (!yaMostrado) {
      mostrarPopup('sorteoPromoPopup');
    }
  }, 8000);

  // Registrar estado de visualización para no molestar al usuario en la misma sesión
  const registrarSorteoMostrado = () => {
    sessionStorage.setItem('sorteoPromoMostrado', 'true');
  };
  document.getElementById('closeSorteoPromoPopupBtn')?.addEventListener('click', registrarSorteoMostrado);
  document.getElementById('cancelSorteoPromoBtn')?.addEventListener('click', registrarSorteoMostrado);

  document.getElementById('llenarSorteoFormBtn')?.addEventListener('click', () => {
    cerrarPopup('sorteoPromoPopup');
    registrarSorteoMostrado();
    const target = document.getElementById('sorteoSection');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      const firstInput = document.getElementById('sorteoNombres');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 800);
      }
    }
  });

  // ── Scroll reveal ─────────────────────────────────────
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
