# 📊 CONFIGURACIÓN DE PostgreSQL EN RAILWAY

## 1️⃣ CREAR LA BASE DE DATOS EN RAILWAY

### Paso 1: Acceder a Railway
- Ve a https://railway.app/
- Inicia sesión con tu cuenta GitHub
- Abre o crea tu proyecto

### Paso 2: Agregar Plugin PostgreSQL
1. Click en **+ Create** (en la esquina inferior derecha)
2. Busca **PostgreSQL**
3. Selecciona **PostgreSQL** y click en **Deploy**

⏳ Espera 1-2 minutos a que se despliegue.

### Paso 3: Ver Variables de Entorno
1. Haz click en el servicio **PostgreSQL** que se creó
2. Ve a la pestaña **Variables**
3. Copia la variable `DATABASE_URL` completa

**Debería verse así:**
```
postgresql://user:password@host.proxy.rlwy.net:port/railway
```

---

## 2️⃣ ACTUALIZAR TU .env LOCAL

Edita el archivo `.env` en Backend-hotelCostaSur:

```bash
# Backend-hotelCostaSur/.env
DATABASE_URL=postgresql://user:password@host.proxy.rlwy.net:port/railway
DEBUG=True
SECRET_KEY=tu-clave-secreta
ALLOWED_HOSTS=*,localhost,127.0.0.1
```

---

## 3️⃣ VERIFICAR CONEXIÓN LOCALMENTE

Desde tu máquina local:

```bash
cd Backend-hotelCostaSur
python test_connection.py
```

**Esperado:**
```
PostgreSQL: ✅ PASS
Django ORM: ✅ PASS
Tablas: ✅ PASS (si no, ejecuta migrations)
Categorías: ✅ PASS
Habitaciones: ✅ PASS
```

Si falla la conexión:
```bash
# Instala psycopg2 si no lo tiene
pip install psycopg2-binary

# Vuelve a intentar
python test_connection.py
```

---

## 4️⃣ EJECUTAR MIGRACIONES EN RAILWAY

```bash
# Ver estado actual
python manage.py migrate --plan

# Aplicar migraciones
python manage.py migrate

# Cargar datos iniciales
python seed_db.py
```

**Salida esperada:**
```
Iniciando la siembra de la base de datos (Seeding)...
Categoría creada: Habitación Económica
Categoría creada: Habitación Estándar
Categoría creada: Suite Ejecutiva
...
Habitación 25 creada.
Base de datos sembrada con exito!
```

---

## 5️⃣ VERIFICAR EN RAILWAY CON psql

Desde tu terminal:

```bash
# Conectar a la BD en Railway
psql -h TUHOST.proxy.rlwy.net -U postgres -d railway -p TUPORT
```

Luego ejecuta en psql:

```sql
-- Ver tablas
\dt

-- Contar habitaciones
SELECT COUNT(*) FROM habitaciones;

-- Ver todas las habitaciones con categoría
SELECT h.id, h."Numero_Habitacion", c."NombreCategoria", h.precio 
FROM habitaciones h
LEFT JOIN "Categorias" c ON h.id_categoria = c.id_categoria
ORDER BY h.id;

-- Ver distribución
SELECT id_categoria, COUNT(*) FROM habitaciones GROUP BY id_categoria;
-- Debería retornar: (1,16), (2,6), (3,3)

\q
```

---

## 6️⃣ DESPLEGAR EN RAILWAY

### Si usas Railway CLI:

```bash
# Instalar Railway CLI (si no lo tiene)
npm install -g @railway/cli

# Loguearse
railway login

# Enlazar a tu proyecto
railway link

# Desplegar
railway up
```

### Si usas GitHub:

1. En Railway → Settings → GitHub
2. Conecta tu repositorio: `doomii18/Backend-hotelCostaSur`
3. Configura variables de entorno:
   - `DATABASE_URL`: (ya está en Railway)
   - `DEBUG=False` (para producción)
   - `SECRET_KEY=tu-clave-secreta`

4. Railway automáticamente:
   - Ejecuta `python manage.py collectstatic`
   - Ejecuta `python manage.py migrate`
   - Inicia con `gunicorn Config.wsgi`

---

## 7️⃣ SOLUCIONES DE PROBLEMAS

### Error: "could not translate host name to address"
```
❌ Host incorrecto en DATABASE_URL
✅ Copia la URL completa desde Railway → Variables
```

### Error: "FATAL: role 'postgres' does not exist"
```
❌ Credenciales incorrectas
✅ Copia DATABASE_URL desde Railway exactamente como aparece
```

### Error: "relation 'habitaciones' does not exist"
```
❌ Migraciones no ejecutadas
✅ Ejecuta: python manage.py migrate
```

### Las habitaciones no aparecen
```
❌ seed_db.py no ejecutado
✅ Ejecuta: python seed_db.py
```

### Errores de conexión desde Railway a BD
```
❌ BD no está en el mismo proyecto de Railway
✅ Verifica que PostgreSQL esté en el mismo proyecto
```

---

## ✅ FLUJO COMPLETO (Primera vez)

```bash
# 1. Actualizar .env con DATABASE_URL de Railway
# 2. Verificar conexión local
python test_connection.py

# 3. Crear migraciones (si es nueva BD)
python manage.py migrate

# 4. Cargar datos
python seed_db.py

# 5. Verificar con test_connection.py
python test_connection.py

# 6. (Opcional) Conectar via psql para verificar manual
psql -h HOST -U postgres -d railway -p PORT

# 7. Desplegar a Railway
railway up
```

---

## 🔗 VARIABLES RAILWAY NECESARIAS

En Railway → Environment Variables, asegúrate de tener:

```
DATABASE_URL=postgresql://...
DEBUG=False
SECRET_KEY=tu-clave-muy-segura
ALLOWED_HOSTS=tudominio.railway.app,localhost
```

---

## 📱 VERIFICAR QUE TODO FUNCIONA

Una vez desplegado:

```bash
# Ver logs en Railway
railway logs

# Probar endpoint
curl https://tudominio.railway.app/api/habitaciones/
```

Deberías recibir JSON con las 25 habitaciones.

---

## 🎯 RESUMEN

✅ PostgreSQL en Railway
✅ BD sincronizada con local
✅ 25 habitaciones cargadas
✅ Migraciones ejecutadas
✅ API lista para usar

¿Algún problema en algún paso? Avísame.
