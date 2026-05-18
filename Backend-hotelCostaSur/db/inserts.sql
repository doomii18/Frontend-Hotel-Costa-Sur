USE HotelCostaSur;
GO

-- 1. Insertar Categorías de Habitaciones
INSERT INTO Categorias (id_categoria, NombreCategoria) VALUES
(1, N'estandar'),
(2, N'familiares'),
(3, N'aire');
GO

-- 2. Insertar las 25 habitaciones oficiales con sus atributos en formato UNICODE (prefijo N)
INSERT INTO habitaciones (id_habitacion, nombre, tipo, id_categoria, precio, caracteristicas, disponible, televisor, aire) VALUES
(1, N'Habitación 1', N'Dos camas', 1, 500.00, N'["2 camas, Matrimonial e Individual", "Baño privado"]', 1, 0, 0),
(2, N'Habitación 2', N'Dos camas', 1, 500.00, N'["2 camas, Matrimonial e Individual", "Baño privado"]', 1, 0, 0),
(3, N'Habitación 3', N'Matrimonial', 1, 400.00, N'["Cama matrimonial", "Baño privado"]', 1, 0, 0),
(4, N'Habitación 4', N'Dos camas', 1, 500.00, N'["2 camas Individuales", "Baño privado"]', 1, 0, 0),
(5, N'Habitación 5', N'Matrimonial', 1, 400.00, N'["Cama matrimonial", "Baño privado"]', 1, 0, 0),
(6, N'Habitación 6', N'Matrimonial', 1, 400.00, N'["Cama matrimonial", "Baño privado"]', 1, 0, 0),
(7, N'Habitación 7', N'Dos camas con TV', 2, 550.00, N'["2 camas Individuales", "Baño privado"]', 1, 1, 0),
(8, N'Habitación 8', N'Dos camas con TV', 2, 550.00, N'["2 camas Individuales", "Baño privado"]', 1, 1, 0),
(9, N'Habitación 9', N'Matrimonial con TV', 1, 450.00, N'["Cama matrimonial", "Baño privado"]', 1, 1, 0),
(10, N'Habitación 10', N'Matrimonial con TV', 1, 450.00, N'["Cama matrimonial", "Baño privado"]', 1, 1, 0),
(11, N'Habitación 11', N'Matrimonial con TV', 1, 450.00, N'["Cama matrimonial", "Baño privado"]', 1, 1, 0),
(12, N'Habitación 12', N'Matrimonial con TV', 1, 450.00, N'["Cama matrimonial", "Baño privado"]', 1, 1, 0),
(13, N'Habitación 13', N'Matrimonial con TV', 1, 450.00, N'["Cama matrimonial", "Baño privado"]', 1, 1, 0),
(14, N'Habitación 14', N'Matrimonial con TV', 1, 450.00, N'["Cama matrimonial", "Baño privado"]', 1, 1, 0),
(15, N'Habitación 15', N'Matrimonial', 1, 400.00, N'["Cama matrimonial", "Baño privado"]', 1, 0, 0),
(16, N'Habitación 16', N'Doble cama sin TV', 1, 500.00, N'["2 camas Individuales", "Baño privado"]', 1, 0, 0),
(17, N'Habitación 17', N'Matrimonial', 1, 400.00, N'["Cama matrimonial", "Baño privado"]', 1, 0, 0),
(18, N'Habitación 18', N'Matrimonial', 1, 400.00, N'["Cama matrimonial", "Baño privado"]', 1, 0, 0),
(19, N'Habitación 19', N'Dos camas matrimoniales', 2, 700.00, N'["2 camas matrimoniales", "Baño privado"]', 1, 0, 0),
(20, N'Habitación 20', N'Cuatro camas', 2, 900.00, N'["4 camas individuales", "Baño privado"]', 1, 0, 0),
(21, N'Habitación 21', N'Triple cama', 2, 700.00, N'["3 camas individuales", "Baño privado"]', 1, 0, 0),
(22, N'Habitación 22', N'Doble cama con TV', 2, 550.00, N'["2 camas Individuales", "Baño privado"]', 1, 1, 0),
(23, N'Habitación 23', N'Cama Matrimonial', 3, 1100.00, N'["Cama Queen", "Baño privado"]', 1, 1, 1),
(24, N'Habitación 24', N'Cama Matrimonial', 3, 1100.00, N'["Cama Queen", "Baño privado"]', 0, 1, 1), -- Ocupada por defecto
(25, N'Habitación 25', N'Cama Matrimonial', 3, 1100.00, N'["Cama Queen", "Baño privado"]', 1, 1, 1);
GO

-- 3. Crear Usuario Huésped de Pruebas (invitado / 12345678)
-- Contraseña encriptada en SHA-256: 2407137f81b8470c9d4bc0e92f4372ebb150b904944ec400f074d081f95a438e
INSERT INTO usuarios (usuario, correo, contrasena, rol) VALUES
(N'invitado', N'invitado@gmail.com', N'2407137f81b8470c9d4bc0e92f4372ebb150b904944ec400f074d081f95a438e', N'user');
GO
