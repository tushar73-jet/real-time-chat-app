# Vercel Environment Variables Setup

## Problem
Messages are not working because the frontend is trying to connect to `localhost:3001`, which doesn't exist in production.

## Solution

### Step 1: Deploy Your Backend
Deploy your backend to a service like:
- **Railway** (recommended): https://railway.app
- **Render**: https://render.com
- **Heroku**: https://heroku.com
- **Fly.io**: https://fly.io

### Step 2: Get Your Backend URL
Once deployed, you'll get a URL like:
- `https://your-app.railway.app`
- `https://your-app.onrender.com`
- etc.

### Step 3: Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these two variables:

   **Variable 1:**
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://your-backend-url.com` (your actual backend URL)
   - **Environments**: Production, Preview, Development (check all)

   **Variable 2:**
   - **Name**: `REACT_APP_SOCKET_URL`
   - **Value**: `https://your-backend-url.com` (same as above)
   - **Environments**: Production, Preview, Development (check all)

### Step 4: Redeploy
After adding environment variables, Vercel will automatically trigger a new deployment. Or you can manually trigger it from the Deployments tab.

## Example

If your backend is deployed at `https://chat-backend-production.up.railway.app`:

- `REACT_APP_API_URL` = `https://chat-backend-production.up.railway.app`
- `REACT_APP_SOCKET_URL` = `https://chat-backend-production.up.railway.app`

## Notes

- **NO trailing slashes** in the URLs
- Both variables should use **HTTPS** (not HTTP) for production
- The code has been updated to use these environment variables
- If variables are not set, it will default to `localhost:3001` for local development

## Testing Locally

Create a `.env` file in `chat-frontend/` directory:
```
REACT_APP_API_URL=http://localhost:3001
REACT_APP_SOCKET_URL=http://localhost:3001
```

