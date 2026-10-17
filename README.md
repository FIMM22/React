# TaskCampus - Laboratorio React con JavaScript

Aplicación web de gestión de tareas academicas desarrollada con React, JavaScript y Vite. El proyecto transforma la base estática inicial en una aplicación modular, interactiva y desacoplada, integrando los conceptos de los tutoriales 04 al 12 e investigación aplicada.

**Escuadrón / integrantes:**
- Fernando Miranda
- Andrés Chávez




---

## 1. Requisitos e instalación

### Entorno verificado
- **Node.js:** `v24.21.0` 
- **npm:** `11.19.0` 

### Comandos de ejecución
```bash
# 1. Clonar el repositorio
git clone https://github.com/FIMM22/React.git
cd React

# 2. Instalar dependencias
npm install

# 3. Iniciar entorno de desarrollo local (http://localhost:5173)
npm run dev

# 4. Compilar para producción (genera carpeta dist/)
npm run build
```

---

## 2. Estructura del proyecto

El proyecto sigue una arquitectura desacoplada que separa la presentación, la coordinación del estado, los hooks personalizados y la comunicación con servicios externos (conforme al Tutorial 12):

```
src/
  assets/              recursos estáticos e imágenes (hero.png, react.svg, vite.svg)
  components/          componentes reutilizables de presentación y control
    ActionButton.jsx   botón de acción original (conservado por trazabilidad)
    Badge.jsx          etiqueta visual indicadora de estado (pendiente / completada)
    Button.jsx         botón configurable reutilizable con variantes (primary, secondary, danger, success)
    Card.jsx           contenedor envolvente reutilizable con título y proyección de children
    Header.jsx         encabezado institucional con alternancia de visibilidad de usuario
    Modal.jsx          cuadro de diálogo modal accesible para confirmación de acciones destructivas
    TaskForm.jsx       formulario controlado con validación para crear nuevas tareas
    TaskList.jsx       listado interactivo con filtrado por estado, badges y acciones
    TaskSummary.jsx    panel de métricas y resumen numérico calculado
  hooks/               custom hooks con lógica de negocio y estado
    useTareas.js       encapsula el estado (tareas, cargando, error) y operaciones CRUD
  services/            capa de integración HTTP y comunicación con la API
    tareasService.js   funciones asíncronas desacopladas (getTareas, postTarea, putTarea, deleteTarea)
  App.jsx              coordinador principal de datos, estado derivado, efectos y vistas
  App.css              estilos estructurados (layout, tarjetas, botones, modales, alertas)
  index.css            estilos globales base
  main.jsx             punto de entrada que monta <App /> en el elemento raíz del HTML
```

---

## 3. Vistas obligatorias

La aplicación organiza sus responsabilidades respetando las tres vistas obligatorias del laboratorio, manteniendo el encabezado institucional siempre disponible:

- **Resumen:** Renderizado mediante el componente TaskSummary dentro de un contenedor Card. Muestra métricas calculadas en tiempo real:
  - **Total:** Cantidad total de tareas cargadas en la sesión.
  - **Completadas:** Número de tareas con estado completada: true.
  - **Pendientes:** Número de tareas con estado completada: false.
  - **Mostrando ({filtroActual}):** Cantidad de tareas que cumplen el criterio del filtro activo.
  *Distingue claramente el total de tareas de la cantidad mostrada (por ejemplo, 10 tareas totales frente a 4 mostradas).*

- **Tareas (Mis tareas):** Renderizado mediante TaskList dentro de un contenedor Card. Contiene:
  - Controles de filtrado por estado mediante botones configurables ("Todas", "Pendientes", "Completadas").
  - Renderizado dinámico de cada tarea con su respectivo Badge semántico (amarillo para pendiente, verde para completada).
  - Título con formato tachado condicional si la tarea está completada.
  - Botón para alternar estado ("Completar" / "Desmarcar").
  - Botón para eliminar la tarea protegido por el diálogo modal de confirmación.
  - Mensaje descriptivo ante categorías sin tareas ("No hay tareas en esta categoría").

- **Nueva tarea:** Renderizado mediante TaskForm. Ofrece un formulario controlado para el ingreso de tareas académicas:
  - Input controlado enlzado al estado local con placeholder explicativo.
  - Validación de longitud mínima obligatoria ($\ge 3$ caracteres sin contar espacios extremos).
  - Botón de envío que despacha la operación POST asíncrona hacia el servicio.
  - Renderizado condicional de mensajes de error de validación en caso de ingresar títulos vacíos o insuficientes.

---

## 4. Limitaciones de la API y alcance de la persistencia

De acuerdo con lo estipulado en el laboratorio y en la etapa final del tutorial 12:

1. **Naturaleza simulada de JSONPlaceholder:**
   - La API pública `https://jsonplaceholder.typicode.com/todos` es un servicio mock para pruebas y prototipado.
   - Los métodos de escritura (POST, PUT, DELETE) simlan una respuesta exitosa con códigos HTTP válidos, pero no persisten cambios en la base de datos remota del servidor.

2. **Alcance de la persistencia durante la sesión:**
   - Al iniciar la aplicación, las primeras 10 tareas se obtienen desde la API mediante GET.
   - Las operaciones realizadas por el usuario (crear tarea, cambiar estado, eliminar) se reflejan de inmediato en el estado reactivo en memoria (tareas), permaneciendo coherentes durante toda la sesión.

3. **Comportamiento al recargar:**
   - Al recargar la página, el estado de la aplicación se reinicia y se vuelven a solicitar las tareas originales a JSONPlaceholder. Por tanto, las modificaciones no perduran en el servidor después de recargar.

4. **Tratamiento de identificadores locales vs remotos:**
   - Las creaciones remotas simuladas retornan siempre el identificador fijo id: 201. Para evitar errores de claves duplicadas en React al agregar múltiples tareas en la sesión, la aplicación asigna identificadores locales únicos (Date.now()).

---

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

*Problemas de la base original:* Total fijo cableado, tareas escritas a mano en JSX repetido, botones con alert sin mutaciones reales, ausencia de estado, falta de comunicación con API externa.

### Desarrollo realizado

| Elemento | Base recibida | Desarrollo del escuadrón |
| --- | --- | --- |
| **App** | El total hardcodeado (total={3}) y alertas en pantalla. | Coordina el flujo global conectando el hook useTareas (estado tareas, cargando, error y operaciones CRUD). Gestiona el filtro activo, la selección de tarea para el modal de eliminacion, la sincronización de document.title con tareas pendientes, temporizador con cleanup y renderizado condicional de vistas y avisos. |
| **TaskList** | 3 tareas fijas en JSX repetido con botones que disparaban alert. | Componente dinámico que recibe tareas, filtro, onCambiarFiltro, onToggle, onEliminar. Incluye selector de filtros por estado con Button, mapeo dinámico con claves estables, indicadores de estado con Badge, formato tachado condicional, alternancia de estado y eliminación con confirmación modal. |
| **TaskSummary** | Mostraba un único valor estático recibido por props. | Recibe total, completadas, pendientes, mostrando y filtroActual. Muestra un panel de estadísticas en cuadrícula con métricas tipográficas destacadas y colores semánticos diferenciados para cada contador. |
| **ActionButton** | Botón individual que mostraba un alert. | Se sustituyó su funcionalidad en favor del componente reutilizable Button, manteniendo el archivo en el repositorio por trazabilidad histórica del desarrollo. |
| **Estilos (App.css)** | Estilos elementales con clases fijas y sin diseño modular. | Sistema de diseño completo: contenedor principal (app-container), tarjetas modulares (card), botones tipificados (btn-primary, btn-danger, btn-secondary, btn-success), overlay y ventana modal centrada (modal-overlay, modal-box`), badges de estado y diseño adaptable de formularios. |
| **Componentes y módulos nuevos** | — | - TaskForm.jsx: Formulario controlado con validación ($\ge 3$ caracteres) y mensajes de error.<br>- Card.jsx: Contenedor genérico reutilizable con título y soporte de children.<br>- Modal.jsx: Diálogo modal accesible para confirmación de acciones destructivas.<br>- Button.jsx: Botón modular configurable con variantes y soporte para disabled.<br>- Badge.jsx: Etiqueta semántica para representar estados de tareas con colores.<br>- useTareas.js: Custom hook que centraliza estado asíncrono y operaciones CRUD.<br>- tareasService.js: Capa desacoplada con peticiones HTTP a la API REST de JSONPlaceholder. |

---

## 6. Investigación aplicada

### 6.1 Navegación entre vistas
- **Qué se investigo:** Cómo representar la vista activa mediante estado (useState), conmutarla mediante eventos y seleccionar el componente visible mediante renderizado condicional, sin agregar dependencias externas ni alterar rutas url.
- **Para qué se utiliza:** Separar la visualización de Resumen, Tareas y Nueva tarea manteniendo el encabezado visible y preservando las tareas y filtros en la sesión.
- **Cómo se incorpora:** Se mantiene el estado de tareas y filtros en el nivel superior (App.jsx y useTareas), mientras que la interfaz se compone mediante renderizado condicional según el estado (cargando, error, filtro y visibilidad de Modal), garantizando que los datos no se destruyan al interactuar con distintos bloques.
- **Fuentes consultadas:** Documentación oficial de React: [Conditional Rendering](https://react.dev/learn/conditional-rendering).
- **Archivos donde se aplicó:** src/App.jsx, src/components/TaskList.jsx, src/components/Modal.jsx.
- **Procedimiento para verificarlo:**
  1. Iniciar la aplicación y constatar que se cargan las 10 tareas iniciales.
  2. Alternar entre los filtros "todas", "Pendientes" y "Completadas".
  3. Pulsar el botón "eliminar" en una tarea y verificar la aparición del diálogo modal en primer plano sin recargar la página.
  4. Cancelar o confirmar la acción y constatar que el estado global de las tareas se mantiene intacto.

### 6.2 Estado derivado
- **Qué se investigó:** La distinción entre datos que deben residir en el estado (useState) y datos que pueden computarse directamente a partir de ellos durante el renderizado.
- **Para qué se utiliza:** Mantener contadores, filtros y estadísticas perfectamente sincronizados con la colección de tareas, eliminando redundancias y previniendo inconsistencias de estado (stalestate).
- **Cómo se incorpora:** En App.jsx, la lista mostrada (tareasFiltradas) se calcula filtrando el array tareas según filtro. Asimismo, las tareas pendientes para document.title y las métricas de TaskSummary (completadas, pendientes, mostradas) se obtienen directamente mediante métodos de array (filter, length) sin almacenarse en variables de estado adicionales.
- **Fuentes consultadas:** Documentación oficial de React: [Don't Put in State What You Can Compute](https://react.dev/learn/choosing-the-state-structure#avoid-redundant-state).
- **Archivos donde se aplicó:** src/App.jsx, src/components/TaskSummary.
- **Procedimiento para verificarlo:**
  1. Observar los contadores del resumen inicial (ej. Total: 10, Completadas: 4, Pendientes: 6).
  2. Marcar una tarea pendiente como completada.
  3. Verificar inmediatamente que el contador de completadas aumenta en 1, el de pendientes disminuye en 1 y el título de la pestaña del navegador actualiza su valor sin haber ejecutado llamadas redundantes a setState.

### 6.3 Actualización funcional del estado
- **Qué se investigo:** El uso de la función actualizadora en su variante funcional: `setEstado(previo => nuevoValor)` cuando el nuevo estado depende directamente del valor inmediatamente anterior.
- **Para qué se utiliza:** Evitar el uso de valores de estado desactualizados o condiciones de carrera provocadas por la naturaleza asíncrona de las actualizaciones de React en operaciones sucesivas o concurrentes.
- **Cómo se incorpora:** En src/hooks/useTareas.js, las operaciones CRUD emplean la forma funcional:
  - Creación: setTareas(prev => [nueva, ...prev])
  - Actualización: setTareas(prev => prev.map(t => t.id === id ? { ...t, ...cambios } : t))
  - Eliminación: setTareas(prev => prev.filter(t => t.id !== id))
- **Fuentes consultadas:** Documentación oficial de React: [Updating state based on the previous state](https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state).
- **Archivos donde se aplicó:** src/hooks/useTareas.
- **Procedimiento para verificarlo:**
  1. Crear rápidamente dos o más tareas de manera consecutiva en el formulario.
  2. Alternar el estado de varias tareas en rápida sucesión.
  3. Comprobar que todas las operaciones se acumulan correctamente sin que una actualización sobrescriba o descarte las anteriores.

### 6.4 Identificadores y API simulada
- **Qué se investigo:** La diferencia entre la identidad local para la reconciliación del Virtual DOM (propiedad key) y los identificadores devueltos por un backend simulado.
- **Para que se utiliza:** Prevenir colisiones de claves en React provocadas por respuestas con IDs estáticos fijos en APIs mock, evitando fallas de renderizado y asegurando que las operaciones afecten únicamente a la tarea seleccionada.
- **Cómo se incorpora:** Cuando se crea una nueva tarea mediante crearTarea, se asigna un identificador único local basado en marca de tiempo (id: Date.now()), en lugar de reutilizar el identificador fijo ( id: 201) devuelto por JSONPlaceholder.
- **Fuentes consultadas:** Documentación oficial de React: [Rendering Lists - Why does React need keys?](https://react.dev/learn/rendering-lists#why-does-react-need-keys).
- **Archivos donde se aplico:** src/hooks/useTareas.js, src/components/TaskList.
- **Procedimiento para verificarlo:**
  1. Abrir las herramientas de desarrollador del navegador (F12 $\rightarrow$ Consola).
  2. Crear dos tareas válidas sucesivamente.
  3. Inspeccionar el Virtual DOM y verificar que no se emite ninguna advertencia del tipo *"Encountered two children with the same key"*, pudiendo interactuar con cada tarea de forma independiente.

---

## 7. Registro de pruebas y evidencias verificables

| Código | Caso probado | Pasos ejecutados | Resultado esperado | Resultado obtenido | Evidencia verificable |
| --- | --- | --- | --- | --- | --- |
| **RF01** | Carga inicial de datos | Cargar la aplicación en http://localhost:5173 con conexión activa. | Carga asíncrona de 10 tareas desde JSONPlaceholder mediante GET. | Conforme. Se consumen las 10 tareas iniciales vía getTareas(10) y se oculta el estado de carga. | 10 tareas renderizadas con sus títulos originales en TaskList y contadores calculados en TaskSummary. |
| **RF02** | Renderizado dinámico y controles | Inspeccionar el listado tras la carga inicial. | Título, estado y controles renderizados desde datos, sin JSX estático repetido. | Conforme. La lista se genera mediante .map() asociando claves estables tarea.id y botones de acción. | Cada fila cuenta con Badge semántico, texto del título y botones "Completar"/"Eliminar". |
| **RF03** | Creación de tarea válida | Ingresar "Preparar examen de Cálculo" en el input y pulsar "Agregar". | Petición POST a la API e inserción inmediata de la tarea en la lista. | Conforme. Se despacha postTarea, la nueva tarea se coloca al inicio de la lista y el input se limpia. | Tarea visible al principio con badge "pendiente" (amarillo) y total incrementado en 1. |
| **RF04** | Validación de títulos vacíos | Enviar el formulario con campo vacío, espacios en blanco o menos de 3 letras. | Validación bloquea el envío y muestra advertencia al usuario. | Conforme. Se previene el envío, no se emite petición HTTP y se renderiza mensaje de error. | Mensaje en rojo: *"El título debe tener al menos 3 caracteres."*; la lista permanece sin cambios. |
| **RF05** | Alternar estado (completada/pendiente) | Pulsar el botón "Completar" en una tarea pendiente. | Petición PUT; actualización visual del estado, tachado y contadores. | Conforme. Se ejecuta putTarea, la tarea cambia a completada, se tacha el texto y cambia el botón a "Desmarcar". | Badge cambia a "completada" (verde), texto tachado, contador de pendientes disminuye en 1. |
| **RF06** | Edición de título en línea | Doble clic en el título de la tarea para editar y presionar Enter. | Edición en línea habilitada; guardado tras validación. | No implementado en UI para esta entrega (la edición de estado y reemplazo cubre el flujo funcional). | Título presentado mediante etiqueta span no editable directamente en TaskList.jsx. |
| **RF07** | Eliminación con confirmación | Pulsar "Eliminar" en una tarea; probar "Cancelar" y luego "Confirmar". | Cancelar conserva la tarea; confirmar ejecuta DELETE y la retira de la lista. | Conforme. Se abre el `Modal. Al cancelar se cierra sin cambios; al confirmar se elimina la tarea de la lista. | Desaparición de la tarea eliminada del DOM; reducción del contador Total en TaskSummary. |
| **RF08** | Filtrado por estado | Pulsar consecutivamente "Todas", "Pendientes" y "Completadas". | Mostrar únicamente las tareas correspondientes al estado seleccionado. | Conforme. tareasFiltradas discrimina correctamente según tarea.completada`. | Botón activo resaltado con variante primary; lista actualizada mostrando solo tareas del filtro. |
| **RF09** | Búsqueda por texto del título | Filtrar tareas combinando criterios de búsqueda. | Coincidencias de texto combinadas con filtro de estado. | Filtrado por estado completamente operativo; búsqueda textual reservada para etapas ampliadas. | Selector de filtros por estado en TaskList opera en tiempo real sobre los datos locales. |
| **RF10** | Resumen numérico actualizado | Aplicar filtro "Completadas" y observar la tarjeta de resumen. | Distinguir el total general de la cantidad mostrada en pantalla. | Conforme. TaskSummary muestra Total: 10 y mostrando (completadas): 4. | Cuadrícula con 4 bloques numéricos coherentes con el estado real de la aplicación. |
| **RF11** | Mensajes de carga, error y vacío | 1. Cargar con conexión.<br>2. Cargar sin red.<br>3. Filtrar categoría sin tareas. | Mensajes diferenciados para carga, error y ausencia de datos. | Conforme. Se visualizan textos específicos para cada situación sin fallos silenciosos. | -  Cargando tareas...<br>-  Error: Error al obtener tareas<br>- No hay tareas en esta categoría . |
| **RF12** | Informar operaciones en curso | Realizar peticiones simulando latencia de red. | Controles deshabilitados o aviso visual mientras la operación está pendiente. | Conforme. El estado cargando suspende la renderización de la lista mientras se completa el fetch. | Indicador de carga visible hasta resolución final de la promesa. |
| **RF13** | Navegación entre vistas sin recarga | Interactuar con filtros, modales y formularios de la aplicación. | Cambio de secciones sin recargar la página ni perder tareas de la sesión. | Conforme. La navegación y renderizado condicional preservan el estado en memoria de React. | Las tareas creadas durante la sesión permanecen disponibles al cambiar de filtro. |
| **Identificadores** | Creación de dos tareas consecutivas | Crear dos tareas seguidas desde el formulario de creación. | Identidades únicas estables sin colisión de claves. | Conforme. Cada tarea obtiene un id único generado con Date.now(). | Ausencia total de advertencias de claves duplicadas en la consola de JavaScript. |
| **Error remoto** | Desconexión de red tras carga inicial | Intentar crear o eliminar tareas con la conexión de red cortada. | Captura del fallo y notificación visible de error. | Conforme. El bloque catch del hook almacena el mensaje y lo refleja en la interfaz. | Notificación de error en pantalla con clase .estado-error sin caídas de la aplicación. |

---



