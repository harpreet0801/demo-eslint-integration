# 🚀 **Deployment Checklist - What You Need to Do**

## 📋 **Complete Deployment Steps**

---

## **PHASE 1: Local Verification (5 min)**
### ✅ Verify Everything Works Locally

```bash
# Step 1: Build the React app
npm run build
# ✓ Should complete with no errors
# ✓ Creates dist/ folder with optimized files

# Step 2: Build Docker image locally
docker build -t hello-world-react .
# ✓ Should complete in 1-2 minutes
# ✓ Final image size should be ~50MB

# Step 3: Run container locally
docker run -p 80:80 hello-world-react
# ✓ Should start successfully
# ✓ Access http://localhost to verify

# Step 4: Test with Docker Compose
docker-compose up -d
# ✓ Should say "Creating demo_web_1 ... done"
# ✓ Access http://localhost to verify
# ✓ Should see "Hello World! 🌍"

# Step 5: Verify health check
curl http://localhost/health
# ✓ Should return 200 OK

# Step 6: Stop the container
docker-compose down
# ✓ Stops and removes container
```

---

## **PHASE 2: GitHub Setup (10 min)**
### ✅ Push Code to GitHub

### **Step 1: Create GitHub Repository**
```bash
# Go to https://github.com/new
# Create repository named: hello-world-react
# Choose: Public (for free CI/CD)
# Don't initialize with README
```

### **Step 2: Initialize Git & Push**
```bash
# Initialize git (if not already done)
cd c:\Users\HarpreetSingh\project\demo
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: React app with Docker and CI/CD"

# Add remote repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/hello-world-react.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### **Step 3: Verify on GitHub**
- ✓ Go to https://github.com/YOUR_USERNAME/hello-world-react
- ✓ Should see all your files
- ✓ Should see commits in history

---

## **PHASE 3: GitHub Container Registry (GCR) Setup (5 min)**
### ✅ Enable GitHub Container Registry

### **Step 1: Create Personal Access Token (PAT)**
```
1. Go to: https://github.com/settings/tokens/new
2. Click: "Generate new token" → "Generate new token (classic)"
3. Name: "GHCR_TOKEN"
4. Expiration: 90 days (or as needed)
5. Scopes to check:
   ✓ repo (full control of private repositories)
   ✓ write:packages (write to GitHub Packages)
   ✓ delete:packages (delete from GitHub Packages)
6. Click: "Generate token"
7. Copy the token immediately (you won't see it again)
```

### **Step 2: Add Token to GitHub Secrets**
```
1. Go to: Your repository settings
   https://github.com/YOUR_USERNAME/hello-world-react/settings
   
2. Click: "Secrets and variables" → "Actions"

3. Click: "New repository secret"

4. Create SECRET 1:
   Name: GHCR_TOKEN
   Value: (paste the token you copied)
   Click: "Add secret"

5. Create SECRET 2:
   Name: GHCR_USERNAME
   Value: YOUR_GITHUB_USERNAME
   Click: "Add secret"
```

### **Step 3: Verify CI/CD Workflow Exists**
```
Go to: Your repository → "Actions" tab
Should see:
✓ docker-build.yml workflow
✓ lint-and-build.yml workflow
```

---

## **PHASE 4: Trigger CI/CD Pipeline (1 min)**
### ✅ Push Code to Trigger Builds

```bash
# Make a small change to trigger the pipeline
# (This is optional - any push to main triggers it)

# Or just make an empty commit:
git commit --allow-empty -m "Trigger CI/CD pipeline"
git push origin main
```

### **Step 5: Monitor CI/CD**
```
1. Go to: https://github.com/YOUR_USERNAME/hello-world-react/actions
2. Should see workflow runs
3. Wait for them to complete (2-3 minutes)
4. Check results:
   ✓ docker-build should complete successfully
   ✓ lint-and-build should complete successfully
   ✓ Docker image should be pushed to GHCR
```

### **Step 6: Verify Docker Image in GHCR**
```
1. Go to: https://github.com/YOUR_USERNAME?tab=packages
2. Should see: hello-world-react package
3. Click on it
4. Should see Docker image available
5. Image URL: ghcr.io/YOUR_USERNAME/hello-world-react:main
```

---

## **PHASE 5: Choose Deployment Platform**
### ✅ Pick One Option Below

---

## **OPTION A: AWS EC2 (Simple) ⭐ Recommended for Beginners**

### **What You'll Do:**
1. Create AWS account (free tier)
2. Launch EC2 instance (t3.micro - free)
3. Install Docker on instance
4. Pull and run your image from GHCR
5. Access your app via EC2 public IP

### **Steps:**
```bash
# 1. Create AWS Account
# Go to: https://aws.amazon.com/
# Sign up for free tier

# 2. Launch EC2 Instance
# Go to: AWS Console → EC2 → Instances → Launch instances
# Choose: Ubuntu 22.04 LTS (free tier eligible)
# Instance type: t3.micro
# Security group: Allow HTTP (port 80), HTTPS (port 443), SSH (port 22)
# Download key pair: my-key.pem (save it safely!)

# 3. Connect to Instance (from PowerShell)
# Go to: EC2 → Instances → Connect tab
# Copy the SSH command
# Paste in PowerShell

# 4. Install Docker on EC2
sudo apt update
sudo apt install -y docker.io
sudo usermod -aG docker ubuntu
newgrp docker

# 5. Login to GHCR
docker login ghcr.io
# Username: YOUR_GITHUB_USERNAME
# Password: GHCR_TOKEN (the token you created earlier)

# 6. Pull and run your image
docker pull ghcr.io/YOUR_USERNAME/hello-world-react:main
docker run -d -p 80:80 ghcr.io/YOUR_USERNAME/hello-world-react:main

# 7. Get your public IP
# Go to: AWS Console → EC2 → Instances
# Copy: Public IPv4 address
# Access: http://YOUR_EC2_PUBLIC_IP

# ✅ Your app is now live!
```

**Cost:** ~$0/month (on free tier) → $3-10/month after

---

## **OPTION B: DigitalOcean App Platform (Easier) ⭐ Recommended**

### **What You'll Do:**
1. Create DigitalOcean account ($5 free credit)
2. Connect GitHub account
3. Select your repository
4. Let DigitalOcean handle everything
5. Automatic deploys on git push

### **Steps:**
```
1. Go to: https://www.digitalocean.com/
2. Sign up (use APPREF-4KSPT7N for $200 credit)
3. Go to: Apps → Create App
4. Choose: "GitHub" → Connect
5. Select repository: hello-world-react
6. Choose branch: main
7. Service settings:
   - Name: hello-world-react
   - Source: Dockerfile
   - Port: 80
8. Review and Deploy
9. Wait 2-3 minutes
10. Copy the app URL
11. Access your app! ✅

Automatic: Every git push → auto-deploy
```

**Cost:** ~$12/month (includes free monthly allowance)

---

## **OPTION C: Docker Hub + Manual SSH (Medium)**

### **What You'll Do:**
1. Push image to Docker Hub instead of GHCR
2. SSH into VPS/server
3. Pull image and run manually
4. Setup auto-restart with systemd

### **Steps:**
```bash
# This is more manual but gives you full control
# Follow DEPLOYMENT_GUIDE.md section 3 for full details
```

---

## **OPTION D: AWS ECS (Advanced)**

### **What You'll Do:**
1. Push image to AWS ECR
2. Create ECS cluster
3. Create task definition
4. Deploy container
5. Setup load balancer

### **Cost:** $0-50/month depending on usage

---

## **OPTION E: Google Cloud Run (Serverless)**

### **What You'll Do:**
1. Connect GitHub
2. Deploy from container
3. Let Google manage everything
4. Pay only for what you use

### **Cost:** Free tier included, then ~$0.00002670 per request

---

---

## **PHASE 6: Post-Deployment Checks**
### ✅ Verify Your Deployment

```bash
# Step 1: Access your app
curl http://YOUR_APP_URL
# ✓ Should see "Hello World! 🌍"

# Step 2: Check health endpoint
curl http://YOUR_APP_URL/health
# ✓ Should return 200 OK

# Step 3: Check Nginx is serving
curl -I http://YOUR_APP_URL
# ✓ Should show "Server: nginx"

# Step 4: Test caching headers
curl -I http://YOUR_APP_URL
# ✓ Should see "Cache-Control: max-age=31536000"

# Step 5: Monitor container logs
# (Depends on platform - check platform docs)
```

---

## **PHASE 7: Setup Monitoring (Optional but Recommended)**
### ✅ Monitor Your App

### **Option 1: Simple Health Check**
```bash
# Create a cron job that checks your app every 5 minutes
# If it fails, send you an email alert
```

### **Option 2: Use Uptime Monitor**
```
Go to: https://www.uptime.com/
Setup: Monitor your app URL
Alerts: Email if down
Cost: Free or ~$10/month
```

### **Option 3: Platform Built-in Monitoring**
```
DigitalOcean: Built-in monitoring included
AWS: CloudWatch (basic tier free)
Google Cloud: Cloud Monitoring (free tier)
```

---

## **PHASE 8: Setup Custom Domain (Optional)**
### ✅ Point Domain to Your App

### **Step 1: Buy a Domain**
```
Go to: Namecheap, GoDaddy, or Google Domains
Buy: your-domain.com
```

### **Step 2: Point to Your App**
```
For AWS EC2:
- Go to Route 53 (AWS DNS)
- Create hosted zone for your domain
- Add A record pointing to EC2 public IP

For DigitalOcean:
- Go to Networking → Domains
- Add your domain
- Create A record pointing to app URL

For Google Cloud Run:
- Go to Cloud Domains
- Setup DNS records
- Point to Cloud Run service
```

### **Step 3: Setup SSL Certificate**
```
Most platforms handle this automatically:
- DigitalOcean: Automatic HTTPS
- Google Cloud Run: Automatic HTTPS
- AWS: Use AWS Certificate Manager

Your app becomes: https://your-domain.com ✓
```

---

## **Quick Reference: What to Do NOW**

### **Immediate (Next 30 minutes):**
```
1. ✅ Test locally: npm run build + docker build
2. ✅ Push to GitHub
3. ✅ Create GHCR_TOKEN in GitHub Secrets
4. ✅ Trigger CI/CD pipeline
5. ✅ Verify Docker image in GHCR
```

### **Next (Today):**
```
6. ✅ Choose deployment platform (DigitalOcean recommended)
7. ✅ Deploy your app
8. ✅ Test via public URL
```

### **Later (This week):**
```
9. ✅ Setup monitoring
10. ✅ Buy custom domain (optional)
11. ✅ Setup SSL certificate (optional)
```

---

## **Recommended Path for Beginners**

```
1. Local Testing ✓ (you already have this working)
   │
2. GitHub Push ✓ (simple git commands)
   │
3. GitHub Actions CI/CD ✓ (automated, already configured)
   │
4. Deploy to DigitalOcean ← Start here!
   │
   ├─ Easy UI setup
   ├─ Auto-deploys on git push
   ├─ Includes HTTPS
   ├─ Monitor within platform
   └─ $12/month (or $5 credit)
```

---

## **Troubleshooting**

### **Problem: CI/CD Pipeline Failed**
```
Solution:
1. Go to: Actions tab
2. Click failed workflow
3. Check logs
4. Common fixes:
   - Check GHCR_TOKEN is valid
   - Check GHCR_USERNAME is correct
   - Verify secrets are set
```

### **Problem: Can't Connect to Deployed App**
```
Solution:
1. Verify app is running
2. Check security groups/firewall
3. Check port 80 is exposed
4. Check health endpoint
5. Check logs for errors
```

### **Problem: Docker Image Won't Pull**
```
Solution:
1. Verify logged into GHCR: docker login ghcr.io
2. Check image exists in GHCR
3. Verify token has read permissions
4. Check image name is correct
```

---

## **Next Steps**

### **Ready to Deploy?**

Choose your path:
- **Path A:** AWS EC2 (most control, manual setup)
- **Path B:** DigitalOcean (easiest, automated)
- **Path C:** Google Cloud Run (serverless, cheapest)

Once chosen, follow the detailed guide in `DEPLOYMENT_GUIDE.md`

---

## **Summary**

| Phase | What | Time | Status |
|-------|------|------|--------|
| 1 | Local Testing | 5 min | ✅ Ready |
| 2 | GitHub Push | 10 min | ⏳ Your turn |
| 3 | GCR Setup | 5 min | ⏳ Your turn |
| 4 | Trigger CI/CD | 1 min | ⏳ Your turn |
| 5 | Deploy | 15 min | ⏳ Your turn |
| 6 | Verify | 5 min | ⏳ Your turn |
| 7 | Monitor | 10 min | ⏳ Optional |
| 8 | Custom Domain | 20 min | ⏳ Optional |

**Total time to live app: ~50 minutes** ⏱️

---

**What do you want to do first?** 🚀
