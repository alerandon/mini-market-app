# 🛒 Mini Market App

Una aplicación full-stack moderna para gestión de productos de un mini mercado, construida con **TypeScript**, **React/Next.js** y **Node.js/Express**.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Requisitos Técnicos](#-requisitos-técnicos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Scripts Disponibles](#-scripts-disponibles)
- [Testing](#-testing)
- [Decisiones de Desarrollo](#-decisiones-de-desarrollo)
- [Contribución](#-contribución)

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
- **Validación**: Zod
- **Testing**: Jest + Supertest
- **Desarrollo**: Nodemon para hot-reload

**Características:**

- API REST para gestión de productos
- Arquitectura por features (`features/products/`)
- Middlewares para CORS y manejo de errores
- Scripts de seeding y utilidades
- Validación de esquemas con Zod
- Cobertura completa de testing

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

Crear un archivo `.env` en el directorio `/api`:

```env
# Base de datos
DB_URI=mongodb://localhost:27017/mini-market

# Servidor
PORT=3000

# Entorno
NODE_ENV=development
```

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <repository-url>
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
- **API**: http://localhost:3000/api
- **API Health Check**: http://localhost:3000/api/health

## 📁 Estructura del Proyecto

<details>
<summary>Expandir estructura completa</summary>

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
│       │   └── products/     # Feature de productos
│       │       ├── product.model.ts     # Modelo de datos
│       │       ├── product.service.ts   # Lógica de negocio
│       │       ├── product.controller.ts # Controladores
│       │       ├── product.router.ts    # Rutas
│       │       └── product.*.ts         # Helpers y constantes
│       ├── scripts/
│       │   ├── seed.ts       # Script de seeding
│       │   └── cheapest-products.ts
│       ├── data/
│       │   └── products.json # Datos iniciales
│       └── __tests__/        # Tests de la API
│
├── web/                      # Frontend Next.js
│   ├── package.json          # Dependencias del frontend
│   ├── next.config.ts        # Configuración de Next.js
│   ├── tailwind.config.js    # Configuración de Tailwind
│   ├── jest.config.js        # Configuración de testing
│   └── src/
│       ├── app/              # App Router de Next.js
│       │   ├── layout.tsx    # Layout principal
│       │   ├── page.tsx      # Página de inicio
│       │   └── products/     # Páginas de productos
│       ├── components/       # Componentes React
│       │   ├── layout/       # Componentes de layout
│       │   ├── products/     # Componentes de productos
│       │   └── ui/           # Componentes de UI
│       ├── hooks/            # Hooks personalizados
│       ├── lib/              # Utilidades y configuración
│       ├── types/            # Tipos específicos del frontend
│       └── __tests__/        # Tests del frontend
│
└── shared/                   # Paquete compartido
    ├── package.json          # Configuración del paquete
    ├── tsconfig.json         # Configuración TypeScript
    ├── types.ts              # Tipos compartidos
    └── index.ts              # Exportaciones principales
```

</details>

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

<!-- Esta sección será completada con las decisiones técnicas específicas del proyecto -->

### Arquitectura

_[Espacio para documentar decisiones arquitecturales]_

### Tecnologías Elegidas

_[Espacio para justificar la elección del stack tecnológico]_

### Patrones de Diseño

_[Espacio para documentar patrones implementados]_

### Performance y Optimización

_[Espacio para documentar estrategias de optimización]_
