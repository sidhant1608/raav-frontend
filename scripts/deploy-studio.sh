#!/bin/bash

# Script to deploy Sanity Studio to sanity.studio
# Since we're using standalone studio only, we can deploy directly

set -e

echo "🚀 Deploying Sanity Studio to sanity.studio..."
echo ""

# Deploy directly - no config switching needed
npx sanity deploy

echo ""
echo "✅ Studio deployed successfully!"
echo "🌐 Access at: https://raav.sanity.studio/"

