#!/bin/bash
# Script de déploiement rapide
echo "Déploiement du SaaS-Data Engine..."

# 1. Mise à jour du code
git pull origin main

# 2. Construction et lancement des conteneurs
docker-compose down
docker-compose up -d --build

echo "Déploiement terminé avec succès !"
