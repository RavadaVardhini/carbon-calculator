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
