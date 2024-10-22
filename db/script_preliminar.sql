-- Script preliminar de la idea de base de datos
-- se debe de hacer modificaciones

-- Tabla de usuario
create table usuarios (
  id bigint primary key generated always as identity,
  nombre text not null,
  email text not null unique,
  "contraseña" text not null,
  avatar text,
  fecha_registro timestamp with time zone default now(),
  proveedor_auth text
);

-- Tabla de cursos
create table cursos (
  id bigint primary key generated always as identity,
  titulo text not null,
  descripcion text,
  fecha_creacion timestamp with time zone default now(),
  autor_id bigint references usuarios (id)
);

-- Tabla del progreso del usuario para las estadísticas
create table progreso_usuario (
  id bigint primary key generated always as identity,
  usuario_id bigint references usuarios (id),
  curso_id bigint references cursos (id),
  progreso numeric(5, 2) default 0.00,
  fecha_ultima_actualizacion timestamp with time zone default now()
);

-- Tabla de notas o archivos pdf
create table notas (
  id bigint primary key generated always as identity,
  usuario_id bigint references usuarios (id),
  titulo text not null,
  contenido_pdf bytea,
  fecha_subida timestamp with time zone default now()
);

-- Tabla de logros de la aplicaicón
create table logros (
  id bigint primary key generated always as identity,
  usuario_id bigint references usuarios (id),
  descripcion text not null,
  fecha_logro timestamp with time zone default now()
);

-- Tabla de estadísticas del usaurio
create table estadisticas (
  id bigint primary key generated always as identity,
  usuario_id bigint references usuarios (id),
  curso_id bigint references cursos (id),
  tiempo_estudio interval,
  puntuacion numeric(5, 2),
  fecha_actualizacion timestamp with time zone default now()
);

-- Tabla de la plantilla de la IA (opcional con preferencia de borrarla)
create table plantillas_instrucciones (
  id bigint primary key generated always as identity,
  titulo text not null,
  contenido text not null
);

-- Tabla de las preguntas generadas junto a sus explicaciones
create table preguntas_explicaciones (
  id bigint primary key generated always as identity,
  curso_id bigint references cursos (id),
  pregunta text not null,
  explicacion text
);

drop table if exists logros cascade;

-- Tabla de logros de la plataforma
create table logros (
  id bigint primary key generated always as identity,
  nombre text not null,
  descripcion text not null
);

-- Tabla del progreso del logro
create table progreso_logros (
  id bigint primary key generated always as identity,
  usuario_id bigint references usuarios (id),
  logro_id bigint references logros (id),
  progreso numeric(5, 2) default 0.00,
  fecha_ultima_actualizacion timestamp with time zone default now()
);

-- Tabla de la conversación de la IA
create table conversaciones_ia (
  id bigint primary key generated always as identity,
  usuario_id bigint references usuarios (id),
  nota_id bigint references notas (id),
  mensaje text not null,
  respuesta text not null,
  fecha_conversacion timestamp with time zone default now()
);

-- Tabla para almacenar el nivel educativo (secundaria o bachillerato)
create table grados (
  id bigint primary key generated always as identity,
  nombre text not null
);

-- Tabla para almacenar las materias
create table materias (
  id bigint primary key generated always as identity,
  nombre text not null
);

-- Tabla para crear los temas de las materias
create table temas (
  id bigint primary key generated always as identity,
  nombre text not null,
  materia_id bigint references materias (id)
);

alter table cursos
add column grado_id bigint references grados (id),
add column materia_id bigint references materias (id),
add column tema_id bigint references temas (id);