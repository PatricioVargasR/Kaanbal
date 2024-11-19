-- Insertar Usuarios
INSERT INTO Usuarios (nombre, email, contrasena) VALUES
  ('Juan Pérez', 'juan.perez@example.com', 'hashed_password'),
  ('María García', 'maria.garcia@example.com', 'hashed_password');

-- Insertar Niveles Educativos
INSERT INTO Nivel_educativo (nombre_nivel) VALUES
  ('Básico'),
  ('Avanzado');

-- Insertar Materias
INSERT INTO Materias (nombre_materia, nivel_educativo_id) VALUES
  ('Matemáticas', 1),
  ('Física', 2);

-- Insertar Temas
INSERT INTO Temas (nombre_tema, materia_id) VALUES
  ('Álgebra', 1),
  ('Electromagnetismo', 2);

-- Insertar Notas
INSERT INTO Notas (usuario_id, nombre_archivo, contenido_pdf) VALUES
  (1, 'algebra_basico.pdf', 'fkajsldkfa'),
  (2, 'fisica_avanzada.pdf', 'lfajslkdfa');

-- Insertar Conversaciones IA
INSERT INTO Conversaciones_IA (nota_id) VALUES
  (1),
  (2);

-- Insertar Mensajes Conversación
INSERT INTO Mensajes_conversacion (conversacion_id, tipo, contenido) VALUES
  (1, 'usuario', '¿Cómo resuelvo esta ecuación cuadrática?'),
  (1, 'ia', 'Te explico paso a paso...');

-- Insertar Cursos
INSERT INTO Cursos (nombre_curso, usuario_id, tema_id, cantidad_preguntas) VALUES
  ('Curso de Álgebra Básica', 1, 1, 5),
  ('Curso de Física Avanzada', 2, 2, 7);

-- Insertar Explicaciones
INSERT INTO Explicaciones (curso_id, explicacion) VALUES
  (1, 'Este curso cubre los temas básicos de álgebra, como ecuaciones y sistemas lineales.'),
  (2, 'En este curso aprenderás sobre electromagnetismo, campos eléctricos y magnéticos.');

-- Insertar Preguntas
INSERT INTO Preguntas (curso_id, conversacion_id, tipo_pregunta, dificultad, pregunta, explicacion) VALUES
  (1, 1, 'opcion_multiple', 'facil', '¿Qué es una ecuación cuadrática?', 'Una ecuación cuadrática es de la forma ax² + bx + c = 0.'),
  (2, 2, 'unir', 'medio', 'Relaciona los conceptos de la física', 'Relaciona el campo eléctrico con el campo magnético.');

-- Insertar Opciones
INSERT INTO Opciones (pregunta_id, texto_opcion, es_correcta) VALUES
  (1, 'ax² + bx + c = 0', true),
  (1, 'x² + y² = r²', false);

-- Insertar Carpetas
INSERT INTO Carpetas (nombre_carpeta, curso_id, usuario_id, nota_id) VALUES
  ('Carpeta de Álgebra', 1, 1, 1),
  ('Carpeta de Física', 2, 2, 2);

-- Insertar Criterios
INSERT INTO Criterio (cantidad, condicion) VALUES
  (5, 'Completado 5 preguntas correctas'),
  (10, 'Completado 10 preguntas correctas');

-- Insertar Logros
INSERT INTO Logros (nombre_logro, descripcion, criterio_id) VALUES
  ('Logro de Álgebra', 'Completaste el curso de Álgebra Básica.', 1),
  ('Logro de Física', 'Completaste el curso de Física Avanzada.', 2);

-- Insertar Progreso de Logros
INSERT INTO Progreso_logros (usuario_id, logro_id, progreso, estado) VALUES
  (1, 1, 100, 'completado'),
  (2, 2, 50, 'en_progreso');
