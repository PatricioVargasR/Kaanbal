### 1. Tabla `Usuarios`

| No. | Campos         | Tipo      | Restricciones                |
| --- | -------------- | --------- | ---------------------------- |
| 1.  | id_usuario     | int       | Primary key, no nulo, serial |
| 2.  | nombre         | text      | no nulo                      |
| 3.  | email          | text      | no nulo, único               |
| 4.  | edad           | int       | nulo                         |
| 5.  | contrasena     | text      | no nulo                      |
| 6.  | avatar         | blob      | nulo                         |
| 7.  | fecha_registro | timestamp | nulo                         |
| 8.  | proveedor_auth | text      | nulo                         |

### 2. Tabla `Cursos`

| No. | Campos             | Tipo      | Restricciones                                |
| --- | ------------------ | --------- | -------------------------------------------- |
| 1.  | id_curso           | int       | Primary key, no nulo, serial                 |
| 2.  | nombre_curso       | text      | no nulo                                      |
| 3.  | fecha_creacion     | timestamp | no nulo                                      |
| 4.  | usuario_id         | int       | Foreign key -> Usuarios(id_usuario), no nulo |
| 5.  | tema_id            | int       | Foreign key -> Temas(id_tema), no nulo       |
| 6.  | cantidad_preguntas | int       | no nulo                                      |

### 3. Tabla `Explicaciones`

| No. | Campos         | Tipo | Restricciones                            |
| --- | -------------- | ---- | ---------------------------------------- |
| 1.  | id_explicacion | int  | Primary key, no nulo                     |
| 2.  | curso_id       | int  | Foreign key -> Cursos(id_curso), no nulo |
| 3.  | explicacion    | text | no nulo                                  |

### 4. Tabla `Preguntas`

| No. | Campos                 | Tipo    | Restricciones                                                                                |
| --- | ---------------------- | ------- | -------------------------------------------------------------------------------------------- |
| 1.  | id_pregunta            | int     | Primary key, no nulo                                                                         |
| 2.  | curso_id               | int     | Foreign key -> Cursos(id_curso), nulo                                                        |
| 3.  | conversacion_id        | int     | Foreign key -> Conversaciones_IA(id_conversacion), nulo                                      |
| 4.  | tipo_pregunta          | enum    | valores: 'opcion_multiple', 'completar', 'unir', 'buscar'                                    |
| 5.  | dificultad             | enum    | valores: 'facil', 'medio', 'dificil', default: 'medio'                                       |
| 6.  | pregunta               | text    | no nulo                                                                                      |
| 7.  | explicacion            | text    | nulo                                                                                         |
| 8.  | completada_primera_vez | boolean | no nulo, default: false, indica si fue correcta en el primer intento                         |
| 0.  | completada             | boolean | no nulo, default: false, indica si la pregunta fue completada correctamente en algún intento |

### 5. Tabla `Opciones`

| No. | Campos       | Tipo    | Restricciones                                         |
| --- | ------------ | ------- | ----------------------------------------------------- |
| 1.  | id_opcion    | int     | Primary key, no nulo                                  |
| 2.  | pregunta_id  | int     | Foreign key -> Preguntas(id_pregunta), no nulo        |
| 3.  | texto_opcion | text    | no nulo                                               |
| 4.  | es_correcta  | boolean | no nulo, indica si la opción es la respuesta correcta |

### 6. Tabla `Nivel Educativo`

| No. | Campos             | Tipo | Restricciones        |
| --- | ------------------ | ---- | -------------------- |
| 1.  | id_nivel_educativo | int  | Primary key, no nulo |
| 2.  | nombre_nivel       | text | no nulo              |

### 7. Tabla `Materias`

| No. | Campos             | Tipo | Restricciones                                               |
| --- | ------------------ | ---- | ----------------------------------------------------------- |
| 1.  | id_materia         | int  | Primary key, no nulo                                        |
| 2.  | nombre_materia     | text | no nulo                                                     |
| 3.  | nivel_educativo_id | int  | Foreign key -> Nivel Educativo(id_nivel_educativo), no nulo |

### 8. Tabla `Temas`

| No. | Campos      | Tipo | Restricciones                                |
| --- | ----------- | ---- | -------------------------------------------- |
| 1.  | id_tema     | int  | Primary key, no nulo                         |
| 2.  | nombre_tema | text | no nulo                                      |
| 3.  | materia_id  | int  | Foreign key -> Materias(id_materia), no nulo |

### 9. Tabla `Notas (PDFs)`

| No. | Campos         | Tipo      | Restricciones                                |
| --- | -------------- | --------- | -------------------------------------------- |
| 1.  | id_nota        | int       | Primary key, no nulo                         |
| 2.  | usuario_id     | int       | Foreign key -> Usuarios(id_usuario), no nulo |
| 3.  | nombre_archivo | text      | no nulo                                      |
| 4.  | contenido_pdf  | bytea     | no nulo                                      |
| 5.  | fecha_subida   | timestamp | no nulo                                      |

### 10. Tabla `Conversaciones IA`

| No. | Campos             | Tipo      | Restricciones                          |
| --- | ------------------ | --------- | -------------------------------------- |
| 1.  | id_conversacion    | int       | Primary key, no nulo                   |
| 2.  | nota_id            | int       | Foreign key -> Notas(id_nota), no nulo |
| 3.  | fecha_conversacion | timestamp | no nulo                                |

### 11. Tabla `Mensajes Conversación`

| No. | Campos          | Tipo | Restricciones                                           |
| --- | --------------- | ---- | ------------------------------------------------------- |
| 1.  | id_mensaje      | int  | Primary key, no nulo                                    |
| 2.  | conversacion_id | int  | Foreign key -> Conversaciones(id_conversacion), no nulo |
| 3.  | tipo            | enum | valores: 'usuario', 'ia'                                |
| 4.  | contenido       | text | no nulo                                                 |

### 12. Tabla `Logros`

| No. | Campos       | Tipo | Restricciones                                |
| --- | ------------ | ---- | -------------------------------------------- |
| 1.  | id_logro     | int  | Primary key, no nulo                         |
| 2.  | nombre_logro | text | no nulo                                      |
| 3.  | descripcion  | text | no nulo                                      |
| 4.  | criterio     | int  | Foreign key -> Criterio(id_critero), no nulo |

### 13. Tabla `Progreso Logros`

| No. | Campos           | Tipo      | Restricciones                                                |
| --- | ---------------- | --------- | ------------------------------------------------------------ |
| 1.  | id_progreso      | int       | Primary key, no nulo                                         |
| 2.  | usuario_id       | int       | Foreign key -> Usuarios(id_usuario), no nulo                 |
| 3.  | logro_id         | int       | Foreign key -> Logros(id_logro), no nulo                     |
| 4.  | progreso_logro   | int       | representa el porcentaje de progreso, de 0 a 100             |
| 5.  | estado           | enum      | valores: 'en_progreso', 'completado', default: 'en_progreso' |
| 6.  | fecha_completado | timestamp | nulo, se completa al alcanzar el 100% de progreso            |

### 14. Tabla `Carpeta`

| No. | Campos         | Tipo | Restricciones                                |
| --- | -------------- | ---- | -------------------------------------------- |
| 1.  | id_carpeta     | int  | Primary key, no nulo                         |
| 2.  | nombre_carpeta | text | no nulo                                      |
| 3.  | curso_id       | int  | Foreign key -> Cursos(id_curso), no nulo     |
| 4.  | usuario_id     | int  | Foreign key -> Usuarios(id_usuario), no nulo |
| 5.  | nota_id        | int  | Foreing key -> Notas(id_nota), nulo          |

### 15. Tabla `Criterio`

| No. | Campos      | Tipo | Restricciones        |
| --- | ----------- | ---- | -------------------- |
| 1.  | id_criterio | int  | Primary key, no nulo |
| 2.  | cantidad    | int  | no nulo              |
| 3.  | condicion   | text | no nulo              |

**Ejemplo de criterio**:

```json
{
	"tipo": "preguntas_correctas",
	"cantidad": 10,
	"condicion": "primera_vez"
}
```
