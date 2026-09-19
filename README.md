# 🌱 Carbon Footprint Awareness for College Students

A web-based environmental awareness project designed to help college students understand their personal carbon footprint and encourage small, practical eco-friendly actions.

## 📌 Project Overview

This project combines:

- An awareness survey
- A personal carbon footprint calculator
- A daily green-action check-in system
- Browser notifications
- Firebase Firestore data storage
- GitHub Actions for automated daily notifications
- CSV export for analysing check-in responses

The aim is to connect **awareness → personal understanding → daily action**.

---

## 🎯 Objectives

1. Create awareness about carbon footprints among college students.
2. Help students understand how everyday activities contribute to carbon emissions.
3. Provide a simple personal carbon footprint calculator.
4. Encourage students to follow small environmentally friendly actions.
5. Track daily participation through green-action check-ins.
6. Collect and analyse check-in data.

---

## 🌍 Main Features

### 1. Awareness Survey

Students first participate in a short awareness survey covering:

- Previous exposure to the term carbon footprint
- Perceived major sources of a college campus carbon footprint
- Willingness to make small daily changes

---

### 2. Carbon Footprint Calculator

The calculator estimates a student's carbon footprint based on everyday habits.

It covers areas such as:

- 🚗 Transport
- 🍽️ Food
- ⚡ Energy
- 📱 Digital activities
- ♻️ Waste

Students enter information about their daily habits and receive a calculated footprint result.

---

### 3. Green Check-in

The project includes an EcoTrack check-in system.

Students can enable browser notifications and receive daily reminders to report whether they followed the day's green action.

Each notification provides three response options:

- **Yes**
- **Partially**
- **No**

---

### 4. Firebase Integration

Firebase is used for:

- Firebase Cloud Messaging (FCM)
- Browser push notifications
- Firestore database storage

Check-in responses are stored in the Firestore `checkins` collection.

The stored information includes:

```text
day
response
respondedAt
```
### 5. Automated Daily Notifications

The project uses **GitHub Actions** and **Firebase Cloud Messaging (FCM)** to automatically send daily green-action check-in notifications to subscribed students.

The notification process works as follows:

```text
GitHub Actions
      ↓
Firebase Admin SDK
      ↓
Firestore Subscribers
      ↓
Firebase Cloud Messaging
      ↓
Student's Browser
```
The GitHub Actions workflow runs automatically each day and triggers the notification script.

The notification contains the current check-in day and provides three response options:

Yes – The student followed the green action.
Partially – The student followed the action to some extent.
No – The student did not follow the action.

The campaign is configured for a 7-day check-in period.

The daily notification workflow is stored at:
```text
.github/workflows/weekly-checkin.yml
```
The notification script is:
```text
send-weekly-checkin-actions.js
```
The daily notification system helps maintain regular student participation and records their responses in Firebase Firestore for later analysis.


### 6. Check-in Data Export

Check-in responses are stored in the Firebase Firestore `checkins` collection.

The project uses the following script to export the stored responses:

```text
export-checkins.js
```

The script reads the check-in data from Firestore and generates a CSV file:
```text
checkins.csv
```
The exported data contains:

| Field        | Description                   |
| ------------ | ----------------------------- |
| Day          | Check-in day                  |
| Response     | Yes / Partially / No          |
| Responded At | Date and time of the response |

The export process is automated using GitHub Actions.

The workflow file is:
```text
.github/workflows/export-checkins.yml
```
The export process works as follows:
```text
Firebase Firestore
       ↓
export-checkins.js
       ↓
checkins.csv
       ↓
GitHub Actions
       ↓
checkins-csv Artifact
       ↓
Download
       ↓
Open in Excel
```
The GitHub Actions workflow:

Checks out the project repository.
Sets up Node.js.
Installs the Firebase Admin SDK.
Connects to Firebase using the FIREBASE_SERVICE_ACCOUNT GitHub Secret.
Runs export-checkins.js.
Generates checkins.csv.
Uploads the CSV as a GitHub Actions artifact.

The generated CSV can be downloaded from the Artifacts section of the completed GitHub Actions workflow and used for further data analysis.

## 📈 Data Analysis

The collected check-in data can be analysed to understand student participation throughout the campaign.

The exported `checkins.csv` file can be used to calculate:

- Total number of check-in responses
- Day-wise participation
- Number of **Yes** responses
- Number of **Partially** responses
- Number of **No** responses
- Participation trends across the 7-day campaign

The data can be opened and analysed using **Microsoft Excel** or other data-analysis tools.

The analysis helps identify participation patterns and provides measurable data for evaluating student engagement with the green-action activity.

## 🚀 Deployment

The project is deployed using **GitHub Pages**.

The main carbon footprint calculator is available through the GitHub Pages website.

The EcoTrack green check-in system is available through the:

```text
/checkin/
```
path.
GitHub Pages provides the web hosting required to make the project accessible through a web browser.

## 🔐 Configuration and Security

The project uses Firebase services for notifications and data storage.

Firebase credentials required by GitHub Actions are stored securely using **GitHub Secrets**.

The Firebase service account is accessed through the following GitHub Secret:

```text
FIREBASE_SERVICE_ACCOUNT
```
The service-account JSON file should not be uploaded or committed directly to the GitHub repository.

GitHub Actions uses the stored secret to securely authenticate with Firebase when sending notifications and exporting check-in data.

## 🌱 Project Impact

The project focuses on creating awareness about carbon footprints among college students and encouraging practical environmental actions in their daily lives.

The system connects awareness with action through:

1. Learning about carbon footprints.
2. Understanding personal carbon footprint through the calculator.
3. Identifying simple eco-friendly actions.
4. Receiving daily green-action reminders.
5. Recording daily participation through check-ins.
6. Analysing the collected participation data.

This approach helps connect environmental awareness with measurable student participation and everyday eco-friendly actions.

## 📸 Screenshots

### Carbon Footprint Calculator

<img width="1917" height="1031" alt="calculator" src="https://github.com/user-attachments/assets/ca0abd9b-85d9-406d-b0b3-f7bf4e3e051b" />
<img width="1917" height="1016" alt="calculator2" src="https://github.com/user-attachments/assets/ab8cea87-5dac-4d46-ad78-795d6bbaee5d" />

### Daily Green Action Notification

<img width="1917" height="1027" alt="Screenshot 2026-09-19 191947" src="https://github.com/user-attachments/assets/461f622c-95b3-4c6a-bb49-5ae888e81e0d" />

### Check-in CSV Export

<img width="1916" height="1025" alt="image" src="https://github.com/user-attachments/assets/3ebd2436-c40d-4b77-a355-a0d29875e925" />


## 👥 Project Team

**Community Project:** Carbon Footprint Awareness for College Students

**MVGR College of Engineering (A)**  
**Department of Computer Science and Engineering**

**Batch:** BATCH-12D  
**Section:** D

### Team Members

| S. No. | Name | Role | Roll Number |
|---|---|---|---|
| 1 | Ravada Vardhini | Batch Leader | 24331A05O9 |
| 2 | Penchala Akhil | Team Member | 24331A05M6 |
| 3 | Ragala Santhu | Team Member | 24331A05O4 |
| 4 | Regana Karthik | Team Member | 24331A05P4 |

## 📄 Project Status

The project includes:

- [x] Carbon footprint calculator
- [x] Awareness survey integration
- [x] Green check-in system
- [x] Firebase Firestore integration
- [x] Browser notification subscription
- [x] Automated daily notifications
- [x] Check-in response storage
- [x] CSV data export
- [x] GitHub Actions workflows

---

## 🌍 Conclusion

The project combines a carbon footprint calculator, awareness survey, daily green-action reminders, and a check-in system to promote environmental awareness among college students.

Firebase is used for storing check-in responses and managing notifications, while GitHub Actions automates the daily notification process and data export.

The collected data can be exported as a CSV file and analysed to understand student participation throughout the campaign.

Overall, the project connects **awareness, personal carbon-footprint understanding, daily eco-friendly actions, and measurable participation** in a single web-based system.
