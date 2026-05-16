# Maison Valdezzani

Sitio web de lujo premium para la marca **Maison Valdezzani**.

## Inicio rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Características

- Diseño minimalista inspirado en casas de moda europeas
- Catálogo premium con efecto hover cinematográfico
- Carrito de compras con checkout vía WhatsApp
- Selección de colores y tallas con stock en tiempo real
- Panel de administración para gestión de inventario
- Botón flotante de WhatsApp (Concierge)
- Totalmente responsive

## Configuración

Edita `src/lib/config.ts`:

- `whatsapp`: número con código de país (sin +)
- `adminPassword`: contraseña del panel admin (o variable `ADMIN_PASSWORD`)

## Panel de administración

Accede en `/admin` — contraseña por defecto: `mv2026`

## Producción

```bash
npm run build
npm start
```
# maisonvaldez
