#!/bin/bash

# Script de sincronización automática para la web de Clínica Nuria Ugarte (VPS)
# Repo: https://github.com/CurroDiazdeVivar/ClinicaNU (rama main)
# Uso (cron cada minuto): * * * * * /opt/clinica-nuria-ugarte/sync.sh

REPO_DIR="/opt/clinica-nuria-ugarte/repo"
DIST_DIR="/opt/clinica-nuria-ugarte/dist"
LOG_FILE="/var/log/clinica-sync.log"

cd "$REPO_DIR" || { echo "$(date): Error: $REPO_DIR no existe (clonar repo primero)" | tee -a "$LOG_FILE"; exit 1; }

# Registrar inicio
echo "$(date): Iniciando sincronización" >> "$LOG_FILE"

# Obtener hash actual ANTES del pull
BEFORE=$(git rev-parse HEAD 2>/dev/null)

# Actualizar el repositorio
git pull origin main >> "$LOG_FILE" 2>&1

# Obtener hash DESPUÉS del pull
AFTER=$(git rev-parse HEAD 2>/dev/null)

# Si no hay cambios, salir sin tocar nada
if [ "$BEFORE" = "$AFTER" ]; then
    echo "$(date): No hay cambios en el repositorio" >> "$LOG_FILE"
    exit 0
fi

echo "$(date): Cambios detectados ($BEFORE -> $AFTER), construyendo el sitio" >> "$LOG_FILE"

# Instalar dependencias si package.json cambió o node_modules no existe
if [ ! -d node_modules ] || [ package.json -nt node_modules ]; then
    echo "$(date): Instalando dependencias" >> "$LOG_FILE"
    npm install >> "$LOG_FILE" 2>&1
fi

# Construir el sitio (config VPS: base /, outDir dist-vps)
echo "$(date): Construyendo el sitio" >> "$LOG_FILE"
npx astro build --config astro.config.vps.mjs >> "$LOG_FILE" 2>&1

# Sincronizar los archivos construidos al dist servido por Nginx
echo "$(date): Sincronizando archivos" >> "$LOG_FILE"
rsync -az --delete dist-vps/ "$DIST_DIR/" >> "$LOG_FILE" 2>&1

echo "$(date): Sincronización completada" >> "$LOG_FILE"
