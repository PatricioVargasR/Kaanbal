PRAGMA foreing_keys = ON;

-- Tabla de Usuarios
DROP TABLE IF EXISTS Usuarios;

CREATE TABLE IF NOT EXISTS Usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    edad TEXT,
    email TEXT NOT NULL UNIQUE,
    contrasena TEXT,
    avatar BLOB,
    imagen_usuario TEXT,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    proveedor_auth TEXT
);

-- Tabla de Nivel Educativo
DROP TABLE IF EXISTS Nivel_educativo;

CREATE TABLE IF NOT EXISTS Nivel_educativo (
    id_nivel_educativo INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_nivel TEXT NOT NULL
);

-- Tabla de Materias
DROP TABLE IF EXISTS Materias;

CREATE TABLE IF NOT EXISTS Materias (
    id_materia INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_materia TEXT NOT NULL,
    nivel_educativo_id INTEGER REFERENCES Nivel_educativo(id_nivel_educativo) ON DELETE CASCADE
);

-- Tabla de Temas
DROP TABLE IF EXISTS Temas;

CREATE TABLE IF NOT EXISTS Temas (
    id_tema INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_tema TEXT NOT NULL,
    materia_id INTEGER REFERENCES Materias(id_materia) ON DELETE CASCADE
);

-- Tabla de Notas
DROP TABLE IF EXISTS Notas;

CREATE TABLE IF NOT EXISTS Notas (
    id_nota INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    nombre_archivo TEXT NOT NULL,
    contenido_pdf TEXT NOT NULL,
    fecha_subida DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Conversaciones IA
DROP TABLE IF EXISTS Conversaciones_IA;

CREATE TABLE IF NOT EXISTS Conversaciones_IA (
    id_conversacion INTEGER PRIMARY KEY AUTOINCREMENT,
    nota_id INTEGER REFERENCES Notas(id_nota) ON DELETE CASCADE,
    fecha_conversacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Mensajes Conversación
DROP TABLE IF EXISTS Mensajes_conversacion;


CREATE TABLE IF NOT EXISTS Mensajes_conversacion (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    conversacion_id INTEGER REFERENCES Conversaciones_IA(id_conversacion) ON DELETE CASCADE,
    role TEXT CHECK(role in ('user', 'assistant')) NOT NULL,
    content TEXT NOT NULL
);

-- Tabla de Cursos
DROP TABLE IF EXISTS Cursos;

CREATE TABLE IF NOT EXISTS Cursos (
    id_curso INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_curso TEXT NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    usuario_id INTEGER REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    tema_id INTEGER REFERENCES Temas(id_tema) ON DELETE CASCADE,
    cantidad_preguntas INTEGER NOT NULL
);

-- Tabla de Explicaciones
DROP TABLE IF EXISTS Explicaciones;

CREATE TABLE IF NOT EXISTS Explicaciones (
    id_explicacion INTEGER PRIMARY KEY AUTOINCREMENT,
    curso_id INTEGER REFERENCES Cursos(id_curso) ON DELETE CASCADE,
    explicacion TEXT NOT NULL
);

-- Tabla de Preguntas
DROP TABLE IF EXISTS Preguntas;

CREATE TABLE IF NOT EXISTS Preguntas (
    id_pregunta INTEGER PRIMARY KEY AUTOINCREMENT,
    curso_id INTEGER REFERENCES Cursos(id_curso) ON DELETE CASCADE,
    conversacion_id INTEGER REFERENCES Conversaciones_IA(id_conversacion) ON DELETE CASCADE,
    tipo_pregunta TEXT CHECK(tipo_pregunta IN ('multiple_choice', 'true false', 'multiple select')) NOT NULL,
    dificultad TEXT CHECK(dificultad IN ('facil', 'medio', 'dificil')) NOT NULL,
    pregunta TEXT NOT NULL,
    explicacion TEXT NOT NULL,
    completada_primera_vez BOOLEAN DEFAULT false,
    completada BOOLEAN DEFAULT false
);

-- Tabla de Opciones
DROP TABLE IF EXISTS Opciones;

CREATE TABLE IF NOT EXISTS Opciones (
    id_opcion INTEGER PRIMARY KEY AUTOINCREMENT,
    pregunta_id INTEGER REFERENCES Preguntas(id_pregunta) ON DELETE CASCADE,
    texto_opcion TEXT NOT NULL,
    es_correcta BOOLEAN NOT NULL
);

-- Tabla de Carpetas
DROP TABLE IF EXISTS Carpetas;

CREATE TABLE IF NOT EXISTS Carpetas (
    id_carpeta INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_carpeta TEXT NOT NULL,
    curso_id INTEGER REFERENCES Cursos(id_curso) ON DELETE CASCADE,
    usuario_id INTEGER REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    nota_id INTEGER REFERENCES Notas(id_nota) ON DELETE CASCADE
);

-- Tabla de Logros
DROP TABLE IF EXISTS Logros;

CREATE TABLE IF NOT EXISTS Logros (
    id_logro INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_logro TEXT NOT NULL,
    icono_logro TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    criterio_id INTEGER REFERENCES Criterio(id_criterio) ON DELETE CASCADE
);

-- Tabla de Progreso de Logros
DROP TABLE IF EXISTS Progreso_logros;

CREATE TABLE IF NOT EXISTS Progreso_logros (
    id_progreso INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    logro_id INTEGER REFERENCES Logros(id_logro) ON DELETE CASCADE,
    progreso INTEGER NOT NULL,
    estado TEXT CHECK(estado in ('en_progreso', 'completado')) DEFAULT 'en_progreso',
    fecha_completado DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Criterio
DROP TABLE IF EXISTS Criterio;

CREATE TABLE IF NOT EXISTS Criterio(
    id_criterio INTEGER PRIMARY KEY AUTOINCREMENT,
    cantidad INT NOT NULL,
    condicion TEXT NOT NULL
);
