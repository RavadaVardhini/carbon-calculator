importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAui-YsMCklxUVAJan7ogbcbon2WUAmexg",
  authDomain: "ecotrack-292ab.firebaseapp.com",
  projectId: "ecotrack-292ab",
  storageBucket: "ecotrack-292ab.firebasestorage.app",
  messagingSenderId: "540291250147",
  appId: "1:540291250147:web:c2c9693030b6069a9c52d6",
  measurementId: "G-CWLJX95KG3"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
const db = firebase.firestore();

// Show the notification with Yes / Partially / No action buttons
messaging.onBackgroundMessage((payload) => {
  const week = payload.data && payload.data.week ? payload.data.week : "?";
  self.registration.showNotification("EcoTrack Week " + week + " Check-in", {
    body: "Did you follow your pledge this week?",
    icon: "https://cdn-icons-png.flaticon.com/512/892/892917.png",
    data: { week: week },
    actions: [
      { action: "yes", title: "Yes" },
      { action: "partial", title: "Partially" },
      { action: "no", title: "No" }
    ]
  });
});

// Handle the tap on Yes / Partially / No
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const validActions = ["yes", "partial", "no"];
  if (!validActions.includes(event.action)) return; // ignore taps on the notification body itself

  const week = event.notification.data && event.notification.data.week ? event.notification.data.week : "unknown";

  event.waitUntil(
    self.registration.pushManager.getSubscription().then(() => {
      // Identify this device using its FCM token, stored earlier at subscribe time
      return db.collection('checkins').add({
        response: event.action,       // "yes" | "partial" | "no"
        week: week,
        respondedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    })
  );
});
