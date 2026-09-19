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


// --------------------------------------------------
// 14 DAILY GREEN ACTIONS
// --------------------------------------------------

const dailyActions = {

  1: {
    title: "Save Electricity 💡",
    body: "Switch off lights and fans when you leave a room or when they are not needed."
  },

  2: {
    title: "Unplug Devices 🔌",
    body: "Unplug chargers and electronic devices when they are not being used."
  },

  3: {
    title: "Choose Greener Transport 🚌",
    body: "When practical, walk, cycle, use public transport, or share a ride."
  },

  4: {
    title: "Save Water 💧",
    body: "Avoid unnecessary water use and turn off taps when water is not needed."
  },

  5: {
    title: "Reduce Single-Use Plastic 🥤",
    body: "Avoid at least one unnecessary single-use plastic item today."
  },

  6: {
    title: "Avoid Food Waste 🍽️",
    body: "Take only the amount of food you need and avoid throwing away edible food."
  },

  7: {
    title: "Separate Your Waste ♻️",
    body: "Put different types of waste in the appropriate bins whenever possible."
  },

  8: {
    title: "Reduce Unnecessary Screen Use 📱",
    body: "Avoid unnecessary device use and switch off devices when you are finished."
  },

  9: {
    title: "Reduce Paper Use 📝",
    body: "Avoid unnecessary printing and use digital documents when appropriate."
  },

  10: {
    title: "Use Reusable Items 🚰",
    body: "Carry or use a reusable water bottle, cup, or other reusable item."
  },

  11: {
    title: "Avoid Unnecessary Purchases 🛍️",
    body: "Before buying something, ask yourself whether you really need it."
  },

  12: {
    title: "Care for Green Spaces 🌱",
    body: "Protect plants and green spaces around your home, college, or community."
  },

  13: {
    title: "Think About E-Waste 💻",
    body: "Keep old electronic items out of regular waste and consider responsible disposal."
  },

  14: {
    title: "Spread the Action 🌍",
    body: "Encourage one friend or family member to take an eco-friendly action today."
  }

};


// --------------------------------------------------
// SHOW DAILY NOTIFICATION
// --------------------------------------------------

messaging.onBackgroundMessage((payload) => {

  const day =
    payload.data && payload.data.day
      ? Number(payload.data.day)
      : 1;

  const action =
    dailyActions[day] || dailyActions[1];


  self.registration.showNotification(
    "EcoTrack Day " + day + " — " + action.title,
    {

      body: action.body,

      icon:
        "https://cdn-icons-png.flaticon.com/512/892/892917.png",

      data: {
        day: day
      },

      actions: [

        {
          action: "yes",
          title: "Yes"
        },

        {
          action: "partial",
          title: "Partially"
        },

        {
          action: "no",
          title: "No"
        }

      ]

    }
  );

});


// --------------------------------------------------
// HANDLE YES / PARTIALLY / NO
// --------------------------------------------------

self.addEventListener('notificationclick', (event) => {

  event.notification.close();


  const validActions = [
    "yes",
    "partial",
    "no"
  ];


  if (!validActions.includes(event.action)) {

    // If user taps the notification itself,
    // open the Check-in website.

    event.waitUntil(
      clients.openWindow(
        "https://ravadavardhini.github.io/carbon-calculator/checkin/"
      )
    );

    return;

  }


  const day =
    event.notification.data &&
    event.notification.data.day
      ? event.notification.data.day
      : "unknown";


  event.waitUntil(

    self.registration.pushManager
      .getSubscription()
      .then(() => {

        return db
          .collection('checkins')
          .add({

            response: event.action,

            day: day,

            action:
              dailyActions[day]
                ? dailyActions[day].title
                : "Unknown action",

            respondedAt:
              firebase.firestore.FieldValue.serverTimestamp()

          });

      })

  );

});
