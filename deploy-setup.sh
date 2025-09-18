#!/bin/bash

# NAM Prototype Deployment Setup Script
# Run this script after creating your GitHub repository

echo "🚀 NAM Prototype Deployment Setup"
echo "=================================="

# Check if repository URL is provided
if [ -z "$1" ]; then
    echo "❌ Please provide your GitHub repository URL as an argument"
    echo "Usage: ./deploy-setup.sh https://github.com/yourusername/repository-name.git"
    echo ""
    echo "Steps to get your repository URL:"
    echo "1. Go to https://github.com"
    echo "2. Create a new repository (suggested name: nam-prototype-support-ui)"
    echo "3. Make it public"
    echo "4. Don't initialize with README/gitignore"
    echo "5. Copy the repository URL from the setup page"
    exit 1
fi

REPO_URL=$1

echo "📁 Repository URL: $REPO_URL"
echo ""

# Add remote origin
echo "🔗 Adding remote origin..."
git remote add origin $REPO_URL

# Push to GitHub
echo "📤 Pushing code to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Code successfully pushed to GitHub!"
echo ""
echo "🌐 Next steps for Vercel deployment:"
echo "1. Go to https://vercel.com"
echo "2. Sign in with your GitHub account"
echo "3. Click 'New Project'"
echo "4. Import your repository: $(basename $REPO_URL .git)"
echo "5. Vercel will auto-detect Next.js and configure build settings"
echo "6. Click 'Deploy'"
echo ""
echo "🎉 Your app will be live at: https://$(basename $REPO_URL .git).vercel.app"
