// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getAnalytics,
  logEvent,
  setUserId,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJPrb5CBzmvoikaoHHki_aNOdbesqnnz4",
  authDomain: "bet-1597c.firebaseapp.com",
  projectId: "bet-1597c",
  storageBucket: "bet-1597c.appspot.com",
  messagingSenderId: "797926770676",
  appId: "1:797926770676:web:f94eb8edbc4b0d4d171ba1",
  measurementId: "G-XFQ2MNFWGB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const getCookies = () => {
  const cookies = document.cookie.split(";");
  return cookies;
};

const getIdUserCookie = () => {
  const cookies = getCookies();
  const idUser = cookies.find((item) => item.includes("id-user"));
  if (!idUser) return { idFormatado: null, idUser: null };
  const idFormatado = idUser.substring(9);
  return { idFormatado, idUser };
};

logEvent(
  analytics,
  "pagina_inicial => uid: " + getIdUserCookie().idFormatado || "unknown_user"
);
setUserId(analytics, getIdUserCookie().idFormatado || "unknown_user");
