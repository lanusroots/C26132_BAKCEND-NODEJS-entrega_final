# Proyecto Final Integrador — API Productos

API REST para una tienda en línea, desarrollada como proyecto final del curso de Backend con Node.js. Gestiona productos (CRUD completo), con autenticación JWT y datos persistidos en Firestore.

Con este proyecto logro la formación como **Desarrollador Fullstack JavaScript**: sumando la capacidad de diseñar, construir y proteger un backend real con Node.js, completando el recorrido end-to-end de una aplicación.

## Demo en producción

API deployada en Vercel: [https://c26132-bakcend-nodejs-entrega-final.vercel.app/](https://c26132-bakcend-nodejs-entrega-final.vercel.app/)

## Tecnologías

- Node.js + Express 5
- Firebase (SDK cliente) + Firestore
- JSON Web Token (JWT)
- CORS, body-parser, dotenv

## Arquitectura

El proyecto está organizado en capas, separando responsabilidades:

```
src/
├── config/         # Configuración de servicios externos (Firebase)
├── routes/         # Definición de endpoints
├── controllers/    # Manejo de petición/respuesta HTTP
├── services/       # Lógica de negocio
├── models/         # Acceso a datos (Firestore)
├── middlewares/    # Autenticación y manejo de errores
├── utils/          # Utilidades (ApiError)
├── app.js          # Configuración de la app de Express (middlewares y rutas)
└── index.js        # Punto de entrada del servidor (uso local)

api/
└── index.js        # Entrypoint serverless para Vercel
```

## Instalación

```bash
pnpm install
```

## Variables de entorno

Copiá `.env.example` a `.env` y completá con tus propios valores:

```
PORT=3000

FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=

JWT_SECRET=
JWT_EXPIRES_IN=1h

ADMIN_USERNAME=
ADMIN_PASSWORD=
```

La configuración de Firebase (`FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_PROJECT_ID`, `FIREBASE_STORAGE_BUCKET`, `FIREBASE_MESSAGING_SENDER_ID`, `FIREBASE_APP_ID`) se obtiene desde **Firebase Console → Configuración del proyecto → General → Tus apps → app Web**, copiando los valores del objeto `firebaseConfig`.

## Ejecución

```bash
pnpm dev    # con nodemon (desarrollo)
pnpm start  # producción local
```

## Endpoints

### Autenticación

| Método | Ruta | Descripción | Protegida |
|---|---|---|---|
| POST | `/auth/login` | Devuelve un Bearer Token si las credenciales son válidas | No |

**Body de ejemplo:**

```json
{
  "username": "admin",
  "password": "admin1234"
}
```

### Productos

Todas las rutas de productos requieren el header `Authorization: Bearer <token>`.

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/products` | Devuelve todos los productos |
| GET | `/api/products/:id` | Devuelve un producto por ID |
| POST | `/api/products/create` | Crea un nuevo producto |
| PUT | `/api/products/:id` | Actualiza un producto existente |
| DELETE | `/api/products/:id` | Elimina un producto |

**Body de ejemplo (POST/PUT):**

```json
{
  "name": "Teclado mecánico",
  "price": 8000,
  "stock": 10,
  "category": "Periféricos"
}
```

## Manejo de errores

| Código | Cuándo ocurre |
|---|---|
| 400 | Datos faltantes o con formato inválido en la petición |
| 401 | No se envió token de autenticación |
| 403 | Token inválido o expirado |
| 404 | Recurso o ruta no encontrada |
| 500 | Error interno del servidor |

## Deploy

La API está deployada en **Vercel** como funciones serverless, conectada al repositorio de GitHub: cada push a `main` dispara un deploy automático.

**Notas sobre la configuración del deploy:**

- Express corre como función serverless: la app (`src/app.js`) se exporta desde `api/index.js`, que es el entrypoint que Vercel reconoce automáticamente.
- El enrutamiento de todas las peticiones hacia esa función se define en `vercel.json` mediante `rewrites`.
- Las variables de entorno (configuración de Firebase, JWT, credenciales de admin) se configuran manualmente en **Vercel → Project Settings → Environment Variables**, ya que el `.env` local no se sube al repositorio.
- El proyecto usa `pnpm` en desarrollo local; en el entorno de build de Vercel se utiliza `npm` para instalar dependencias.