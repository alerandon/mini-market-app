# 🛒 Mini Market App

Una aplicación full-stack moderna para gestión de productos de un mini mercado, construida con **TypeScript**, **React/Next.js** y **Node.js/Express**.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Requisitos Técnicos](#-requisitos-técnicos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Scripts Disponibles](#-scripts-disponibles)
- [Algoritmo Utilitario: Productos Más Baratos](#-algoritmo-utilitario-productos-más-baratos)
- [Testing](#-testing)
- [Decisiones de Desarrollo](#-decisiones-de-desarrollo)

## ✨ Características

- **Full-Stack TypeScript**: Desarrollo type-safe tanto en frontend como backend
- **Monorepo**: Organización modular con workspaces para `api`, `web` y `shared`
- **API REST**: Backend robusto con Express.js y MongoDB
- **Frontend Moderno**: Interfaz desarrollada con Next.js 15 y Tailwind CSS
- **Testing Integral**: Cobertura de pruebas con Jest y Testing Library
- **Desarrollo Eficiente**: Turborepo para builds y desarrollo optimizado
- **Tipos Compartidos**: Consistencia de datos entre frontend y backend

## 🏗️ Arquitectura del Proyecto

El proyecto está organizado como un **monorepo** con tres workspaces principales:

```
mini-market-app/
├── api/          # Backend API (Express.js + MongoDB)
├── web/          # Frontend (Next.js + React)
├── shared/       # Tipos TypeScript compartidos
└── package.json  # Configuración raíz del monorepo
```

### 📦 API (`/api`)

**Stack tecnológico:**

- **Runtime**: Node.js con TypeScript
- **Framework**: Express.js
- **Base de datos**: MongoDB con Mongoose
- **Testing**: Jest + Supertest
- **Desarrollo**: Nodemon para hot-reload

**Características:**

- API REST para gestión de productos
- Arquitectura por features (`features/products/`)
- Middlewares para CORS y manejo de errores
- Scripts de seeding y utilidades

### 🌐 Web (`/web`)

**Stack tecnológico:**

- **Framework**: Next.js 15 con App Router
- **UI**: React 19 + TypeScript
- **Estilos**: Tailwind CSS v4
- **Build**: Turbopack para desarrollo rápido
- **Testing**: Jest + Testing Library + jsdom

**Características:**

- Interfaz moderna y responsive
- Componentes reutilizables organizados por categoría
- Hooks personalizados para lógica de estado
- Integración seamless con la API
- Optimización de performance con Next.js

### 🔄 Shared (`/shared`)

**Propósito:**

- Tipos TypeScript compartidos entre API y Web
- Garantiza consistencia de datos
- Evita duplicación de interfaces
- Facilita el mantenimiento

## 📋 Requisitos Técnicos

### Requisitos del Sistema

- **Node.js**: v18.0.0 o superior
- **npm**: v8.0.0 o superior
- **MongoDB**: v5.0 o superior (local o remoto)

### Variables de Entorno

#### API (`/api`)

Crea un archivo `.env` en el directorio `/api`:

```env
# Base de datos
DB_URI=mongodb://127.0.0.1:27017/mini-market-app

# Servidor
PORT=3001

# Entorno
NODE_ENV=development
```

#### Web (`/web`)

Crea un archivo `.env` en el directorio `/web`:

```env
# URL base de la API
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Entorno
NODE_ENV=development
```

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/alerandon/mini-market-app.git
cd mini-market-app
```

### 2. Instalar dependencias

```bash
# Instalar todas las dependencias del monorepo
npm install
```

### 3. Configurar la base de datos

```bash
# Asegúrate de que MongoDB esté ejecutándose
# Luego ejecuta el script de seeding
npm run api:seed
```

### 4. Iniciar el entorno de desarrollo

**Opción A: Iniciar todo el stack**

```bash
npm run dev
```

**Opción B: Iniciar servicios individualmente**

```bash
# Terminal 1: API Backend
npm run dev:api

# Terminal 2: Frontend Web
npm run dev:web
```

### 5. Acceder a la aplicación

- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001/api

## 📁 Estructura del Proyecto

```
mini-market-app/
├── package.json              # Configuración del monorepo
├── turbo.json                # Configuración de Turborepo
├── README.md                 # Documentación principal
│
├── api/                      # Backend API
│   ├── package.json          # Dependencias del backend
│   ├── tsconfig.json         # Configuración TypeScript
│   ├── jest.config.js        # Configuración de testing
│   ├── nodemon.json          # Configuración de desarrollo
│   └── src/
│       ├── index.ts          # Punto de entrada de la API
│       ├── database.ts       # Configuración de MongoDB
│       ├── router.ts         # Router principal
│       ├── features/
│       │   └── products/                   # Feature de productos
│       │       ├── product.model.ts        # Modelo de datos
│       │       ├── product.service.ts      # Lógica de negocio
│       │       ├── product.controller.ts   # Controladores
│       │       ├── product.router.ts       # Rutas
│       │       ├── product.helpers.ts      # Helpers
│       │       └── product.constants.ts    # Constantes
│       ├── scripts/
│       │   ├── seed.ts                     # Script de seeding
│       │   └── cheapest-products.ts        # Script para algoritmo utilitario de getCheapestProducts
│       ├── data/
│       │   └── products.json   # Datos iniciales
│       └── __tests__/          # Tests de la API
│
├── web/                        # Frontend Next.js
│   ├── package.json            # Dependencias del frontend
│   ├── next.config.ts          # Configuración de Next.js
│   ├── tailwind.config.js      # Configuración de Tailwind
│   ├── jest.config.js          # Configuración de testing
│   └── src/
│       ├── app/                # App Router de Next.js
│       │   ├── layout.tsx      # Layout principal
│       │   ├── page.tsx        # Página de inicio
│       │   └── products/       # Páginas de productos
│       ├── components/         # Componentes React
│       │   ├── layout/         # Componentes de layout
│       │   ├── products/       # Componentes de productos
│       │   └── ui/             # Componentes de UI
│       ├── hooks/              # Hooks personalizados
│       ├── lib/                # Utilidades y configuración
│       ├── types/              # Tipos específicos del frontend
│       └── __tests__/          # Tests del frontend
│
└── shared/                     # Paquete compartido
    ├── package.json            # Configuración del paquete
    ├── tsconfig.json           # Configuración TypeScript
    ├── types.ts                # Tipos compartidos
    └── index.ts                # Exportaciones principales
```

## � Scripts Disponibles

### Scripts Globales (Raíz)

```bash
npm run dev           # Iniciar desarrollo completo
npm run build         # Build de producción
npm run test          # Ejecutar todos los tests
npm run test:watch    # Tests en modo watch
```

### Scripts Específicos por Workspace

```bash
# API Backend
npm run dev:api       # Desarrollo solo API
npm run test:api      # Tests solo API
npm run api:seed      # Seeding de base de datos
npm run api:cheapest  # Script de productos más baratos

# Web Frontend
npm run dev:web       # Desarrollo solo frontend
npm run test:web      # Tests solo frontend
npm run web:build     # Build del frontend
```

## 🔧 Algoritmo Utilitario: Productos Más Baratos

El proyecto incluye un **script utilitario** que implementa la función `getTopCheapestAvailable` para obtener los productos más baratos disponibles en el inventario.

### ⚙️ Funcionalidad del Algoritmo

El algoritmo realiza las siguientes operaciones:

1. **Filtrado**: Selecciona únicamente productos con `isAvailable: true`
2. **Ordenamiento**: Ordena los productos por precio de manera ascendente
3. **Limitación**: Retorna los N productos más baratos (configurable)
4. **Optimización**: Utiliza `.lean()` para mejorar el rendimiento de consulta

### 📋 Prerequisitos

**⚠️ IMPORTANTE**: La API debe estar ejecutándose antes de correr el script utilitario.

```bash
# Asegúrate de que la API esté corriendo
npm run dev:api
```

### 🚀 Uso del Script

#### Opción 1: Usar el script con configuración por defecto (3 productos)

```bash
npm run api:cheapest
```

#### Opción 2: Especificar el número de productos a obtener

```bash
# Desde la raíz del proyecto
npm run api:cheapest -- 5

# O directamente desde el workspace de api
cd api
npm run cheapest 10
```

### 📝 Paso a Paso de Ejecución

1. **Validar entorno**:

   ```bash
   # Verificar que MongoDB esté ejecutándose
   # Verificar que las variables de entorno estén configuradas
   ```

2. **Iniciar la API** (en terminal separado):

   ```bash
   npm run dev:api
   ```

3. **Ejecutar el script utilitario**:

   ```bash
   # Obtener los 3 productos más baratos (por defecto)
   npm run api:cheapest

   # O especificar cantidad personalizada
   npm run api:cheapest -- 7
   ```

### 📊 Ejemplo de Salida

```bash
Top 3 productos más baratos disponibles:
1. Leche Descremada - $2.50
2. Pan Integral - $3.00
3. Yogurt Natural - $4.25
```

### 🛠️ Validaciones Implementadas

- **Validación de argumentos**: Verifica que el número ingresado sea válido y mayor a 0
- **Manejo de errores**: Captura y reporta errores de conexión a base de datos
- **Conexión a BD**: Establece conexión automática antes de ejecutar consultas
- **Finalización limpia**: Cierra la conexión y termina el proceso correctamente

## 🧪 Testing

El proyecto incluye una estrategia de testing integral:

### Backend Testing

- **Unit Tests**: Servicios y controladores
- **Integration Tests**: Rutas y base de datos
- **Mocking**: MongoDB y dependencias externas

### Frontend Testing

- **Component Tests**: Testing Library para componentes
- **Hook Tests**: Testing de hooks personalizados
- **Integration Tests**: Flujos completos de usuario

### Ejecutar Tests

```bash
# Todos los tests
npm run test

# Tests específicos
npm run test:api
npm run test:web

# Modo watch
npm run test:watch
```

## 🤔 Decisiones de Desarrollo

### En el proyecto de `/api`:

- Podemos observar que se maneja por features. Independientemente del manejo de un solo feature, en este caso con `products`, es ideal dado a que las entidades o features manejados se organizan de manera modular de tal manera que podemos manejar varios archivos relacionados a cada feature, incluso fuera de la convención estándar de solo controller, service y router. Esto permite un crecimiento escalable.
- Los archivos tanto de `seed.ts` como `cheapest-products.ts` se delegan a una carpeta de `/scripts`, debido a que ambos cumplen el mismo flujo de correr su código solo al momento de ejecutar un script de npm.

### En el proyecto de `/web`:

- Los archivos de `pages.tsx` tienen organizados su código tsx por componentes separados como secciones. Este enfoque es esencial más alla del manejo de componentes de código que conocemos como en los cards, barras de navegación o inputs, ya que al final logra el objetivo de manejar un código más ordenado y mantenible.
- En el hook de `useProductDetail.ts` observamos que la función que maneja la lógica del botón de "Agregar a favoritos" (toggleFavorite) contiene un comentario de **TODO**, este mismo es una simulación para efectos de dar demostración de como documentar las funcionalidades pendientes, cuando se tienen que relegar a menor prioridad para poder entregar un prototipo.

### Con los types compartidos en `/shared`:

- Todo lo relacionado a `Products` o `Pagination` se maneja ahi incluso (en casos especificos) se manejen tipos exclusivos de un solo proyecto (solo usandose en `/api` por ejemplo), ya que esto nos permite centralizar todo en una sola fuente de la verdad, y facilita la organización.
