#!/bin/bash

# Script to deploy Sanity Studio to sanity.studio
# This temporarily switches to the standalone config for deployment

set -e

echo "🔄 Switching to standalone studio config..."

# Backup the embedded config
cp sanity.config.ts sanity.config.embedded.ts.bak

# Use standalone config for deployment
cp sanity.config.standalone.ts sanity.config.ts

echo "✅ Config switched. Deploying studio..."
echo ""

# Deploy
npx sanity deploy

echo ""
echo "🔄 Restoring embedded studio config..."

# Restore the embedded config
mv sanity.config.embedded.ts.bak sanity.config.ts

echo "✅ Done! Studio deployed and config restored."

