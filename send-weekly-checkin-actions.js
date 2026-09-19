// This version is built to run automatically via GitHub Actions.
// It reads the Firebase key from an environment variable (a GitHub Secret),
// and figures out which day it is on its own — no manual editing needed.

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getMessaging } = require('firebase-admin/messaging');

// The service account key is passed in as a GitHub Secret (as a JSON string),
// not read from a local file, since GitHub Actions has no access to your computer's files.
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const messaging = getMessaging();

// ---- change this once: the date your Day 1 email/notification went out ----
const CAMPAIGN_START_DATE = "2026-08-23"; // YYYY-MM-DD, a Monday works best

function getCurrentDayNumber() {
  const start = new Date(CAMPAIGN_START_DATE);
  const now = new Date();
  const msPerDay = 24 * 60 * 60 * 1000;
  const daysPassed = Math.floor((now - start) / msPerDay);
  return Math.min(Math.max(daysPassed + 1, 1), 4); // clamps between Day 1 and Day 4
}

async function sendDailyCheckIn() {
  const DAY_NUMBER = String(getCurrentDayNumber());

  const subscribersSnap = await db.collection('subscribers').get();

  if (subscribersSnap.empty) {
    console.log("No subscribers found.");
    return;
  }

  const tokens = subscribersSnap.docs.map(doc => doc.id);
  console.log(`Sending Day ${DAY_NUMBER} check-in to ${tokens.length} subscriber(s)...`);

  const message = {
    data: { day: DAY_NUMBER },
    tokens: tokens
  };

  const response = await messaging.sendEachForMulticast(message);
  console.log(`Sent: ${response.successCount}, Failed: ${response.failureCount}`);

  response.responses.forEach((res, i) => {
    if (!res.success) {
      console.log("Failed for token:", tokens[i], "-", res.error.message);
    }
  });
}

sendDailyCheckIn();
