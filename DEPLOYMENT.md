# NAM Prototype - Deployment Guide

This guide will help you deploy the Support Ticket UI to Vercel for client sharing.

## 🚀 Quick Deployment Steps

### 1. Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Repository settings:
   - **Name**: `nam-prototype-support-ui` (or your preferred name)
   - **Visibility**: Public (for easy client sharing)
   - **Initialize**: Leave all checkboxes unchecked (we already have files)
4. Click "Create repository"
5. Copy the repository URL (looks like: `https://github.com/yourusername/nam-prototype-support-ui.git`)

### 2. Push Code to GitHub

Run the deployment script with your repository URL:

```bash
./deploy-setup.sh https://github.com/yourusername/nam-prototype-support-ui.git
```

### 3. Deploy to Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Find and import your repository: `nam-prototype-support-ui`
5. Vercel will auto-detect Next.js settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
6. Click "Deploy"

### 4. Share with Client

After deployment (usually takes 2-3 minutes):
- Your app will be live at: `https://nam-prototype-support-ui.vercel.app`
- You can share this URL directly with your client
- The deployment will auto-update when you push changes to GitHub

## 🔧 Project Features

This deployment includes:

- **Support Ticket Interface**: Pixel-perfect recreation with realistic content
- **AI Assistant Integration**: Smart response drafts and case analysis
- **Interactive Elements**: Hover states, tooltips, expandable content
- **Responsive Design**: Works on desktop and mobile
- **Modern UI**: Tailwind CSS with custom styling

## 📱 Client Demo Points

When sharing with your client, highlight:

1. **Left Sidebar**: Navigation and inbox management
2. **Center Column**: Realistic customer conversation (Kartik's baggage inquiry)
3. **Right Sidebar**: AI-powered case overview and smart response draft
4. **Interactive Features**: Expandable responses, tooltips, hover effects
5. **Professional Design**: Clean, modern interface ready for production

## 🛠 Making Updates

To update the deployment:
1. Make changes to your code
2. Commit and push to GitHub: `git add . && git commit -m "Update message" && git push`
3. Vercel will automatically redeploy (usually within 1-2 minutes)

## 📞 Support

If you encounter any issues during deployment, the most common solutions are:
- Ensure your GitHub repository is public
- Check that all dependencies are in `package.json`
- Verify the build completes locally with `npm run build`

---

**Ready to deploy?** Run `./deploy-setup.sh YOUR_GITHUB_URL` to get started!
