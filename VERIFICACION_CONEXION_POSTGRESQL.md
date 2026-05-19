# 📋 GUÍA COMPLETA: Verificar Conexión a PostgreSQL y Cargar Datos

## ✅ PASO 1: Verificar Conexión a la Base de Datos

### Opción A: Usar el script de verificación (RECOMENDADO)

```bash
cd Backend-hotelCostaSur
python test_connection.py
```

**Qué hace:**
- ✅ Verifica conexión a PostgreSQL (nivel bajo)
- ✅ Verifica conexión Django ORM
- ✅ Lista todas las tablas
- ✅ Verifica categorías y habitaciones
- ✅ Muestra resumen de estado

**Salida esperada:**
```
============================================================
VERIFICADOR DE CONEXIÓN - HOTEL COSTA SUR
============================================================

============================================================
1. PROBANDO CONEXIÓN A PostgreSQL (nivel bajo)
============================================================

📊 Configuración de BD:
   ENGINE: django.db.backends.postgresql
   NAME: railway
   USER: postgres
   HOST: switchback.proxy.rlwy.net
   PORT: 14898

✅ Conexión a PostgreSQL: EXITOSA

🗄️  Versión PostgreSQL: PostgreSQL 15.x...

============================================================
📋 RESUMEN DE VERIFICACIÓN
============================================================
PostgreSQL: ✅ PASS
Django ORM: ✅ PASS
Tablas: ✅ PASS
Categorías: ✅ PASS
Habitaciones: ✅ PASS
============================================================
```

### Opción B: Conectar directamente con psql

```bash
# Usar variables de .env
psql -h switchback.proxy.rlwy.net -U postgres -d railway -p 14898
```

Dentro de psql:
```sql
-- Ver todas las tablas
\dt

-- Ver estructura de habitaciones
\d habitaciones

-- Contar habitaciones
SELECT COUNT(*) FROM habitaciones;

-- Ver todas las habitaciones con categoría
SELECT h.id, h.Numero_Habitacion, c."NombreCategoria", h.precio 
FROM habitaciones h
LEFT JOIN "Categorias" c ON h.id_categoria = c.id_categoria
ORDER BY h.id;

-- Salir
\q
```

---

## 🔄 PASO 2: Ejecutar Migraciones

Si es la primera vez o las tablas no existen:

```bash
cd Backend-hotelCostaSur
python manage.py migrate
```

**Qué crea:**
- Tabla `usuarios`
- Tabla `Categorias`
- Tabla `habitaciones`
- Tabla `clientes`
- Tabla `reservas`
- Tabla `participantes_sorteo`

---

## 🌱 PASO 3: Cargar Datos Iniciales (Seed)

```bash
cd Backend-hotelCostaSur
python seed_db.py
```

**Qué carga:**
- ✅ 3 categorías (Económica, Estándar, Ejecutiva)
- ✅ 25 habitaciones con tus datos exactos
- ✅ Usuario administrador
- ✅ Usuario de prueba

**Salida esperada:**
```
Iniciando la siembra de la base de datos (Seeding)...
Categoría creada: Habitación Económica
Categoría creada: Habitación Estándar
Categoría creada: Suite Ejecutiva
Usuario administrador creado.
Usuario huésped de prueba creado.
Habitación 1 creada.
Habitación 2 creada.
...
Habitación 25 creada.
Base de datos sembrada con exito!
```

---

## 🔍 PASO 4: Verificar Datos Exactos en PostgreSQL

### Query para ver todas las habitaciones:

```sql
SELECT 
  h.id,
  h.Numero_Habitacion,
  c."NombreCategoria" as categoria,
  h.precio,
  h.Descripcion,
  CASE WHEN h."Estado" = true THEN 'Disponible' ELSE 'No disponible' END as estado
FROM habitaciones h
LEFT JOIN "Categorias" c ON h.id_categoria = c.id_categoria
ORDER BY h.id;
```

### Verificar datos específicos por categoría:

```sql
-- Habitaciones Económicas (Categoría 1)
SELECT * FROM habitaciones 
WHERE id_categoria = 1 
ORDER BY id;

-- Habitaciones Estándar (Categoría 2)
SELECT * FROM habitaciones 
WHERE id_categoria = 2 
ORDER BY id;

-- Suites Ejecutivas (Categoría 3)
SELECT * FROM habitaciones 
WHERE id_categoria = 3 
ORDER BY id;
```

### Contar habitaciones por categoría:

```sql
SELECT 
  c."NombreCategoria" as categoria,
  COUNT(h.id) as cantidad,
  AVG(h.precio::numeric) as precio_promedio,
  MIN(h.precio) as precio_minimo,
  MAX(h.precio) as precio_maximo
FROM habitaciones h
JOIN "Categorias" c ON h.id_categoria = c.id_categoria
GROUP BY c."NombreCategoria", h.id_categoria
ORDER BY h.id_categoria;
```

---

## 🧪 PASO 5: Probar desde la API Django

```bash
cd Backend-hotelCostaSur
python manage.py runserver
```

### Endpoints para probar:

```bash
# Ver todas las habitaciones
curl http://localhost:8000/api/habitaciones/

# Ver una habitación específica
curl http://localhost:8000/api/habitaciones/1/

# Ver todas las categorías
curl http://localhost:8000/api/categorias/

# Ver una categoría específica
curl http://localhost:8000/api/categorias/1/
```

---

## 📊 PASO 6: Verificar Datos Exactos de tu INSERT

Tu INSERT mencionaba estas 25 habitaciones. Verifica que todas estén presentes:

```sql
-- Verificar que existan exactamente 25 habitaciones
SELECT COUNT(*) as total FROM habitaciones;
-- Debería retornar: 25

-- Verificar distribución por categoría
SELECT id_categoria, COUNT(*) as cantidad 
FROM habitaciones 
GROUP BY id_categoria
ORDER BY id_categoria;
-- Debería retornar:
-- id_categoria | cantidad
-- 1            | 16
-- 2            | 6
-- 3            | 3

-- Verificar precios específicos
SELECT precio, COUNT(*) as cantidad
FROM habitaciones
GROUP BY precio
ORDER BY precio DESC;

-- Debería incluir: 1100, 900, 700, 550, 500, 450, 400
```

---

## 🚀 Flujo Completo (Primera Vez)

```bash
# 1. Navegar al backend
cd Backend-hotelCostaSur

# 2. Crear migraciones
python manage.py migrate

# 3. Cargar datos iniciales
python seed_db.py

# 4. Verificar conexión
python test_connection.py

# 5. Iniciar servidor
python manage.py runserver

# 6. En otra terminal, probar API
curl http://localhost:8000/api/habitaciones/ | python -m json.tool
```

---

## 🔧 Solución de Problemas

### Error: "psycopg2.OperationalError: connection refused"
```
❌ La BD no está accessible
✅ Solución: Verificar que DATABASE_URL en .env sea correcto
```

### Error: "Table already exists"
```
❌ Las tablas ya existen pero tienes datos viejos
✅ Solución: Borrar e recrear BD en Railway
```

### Error: "relation 'habitaciones' does not exist"
```
❌ Las migraciones no se ejecutaron
✅ Solución: Ejecutar: python manage.py migrate
```

### Las habitaciones no tienen datos
```
❌ No ejecutaste seed_db.py
✅ Solución: Ejecutar: python seed_db.py
```

---

## 📝 Resumen de Cambios Realizados

✅ **Actualizado `seed_db.py`:**
- Ahora carga exactamente las 25 habitaciones de tu INSERT
- Precios correctos: 400, 450, 500, 550, 700, 900, 1100
- Descripciones exactas de cada habitación
- Solo 3 categorías: Económica, Estándar, Ejecutiva

✅ **Creado `test_connection.py`:**
- Verifica conexión a PostgreSQL
- Lista tablas y datos
- Valida que todo esté funcionando

---

## ✨ Próximos Pasos

1. Ejecuta `python test_connection.py`
2. Si todo es ✅, ejecuta `python seed_db.py`
3. Verifica con `python manage.py runserver`
4. Prueba los endpoints de API
