# 🎮 My Game Store | Proyecto Personal de E-commerce

![GitHub stars](https://img.shields.io/github/stars/TuUsuarioDeGitHub/NombreDeTuRepositorio?style=social) ![GitHub forks](https://img.shields.io/github/forks/TuUsuarioDeGitHub/NombreDeTuRepositorio?style=social)

---

## 💡 Sobre el Proyecto

Este proyecto es un **E-commerce de videojuegos** desarrollado como una prueba personal de mis habilidades de programación full-stack. El objetivo era ir más allá del plan de estudios de SoyHenry y crear una aplicación robusta, completamente funcional y escalable, similar en complejidad al proyecto grupal que desarrollamos en la academia, pero esta vez, de forma **completamente independiente**.

Este proyecto representa mi compromiso con el aprendizaje continuo y mi capacidad para dominar nuevas tecnologías. Me propuse integrar herramientas que no había utilizado antes, como **TypeScript** y **MongoDB**, y logré implementarlas con éxito, demostrando mi versatilidad y adaptabilidad como desarrollador.

---

## ✨ Características Principales

* **Autenticación de Usuarios:** Sistema de registro y login seguro.
* **Catálogo de Videojuegos:** Explora un amplio catálogo con información detallada de cada juego.
* **Filtros Avanzados:** Filtra juegos por género, plataforma, precio y más.
* **Carrito de Compras:** Agrega, elimina y gestiona productos en un carrito persistente.
* **Pasarela de Pago:** Integración con la **API de Mercado Pago** para una experiencia de compra real y segura.
* **Búsqueda:** Busca videojuegos por nombre.

---

## 🛠️ Tecnologías Utilizadas

### Frontend
* **React:** Biblioteca principal para la interfaz de usuario.
* **Redux:** Manejo del estado global de la aplicación.
* **CSS Modules:** Estilización y componentes encapsulados.

### Backend
* **Node.js:** Entorno de ejecución del servidor.
* **Express:** Framework para la creación de la API RESTful.
* **TypeScript:** Lenguaje tipado para un código más robusto y escalable.
* **MongoDB:** Base de datos NoSQL para la gestión de datos.
* **Mongoose:** Modelado de datos para MongoDB.

---

## ⚙️ Instrucciones de Instalación y Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/TuUsuarioDeGitHub/NombreDeTuRepositorio.git](https://github.com/TuUsuarioDeGitHub/NombreDeTuRepositorio.git)
    cd NombreDeTuRepositorio
    ```

2.  **Instalar dependencias del backend:**
    ```bash
    cd api
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la carpeta `api` con las siguientes variables:
    ```
    MONGO_URI=tu_cadena_de_conexion_de_mongodb
    MERCADO_PAGO_ACCESS_TOKEN=tu_token_de_acceso
    SECRET=tu_jwt_secret
    ```

4.  **Iniciar el servidor backend:**
    ```bash
    npm start
    ```

5.  **Instalar dependencias del frontend:**
    ```bash
    cd ../client
    npm install
    ```

6.  **Iniciar la aplicación frontend:**
    ```bash
    npm start
    ```
    La aplicación se abrirá en `http://localhost:3000`.

---

## 📈 Desafíos y Aprendizajes

Este proyecto fue una experiencia de aprendizaje intensa y gratificante. Los principales desafíos incluyeron:

* **Integración de TypeScript:** Adaptar todo el código a un entorno tipado fue un reto inicial que mejoró significativamente la calidad y el mantenimiento del proyecto.
* **Manejo de Bases de Datos NoSQL:** La transición de SQL a MongoDB me permitió entender un paradigma de bases de datos diferente y sus ventajas.
* **Implementación de la Pasarela de Pago:** Conectar la API de Mercado Pago y manejar los flujos de pago fue un proceso complejo que me enseñó mucho sobre el desarrollo de aplicaciones comerciales.

---

## 🤝 Contacto

¡No dudes en contactarme!

* **LinkedIn:** [[Tu Perfil de LinkedIn]](https://www.linkedin.com/in/ezequielbamio/)
* **Portafolio:** [bamio.vercel.app](https://bamio.vercel.app/)

---

### Notas Adicionales

* Asegúrate de reemplazar los placeholders como `TuUsuarioDeGitHub`, `NombreDeTuRepositorio`, y tus datos de contacto.
* Las insignias (`badges`) en la parte superior dan un aspecto profesional. Puedes encontrar más insignias en sitios como [shields.io](https://shields.io/).
* La sección de "Desafíos y Aprendizajes" es crucial para mostrar que reflexionaste sobre el proceso y cómo creciste como desarrollador.
* La sección de "Instrucciones de Instalación" es fundamental para que otros puedan probar tu proyecto.
