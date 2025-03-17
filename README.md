# Marvel Web Challenge - Aplicación de Personajes de Marvel

Este proyecto es una aplicación web que muestra personajes de Marvel, permitiendo a los usuarios buscar personajes, añadirlos a favoritos y ver detalles sobre ellos. La aplicación ha sido desarrollada utilizando React, Redux, SASS y sigue los principios de Arquitectura MVC y SOLID.

## Índice

- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Arquitectura y Patrones de Diseño](#arquitectura-y-patrones-de-diseño)
- [Decisiones de Diseño](#decisiones-de-diseño)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Cómo Ejecutar el Proyecto](#cómo-ejecutar-el-proyecto)
- [Pruebas](#pruebas)
- [Mejoras Futuras](#mejoras-futuras)

## Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Redux**: Biblioteca para la gestión del estado global de la aplicación.
- **SASS**: Preprocesador CSS para una estilización modular y escalable.
- **Axios**: Cliente HTTP para realizar llamadas a la API de Marvel.
- **React Router**: Para la gestión de rutas y navegación entre páginas.
- **CryptoJS**: Biblioteca para generar el hash MD5, necesario para la autenticación en la API de Marvel.
- **ESLint y Prettier**: Para garantizar la calidad y estandarización del código.

## Arquitectura y Patrones de Diseño

### Arquitectura MVC

La aplicación sigue el patrón MVC (Modelo-Vista-Controlador) para separar responsabilidades:

- **Modelo**: Representa los datos y la lógica de negocio. En este caso, Redux gestiona el estado global de los personajes y favoritos.
- **Vista**: Componentes de React que renderizan la interfaz de usuario.
- **Controlador**: Las acciones de Redux y los servicios que interactúan con la API de Marvel actúan como controladores.

### Principios SOLID

- **Principio de Responsabilidad Única (SRP)**: Cada componente y función tiene una única responsabilidad.
- **Principio Abierto/Cerrado (OCP)**: El código está abierto para extensión, pero cerrado para modificación.
- **Principio de Sustitución de Liskov (LSP)**: Los componentes pueden ser sustituidos por sus variantes sin afectar el comportamiento.
- **Principio de Segregación de Interfaces (ISP)**: Las interfaces son específicas para cada necesidad.
- **Principio de Inversión de Dependencias (DIP)**: Las dependencias se inyectan, facilitando la testabilidad y mantenibilidad.

### Gestión del Estado con Redux

Se eligió Redux para gestionar el estado global de la aplicación, como la lista de personajes y favoritos. Esto permite:

- Centralización del estado.
- Facilidad de depuración con herramientas como Redux DevTools.
- Reactividad y actualización automática de la interfaz.

## Decisiones de Diseño

1. **Uso de Redux para la Gestión del Estado**  
   Opté por usar Redux para gestionar el estado global de la aplicación, especialmente para la lista de personajes y favoritos. Esto permite que el estado sea accesible y modificable de forma consistente en toda la aplicación, además de facilitar la implementación de funcionalidades como el caché y la persistencia de favoritos.

2. **Separación de Responsabilidades con MVC**  
   La aplicación se estructuró siguiendo el patrón MVC para garantizar una clara separación de responsabilidades. Esto hace que el código sea más modular, testeable y fácil de mantener.

3. **Estilización con SASS**  
   Se eligió SASS para la estilización debido a su capacidad de modularización, uso de variables y mixins, lo que facilita el mantenimiento y la escalabilidad del CSS.

4. **Caché de Datos**  
   Para evitar llamadas innecesarias a la API de Marvel, la lista de personajes se almacena en el localStorage y se actualiza cada 24 horas. Esto mejora el rendimiento y la experiencia del usuario.

5. **Responsividad**  
   La aplicación se desarrolló con un enfoque en el diseño responsivo, siguiendo los diseños propuestos en Figma para móvil y escritorio.

## Estructura del Proyecto

- `src/`
  - `__tests_/` - Tests unitarios
  - `assets/` - Imagenes del proyecto
  - `components/` - Componentes reutilizables de React
  - `store/` - Store y slices de Redux
  - `services/` - Servicios para llamadas a la API
  - `styles/` - Estilos SASS
  - `views/` - Vistas (páginas)
  - `App.js` - Componente principal
  - `index.js` - Punto de entrada
  - `README.md` - Documentación del proyecto

## Cómo Ejecutar el Proyecto

### Requisitos Previos

- **Node.js** (versión 18 o superior)
- **NPM** o **Yarn**

### Pasos para la Ejecución

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/zara-web-challenge.git
   cd zara-web-challenge
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Ejecuta el proyecto en modo de desarrollo:

   ```bash
   npm start
   ```

4. Accede a la aplicación en el navegador:

   ```plaintext
   http://localhost:3000
   ```

## Pruebas

La aplicación incluye pruebas unitarias y de integración para garantizar la calidad del código. Las pruebas se implementaron utilizando **Jest** y **React Testing Library**.

## Ejemplo de Prueba Unitaria

````javascript
// src/components/CharacterList.test.js
import { render, screen } from '@testing-library/react';
import CharacterList from './CharacterList';
import { Provider } from 'react-redux';
import { store } from '../store/store';

test('muestra el estado de carga inicialmente', () => {
  render(
    <Provider store={store}>
      <CharacterList />
    </Provider>
  );
  expect(screen.getByText(/cargando/i)).toBeInTheDocument();
});

### Ejecutando las Pruebas

Para ejecutar las pruebas, usa el comando:

```bash
npm test

## Mejoras Futuras

- **Implementación de Paginación**: Añadir paginación para cargar más personajes a medida que el usuario hace scroll.
- **Pruebas de Integración**: Añadir más pruebas de integración para cubrir escenarios complejos.
- **Persistencia de Favoritos**: Mejorar la persistencia de favoritos usando IndexedDB o una solución más robusta.
- **Optimización del Rendimiento**: Implementar lazy loading para imágenes y componentes.
- **Internacionalización**: Añadir soporte para múltiples idiomas.

## Conclusión

Este proyecto se ha desarrollado con un enfoque en buenas prácticas de desarrollo, como la utilización de la arquitectura MVC, los principios SOLID y la gestión del estado con Redux. La aplicación es escalable, modular y fácil de mantener, además de seguir un diseño responsivo y centrado en el usuario.
````
