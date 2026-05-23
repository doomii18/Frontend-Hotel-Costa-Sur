// ================================================================
//  data.js  — Capa de datos compartida entre usuario y admin
//  Hotel Costa Sur - Integración Exclusiva con SQL Server
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
async function apiCall(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Error del servidor (${response.status})`);
  }

  return response.json();
}

// Inicialización: Conecta a SQL Server cargando el catálogo de habitaciones
async function initBackendConnection() {
  try {
    console.log('Intentando conectar con el servidor SQL Server a través del backend...');
    
    // Cargar habitaciones reales de la base de datos SQL Server
    await fetchHabitaciones();
    
    // Si el usuario ya estaba logueado, sincronizar sus reservas y datos
    const currentUser = getUsuarioActual();
    if (currentUser) {
      await syncDataFromBackend();
    }
    
    console.log('🔌 Conectado exitosamente al Servidor SQL Server.');
  } catch (err) {
    console.error(' Error de conexión al backend/SQL Server:', err.message);
    showToast('No se pudo conectar al servidor SQL Server. Asegúrate de que el backend esté encendido.', 'error');
  }
}

// Sincroniza reservas y usuarios desde la BD real de SQL Server
async function syncDataFromBackend() {
  try {
    // Cargar mis reservas / todas las reservas (según rol)
    const res = await apiCall(isAdmin() ? '/reservas/' : '/reservas/mis-reservas/');
    reservasLocales = res;

    // Si es administrador, también cargar los usuarios
    if (isAdmin()) {
      const users = await apiCall('/usuarios/');
      usuariosLocales = users;
    }
  } catch (err) {
    console.error('Error al sincronizar datos desde SQL Server:', err.message);
  }
}

// Carga las habitaciones directamente de SQL Server
async function fetchHabitaciones() {
  const data = await apiCall('/habitaciones/');
  if (Array.isArray(data)) {
    habitaciones.length = 0;
    data.forEach(h => habitaciones.push(h));
    console.log('🏨 Habitaciones cargadas desde SQL Server:', habitaciones.length);
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
    
    // Sincronizar reservas y catálogo del usuario
    await syncDataFromBackend();
    
    showToast(`¡Bienvenido, ${res.user.nombre}!`, 'success');
    return res.user.rol === 'admin' ? 'admin' : true;
  } catch (err) {
    showToast(err.message, 'error');
    return false;
  }
}

function logoutUsuario() {
  localStorage.removeItem('token');
  setUsuarioActual(null);
  reservasLocales = [];
  usuariosLocales = [];
  showToast('Has cerrado sesión correctamente.', 'info');
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
