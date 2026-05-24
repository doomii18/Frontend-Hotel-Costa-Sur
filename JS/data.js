// ================================================================
//  data.js  — Capa de datos compartida entre usuario y admin
//  Hotel Costa Sur - Integración con Backend (PostgreSQL/SQL Server)
// ================================================================

// =================== DATOS DE HABITACIONES ===================
let habitaciones = []; // Se cargará obligatoriamente desde SQL Server

// =================== CONFIGURACIÓN DE CONEXIÓN BACKEND ===================
const API_URL = 'https://backend-hotelcostasur-production.up.railway.app/api';
let reservasLocales = [];
let usuariosLocales = [];

const ADMIN_USER = 'HCS-ADMINISTRADOR';

function isAdmin() {
  const u = getUsuarioActual();
  return u && u.rol === 'admin';
}

// Helper para hacer peticiones HTTP al Backend automáticamente incluyendo el Token JWT
async function apiCall(endpoint, options = {}, retries = 2) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.status === 401 || response.status === 403) {
      if (!options.noLogout) {
        logoutUsuario(true); // silent logout solo en peticiones normales
      }
      throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error del servidor (${response.status})`);
    }

    return await response.json();
  } catch (error) {
    const method = options.method || 'GET';
    // Solo reintentar si es GET y quedan intentos
    if (method === 'GET' && retries > 0 && error.name !== 'AbortError' && !error.message.includes('Sesión expirada')) {
      console.warn(`Reintentando petición a ${endpoint}... Quedan ${retries} intentos.`);
      await new Promise(res => setTimeout(res, 1000));
      return apiCall(endpoint, options, retries - 1);
    }
    throw error;
  }
}

// Inicialización: Conecta al backend cargando el catálogo de habitaciones
async function initBackendConnection() {
  try {
    console.log('Intentando conectar con el servidor backend...');
    
    // Cargar habitaciones reales de la base de datos
    await fetchHabitaciones();
    
    // Si el usuario ya estaba logueado, sincronizar sus reservas y datos
    const currentUser = getUsuarioActual();
    if (currentUser) {
      await syncDataFromBackend();
    }
    
    console.log('🔌 Conectado exitosamente al Servidor.');
  } catch (err) {
    console.error(' Error de conexión al backend:', err.message);
    showToast('Problemas de conexión con el servidor principal. Funcionando en modo local.', 'warning');
  }
}

// Sincroniza reservas y usuarios desde la BD real
// noLogout=true: si hay un 401 de fondo, NO cerramos la sesión del usuario
async function syncDataFromBackend() {
  try {
    // Admin usa listar-todos para ver todas las reservas, usuario solo las suyas
    const resEndpoint = isAdmin() ? '/reservas/listar-todos/' : '/reservas/mis-reservas/';
    const res = await apiCall(resEndpoint, { noLogout: true });
    // El backend puede devolver array directo o paginado { results: [...] }
    reservasLocales = Array.isArray(res) ? res : (res.results || []);

    // Si es administrador, también cargar los usuarios
    if (isAdmin()) {
      const users = await apiCall('/usuarios/listar-todos/', { noLogout: true });
      usuariosLocales = Array.isArray(users) ? users : (users.results || []);
    }
  } catch (err) {
    // Error de fondo: no destruir la sesión, solo loguear
    console.warn('Sync en background falló (no crítico):', err.message);
  }
}

// Carga las habitaciones directamente del backend o fallback
const habitacionesFallback = [
  { id: 1, nombre: "Habitación 1", tipo: "Dos camas", categoria: "estandar", precio: 500, caracteristicas: ["2 camas, Matrimonial e Individual", "Baño privado"], disponible: true },
  { id: 2, nombre: "Habitación 2", tipo: "Dos camas", categoria: "estandar", precio: 500, caracteristicas: ["2 camas, Matrimonial e Individual", "Baño privado"], disponible: true },
  { id: 3, nombre: "Habitación 3", tipo: "Matrimonial", categoria: "estandar", precio: 400, caracteristicas: ["Cama matrimonial", "Baño privado"], disponible: true },
  { id: 4, nombre: "Habitación 4", tipo: "Dos camas", categoria: "estandar", precio: 500, caracteristicas: ["2 camas Individuales", "Baño privado"], disponible: true },
  { id: 5, nombre: "Habitación 5", tipo: "Matrimonial", categoria: "estandar", precio: 400, caracteristicas: ["Cama matrimonial", "Baño privado"], disponible: true },
  { id: 6, nombre: "Habitación 6", tipo: "Matrimonial", categoria: "estandar", precio: 400, caracteristicas: ["Cama matrimonial", "Baño privado"], disponible: true },
  { id: 7, nombre: "Habitación 7", tipo: "Dos camas con TV", categoria: "familiares", precio: 550, caracteristicas: ["2 camas Individuales", "Baño privado", "Televisor"], disponible: true },
  { id: 8, nombre: "Habitación 8", tipo: "Dos camas con TV", categoria: "familiares", precio: 550, caracteristicas: ["2 camas Individuales", "Baño privado", "Televisor"], disponible: true },
  { id: 9, nombre: "Habitación 9", tipo: "Matrimonial con TV", categoria: "estandar", precio: 450, caracteristicas: ["Cama matrimonial", "Baño privado", "Televisor"], disponible: true },
  { id: 10, nombre: "Habitación 10", tipo: "Matrimonial con TV", categoria: "estandar", precio: 450, caracteristicas: ["Cama matrimonial", "Baño privado", "Televisor"], disponible: true },
  { id: 11, nombre: "Habitación 11", tipo: "Matrimonial con TV", categoria: "estandar", precio: 450, caracteristicas: ["Cama matrimonial", "Baño privado", "Televisor"], disponible: true },
  { id: 12, nombre: "Habitación 12", tipo: "Matrimonial con TV", categoria: "estandar", precio: 450, caracteristicas: ["Cama matrimonial", "Baño privado", "Televisor"], disponible: true },
  { id: 13, nombre: "Habitación 13", tipo: "Matrimonial con TV", categoria: "estandar", precio: 450, caracteristicas: ["Cama matrimonial", "Baño privado", "Televisor"], disponible: true },
  { id: 14, nombre: "Habitación 14", tipo: "Matrimonial con TV", categoria: "estandar", precio: 450, caracteristicas: ["Cama matrimonial", "Baño privado", "Televisor"], disponible: true },
  { id: 15, nombre: "Habitación 15", tipo: "Matrimonial", categoria: "estandar", precio: 400, caracteristicas: ["Cama matrimonial", "Baño privado"], disponible: true },
  { id: 16, nombre: "Habitación 16", tipo: "Doble cama sin TV", categoria: "estandar", precio: 500, caracteristicas: ["2 camas Individuales", "Baño privado"], disponible: true },
  { id: 17, nombre: "Habitación 17", tipo: "Matrimonial", categoria: "estandar", precio: 400, caracteristicas: ["Cama matrimonial", "Baño privado"], disponible: true },
  { id: 18, nombre: "Habitación 18", tipo: "Matrimonial", categoria: "estandar", precio: 400, caracteristicas: ["Cama matrimonial", "Baño privado"], disponible: true },
  { id: 19, nombre: "Habitación 19", tipo: "Dos camas matrimoniales", categoria: "familiares", precio: 700, caracteristicas: ["2 camas matrimoniales", "Baño privado"], disponible: true },
  { id: 20, nombre: "Habitación 20", tipo: "Cuatro camas", categoria: "familiares", precio: 900, caracteristicas: ["4 camas individuales", "Baño privado"], disponible: true },
  { id: 21, nombre: "Habitación 21", tipo: "Triple cama", categoria: "familiares", precio: 700, caracteristicas: ["3 camas individuales", "Baño privado"], disponible: true },
  { id: 22, nombre: "Habitación 22", tipo: "Doble cama con TV", categoria: "familiares", precio: 550, caracteristicas: ["2 camas Individuales", "Baño privado", "Televisor"], disponible: true },
  { id: 23, nombre: "Habitación 23", tipo: "Cama Matrimonial", categoria: "aire", precio: 1100, caracteristicas: ["Cama Queen", "Baño privado", "Aire Acondicionado"], disponible: true },
  { id: 24, nombre: "Habitación 24", tipo: "Cama Matrimonial", categoria: "aire", precio: 1100, caracteristicas: ["Cama Queen", "Baño privado", "Aire Acondicionado"], disponible: true },
  { id: 25, nombre: "Habitación 25", tipo: "Cama Matrimonial", categoria: "aire", precio: 1100, caracteristicas: ["Cama Queen", "Baño privado", "Aire Acondicionado"], disponible: true }
];

async function fetchHabitaciones() {
  try {
    const data = await apiCall('/habitaciones/');
    if (Array.isArray(data)) {
      habitaciones.length = 0;
      data.forEach(h => habitaciones.push(h));
      console.log('🏨 Habitaciones cargadas desde el Backend:', habitaciones.length);
    }
  } catch (error) {
    console.warn('Cargando habitaciones desde fallback local debido a error en API.');
    habitaciones.length = 0;
    habitacionesFallback.forEach(h => habitaciones.push(h));
  }
}

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
  const icons  = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const toast  = document.createElement('div');
  toast.style.cssText = `background:${colors[type]};color:white;padding:0.9rem 1.4rem;border-radius:12px;font-weight:600;font-size:0.92rem;box-shadow:0 6px 24px rgba(0,0,0,0.18);display:flex;align-items:center;gap:0.6rem;max-width:340px;animation:slideInToast 0.3s ease;`;
  toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
const toastStyle = document.createElement('style');
toastStyle.textContent = '@keyframes slideInToast{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}';
document.head.appendChild(toastStyle);

// =================== DATA LAYER (Sesiones locales de usuario) ===================
function initData() {
  if (!localStorage.getItem('usuarioActual')) {
    localStorage.setItem('usuarioActual', JSON.stringify(null));
  }
}

function getUsuarioActual() {
  return JSON.parse(localStorage.getItem('usuarioActual'));
}

function setUsuarioActual(usuario) {
  localStorage.setItem('usuarioActual', JSON.stringify(usuario));
}

function getUsuarios() {
  return usuariosLocales;
}

function getReservas() {
  return reservasLocales;
}

// =================== WORKFLOWS DE AUTENTICACIÓN (SQL SERVER DIRECTO) ===================

async function registrarUsuario(datos) {
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

  try {
    const res = await apiCall('/usuarios/registro/', {
      method: 'POST',
      body: JSON.stringify(datos)
    });
    showToast(res.message, 'success');
    return true;
  } catch (err) {
    showToast(err.message, 'error');
    return false;
  }
}

async function loginUsuario(nombre, password) {
  if (!nombre || !password) {
    showToast('Completa todos los campos.', 'warning'); return false;
  }

  try {
    const res = await apiCall('/usuarios/login/', {
      method: 'POST',
      body: JSON.stringify({ nombre, password })
    });
    
    localStorage.setItem('token', res.token);
    setUsuarioActual(res.user);
    
    // Sincronizar en segundo plano SIN esperar (fire-and-forget)
    // Así el login NO falla aunque haya un error de red temporal en la sync
    syncDataFromBackend();
    
    showToast(`¡Bienvenido, ${res.user.nombre}!`, 'success');
    return res.user.rol === 'admin' ? 'admin' : true;
  } catch (err) {
    showToast(err.message, 'error');
    return false;
  }
}

function logoutUsuario(silent = false) {
  localStorage.removeItem('token');
  setUsuarioActual(null);
  reservasLocales = [];
  usuariosLocales = [];
  if (!silent) {
    showToast('Has cerrado sesión correctamente.', 'info');
  }
}

// =================== DISPONIBILIDAD Y CÁLCULOS ===================
function reconciliarDisponibilidad() {
  // En este modo, la disponibilidad la gestiona directamente el servidor SQL Server.
  // Solo la reflejamos en el frontend de acuerdo al estado cargado.
}

function calcularDias(fechaIngreso, fechaSalida) {
  const diff = new Date(fechaSalida) - new Date(fechaIngreso);
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
