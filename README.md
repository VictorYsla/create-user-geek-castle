<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

### Pasos para Configurar Firebase con Emuladores

1. **Instala el Firebase CLI:**

   ```bash
   npm install -g firebase-tools
   ```

2. **Inicializa Firebase en tu proyecto:**

   ```bash
   firebase init
   ```

3. **Selecciona los emuladores que necesitas (Firestore, Authentication, etc.):**

   - Durante el proceso de inicialización, selecciona los emuladores que deseas utilizar.

4. **Configura tu aplicación NestJS para conectarse al emulador:**

   - Establece las credenciales y URL del emulador en tu configuración. Asegúrate de incluir estas líneas en la configuración de tu aplicación NestJS:

   ```typescript
   firebase.initializeApp({
     projectId: process.env.PROJECTID,
   });
   process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
   process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
   ```

5. **Ejecuta los emuladores necesarios con el comando:**
   ```bash
   firebase emulators:start --only firestore,auth
   ```

### Pasos para configurar las variables de entorno

1. **Variables de entorno:**

   ```bash
   Copiar el contenido de .env.template y añadirlo al file .env con el projectID colocado al momento de crear el emulador
   ```

### Pasos para ejecutar el proyecto

1. **Instalar dependencias:**

   ```bash
   yarn install
   ```

2. **Ejecutar el proyecto:**

   ```bash
   yarn start:dev
   ```
