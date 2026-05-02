# 📈 OptionsPro Coach

An AI-powered options trading coach built with Next.js and Claude AI.

---

## 🚀 Deploy to Vercel (Step by Step)

### Step 1 — Upload to GitHub
1. Go to github.com and create a new repository named `options-coach-app`
2. Upload all these files to your repository

### Step 2 — Connect to Vercel
1. Go to vercel.com and sign in
2. Click **"Add New Project"**
3. Click **"Import"** next to your `options-coach-app` GitHub repo
4. Click **"Deploy"** (don't change any settings)

### Step 3 — Add Your API Key (IMPORTANT)
1. After deploying, go to your project in Vercel
2. Click **"Settings"** → **"Environment Variables"**
3. Click **"Add New"**
4. Set:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your actual API key from console.anthropic.com
5. Click **"Save"**
6. Go to **"Deployments"** and click **"Redeploy"**

### Step 4 — Your App is Live! 🎉
Vercel gives you a free URL like: `options-coach-app.vercel.app`

---

## 💻 Run Locally (Optional)
```bash
npm install
cp .env.example .env.local
# Add your API key to .env.local
npm run dev
```
Open http://localhost:3000

---

## ⚠️ Disclaimer
For educational purposes only. Not financial advice.
