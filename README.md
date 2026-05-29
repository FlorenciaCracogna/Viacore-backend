<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=B8860B&height=180&section=header&fontColor=ffffff&animation=fadeIn" />

<img src="./logo.png" alt="VIACORE Logo" width="120" />

# VIACORE
### Plataforma de Capacitaciones Corporativas

![Status](https://img.shields.io/badge/Estado-Producción-gold?style=for-the-badge)
![Henry](https://img.shields.io/badge/Henry-Proyecto%20Final-black?style=for-the-badge)
![Team](https://img.shields.io/badge/Equipo-8%20personas-B8860B?style=for-the-badge)

<a href="https://estudio-via3-frontend.vercel.app/">
  <img src="https://img.shields.io/badge/🌐 Ver Demo-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
</a>
<a href="https://estudio-via3-backend-production.up.railway.app/docs">
  <img src="https://img.shields.io/badge/📄 API Docs (Swagger)-85EA2D?style=for-the-badge&logo=swagger&logoColor=black"/>
</a>
<a href="https://github.com/via3-sketch/estudio-via3-frontend">
  <img src="https://img.shields.io/badge/Repo Frontend-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>
<a href="https://github.com/via3-sketch/estudio-via3-backend">
  <img src="https://img.shields.io/badge/Repo Backend-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>

</div>

---

## 📋 Descripción

**VIACORE** es una plataforma fullstack para la comercialización de servicios de capacitación empresarial. Permite a empresas solicitar, coordinar y pagar capacitaciones a medida, gestionando todo el flujo desde la solicitud inicial hasta la confirmación del servicio.

---

## ✨ Funcionalidades principales

- 👤 **Registro y autenticación** de usuarios con email/contraseña y **Google OAuth**
- 📅 **Solicitud y agendamiento** de capacitaciones con reunión inicial de diagnóstico
- 💬 **Chat en tiempo real** entre usuario y administrador via WebSockets
- 💳 **Pagos online** integrados con **Mercado Pago**
- 🤖 **Chatbot con IA** para asistencia al usuario
- 🔔 **Notificaciones automáticas** por email mediante **CRON jobs**
- 👨‍💼 **Panel de administración** con gestión de usuarios, capacitaciones y pagos
- 🔐 **Roles y permisos** (Admin / Usuario)

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

### Backend
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

### Base de datos & Deploy
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

</div>

---

## 🚀 Instalación y uso local

### Requisitos previos
- Node.js v18+
- npm o yarn
- PostgreSQL o cuenta en Supabase

### Backend
```bash
# Clonar el repositorio
git clone https://github.com/FlorenciaCracogna/Viacore-backend
cd Viacore-backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .development.env.example .development.env
# Completar las variables en el archivo .development.env

# Correr en desarrollo
npm run start:dev
```

### Frontend
```bash
# Clonar el repositorio
git clone https://github.com/FlorenciaCracogna/Viacore-frontend
cd Viacore-frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.local.example .env.local
# Completar las variables en el archivo .env.local

# Correr en desarrollo
npm run dev
```

---

## ⚙️ Variables de entorno

### Backend `.development.env`
```env
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GEMINI_API_KEY=
BREVO_API_KEY=
MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASSWORD=
FIREBASE_CONFIG_PATH=
REDIS_URL=
GOOGLE_MEET_CLIENT_ID=
GOOGLE_MEET_CLIENT_SECRET=
GOOGLE_MEET_REFRESH_TOKEN=
GOOGLE_MEET_REDIRECT_URI=
GROQ_API_KEY=
MP_ACCESS_TOKEN=
FRONTEND_URL=
BACKEND_URL=
MP_WEBHOOK_SECRET=
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=
```

---

## 🔄 Metodología de trabajo

El proyecto fue desarrollado en equipo bajo metodología **SCRUM**:
- 📌 Sprints semanales con presentación a Product Owner
- 🗂️ Gestión de tareas con **Trello**
- 🔀 Flujo de trabajo con ramas feature/fix y Pull Requests a `develop`

---

## 👥 Equipo

<div align="center">

| Colaborador | GitHub |
|-------------|--------|
| Florencia Cracogna | [@FlorenciaCracogna](https://github.com/FlorenciaCracogna) |
| TF Colmenares | [@TFColmenares](https://github.com/TFColmenares) |
| Jennifer Huertas | [@JenniferHuertas](https://github.com/JenniferHuertas) |
| Daniel Medina | [@danielmedinamauricio92-sketch](https://github.com/danielmedinamauricio92-sketch) |
| Axel Aranda | [@axelaranda](https://github.com/axelaranda) |
| Luis A. | [@LuisA1303](https://github.com/LuisA1303) |
| Agustín Heinzenreder | [@AgustinHeizenreder](https://github.com/AgustinHeizenreder) |
| B. David | [@bdavidbm](https://github.com/bdavidbm) |

</div>

---

<div align="center">

**Desarrollado con ❤️ en Henry Bootcamp — 2026**

<img src="https://capsule-render.vercel.app/api?type=waving&color=B8860B&height=100&section=footer" />

</div>

