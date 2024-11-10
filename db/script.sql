-- Tabla de Usuarios
DROP TABLE IF EXISTS Usuarios;

CREATE TABLE IF NOT EXISTS Usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    contrasena TEXT NOT NULL,
    avatar BYTEA,
    fecha_registro TIMESTAMPTZ DEFAULT NOW(),
    proveedor_auth TEXT NOT NULL
);

-- Tabla de Nivel Educativo
DROP TABLE IF EXISTS Nivel_educativo;

CREATE TABLE IF NOT EXISTS Nivel_educativo (
    id_nivel_educativo SERIAL PRIMARY KEY,
    nombre_nivel TEXT NOT NULL
);

-- Tabla de Materias
DROP TABLE IF EXISTS Materias;

CREATE TABLE IF NOT EXISTS Materias (
    id_materia SERIAL PRIMARY KEY,
    nombre_materia TEXT NOT NULL,
    nivel_educativo_id INTEGER REFERENCES Nivel_educativo(id_nivel_educativo) ON DELETE CASCADE
);

-- Tabla de Temas
DROP TABLE IF EXISTS Temas;

CREATE TABLE IF NOT EXISTS Temas (
    id_tema SERIAL PRIMARY KEY,
    nombre_tema TEXT NOT NULL,
    materia_id INTEGER REFERENCES Materias(id_materia) ON DELETE CASCADE
);

-- Tabla de Notas
DROP TABLE IF EXISTS Notas;

CREATE TABLE IF NOT EXISTS Notas (
    id_nota SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    nombre_archivo TEXT NOT NULL,
    contenido_pdf BYTEA NOT NULL,
    fecha_subida TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Conversaciones IA
DROP TABLE IF EXISTS Conversaciones_IA;

CREATE TABLE IF NOT EXISTS Conversaciones_IA (
    id_conversacion SERIAL PRIMARY KEY,
    nota_id INTEGER REFERENCES Notas(id_nota) ON DELETE CASCADE,
    fecha_conversacion TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Mensajes Conversación
DROP TABLE IF EXISTS Mensajes_conversacion;

CREATE TYPE tipo_mensaje AS ENUM ('usuario', 'ia');

CREATE TABLE IF NOT EXISTS Mensajes_conversacion (
    id_mensaje SERIAL PRIMARY KEY,
    conversacion_id INTEGER REFERENCES Conversaciones_IA(id_conversacion) ON DELETE CASCADE,
    tipo tipo_mensaje NOT NULL,
    contenido TEXT NOT NULL
);

-- Tabla de Cursos
DROP TABLE IF EXISTS Cursos;

CREATE TABLE IF NOT EXISTS Cursos (
    id_curso SERIAL PRIMARY KEY,
    nombre_curso TEXT NOT NULL,
    fecha_creacion TIMESTAMPTZ DEFAULT NOW(),
    usuario_id INTEGER REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    tema_id INTEGER REFERENCES Temas(id_tema) ON DELETE CASCADE,
    cantidad_preguntas INTEGER NOT NULL
);

-- Tabla de Explicaciones
DROP TABLE IF EXISTS Explicaciones;

CREATE TABLE IF NOT EXISTS Explicaciones (
    id_explicacion SERIAL PRIMARY KEY,
    curso_id INTEGER REFERENCES Cursos(id_curso) ON DELETE CASCADE,
    explicacion TEXT NOT NULL
);

-- Tabla de Preguntas
DROP TABLE IF EXISTS Preguntas;

CREATE TYPE tipo_pregunta AS ENUM ('opcion_multiple', 'completar', 'unir', 'buscar');
CREATE TYPE dificultad_pregunta AS ENUM ('facil', 'medio', 'dificil');

CREATE TABLE IF NOT EXISTS Preguntas (
    id_pregunta SERIAL PRIMARY KEY,
    curso_id INTEGER REFERENCES Cursos(id_curso) ON DELETE CASCADE,
    conversacion_id INTEGER REFERENCES Conversaciones_IA(id_conversacion) ON DELETE SET NULL,
    tipo_pregunta tipo_pregunta NOT NULL,
    dificultad dificultad_pregunta DEFAULT 'medio',
    pregunta TEXT NOT NULL,
    explicacion TEXT NOT NULL,
    completada_primera_vez BOOLEAN DEFAULT false,
    completada BOOLEAN DEFAULT false
);

-- Tabla de Opciones
DROP TABLE IF EXISTS Opciones;

CREATE TABLE IF NOT EXISTS Opciones (
    id_opcion SERIAL PRIMARY KEY,
    pregunta_id INTEGER REFERENCES Preguntas(id_pregunta) ON DELETE CASCADE,
    texto_opcion TEXT NOT NULL,
    es_correcta BOOLEAN NOT NULL
);

-- Tabla de Carpetas
DROP TABLE IF EXISTS Carpetas;

CREATE TABLE IF NOT EXISTS Carpetas (
    id_carpeta SERIAL PRIMARY KEY,
    nombre_carpeta TEXT NOT NULL,
    curso_id INTEGER REFERENCES Cursos(id_curso) ON DELETE CASCADE,
    usuario_id INTEGER REFERENCES Usuarios(id_usuario) ON DELETE CASCADE
);

-- Tabla de Logros
DROP TABLE IF EXISTS Logros;

CREATE TABLE IF NOT EXISTS Logros (
    id_logro SERIAL PRIMARY KEY,
    nombre_logro TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    criterio_id INTEGER REFERENCES Criterio(id_criterio) ON DELETE CASCADE
);

-- Tabla de Progreso de Logros
DROP TABLE IF EXISTS Progreso_logros;

CREATE TYPE estado_logro AS ENUM ('en_progreso', 'completado');

CREATE TABLE IF NOT EXISTS Progreso_logros (
    id_progreso SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    logro_id INTEGER REFERENCES Logros(id_logro) ON DELETE CASCADE,
    progreso INTEGER NOT NULL,
    estado estado_logro DEFAULT 'en_progreso',
    fecha_completado TIMESTAMPTZ
);

-- Tabla de Criterio
DROP TABLE IF EXISTS Criterio;

CREATE TABLE IF NOT EXISTS Criterio(
    id_criterio SERIAL PRIMARY KEY,
    cantidad INT NOT NULL,
    condicion TEXT NOT NULL
);