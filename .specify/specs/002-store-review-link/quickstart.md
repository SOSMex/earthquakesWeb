# Validación

1. `npm ci --ignore-scripts --no-audit --no-fund`.
2. `npm run test:review` y `npm run test:family`.
3. `npm run lint` y `npm run build`.
4. `npm run start -- --port 3187`; visitar `/calificar` en escritorio: ambas tiendas, sin redirección.
5. Con JS bloqueado, ambos enlaces siguen presentes; App Store HTTPS conserva `action=write-review`.
6. Probar iPhone, iPad en modo escritorio, Android y navegador integrado. Registrar navegación aparte de apertura de tienda instalada. Volver a la ruta no repite intento en esa pestaña.
7. Antes de campaña, repetir en URL publicada y validar recepción/tap iOS del payload por separado.
