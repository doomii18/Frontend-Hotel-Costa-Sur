# 🚀 GUÍA PASO A PASO: RAILWAY + PostgreSQL

## 📍 PASO 1: Crear PostgreSQL en Railway

### 1.1 Acceder a Railway
```
1. Ve a https://railway.app/
2. Haz login con GitHub (usuario: doomii18)
3. Selecciona tu proyecto "Hotel Costa Sur"
```

### 1.2 Agregar PostgreSQL
```
1. Click en "+ Create" (botón grande abajo a la derecha)
2. Busca "PostgreSQL"
3. Click en "PostgreSQL" → "Deploy"
4. Espera 2-3 minutos a que se despliegue
```

### 1.3 Copiar Credenciales
```
1. En Railway, haz click en el servicio "PostgreSQL"
2. Ve a la pestaña "Variables"
3. Copia LA VARIABLE COMPLETA "DATABASE_URL"
   ↓
   Debería verse así:
   postgresql://postgres:PASSWORDXXXXXX@container-XXXXX.proxy.rlwy.net:5432/railway
```

---

## 📍 PASO 2: Actualizar Archivos Locales

### 2.1 Editar `.env` del Backend

**Archivo:** `Backend-hotelCostaSur/.env`

```bash
# Reemplaza esto:
DATABASE_URL=postgresql://postgres:paBlvmPgaFnDoNKAOBOpoeWwWXTxGVcO@switchback.proxy.rlwy.net:14898/railway

# Por lo que copiaste de Railway en el PASO 1.3
DATABASE_URL=postgresql://postgres:TU_PASSWORD@container-XXXXX.proxy.rlwy.net:5432/railway

DEBUG=True
SECRET_KEY=django-insecure-hotelcostasur2026_secretrandomkeyhere
ALLOWED_HOSTS=*,localhost,127.0.0.1
```

---

## 📍 PASO 3: Verificar Conexión

Desde tu terminal (en la carpeta Backend-hotelCostaSur):

```bash
python test_connection.py
```

**Debería mostrar:**
```
PostgreSQL: ✅ PASS
Django ORM: ✅ PASS
Tablas: ⚠️ No hay tablas (normal si es primera vez)
```

Si ves errores de conexión:
- Verifica que copiaste correctamente el DATABASE_URL
- Asegúrate de que PostgreSQL está desplegado en Railway
- Revisa que el .env esté guardado

---

## 📍 PASO 4: Configurar Base de Datos

Ejecuta el script automático:

```bash
python setup_railway.py
```

Este script va a:
1. ✅ Verificar conexión a PostgreSQL
2. ✅ Crear todas las tablas (migraciones)
3. ✅ Cargar las 25 habitaciones exactas
4. ✅ Verificar que todo está bien

**Cuando pregunte, responde "s" a todo:**
```
¿Ejecutar migraciones? → s
¿Cargar datos iniciales? → s
```

---

## 📍 PASO 5: Verificar en Railway

Abre psql desde tu terminal:

```bash
# Reemplaza HOST y PORT según tu DATABASE_URL
psql -h container-XXXXX.proxy.rlwy.net -U postgres -d railway -p 5432
```

Luego ejecuta:

```sql
-- Ver todas las tablas
\dt

-- Contar habitaciones
SELECT COUNT(*) FROM habitaciones;
-- Debería retornar: 25

-- Ver las habitaciones
SELECT id, "Numero_Habitacion", precio 
FROM habitaciones 
ORDER BY id 
LIMIT 5;

-- Salir
\q
```

---

## 📍 PASO 6: Desplegar Backend en Railway

### Opción A: Deploy automático (RECOMENDADO)

```bash
1. En Railway → Settings
2. Click en "GitHub"
3. Conecta el repositorio: doomii18/Backend-hotelCostaSur
4. Railway automáticamente:
   - Detecta cambios en main
   - Ejecuta migraciones
   - Inicia el servidor con gunicorn
```

### Opción B: Deploy manual

```bash
# Instalar Railway CLI (si no lo tienes)
npm install -g @railway/cli

# Desde Backend-hotelCostaSur
railway login
railway link
railway up
```

---

## 📍 PASO 7: Verificar que Todo Funciona

### En el Dashboard de Railway:

```
1. Abre tu proyecto en Railway
2. Verifica que el servicio Backend esté "Running"
3. Click en Backend → "Logs"
4. Deberías ver:
   Starting with pid ...
   Listening on unix socket /tmp/gunicorn.sock
```

### Probar la API:

```bash
# Si ya desplegaste:
curl https://tu-backend.railway.app/api/habitaciones/ | python -m json.tool

# Si aún está local:
python manage.py runserver
curl http://localhost:8000/api/habitaciones/ | python -m json.tool
```

**Debería retornar JSON con las 25 habitaciones**

---

## 🆘 PROBLEMAS COMUNES Y SOLUCIONES

### ❌ "Error: could not connect to server"
**Causa:** PostgreSQL no desplegado o DATABASE_URL incorrecto
```bash
✅ Solución:
1. Verifica que PostgreSQL esté "Running" en Railway
2. Copia el DATABASE_URL exactamente como aparece
3. Actualiza el .env
4. Ejecuta: python test_connection.py
```

### ❌ "FATAL: role 'postgres' does not exist"
**Causa:** Credenciales incorrectas
```bash
✅ Solución:
1. Abre Railway
2. Haz click en PostgreSQL → Variables
3. Copia DATABASE_URL COMPLETA
4. Reemplaza en .env
```

### ❌ "relation 'habitaciones' does not exist"
**Causa:** Migraciones no ejecutadas
```bash
✅ Solución:
python setup_railway.py
# Responde "s" a las preguntas
```

### ❌ No hay datos en las habitaciones
**Causa:** seed_db.py no ejecutado
```bash
✅ Solución:
python seed_db.py
# O usa setup_railway.py
```

### ❌ "SyntaxError" al ejecutar setup_railway.py
**Causa:** psycopg2 no instalado
```bash
✅ Solución:
pip install psycopg2-binary
python setup_railway.py
```

---

## ✅ CHECKLIST FINAL

Verifica que tienes:

- [ ] PostgreSQL desplegado en Railway
- [ ] DATABASE_URL copiado en .env
- [ ] `python test_connection.py` retorna ✅
- [ ] `python setup_railway.py` completado
- [ ] 25 habitaciones en la BD
- [ ] Backend desplegado en Railway (opcional pero recomendado)
- [ ] API responde con JSON de habitaciones

---

## 📊 ESTADO ESPERADO

Después de completar todos los pasos:

```
✅ PostgreSQL en Railway con 25 habitaciones
✅ Backend puede conectarse y hacer queries
✅ API expone datos de habitaciones
✅ Migraciones aplicadas
✅ Datos iniciales cargados
✅ Listo para producción

URLs importantes:
- API Backend: https://tu-backend.railway.app/api/
- PostgreSQL Host: container-XXXXX.proxy.rlwy.net:5432
- Habitaciones: https://tu-backend.railway.app/api/habitaciones/
```

---

## 🎓 COMANDOS RÁPIDOS DE REFERENCIA

```bash
# Verificar todo está bien
python test_connection.py

# Setup completo (migrations + datos)
python setup_railway.py

# Ver logs del servidor
railway logs

# Conectar a BD con psql
psql -h HOST -U postgres -d railway -p PORT

# Ejecutar migraciones manualmente
python manage.py migrate

# Cargar datos manualmente
python seed_db.py

# Iniciar servidor local
python manage.py runserver

# Ver estado de Railway
railway status

# Redeploy
railway up
```

---

## ❓ ¿NECESITAS AYUDA?

Si algo no funciona:

1. Revisa los "PROBLEMAS COMUNES Y SOLUCIONES"
2. Ejecuta `python test_connection.py` y comparte el error
3. Verifica los Logs en Railway Dashboard
4. Revisa el archivo `.env` esté guardado correctamente

¡El sistema está diseñado para ser simple y automático!
