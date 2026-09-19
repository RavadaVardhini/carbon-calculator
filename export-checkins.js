const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

// Read Firebase service account from GitHub Secret
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function exportCheckins() {
  console.log("Reading checkins collection...");

  const snapshot = await db.collection('checkins').get();

  if (snapshot.empty) {
    console.log("No check-in responses found.");
    return;
  }

  const rows = [];

  snapshot.forEach((doc) => {
    const data = doc.data();

    let respondedAt = "";

    if (data.respondedAt) {
      if (typeof data.respondedAt.toDate === "function") {
        respondedAt = data.respondedAt.toDate().toISOString();
      } else {
        respondedAt = String(data.respondedAt);
      }
    }

    rows.push({
      day: data.day || "",
      response: data.response || "",
      respondedAt: respondedAt
    });
  });

  // Sort by Day, then response time
  rows.sort((a, b) => {
    const dayA = Number(a.day) || 0;
    const dayB = Number(b.day) || 0;

    if (dayA !== dayB) {
      return dayA - dayB;
    }

    return new Date(a.respondedAt) - new Date(b.respondedAt);
  });

  // Create CSV
  const header = "Day,Response,Responded At\n";

  const csvRows = rows.map(row => {
    return [
      row.day,
      row.response,
      row.respondedAt
    ].map(value => `"${String(value).replace(/"/g, '""')}"`).join(",");
  });

  const csv = header + csvRows.join("\n");

  fs.writeFileSync("checkins.csv", csv);

  console.log(`Exported ${rows.length} check-in response(s).`);
  console.log("Created: checkins.csv");
}

exportCheckins()
  .then(() => {
    console.log("Export completed successfully.");
  })
  .catch((error) => {
    console.error("Export failed:", error);
    process.exit(1);
  });
