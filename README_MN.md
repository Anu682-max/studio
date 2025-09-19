# АБС Барилгын Студио

Next.js 15, Firebase болон Tailwind CSS ашиглан хийсэн орчин үеийн барилгын компанийн вэбсайт. Контент удирдлагын иж бүрэн админ самбартай.

> **🏗️ Барилгын Төсөл** | ABS Construction Studio - Таны барилгын мөрөөдлийг бодит болгож байна

## 🚀 Амьд Демо

- **Вэбсайт**: [Vercel дээр байрлуулах](https://vercel.com)
- **Админ Самбар**: `/admin/login`
- **Нэвтрэх мэдээлэл**: 
  - И-мэйл: `admin@gmail.com`
  - Нууц үг: `123456`

## 🏗️ Онцлогууд

### 🎨 Дизайн
- **Орчин үеийн загвар**: Tailwind CSS ашигласан хариуцлагатай дизайн
- **Монгол хэлийн дэмжлэг**: Бүрэн монгол хэлтэй интерфейс
- **Мобайл найрсаг**: Бүх төхөөрөмж дээр тохирно

### 🔐 Админ Удирдлага
- **Иж бүрэн CMS**: Контент удирдлагын систем
- **Зураг оруулах**: Firebase Storage болон Firestore дэмжлэгтэй
- **Аюулгүй нэвтрэлт**: Firebase Authentication

### 📊 Мэдээлэл Удирдлага
- **Firestore өгөгдлийн сан**: Хурдан, найдвартай
- **Зураг хадгалалт**: Олон төрлийн зураг дэмжлэг
- **Автомат нөөцлөлт**: Зураг алдагдахаас хамгаалах

### ⚡ Гүйцэтгэл
- **Турбопак**: Хурдан хөгжүүлэлтийн сервер
- **SEO оновчтой**: Хайлтын системд сайн харагдах
- **Core Web Vitals**: Google-ийн стандартыг хангах

## 📋 Вэбсайтын хэсгүүд

### 🏠 Үндсэн хуудсууд
- **Нүүр хуудас**: Компанийн танилцуулга
- **Бидний тухай**: Компанийн түүх, үнэт зүйлс
- **Үйлчилгээ**: Барилгын үйлчилгээний жагсаалт
- **Төслүүд**: Хийж гүйцэтгэсэн барилгын ажлууд
- **Мэдээ**: Компанийн мэдээ, шинэчлэлт
- **Холбоо барих**: Холбоо барих хуудас

### 🛠️ Техникийн стэк

#### Frontend
- **Next.js 15**: React суурилсан фрэймворк
- **Tailwind CSS**: CSS фрэймворк
- **Radix UI**: UI компонентууд
- **Lucide React**: Дүрс тэмдгүүд
- **TypeScript**: Аюулгүй программчлал

#### Backend
- **Firebase Auth**: Нэвтрэлтийн систем
- **Firebase Firestore**: NoSQL өгөгдлийн сан
- **Firebase Storage**: Зураг хадгалах сан

#### Хөгжүүлэлт
- **Turbopack**: Хурдан bundler
- **ESLint**: Кодын чанар хянах
- **Prettier**: Код форматлах

## 🚀 Суулгах заавар

### Шаардлага
- Node.js 18 эсвэл дээш хувилбар
- Firebase төсөл
- Git

### 1️⃣ Кодыг татах
```bash
git clone https://github.com/Anu682-max/studio.git
cd studio
```

### 2️⃣ Сангуудыг суулгах
```bash
npm install
```

### 3️⃣ Орчны хувьсагчдыг тохируулах
```bash
# .env.local файл үүсгэх
cp .env.example .env.local
```

.env.local файлд доорх мэдээллийг оруулна:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=таны_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=таны_төсөл.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=таны_төслийн_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=таны_төсөл.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=таны_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=таны_app_id
```

### 4️⃣ Хөгжүүлэлтийн серверийг эхлүүлэх
```bash
npm run dev
```

### 5️⃣ Хөтчөөр нээх
`http://localhost:9002` хаягруу орно

## 🔧 Firebase тохиргоо

### Firebase Console дээр хийх ажлууд:
1. **Шинэ Firebase төсөл үүсгэх**
2. **Authentication идэвхжүүлэх**
   - Email/Password эсэх аргыг идэвхжүүлэх
3. **Firestore Database үүсгэх**
   - Test горимд эхлээд production горимд шилжүүлэх
4. **Storage идэвхжүүлэх**
   - Зураг хадгалахад ашиглах
5. **Web app бүртгэх**
   - Configuration-ийг .env.local файлд хуулах

### Админ хэрэглэгч үүсгэх:
```bash
node create-admin.js admin@yoursite.com your_password
```

Эсвэл одоо байгаа админ хэрэглэх:
- И-мэйл: `admin@gmail.com`
- Нууц үг: `123456`

## 📦 Vercel дээр байрлуулах

### Хурдан байрлуулах:
1. **GitHub руу push хийх**
2. **Vercel-тэй холбох**
3. **Орчны хувьсагчид нэмэх**
4. **Deploy хийх**

### Дэлгэрэнгүй заавар:

#### 1️⃣ Vercel Dashboard нээх
[https://vercel.com/dashboard](https://vercel.com/dashboard) руу орно

#### 2️⃣ Төсөл импорт хийх
- "Import Project" дээр дарах
- GitHub-аас `Anu682-max/studio` сонгох

#### 3️⃣ Орчны хувьсагчид нэмэх
Vercel дашboard дээр доорх хувьсагчдыг нэмэх:

```
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyD_4xuoLFA2FlqPioQ_DTi7V-lvrm5tTew
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = studio-3378510862-a72aa.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = studio-3378510862-a72aa
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = studio-3378510862-a72aa.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 185419459053
NEXT_PUBLIC_FIREBASE_APP_ID = 1:185419459053:web:1522e04ffa46c63fa81fe4
```

#### 4️⃣ Deploy хийх
"Deploy" товчийг дарж хүлээх

## 🎯 Админ самбар ашиглах заавар

### Нэвтрэх:
1. `yourwebsite.com/admin/login` руу орох
2. И-мэйл: `admin@gmail.com`
3. Нууц үг: `123456`

### Боломжууд:
- **Мэдээ удирдах**: Шинэ мэдээ нэмэх, засах, устгах
- **Төсөл удирдах**: Барилгын төслүүд нэмэх
- **Зураг оруулах**: Firebase Storage болон Firestore-д хадгалах
- **Контент засах**: Бүх контентыг шууд засах

### Зураг оруулах:
1. Админ самбарт нэвтэрэх
2. "Мэдээ" эсвэл "Төсөл" хэсэг рүү орох
3. "Шинээр нэмэх" товч дарах
4. Зураг сонгож оруулах
5. Хадгалах

## 🔍 Алдаа засах

### Түгээмэл асуудлууд:

#### 1. Firebase холболтын алдаа
```bash
# .env.local файлыг шалгах
cat .env.local

# Firebase config-ийг шинэчлэх
```

#### 2. Зураг оруулах алдаа
- Firebase Storage дээрх эрхийг шалгах
- CORS тохиргоог шалгах
- Интернет холболтоо шалгах

#### 3. Build алдаа
```bash
# Dependencies-ийг дахин суулгах
rm -rf node_modules package-lock.json
npm install

# TypeScript алдааг шалгах
npm run typecheck
```

### Туслалцаа авах:
1. GitHub дээр issue үүсгэх
2. Firebase documentation унших
3. Vercel documentation шалгах

## 🌟 Онцлог функцүүд

### SmartImage компонент:
- Firebase Storage болон base64 зургийг дэмждэг
- Автомат error handling
- Next.js Image optimization
- Loading states

### Олон төрлийн upload:
- Firebase Storage (үндсэн)
- Firestore base64 (нөөц арга)
- Автомат fallback систем

### Аюулгүйн тохиргоо:
- CORS headers тохируулсан
- API endpoints хамгаалсан
- Админ эрхийн шалгалт

## 📞 Дэмжлэг

Асуулт, саналаараа:
- **GitHub**: [Issues хэсэг](https://github.com/Anu682-max/studio/issues)
- **И-мэйл**: Та админаар нэвтэрч холбоо барих хуудасаар мессеж илгээж болно

## 🏆 Төслийн байдал

✅ **Бэлэн**: Vercel дээр байрлуулахад бэлэн
✅ **Тестлэгдсэн**: Бүх функц ажиллаж байна
✅ **Документжуулсан**: Иж бүрэн заавар бэлэн
✅ **Аюулгүй**: Firebase security rules тохируулсан

---

🏗️ **АБС Барилгын Студио** - Монгол хэлтэй, орчин үеийн барилгын вэбсайт ❤️

**Одоогийн хувилбар**: 0.1.0  
**Сүүлд шинэчлэгдсэн**: 2025 оны 9-р сарын 19  
**Хөгжүүлэгч**: Ану682-max