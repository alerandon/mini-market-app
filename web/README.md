# Mini Market Web Application

Una aplicación web de mini market construida con Next.js 15, TypeScript y Tailwind CSS.

## Características

- **Lista de productos**: Vista en grid responsiva con tarjetas de productos
- **Detalle de producto**: Vista detallada de cada producto individual
- **API Integration**: Conexión con la API backend para obtener datos de productos
- **UI Responsiva**: Diseño adaptable para móviles y escritorio
- **Estados de carga**: Indicadores de carga y manejo de errores

## Estructura del Proyecto

```
web/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Página principal con bienvenida
│   │   ├── products/
│   │   │   ├── page.tsx          # Lista de productos
│   │   │   └── [id]/page.tsx     # Detalle de producto
│   │   ├── layout.tsx            # Layout principal
│   │   └── globals.css           # Estilos globales
│   ├── components/
│   │   └── ProductCard.tsx       # Componente de tarjeta de producto
│   └── lib/
│       └── api.ts                # Cliente API y tipos
├── public/                       # Archivos estáticos
├── .env.local                    # Variables de entorno
└── package.json
```

## Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto web:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

## Componentes Principales

### ProductCard

Componente reutilizable para mostrar información básica del producto:

- Imagen del producto (200x200px)
- Nombre del producto (16px, semibold)
- Precio (14px)
- Badge de stock (verde/gris)
- Categoría
- Click para navegar al detalle

### Lista de Productos (/products)

- Grid responsivo con mínimo 250px por columna
- Gap de 16px entre elementos
- Paginación funcional
- Estados de carga y error
- Responsive design

### Detalle de Producto (/products/[id])

- Imagen grande del producto
- Título (20px)
- Precio (18px)
- Información de disponibilidad
- Botón "Agregar a favoritos" (sin lógica real)
- Información de categoría y fechas
- Botón de volver

## API Integration

La aplicación se conecta a la API backend através del archivo `lib/api.ts` que incluye:

- Tipos TypeScript para productos y respuestas
- Cliente API con manejo de errores
- Funciones para obtener productos
- Soporte para paginación y búsqueda

### Endpoints Utilizados

- `GET /products` - Lista paginada de productos
- `GET /products/:id` - Detalle de un producto específico
- `GET /products/search` - Búsqueda de productos
- `GET /products?category=...` - Filtro por categoría

## Estilos y Diseño

- **Framework CSS**: Tailwind CSS
- **Fuentes**: Geist Sans (variable)
- **Colores**: Paleta azul con tonos complementarios
- **Responsive**: Mobile-first approach
- **Animaciones**: Transiciones suaves en hover states

### Componentes de UI

- Cards con sombras y bordes redondeados
- Badges de estado con códigos de color
- Botones con estados hover
- Grid responsivo con auto-fit
- Indicadores de carga animados

## Funcionalidades

### Navegación

- Página principal con llamada a la acción
- Navegación a lista de productos
- Navegación a detalle desde cards
- Botón de volver en páginas de detalle

### UX Features

- Loading states con spinners
- Error handling con mensajes informativos
- Paginación intuitiva
- Responsive design
- Imágenes con lazy loading

## Tecnologías

- **Next.js 15**: Framework React con App Router
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de utilidades CSS
- **React**: Biblioteca de UI
- **Node.js**: Runtime de JavaScript

## Desarrollo

El proyecto está configurado para desarrollo local con:

- Hot reload automático
- TypeScript checking
- ESLint para calidad de código
- Turbopack para bundling rápido

## Próximas Mejoras

- [ ] Funcionalidad real de favoritos
- [ ] Carrito de compras
- [ ] Búsqueda y filtros avanzados
- [ ] Autenticación de usuarios
- [ ] Modo oscuro
- [ ] PWA capabilities
