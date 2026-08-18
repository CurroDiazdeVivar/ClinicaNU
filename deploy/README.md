# Despliegue de Clínica Nuria Ugarte (VPS)

Infraestructura CMS Decap + OAuth GitHub en el VPS IONOS (87.106.229.193).

## Componentes

| Archivo | Función |
|---|---|
| `docker-compose.oauth.yml` | Contenedor OAuth provider (ghcr.io/njfamirm/decap-cms-github-backend) |
| `.env.example` | Plantilla de credenciales (copiar a `.env`) |
| `sync.sh` | Auto-actualización: git pull + build + rsync al dist |

## Configuración del Proveedor OAuth

1. OAuth App en GitHub (Settings > Developer settings > OAuth Apps):
   - Nombre: `Clínica Nuria Ugarte CMS`
   - Homepage URL: `https://prueba.clinicanuriaugarte.es`
   - Authorization callback URL: `https://prueba.clinicanuriaugarte.es/api/oauth/callback`
   - Guardar → obtener Client ID y Client Secret

2. En el VPS, crear `/opt/clinica-nuria-ugarte/.env`:
   ```bash
   cp /opt/clinica-nuria-ugarte/deploy/.env.example /opt/clinica-nuria-ugarte/.env
   nano /opt/clinica-nuria-ugarte/.env   # rellenar GITHUB_CLIENT_ID y GITHUB_CLIENT_SECRET
   ```

3. Levantar el OAuth provider:
   ```bash
   cd /opt/clinica-nuria-ugarte && docker compose -f deploy/docker-compose.oauth.yml --env-file .env up -d
   ```

## Auto-actualización (cron)

El repo se clona en `/opt/clinica-nuria-ugarte/repo` y el build se sirve desde `/opt/clinica-nuria-ugarte/dist`.

```bash
crontab -e
# añadir línea:
* * * * * /opt/clinica-nuria-ugarte/deploy/sync.sh
```

Logs: `/var/log/clinica-sync.log`

## Caddyfile (dentro del bloque prueba.clinicanuriaugarte.es)

```
handle /api/oauth* {
    reverse_proxy oauth-provider:3000
}
```

Recargar: `docker exec vuelta-ciclista-vps-caddy-1 caddy reload --config /etc/caddy/Caddyfile`

## Flujo final

1. La Dra. entra en `https://prueba.clinicanuriaugarte.es/admin/`
2. "Login with GitHub" → OAuth (con la cuenta de GitHub autorizada)
3. Edita textos con formularios → "Publish" → commit al repo
4. El cron (1 min) detecta el cambio → build → web actualizada

## Notas

- El repo `ClinicaNU` es público — el git pull no necesita credenciales
- Solo las cuentas GitHub con acceso al repo pueden editar (añadir a la Dra. como colaboradora)
- La imagen correcta es `ghcr.io/njfamirm/decap-cms-github-backend:1.2.0` (la de decaporg NO existe)
