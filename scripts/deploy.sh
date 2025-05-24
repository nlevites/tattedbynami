#!/bin/bash

# Nami Portfolio - Vercel Deployment Script

echo "🌸 Deploying Nami's Portfolio to Vercel..."

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the project root."
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check types and build
echo "🔍 Checking TypeScript..."
npm run check

if [ $? -ne 0 ]; then
    echo "❌ TypeScript check failed. Please fix errors before deploying."
    exit 1
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✨ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Set up environment variables in Vercel dashboard if needed:"
echo "   - RESEND_API_KEY (for email functionality)"
echo "   - FROM_EMAIL"
echo "   - TO_EMAIL"
echo "2. Test the booking form on your deployed site"
echo "3. Update your domain settings if using a custom domain" 