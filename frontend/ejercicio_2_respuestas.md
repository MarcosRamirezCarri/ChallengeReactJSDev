## Respuestas Ejercicio 2

  * (2.1) ¿Cómo implementarías las acciones del frontend utilizando redux? (por ejemplo autenticación, solicitud de clientes activos para el usuario y solicitud de casos por cliente)

  * Respuesta: Implementé Redux Toolkit dentro del proyecto porque Redux me permite manejar mucho mejor los datos globalmente y tener un mejor flujo de información dentro de la aplicación.

Las acciones que implementé fueron la autenticación, las solicitudes de clientes activos para el usuario y la solicitud de casos por cliente en determinadas fechas.

Para la autenticación, definí dos estados globales: uno para el token de respuesta y otro para los errores que puedan ocurrir. Luego, definí la acción que realizaría la autenticación haciendo la petición a la API, pasando los parámetros dados por la consigna (correo electrónico y contraseña) mediante el cuerpo de la solicitud. Con la respuesta de la petición, guardo el token proporcionado para su posterior uso o un error en caso de que ocurra uno.

Para la solicitud de clientes activos para el usuario, definí dos estados globales: uno para guardar todos los clientes y otro para los errores que puedan ocurrir. Luego, definí la acción, donde primero verifico si existe el token obtenido previamente en la autenticación, y luego realizo la petición a la dirección de la API, pasando el token mediante el 'body' de la solicitud. Con la respuesta de la acción, los clientes se guardan en el estado o los errores se guardan en caso de que existan.

Para la solicitud de casos por cliente, definí cuatro estados globales: uno para guardar todos los casos, otro para los errores que puedan ocurrir, un tercero para determinar si hay tiempo de carga y un cuarto para guardar el ID del cliente al cual solicito los casos. Posteriormente, definí la acción, donde primero verifico si existe el token obtenido previamente en la autenticación, y luego realizo la petición a la dirección de la API, pasando el token, el ID del cliente y los rangos de fecha mediante el 'body' de la solicitud. Con la respuesta de la acción, se guardan los casos de los clientes dentro del estado, el ID del cliente del cual busco sus casos, se actualiza el estado de tiempo de carga y, por último, se guardan los errores si existen.

 * (2.2) Si quisiéramos agregar una ruta nueva a la app, ¿cómo reestructurarías el index.js?

 * Respuesta: Para implementar nuevas rutas a la app primero que nada hay que instalar react-router-dom con todo su procedimiento, ya que esta librería permite el enrutamiento en proyectos React.
 Luego al momento de modificar index.JS (En este caso App.tsx) se precisaria importar los componentes de la librería siendo estos Router, Route y Routes. Posteriormente se modificaria el interior del componente. Quedaría algo así:
 
 ```typescript
 const App: React.FC = () => {
  return (
    <Router> 
      <div className="flex flex-col w-[100vw] min-h-[100vh] items-center">
        <Routes> 
          <Route path="/" element={<Landing />} /> 
          <Route path="/NuevaRuta" element={<ComponenteEjemplo />} /> {
        </Routes>
      </div>
    </Router>
  );
};
```
Con esta modificación ya sería posible implementar distintas rutas a la aplicación.
