# Vercel Deployment Guide

This guide will help you deploy your ABS Construction Studio project from GitHub to Vercel.

## Prerequisites

1. **GitHub Repository**: Your code should be pushed to GitHub
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Firebase Project**: Ensure your Firebase project is properly configured

## Step-by-Step Deployment

### 1. Push to GitHub

Make sure all your changes are committed and pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository: `Anu682-max/studio`

### 3. Configure Environment Variables

In your Vercel project dashboard, go to Settings → Environment Variables and add:

```
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyD_4xuoLFA2FlqPioQ_DTi7V-lvrm5tTew
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = studio-3378510862-a72aa.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = studio-3378510862-a72aa
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = studio-3378510862-a72aa.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 185419459053
NEXT_PUBLIC_FIREBASE_APP_ID = 1:185419459053:web:1522e04ffa46c63fa81fe4
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = (leave empty or add if you have one)
```

### 4. Configure Build Settings

Vercel should auto-detect Next.js. If needed, set:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 5. Deploy

Click "Deploy" and wait for the build to complete.

## Firebase Security Rules Update

After deployment, update your Firebase security rules to allow your Vercel domain:

1. Go to Firebase Console → Storage → Rules
2. Update the rules to include your Vercel domain:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
      allow read: if resource.contentType.matches('image/.*');
    }
  }
}
```

3. Go to Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their data
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Allow public read access to published content
    match /news/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /projects/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /services/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Post-Deployment Setup

### 1. Test the Deployment

Visit your Vercel URL and test:
- Homepage loads correctly
- Admin login works
- Image uploads work
- All sections display properly

### 2. Custom Domain (Optional)

1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain (e.g., `abs-construction.com`)
3. Configure DNS records as instructed

### 3. Performance Optimization

Your deployment includes:
- ✅ Image optimization
- ✅ SWC minification
- ✅ Security headers
- ✅ Caching strategies
- ✅ SEO optimization

## Troubleshooting

### Common Issues:

**1. Environment Variables Not Loading**
- Ensure all Firebase environment variables are set in Vercel
- Variables must start with `NEXT_PUBLIC_` for client-side access

**2. Firebase Connection Issues**
- Check Firebase project settings
- Verify API keys are correct
- Ensure Firebase rules allow your domain

**3. Build Failures**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- TypeScript errors are ignored for deployment

**4. Image Upload Issues**
- Verify Firebase Storage rules
- Check CORS configuration
- Ensure SmartImage component is working

### Admin Account Access

After deployment, you can create admin accounts using the Node.js script:

```bash
node create-admin.js admin@yoursite.com yourpassword
```

Or use the existing accounts:
- Email: `admin@gmail.com`
- Password: `123456`

## Automatic Deployments

Vercel automatically deploys when you push to the main branch. To deploy:

```bash
git add .
git commit -m "Update content"
git push origin main
```

## Monitoring

Monitor your deployment:
- **Analytics**: Vercel provides built-in analytics
- **Logs**: Check function logs in Vercel dashboard
- **Performance**: Use Vercel's performance insights

## Support

For issues:
1. Check Vercel build logs
2. Review Firebase console for errors
3. Test locally first with `npm run build && npm start`

Your project is now optimized for Vercel deployment with:
- Environment variable management
- Performance optimizations
- Security headers
- Image optimization
- Firebase integration
- Admin interface protection