#!/bin/sh
# GatherTix - Self-hosted ticketing platform for non-profits and community groups.
# Copyright (C) 2024 GatherTix Contributors
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Automated PostgreSQL backup script — dumps database and uploads to MinIO.
# Designed to be run as a cron job inside the Docker network.
#
# Example cron schedule (daily at 2am):
#   0 2 * * * /app/docker/backup.sh >> /var/log/gathertix-backup.log 2>&1
#
# Required environment variables:
#   POSTGRES_HOST      - PostgreSQL hostname (default: postgres)
#   POSTGRES_PORT      - PostgreSQL port (default: 5432)
#   POSTGRES_USER      - Database user
#   POSTGRES_PASSWORD  - Database password
#   POSTGRES_DB        - Database name
#   MINIO_ENDPOINT     - MinIO endpoint URL (default: http://minio:9000)
#   MINIO_ACCESS_KEY   - MinIO root user
#   MINIO_SECRET_KEY   - MinIO root password
#   MINIO_BUCKET       - Target bucket (default: gathertix-backups)
#   BACKUP_RETENTION   - Days to keep backups (default: 30)

set -e

# ── Configuration ────────────────────────────────────────────────────────────
POSTGRES_HOST="${POSTGRES_HOST:-postgres}"
POSTGRES_PORT="${POSTGRES_PORT:-5432}"
POSTGRES_USER="${POSTGRES_USER:-ticketing}"
POSTGRES_DB="${POSTGRES_DB:-ticketing}"
MINIO_ENDPOINT="${MINIO_ENDPOINT:-http://minio:9000}"
MINIO_BUCKET="${MINIO_BUCKET:-gathertix-backups}"
BACKUP_RETENTION="${BACKUP_RETENTION:-30}"

TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP_FILE="/tmp/gathertix_backup_${TIMESTAMP}.sql.gz"
REMOTE_PATH="backups/${TIMESTAMP}/gathertix_${TIMESTAMP}.sql.gz"

# ── Validate required variables ───────────────────────────────────────────────
if [ -z "$POSTGRES_PASSWORD" ]; then
  echo "[ERROR] POSTGRES_PASSWORD is required." >&2
  exit 1
fi

if [ -z "$MINIO_ACCESS_KEY" ] || [ -z "$MINIO_SECRET_KEY" ]; then
  echo "[ERROR] MINIO_ACCESS_KEY and MINIO_SECRET_KEY are required." >&2
  exit 1
fi

echo "[$(date -Iseconds)] Starting GatherTix database backup..."

# ── Dump PostgreSQL database ──────────────────────────────────────────────────
echo "[$(date -Iseconds)] Dumping database '${POSTGRES_DB}' from ${POSTGRES_HOST}:${POSTGRES_PORT}..."

PGPASSWORD="${POSTGRES_PASSWORD}" pg_dump \
  --host="${POSTGRES_HOST}" \
  --port="${POSTGRES_PORT}" \
  --username="${POSTGRES_USER}" \
  --no-password \
  --format=custom \
  --compress=9 \
  "${POSTGRES_DB}" \
  | gzip > "${BACKUP_FILE}"

BACKUP_SIZE="$(du -sh "${BACKUP_FILE}" | cut -f1)"
echo "[$(date -Iseconds)] Backup created: ${BACKUP_FILE} (${BACKUP_SIZE})"

# ── Upload to MinIO via mc ────────────────────────────────────────────────────
echo "[$(date -Iseconds)] Uploading to MinIO bucket '${MINIO_BUCKET}'..."

# Configure mc alias (non-persistent, inline)
mc alias set gathertix-minio \
  "${MINIO_ENDPOINT}" \
  "${MINIO_ACCESS_KEY}" \
  "${MINIO_SECRET_KEY}" \
  --api S3v4

# Ensure bucket exists
mc mb --ignore-existing "gathertix-minio/${MINIO_BUCKET}"

# Upload the backup
mc cp "${BACKUP_FILE}" "gathertix-minio/${MINIO_BUCKET}/${REMOTE_PATH}"

echo "[$(date -Iseconds)] Upload complete: s3://${MINIO_BUCKET}/${REMOTE_PATH}"

# ── Cleanup local temp file ───────────────────────────────────────────────────
rm -f "${BACKUP_FILE}"
echo "[$(date -Iseconds)] Local temp file cleaned up."

# ── Prune old backups (retention policy) ─────────────────────────────────────
echo "[$(date -Iseconds)] Pruning backups older than ${BACKUP_RETENTION} days..."
CUTOFF_DATE="$(date -d "${BACKUP_RETENTION} days ago" +%Y%m%d 2>/dev/null || date -v-"${BACKUP_RETENTION}"d +%Y%m%d)"

mc ls "gathertix-minio/${MINIO_BUCKET}/backups/" 2>/dev/null | while read -r line; do
  FOLDER="$(echo "$line" | awk '{print $NF}' | tr -d '/')"
  FOLDER_DATE="$(echo "$FOLDER" | cut -c1-8)"
  if [ -n "$FOLDER_DATE" ] && [ "$FOLDER_DATE" -lt "$CUTOFF_DATE" ] 2>/dev/null; then
    echo "[$(date -Iseconds)] Removing old backup: ${FOLDER}"
    mc rm --recursive --force "gathertix-minio/${MINIO_BUCKET}/backups/${FOLDER}/" || true
  fi
done

echo "[$(date -Iseconds)] Backup process completed successfully."
