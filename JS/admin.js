// ================================================================
//  admin.js  — Lógica exclusiva del panel de administrador
//  Hotel Costa Sur  |  Depende de: data.js (Conexión SQL Server)
// ================================================================

// ── Guardia: si no es admin, redirigir al inicio ──────────────
(function adminGuard() {
  const u = getUsuarioActual();
  if (!u || u.rol !== 'admin') {
    window.location.replace('index.html');
  }
})();

// =================== RENDER PANEL TABS ===================
function renderAdminPanel() {
  const root = document.getElementById('adminRoot');
  if (!root) return;

  root.innerHTML = `
    <div class="adm-tabs" id="adminTabsBar">
      <button class="adm-tab active"   id="tab-dashboard"    onclick="switchAdminTab('dashboard',   this)">📊 Dashboard</button>
      <button class="adm-tab"          id="tab-habitaciones" onclick="switchAdminTab('habitaciones',this)">🏨 Habitaciones</button>
      <button class="adm-tab"          id="tab-reservas"     onclick="switchAdminTab('reservas',    this)">📋 Reservas</button>
      <button class="adm-tab"          id="tab-usuarios"     onclick="switchAdminTab('usuarios',    this)">👥 Usuarios</button>
      <button class="adm-tab"          id="tab-sorteos"      onclick="switchAdminTab('sorteos',     this)">🎁 Sorteos</button>
    </div>
    <div id="adminTabContent" style="margin-top:1.5rem;"></div>`;

  switchAdminTab('dashboard', document.getElementById('tab-dashboard'));
}

// =================== SWITCH TAB ===================
window.switchAdminTab = function(tab, btn) {
  document.querySelectorAll('.adm-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const content  = document.getElementById('adminTabContent');
  const reservas = getReservas();
  const users    = getUsuarios();

  // ── DASHBOARD ────────────────────────────────────────
  if (tab === 'dashboard') {
    const pendientes  = reservas.filter(r => r.estado === 'pendiente' || !r.estado).length;
    const activas     = reservas.filter(r => r.estado === 'activo').length;
    const completadas = reservas.filter(r => r.estado === 'completado').length;
    const libres      = habitaciones.filter(h => h.disponible).length;

    content.innerHTML = `
      <div class="adm-stats-grid">
        <div class="adm-stat adm-stat--blue">
          <div class="adm-stat__icon-box">
            <i class="fas fa-users"></i>
          </div>
          <div class="adm-stat__info">
            <div class="adm-num">${users.length}</div>
            <div class="adm-lbl">Usuarios registrados</div>
          </div>
        </div>
        <div class="adm-stat adm-stat--indigo">
          <div class="adm-stat__icon-box">
            <i class="fas fa-calendar-check"></i>
          </div>
          <div class="adm-stat__info">
            <div class="adm-num">${reservas.length}</div>
            <div class="adm-lbl">Reservas totales</div>
          </div>
        </div>
        <div class="adm-stat adm-stat--orange">
          <div class="adm-stat__icon-box">
            <i class="fas fa-clock"></i>
          </div>
          <div class="adm-stat__info">
            <div class="adm-num">${pendientes}</div>
            <div class="adm-lbl">Pendientes de llegada</div>
          </div>
        </div>
        <div class="adm-stat adm-stat--green">
          <div class="adm-stat__icon-box">
            <i class="fas fa-door-open"></i>
          </div>
          <div class="adm-stat__info">
            <div class="adm-num">${activas}</div>
            <div class="adm-lbl">Huéspedes activos</div>
          </div>
        </div>
        <div class="adm-stat adm-stat--purple">
          <div class="adm-stat__icon-box">
            <i class="fas fa-check-double"></i>
          </div>
          <div class="adm-stat__info">
            <div class="adm-num">${completadas}</div>
            <div class="adm-lbl">Reservas completadas</div>
          </div>
        </div>
        <div class="adm-stat adm-stat--teal">
          <div class="adm-stat__icon-box">
            <i class="fas fa-bed"></i>
          </div>
          <div class="adm-stat__info">
            <div class="adm-num">${libres}</div>
            <div class="adm-lbl">Habitaciones libres</div>
          </div>
        </div>
      </div>
      <p class="adm-hint">Usa las pestañas superiores para gestionar habitaciones, reservas y usuarios.</p>`;

  // ── HABITACIONES ─────────────────────────────────────
  } else if (tab === 'habitaciones') {
    content.innerHTML = `
      <div class="adm-rooms-grid">${
        habitaciones.map(h => {
          const r      = reservas.find(r => r.habitacionId === h.id && (r.estado === 'pendiente' || r.estado === 'activo' || !r.estado));
          const estado = r ? (r.estado === 'activo' ? 'activo' : 'pendiente') : 'libre';
          const colMap = { libre: '#00C853', activo: '#2196F3', pendiente: '#FF9800' };
          const lblMap = { libre: '✓ Libre', activo: '🔑 Ocupado', pendiente: '📅 Reservado' };
          const col    = colMap[estado];
          const lbl    = lblMap[estado];
          return `
            <div class="adm-room-card" style="border-color:${col}40;">
              <div class="adm-room-card__header">
                <strong>${h.nombre}</strong>
                <span class="adm-badge" style="background:${col}20;color:${col};">${lbl}</span>
              </div>
              <div class="adm-room-card__sub">${h.tipo} · C$${h.precio}/noche</div>
              ${r ? `
                <div class="adm-room-card__guest">
                  <strong>Huésped:</strong> ${r.nombres} ${r.apellidos}<br>
                  <strong>Entrada:</strong> ${r.fechaIngreso} &nbsp;·&nbsp; <strong>Salida:</strong> ${r.fechaSalida}
                </div>
                ${estado === 'pendiente' ? `<button onclick="adminCheckIn(${r.id})" class="adm-btn adm-btn--green" style="margin-bottom:0.3rem;">✅ Check-in · Confirmar pago</button>` : ''}
                ${estado === 'activo'    ? `<button onclick="adminCheckOut(${r.id})" class="adm-btn adm-btn--blue" style="margin-bottom:0.3rem;">🚪 Check-out · Liberar</button>` : ''}
              ` : `<div class="adm-room-card__free">Disponible para reservar</div>`}
              <div style="margin-top:0.8rem; border-top:1px solid #eee; padding-top:0.8rem;">
                  <button onclick="verDisponibilidad(${h.id}, '${h.nombre}')" class="adm-btn adm-btn--ghost" style="width:100%; border:1px solid #ccc;">📅 Ver Disponibilidad</button>
                  <div id="disp-cal-${h.id}" style="margin-top:0.5rem; display:none;">
                      <input type="text" id="fp-${h.id}" style="display:none;">
                  </div>
              </div>
            </div>`;
        }).join('')
      }</div>`;

  // ── RESERVAS ──────────────────────────────────────────
  } else if (tab === 'reservas') {
    content.innerHTML = `
      <div class="adm-toolbar" style="display:flex; gap:1rem; flex-wrap:wrap; align-items:center;">
        <input type="text" id="searchRes"
          placeholder="🔍 Buscar por huésped, habitación, cédula…"
          oninput="filtrarTablaReservas()"
          class="adm-search-input" style="flex:1;">
        <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer; background:white; padding:0.7rem 1.2rem; border-radius:50px; border:1px solid #d9e2ec;">
          <input type="checkbox" id="unconfirmedFilter" onchange="filtrarTablaReservas()"> 
          <span style="font-weight:500; color:#1E2A32;">Solo no confirmadas</span>
        </label>
      </div>
      <div id="resTable">${buildReservasTable(reservas)}</div>`;

  // ── USUARIOS ──────────────────────────────────────────
  } else if (tab === 'usuarios') {
    content.innerHTML = `
      <div class="adm-toolbar">
        <input type="text" id="searchUsr"
          placeholder="🔍 Buscar usuario…"
          oninput="filtrarTablaUsuarios(this.value)"
          class="adm-search-input" style="flex:1;">
        <button onclick="formNuevoUsuario()" class="adm-btn adm-btn--primary">+ Crear usuario</button>
      </div>
      <div id="usrTable">${buildUsuariosTable(users)}</div>`;

  // ── SORTEOS ──────────────────────────────────────────
  } else if (tab === 'sorteos') {
    content.innerHTML = `
      <div class="adm-toolbar">
        <h2 style="margin:0; font-size:1.4rem; color:var(--texto-oscuro);">🎁 Participantes del Sorteo</h2>
        <button onclick="cargarSorteos()" class="adm-btn adm-btn--primary">🔄 Actualizar</button>
      </div>
      <div id="sorteosTable"><p class="adm-empty">Cargando participantes...</p></div>`;
    cargarSorteos();
  }
};

// =================== HELPERS DE TABLA ===================
function buildReservasTable(reservas) {
  if (!reservas.length) return '<p class="adm-empty">No hay reservas registradas.</p>';
  const estLabel = e => e === 'activo' ? '🔑 Activo' : e === 'completado' ? '✅ Completado' : '📅 Pendiente';
  const estCol   = e => e === 'activo' ? '#2196F3' : e === 'completado' ? '#00C853' : '#FF9800';
  return `
    <div class="adm-table-wrap">
      <table class="adm-table">
        <thead><tr>
          <th>Habitación / Tipo</th><th>Huésped</th><th>Cédula / Pasaporte</th>
          <th>Precio / Noche</th><th>Fechas</th><th>Huéspedes</th><th>Total</th><th>Estado</th><th>Acciones</th>
        </tr></thead>
        <tbody>${reservas.map(r => {
          const room = habitaciones.find(h => h.id === r.habitacionId);
          return `
          <tr>
            <td><strong>${r.habitacionNombre}</strong><br><small style="color:#888;">${room ? room.tipo : ''}</small></td>
            <td>${r.nombres} ${r.apellidos}<br><small style="color:#888;">${r.usuarioNombre}</small></td>
            <td style="font-size:.82rem;">${r.cedula || r.pasaporte || '—'}</td>
            <td>C$${r.precioPorNoche}</td>
            <td>In: ${r.fechaIngreso}<br>Out: ${r.fechaSalida}</td>
            <td>${r.huespedes || 1}</td>
            <td><strong>C$${r.total}</strong></td>
            <td>
              <span class="adm-badge"
                style="background:${estCol(r.estado)}20;color:${estCol(r.estado)};">
                ${estLabel(r.estado)}
              </span>
            </td>
            <td>
              <button onclick="adminCheckIn(${r.id})" class="adm-btn adm-btn--primary" style="font-size:.78rem; margin-bottom:.3rem;">✅ Confirmar</button><br>
              <button onclick="adminEliminarReserva(${r.id})"
                class="adm-btn adm-btn--danger" style="font-size:.78rem;">
                🗑 Eliminar
              </button>
            </td>
          </tr>`
        }).join('')}
        </tbody>
      </table>
    </div>`;
}

function buildUsuariosTable(users) {
  if (!users.length) return '<p class="adm-empty">No hay usuarios registrados.</p>';
  return `
    <div class="adm-table-wrap">
      <table class="adm-table">
        <thead><tr>
          <th>Usuario</th><th>Email</th><th>Fecha registro</th><th>Reservas</th><th>Acciones</th>
        </tr></thead>
        <tbody>${users.map(u => {
          const numRes = getReservas().filter(r => String(r.usuarioId) === String(u.id)).length;
          const regDate = u.fechaRegistro ? new Date(u.fechaRegistro).toLocaleDateString('es-NI') : '—';
          return `
          <tr>
            <td><strong>${u.nombre}</strong></td>
            <td>${u.email}</td>
            <td style="font-size:.82rem;">${regDate}</td>
            <td style="text-align:center;">${numRes}</td>
            <td style="display:flex;gap:.4rem;flex-wrap:wrap;">
              <button onclick="formEditarUsuario('${u.id}')"  class="adm-btn adm-btn--primary" style="font-size:.78rem;">✏️ Editar</button>
              <button onclick="adminEliminarUsuario('${u.id}')" class="adm-btn adm-btn--danger" style="font-size:.78rem;">🗑 Eliminar</button>
            </td>
          </tr>`;
        }).join('')}
        </tbody>
      </table>
    </div>`;
}

window.cargarSorteos = async function() {
  try {
    const res = await apiCall('/sorteos/listar/');
    const sorteos = Array.isArray(res) ? res : (res.results || []);
    document.getElementById('sorteosTable').innerHTML = buildSorteosTable(sorteos);
  } catch (err) {
    document.getElementById('sorteosTable').innerHTML = `<p class="adm-empty" style="color:red;">Error al cargar sorteos: ${err.message}</p>`;
  }
};

function buildSorteosTable(sorteos) {
  if (!sorteos.length) return '<p class="adm-empty">No hay participantes registrados en el sorteo.</p>';
  return `
    <div class="adm-table-wrap">
      <table class="adm-table">
        <thead><tr>
          <th>Participante</th><th>Contacto</th><th>Departamento</th><th>Sexo / Edad</th><th>Ocupación</th><th>Fecha</th>
        </tr></thead>
        <tbody>${sorteos.map(s => `
          <tr>
            <td><strong>${s.nombres} ${s.apellidos}</strong></td>
            <td>📞 ${s.telefono}<br>✉️ ${s.email}</td>
            <td>${s.departamento}</td>
            <td>${s.sexo} / ${s.edad} años</td>
            <td>${s.ocupacion}</td>
            <td style="font-size:0.85rem;">${new Date(s.fecha_registro).toLocaleString('es-NI')}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

// =================== FILTROS EN VIVO ===================
window.filtrarTablaReservas = function() {
  const term = (document.getElementById('searchRes')?.value || '').toLowerCase();
  const unconfirmed = document.getElementById('unconfirmedFilter')?.checked;
  
  let filtered = getReservas().filter(r =>
    `${r.nombres} ${r.apellidos} ${r.habitacionNombre} ${r.cedula || ''} ${r.pasaporte || ''}`.toLowerCase().includes(term)
  );
  
  if (unconfirmed) {
      filtered = filtered.filter(r => r.estado === 'pendiente' || !r.estado);
  }
  
  document.getElementById('resTable').innerHTML = buildReservasTable(filtered);
};

window.filtrarTablaUsuarios = function(q) {
  const term     = q.toLowerCase();
  const filtered = getUsuarios().filter(u =>
    `${u.nombre} ${u.email}`.toLowerCase().includes(term)
  );
  document.getElementById('usrTable').innerHTML = buildUsuariosTable(filtered);
};

// =================== CHECK-IN / CHECK-OUT (SQL SERVER DIRECTO) ===================
window.adminCheckIn = async function(reservaId) {
  if (!confirm('¿Confirmar que el huésped pagó y realizó el check-in?')) return;
  
  try {
    const res = await apiCall(`/reservas/checkin/${reservaId}/`, { method: 'PUT' });
    showToast(res.message, 'success');
    await syncDataFromBackend();
  } catch (err) {
    showToast(err.message, 'error');
    return;
  }
  
  switchAdminTab('habitaciones', document.getElementById('tab-habitaciones'));
};

window.adminCheckOut = async function(reservaId) {
  if (!confirm('¿Confirmar check-out y liberar la habitación?')) return;
  
  try {
    const res = await apiCall(`/reservas/checkout/${reservaId}/`, { method: 'PUT' });
    showToast(res.message, 'success');
    await syncDataFromBackend();
    await fetchHabitaciones();
  } catch (err) {
    showToast(err.message, 'error');
    return;
  }
  
  switchAdminTab('habitaciones', document.getElementById('tab-habitaciones'));
};

// =================== CRUD RESERVAS (SQL SERVER DIRECTO) ===================
window.adminEliminarReserva = async function(reservaId) {
  if (!confirm('¿Eliminar esta reserva definitivamente?')) return;
  
  try {
    const res = await apiCall(`/reservas/${reservaId}/`, { method: 'DELETE' });
    showToast(res.message, 'success');
    await syncDataFromBackend();
    await fetchHabitaciones();
  } catch (err) {
    showToast(err.message, 'error');
    return;
  }
  
  switchAdminTab('reservas', document.getElementById('tab-reservas'));
};

// =================== CRUD USUARIOS (SQL SERVER DIRECTO) ===================
window.adminEliminarUsuario = async function(userId) {
  if (!confirm('¿Eliminar este usuario? Sus reservas no se eliminarán.')) return;
  
  try {
    const res = await apiCall(`/usuarios/${userId}/`, { method: 'DELETE' });
    showToast(res.message, 'success');
    await syncDataFromBackend();
  } catch (err) {
    showToast(err.message, 'error');
    return;
  }
  
  switchAdminTab('usuarios', document.getElementById('tab-usuarios'));
};

window.formNuevoUsuario = function() {
  document.getElementById('userForm')?.remove();
  const c = document.getElementById('adminTabContent');
  c.insertAdjacentHTML('afterbegin', `
    <div id="userForm" class="adm-form-card adm-form-card--blue">
      <strong class="adm-form-title">➕ Nuevo Usuario</strong>
      <div class="adm-form-grid">
        <input id="fnNombre" placeholder="Nombre de usuario" class="adm-input">
        <input id="fnEmail"  type="email" placeholder="Correo electrónico" class="adm-input">
        <input id="fnPass"   type="password" placeholder="Contraseña (mín. 8 chars)" class="adm-input">
      </div>
      <div class="adm-form-actions">
        <button onclick="adminCrearUsuario()" class="adm-btn adm-btn--primary">Crear</button>
        <button onclick="document.getElementById('userForm').remove()" class="adm-btn adm-btn--ghost">Cancelar</button>
      </div>
    </div>`);
};

window.adminCrearUsuario = async function() {
  const nombre = document.getElementById('fnNombre')?.value.trim();
  const email  = document.getElementById('fnEmail')?.value.trim();
  const pass   = document.getElementById('fnPass')?.value;
  if (!nombre || !email || !pass) { showToast('Completa todos los campos.', 'warning'); return; }
  if (pass.length < 8) { showToast('Contraseña mínimo 8 caracteres.', 'error'); return; }
  
  try {
    const res = await apiCall('/usuarios/', {
      method: 'POST',
      body: JSON.stringify({ nombre, email, password: pass })
    });
    showToast(res.message, 'success');
    await syncDataFromBackend();
  } catch (err) {
    showToast(err.message, 'error');
    return;
  }
  
  switchAdminTab('usuarios', document.getElementById('tab-usuarios'));
};

window.formEditarUsuario = function(userId) {
  document.getElementById('userEditForm')?.remove();
  const u = getUsuarios().find(u => String(u.id) === String(userId));
  if (!u) return;
  const c = document.getElementById('adminTabContent');
  c.insertAdjacentHTML('afterbegin', `
    <div id="userEditForm" class="adm-form-card adm-form-card--yellow">
      <strong class="adm-form-title">✏️ Editar: ${u.nombre}</strong>
      <div class="adm-form-grid">
        <input id="feNombre" value="${u.nombre}" placeholder="Nombre" class="adm-input">
        <input id="feEmail"  value="${u.email}" type="email" placeholder="Email" class="adm-input">
        <input id="fePass"   type="password" placeholder="Nueva contraseña (dejar vacío para no cambiar)" class="adm-input">
      </div>
      <div class="adm-form-actions">
        <button onclick="adminGuardarEdicion('${userId}')" class="adm-btn adm-btn--warning">Guardar</button>
        <button onclick="document.getElementById('userEditForm').remove()" class="adm-btn adm-btn--ghost">Cancelar</button>
      </div>
    </div>`);
};

window.adminGuardarEdicion = async function(userId) {
  const nombre = document.getElementById('feNombre')?.value.trim();
  const email  = document.getElementById('feEmail')?.value.trim();
  const pass   = document.getElementById('fePass')?.value;
  if (!nombre || !email) { showToast('Nombre y email son obligatorios.', 'warning'); return; }
  if (pass && pass.length < 8) { showToast('Contraseña mínimo 8 caracteres.', 'error'); return; }
  
  try {
    const res = await apiCall(`/usuarios/${userId}/`, {
      method: 'PUT',
      body: JSON.stringify({ nombre, email, password: pass || undefined })
    });
    showToast(res.message, 'success');
    await syncDataFromBackend();
  } catch (err) {
    showToast(err.message, 'error');
    return;
  }
  
  switchAdminTab('usuarios', document.getElementById('tab-usuarios'));
};

// =================== VER DISPONIBILIDAD ===================
window.verDisponibilidad = async function(id, nombre) {
    const calDiv = document.getElementById(`disp-cal-${id}`);
    const fpInput = document.getElementById(`fp-${id}`);
    if (calDiv.style.display === 'block') {
        calDiv.style.display = 'none';
        return;
    }
    calDiv.style.display = 'block';
    
    // Fetch dates
    let disabledDates = [];
    try {
        const res = await apiCall(`/reservas/fechas-no-disponibles/${id}`);
        if (res && res.fechas) disabledDates = res.fechas;
    } catch(e) { console.warn("Could not fetch dates", e); }
    
    flatpickr(fpInput, {
        inline: true,
        minDate: "today",
        disable: disabledDates,
        locale: {
            firstDayOfWeek: 1
        }
    });
};

// =================== INICIALIZACIÓN ===================
document.addEventListener('DOMContentLoaded', async () => {
  initData();
  
  // 📡 Conectar a SQL Server y sincronizar datos del panel de administración
  await initBackendConnection();

  renderAdminPanel();

  // Botón cerrar sesión
  document.getElementById('adminLogoutBtn')?.addEventListener('click', () => {
    logoutUsuario();
    window.location.replace('index.html');
  });

  // Botón volver a la web
  document.getElementById('adminHomeBtn')?.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});
