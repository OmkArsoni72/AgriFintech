# 🌾 AgriFinAI - Frontend-Backend Connection Guide

## ✅ Setup Complete!

Aapke project me **frontend (Next.js)** aur **backend (Express + MongoDB)** successfully connect ho gaye hain!

---

## 📁 Project Structure

```
AgriFinAI/
├── app/                          # Next.js frontend
│   ├── farmers/
│   │   └── page.jsx             # Farmers management page
│   └── ...
├── components/                   # React components
│   ├── FarmersList.jsx          # Display all farmers
│   └── AddFarmerForm.jsx        # Add new farmer form
├── lib/
│   └── api.js                   # API service layer
├── backend/
│   └── my-express-mongodb-app/  # Express backend
│       ├── src/
│       │   ├── models/
│       │   │   ├── Farmer.js    # Farmer model
│       │   │   └── Loan.js      # Loan model
│       │   ├── controllers/
│       │   │   ├── farmerController.js
│       │   │   └── loanController.js
│       │   ├── routes/
│       │   │   ├── farmerRoutes.js
│       │   │   ├── loanRoutes.js
│       │   │   └── index.js
│       │   ├── app.js           # Express app with CORS
│       │   └── server.js        # Server entry point
│       └── .env                 # Backend environment variables
└── .env.local                   # Frontend environment variables
```

---

## 🚀 Setup Instructions

### 1️⃣ **MongoDB Start karo**

MongoDB local me install hai toh:

```powershell
# MongoDB service start karo
net start MongoDB
```

Ya MongoDB Compass me connect karo: `mongodb://localhost:27017`

---

### 2️⃣ **Backend Start karo**

Terminal 1 me:

```powershell
cd "c:\Users\omkar\Desktop\New folder\AgriFinAI\backend\my-express-mongodb-app"

# Dependencies install karo (agar pehle nahi kiya)
npm install

# Server start karo
npm run dev
```

✅ Backend running: **http://localhost:5000**

---

### 3️⃣ **Frontend Start karo**

Terminal 2 me:

```powershell
cd "c:\Users\omkar\Desktop\New folder\AgriFinAI"

# Dependencies install karo (agar pehle nahi kiya)
npm install

# Frontend start karo
npm run dev
```

✅ Frontend running: **http://localhost:3000**

---

## 🔗 API Endpoints

### **Farmers API**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/farmers` | Get all farmers |
| GET | `/api/farmers/:id` | Get farmer by ID |
| POST | `/api/farmers` | Create new farmer |
| PUT | `/api/farmers/:id` | Update farmer |
| DELETE | `/api/farmers/:id` | Delete farmer |

### **Loans API**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/loans` | Get all loans |
| GET | `/api/loans/:id` | Get loan by ID |
| POST | `/api/loans` | Create loan application |
| PATCH | `/api/loans/:id/status` | Update loan status |

### **Health Check**

```
GET http://localhost:5000/health
```

---

## 🧪 Testing Connection

### **Method 1: Browser**

1. Frontend start karo: `http://localhost:3000/farmers`
2. Farmers list dekhne ke liye **"📋 Farmers List"** tab click karo
3. Naya farmer add karne ke liye **"➕ Add Farmer"** tab click karo

### **Method 2: Postman/Thunder Client**

**Create Farmer:**
```http
POST http://localhost:5000/api/farmers
Content-Type: application/json

{
  "name": "Ramesh Kumar",
  "email": "ramesh@example.com",
  "phone": "9876543210",
  "address": {
    "village": "Kothrud",
    "district": "Pune",
    "state": "Maharashtra",
    "pincode": "411038"
  },
  "landSize": 5.5,
  "cropType": "Rice"
}
```

**Get All Farmers:**
```http
GET http://localhost:5000/api/farmers
```

---

## 💾 MongoDB Collections

### **Farmers Collection**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  address: {
    village: String,
    district: String,
    state: String,
    pincode: String
  },
  landSize: Number,
  cropType: String,
  loanStatus: String,
  creditScore: Number,
  aiRecommendations: Array,
  createdAt: Date,
  updatedAt: Date
}
```

### **Loans Collection**
```javascript
{
  _id: ObjectId,
  farmerId: ObjectId (ref: Farmer),
  loanAmount: Number,
  interestRate: Number,
  tenure: Number,
  purpose: String,
  status: String,
  appliedDate: Date,
  approvalDate: Date,
  disbursementDate: Date,
  aiScore: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔧 Environment Variables

### **Backend (`.env`)**
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/agrifinai
```

### **Frontend (`.env.local`)**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 📱 Frontend me API Use kaise kare

```javascript
import { farmerAPI, loanAPI } from '@/lib/api';

// Get all farmers
const farmers = await farmerAPI.getAll();

// Create new farmer
const newFarmer = await farmerAPI.create({
  name: "Test Farmer",
  email: "test@example.com",
  // ... more fields
});

// Get all loans
const loans = await loanAPI.getAll();

// Update loan status
await loanAPI.updateStatus(loanId, "Approved");
```

---

## ✨ Features

✅ **CORS enabled** - Frontend backend se communicate kar sakta hai  
✅ **MongoDB connected** - Data persist hota hai  
✅ **RESTful API** - Clean API structure  
✅ **Error handling** - Proper error messages  
✅ **Validation** - Data validation on both sides  
✅ **AI Score** - Automatic AI score calculation for loans  

---

## 🐛 Troubleshooting

### **Backend not connecting?**
- Check MongoDB running hai ya nahi: `net start MongoDB`
- Check `.env` file me correct MongoDB URI hai

### **Frontend se API call nahi ho rahi?**
- Check backend running hai: `http://localhost:5000/health`
- Check `.env.local` me `NEXT_PUBLIC_API_URL` correct hai
- Browser console check karo for errors

### **CORS error?**
- Backend me CORS already enabled hai
- Check frontend URL backend `.env` me match karta hai

---

## 🎯 Next Steps

1. ✅ MongoDB connection test karo
2. ✅ Backend API test karo (Postman/Thunder Client)
3. ✅ Frontend open karo: `http://localhost:3000/farmers`
4. ✅ Farmer add karo aur list me dekho
5. ✅ Loan API bhi similarly implement karo

---

## 📞 Support

Agar koi issue ho toh:
1. Check MongoDB running hai
2. Check dono servers running hain
3. Browser console check karo
4. Backend terminal check karo for errors

---

**🎉 Happy Coding!**
