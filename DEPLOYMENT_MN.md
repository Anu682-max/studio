# Vercel Байршуулалтын Заавар

Энэхүү заавар нь таны АБС Барилгын Студи төслийг GitHub-аас Vercel-д байршуулахад тусална.

## Шаардлагатай Зүйлс

1. **GitHub Repository**: Кодыг GitHub-д байршуулсан байх
2. **Vercel Бүртгэл**: [vercel.com](https://vercel.com) дээр бүртгүүлэх
3. **Firebase Төсөл**: Firebase төсөл зөв тохируулагдсан байх

## Алхам дараах Байршуулалт

### 1. GitHub-д Push Хийх

Бүх өөрчлөлтөө commit болон push хийсэн эсэхийг шалгана уу:

```bash
git add .
git commit -m "Vercel байршуулалтад бэлтгэх"
git push origin main
```

### 2. Vercel-тэй Холбох

1. [vercel.com](https://vercel.com) рүү орж нэвтэрнэ үү
2. "New Project" товчийг дарна уу
3. GitHub repository import хийнэ үү
4. Repository сонгоно уу: `Anu682-max/studio`

### 3. Орчны Хувьсагчдыг Тохируулах

Vercel төслийн dashboard дээр Settings → Environment Variables руу орж дараах зүйлсийг нэмнэ үү:

```
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyD_4xuoLFA2FlqPioQ_DTi7V-lvrm5tTew
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = studio-3378510862-a72aa.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = studio-3378510862-a72aa
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = studio-3378510862-a72aa.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 185419459053
NEXT_PUBLIC_FIREBASE_APP_ID = 1:185419459053:web:1522e04ffa46c63fa81fe4
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = (хоосон эсвэл байгаа бол нэмнэ үү)
```

### 4. Build Тохиргоог Хийх

Vercel автоматаар Next.js-г таних ёстой. Хэрэв шаардлагатай бол:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 5. Deploy Хийх

"Deploy" товчийг дарж build дууссанаа хүлээнэ үү.

## Firebase Аюулгүй Дүрмийн Шинэчлэл

Байршуулалтын дараа Firebase аюулгүй дүрмийг шинэчлэн Vercel domain-ыг зөвшөөрөх:

1. Firebase Console → Storage → Rules руу орно уу
2. Дүрмийг шинэчлэн Vercel domain оруулна уу:

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

3. Firebase Console → Firestore → Rules руу орно уу:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Нэвтэрсэн хэрэглэгчдэд өөрсдийн өгөгдөл унших/бичих зөвшөөрөх
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Нийтийн контентод унших зөвшөөрөх
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

## Байршуулалтын Дараах Тохиргоо

### 1. Байршуулалтыг Тестлэх

Vercel URL-д орж дараах зүйлсийг тестлэнэ үү:
- Нүүр хуудас зөв ачаалагддаг эсэх
- Админ нэвтрэх ажилладаг эсэх
- Зураг оруулах ажилладаг эсэх
- Бүх хэсгүүд зөв харуулагдаж байгаа эсэх

### 2. Хувийн Domain (Сонголттой)

1. Vercel Dashboard → Settings → Domains руу орно уу
2. Хувийн domain нэмнэ үү (жишээ: `abs-construction.com`)
3. Заасан ёсоор DNS records тохируулна уу

### 3. Гүйцэтгэлийн Оновчлол

Таны байршуулалтад багтсан:
- ✅ Зургийн оновчлол
- ✅ SWC minification
- ✅ Аюулгүй байдлын header
- ✅ Кэшлэх стратеги
- ✅ SEO оновчлол

## Алдаа Засах

### Түгээмэл Асуудлууд:

**1. Орчны Хувьсагч Ачаалагдахгүй Байна**
- Vercel дээр бүх Firebase орчны хувьсагч тохируулагдсан эсэхийг шалгана уу
- Client талын хандалтын хувьд хувьсагч `NEXT_PUBLIC_`-ээр эхэлэх ёстой

**2. Firebase Холболтын Асуудал**
- Firebase төслийн тохиргоо шалгах
- API key зөв эсэхийг шалгах
- Firebase дүрэм таны domain-ыг зөвшөөрч байгаа эсэхийг шалгах

**3. Build Алдаа**
- Vercel dashboard дээр build log шалгах
- Бүх dependencies package.json-д байгаа эсэхийг шалгах
- TypeScript алдаанууд байршуулалтын хувьд ignore хийгдсэн

**4. Зураг Оруулах Асуудал**
- Firebase Storage дүрэм шалгах
- CORS тохиргоо шалгах
- SmartImage компонент ажиллаж байгаа эсэхийг шалгах

### Админ Бүртгэлийн Хандалт

Байршуулалтын дараа Node.js script ашиглан админ бүртгэл үүсгэж болно:

```bash
node create-admin.js admin@таныйсайт.com таны_нууцүг
```

Эсвэл одоо байгаа бүртгэлүүдийг ашиглах:
- И-мэйл: `admin@gmail.com`
- Нууц үг: `123456`

## Автомат Байршуулалт

Main branch-д push хийхэд Vercel автоматаар deploy хийнэ. Deploy хийх:

```bash
git add .
git commit -m "Контент шинэчлэх"
git push origin main
```

## Хяналт

Байршуулалтыг хянах:
- **Analytics**: Vercel-ын built-in analytics
- **Logs**: Vercel dashboard дээрх function logs
- **Performance**: Vercel-ын гүйцэтгэлийн мэдээлэл

## Дэмжлэг

Асуудлын хувьд:
1. Vercel build logs шалгах
2. Алдааны хувьд Firebase console шалгах
3. Эхлээд локал дээр `npm run build && npm start`-аар тестлэх

## Нэмэлт Тохиргоо

### Custom Domain Тохиргоо

1. **Domain Provider дээр**:
   ```
   A Record: @ -> 76.76.19.61
   CNAME Record: www -> cname.vercel-dns.com
   ```

2. **Vercel Dashboard дээр**:
   - Domains хэсэгт domain нэмэх
   - SSL сертификат автоматаар тохируулагдана

### Performance Optimization

1. **Image Optimization**:
   - WebP/AVIF format автомат хөрвүүлэлт
   - Lazy loading
   - Responsive images

2. **Caching Strategy**:
   - Static assets: 1 жил
   - API responses: 5 минут
   - HTML pages: Revalidate

3. **Bundle Analysis**:
   ```bash
   npm run build
   npm run analyze
   ```

### Security Headers

Автоматаар тохируулагдсан:
- `X-Frame-Options`: Clickjacking хамгаалалт
- `X-Content-Type-Options`: MIME sniffing хамгаалалт
- `Referrer-Policy`: Referrer мэдээлэл хяналт
- `Permissions-Policy`: Browser API хандалт

### Backup Strategy

1. **Firestore Backup**:
   ```bash
   gcloud firestore export gs://backup-bucket
   ```

2. **Code Backup**:
   - GitHub repository
   - Local backup
   - Version control

## Орчин Тус Бүрийн Тохиргоо

### Development Environment
```bash
npm run dev
```

### Staging Environment
- Preview deployments GitHub PR дээр
- Environment variables: Staging values

### Production Environment
- Main branch deployment
- Environment variables: Production values
- Custom domain

## Monitoring болон Logging

### Error Tracking
```javascript
// pages/api/error-handler.js
export default function handler(req, res) {
  console.error('Error:', req.body);
  res.status(500).json({ error: 'Internal Server Error' });
}
```

### Performance Monitoring
- Core Web Vitals tracking
- Page load metrics
- User interaction tracking

### Analytics Integration
```javascript
// Google Analytics setup
gtag('config', 'GA_MEASUREMENT_ID', {
  page_title: document.title,
  page_location: window.location.href
});
```

Таны төсөл одоо:
- Орчны хувьсагчийн удирдлага
- Гүйцэтгэлийн оновчлол
- Аюулгүй байдлын header
- Зургийн оновчлол
- Firebase холболт
- Админ интерфэйсийн хамгаалалт

бүхий Vercel байршуулалтад оновчлогдсон!