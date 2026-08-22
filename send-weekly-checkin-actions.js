// This version is built to run automatically via GitHub Actions.
// It reads the Firebase key from an environment variable (a GitHub Secret),
// and figures out which week it is on its own — no manual editing needed.

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

// ---- change this once: the date your Week 1 email/notification went out ----
const CAMPAIGN_START_DATE = "2026-08-23"; // YYYY-MM-DD, a Monday works best

function getCurrentWeekNumber() {
  const start = new Date(CAMPAIGN_START_DATE);
  const now = new Date();
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const weeksPassed = Math.floor((now - start) / msPerWeek);
  return Math.min(Math.max(weeksPassed + 1, 1), 4); // clamps between Week 1 and Week 4
}

async function sendWeeklyCheckIn() {
  const WEEK_NUMBER = String(getCurrentWeekNumber());

  const subscribersSnap = await db.collection('subscribers').get();

  if (subscribersSnap.empty) {
    console.log("No subscribers found.");
    return;
  }

  const tokens = subscribersSnap.docs.map(doc => doc.id);
  console.log(`Sending Week ${WEEK_NUMBER} check-in to ${tokens.length} subscriber(s)...`);

  const message = {
    data: { week: WEEK_NUMBER },
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

sendWeeklyCheckIn();
