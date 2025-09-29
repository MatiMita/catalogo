# 🔥 FIREBASE CONFIGURATION GUIDE

## Cómo obtener las configuraciones de Firebase:

1. Ve a Firebase Console: https://console.firebase.google.com
2. Selecciona tu proyecto
3. Ve a "Project Settings" (ícono de engranaje)
4. En la pestaña "General", busca "Your apps"
5. Si no tienes una app web, haz clic en "Add app" y selecciona Web
6. Copia estos valores del objeto de configuración:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",              // ← NEXT_PUBLIC_FIREBASE_API_KEY
  authDomain: "tu-proyecto.firebaseapp.com",  // ← NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  projectId: "tu-proyecto",       // ← NEXT_PUBLIC_FIREBASE_PROJECT_ID
  storageBucket: "tu-proyecto.appspot.com",   // ← NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  messagingSenderId: "123456789", // ← NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  appId: "1:123456789:web:abc123def456"       // ← NEXT_PUBLIC_FIREBASE_APP_ID
};
```

## Variables que necesitas en Vercel:
- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID