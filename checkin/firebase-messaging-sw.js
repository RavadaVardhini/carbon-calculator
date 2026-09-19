importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyD6Cpb6BgLIzvHva1AV9JMiobjmEpjqCr4",
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
  const day = payload.data && payload.data.day ? payload.data.day : "?";

  self.registration.showNotification("EcoTrack Day " + day + " Check-in", {
    body: "Did you follow your pledge today?",
    icon: "https://cdn-icons-png.flaticon.com/512/892/892917.png",
    data: { day: day },
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

  if (!validActions.includes(event.action)) return;

  const day =
    event.notification.data && event.notification.data.day
      ? event.notification.data.day
      : "unknown";

  event.waitUntil(
    self.registration.pushManager.getSubscription().then(() => {

      // Identify this device using its FCM token,
      // stored earlier at subscribe time
      return db.collection('checkins').add({
        response: event.action,
        day: day,
        respondedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

    })
  );
});
