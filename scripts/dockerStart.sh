#!/bin/sh

echo "Waiting for postgres..."
until PGPASSWORD=postgres pg_isready -h postgres -U postgres; do
    echo "Postgres is unavailable - sleeping"
    sleep 2
done

echo "Postgres is up - running migrations"
pnpm migrate

echo "Starting application..."
exec pnpm dev
