# AgriFinAI

AgriFinAI is an innovative, AI-powered platform designed to transform Indian agriculture by integrating financial intelligence, crop advisory, and hyperlocal insights. Built for the Capital One Launchpad Hackathon, this solution leverages agentic AI to empower farmers, financiers, vendors, and all stakeholders with actionable, reliable, and accessible information—bridging the gap between technology and grassroots impact.

---

## Why AgriFinAI ?

### Problem Statement

Indian agriculture faces persistent challenges:
- **Unpredictable Weather & Climate Risks**: Farmers struggle to make timely decisions due to erratic weather and lack of localized forecasts.
- **Limited Financial Access**: Many farmers lack access to affordable credit, insurance, and government schemes.
- **Fragmented Market Access**: Middlemen and lack of transparency reduce farmer profits.
- **Data & Knowledge Gaps**: Farmers need personalized, multilingual, and context-aware advice for crops, soil, and finance.

AgriFinAI addresses these by combining AI-driven recommendations, financial inclusion, and real-time, multilingual support.

---

## Solution Overview

AgriFinAI is a web-based platform that provides:
- **Agentic AI Chatbot**: Real-time, conversational assistant for crop, weather, soil, and finance queries, powered by Gemini API and grounded in public datasets.
- **Financial Marketplace**: Compare and apply for loans from leading banks, including Capital One Agri-Finance, with transparent terms and document support.
- **Weather & Crop Advisory**: Hyperlocal weather forecasts and actionable crop plans, leveraging AI for reliability and explainability.
- **Soil Health Analysis**: AI-powered soil and crop health assessment for better yield and sustainability.
- **Direct Market Access**: Connects farmers directly with buyers, improving transparency and pricing.
- **Multilingual Accessibility**: Supports multiple Indian languages for inclusivity.

---

## Key Features

- **AI Chatbot (Gemini-powered)**: Floating chat button on every page, providing instant, context-aware answers in 100–150 words, formatted for clarity and reliability.
- **Location Detection**: Enhances recommendations by using user’s location for weather, crop, and financial advice.
- **Financial Inclusion**: Access to loans, subsidies, and insurance from multiple banks, including Capital One.
- **Personalized Crop & Soil Advisory**: AI-driven recommendations tailored to local conditions and user queries.
- **Multi-Language Support**: i18n integration for Hindi, Marathi, Tamil, Kannada, Gujarati, and more.
- **Modern UI/UX**: Responsive, accessible, and visually appealing design for all user types.
- **Explainability & Trust**: All AI responses cite sources and explain reasoning for reliability.

---

## Technologies Used

- **Frontend**: React, Next.js (App Router), TailwindCSS, Material Tailwind
- **AI Integration**: Gemini API (Google Generative Language)
- **Localization**: i18next for multilingual support
- **Icons**: Heroicons, React Icons, Iconify

---

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- Gemini API Key (Google Generative Language)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/OmkArsoni72/HackBios-AgriFintech.git
   cd agri-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and configure the required environment variables:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your-openweather-api-key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Folder Structure

```
agri-app/
├── app/                # Application pages and components
├── public/             # Static assets
├── styles/             # Global styles
├── components/         # Reusable components
├── lib/                # Utility functions and helpers
├── pages/              # Next.js pages
├── api/                # API routes (if needed)
├── .env.local          # Environment variables
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

---

## Usage Guide

- **AI Chatbot**: Click the chat button at the bottom-right of any page. Ask questions about crops, weather, loans, or soil health. Optionally, detect your location for more accurate advice.
- **Loan Marketplace**: Browse and compare loan products, view required documents, and apply directly.
- **Weather & Crop Advisory**: Enter your location to receive AI-powered crop plans and weather insights.
- **Soil Health Analysis**: Submit crop and soil details for instant AI assessment.
- **Language Selection**: Use the language switcher to interact in your preferred language.

---

## Deploy on Vercel

### 🚀 Quick Deployment Guide

**👉 START HERE: [DEPLOYMENT_INDEX.md](./DEPLOYMENT_INDEX.md) - Complete documentation guide**

This project is ready to deploy on Vercel! We've included comprehensive deployment documentation:

#### 📚 Deployment Documentation

1. **[DEPLOYMENT_VISUAL_GUIDE.md](./DEPLOYMENT_VISUAL_GUIDE.md)** - ⭐ **START HERE!**
   - Step-by-step visual guide with screenshots
   - Perfect for beginners
   - Clear instructions for each step

2. **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete detailed guide
   - MongoDB Atlas setup
   - GitHub integration
   - Vercel deployment (Frontend + Backend)
   - Environment variables configuration
   - Troubleshooting section

3. **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Quick checklist format
   - Track your progress
   - Ensure nothing is missed

4. **[DEPLOYMENT_SCRIPTS.md](./DEPLOYMENT_SCRIPTS.md)** - Commands & scripts
   - Copy-paste ready commands
   - Useful tools and resources

5. **[DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md)** - Executive summary
   - Quick overview
   - Architecture diagram
   - Time estimates

### ⚡ Quick Start

```bash
# 1. Setup MongoDB Atlas (cloud database)
# 2. Push code to GitHub
git add .
git commit -m "Ready for deployment"
git push

# 3. Deploy on Vercel
# Visit: https://vercel.com/new
# Import your repository twice:
#   - Once for backend (root: backend/my-express-mongodb-app)
#   - Once for frontend (root: /)
```

### 🔧 Environment Variables Needed

**Frontend (Vercel):**
- `NEXT_PUBLIC_API_URL` - Your backend URL + /api
- `NEXTAUTH_SECRET` - Random secret key
- `NEXTAUTH_URL` - Your frontend URL

**Backend (Vercel):**
- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Random secret key
- `NODE_ENV` - production
- `FRONTEND_URL` - Your frontend URL

### 📖 Full Documentation

👉 **Read [DEPLOYMENT_VISUAL_GUIDE.md](./DEPLOYMENT_VISUAL_GUIDE.md) for complete step-by-step instructions**

**Estimated Time:** 30-45 minutes for first deployment  
**Cost:** FREE (using Vercel + MongoDB Atlas free tiers)

---

**Live Demo**: [https://hack-bios-agri-fintech.vercel.app/](https://hack-bios-agri-fintech.vercel.app/)

---

**AgriFinAI Advisor**  
Empowering Indian agriculture with AI-powered financial and crop advisory solutions.
