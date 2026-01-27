# 🛒 MercaPlaza - E-commerce del Cono Sur

Marketplace moderno para Paraguay, Brasil y Argentina.

## 🚀 Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en navegador
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
mercaplaza/
├── src/
│   ├── app/
│   │   ├── globals.css        # Estilos globales
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Página de inicio
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx     # Navegación
│   │   │   └── Footer.tsx     # Pie de página
│   │   ├── sections/
│   │   │   ├── Hero.tsx       # Sección principal
│   │   │   ├── Categories.tsx # Categorías
│   │   │   ├── FeaturedProducts.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── TrustBadges.tsx
│   │   │   └── Newsletter.tsx
│   │   └── ui/
│   │       └── ProductCard.tsx # Card reutilizable
│   ├── lib/                   # Utilidades (Supabase, etc.)
│   └── types/                 # Tipos TypeScript
│       └── index.ts
├── public/                    # Archivos estáticos
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🛠️ Stack Tecnológico

- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Lucide React** - Iconos

## 📋 Roadmap

### ✅ Fase 1: Landing Page
- [x] Header con navegación
- [x] Hero section
- [x] Categorías
- [x] Productos destacados
- [x] Cómo funciona
- [x] Trust badges
- [x] Newsletter
- [x] Footer

### ⏳ Fase 2: Catálogo
- [ ] Página de productos con filtros
- [ ] Página de detalle de producto
- [ ] Búsqueda

### ⏳ Fase 3: Backend (Supabase)
- [ ] Configurar Supabase
- [ ] Base de datos
- [ ] Autenticación
- [ ] Storage para imágenes

### ⏳ Fase 4: Funcionalidades
- [ ] Carrito de compras
- [ ] Login / Registro
- [ ] Checkout
- [ ] MercadoPago

### ⏳ Fase 5: Deploy
- [ ] Vercel
- [ ] Dominio personalizado

### ⏳ Fase 6: App Móvil
- [ ] React Native
- [ ] Mismo backend
