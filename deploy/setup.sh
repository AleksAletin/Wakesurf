#!/bin/bash
# PandaWake VPS Setup Script
# Run as root on Ubuntu 22.04/24.04

set -e

echo "=== Installing Node.js 20 ==="
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

echo "=== Installing nginx ==="
apt-get install -y nginx

echo "=== Installing PM2 ==="
npm install -g pm2

echo "=== Creating app directory ==="
mkdir -p /opt/wakesurf
chown root:root /opt/wakesurf

echo "=== Node version ==="
node -v
npm -v

echo "=== Setup complete! ==="
