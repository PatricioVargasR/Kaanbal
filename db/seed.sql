PRAGMA foreing_keys = ON;

-- Insertar Niveles Educativos
INSERT INTO Nivel_educativo (nombre_nivel) VALUES
  ('Secundaria'),
  ('Bachillerato/Preparatoria');

-- Insertar Materias
INSERT INTO Materias (nombre_materia, nivel_educativo_id) VALUES
  ('Matemáticas', 1),
  ('Física', 1),
  ('Química', 1),
  ('Historia', 1),
  ('Español', 1),
  ('Matemáticas', 2),
  ('Física', 2),
  ('Química', 2),
  ('Historia', 2),
  ('Español', 2);

-- Insertar Temas
INSERT INTO Temas (nombre_tema, materia_id) VALUES
  ('Álgebra', 1),
  ('Geometría', 1),
  ('Probabilidad y Estadística', 1),
  ('Cálculo', 1),
  ('Aritmética', 1),
  ('Cinemática', 2),
  ('Ley de Ohm', 2),
  ('Electromagnetismo', 2),
  ('Trabajo y Energía', 2),
  ('Óptica', 2),
  ('Estequiometría', 3),
  ('Ácidos y Bases', 3),
  ('Reacciones Químicas', 3),
  ('Termodinámica', 3),
  ('Soluciones', 3),
  ('México Independiente', 4),
  ('Revolución Mexicana', 4),
  ('Historia Universal', 4),
  ('Imperios Antiguos', 4),
  ('Movimientos Sociales', 4),
  ('Lectura y Comprensión', 5),
  ('Redacción', 5),
  ('Ortografía y Gramática', 5),
  ('Literatura Mexicana', 5),
  ('Análisis de Textos', 5);

-- Insertar Criterios
INSERT INTO Criterio (cantidad, condicion) VALUES
  (5, 'Completado 5 preguntas correctas'),
  (10, 'Completado 10 preguntas correctas'),
  (15, 'Completado 15 preguntas correctas'),
  (20, 'Completado 20 preguntas correctas'),
  (30, 'Completado 30 preguntas correctas'),
  (1, 'Completado un curso'),
  (2, 'Completado dos cursos'),
  (5, 'Completado 5 unidades de contenido'),
  (10, 'Completado 10 unidades de contenido'),
  (5, 'Resuelto 5 exámenes correctamente');

-- Insertar Logros
INSERT INTO Logros (nombre_logro, icono_logro, descripcion, criterio_id) VALUES
  ('Logro de Álgebra Básica', 'math', 'Completaste el curso de Álgebra Básica.', 1),
  ('Logro de Geometría', 'geometry', 'Completaste el curso de Geometría.', 2),
  ('Logro de Probabilidad y Estadística', 'probability', 'Completaste el curso de Probabilidad y Estadística.', 3),
  ('Logro de Cálculo', 'calculus', 'Completaste el curso de Cálculo.', 4),
  ('Logro de Aritmética', 'arithmetic', 'Completaste el curso de Aritmética.', 5),
  ('Logro de Cinemática', 'kinematics', 'Completaste el curso de Cinemática.', 6),
  ('Logro de Ley de Ohm', 'ohm', 'Completaste el curso sobre la Ley de Ohm.', 7),
  ('Logro de Electromagnetismo', 'electromagnetism', 'Completaste el curso de Electromagnetismo.', 8),
  ('Logro de Trabajo y Energía', 'energy', 'Completaste el curso de Trabajo y Energía.', 9),
  ('Logro de Óptica', 'optics', 'Completaste el curso de Óptica.', 10),
  ('Logro de Estequiometría', 'stoichiometry', 'Completaste el curso de Estequiometría.', 11),
  ('Logro de Ácidos y Bases', 'acids', 'Completaste el curso sobre Ácidos y Bases.', 12),
  ('Logro de Reacciones Químicas', 'reactions', 'Completaste el curso sobre Reacciones Químicas.', 13),
  ('Logro de Termodinámica', 'thermodynamics', 'Completaste el curso de Termodinámica.', 14),
  ('Logro de Soluciones', 'solutions', 'Completaste el curso de Soluciones.', 15),
  ('Logro de Historia de México Independiente', 'mexico_independent', 'Completaste el curso de Historia de México Independiente.', 16),
  ('Logro de Revolución Mexicana', 'mexican_revolution', 'Completaste el curso de la Revolución Mexicana.', 17),
  ('Logro de Historia Universal', 'universal_history', 'Completaste el curso de Historia Universal.', 18),
  ('Logro de Literatura Mexicana', 'mexican_literature', 'Completaste el curso de Literatura Mexicana.', 19),
  ('Logro de Redacción y Ortografía', 'writing', 'Completaste el curso de Redacción y Ortografía.', 20);