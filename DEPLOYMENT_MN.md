# Vercel дээр Байрлуулах Заавар

АБС Барилгын Студио төслийг Vercel дээр байрлуулах иж бүрэн заавар.

## 🚀 Яагаад Vercel сонгосон бэ?

- **Хурдан**: Дэлхийн хамгийн хурдан CDN
- **Хялбар**: Git-тэй шууд холболт
- **Найдвартай**: 99.99% uptime
- **Үнэгүй**: Жижиг төслүүдэд үнэгүй
- **Next.js оновчлол**: Next.js-д тусгайлан зориулсан

## 📋 Шаардлага

### Та эдгээрийг бэлэн болгосон байх ёстой:
- ✅ GitHub дээр байрлуулсан код
- ✅ Firebase төсөл (бэлэн тохиргоотой)
- ✅ Vercel акаунт
- ✅ Орчны хувьсагчдын жагсаалт

## 🔧 1-р алхам: Firebase бэлэн байдал шалгах

### Firebase Console дээр шалгах зүйлс:
1. **Authentication идэвхтэй эсэх**
   - Email/Password provider идэвхжсэн
   - Админ хэрэглэгч үүссэн

2. **Firestore Database**
   - Database үүсгэсэн
   - Security rules тохируулсан

3. **Firebase Storage**
   - Storage идэвхжүүлсэн
   - CORS тохиргоо хийсэн

### Firebase тохиргооны мэдээлэл цуглуулах:
Firebase Console > Project Settings > Your apps-аас дараах мэдээллийг авах:

```
API Key: AIzaSyD_4xuoLFA2FlqPioQ_DTi7V-lvrm5tTew
Auth Domain: studio-3378510862-a72aa.firebaseapp.com
Project ID: studio-3378510862-a72aa
Storage Bucket: studio-3378510862-a72aa.appspot.com
Messaging Sender ID: 185419459053
App ID: 1:185419459053:web:1522e04ffa46c63fa81fe4
```

## 🌐 2-р алхам: Vercel дээр бүртгүүлэх

### Vercel акаунт үүсгэх:
1. [vercel.com](https://vercel.com) руу орох
2. "Sign up" дээр дарах
3. GitHub акаунтаараа нэвтрэх (зөвлөмж)
4. Team нэр сонгох

## 📂 3-р алхам: Төслийг импорт хийх

### Алхам бүрчлэн:
1. **Vercel Dashboard нээх**
   - [vercel.com/dashboard](https://vercel.com/dashboard)

2. **"Add New..." товч дарах**
   - "Project" сонгох

3. **"Import Git Repository" дарах**
   - Эхний удаа бол GitHub-тай холбох
   - `Anu682-max/studio` repository-г олох
   - "Import" дарах

4. **Төслийн тохиргоо**
   - **Project Name**: `abs-construction-studio` (автоматаар тохирно)
   - **Framework Preset**: `Next.js` (автоматаар илрүүлнэ)
   - **Root Directory**: `./` (үндсэн)

## 🔑 4-р алхам: Орчны хувьсагчид тохируулах

### Vercel дээр орчны хувьсагчид нэмэх:
"Environment Variables" хэсэгт дараах хувьсагчдыг нэмэх:

#### Нэмэх хувьсагчид:
```
Name: NEXT_PUBLIC_FIREBASE_API_KEY
Value: AIzaSyD_4xuoLFA2FlqPioQ_DTi7V-lvrm5tTew

Name: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
Value: studio-3378510862-a72aa.firebaseapp.com

Name: NEXT_PUBLIC_FIREBASE_PROJECT_ID
Value: studio-3378510862-a72aa

Name: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
Value: studio-3378510862-a72aa.appspot.com

Name: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
Value: 185419459053

Name: NEXT_PUBLIC_FIREBASE_APP_ID
Value: 1:185419459053:web:1522e04ffa46c63fa81fe4
```

#### Хувьсагч нэмэх арга:
1. "Add" товч дарах
2. Key болон Value оруулах
3. "Add" дахин дарах
4. Бүх хувьсагчийн хувьд давтах

## 🚀 5-р алхам: Deploy хийх

### Deploy процесс:
1. **"Deploy" товч дарах**
   - Vercel автоматаар build эхлүүлнэ
   - 2-5 минут хүлээх

2. **Build явцыг ажиглах**
   - Logs-г харж болно
   - Алдаа гарвал дэлгэрэнгүй мэдээлэл харуулна

3. **Амжилттай deploy болсон**
   - Vercel domain өгнө (жишээ: `https://abs-construction-studio-abc123.vercel.app`)
   - "Visit" товч дарж шалгах

## ✅ 6-р алхам: Тест хийх

### Функцүүдийг шалгах:
1. **Үндсэн хуудас**: Ачааллагдаж байна уу?
2. **Админ нэвтрэлт**: `/admin/login` руу орж admin@gmail.com / 123456-аар нэвтэрнэ үү?
3. **Firestore холболт**: Мэдээ, төслүүд харагдаж байна уу?
4. **Зураг оруулах**: Админ дээр зураг оруулж чадна уу?

### Алдаа гарсан тохиолдолд:
- Vercel Dashboard > Functions tab-д logs шалгах
- Firebase Console дээр error logs шалгах
- Environment variables зөв оруулсан эсэхээ дахин шалгах

## 🔧 7-р алхам: Custom Domain тохируулах (сонголттой)

### Өөрийн domain холбох:
1. **Domain Settings руу орох**
   - Vercel Project Dashboard > Settings > Domains

2. **Domain нэмэх**
   - "Add" дарах
   - Доменийн нэрээ оруулах (жишээ: `abs-construction.mn`)

3. **DNS тохируулах**
   - Domain provider дээр CNAME record нэмэх
   - Vercel-ийн заавраг дагаж хийх

## 📊 8-р алхам: Гүйцэтгэл хянах

### Vercel Analytics:
- **Core Web Vitals**: Google ranking-д нөлөөлдөг
- **Page Views**: Хэрэглэгчдийн статистик
- **Performance**: Хуудас ачааллагдах хурд

### Vercel дээр идэвхжүүлэх:
Project Settings > Analytics > Enable

## 🔄 Automatic Deploy тохируулах

### Git Push дээр автомат deploy:
- **Main branch**: Автоматаар production дээр deploy хийнэ
- **Preview Deploy**: Бусад branch-уудад preview хийнэ
- **Pull Request**: PR болгонд preview URL үүсгэнэ

### Branch Protection:
1. GitHub repository > Settings > Branches
2. "Add rule" дарах
3. "Require status checks" сонгох
4. "Vercel" check сонгох

## 🚨 Түгээмэл асуудал шийдвэрлэх

### 1. Build алдаа
```
Error: Module not found
```
**Шийдвэр**: package.json dependencies шалгах

### 2. Environment Variable алдаа
```
Error: Firebase config invalid
```
**Шийдвэр**: 
- Vercel Environment Variables дахин шалгах
- NEXT_PUBLIC_ prefix байна уу шалгах

### 3. Firebase холболтын алдаа
```
Error: Firebase app not initialized
```
**Шийдвэр**:
- Firebase project active эсэхийг шалгах
- API keys зөв эсэхийг баталгаажуулах

### 4. Image upload алдаа
```
Error: Storage bucket access denied
```
**Шийдвэр**:
- Firebase Storage rules шалгах
- CORS configuration шалгах

## 📈 Production Optimization

### Performance сайжруулах:
1. **Image Optimization**: Next.js автомат хийнэ
2. **Code Splitting**: Автомат route-based splitting
3. **CDN**: Vercel Edge Network ашиглана
4. **Caching**: Static generation + ISR

### SEO сайжруулах:
1. **Meta Tags**: Бүх хуудаст тохиромжтой
2. **Sitemap**: Автомат generate хийгдэнэ
3. **Schema Markup**: Structured data нэмэх
4. **Analytics**: Google Analytics холбох

## 🔐 Аюулгүйн тохиргоо

### Vercel Security Headers:
Vercel автоматаар идэвхжүүлдэг:
- HTTPS Redirect
- Security Headers
- DDoS Protection

### Firebase Security:
- Firestore Rules засаж production mode руу шилжүүлэх
- Storage Rules тохируулах
- Authentication rules шалгах

## 💰 Зардлын тооцоо

### Vercel Pricing:
- **Hobby Plan**: Үнэгүй
  - 100GB bandwidth
  - Unlimited static sites
  - Community support

- **Pro Plan**: $20/сар
  - 1TB bandwidth
  - Commercial projects
  - Priority support

### Firebase Pricing:
- **Spark Plan**: Үнэгүй
  - 1GB storage
  - 50,000 reads/day
  - 20,000 writes/day

## 📞 Дэмжлэг авах

### Vercel:
- [Vercel Documentation](https://vercel.com/docs)
- [Community Discord](https://vercel.com/discord)
- [GitHub Discussions](https://github.com/vercel/vercel/discussions)

### Firebase:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase)
- [Firebase Community](https://firebase.google.com/community)

## ✅ Шалгах хуудас

Deploy амжилттай болсны дараа дараах зүйлсийг шалгаж баталгаажуулаарай:

- [ ] Үндсэн хуудас ачааллагдана
- [ ] `/admin/login` ажиллана
- [ ] admin@gmail.com / 123456-аар нэвтэрнэ
- [ ] Мэдээ хэсэг харагдана
- [ ] Төсөл хэсэг харагдана
- [ ] Зураг дүрслэгдэнэ
- [ ] Холбоо барих форм ажиллана
- [ ] Мобайл дээр зөв харагдана
- [ ] SEO meta tags байна
- [ ] Performance сайн байна

---

🎉 **Баяр хүргэе!** Таны АБС Барилгын Студио төсөл одоо дэлхий даяар хүртээмжтэй боллоо!

**Deploy хийсэн огноо**: 2025-09-19  
**Deploy хийсэн хүн**: Ану682-max  
**Platform**: Vercel + Firebase