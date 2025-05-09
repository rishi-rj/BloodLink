# 🩸 BloodLink - Connect Life Through Donations

[![GitHub Repo](https://img.shields.io/badge/GitHub-BloodLink-blue?logo=github)](https://github.com/rishi-rj/BloodLink)

BloodLink is a full-stack web application that enables users to connect with blood banks and hospitals for efficient blood donation, inventory management, and analytics.

---

## 🚀 Features

- User Authentication (Registration & Login)
- Blood Inventory Management (Add, Retrieve, and Analyze Blood Stock)
- Hospital & Organization Records
- Real-Time Analytics on Blood Groups
- Admin Dashboard for Donors & Hospitals
- Responsive Frontend with an Intuitive UI
- RESTful API Endpoints for Seamless Data Flow

---

## 🏗️ Tech Stack

**Frontend:** React.js (Vite), Tailwind CSS, Axios, Redux Toolkit  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT Authentication  

---

## 📌 API Endpoints

### 🔑 Auth Routes (`/auth`)

| Method | Endpoint       | Description            |
|--------|--------------|------------------------|
| POST  | /register   | Register a new user   |
| POST  | /login      | Login a user          |
| GET   | /current-user | Get current user details |

### 🏥 Inventory Routes (`/inventory`)

| Method | Endpoint                          | Description                             |
|--------|-----------------------------------|-----------------------------------------|
| POST  | /create-inventory              | Create a new blood inventory record    |
| GET   | /get-inventory                 | Get all blood records                  |
| GET   | /get-recent-inventory          | Get recent blood records               |
| POST  | /get-inventory-hospital        | Get blood records for a hospital       |
| GET   | /get-donars                    | Get donor records                      |
| GET   | /get-hospitals                 | Get hospital records                   |
| GET   | /get-orgnaisation              | Get organization records               |
| GET   | /get-orgnaisation-for-hospital | Get organization records for a hospital |

### 📊 Analytics Routes (`/analytics`)

| Method | Endpoint             | Description                  |
|--------|----------------------|------------------------------|
| GET   | /bloodGroups-data | Get blood group analytics   |

### 🛠️ Test Routes (`/test`)

| Method | Endpoint  | Description       |
|--------|---------|-------------------|
| GET   | /      | Test API endpoint |

### 🔧 Admin Routes (`/admin`)

| Method  | Endpoint           | Description             |
|---------|-------------------|-------------------------|
| GET    | /donar-list      | Get donor list         |
| GET    | /hospital-list   | Get hospital list      |
| GET    | /org-list        | Get organization list  |
| DELETE | /delete-donar/:id | Delete a donor by ID  |

---

## 🔧 Installation & Setup

### 1️⃣ Clone the repository:
```bash
git clone https://github.com/rishi-rj/BloodLink.git
cd BloodLink
```

### 2️⃣ Install dependencies:

```bash
npm install
```

### 3️⃣ Configure environment variables in `.env` file:
#### env (../.env`)
```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```

### 4️⃣ Start the application:

```bash
npm run dev
```

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 💡 Contributing
We welcome contributions! Fork the repo, create a new branch, and submit a pull request. 🚀

---

## 📞 Contact
For support, visit:  
🔗 [BloodLink GitHub Repository](https://github.com/rishi-rj/BloodLink)

---

