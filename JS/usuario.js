// ================================================================
//  usuario.js  — Lógica exclusiva del usuario / huésped
//  Hotel Costa Sur  |  Depende de: data.js
// ================================================================

// =================== ESTADO LOCAL ===================
let habitacionSeleccionada = null;
let currentFilter = "all";

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

  let filtered = habitaciones;
  if (filter === "estandar")   filtered = habitaciones.filter(r => r.precio >= 400 && r.precio <= 500);
  else if (filter === "familiares") filtered = habitaciones.filter(r => r.precio >= 550 && r.precio <= 900);
  else if (filter === "aire")  filtered = habitaciones.filter(r => r.aire === true);

  if (filtered.length === 0) {
    container.innerHTML = '<div style="text-align:center; padding:3rem;">🚫 No hay habitaciones en esta categoría</div>';
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

window.seleccionarHabitacion = function(id, nombre, precio) {
  const usuario = getUsuarioActual();
  if (!usuario) {
    alert("⚠️ Debes iniciar sesión para reservar.");
    mostrarPopup('loginPopup');
    return;
  }
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
function mostrarMisReservas() {
  const usuario = getUsuarioActual();
  if (!usuario) { alert("Debes iniciar sesión."); mostrarPopup('loginPopup'); return; }

  const reservas  = getReservas().filter(r => r.usuarioId === usuario.id);
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
          <button class="popup__btn popup__btn--cerrar" style="padding: 0.4rem 1rem; font-size: 0.8rem;"
            onclick="cancelarReserva(${r.id})">Cancelar reserva</button>
        </div>
      </div>
    `).join('');
  }
  mostrarPopup('misReservasPopup');
}

// =================== CANCELAR RESERVA (huésped) ===================
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

// =================== CREAR RESERVA ===================
function crearReserva(reservaData) {
  const usuario = getUsuarioActual();
  if (!usuario) { showToast('Debes iniciar sesión para reservar.', 'warning'); return false; }

  const reservas     = getReservas();
  const nuevaReserva = {
    id: Date.now(),
    usuarioId:    usuario.id,
    usuarioNombre:usuario.nombre,
    ...reservaData,
    estado:       'pendiente',
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
    const nombre   = document.getElementById('regNombre').value.trim();
    const email    = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    if (registrarUsuario({ nombre, email, password })) {
      cerrarPopup('registroPopup');
      document.getElementById('registroForm').reset();
      mostrarPopup('loginPopup');
    }
  });

  // ── Login ─────────────────────────────────────────────
  document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const usuario  = document.getElementById('loginUsuario').value.trim();
    const password = document.getElementById('loginPassword').value;
    const result   = loginUsuario(usuario, password);
    if (result) {
      actualizarHeaderUsuario();
      cerrarPopup('loginPopup');
      document.getElementById('loginForm').reset();
      if (result === 'admin') {
        // Redirigir al panel de administrador
        window.location.href = 'admin.html';
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

  // ── Botones de cierre ─────────────────────────────────
  const closeIds = [
    'closeRegistroPopupBtn','cancelRegistroBtn',
    'closeLoginPopupBtn','cancelLoginBtn',
    'closePopupBtn','cancelPopupBtn',
    'closeDetallePopupBtn','cerrarDetalleBtn',
    'closeMisReservasBtn',
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
  });
  // Enlace admin → redirige a la página de administrador
  document.getElementById('adminNavLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'admin.html';
  });

  // ── Sorteo / Lead Capture ─────────────────────────────
  const sorteoForm = document.getElementById('sorteoForm');
  if (sorteoForm) {
    sorteoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombres      = document.getElementById('sorteoNombres').value.trim();
      const apellidos    = document.getElementById('sorteoApellidos').value.trim();
      const email        = document.getElementById('sorteoEmail').value.trim();
      const telefono     = document.getElementById('sorteoTelefono').value.trim();
      const departamento = document.getElementById('sorteoDepartamento').value;
      const sexo         = document.getElementById('sorteoSexo').value;
      const edad         = document.getElementById('sorteoEdad').value;
      const ocupacion    = document.getElementById('sorteoOcupacion').value.trim();
      let leads = JSON.parse(localStorage.getItem('sorteoLeads')) || [];
      leads.push({ nombres, apellidos, email, telefono, departamento, sexo, edad, ocupacion, fecha: new Date().toISOString() });
      localStorage.setItem('sorteoLeads', JSON.stringify(leads));
      showToast(`¡Gracias por participar, ${nombres}! 🎉 Te contactaremos si ganas.`, 'success');
      sorteoForm.reset();
    });
  }

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
