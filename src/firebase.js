// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app-check.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyBFaU2XpTr0w7CdygvnKLvJMv0qdSRTu3k",
authDomain: "pozosppjdatabase.firebaseapp.com",
projectId: "pozosppjdatabase",
storageBucket: "pozosppjdatabase.appspot.com",
messagingSenderId: "895345772809",
appId: "1:895345772809:web:84bedc4b4c6c051db7ebd8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Getting Token to use the app in local environment (only in my laptop)
// self.FIREBASE_APPCHECK_DEBUG_TOKEN = true; // I get the token at Browser's Console, copy it and save it in AppCheck at Firebase Website, I comment this line so it's not visible anymore at Browser's Console.

// Create a ReCaptchaEnterpriseProvider instance using your reCAPTCHA Enterprise site key and pass it to initializeAppCheck().
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider("6Ld8vaQpAAAAAOmBQPg2yw3XsdN5OuQ7zJd-xaYr"),
    isTokenAutoRefreshEnabled: true // Set to true to allow auto-refresh.
});

function onClick(e) {
    e.preventDefault();
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute('6Ld8vaQpAAAAAOmBQPg2yw3XsdN5OuQ7zJd-xaYr', {action: 'LOGIN'});
      // IMPORTANT: The 'token' that results from execute is an encrypted response sent by
      // reCAPTCHA Enterprise to the end user's browser.
      // This token must be validated by creating an assessment.
      // See https://cloud.google.com/recaptcha-enterprise/docs/create-assessment
    });
}

export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

//   console.log(db);