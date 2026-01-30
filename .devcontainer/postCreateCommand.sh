#!/bin/bash
set -e pipefail

# Install Node.js dependencies
cd /app/frontend
npm install -g npm@11.6.3
npm install
npm run dev