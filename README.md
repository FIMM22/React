# TaskCampus

Aplicación de gestión de tareas académicas hecha con React, JavaScript y Vite. Continúa el proyecto base de los tutoriales React 04 al 12.

**Escuadrón / integrantes:**
- Fernando Mirandam
- Andrés Chávez

<!-- BORRADOR: se completa etapa a etapa. Borra estos comentarios al terminar. -->

## 1. Requisitos e instalación

- Node.js: _(resultado de `node -v`)_
- npm: _(resultado de `npm -v`)_

```bash
npm install      # instala las dependencias
npm run dev      # ejecuta en modo desarrollo (http://localhost:5173)
npm run build    # compila para producción
```

## 2. Estructura del proyecto

<!-- Actualizar a medida que se agreguen carpetas (hooks, services, views...). -->

```
src/
  assets/          recursos de la plantilla de Vite
  components/      Header, TaskSummary, TaskList, ActionButton
  App.jsx          componente principal
  App.css          estilos de TaskCampus
  index.css        estilos globales de la plantilla de Vite
  main.jsx         monta <App /> en el HTML
```

## 3. Vistas

<!-- Se completa en la etapa 9 (navegación). Describir qué contiene cada vista. -->

- **Resumen:** _(pendiente)_
- **Tareas:** _(pendiente)_
- **Nueva tarea:** _(pendiente)_

## 4. Limitaciones de la API

<!-- Explicar con sus palabras: JSONPlaceholder simula las escrituras (POST, PATCH/PUT, DELETE),
     por lo que los cambios no se guardan en el servidor y se pierden al recargar.
     Indicar qué pasa con las tareas creadas durante la sesión. Completar en las etapas 6 a 9. -->

_(pendiente)_

## 5. Comparación entre la base proporcionada y el desarrollo

### Base recibida (estado verificado)

| Archivo | Recibe (props) | Datos fijos | Eventos | Clases CSS |
| --- | --- | --- | --- | --- |
| `main.jsx` | nada | nada | nada | importa `index.css` y monta `<App />` |
| `App.jsx` | nada | `total={3}`, título "Listado de tareas de hoy", texto del `alert` | `reviewTasks` (muestra un `alert`) | `app-container` |
| `Header.jsx` | `title`, `description` | ninguno | ninguno | `header`, `header-title`, `header-description` |
| `TaskSummary.jsx` | `total` | texto "Tienes {total} tareas pendientes" | ninguno | `card`, `section-title` |
| `TaskList.jsx` | nada (ignora el título recibido) | array de 3 textos y el título "Listado de tareas" | 3 `onClick` que muestran un `alert` | `card`, `section-title`, `task-list`, `task-item`, `task-button` |
| `ActionButton.jsx` | `onReview` | texto "Revisar tareas" | `onClick` | `task-button` |

Problemas de la base: total fijo, tareas escritas a mano en JSX repetido, botones que solo ejecutan `alert`, sin estado, sin datos de una API.

### Desarrollo realizado

<!-- Una fila por componente, a medida que se modifica. -->

| Elemento | Base recibida | Desarrollo del escuadrón |
| --- | --- | --- |
| App | _(pendiente)_ | _(pendiente)_ |
| TaskList | _(pendiente)_ | _(pendiente)_ |
| TaskSummary | _(pendiente)_ | _(pendiente)_ |
| ActionButton | _(pendiente)_ | _(pendiente)_ |
| Estilos | _(pendiente)_ | _(pendiente)_ |
| Componentes nuevos | — | _(pendiente)_ |

## 6. Investigación aplicada

<!-- Para cada tema: explicación breve, fuentes consultadas, archivos donde se aplicó
     y un procedimiento para verificarlo. Se completa en las etapas 7 a 9. -->

### 6.1 Navegación entre vistas
- **Explicación:** _(pendiente)_
- **Fuentes:** _(pendiente)_
- **Archivos donde se aplicó:** _(pendiente)_
- **Cómo verificarlo:** _(pendiente)_

### 6.2 Estado derivado
- **Explicación:** _(pendiente)_
- **Fuentes:** _(pendiente)_
- **Archivos donde se aplicó:** _(pendiente)_
- **Cómo verificarlo:** _(pendiente)_

### 6.3 Actualización funcional del estado
- **Explicación:** _(pendiente)_
- **Fuentes:** _(pendiente)_
- **Archivos donde se aplicó:** _(pendiente)_
- **Cómo verificarlo:** _(pendiente)_

### 6.4 Identificadores y API simulada
- **Explicación:** _(pendiente)_
- **Fuentes:** _(pendiente)_
- **Archivos donde se aplicó:** _(pendiente)_
- **Cómo verificarlo:** _(pendiente)_

## 7. Registro de pruebas

<!-- Completar "Resultado obtenido" y "Evidencia" solo después de probar de verdad. -->

| Caso probado | Pasos | Resultado esperado | Resultado obtenido | Evidencia |
| --- | --- | --- | --- | --- |
| Carga inicial (RF01) | Abrir la app | Aparecen 10 tareas de la API | | |
| Error de carga (RF11) | Cortar internet y recargar | Mensaje de error | | |
| Crear tarea válida (RF03) | Nueva tarea, escribir título, enviar | Se envía POST y aparece en la lista | | |
| Crear tarea vacía (RF04) | Enviar solo espacios | Mensaje de validación, no se guarda | | |
| Cambiar estado (RF05) | Marcar una tarea | Cambian la tarea, el filtro y el resumen | | |
| Editar título (RF06) | Doble clic, editar, Enter | Título actualizado | | |
| Editar con título vacío (RF04) | Doble clic, borrar todo, Enter | Mensaje de error, título original | | |
| Eliminar (RF07) | Eliminar, cancelar; eliminar, confirmar | Cancelar conserva; confirmar la retira | | |
| Filtro y búsqueda (RF08, RF09) | Elegir un estado y escribir texto | Solo coincidencias de ambos | | |
| Resumen (RF10) | Filtrar y abrir Resumen | Total distinto de la cantidad mostrada | | |
| Operación en curso (RF12) | Ralentizar la red y operar | Controles deshabilitados mientras dura | | |
| Navegación (RF13) | Cambiar de vista varias veces | Tareas y filtros se conservan | | |
| Dos tareas consecutivas | Crear dos tareas seguidas | Sin claves duplicadas | | |
| Error remoto | Operar con la red cortada | Aviso de error, sin cambios silenciosos | | |
