# 🔐 Password Manager Web App

A secure, modern **Password Manager** built using **React** and **Firebase**, allowing users to safely store, view, manage, and export their credentials. The app supports **Email/Password authentication**, **Google Sign‑In**, and **real‑time password synchronization** using Firestore.

---

## 🚀 Features

### 🔑 Authentication

* Email & Password Signup / Login
* Google OAuth Sign‑In
* Firebase Authentication for secure user management

### 📦 Password Management

* Add website credentials (Site URL, Username/Email, Password)
* View saved passwords (masked by default)
* Copy site, username, or password to clipboard
* Update existing passwords
* Delete passwords with confirmation

### ⚡ Real‑Time Sync

* Passwords update instantly using Firestore `onSnapshot`
* No manual refresh required

### 📤 Export

* Export all saved passwords as a **CSV file**

### 👁️ UX Enhancements

* Show / Hide password toggle
* Toast notifications for actions
* Loading state handling

---

## 🛠️ Tech Stack

### Frontend

* **React (Vite)**
* **Tailwind CSS** – Styling
* **React Icons** – UI icons
* **Lordicon** – Animated icons
* **React Toastify** – Notifications

### Backend / Services

* **Firebase Authentication**
* **Firebase Firestore (NoSQL Database)**

---

## 🧩 Project Structure

```
src/
├── components/
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   └── Toast.jsx
├── pages/
│   ├── Signup.jsx
│   └── Manager.jsx
├── firebaseConfig.js
├── App.jsx
└── main.jsx
```

---

## 🔐 Firebase Usage Explained

### Firebase Authentication

Used to handle:

* User signup & login
* Google OAuth
* Secure session management

Key functions used:

* `createUserWithEmailAndPassword`
* `signInWithEmailAndPassword`
* `signInWithPopup`
* `GoogleAuthProvider`
* `updateProfile`

### Firestore Database

Used to store user‑specific passwords

Key functions used:

* `collection()` – Access Firestore collection
* `addDoc()` – Save new password
* `query()` + `where()` – Fetch passwords per user
* `onSnapshot()` – Real‑time updates
* `doc()` + `deleteDoc()` – Update/Delete password entries

Each password document contains:

```json
{
  "id": "user_uid",
  "site": "https://example.com",
  "userName": "user@email.com",
  "password": "secret"
}
```
---

## 🧪 How to Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Aryan-Sameer/Gringotts.git
cd password-manager
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure Firebase

Create a `firebaseConfig.js` file:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getFirestore(app);
```

### 4️⃣ Start the app

```bash
npm run dev
```

---

## 🎯 Use Cases

* Personal password storage
* Learning Firebase Auth & Firestore
* Resume / portfolio project
* Real‑time CRUD application demo

---

## 📈 Future Improvements

* 🔒 Client‑side encryption
* 🧠 Password strength meter
* 📱 Mobile‑friendly UI
* 🔐 Two‑Factor Authentication (2FA)

---

## ⭐ If you like this project

Give it a ⭐ on GitHub — it helps a lot!
