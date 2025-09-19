# ABS Construction Studio

A modern construction company website built with Next.js 15, Firebase, and Tailwind CSS. Features a complete admin dashboard for content management.

> **📖 Монгол хэл** | For Mongolian language documentation, see [README_MN.md](./README_MN.md)

## 🚀 Live Demo

- **Website**: [Deploy on Vercel](https://vercel.com)
- **Admin Panel**: `/admin/login`

## 🏗️ Features

- **Modern Design**: Responsive design with Tailwind CSS
- **Admin Dashboard**: Complete CMS for managing content
- **Firebase Integration**: Authentication, Firestore database, Storage
- **Image Management**: Smart image handling with fallback systems
- **Multilingual**: Mongolian language interface
- **SEO Optimized**: Server-side generation and meta tags
- **Performance**: Optimized for Core Web Vitals

## 📋 Sections

- **Hero**: Company introduction with call-to-action
- **About**: Company information and values
- **Services**: Construction services offered
- **Projects**: Portfolio of completed projects
- **News**: Company news and updates
- **Contact**: Contact information and form

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with Turbopack
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage with Firestore fallback
- **UI Components**: Radix UI
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Deployment**: Optimized for Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Firebase project
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anu682-max/studio.git
   cd studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Firebase configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Visit `http://localhost:9002`

## 🔧 Configuration

### Environment Variables

Create `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Firebase Setup

1. Create a Firebase project
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Enable Storage
5. Configure security rules (see DEPLOYMENT.md)

### Admin Setup

Create admin accounts:

```bash
node create-admin.js admin@yoursite.com yourpassword
```

Or use existing:
- Email: `admin@gmail.com`
- Password: `123456`

## 📦 Deployment

### Vercel Deployment (Recommended)

See detailed instructions in [DEPLOYMENT.md](./DEPLOYMENT.md)

Quick deploy:
1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
npm run build
npm start
```

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Review Firebase documentation for backend issues

---

Built with ❤️ for ABS Construction
